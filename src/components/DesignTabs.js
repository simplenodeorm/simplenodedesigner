import React from 'react';
import ReactDOM from 'react-dom';
import '../app/App.css';
import { MenuButton } from './MenuButton';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Sidebar from "react-sidebar";
import {SelectModelDataPanel} from './SelectModelDataPanel';
import {ColumnSettingsPanel} from './ColumnSettingsPanel';
import {BaseDesignComponent} from './BaseDesignComponent';
import {ParameterInputPanel} from './ParameterInputPanel';
import {SaveDocumentPanel} from './SaveDocumentPanel';
import {FilterPanel} from './FilterPanel';
import {QueryPanel} from './QueryPanel';
import config from '../config/appconfig.json';
import axios from 'axios';
import {clearDocumentDesignData} from './helpers';
import {getModalContainer} from './helpers';


class DesignTabs extends BaseDesignComponent {
    constructor(props) {
        super(props);

        this.state = {
            tab0Disabled: false,
            tab1Disabled: true,
            tab2Disabled: true,
            tab3Disabled: true,
            tab4Disabled: true,
            tabStateChannged: false,
            sidebarOpen: false,
            modelsLoaded: false,
            selectedModel: config.textmsg.modelselectdefault,
            loading: false,
            tabIndex: 0,
            newQueryResults: false,
            message: '',
            error: ''
        };    
        
        this.onSave = this.onSave.bind(this);
        this.onRun = this.onRun.bind(this);
        this.onHelp = this.onHelp.bind(this);
        this.onParameterEntryOk = this.onParameterEntryOk.bind(this);
        this.setTabState = this.setTabState.bind(this);
        this.loadParametersAndRun = this.loadParametersAndRun.bind(this);
        this.saveDocument = this.saveDocument.bind(this);
        
        this.queryResults = '';
    }

    onSetSidebarOpen(open, model) {
        if (!document.designData.models) {
            this.loadModels();
        } else {
            this.state.tabIndex = 0;
            clearDocumentDesignData();
            if (model) {
                this.setState({sidebarOpen: open, tab0Disabled: false, tab1Disabled: true, tab2Disabled: true, tab3Disabled: true, selectedModel: model});
            } else {
                this.setState({sidebarOpen: open});
            }
        }
    }

    render() {
        const {tab0Disabled, tab1Disabled, tab2Disabled, tab3Disabled, 
            error, message, selectedModel, loading, sidebarOpen, 
            newQueryResults} = this.state;
        
        if (newQueryResults) {
            this.state.newQueryResults = false;
        }
        
        this.state.error = '';
        this.state.message = '';
        
        let retval = (
            <div className="tabSetContainer"> 
                <MenuButton text={selectedModel} 
                    error={error} 
                    message={message}
                    loading={loading}
                    saveDisabled={tab3Disabled}
                    onSave={this.onSave}
                    onRun={this.onRun}
                    onHelp={this.onHelp}
                    onMenuClick={() => {  this.onSetSidebarOpen(true); }}/>
                {sidebarOpen &&
                <Sidebar 
                    sidebar={document.designData.models}
                    open={sidebarOpen}
                    onSetOpen={this.onSetSidebarOpen}>
                </Sidebar> }
                
                <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}> 
                    <TabList>
                        <Tab disabled={tab0Disabled}>{config.textmsg.selectdata}</Tab>
                        <Tab disabled={tab1Disabled}>{config.textmsg.formatselections}</Tab>
                        <Tab disabled={tab2Disabled}>{config.textmsg.definefilter}</Tab>
                        <Tab disabled={tab3Disabled}>{config.textmsg.runquery}</Tab>
                    </TabList>
                    <TabPanel>
                        <SelectModelDataPanel setTabState={this.setTabState} model={selectedModel}/>
                    </TabPanel>
                    <TabPanel>
                        <ColumnSettingsPanel setTabState={this.setTabState}/>
                    </TabPanel>
                    <TabPanel>
                        <FilterPanel setTabState={this.setTabState}/>
                    </TabPanel>
                    <TabPanel>
                        <QueryPanel newResults={newQueryResults}/>
                    </TabPanel>
                </Tabs>
            </div>);
            return retval;
    }
    

    onRun(e) {
        let rc = {left: 200, top: 100, width: 400, height: 350};
        let mc = getModalContainer(rc);
        ReactDOM.render(<ParameterInputPanel onOk={this.loadParametersAndRun}/>, mc);
    }
    
    loadParametersAndRun(params) {
        const curcomp = this;
        const orm = JSON.parse(localStorage.getItem('orm'));
        const config = {
            headers: {'Authorization': orm.authString }
        };
        axios.post(orm.url + '/design/runquery', this.getQueryDocument(params), config)
            .then((response) => {
                if (response.status === 200) {
                    document.designData.queryResults = response.data;
                    curcomp.setState({loading: false, newQueryResults: true});
                } else {
                    curcomp.setState({error: response.statusText, loading: false});
                }
            })
            .catch((err) => {
               curcomp.setState({error: ('' + err), loading: false});
            });     
    }
    
    onParameterEntryOk(params) {
        if (params) {
        }
    }
        
    onHelp() {
    }
    
    onSave() {
        let rc = {left: 200, top: 50, width: 600, height: 400};
        let mc = getModalContainer(rc);
        ReactDOM.render(<SaveDocumentPanel onOk={this.saveDocument}/>, mc);
    }
    
    saveDocument(params) {
        const curcomp = this;
        const orm = JSON.parse(localStorage.getItem('orm'));
        const config = {
            headers: {'Authorization': orm.authString }
        };
        axios.post(orm.url + '/design/savequery', this.getQueryDocument(params), config)
            .then((response) => {
                if (response.status === 200) {
                    curcomp.setState({loading: false, message: 'document saved'});
                } else {
                    curcomp.setState({error: response.statusText, loading: false});
                }
            })
            .catch((err) => {
               curcomp.setState({error: ('' + err), loading: false});
            });     
    }

    onTabSelected(index, lastIndex) {
        this.selectedIndex = index;
    }
    
    setTabState(tab0, tab1, tab2, tab3) {
        this.setState({tab0Disabled: tab0, tab1Disabled: tab1, tab2Disabled: tab2, tab3Disabled: tab3, tabStateChanged: true});
    }

    onDisplaySidebar() {
        this.onSetSidebarOpen(true);
    }

    loadModels() {
        const curcomp = this;
        const orm = JSON.parse(localStorage.getItem('orm'));
        const config = {
            headers: {'Authorization': orm.authString}
        };

        this.setState({loading: true});
        axios.get(orm.url + '/design/modelnames', config)
            .then((response) => {
                if (response.status === 200) {
                    const modelLoop = (data) => {
                        return data.map((item) => {
                            return <button onClick={() => curcomp.onSetSidebarOpen(false, item)}>{item}</button>;
                        });
                    };
                    document.designData.models = <div className="sidebarContainer">{modelLoop(response.data)}</div>;
                    curcomp.setState({sidebarOpen: true, loading: false});
                } else {
                    curcomp.setState({error: response.statusText, loading: false});
                }
            })
            .catch((err) => {
                curcomp.setState({error: err.toString(), loading: false});
            });
    }
}

export {DesignTabs};