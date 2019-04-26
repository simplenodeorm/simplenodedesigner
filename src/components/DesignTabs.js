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
import {getModalContainer,removeWaitMessage,getOrmUrl} from './helpers';

const tabs = [];
class DesignTabs extends BaseDesignComponent {
    constructor(props) {
        super(props);

        this.state = {
            tab0Disabled: false,
            tab1Disabled: true,
            tab2Disabled: true,
            tab3Disabled: true,
            tab4Disabled: true,
            sidebarOpen: false,
            modelsLoaded: false,
            selectedModel: config.textmsg.modelselectdefault,
            tabIndex: 0,
            newQueryResults: false
        };    

        this.onSave = this.onSave.bind(this);
        this.onRun = this.onRun.bind(this);
        this.setTabState = this.setTabState.bind(this);
        this.loadParametersAndRun = this.loadParametersAndRun.bind(this);
        this.saveDocument = this.saveDocument.bind(this);
        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
        
        this.queryResults = '';
    }

    onSetSidebarOpen(open, model) {
        if (!open && !model) {
            this.setState({sidebarOpen: false});
        } else if (!document.designData.models) {
            this.loadModels();
        } else {
            this.props.setCurrentDocument();
            this.props.setStatus('', true);
            this.props.setStatus('', false);
            if (model) {
                this.setState({tabIndex: 0, sidebarOpen: open, tab0Disabled: false, tab1Disabled: true, tab2Disabled: true, tab3Disabled: true, selectedModel: model});
            } else {
                this.setState({sidebarOpen: open});
            }
        }
    }
    
    render() {
        const {tab0Disabled, tab1Disabled, tab2Disabled, tab3Disabled, 
            selectedModel, sidebarOpen, newQueryResults} = this.state;
            
        let curModel = selectedModel;
        if (document.designData.currentDocument) {
            curModel = document.designData.currentDocument.rootModel;
            this.state.selectedModel = curModel;
        }
        
        this.state.newQueryResults = false;
        
        return (
            <div className="tabSetContainer"> 
                <MenuButton text={curModel} 
                    saveDisabled={tab3Disabled}
                    onSave={this.onSave}
                    onRun={this.onRun}
                    onHelp={this.onHelp}
                    onMenuClick={() => {  this.onSetSidebarOpen(true); }}/>
                {sidebarOpen &&
                <Sidebar
                    styles={{ sidebar: { width: "200px" } }}
                    sidebar={document.designData.models}
                    open={sidebarOpen}
                    onSetOpen={this.onSetSidebarOpen}>
                </Sidebar> }
                
                <Tabs selectedIndex={this.state.tabIndex} 
                    onSelect={tabIndex => this.setState({ tabIndex })}> 
                    <TabList>
                        <Tab disabled={tab0Disabled}>{config.textmsg.selectdata}</Tab>
                        <Tab disabled={tab1Disabled}>{config.textmsg.formatselections}</Tab>
                        <Tab disabled={tab2Disabled}>{config.textmsg.definefilter}</Tab>
                        <Tab disabled={tab3Disabled}>{config.textmsg.runquery}</Tab>
                    </TabList>
                    <TabPanel>
                        <SelectModelDataPanel ref={(tab) => {tabs[0] = tab}} 
                            setTabState={this.setTabState}
                            model={selectedModel} 
                            setStatus={this.props.setStatus}/>
                    </TabPanel>
                    <TabPanel>
                        <ColumnSettingsPanel ref={(tab) => {tabs[1] = tab}} 
                            setTabState={this.setTabState}/>
                    </TabPanel>
                    <TabPanel>
                        <FilterPanel ref={(tab) => {tabs[2] = tab}} 
                            setTabState={this.setTabState}/>
                    </TabPanel>
                    <TabPanel>
                        <QueryPanel ref={(tab) => {tabs[3] = tab}} 
                            newResults={newQueryResults} 
                            setStatus={this.props.setStatus}/>
                    </TabPanel>
                </Tabs>
            </div>);
    }
    

    onRun() {
        let rc = {left: 200, top: 100, width: 400, height: 350};
        let mc = getModalContainer(rc);
        document.designData.currentModalContainer = ReactDOM.render(<ParameterInputPanel onOk={this.loadParametersAndRun}/>, mc);
    }
    
    loadParametersAndRun(params) {
        this.showWaitMessage('Running query...');
        const curcomp = this;
        const orm = JSON.parse(localStorage.getItem('orm'));
        const config = {
            headers: {'Authorization': orm.authString }
        };
        axios.post(getOrmUrl(orm.url) + '/design/runquery', this.getQueryDocument(params), config)
            .then((response) => {
                if (response.status === 200) {
                    document.designData.queryResults = response.data;
                    curcomp.setState({newQueryResults: true, tabIndex: 3});
                } else {
                    curcomp.props.setStatus(response.statusText, true);
                }
    
                removeWaitMessage();
            })
            .catch((err) => {
                curcomp.props.setStatus('' + err, true);
                removeWaitMessage();
            });     
    }
    
    onSave() {
        let rc = {left: 200, top: 50, width: 600, height: 425};
        let mc = getModalContainer(rc);
        document.designData.currentModalContainer = ReactDOM.render(<SaveDocumentPanel onOk={this.saveDocument}/>, mc);
    }
    
    saveDocument(params) {
        this.showWaitMessage('Saving document...');
        const curcomp = this;
        const orm = JSON.parse(localStorage.getItem('orm'));
        const config = {
            headers: {'Authorization': orm.authString }
        };
        axios.post(getOrmUrl(orm.url) + '/design/savequery', this.getQueryDocument(params), config)
            .then((response) => {
                if (response.status === 200) {
                    curcomp.props.setStatus('document saved', false);
                    removeWaitMessage();
                    curcomp.props.reloadDocuments();
                } else {
                    removeWaitMessage();
                    curcomp.props.setStatus(response.statusText, true);
                }
                
            })
            .catch((err) => {
                curcomp.props.setStatus('' + err, true);
                removeWaitMessage();
            });     
    }

    setTabState(tab0, tab1, tab2, tab3) {
        this.setState({tab0Disabled: tab0, tab1Disabled: tab1, tab2Disabled: tab2, tab3Disabled: tab3});
    }

    onDisplaySidebar() {
        this.onSetSidebarOpen(true);
    }

    loadModels() {
        this.showWaitMessage('Loading models...');
        const curcomp = this;
        const orm = JSON.parse(localStorage.getItem('orm'));
        const config = {
            headers: {'Authorization': orm.authString}
        };

        axios.get(getOrmUrl(orm.url) + '/design/modelnames', config)
            .then((response) => {
                if (response.status === 200) {
                    const modelLoop = (data) => {
                        return data.map((item) => {
                            return <button onClick={(e) => curcomp.onSetSidebarOpen(false, item.name, e)}>{'[' + item.poolAlias + '] ' + item.name}</button>;
                        });
                    };
                    response.data.sort(function(m1, m2) {
                        let dname1 = (m1.poolAlias + '.' + m1.name);
                        let dname2 = (m2.poolAlias + '.' + m2.name);
                        return dname1 > dname2;
                        
                    });
                    document.designData.models = <div className="sidebarContainer">{modelLoop(response.data)}</div>;
                    curcomp.setState({sidebarOpen: true});
                } else {
                    curcomp.props.setStatus(response.statusText, true);
                }
    
                removeWaitMessage();
            })
            .catch((err) => {
                curcomp.props.setStatus(err.toString(), true);
                removeWaitMessage();
            });
    }
    
    setDocumentLoaded() {
        for (let i = 0; i < tabs.length; ++i) {
            try {
                tabs[i].setState(tabs[i].state);
            }
            
            catch (e) {}
        }
    }
}

export {DesignTabs};