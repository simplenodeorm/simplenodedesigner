import 'rc-tree/assets/index.css';
import React from 'react';
import './App.css';
import { Button } from 'reactstrap';
import Tree, { TreeNode } from 'rc-tree';
import groups from '../config/document-groups.json';

var cmContainer;
var state = { selectedKeys: ''};
  
function DocumentTree () {
    const loop = (data) => {
      return data.map((item) => {
        if (item.groups) {
          return <TreeNode title={item.name} key={item.key}>{loop(item.groups)}</TreeNode>;
        }
        return (<TreeNode title={item.name} key={item.key} isLeaf={false}/>);
      });
    };
    
    const treeNodes = loop(groups);   
        
    return  <div className="splitPaneChild">
        <div className="listHeaderLabel">Documents:</div>
        <Tree 
          onRightClick={onRightClick}
          onSelect={onSelect}
          showLine
          showIcon={true}
        >{treeNodes}</Tree></div>;
}

function addDocument() {
}

function onSelect (selectedKeys) {
    state = { selectedKeys };
}
  
function onRightClick(info) {
    state = { selectedKeys: [info.node.props.eventKey] };
    if (info.node.props.isLeaf) {
        alert('------------------>document=' + info.node.props.name);
    } else {
        alert('------------------>folder');
    }
    renderCm(info);
}


function getContainer() {
    if (!cmContainer) {
      cmContainer = document.createElement('div');
      document.body.appendChild(cmContainer);
    }
    return cmContainer;
}
  
function renderCm(info) {
    const container = getContainer();
    Object.assign(cmContainer.style, {
      position: 'absolute',
      left: `${info.event.pageX}px`,
      top: `${info.event.pageY}px`,
    });

  //  ReactDOM.render(this.toolTip, container);
  }
export default DocumentTree;