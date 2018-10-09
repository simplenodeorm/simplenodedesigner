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
        <div>{this.props.columnNode.path}</div>
        </div>;
        
    }
    
}

export {FormatSelectionLine};