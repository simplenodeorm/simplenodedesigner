import React from 'react';
import "../app/App.css";
import config from '../config/appconfig.json';

class CustomColumnInput extends React.Component {
    constructor(props) {
        super(props);
        this.onCustomColumnInputChange = this.onCustomColumnInputChange.bind(this);
    }
    
    render() {
        return <span className="fieldLabel">{config.textmsg.customcolinputlabel}
            <input className="customColumnInput" type='text' onBlur={this.onCustomColumnInputChange} value={this.props.columnNode.__customColumnInput}/>
            </span>;
    }
    
    onCustomColumnInputChange(e) {
        this.props.columnNode.__customColumnInput = e.target.value;
    }
}

export {CustomColumnInput};