import React from 'react';
import ReactDOM from 'react-dom';
import Tree, { TreeNode } from 'rc-tree'
import "../app/App.css";
import '../app/defaultTree.css';
import config from '../config/appconfig.json';
import axios from 'axios';
import Spinner from './Spinner';

const leafimg = <img src="/images/column.png"/>;
const keycolumnimg = <img src="/images/keycolumn.png"/>;
const modelimg = <img src="/images/model.png"/>;

var setDesignTabState;
class SelectModelDataPanel extends React.Component {
    constructor(props) {
        super(props);
        setDesignTabState = this.props.setTabState;
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
            document.designData.modelHierarchy = '';
            document.designData.selectedObjectKeys = '';
            this.setState({loading: true});
            this.loadModelData(nextProps.model);
        }
    }

    render() {
        const {model, loading, error} = this.state;
        
        if (error) {
            return <div className="errorMessage">{error}</div>;
        } else if (model === config.textmsg.modelselectdefault) {
            if (loading) {
                return <div className="panelPrompt1"><Spinner/>&nbsp;&nbsp;Loading model hierarchy...</div>;
            } else {
                return <div className="panelPrompt1">{config.textmsg.modelselectprompt}</div>;
            }
        } else if (document.designData.modelHierarchy) {
            return <div className="tabContainer"> <div className="treeContainer">
                <Tree 
                  onRightClick={this.onRightClick}
                  checkable
                  showLine
                  defaultExpandedKeys={['t0']}
                  showIcon={true}
                  icon={this.getIcon}
                  onSelect={this.onSelect}
                  checkedKeys={document.designData.selectedObjectKeys}
                  onCheck={this.onCheck}
                  treeData={document.designData.modelHierarchy}></Tree></div></div>;
        } else {
            return <div className="panelPrompt1">{config.textmsg.modelselectprompt}</div>;
        }
    }
    
    onCheck(checkedKeys, e) {
        document.designData.selectedObjectKeys = checkedKeys;
        if (checkedKeys.length > 0) {
            setDesignTabState(false, false, false, false);
        } else {
            setDesignTabState(false, true, true, true);
        }
    }
    
    onExpand(expandedKeys, e) {
        document.designData.expandedObjectKeys = expandedKeys;
    }

    onSelect(info) {
    }
    
    onRightClick(info) {
    }

    getIcon(props) {
        if (props.isLeaf) {
            if (props.primaryKey) {
                return keycolumnimg;
            } else {
                return leafimg;
            }
        } else {
            return modelimg;
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