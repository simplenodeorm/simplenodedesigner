import React from 'react';
import "../app/App.css";
import config from '../config/appconfig.json';
import {BaseDesignComponent} from './BaseDesignComponent';
import {NumericInput} from './NumericInput';
import DatePicker from 'react-datepicker';
import moment from 'moment'; 
import 'react-datepicker/dist/react-datepicker.css';

const calImage = <img src='/images/calendar.png'/>;

class ComparisonValueInput extends BaseDesignComponent {
    constructor(props) {
        super(props);
        this.onBlur = this.onBlur.bind(this);
        let val = this.props.getValue(this.props.index);
        this.state = {
            comparisonValue: val
        };
    }
    
    render() {
        const val = this.props.getValue(this.props.index);
        switch(this.props.fieldType) {
            case 'date':
                return <DatePicker 
                    withPortal={this.props.usePortal}
                    className="dateInput"
                    dateFormat="MM/DD/YYYY"
                    selected={val} 
                    dropdownMode="scroll"
                    onChange={this.onBlur} />;
            case 'number':
            case 'float':
                return <NumericInput 
                    maxLength='8' 
                    onBlur={this.onBlur}
                    index={this.props.index}
                    allowCharacter={this.props.allowCharacter}
                    defaultValue={val}/>;
            default:
                return <input 
                    className="customColumnInput" 
                    type='text' 
                    onBlur={this.onBlur} 
                    defaultValue={val}/>;
        }
    }

    onBlur(val) {
        if (this.props.fieldType === 'date') {
            this.props.setValue(this.props.index, val);
            this.setState({comparisonValue: val});
        } else {
            this.props.setValue(this.props.index, val.target.value);
        }
            
        this.props.setTabState(false, false, false, !this.isWhereValid());
    }
}

export {ComparisonValueInput};