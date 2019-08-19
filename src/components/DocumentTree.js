import React from 'react';
import ReactDOM from 'react-dom';
import Tree from 'rc-tree';
import '../app/App.css';
import './defaultTree.css';
import {BaseDesignComponent} from './BaseDesignComponent';
import axios from 'axios';
import {clearContextMenu,removeWaitMessage,getContextMenu} from './helpers';
import config from '../config/appconfig.json';
const qdimage = <img alt="query document" src="/images/querydoc.png"/>;
const qfimage = <img alt="query folder" src="/images/queryfolder.png"/>;

class DocumentTree extends BaseDesignComponent {
     constructor(props) {
        super(props);
        
        this.state = {
            groups: '',
            selectedDocument: ''
        };

        this.loadDocumentGroups();
        this.onRightClick = this.onRightClick.bind(this);
        this.editDocument = this.editDocument.bind(this);
        this.deleteDocument = this.deleteDocument.bind(this);
    }
    
    getIcon(props) {
        if (props.isLeaf) {
            return qdimage;
        } else {
            return qfimage;
        }
    }

    render() {
        const {groups} = this.state;
        if (groups) {
            return <div className="treeContainer">
                <Tree
                    onRightClick={this.onRightClick}
                    showLine
                    showIcon={true}
                    icon={this.getIcon}
                    defaultExpandAll={true}
                    treeData={groups}/></div>;

        } else {
            return <div className="treeContainer"/>;
        }
    }
    

    onRightClick(info) {
        const tree = this;
        if (info.node.props.isLeaf) {
            this.state.selectedDocument = info.node.props.eventKey;
            const cm = getContextMenu(info);
            ReactDOM.render(<ul><li><button onClick={tree.editDocument}>{config.textmsg.loaddocument}</button></li>{!config.demoMode && <li><button onClick={tree.deleteDocument}>{config.textmsg.deletedocument}</button></li>}</ul>, cm);
        } 
    }
    
    editDocument() {
        const curcomp = this;
        clearContextMenu();
        let {selectedDocument} = this.state;
        const httpcfg = {
            headers: {'Authorization': localStorage.getItem('auth')}
        };

        axios.get(config.apiServerUrl + '/api/query/load/' + selectedDocument, httpcfg)
            .then((response) => {
                if (response.status === 200) {
                    curcomp.loadDocumentData(response.data)
                } else {
                    curcomp.props.setStatus(response.statusText, true);
                }
            })
            .catch((err) => {
                curcomp.props.setStatus(err.toString(), true);
            });
    }

    deleteDocument() {
        let {selectedDocument} = this.state;
        let pos = selectedDocument.indexOf('.');
        let response = window.confirm('Delete document ' + selectedDocument.substring(pos+1).replace('_', ' ').replace('.json', '') + '?');
        if (response) {
            const curcomp = this;
            const httpcfg = {
                headers: {'Authorization': localStorage.getItem('auth')}
            };

            axios.get(config.apiServerUrl + '/api/query/delete/' + selectedDocument, httpcfg)
                .then((response) => {
                    if (response.status === 200) {
                        curcomp.loadDocumentsGroups();
                        curcomp.props.setStatus('document deleted', false);
                    } else {
                        curcomp.props.setStatus(response.statusText, true);
                    }
                })
                .catch((err) => {
                    curcomp.props.setStatus(err.toString(), true);
                });
        }
        this.state.selectedDocument = '';
        
        clearContextMenu();
    }
    
    loadDocumentGroups() {
        const curcomp = this;
        const httpcfg = {
            headers: {'Authorization': localStorage.getItem('auth')}
        };

        axios.get(config.apiServerUrl + '/api/query/document/groups', httpcfg)
            .then((response) => {
                if (response.status === 200) {
                    curcomp.setState({groups: response.data});
                } else {
                    curcomp.props.setStatus(response.statusText, true);
                }
            })
            .catch((err) => {
                curcomp.props.setStatus(err.toString(), true);
            });

    }

    loadDocumentData(doc) {
        this.showWaitMessage('Loading model hierarchy...');
        const curcomp = this;
        const seldoc = doc;
        const httpcfg = {
            headers: {'Authorization': localStorage.getItem('auth')}
        };

        curcomp.setState({model: seldoc.document.rootModel});
        axios.get(config.apiServerUrl + '/api/query/modeltree/' + seldoc.document.rootModel, httpcfg)
            .then((response) => {
                if (response.status === 200) {
                    curcomp.setCurrentDocument(seldoc, response.data);
                } else {
                    curcomp.props.setStatus(response.statusText, true);
                }
    
                removeWaitMessage();
            })
            .catch((err) => {
               curcomp.props.setStatus('' + err, true);
                removeWaitMessage();
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
        removeWaitMessage();
        this.props.setCurrentDocument(doc.documentName);
    }
    
    findNode(node, path) {
        let retval;
        let parts = path.split('\.');
        let curnode = node;
        if (parts.length > 1) {
            for (let i = 0; curnode && (i < (parts.length-1)); ++i) {
                for (let j = 0; j < curnode.children.length; ++j) {
                    if (curnode.children[j].title === parts[i]) {
                        curnode = curnode.children[j];
                        break;
                    }
                }
            }
        }
        
        for (let i = 0; i < curnode.children.length; ++i) {
            if (curnode.children[i].title === parts[parts.length-1]) {
                retval = curnode.children[i];
                break;
            }
        }
        
        return retval;
    }
}




export { DocumentTree };
