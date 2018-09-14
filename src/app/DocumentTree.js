import 'rc-tree/assets/index.css';
import React from 'react';
import './App.css';
import Tree, { TreeNode } from 'rc-tree';

function DocumentTree () {
    return  <div className="splitPaneChild">
        <div className="listHeaderLabel">Documents:</div>
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

function onRightClick() {
    
}

function onSelect() {
    
}

export default DocumentTree;