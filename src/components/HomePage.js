/*
 * Copyright (c) 2019 simplenodeorm.org
 */

import React from 'react';
import SplitPane from 'react-split-pane';
import { QueryDocumentTree } from './QueryDocumentTree';
import { DesignTabs } from './DesignTabs';
import {AppToolbar} from './AppToolbar';
import {StatusBar} from './StatusBar';
import '../app/App.css';
import {clearDocumentDesignData} from './helpers';
import config from '../config/appconfig.json';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.setTabState = this.setTabState.bind(this);
        this.documentTree = React.createRef();
        this.statusBar = React.createRef();
        this.designTabs = React.createRef();
        this.setStatus = this.setStatus.bind(this);
        this.reloadDocuments = this.reloadDocuments.bind(this);
        this.setCurrentDocument = this.setCurrentDocument.bind(this);
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
                        <QueryDocumentTree ref={this.documentTree}
                           setStatus={this.setStatus}
                           setCurrentDocument={this.setCurrentDocument}
                           setTabState={this.setTabState}/>
                        <DesignTabs
                            ref={this.designTabs}
                            reloadDocuments={this.reloadDocuments} 
                            setStatus={this.setStatus}
                            setCurrentDocument={this.setCurrentDocument}/>
                    </SplitPane>
            </div>
            <StatusBar ref={this.statusBar} />
            </div>;

    }
    
    reloadDocuments() {
        this.documentTree.current.loadDocumentGroups();
    }

    setCurrentDocument(docname) {
        if (docname) {
            this.designTabs.current.setDocumentLoaded(true);
            this.statusBar.current.setState({currentDocument: docname});
            this.designTabs.current.setState({tab0Disabled: false, tab1Disabled: false,
                tab2Disabled: false, tab3Disabled: false, tabIndex: 0, tabStateChanged: true, selectedModel: document.designData.model});
        } else {
            clearDocumentDesignData();
            this.designTabs.current.setState({tab0Disabled: false, tab1Disabled: true, tab2Disabled: true,
                tab3Disabled: true, tabIndex: 0, tabStateChanged: true, selectedModel: config.textmsg.modelselectdefault});
            this.designTabs.current.setDocumentLoaded(false);
            this.statusBar.current.setState({currentDocument: config.textmsg.newdocument, error: '', inf0: ''});
        }
    }
    
    setTabState(tab0State, tab1State, tab2State, tab3State) {
        this.designTabs.current.setTabState(tab0State, tab1State, tab2State, tab3State);
    }
    
    setStatus(msg, iserr) {
        if (iserr) {
            this.statusBar.current.setState({error: msg, info: ''});
        } else {
            this.statusBar.current.setState({info: msg, error: ''});
        }
    }
}

export { HomePage };