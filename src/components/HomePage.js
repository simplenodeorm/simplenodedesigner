import React from 'react';
import SplitPane from 'react-split-pane';
import { DocumentTree } from './DocumentTree';
import { DesignTabs } from './DesignTabs';
import {AppToolbar} from './AppToolbar';
import {StatusBar} from './StatusBar';
import '../app/App.css';
import {clearDocumentDesignData} from './helpers';
import config from '../config/appconfig.json';

var documentTree;
var statusBar;
var designTabs;
class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.setTabState = this.setTabState.bind(this);
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
                            setCurrentDocument={this.setCurrentDocument}
                            setTabState={this.setTabState}/>
                        <DesignTabs 
                            ref={(dtabs) => {designTabs = dtabs}} 
                            reloadDocuments={this.reloadDocuments} 
                            setStatus={this.setStatus}/>
                    </SplitPane>
            </div>
            <StatusBar ref={(status) => {statusBar = status}} />
            </div>;

    }
    
    reloadDocuments() {
        documentTree.loadDocuments();
    }

    setCurrentDocument(docname) {
        if (!docname) {
            clearDocumentDesignData();
            designTabs.setDocumentLoaded(false);
            designTabs.setTabState(false, true, true, true);
            statusBar.setState({currentDocument: config.textmsg.newdocument});
        } else {
            designTabs.setDocumentLoaded(true);
            designTabs.setTabState(false, false, false, false);
            statusBar.setState({currentDocument: docname});
        }
    }
    
    setTabState(tab0State, tab1State, tab2State, tab3State) {
        designTabs.setTabState(tab0State, tab1State, tab2State, tab3State);
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