import React from 'react';
import SplitPane from 'react-split-pane';
import { DocumentTree } from './DocumentTree';
import { DesignTabs } from './DesignTabs';
import AppToolbar from './AppToolbar';
import '../app/App.css';

var documentTree;
class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const curcomp = this;
    
        return (<div><AppToolbar/>
        <br /><SplitPane 
                split="vertical" 
                minSize={10} 
                defaultSize={150}>
                <DocumentTree ref={(dtree) => {documentTree = dtree}}/>
                <DesignTabs reloadDocuments={this.reloadDocuments}/>
            </SplitPane></div>
        );
    }
    
    reloadDocuments() {
        documentTree.loadDocuments();
    }
}

export { HomePage };