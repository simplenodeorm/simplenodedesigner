import React from 'react';
import './app.css';
import SplitPane from 'react-split-pane';
import Navigation from './components/Navigation';
import Design from './components/Design';

function App () {
    return <SplitPane split="vertical" 
        minSize={50} 
        defaultSize={100}>
        <Navigation/>
        <Design/>
    </SplitPane>;
}

export default App;
