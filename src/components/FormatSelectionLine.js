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
        <span className="label">{this.props.columnNode.__index + 1}.&nbsp;</span><span className="lineStyle1"><span>{this.props.columnNode.path}</span></span><br /><br />
        </div>;
        
    }
    
}

export {FormatSelectionLine};