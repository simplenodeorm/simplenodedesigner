import 'rc-tree/assets/index.css';
import React from 'react';
import './App.css';
import Button from 'react-button-component';
import Tree, { TreeNode } from 'rc-tree';

const CustomizedButton = Button.extend`
  color: #FFF;
  border: none;
  height: 10px;
  border-radius: 5px;
  background: linear-gradient(70deg, #FF5686, #FF7B9E);
  border-bottom: 5px solid #C44267;
  `
function DocumentTree () {
    return  <div className="splitPaneChild">
        <div className="listHeaderLabel"><CustomizedButton onClick={addDocument}>+</CustomizedButton>Documents:</div>
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

function onRightClick() {
    
}

function onSelect() {
    
}

export default DocumentTree;