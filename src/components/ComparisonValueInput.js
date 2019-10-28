/*
 * Copyright (c) 2019 simplenodeorm.org
 */

import React from 'react';
import "../app/App.css";
import {BaseDesignComponent} from './BaseDesignComponent';
import {NumericInput} from './NumericInput';
import {isWhereValid} from './helpers';

class ComparisonValueInput extends BaseDesignComponent {
    constructor(props) {
        super(props);
        this.onBlur = this.onBlur.bind(this);
    }
    
    render() {
        const val = this.props.getValue(this.props.index);
        switch(this.props.fieldType) {
            case 'date':
                return <input style={{marginLeft: "10px"}} className="dateInput" type={"date"} defaultValue={val} onBlur={this.onBlur}/>;
            case 'number':
            case 'float':
            case 'int':
            case 'bigint':
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
            this.props.setValue(this.props.index, new Date(val.target.value));
        } else {
            this.props.setValue(this.props.index, val.target.value);
        }

        if (this.props.setTabState) {
            this.props.setTabState(false, false, false, !isWhereValid());
        }
    }
}

export {ComparisonValueInput};