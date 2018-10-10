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
        <span className="lineStyle1"><span className="label">field:&nbsp;</span><span>{this.props.columnNode.path}</span></span><br /><br />
        </div>;
        
    }
    
}

export {FormatSelectionLine};