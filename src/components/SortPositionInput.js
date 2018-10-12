import React from 'react';
import "../app/App.css";
import config from '../config/appconfig.json';

class SortPositionInput extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return <span className="fieldLabel">{config.textmsg.sortposlabel}
            <input type='text' maxlength='2' onKeyDown={this.checkNumeric} onBlur={this.props.onSortPosChange}/>
            </span>;
    }
    
    checkNumeric(e) {
        let charCode = (e.which) ? e.which : e.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            e.preventDefault();
        }
    }
}

export {SortPositionInput};