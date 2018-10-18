import React from 'react';
import ReactDOM from 'react-dom';
import Tree, { TreeNode } from 'rc-tree';
import '../app/App.css';
import './defaultTree.css';
import groups from '../config/document-groups.json';


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
        return <div className="treeContainer">
        <Tree 
          onRightClick={onRightClick}
          onSelect={onSelect}
          showLine
          showIcon={true}
        >{treeNodes}</Tree></div>;
        
    }
}

function onSelect (selkeys) {
    selectedKeys = selkeys;
    clearContextMenu();
}

function onRightClick(info) {
    const cm = document.getElementById('ctxmenu');
    cm.style.top = info.event.pageY + 'px';
    cm.style.left = info.event.pageX + 'px';
    cm.style.visibility = 'visible';

    if (info.node.props.isLeaf) {
        ReactDOM.render(<ul><li><a href="#" onClick={editDocument}>Edit Document</a></li><li><a href="#" onClick={runDocument}>Run Document</a></li><li><a href="#" onClick={deleteDocument}>Delete Document</a></li></ul>, cm);
    } else {
        ReactDOM.render(<ul><li><a href="#" onClick={addDocument}>Add Document</a></li></ul>, cm);
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
    let cm = document.getElementById('ctxmenu');
    cm.style.top = '-100px';
    cm.style.left = '-100px';
    cm.style.visibility = 'hidden';
}

export { DocumentTree };
