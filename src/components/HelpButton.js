import React from 'react';
import "../app/App.css";

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