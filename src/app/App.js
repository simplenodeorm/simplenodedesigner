import React from 'react';
import './App.css';
import SplitPane from 'react-split-pane';
import DocumentTree from './DocumentTree';
import DesignTabs from './DesignTabs';

function App () {
    return <SplitPane split="vertical" 
        minSize={50} 
        defaultSize={100}>
        <div/>
        <DesignTabs/>
    </SplitPane>;
}

export default App;
