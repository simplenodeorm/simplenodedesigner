import React from 'react';
import "../app/App.css";
import config from '../config/appconfig.json';

class AscDescCheckbox extends React.Component {
    constructor(props) {
        super(props);
        this.onAscDescChange = this.onAscDescChange.bind(this);
    }
    
    render() {
        return <span className="fieldLabel">{config.textmsg.ascdesclabel}<input type='checkbox' onChange={this.onAscDescChange} /></span>;
    }
    
    onAscDescChange(e) {
        this.props.columnNode.__sortDescending = e.target.checked;
    }

}

export {AscDescCheckbox};