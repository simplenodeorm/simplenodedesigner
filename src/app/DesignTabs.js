import React from 'react';
import './App.css';
import { MenuButton } from '../components/MenuButton';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Sidebar from "react-sidebar";
import {SelectModelDataPanel} from '../components/SelectModelDataPanel'
import config from '../config/appconfig.json';
import axios from 'axios';

var models;
class DesignTabs extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            tab0Disabled: true,
            tab1Disabled: true,
            tab2Disabled: true,
            tab3Disabled: true,
            tab4Disabled: true,
            sidebarOpen: false,
            modelsLoaded: false,
            selectedModel: config.textmsg.modelselectdefault,
            loading: false,
            error: ''
        };

        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    }

    onSetSidebarOpen(open, model) {
        const {modelsLoaded} = this.state;
        if (!modelsLoaded) {
          this.loadModels();
        } else {
            
            if (model) {
                this.setState({ sidebarOpen: open, tab0Disabled: false, selectedModel: model});
            } else {
                this.setState({ sidebarOpen: open });
            }
        }
    }
    
    render() {
        const {tab0Disabled, tab1Disabled, tab2Disabled, tab3Disabled, tab4Disabled, error, selectedModel, loading} = this.state;
        return (
        
       <div className="tabContainer"> 
        <Sidebar
            sidebar={models}
            open={this.state.sidebarOpen}
            onSetOpen={this.onSetSidebarOpen}>
       <MenuButton text={selectedModel} 
            error={error} 
            loading={loading}
            onMenuClick={() => this.onSetSidebarOpen(true)}/>
      </Sidebar><br />
        
        <Tabs>
        <TabList>
          <Tab disabled={tab0Disabled}>{config.textmsg.selectdata}</Tab>
          <Tab disabled={tab1Disabled}>{config.textmsg.formatselections}</Tab>
          <Tab disabled={tab2Disabled}>{config.textmsg.definefilter}</Tab>
          <Tab disabled={tab3Disabled}>{config.textmsg.designreport}</Tab>
          <Tab disabled={tab4Disabled}>{config.textmsg.runquery}</Tab>
        </TabList>
        <TabPanel disabled={tab0Disabled}>
            <SelectModelDataPanel model={selectedModel}/>
        </TabPanel>
        <TabPanel>
          <p>
            <b>Tab2 panel</b>

          </p>
        </TabPanel>
        <TabPanel>
          <p>
            <b>Tab3 panel</b>

          </p>
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
        </Tabs></div>);
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

                    models = <div className="sidebarContainer">{modelLoop(response.data)}</div>;
                    curcomp.setState({ sidebarOpen: true, modelsLoaded: true, loading: false});
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