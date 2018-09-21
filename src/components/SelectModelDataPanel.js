import React from 'react';
import ReactDOM from 'react-dom';
import Tree, { TreeNode } from 'rc-tree'
import 'rc-tree/assets/index.css';
import "../app/App.css";
import orms from '../config/orms.json';
import config from '../config/appconfig.json';
import axios from 'axios';


var contextMenu = document.createElement('div');
Object.assign(contextMenu.style, {
      position: 'absolute',
      visibility: 'hidden'});
contextMenu.className = 'popupMenu';
contextMenu.id = 'cmmdatatree'

if (!document.getElementById('cmmdatatree')) {
    document.body.appendChild(contextMenu);
}

        
var modelData;

class SelectModelDataPanel extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            selectedKeys: '',
            loading: false,
            model: props.model,
            error: ''
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ model: nextProps.model});
    }

    render() {
        loadModelData();
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
        contextMenu.style.top = info.event.pageY + 'px';
        contextMenu.style.left = info.event.pageX + 'px';
        contextMenu.style.visibility = 'visible';

        if (info.node.props.isLeaf) {
       //     ReactDOM.render(<ul><li><a href="#" onClick={editDocument}>Edit Document</a></li><li><a href="#" onClick={runDocument}>Run Document</a></li><li><a href="#" onClick={deleteDocument}>Delete Document</a></li></ul>, contextMenu);
        } else {
      //      ReactDOM.render(<ul><li><a href="#" onClick={addDocument}>Add Document</a></li></ul>, contextMenu);
        }
    }
    
    loadModelData() {
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
        const curcomp = this;
        const url = getOrm().url;
        const instance = axios.create({baseURL: url});
        const authString = localStorage.getItem('user');
        const config = {
            headers: {'Authorization': authString}
        };

        const {model} = this.state;
        instance.get('/design/modeldata/' + model, config)
            .then((response) => {
                if (response.status === 200) {
                    const loop = (data) => {
                        return data.map((item) => {
                            return <button onClick={() => curcomp.onSetSidebarOpen(false, item)}>{item}</button>;
                        });
                    };

                    curcomp.setState({loading: false});
                } else {
                    curcomp.setState({error: response.statusText, loading: false});
                }
            })
            .catch((err) => {
                curcomp.setState({error: err.toString(), loading: false});
            });     
    }


    }
}

export {SelectModelDataPanel};