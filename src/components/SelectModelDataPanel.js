import React from 'react';
import Tree from 'rc-tree'
import "../app/App.css";
import './defaultTree.css';
import config from '../config/appconfig.json';
import axios from 'axios';
import Spinner from './Spinner';
import {BaseDesignComponent} from './BaseDesignComponent';
import {clearDocumentDesignData} from './helpers';

const leafimg = <img src="/images/column.png"/>;
const keycolumnimg = <img src="/images/keycolumn.png"/>;
const modelimg = <img src="/images/model.png"/>;

var setDesignTabState;
class SelectModelDataPanel extends BaseDesignComponent {
    constructor(props) {
        super(props);
        setDesignTabState = this.props.setTabState;
        this.state = {
            loading: false,
            model: props.model,
            error: ''
        };
        
        this.onSelect = this.onSelect.bind(this);
        this.onCheck = this.onCheck.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const {model} = this.state;
        if ((nextProps.model !== config.textmsg.modelselectdefault)
            && (model !== nextProps.model)) {
            clearDocumentDesignData();
            this.loadModelData(nextProps.model);
        }
    }

    render() {
        const {model, loading, error} = this.state;
        
        if (error) {
            return <div className="errorMessage">{error}</div>;
        } else if (loading) {
            this.state.loading = false;
            return <div className="panelPrompt1"><Spinner/>&nbsp;&nbsp;Loading model hierarchy...</div>;
        } else if (model === config.textmsg.modelselectdefault) {
            return <div className="panelPrompt1">{config.textmsg.modelselectprompt}</div>;
        } else if (document.designData.modelHierarchy) {
            let defaultExpandedKeys = ['t0'];
            if (document.designData.selectedObjectKeys) {
                defaultExpandedKeys = document.designData.selectedObjectKeys;
            }
            
            return <div className="tabContainer"> <div className="treeContainer">
                <Tree 
                  onRightClick={this.onRightClick}
                  checkable
                  showLine
                  defaultExpandedKeys={defaultExpandedKeys}
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
            setDesignTabState(false, false, false, true);
        } else {
            setDesignTabState(false, true, true, true);
        }
        
        if (document.designData.selnodes) {
            document.designData.selnodes = '';
        }
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

        curcomp.setState({model: inputModel, loading: true});
        axios.get(orm.url + '/design/modeltree/' + inputModel, config)
            .then((response) => {
                if (response.status === 200) {
                    document.designData.modelHierarchy = response.data;
                    curcomp.setState({model: inputModel, loading: false});
                } else {
                    curcomp.setState({error: response.statusText, loading: false});
                }
            })
            .catch((err) => {
               curcomp.setState({error: ('' + err), loading: false});
            });     
    }
}

export {SelectModelDataPanel};