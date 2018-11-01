import React from 'react';
import SplitPane from 'react-split-pane';
import { DocumentTree } from './DocumentTree';
import { DesignTabs } from './DesignTabs';
import AppToolbar from './AppToolbar';
import '../app/App.css';

document.designData = {
    models: '',
    modelHierarchy: '',
    selectedObjectKeys: '',
    selnodes: '',
    whereComparisons: '',
    queryResults: ''
};

const contextMenu = document.createElement('div');
Object.assign(contextMenu.style, { position: 'absolute', visibility: 'hidden'});
contextMenu.className = 'popupMenu';
contextMenu.id = 'ctxmenu';
document.body.appendChild(contextMenu);

const modalContainer = document.createElement('div');
Object.assign(modalContainer.style, { position: 'absolute', visibility: 'hidden'});
modalContainer.className = 'modalContainer';
modalContainer.id = 'modalcontainer';
document.body.appendChild(modalContainer);

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