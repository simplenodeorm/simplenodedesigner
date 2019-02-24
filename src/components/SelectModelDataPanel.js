import React from 'react';
import Tree from 'rc-tree'
import "../app/App.css";
import './defaultTree.css';
import config from '../config/appconfig.json';
import axios from 'axios';
import {BaseDesignComponent} from './BaseDesignComponent';
import {clearDocumentDesignData,removeWaitMessage} from './helpers';

const leafimg = <img alt="column" src="/images/column.png"/>;
const keycolumnimg = <img alt="key column" src="/images/keycolumn.png"/>;
const modelimg = <img alt="model" src="/images/model.png"/>;

class SelectModelDataPanel extends BaseDesignComponent {
    constructor(props) {
        super(props);
        this.state = {
            model: props.model
        };
        
        this.onCheck = this.onCheck.bind(this);
    }

    componentDidMount() {
        const {model} = this.state;
        let curModel;
        
        if (document.designData.currentDocument ) {
            curModel = document.designData.currentDocument.document.rootModel;
        } else if (document.designData.modelHierarchy) {
            curModel = document.designData.modelHierarchy.title;
        }
        if (model && (model !== curModel)) {
            this.loadModelData(model);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.model !== nextProps.model) {
            this.loadModelData(nextProps.model);
        }
    }

    render() {
        if (document.designData.modelHierarchy) {
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
                  checkedKeys={document.designData.selectedObjectKeys}
                  onCheck={this.onCheck}
                  treeData={document.designData.modelHierarchy}/></div></div>;
        } else {
            return <div/>;
        }
    }
    
    onCheck(checkedKeys) {
        document.designData.selectedObjectKeys = checkedKeys;
        if (checkedKeys.length > 0) {
            this.loadSelectedNodesIfRequired(true);
            if (checkedKeys.length === 1) {
                this.props.setTabState(false, false, false, true);
            }
            this.setState(this.state);
        } else {
            this.props.setTabState(false, true, true, true);
        }
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
        if (model && (model !== config.textmsg.modelselectdefault))  {
            this.showWaitMessage('Loading model hierarchy...');
            const curcomp = this;
            const orm = JSON.parse(localStorage.getItem('orm'));
            const inputModel = model;
            const config = {
                headers: {'Authorization': orm.authString}
            };

            axios.get(orm.url + '/design/modeltree/' + inputModel, config)
                .then((response) => {
                    if (response.status === 200) {
                        clearDocumentDesignData();
                        document.designData.modelHierarchy = response.data;
                        curcomp.setState({model: inputModel});
                    } else {
                        curcomp.props.setStatus(response.statusText, true);
                    }
    
                    removeWaitMessage();
                })
                .catch((err) => {
                   curcomp.props.setStatus('' + err, true);
                    removeWaitMessage();
                });     
        }
    }
}

export {SelectModelDataPanel};