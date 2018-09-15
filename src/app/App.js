import React from 'react';
import './App.css';
import SplitPane from 'react-split-pane';
import DocumentTree from './DocumentTree';
import DesignTabs from './DesignTabs';
import AppToolbar from './AppToolbar';

function App () {
    return <SplitPane 
        split="vertical" 
        minSize={10} 
        defaultSize={100}>
        <DocumentTree/>
        <DesignTabs/>
        </SplitPane>;
}

export default App;