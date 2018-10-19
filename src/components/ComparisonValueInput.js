import React from 'react';
import "../app/App.css";
import config from '../config/appconfig.json';

class SortPositionInput extends React.Component {
    constructor(props) {
        super(props);
        this.onBlur = this.onBlur.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
    }
    
    render() {
        return <span className="fieldLabel">{config.textmsg.sortposlabel}
            <input type='text' maxlength='2' onKeyDown={this.onKeyDown} onBlur={this.onBlur} value={document.designData.selnodes[this.props.index].__sortPosition}/>
            </span>;
    }

    onBlur(e) {
        document.designData.selnodes[this.props.index].__sortPosition = e.target.value;
    }

    
    onKeyDown(e) {
        let charCode = (e.which) ? e.which : e.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            e.preventDefault();
        }
    }
}

export {SortPositionInput};