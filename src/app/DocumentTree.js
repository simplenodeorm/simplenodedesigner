import 'rc-tree/assets/index.css';
import React from 'react';
import Tree, { TreeNode } from 'rc-tree';
import Tooltip from 'rc-tooltip';

function DocumentTree () {
    return  <div>
        <h2>Documents</h2>
        <Tree
          onRightClick={onRightClick}
          onSelect={onSelect}
          multiple
          defaultExpandAll
          showLine
          showIcon={false}
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