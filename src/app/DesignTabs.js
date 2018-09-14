import React from 'react';
import './App.css';
import 'react-tabs/style/react-tabs.css';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

function DesignTabs () {
    return <Tabs>
        <TabList>
          <Tab>Tab1</Tab>
          <Tab disabled>Tab2</Tab>
          <Tab>Tab3</Tab>
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
      </Tabs>;
};

export default DesignTabs;