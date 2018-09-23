import React from 'react';
import SplitPane from 'react-split-pane';
import { DocumentTree } from './DocumentTree';
import { DesignTabs } from './DesignTabs';
import AppToolbar from './AppToolbar';
import './App.css';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div><AppToolbar/>
        <br /><SplitPane 
                    split="vertical" 
                    minSize={10} 
                    defaultSize={150}>
                    <DocumentTree/>
                    <DesignTabs/>
                </SplitPane></div>
                
            );
    }
}

export { HomePage };