import 'rc-tree/assets/index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Tree, { TreeNode } from 'rc-tree';

import groups from '../config/document-groups.json';

const loop = (data) => {
  return data.map((item) => {
    if (item.groups) {
      return <TreeNode title={item.name} key={item.key}>
      {loop(item.groups)}
       </TreeNode>;
    }
    return <TreeNode title={item.name} key={item.key} isLeaf={true}/>
  });
};

const treeNodes = loop(groups);   
        
var contextMenu = document.createElement('div');
Object.assign(contextMenu.style, {
      position: 'absolute',
      visibility: 'hidden'});
contextMenu.className = 'popupMenu';
document.body.appendChild(contextMenu);


class DocumentTree extends React.Component  {
    constructor(props) {
        super(props);
        this.state = { selectedKeys: ''};
    }
    
    render() {
        return  (<div className="splitPaneChild">
            <Tree 
              onRightClick={this.onRightClick}
              onSelect={this.onSelect}
              showLine
              showIcon={true}
            >{treeNodes}</Tree></div>);
    }

    onSelect (selectedKeys) {
        this.state = { selectedKeys };
        this.clearContextMenu();
    }
  
    onRightClick(info) {
    //    this.setState({ selectedKeys: [info.node.props.eventKey] });
        
        contextMenu.style.top = info.event.pageY + 'px';
        contextMenu.style.left = info.event.pageX + 'px';
        contextMenu.style.visibility = 'visible';

        if (info.node.props.isLeaf) {
            ReactDOM.render(<ul><li><a href="#" onClick={this.editDocument}>Edit Document</a></li><li><a href="#" onClick={this.runDocument}>Run Document</a></li><li><a href="#" onClick={this.deleteDocument}>Delete Document</a></li></ul>, contextMenu);
        } else {
            ReactDOM.render(<ul><li><a href="#" onClick={this.addDocument}>Add Document</a></li></ul>, contextMenu);
        }
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

    clearContextMenu() {
        contextMenu.style.top = '-100px';
        contextMenu.style.left = '-100px';
        contextMenu.style.visibility = 'hidden';
    }


}

export { DocumentTree };
