import React from 'react';
import ReactDOM from 'react-dom';
import Tree, { TreeNode } from 'rc-tree'
import "../app/App.css";
import '../app/iconTree.css';
import config from '../config/appconfig.json';
import axios from 'axios';
import Spinner from './Spinner';

const leafimg = <img src="/images/column.png"/>;
const modelimg = <img src="/images/model.png"/>;
const rootimg = <img src="/images/root.png"/>;
var firstnode = true;

class SelectModelDataPanel extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            loading: false,
            model: props.model,
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
        const {model, loading, error} = this.state;
        if (error) {
            return <div className="errorMessage">{error}</div>;
        } else if (model === config.textmsg.modelselectdefault) {
            return <div className="panelPrompt1">{config.textmsg.modelselectprompt}</div>;
        } else if (loading) {
            return <div className="panelPrompt1"><Spinner/>&nbsp;&nbsp;Loading model hierarchy for {model}...</div>;
        } else if (document.designData.modelHierarchy) {
            return <div className="treeContainer">
                <Tree 
                  onRightClick={onRightClick}
                  checkable
                  showLine
                  defaultExpandedKeys={['t0']}
                  showIcon={true}
                  icon={this.getIcon}
                  prefixCls="tree-icon"
                  treeData={document.designData.modelHierarchy}></Tree></div>;
        } else {
            return <div className="panelPrompt1">{config.textmsg.modelselectprompt}</div>;
        }
    }
    
    getIcon(props) {
        if (firstnode) {
            firstnode = false;
            return rootimg;
        } else if (props.isLeaf) {
            return leafimg;
        } else {
            return modelimg;
        } 
    }
    
    loadModelData(model) {
        firstnode = true;
        const curcomp = this;
        const orm = JSON.parse(localStorage.getItem('orm'));
        const inputModel = model;
        const config = {
            headers: {'Authorization': orm.authString}
        };

        axios.get(orm.url + '/design/modeltree/' + inputModel, config)
            .then((response) => {
                if (response.status === 200) {
                    document.designData.modelHierarchy = response.data;
                    curcomp.setState({loading: false, model: inputModel});
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
    const cm = document.getElementById('ctxmenu');
    cm.style.top = info.event.pageY + 'px';
    cm.style.left = info.event.pageX + 'px';
    cm.style.visibility = 'visible';

    if (info.node.props.isLeaf) {
   //     ReactDOM.render(<ul><li><a href="#" onClick={editDocument}>Edit Document</a></li><li><a href="#" onClick={runDocument}>Run Document</a></li><li><a href="#" onClick={deleteDocument}>Delete Document</a></li></ul>, cm);
    } else {
  //      ReactDOM.render(<ul><li><a href="#" onClick={addDocument}>Add Document</a></li></ul>, cm);
    }
}

function clearContextMenu() {
    let cm = document.getElementById('ctxmenu');
    cm.style.top = '-100px';
    cm.style.left = '-100px';
    cm.style.visibility = 'hidden';
}


export {SelectModelDataPanel};