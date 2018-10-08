import React from 'react';
import "../app/App.css";
import config from '../config/appconfig.json';

class FormatSelectionLine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            error: ''
        };
    }

    render() {
        return <div className="formatSelectionLine">
        <div>{this.props.lineNumber}</div>
        <div>{this.props.field.fieldName}</div>
        <div>{this.props.lineNumber}</div>
        <div>{this.props.lineNumber}</div>
        <div>{this.props.lineNumber}</div>
        </div>
        
    }
    
}

export {FormatSelectionLine};