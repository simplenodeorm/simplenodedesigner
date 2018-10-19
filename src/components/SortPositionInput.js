import React from 'react';
import "../app/App.css";
import config from '../config/appconfig.json';
import {NumericInput} from './NumericInput';

class SortPositionInput extends React.Component {
    constructor(props) {
        super(props);
        this.onBlur = this.onBlur.bind(this);
    }
    
    render() {
        return <span className="fieldLabel">{config.textmsg.sortposlabel}
            <NumericInput maxLength='2' onBlur={this.onBlur} value={document.designData.selnodes[this.props.index].__sortPosition}/>
            </span>;
    }

    onBlur(e) {
        document.designData.selnodes[this.props.index].__sortPosition = e.target.value;
    }
}

export {SortPositionInput};