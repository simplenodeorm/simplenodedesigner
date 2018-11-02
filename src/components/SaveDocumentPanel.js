import React from 'react';
import config from '../config/appconfig.json';
import {ModalDialog} from './ModalDialog';
import groups from '../config/document-groups.json';
import Tree, { TreeNode } from 'rc-tree';
import './defaultTree.css';
import "../app/App.css";

class SaveDocumentPanel extends ModalDialog {
    constructor(props) {
        super(props);
        this.onSelect = this.onSelect.bind(this);
        this.onAuthenticatorChange = this.onAuthenticatorChange.bind(this);
        this.onResultFormatChange = this.onResultFormatChange.bind(this);
        this.onDistinctChange = this.onDistinctChange.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        
        this.distinct = false;
        this.authenticator = config.authenticators[0];
        this.documentName = '';
        this.resultFormat = 'object';
        this.selectedGroup = '';
    }

    getContent() {
        const treeLoop = (data) => {
            return data.map((item) => {
              if (item.groups) {
                return <TreeNode title={item.name} key={item.key} isLeaf={false}>
                {treeLoop(item.groups)}
                 </TreeNode>;
              }
              return <TreeNode title={item.name} key={item.key} isLeaf={false}/>;
            });
        };

        const treeNodes = treeLoop(groups);   
        const authenticatorLoop = (data) => {
            return data.map((authenticator) => {
                return <option value={authenticator}>{authenticator}</option>
            });
        };
        
        return <div className="saveDocumentPanel">
            <div className="parameterInputPanel">
                <table>
                    <tr>
                        <td className="inputLabel">Result Format:</td>
                        <td>
                            <select onChange={this.onResultFormatChange}>
                                <option value="object">object graph</option>
                                <option value="result set">result set</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td className="inputLabel">Autheticator:</td>
                        <td>
                            <select onChange={this.onAuthenticatorChange}>
                                { authenticatorLoop(config.authenticators) } 
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td className="inputLabel">Document Name:</td>
                        <td><input type="text" onBlur={this.onNameChange} defaultValue={this.documentName} /></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>&nbsp;&nbsp;&nbsp;<input onChange={this.onDistinctChange} type="checkbox"/>Distinct</td>
                    </tr>
                </table>
             </div>
            <hr />
            <div><div className="treeContainer">
                <Tree 
                  onSelect={this.onSelect}
                  showLine
                  showIcon={true}
                  defaultExpandAll={true}>{treeNodes}</Tree>
            </div></div>
        </div>;
    }
    
    onSelect(selkey) {
        this.selectedGroup = selkey;
    }
    
    onNameChange(e) {
        this.documentName = e.target.value;
    }
    
    onAuthenticatorChange(e) {
        this.authenticator = e.target.value;
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
        return (this.documentName && this.selectedGroup && this.authenticator);
    }
    
    getError() { 
        return 'Please select a folder and complete all required entries';
        this.state.error = false;
    }

    getResult() {
        let d = this.distinct;
        let rf = this.resultFormat;
        let g = this.selectedGroup;
        let nm = this.documentName;
        
        this.distinct = false;
        this.resultFormat = 'object';
        this.selectedGroup = '';
        return { documentName: nm, group: g, distinct: d, resultFormat: rf };
    }
}

export {SaveDocumentPanel};