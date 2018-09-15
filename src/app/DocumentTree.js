import 'rc-tree/assets/index.css';
import React from 'react';
import './App.css';
import { Button } from 'reactstrap';
import Tree, { TreeNode } from 'rc-tree';

var cmContainer;
var state = {
    selectedKeys: ['0-1', '0-1-1']
  };
function DocumentTree () {
    return  <div className="splitPaneChild">
        <div className="listHeaderLabel"><Button className="addButton" size="sm" onClick={addDocument}>+</Button>Documents:</div>
        <Tree 
          onRightClick={onRightClick}
          onSelect={onSelect}
          showLine
          showIcon={true}
        >
          <TreeNode title="parent 1" key="0-1">
            <TreeNode title="parent 1-0" key="0-1-1">
              <TreeNode title="leaf0" isLeaf />
              <TreeNode title="leaf1" isLeaf />
              <TreeNode title="leaf2" isLeaf />
            </TreeNode>
            <TreeNode title="parent 1-1">
              <TreeNode title="leaf" isLeaf />
            </TreeNode>
          </TreeNode>
        </Tree>
      </div>
    
};

function addDocument() {
}

function onSelect (selectedKeys) {
    state = { selectedKeys };
}
  
function onRightClick(info) {
    state = { selectedKeys: [info.node.props.eventKey] };
    alert('---------------->' + info.node.props.eventKey);
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