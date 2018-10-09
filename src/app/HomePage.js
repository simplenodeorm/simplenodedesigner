import React from 'react';
import SplitPane from 'react-split-pane';
import { DocumentTree } from './DocumentTree';
import { DesignTabs } from './DesignTabs';
import AppToolbar from './AppToolbar';
import './App.css';

document.designData = {
    models: '',
    modelHierarchy: '',
    selectedObjectKeys: ''
};

const contextMenu = document.createElement('div');
Object.assign(contextMenu.style, { position: 'absolute', visibility: 'hidden'});
contextMenu.className = 'popupMenu';
contextMenu.id = 'ctxmenu';
document.body.appendChild(contextMenu);

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