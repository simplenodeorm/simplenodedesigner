import React from 'react';
import "../app/App.css";
import config from '../config/appconfig.json';

class SortPositionInput extends React.Component {
    constructor(props) {
        super(props);
        this.onSortPosChange = this.onSortPosChange.bind(this);
    }
    
    render() {
        return <span className="fieldLabel">{config.textmsg.sortposlabel}
            <input type='text' maxlength='2' onKeyDown={this.checkNumeric} onBlur={this.onSortPosChange} value={this.props.columnNode.__sortPosition}/>
            </span>;
    }

    onSortPosChange(e) {
        this.props.columnNode.__sortPosition = e.target.value;
    }

    
    checkNumeric(e) {
        let charCode = (e.which) ? e.which : e.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            e.preventDefault();
        }
    }
}

export {SortPositionInput};