import React from 'react';
import ReactDOM from 'react-dom';
import Tree from 'rc-tree';
import '../app/App.css';
import './defaultTree.css';
import groups from '../config/document-groups.json';
import {BaseDesignComponent} from './BaseDesignComponent';
import axios from 'axios';
import {clearContextMenu} from './helpers';
import {getContextMenu} from './helpers';
import {updateState} from './HomePage';
const qdimage = <img alt="query document" src="/images/querydoc.png"/>;
const qfimage = <img alt="query folder" src="/images/queryfolder.png"/>;

class DocumentTree extends BaseDesignComponent {
     constructor(props) {
        super(props);
        
        this.state = {
            selectedDocument: ''
        };

        this.loadDocuments();
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
        const {documents} = this.state;
        if (documents) {
            let treeData = JSON.parse(JSON.stringify(groups));
            this.traverseDocumentGroups(treeData,  documents);
            
            return <div className="treeContainer">
                <Tree 
                  onRightClick={this.onRightClick}
                  showLine
                  showIcon={true}
                  icon={this.getIcon}
                  defaultExpandAll={true}
                  treeData={treeData}></Tree></div>;

        } else {
            return <div className="treeContainer"></div>
        }
    }
    
    traverseDocumentGroups(grp,  documents) {
        if (!grp.isLeaf) {
            let canRecurse = grp.children;
            let docs = documents[grp.key];
            if (docs) {
                if (!grp.children) {
                    grp.children = [];
                    canRecurse = false;
                } 
                
                for (let j = 0; j < docs.length; ++j) {
                    let leaf = {
                        title: docs[j].replace('_', ' ').replace('.json', ''),
                        isLeaf: true,
                        key: (grp.key + '.' + docs[j])
                    };
                    grp.children.push(leaf);
                    
               }
            }

            if (canRecurse) {
                for (let i = 0; i < grp.children.length; ++i) {
                    this.traverseDocumentGroups(grp.children[i], documents);
                }
            }
        }
    }


    
    onRightClick(info) {
        const tree = this;
        if (info.node.props.isLeaf) {
            this.state.selectedDocument = info.node.props.eventKey;
            const cm = getContextMenu(info);
            ReactDOM.render(<ul><li><a href="#" onClick={tree.editDocument}>Edit Document</a></li><li><a href="#" onClick={tree.deleteDocument}>Delete Document</a></li></ul>, cm);
        } 
    }
    
    editDocument() {
        const curcomp = this;
        clearContextMenu();
        let {selectedDocument} = this.state;
        const orm = JSON.parse(localStorage.getItem('orm'));
        const config = {
            headers: {'Authorization': orm.authString}
        };

        axios.get(orm.url + '/design/loaddocument/' + selectedDocument, config)
            .then((response) => {
                if (response.status === 200) {
                    curcomp.setCurrentDocument(response.data)
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
            const orm = JSON.parse(localStorage.getItem('orm'));
            const config = {
                headers: {'Authorization': orm.authString}
            };

            axios.get(orm.url + '/design/deletedocument/' + selectedDocument, config)
                .then((response) => {
                    if (response.status === 200) {
                        curcomp.loadDocuments()
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
    
    loadDocuments() {
        const curcomp = this;
        const orm = JSON.parse(localStorage.getItem('orm'));
        const config = {
            headers: {'Authorization': orm.authString}
        };

        axios.get(orm.url + '/design/documents', config)
            .then((response) => {
                if (response.status === 200) {
                    curcomp.setState({documents: response.data});
                } else {
                    curcomp.props.setStatus(response.statusText, true);
                }
            })
            .catch((err) => {
                curcomp.setStatus(err.toString(), true);
            });

    }
    
    setCurrentDocument(doc) {
        this.props.setStatus
    }
}




export { DocumentTree };
