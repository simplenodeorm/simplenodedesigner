import React from 'react';
import "../app/App.css";
import config from '../config/appconfig.json';
import {ComparisonValueInput} from './ComparisonValueInput';

class ParameterInputPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: ''
        };
        
        this.onOk = this.onOk.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    render() {
        const {error} = this.state;

        if (error) {
            return <div className="errorMessage">{error}</div>;
        } else {
            return <div>this is a test</div> ;  

        }
    }
    
    onOk() {
    }
    
    onCancel() {
        
    }
}

export {ParameterInputPanel};