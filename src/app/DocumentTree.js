import 'rc-tree/assets/index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Tree, { TreeNode } from 'rc-tree';

import groups from '../config/document-groups.json';

var contextMenu = document.createElement('div');
Object.assign(contextMenu.style, {
      position: 'absolute',
      visibility: 'hidden'});
document.body.appendChild(contextMenu);

var state;

function DocumentTree () {
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
        
    return  <div className="splitPaneChild">
        <Tree 
          onRightClick={onRightClick}
          onSelect={onSelect}
          showLine
          showIcon={true}
        >{treeNodes}</Tree></div>;
}

function onSelect (selectedKeys) {
    state = { selectedKeys };
    clearContextMenu();
}
  
function onRightClick(info) {
    state = { selectedKeys: [info.node.props.eventKey] };
    contextMenu.className = 'popupMenu';
    contextMenu.style.top = info.event.pageY + 'px';
    contextMenu.style.left = info.event.pageX + 'px';
    contextMenu.style.visibility = 'visible';

    let html = '';
    if (info.node.props.isLeaf) {
        ReactDOM.render(<ul><li><a href="#" onClick={editDocument}>Edit Document</a></li><li><a href="#" onClick={runDocument}>Run Document</a></li><li><a href="#" onClick={deleteDocument}>Delete Document</a></li></ul>, contextMenu);
    } else {
        ReactDOM.render(<ul><li><a href="#" onClick={addDocument}>Add Document</a></li></ul>, contextMenu);
    }
}

function addDocument() {
   clearContextMenu();
}

function editDocument() {
   clearContextMenu();
}

function runDocument() {
   clearContextMenu();
}

function deleteDocument() {
    clearContextMenu();
}

function clearContextMenu() {
    contextMenu.style.top = '-100px';
    contextMenu.style.left = '-100px';
    contextMenu.style.visibility = 'hidden';
}
export default DocumentTree;
