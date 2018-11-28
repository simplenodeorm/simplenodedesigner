import React from 'react';
import Tree from 'rc-tree'
import "../app/App.css";
import './defaultTree.css';
import config from '../config/appconfig.json';
import axios from 'axios';
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
            model: props.model,
            redraw: false
        };
        
        this.onSelect = this.onSelect.bind(this);
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
        const {model} = this.state;
        if (this.props.model !== nextProps.model) {
            this.loadModelData(nextProps.model);
        }
    }

    render() {
        const {model, redraw} = this.state;
        this.state.redraw = false;
        
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
                  onSelect={this.onSelect}
                  checkedKeys={document.designData.selectedObjectKeys}
                  onCheck={this.onCheck}
                  treeData={document.designData.modelHierarchy}></Tree></div></div>;
        } else {
            return <div></div>;
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

                    curcomp.clearWaitMessage();
                })
                .catch((err) => {
                   curcomp.props.setStatus('' + err, true);
                   curcomp.clearWaitMessage();
                });     
        }
    }
}

export {SelectModelDataPanel};