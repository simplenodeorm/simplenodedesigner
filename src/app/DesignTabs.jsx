import React from 'react';
import './App.css';
import 'react-tabs/style/react-tabs.css';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

class DesignTabs extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div className="tabContainer"><Tabs>
        <TabList>
          <Tab disabled>Select Data</Tab>
          <Tab disabled>Format Selections</Tab>
          <Tab disabled>Create Filter</Tab>
          <Tab disabled>Run Query</Tab>
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