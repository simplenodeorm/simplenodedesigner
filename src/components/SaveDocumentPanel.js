import React from 'react';
import config from '../config/appconfig.json';
import {ModalDialog} from './ModalDialog';
import groups from '../config/document-groups.json';
import Tree from 'rc-tree';
import './defaultTree.css';
import "../app/App.css";
import {defaultSaveSettings} from './helpers';
const qfimage = <img alt="query folder" src="/images/queryfolder.png"/>;

class SaveDocumentPanel extends ModalDialog {
    constructor(props) {
        super(props);
        this.onSelect = this.onSelect.bind(this);
        this.onAuthenticatorChange = this.onAuthenticatorChange.bind(this);
        this.onResultFormatChange = this.onResultFormatChange.bind(this);
        this.onDistinctChange = this.onDistinctChange.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
    }

    getIcon(props) {
        return qfimage;
    }
    
    getContent() {
        const authenticatorLoop = (data) => {
            return data.map((authenticator) => {
                return <option value={authenticator}>{authenticator}</option>
            });
        };
        
        return <div className="saveDocumentPanel">
            <div className="parameterInputPanel">
                <table>
                    <tr>
                    <td className="inputLabel">{config.textmsg.resultformatlabel}</td>
                        <td>
                            <select onChange={this.onResultFormatChange}>
                                <option value="object" selected>object graph</option>
                                <option value="result set">result set</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td className="inputLabel">{config.textmsg.authenticatorlabel}</td>
                        <td>
                            <select onChange={this.onAuthenticatorChange}>
                                { authenticatorLoop(config.authenticators) } 
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td className="inputLabel">{config.textmsg.documentnamelabel}</td>
                        <td><input type="text" onBlur={this.onNameChange} defaultValue={this.documentName} /></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>&nbsp;&nbsp;&nbsp;<input onChange={this.onDistinctChange} type="checkbox" defaultValue={this.distinct}/>{config.textmsg.distinct}</td>
                    </tr>
                </table>
             </div>
            <hr />
            <div><div className="modalTreeContainer">
                <Tree 
                  onSelect={this.onSelect}
                  showLine
                  icon={this.getIcon}
                  showIcon={true}
                  defaultExpandAll={true}
                  treeData={groups}></Tree>
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
        this.state.error = false;
        return 'Please select a folder and complete all required entries';
    }

    getResult() {
        return { 
            documentName: this.documentName, 
            group: this.selectedGroup, 
            distinct: this.distinct, 
            resultFormat: this.resultFormat, 
            authenticator: this.authenticator
        };
    }
}

export {SaveDocumentPanel};