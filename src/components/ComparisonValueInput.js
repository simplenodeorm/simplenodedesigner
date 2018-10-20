import React from 'react';
import "../app/App.css";
import config from '../config/appconfig.json';
import {BaseDesignComponent} from './BaseDesignComponent';
import {NumericInput} from './NumericInput';
import DateTimePicker from 'react-datetime-picker';

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
                return <span><DateTimePicker onChange={this.onBlur} 
                    value={document.designData.whereComparisons[this.props.index].comparisonValue} 
                    disableClock={true} 
                    showLeadingZeros={true}
                    calendarIcon={calImage}/></span>;
            case 'number':
                return <span><NumericInput 
                    maxLength='8' 
                    onBlur={this.onBlur} 
                    defaultValue={document.designData.whereComparisons[this.props.index].comparisonValue}/></span>;
            default:
                return <span>   
                    <input 
                    className="customColumnInput" 
                    type='text' 
                    onBlur={this.onBlur} 
                    defaultValue={document.designData.whereComparisons[this.props.index].comparisonValue}/></span>;
        }
    }

    onBlur(val) {
        if (this.fieldType === 'date') {
            document.designData.whereComparisons[this.props.index].comparisonValue = val;
            this.setState({comparisonValue: val});
        } else {
            document.designData.whereComparisons[this.props.index].comparisonValue = val.target.value;
        }
    }
}

export {ComparisonValueInput};