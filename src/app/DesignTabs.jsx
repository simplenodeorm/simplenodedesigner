import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import 'react-tabs/style/react-tabs.css';
import { MenuButton } from '../components/MenuButton';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Sidebar from "react-sidebar";
import orms from '../config/orms.json';
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
            sidebarOpen: false,
            modelsLoaded: false,
            selectedModel: config.modelselectdefault,
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
                this.loadModelHierarchy();
            } else {
                this.setState({ sidebarOpen: open });
            }
        }
    }
    
    loadModelHierarchy() {
        
    }
    render() {
        const {tab0Disabled, tab1Disabled, tab2Disabled, tab3Disabled, error, selectedModel, loading} = this.state;
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
          <Tab disabled={tab0Disabled}>Select Data</Tab>
          <Tab disabled={tab1Disabled}>Format Selections</Tab>
          <Tab disabled={tab2Disabled}>Create Filter</Tab>
          <Tab disabled={tab3Disabled}>Run Query</Tab>
        </TabList>
        <TabPanel>
          <p>
            <b>Tab1 panel</b>
          </p>
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
        </Tabs></div>);
    }
    
    onDisplaySidebar() {
        this.onSetSidebarOpen(true);
    }
    
    loadModels() {
        const curcomp = this;
        const url = getOrm().url;
        const instance = axios.create({baseURL: url});
        const authString = localStorage.getItem('user');
        const config = {
            headers: {'Authorization': authString}
        };
        
        this.setState({loading: true});
        instance.get('/design/modelnames', config)
            .then((response) => {
                if (response.status === 200) {
                    const loop = (data) => {
                        return data.map((item) => {
                            return <button onClick={() => curcomp.onSetSidebarOpen(false, item)}>{item}</button>;
                        });
                    };

                    models = <div className="sidebarContainer">{loop(response.data)}</div>;
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

function getOrm() {
    let retval;
    let ormname = localStorage.getItem('orm');

    for (let i = 0; i < orms.length; ++i) {
        if (ormname === orms[i].name) {
            retval = orms[i];
        }
    }

    return retval;
};

export {DesignTabs};