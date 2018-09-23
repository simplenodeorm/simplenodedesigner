import React from 'react';
import ReactDOM from 'react-dom';
import Tree, { TreeNode } from 'rc-tree';
import './App.css';
import 'rc-tree/assets/index.css';
import groups from '../config/document-groups.json';

var contextMenu = document.createElement('div');
Object.assign(contextMenu.style, {
      position: 'absolute',
      visibility: 'hidden'});
contextMenu.className = 'popupMenu';
contextMenu.id = 'cmdtree'

if (!document.getElementById('cmdtree')) {
    document.body.appendChild(contextMenu);
}

var selectedKeys;

class DocumentTree extends React.Component {
     constructor(props) {
        super(props);
        
        this.state = {
            selectedKeys: '',
            loading: false,
            error: ''
        };
    }
    
    render() {
        const loop = (data) => {
        return data.map((item) => {
          if (item.groups) {
            return <TreeNode title={item.name} key={item.key} isLeaf={false}>
            {loop(item.groups)}
             </TreeNode>;
          }
          return <TreeNode title={item.name} key={item.key} isLeaf={false}/>
        });
      };

      const treeNodes = loop(groups);   
        return <div className="treeContainer">
        <Tree 
          onRightClick={onRightClick}
          onSelect={onSelect}
          showLine
          showIcon={true}
        >{treeNodes}</Tree></div>;
    }
}

function onSelect (selkeys, e) {
    selectedKeys = selkeys;
    clearContextMenu();
}

function onRightClick(info) {
    contextMenu.style.top = info.event.pageY + 'px';
    contextMenu.style.left = info.event.pageX + 'px';
    contextMenu.style.visibility = 'visible';

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

function  deleteDocument() {
    clearContextMenu();
}

function clearContextMenu() {
    contextMenu.style.top = '-100px';
    contextMenu.style.left = '-100px';
    contextMenu.style.visibility = 'hidden';
}

export { DocumentTree };
