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
        return <span>this.props.lineNumber</span>;
    }
    
}

export {FormatSelectionLine};