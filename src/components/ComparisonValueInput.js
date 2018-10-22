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
        this.fieldType = this.getFieldType(this.getSelectNode(document.designData.whereComparisons[this.props.index].fieldName).type);
        this.state = {
            comparisonValue: document.designData.whereComparisons[this.props.index].comparisonValue
        }
    }
    
    render() {
        switch(this.fieldType) {
            case 'date':
                return <DatePicker 
                    className="dateInput"
                    dateFormat="MM/DD/YYYY"
                    selected={document.designData.whereComparisons[this.props.index].comparisonValue} 
                    onChange={this.onBlur} />;
            case 'number':
                return <NumericInput 
                    maxLength='8' 
                    onBlur={this.onBlur} 
                    defaultValue={document.designData.whereComparisons[this.props.index].comparisonValue}/>;
            default:
                return <input 
                    className="customColumnInput" 
                    type='text' 
                    onBlur={this.onBlur} 
                    defaultValue={document.designData.whereComparisons[this.props.index].comparisonValue}/>;
        }
    }

    onBlur(val) {
        let orig = document.designData.whereComparisons[this.props.index].comparisonValue;
        if (this.fieldType === 'date') {
            document.designData.whereComparisons[this.props.index].comparisonValue = val;
            this.setState({comparisonValue: val});
        } else {
            document.designData.whereComparisons[this.props.index].comparisonValue = val.target.value;
        }
        
        if (!orig && document.designData.whereComparisons[this.props.index].comparisonValue) {
            this.props.setTabState(false, false, false, false);
        }
    }
}

export {ComparisonValueInput};