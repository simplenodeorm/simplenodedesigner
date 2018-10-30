import React from 'react';
import ReactDOM from 'react-dom';
import Tree, { TreeNode } from 'rc-tree';
import '../app/App.css';
import './defaultTree.css';
import groups from '../config/document-groups.json';
import {BaseDesignComponent} from './BaseDesignComponent';


const loop = (data) => {
return data.map((item) => {
  if (item.groups) {
    return <TreeNode title={item.name} key={item.key} isLeaf={false}>
    {loop(item.groups)}
     </TreeNode>;
  }
  return <TreeNode title={item.name} key={item.key} isLeaf={false}/>;
});
};

const treeNodes = loop(groups);   


var selectedKeys;
class DocumentTree extends BaseDesignComponent {
     constructor(props) {
        super(props);
        
        this.state = {
            selectedKeys: '',
            loading: false,
            error: ''
        };
        
        this.onRightClick = this.onRightClick.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.addDocument = this.addDocument.bind(this);
        this.editDocument = this.editDocument.bind(this);
        this.runDocument = this.runDocument.bind(this);
        this.deleteDocument = this.deleteDocument.bind(this);
    }
    
    render() {
        return <div className="treeContainer">
        <Tree 
          onRightClick={this.onRightClick}
          onSelect={this.onSelect}
          showLine
          showIcon={true}
          defaultExpandAll={true}
        >{treeNodes}</Tree></div>;
        
    }
    
    onRightClick(info) {
        const cm = this.getContextMenu(info);

        if (info.node.props.isLeaf) {
            ReactDOM.render(<ul><li><a href="#" onClick={this.editDocument}>Edit Document</a></li><li><a href="#" onClick={this.runDocument}>Run Document</a></li><li><a href="#" onClick={this.deleteDocument}>Delete Document</a></li></ul>, cm);
        } else {
            ReactDOM.render(<ul><li><a href="#" onClick={this.addDocument}>Add Document</a></li></ul>, cm);
        }
    }
    
    onSelect(selkeys) {
        selectedKeys = selkeys;
        this.clearContextMenu();
    }

    addDocument() {
        this.clearContextMenu();
    }

    editDocument() {
        this.clearContextMenu();
    }

    runDocument() {
        this.clearContextMenu();
    }

    deleteDocument() {
        this.clearContextMenu();
    }
}




export { DocumentTree };
