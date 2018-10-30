import React from 'react';
import "../app/App.css";
import config from '../config/appconfig.json';
import {ComparisonValueInput} from './ComparisonValueInput';
import {ModalDialog} from './ModalDialog';
 
class ParameterInputPanel extends ModalDialog {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="modalContainer">
                <h1>xxx</h1>
                <div>yyy</div>
                </div>;
    }
    
    getContent() {
        return <div>xxxxxxxxxxx</div>;
    }
    
    getTitle() {
        return 'Query Parameter(s)';
    }
}

export {ParameterInputPanel};