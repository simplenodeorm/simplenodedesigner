import React from 'react';
import ReactDOM from 'react-dom';
import Tree, { TreeNode } from 'rc-tree';
import util from '../app/Util';
import 'rc-tree/assets/index.css';
import "../app/App.css";

        
var treeNodes;
class SelectModelDataPanel extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            selectedKeys: '',
            loading: false,
            error: ''
        };
    }

    
    render() {
        /*
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
        */
        return <div className="treeContainer">
            <Tree 
              onRightClick={this.onRightClick}
              onSelect={this.onSelect}
              showLine
              showIcon={true}
            >{treeNodes}</Tree></div>;
    }
    
    onSelect (selectedKeys) {
        this.setState({ selectedKeys });
        util.clearContextMenu();
    }
  
    onRightClick(info) {
        let contextMenu = util.getContextMenu();
        contextMenu.style.top = info.event.pageY + 'px';
        contextMenu.style.left = info.event.pageX + 'px';
        contextMenu.style.visibility = 'visible';

        if (info.node.props.isLeaf) {
       //     ReactDOM.render(<ul><li><a href="#" onClick={editDocument}>Edit Document</a></li><li><a href="#" onClick={runDocument}>Run Document</a></li><li><a href="#" onClick={deleteDocument}>Delete Document</a></li></ul>, contextMenu);
        } else {
      //      ReactDOM.render(<ul><li><a href="#" onClick={addDocument}>Add Document</a></li></ul>, contextMenu);
        }
    }
}

export {SelectModelDataPanel};