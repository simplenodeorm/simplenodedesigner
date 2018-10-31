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
        return <div>xxxxxxxxxxxxxxx</div>;
    }
    
    getTitle() {
        return config.textmsg.paramentrytitle;
    }
}

export {ParameterInputPanel};