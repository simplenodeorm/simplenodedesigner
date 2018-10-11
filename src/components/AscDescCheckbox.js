import React from 'react';
import "../app/App.css";
import config from '../config/appconfig.json';

class AscDescCheckbox extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return <span className="fieldLabel">{config.textmsg.ascdesclabel}<input type='checkbox'onChange={this.props.onAscDescChange}/></span>;
    }
}

export {AscDescCheckbox};