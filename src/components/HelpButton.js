import React from 'react';
import "../app/App.css";
import config from '../config/appconfig.json';

const help = <img alt='help' src='/images/help.png' />;              

class HelpButton extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return <button title="Designer Help" className="helpButton" onClick={this.props.onHelp} >{help}</button>;              
    }
}

export {HelpButton};