import React from 'react';
import './App.css';
import { MenuButton } from '../components/MenuButton';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Sidebar from "react-sidebar";
import {SelectModelDataPanel} from '../components/SelectModelDataPanel'
import {FormatSelectionPanel} from '../components/FormatSelectionPanel'
import config from '../config/appconfig.json';
import axios from 'axios';

var curobj;
class DesignTabs extends React.Component {
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
            error: ''
        };    
        
        curobj = this;
    }

    onSetSidebarOpen(open, model) {
        if (!document.designData.models) {
            this.loadModels();
        } else {
            if (model) {
                this.setState({sidebarOpen: open, tab0Disabled: false, selectedModel: model});
            } else {
                this.setState({sidebarOpen: open});
            }
        }
    }

    render() {
        const {tab0Disabled, tab1Disabled, tab2Disabled, tab3Disabled, error, selectedModel, loading, sidebarOpen, tabStateChanged} = this.state;
        return (
            <div className="tabContainer"> 
                <MenuButton text={selectedModel} 
                    error={error} 
                    loading={loading}
                    onMenuClick={() => {  this.onSetSidebarOpen(true); }}/>
                {sidebarOpen &&
                <Sidebar 
                    sidebar={document.designData.models}
                    open={sidebarOpen}
                    onSetOpen={this.onSetSidebarOpen}>
                </Sidebar> }
                <Tabs onSelect={this.onTabSelected}>
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
                        <FormatSelectionPanel setTabState={this.setTabState}/>
                    </TabPanel>
                    <TabPanel>
                        <p>
                            <b>Tab3 panel</b>
                        </p>
                    </TabPanel>
                    <TabPanel>
                        <p>
                            <b>Tab4 panel</b>
                        </p>
                    </TabPanel>
                </Tabs>
            </div>);
    }
    
    onTabSelected(index, lastIndex) {
        if (lastIndex !== index) {
            if (lastIndex === 0) {
                document.designData.savedModelTree = document.designData.lastModelTree;
            } 
        }
    }
    setTabState(tab0, tab1, tab2, tab3) {
        curobj.setState({tab0Disabled: tab0, tab1Disabled: tab1, tab2Disabled: tab2, tab3Disabled: tab3, tabStateChanged: true});
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