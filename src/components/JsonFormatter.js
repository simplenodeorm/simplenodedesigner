import React from 'react';
import "../app/App.css";
import config from '../config/appconfig.json';


class JsonFormatter extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return <div className="formattedJson"></div>
    }
}

export {JsonFormatter};