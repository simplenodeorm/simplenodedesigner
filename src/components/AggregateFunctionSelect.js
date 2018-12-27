import React from 'react';
import "../app/App.css";
import config from '../config/appconfig.json';
import {BaseDesignComponent} from './BaseDesignComponent';
import {getFieldType} from './helpers';
const dateFunctions = ['count', 'min', 'max'];
const stringFunctions = ['count'];
const numberFunctions = ['avg', 'count', 'min', 'max', 'sum'];

class AggregateFunctionSelect extends BaseDesignComponent {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        
        switch(getFieldType(document.designData.selnodes[this.props.index].type)) {
            case "date":
                this.functions = dateFunctions;
                break;
            case "number":
            case "float":
                this.functions = numberFunctions;
                break;
            default:
                this.functions = stringFunctions;
                break;
        }
    }
    
    render() {
        const selvalue = document.designData.selnodes[this.props.index].__selectedFunction;
        const options = (functions) => {
            return functions.map((f) => {
                if (f === selvalue) {
                    return <option value={f} selected>{f}</option>;
                } else {
                    return <option value={f}>{f}</option>;
                }
            })};

        return <span className="fieldLabel">{config.textmsg.aggfunctionlabel}<select onChange={this.onChange}><option/>{options(this.functions)}</select></span>;
    }
    
    onChange(e) {
        document.designData.selnodes[this.props.index].__selectedFunction = e.target[e.target.selectedIndex].value;
    }
}

export {AggregateFunctionSelect};