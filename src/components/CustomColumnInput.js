import React from 'react';
import "../app/App.css";
import config from '../config/appconfig.json';

class CustomColumnInput extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return <span className="fieldLabel">{config.textmsg.customcolinputlabel}
            <input className="customColumnInput" type='text' onBlur={this.props.onCustomColumnInputChange}/>
            </span>;
    }
}

export {CustomColumnInput};