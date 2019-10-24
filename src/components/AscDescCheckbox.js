/*
 * Copyright (c) 2019 simplenodeorm.org
 */

import React from 'react';
import "../app/App.css";
import config from '../config/appconfig.json';

class AscDescCheckbox extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }
    
    render() {
        if (document.designData.selnodes[this.props.index].__sortDescending) {
            return <span className="fieldLabel">{config.textmsg.ascdesclabel}<input type='checkbox' onChange={this.onChange} checked /></span>; 
        } else {
            return <span className="fieldLabel">{config.textmsg.ascdesclabel}<input type='checkbox' onChange={this.onChange}/></span>;
        }
    }
    
    onChange(e) {
        document.designData.selnodes[this.props.index].__sortDescending = e.target.checked;
    }

}

export {AscDescCheckbox};