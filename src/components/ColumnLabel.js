import React from 'react';
import "../app/App.css";
import config from '../config/appconfig.json';

class ColumnLabel extends React.Component {
    constructor(props) {
        super(props);
        this.onColumnLabelChange = this.onColumnLabelChange.bind(this);
        
        this.state = {
            moved: false
        }
    }
    
    render() {
        this.state.moved = false;
        return <span className="fieldLabel">{config.textmsg.columnlabel}
            <input className="customColumnInput" type='text' onBlur={this.onColumnLabelChange} value={this.props.columnNode.__columnLabel}/>
            </span>;
    }
    
    onColumnLabelChange(e) {
        this.props.columnNode.__columnLabel = e.target.value;
    }
    
}

export {ColumnLabel};