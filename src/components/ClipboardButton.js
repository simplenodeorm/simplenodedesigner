import React from 'react';
import "../app/App.css";

const clipboardDisabled = <img alt='copy to clipboard' src='/images/clipboard-disabled.png' />;              
const clipboard = <img alt='copy to clipboard' src='/images/clipboard.png' />;               

class ClipboardButton extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        if (this.props.disabled) {
            return <button title="copy to clipboard" className="clipboardButton" disabled>{clipboardDisabled}</button>;              
        } else {
            return <button title="copy to clipboard" className="clipboardButton" onClick={this.props.onCopyToClipboard}>{clipboard}</button>;              
        }
    }
}

export {ClipboardButton};