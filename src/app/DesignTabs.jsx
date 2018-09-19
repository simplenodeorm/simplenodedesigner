import React from 'react';
import './App.css';
import 'react-tabs/style/react-tabs.css';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

class DesignTabs extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            tab0Disabled: true,
            tab1Disabled: true,
            tab2Disabled: true,
            tab3Disabled: true
        }
    }

    render() {
        const {tab0Disabled, tab1Disabled, tab2Disabled, tab3Disabled} = this.state;
        return (<div className="tabContainer"><Tabs>
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
};

export {DesignTabs};