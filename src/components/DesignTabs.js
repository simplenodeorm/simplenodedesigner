import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import '../app/App.css';
import { MenuButton } from './MenuButton';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Sidebar from "react-sidebar";
import {SelectModelDataPanel} from './SelectModelDataPanel';
import {ColumnSettingsPanel} from './ColumnSettingsPanel';
import {BaseDesignComponent} from './BaseDesignComponent';
import {ParameterInputPanel} from './ParameterInputPanel';
import {FilterPanel} from './FilterPanel';
import {QueryPanel} from './QueryPanel';
import config from '../config/appconfig.json';
import axios from 'axios';

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
            error: ''
        };    
        
        this.onSave = this.onSave.bind(this);
        this.onRun = this.onRun.bind(this);
        this.onHelp = this.onHelp.bind(this);
        this.onInputParameterClose = this.onInputParameterClose.bind(this);
        this.setTabState = this.setTabState.bind(this);
    }

    onSetSidebarOpen(open, model) {
        if (!document.designData.models) {
            this.loadModels();
        } else {
            this.state.tabIndex = 0;
            this.clearDocumentDesignData();
            if (model) {
                this.setState({sidebarOpen: open, tab0Disabled: false, tab1Disabled: true, tab2Disabled: true, tab3Disabled: true, selectedModel: model});
            } else {
                this.setState({sidebarOpen: open});
            }
        }
    }

    render() {
        const {tab0Disabled, tab1Disabled, tab2Disabled, tab3Disabled, error, selectedModel, loading, sidebarOpen, tabStateChanged} = this.state;
        let retval = (
            <div className="tabSetContainer"> 
                <MenuButton text={selectedModel} 
                    error={error} 
                    loading={loading}
                    saveDisabled={tab3Disabled}
                    runDisabled={tab3Disabled || (this.state.tabIndex < 3)}
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
                        <QueryPanel/>
                    </TabPanel>
                </Tabs>
            </div>);
            return retval;
    }
    

    onRun() {
        if (this.inputParametersRequired()) {
            const p = document.getElementById('ctxmenu');
            p.style.top = '100px';
            p.style.left = '50px';
            p.style.visibility = 'visible';

            ReactDOM.render(<ParameterInputPanel/>, p);
        }
        
    }
    
    onInputParameterClose() {
        
    }
        
    onHelp() {
        alert('----->onHelp');
    }
    
    onSave() {
        let inputParams;
    
        alert('----->onSave');
        this.getQueryDocument();
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