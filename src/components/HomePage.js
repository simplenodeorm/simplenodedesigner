import React from 'react';
import SplitPane from 'react-split-pane';
import { DocumentTree } from './DocumentTree';
import { DesignTabs } from './DesignTabs';
import {AppToolbar} from './AppToolbar';
import {StatusBar} from './StatusBar';
import '../app/App.css';

var documentTree;
var statusBar;
class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>
            <div>
                <AppToolbar setCurrentDocument={this.setCurrentDocument}/>
                    <br />
                    <SplitPane 
                        split="vertical" 
                        minSize={10} 
                        defaultSize={150}>
                        <DocumentTree ref={(dtree) => {documentTree = dtree}} 
                            setStatus={this.setStatus} 
                            setCurrentDocument={this.setCurrentDocument}/>
                        <DesignTabs reloadDocuments={this.reloadDocuments} setStatus={this.setStatus}/>
                    </SplitPane>
            </div>
            <StatusBar ref={(status) => {statusBar = status}} />
            </div>;

    }
    
    reloadDocuments() {
        documentTree.loadDocuments();
    }

    setCurrentDocument(docname) {
        statusBar.setState({currentDocument: docname});
    }
    
    setStatus(msg, iserr) {
        if (iserr) {
            statusBar.setState({error: msg});
        } else {
            statusBar.setState({info: msg});
        }
    }
}

export { HomePage };