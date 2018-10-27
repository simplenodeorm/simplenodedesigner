import React from 'react';
import "../app/App.css";
import config from '../config/appconfig.json';

const saveEnabled = <img alt='save' src='/images/save.png' />;              
const saveDisabled = <img alt='save' src='/images/save-disabled.png' />;               

class SaveButton extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        if (this.props.disabled) {
            return <button title="Save Query" className="saveButton" disabled>{saveDisabled}</button>;              
        } else {
            return <button title="Save Query" className="saveButton" onClick={this.props.onSave} >{saveEnabled}</button>;              
        }
    }
}

export {SaveButton};