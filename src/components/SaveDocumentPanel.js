import React from 'react';
import "../app/App.css";
import config from '../config/appconfig.json';
import {ModalDialog} from './ModalDialog';
 
class SaveDocumentPanel extends ModalDialog {
    constructor(props) {
        super(props);
    }

    getContent() {
        return <div className="saveDocumentPanel">
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
                    <td></td>
                    <td>&nbsp;&nbsp;&nbsp;<input onChange={this.onDistinctChange} type="checkbox"/>Distinct</td>
                </tr>
                <tr>
                    <td className="inputLabel">Document Name</td>
                    <td><input type="text" onChange={this.onNameChange} /></td>
                </tr>
            </table>
            <hr />
        </div>;
    }
    
    onResultFormatChange(e) {
        this.resultFormat = e.target.value;
    }

    onDistinctChange(e) {
        this.distinct = e.target.checked;
    }
    
    isComplete() {
        let retval = true;
    
        
        return retval;
    }
    
    getTitle() {
        return config.textmsg.paramentrytitle;
    }
    
    getResult() {
        let p = this.params.slice();
        let d = this.distinct;
        let rf = this.resultFormat;
        let vc = this.validityCheckOnly;
        this.params = new Array();
        this.distinct = false;
        this.resultFormat = 'object';
        this.vaidityCheckOnly = false;
        
        return { distinct: d, resultFormat: rf };
    }

}

export {SaveDocumentPanel};