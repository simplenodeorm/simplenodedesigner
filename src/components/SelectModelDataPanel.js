import React from 'react';
import ReactDOM from 'react-dom';
import Tree, { TreeNode } from 'rc-tree'
import "../app/App.css";
import config from '../config/appconfig.json';
import axios from 'axios';
import Spinner from './Spinner';


var contextMenu = document.createElement('div');
Object.assign(contextMenu.style, {
      position: 'absolute',
      visibility: 'hidden'});
contextMenu.className = 'popupMenu';
contextMenu.id = 'cmmdatatree';

if (!document.getElementById('cmmdatatree')) {
    document.body.appendChild(contextMenu);
}

const fieldLoop = (data) => {
    return data.fields.map((field) => {
        return <TreeNode title={field.fieldName} key={field.__key__} isLeaf/>;
    });
};

const relationshipLoop = (data) => {
    if (data.relationships) {
        return data.relationships.map((rel) => {
            return <TreeNode title={rel.fieldName} key={rel.__key__} isLeaf={false}>{fieldLoop(rel)}{relationshipLoop(rel)}</TreeNode>;});
    }   
};

class SelectModelDataPanel extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            loading: false,
            model: props.model,
            treeData: '',
            error: ''
        };
    }

    componentWillReceiveProps(nextProps) {
        const {model} = this.state;
        if ((nextProps.model !== config.textmsg.modelselectdefault)
            && (model !== nextProps.model)) {
            this.loadModelData(nextProps.model);
        }
    }

    render() {
        const {model, loading, error, treeData} = this.state;
        if (error) {
            return <div className="errorMessage">{error}</div>;
        } else if (model === config.textmsg.modelselectdefault) {
            return <div className="panelPrompt1">{config.textmsg.modelselectprompt}</div>;
        } else if (loading) {
            return <div className="panelPrompt1"><Spinner/>&nbsp;&nbsp;Loading model hierarchy for {model}...</div>;
        } else if (treeData) {
            return <div className="treeContainer">
                <Tree 
                  onRightClick={onRightClick}
                  checkable
                  showLine
                  defaultExpandedKeys={['t0']}
                  showIcon={true}
                  treeData={treeData}
                  ><TreeNode title={model} key="t0" isLeaf={false}></TreeNode></Tree></div>;
        } else {
            return <div className="panelPrompt1">{config.textmsg.modelselectprompt}</div>;
        }
    }
    
    loadModelData(model) {
        const curcomp = this;
        const orm = JSON.parse(localStorage.getItem('orm'));
        const inputModel = model;
        const config = {
            headers: {'Authorization': orm.authString}
        };

        axios.get(orm.url + '/design/modeltree/' + inputModel, config)
            .then((response) => {
                if (response.status === 200) {
                    curcomp.setState({loading: false, model: inputModel, treeData: response.data});
                } else {
                    curcomp.setState({error: response.statusText, loading: false});
                }
            })
            .catch((err) => {
               curcomp.setState({error: ('' + err), loading: false});
            });     
        }
        
}

function onRightClick(info) {
    contextMenu.style.top = info.event.pageY + 'px';
    contextMenu.style.left = info.event.pageX + 'px';
    contextMenu.style.visibility = 'visible';

    if (info.node.props.isLeaf) {
   //     ReactDOM.render(<ul><li><a href="#" onClick={editDocument}>Edit Document</a></li><li><a href="#" onClick={runDocument}>Run Document</a></li><li><a href="#" onClick={deleteDocument}>Delete Document</a></li></ul>, contextMenu);
    } else {
  //      ReactDOM.render(<ul><li><a href="#" onClick={addDocument}>Add Document</a></li></ul>, contextMenu);
    }
}

function clearContextMenu() {
    contextMenu.style.top = '-100px';
    contextMenu.style.left = '-100px';
    contextMenu.style.visibility = 'hidden';
}


export {SelectModelDataPanel};