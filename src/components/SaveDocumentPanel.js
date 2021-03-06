/*
 * Copyright (c) 2019 simplenodeorm.org
 */

import React from 'react';
import config from '../config/appconfig.json';
import {ModalDialog} from './ModalDialog';
import Tree from 'rc-tree';
import './defaultTree.css';
import "../app/App.css";
import {isGroupByRequired,getServerContext,getRequestHeaders} from './helpers';
import axios from 'axios';

const qfimage = <img alt="query folder" src="/images/queryfolder.png"/>;
class SaveDocumentPanel extends ModalDialog {
    constructor(props) {
        super(props);
        this.onSelect = this.onSelect.bind(this);
        this.onResultFormatChange = this.onResultFormatChange.bind(this);
        this.onDistinctChange = this.onDistinctChange.bind(this);
        this.onNameChange = this.onNameChange.bind(this);

        if (document.designData.currentDocument) {
            this.distinct = document.designData.currentDocument.distinct;
            this.documentName = document.designData.currentDocument.documentName.replace(/_/g, ' ');
            this.selectedGroup = document.designData.currentDocument.group;
        } else {
            this.distinct = false;
            this.resultFormat = 'object';
            this.documentName = 'new document';
        }
        
        this.groupByRequired = isGroupByRequired();
        if (this.groupByRequired) {
            this.resultFormat = 'result set';
        }
        
        
        this.state = {
            authorizers: '',
            groups: ''
        };
        
        this.loadDocumentGroups();
    }
    
    getIcon(props) {
        return qfimage;
    }
    
    getContent() {
        const {groups} = this.state;
        
        let formatSelect;
        if (this.groupByRequired) {
            formatSelect = <input type={'text'} readOnly={true} value={'result set'}/>
        } else {
            formatSelect = <select onChange={this.onResultFormatChange}>
                <option value='object' selected>object graph</option>
                <option value='result set'>result set</option>
            </select>;
            
            if (document.designData.currentDocument && (document.designData.currentDocument.resultFormat === 'result set')) {
                formatSelect = <select onChange={this.onResultFormatChange}>
                    <option value='object'>object graph</option>
                    <option value='result set' selected>result set</option>
                </select>;
                this.resultFormat = 'result set';
            }
        }
        
        return <div className="saveDocumentPanel">
            <div className="parameterInputPanel">
                <table>
                    <tr>
                        <td className="inputLabel">{config.textmsg.resultformatlabel}</td>
                        <td>
                            {formatSelect}
                        </td>
                    </tr>
                    <tr>
                        <td className="inputLabel">{config.textmsg.documentnamelabel}</td>
                        <td><input type="text" onBlur={this.onNameChange} defaultValue={this.documentName} /></td>
                    </tr>
                    <tr>
                        <td/>
                        <td>&nbsp;&nbsp;&nbsp;<input onChange={this.onDistinctChange} type="checkbox" defaultValue={this.distinct}/>{config.textmsg.distinct}</td>
                    </tr>
                </table>
            </div>
            <hr />
            <div><div className="modalTreeContainer">
                {groups &&
                <Tree
                    onSelect={this.onSelect}
                    showLine
                    icon={this.getIcon}
                    showIcon={true}
                    defaultExpandAll={true}
                    defaultSelectedKeys={this.selectedGroup}
                    treeData={groups}/> }
            </div></div>
        </div>;
    }
    
    onSelect(selkey) {
        this.selectedGroup = selkey;
    }
    
    onNameChange(e) {
        this.documentName = e.target.value;
    }
    
    onResultFormatChange(e) {
        this.resultFormat = e.target.value;
    }
    
    onDistinctChange(e) {
        this.distinct = e.target.checked;
    }
    
    getTitle() {
        return config.textmsg.savedocumenttitle;
    }
    
    isComplete() {
        return (this.documentName && this.selectedGroup);
    }
    
    getError() {
        this.state.error = false;
        return 'Please select a folder and complete all required entries';
    }
    
    getResult() {
        return {
            interactice: false,
            documentName: this.documentName,
            group: this.selectedGroup,
            distinct: this.distinct,
            resultFormat: this.resultFormat
        };
    }
    
    loadDocumentGroups() {
        const curcomp = this;
        const httpcfg = {
            headers: getRequestHeaders()
        };
       axios.get(getServerContext() +  '/api/query/document/groupsonly', httpcfg)
            .then((response) => {
                if (response.status === 200) {
                    curcomp.setState({groups: response.data});
                } else {
                    curcomp.props.setStatus(response.statusText, true);
                }
            })
            .catch((err) => {
                alert(err);
                curcomp.setStatus(err.toString(), true);
            });
        
    }

}

export {SaveDocumentPanel};
