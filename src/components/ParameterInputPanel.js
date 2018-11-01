import React from 'react';
import "../app/App.css";
import config from '../config/appconfig.json';
import {ComparisonValueInput} from './ComparisonValueInput';
import {ModalDialog} from './ModalDialog';
 
class ParameterInputPanel extends ModalDialog {
    constructor(props) {
        super(props);
        this.setValue = this.setValue.bind(this);
        this.getValue = this.getValue.bind(this);
        this.allowCharacter = this.allowCharacter.bind(this);
        this.onResultFormatChange = this.onResultFormatChange.bind(this);
        this.onDistinctChange = this.onDistinctChange.bind(this);
        this.params = new Array();
        this.comparisonOperators = new Array();
        this.distinct = false;
        this.resultFormat = 'object';
    }

    getContent() {
        const inputLoop = (data) => {
            let ipos = 0;
            return data.map((p, i) => {
                if (!p.comparisonValue) {
                    this.params.push('');
                    let pos = p.fieldName.lastIndexOf('.');
                    this.comparisonOperators.push(p.comparisonOperator);
                    return <tr><td title={p.fieldName} className="inputLabel">{p.fieldName.substring(pos+1) + ':'}</td><td><ComparisonValueInput 
                    setValue={this.setValue} 
                    getValue={this.getValue}
                    allowCharacter={this.allowCharacter}
                    fieldType={p.fieldType}
                    usePortal="true"
                    index={ipos++} /></td></tr>
                } 
            });
        };
        
        return <div className="parameterInputPanel">
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
            </table>
            <hr />
            <div className="inputEntryList">
                <table>{inputLoop(document.designData.whereComparisons)}</table>
            </div>
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
    
        for (let i = 0; i < this.params.length; ++i) {
            if (!this.params[i]) {
                retval = false;
                break;
            }
        }
        
        return retval;
    }
    
    getTitle() {
        return config.textmsg.paramentrytitle;
    }
    
    getValue(indx) {
        return this.params[indx];
    }
    
    setValue(indx, val) {
        this.params[indx] = val;
    }
    
    allowCharacter(charCode, indx) {
        // allow commas on in
        if ((this.comparisonOperators[indx] === 'in') && (charCode === 188)) {
            return true;
        } else {
            return false;
        }
    }
    
    getResult() {
        return { distinc: this.distinct, resultFormat: this.resultFormat, parameters: this.params};
    }

}

export {ParameterInputPanel};