import React from 'react';
import "../app/App.css";
import config from '../config/appconfig.json';
import {ComparisonValueInput} from './ComparisonValueInput';
import {ModalDialog} from './ModalDialog';
 
class ParameterInputPanel extends ModalDialog {
    constructor(props) {
        super(props);
    }

    getContent() {
        const inputLoop = (data) => {
            return data.map((p, i) => {
                if (!p.comparisonValue) {
                    let pos = p.fieldName.lastIndexOf('.');
                    return <tr><td title={p.fieldName} className="inputLabel">{p.fieldName.substring(pos+1) + ':'}</td><td><ComparisonValueInput index={i}/></td></tr>
                } 
            });
        };
        
        return <div className="inputPanel"><table>{inputLoop(document.designData.whereComparisons)}</table></div>;
    }
    
    getTitle() {
        return config.textmsg.paramentrytitle;
    }
}

export {ParameterInputPanel};