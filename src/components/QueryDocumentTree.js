/*
 * Copyright (c) 2019 simplenodeorm.org
 */

import React from 'react';
import ReactDOM from 'react-dom';
import '../app/App.css';
import {DocumentTree} from '@simplenodeorm/simplenodeclientbase/lib/DocumentTree';
import config from '../config/appconfig.json';
const qdimage = <img alt="query document" src="/images/querydoc.png"/>;
const qfimage = <img alt="query folder" src="/images/queryfolder.png"/>;

class QueryDocumentTree extends DocumentTree {
     constructor(props) {
        super(props);
        this.editDocument = this.editDocument.bind(this);
        this.deleteDocument = this.deleteDocument.bind(this);
        this.loadDocumentData = this.loadDocumentData.bind(this);
        this.setCurrentDocument = this.setCurrentDocument.bind(this);
    }

    getFolderImage() {
         return qfimage;
    }

    getDocumentImage() {
         return qdimage;
    }

    getConfig() {
         return config;
    }

    showRightClickMenu(info) {
        const tree = this;
        if (info.node.props.isLeaf) {
            this.state.selectedDocument = info.node.props.eventKey;
            const cm = this.getContextMenu(info);
            ReactDOM.render(<ul><li><button onClick={tree.editDocument}>{config.textmsg.loaddocument}</button></li>{!config.demoMode && <li><button onClick={tree.deleteDocument}>{config.textmsg.deletedocument}</button></li>}</ul>, cm);
        } 
    }
    
    editDocument() {
        const curcomp = this;
        this.clearContextMenu();
        const {selectedDocument} = this.state;
        this.sendRequest('/api/query/load/' + selectedDocument,
            (data) => {
                curcomp.loadDocumentData(data);
            },
            (err) => {
                curcomp.props.setStatus(curcomp.formatError(err), true);
            });
    }

    deleteDocument() {
        const {selectedDocument} = this.state;
        let pos = selectedDocument.indexOf('.');
        let response = window.confirm('Delete document ' + selectedDocument.substring(pos+1).replace('_', ' ').replace('.json', '') + '?');
        if (response) {
            const curcomp = this;

            this.sendRequest('/api/query/delete/' + selectedDocument,
                (data) => {
                    curcomp.props.setStatus('document deleted', false);
                    curcomp.loadDocumentGroups();
                },
                (err) => {
                    curcomp.props.setStatus(curcomp.formatError(err), true);
                });
        }

        this.state.selectedDocument = '';
        this.clearContextMenu();
    }
    
    loadDocumentGroups() {
        const curcomp = this;
        this.sendRequest('/api/query/document/groups',
            (data) => {
                curcomp.setState({groups: data});
            },
            (err) => {
                curcomp.props.setStatus(curcomp.formatError(err), true);
            });
    }

    loadDocumentData(doc) {
        this.showWaitMessage('Loading model hierarchy...');
        const curcomp = this;
        const seldoc = doc;
        curcomp.setState({model: seldoc.document.rootModel});
        this.sendRequest('/api/query/modeltree/' + seldoc.document.rootModel,
            (data) => {
            curcomp.setCurrentDocument(seldoc, data);
            },
            (err) => {
                curcomp.props.setStatus(curcomp.formatError(err), true);
                this.removeWaitMessage();
            });
    }

    setCurrentDocument(doc, data) {
        document.designData.modelHierarchy = data;
        document.designData.currentDocument = doc;
        document.designData.whereComparisons = doc.document.whereComparisons;
        document.designData.selnodes = [];
        document.designData.selectedObjectKeys = [];
        
        for (let i = 0; i < doc.document.selectedColumns.length; ++i) {
            let selnode = this.findNode(document.designData.modelHierarchy, doc.document.selectedColumns[i].path);
            if (selnode) {
                selnode.__path__ = doc.document.selectedColumns[i].path;
                selnode.__columnLabel = doc.document.selectedColumns[i].label;
                selnode.__selectedFunction = doc.document.selectedColumns[i].function;
                selnode.__sortPosition = doc.document.selectedColumns[i].sortPosition;
                selnode.__sortDescending = doc.document.selectedColumns[i].sortDescending;
                selnode.__customColumnInput = doc.document.selectedColumns[i].customInput;
                document.designData.selnodes.push(selnode);
                document.designData.selectedObjectKeys.push(selnode.key);
            }
        }
        document.designData.queryResults = '';
        this.removeWaitMessage();
        this.props.setCurrentDocument(doc.documentName);
    }
}




export { QueryDocumentTree };
