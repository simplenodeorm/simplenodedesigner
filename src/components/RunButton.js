import React from 'react';
import "../app/App.css";
import config from '../config/appconfig.json';

const runEnabled = <img alt='save' src='/images/run.png' />;              
const runDisabled = <img alt='save' src='/images/run-disabled.png' />;               

class RunButton extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        if (this.props.disabled) {
            return <button title="Run Query" className="runButton" disabled>{runDisabled}</button>;              
        } else {
            return <button title="Run Query" className="runButton" onClick={this.props.onRun} >{runEnabled}</button>;              
        }
    }
}

export {RunButton};