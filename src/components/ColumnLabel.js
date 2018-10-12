import React from 'react';
import "../app/App.css";
import config from '../config/appconfig.json';

class ColumnLabel extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return <span className="fieldLabel">{config.textmsg.columnlabel}
            <input className="customColumnInput" type='text' onBlur={this.props.onColumnLabelChange}/>
            </span>;
    }
}

export {ColumnLabel};