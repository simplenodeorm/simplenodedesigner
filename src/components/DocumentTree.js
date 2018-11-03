import React from 'react';
import ReactDOM from 'react-dom';
import Tree, { TreeNode } from 'rc-tree';
import '../app/App.css';
import './defaultTree.css';
import groups from '../config/document-groups.json';
import {BaseDesignComponent} from './BaseDesignComponent';
import Spinner from './Spinner';
import axios from 'axios';

const qdimage = <img alt="query document" src="/images/querydoc.png"/>;
const qfimage = <img alt="query folder" src="/images/queryfolder.png"/>;

var selectedKeys;
class DocumentTree extends BaseDesignComponent {
     constructor(props) {
        super(props);
        
        this.state = {
            selectedKeys: '',
            loading: false,
            error: '',
            selectedDocument: ''
        };
        
        this.loadDocuments();
        this.onRightClick = this.onRightClick.bind(this);
        this.onSelect = this.onSelect.bind(this);
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
        const {loading, error, documents} = this.state;
        if (!loading && !error && documents) {
            let treeData = JSON.parse(JSON.stringify(groups));
            this.traverseDocumentGroups(treeData,  documents);
            
            return <div className="treeContainer">
                <Tree 
                  onRightClick={this.onRightClick}
                  onSelect={this.onSelect}
                  showLine
                  showIcon={true}
                  icon={this.getIcon}
                  defaultExpandAll={true}
                  treeData={treeData}></Tree></div>;

        } else {
         return <div className="treeContainer">
            {error && <div className="errorMessage">{error}</div>}
            {loading && <div className="panelPrompt1"><Spinner/>&nbsp;&nbsp;Loading documents...</div>}
            </div>;
        }
    }
    
    traverseDocumentGroups(grp,  documents) {
        if (!grp.isLeaf) {
            let canRecurse = grp.children;
            let docs = documents[grp.key];
            if (docs) {
                if (!grp.children) {
                    grp.children = new Array();
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
            const cm = this.getContextMenu(info);
            ReactDOM.render(<ul><li><a href="#" onClick={tree.editDocument}>Edit Document</a></li><li><a href="#" onClick={tree.deleteDocument}>Delete Document</a></li></ul>, cm);
        } 
    }
    
    onSelect(selkeys) {
        selectedKeys = selkeys;
        this.clearContextMenu();
    }

    editDocument() {
        this.clearContextMenu();
    }

    deleteDocument() {
        let {selectedDocument} = this.state;
        let pos = selectedDocument.indexOf('.');
        let response = window.confirm('Delete document ' + selectedDocument.substring(pos+1).replace('_', ' ').replace('.json', '') + '?');
        if (response) {
            
        }
        this.state.selectedDocument = '';
        this.clearContextMenu();
    }
    
    loadDocuments() {
        const curcomp = this;
        const orm = JSON.parse(localStorage.getItem('orm'));
        const config = {
            headers: {'Authorization': orm.authString}
        };

        this.setState({loading: true});
        axios.get(orm.url + '/design/documents', config)
            .then((response) => {
                if (response.status === 200) {
                    curcomp.setState({loading: false, documents: response.data});
                } else {
                    curcomp.setState({error: response.statusText, loading: false});
                }
            })
            .catch((err) => {
                curcomp.setState({error: err.toString(), loading: false});
            });

    }
}




export { DocumentTree };
