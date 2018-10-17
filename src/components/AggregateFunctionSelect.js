import React from 'react';
import "../app/App.css";
import config from '../config/appconfig.json';


const dateFunctions = ['count', 'min', 'max'];
const stringFunctions = ['count'];
const numberFunctions = ['avg', 'count', 'min', 'max', 'sum'];

class AggregateFunctionSelect extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        
        switch(this.getType(document.designData.selnodes[this.props.index].type)) {
            case "date":
                this.functions = dateFunctions;
                break;
            case "number":
                this.functions = numberFunctions;
                break;
            default:
                this.functions = stringFunctions;
                break;
        }
    }
    
    render() {
        const selvalue = document.designData.selnodes[this.props.index].__selectedFunction
        const options = (functions) => {
            return functions.map((f) => {
                if (f === selvalue) {
                    return <option value={f} selected>{f}</option>;
                } else {
                    return <option value={f}>{f}</option>;
                }
            })};

        return <span className="fieldLabel">{config.textmsg.aggfunctionlabel}<select onChange={this.onChange}><option></option>{options(this.functions)}</select></span>;
    }
    
    onChange(e) {
        document.designData.selnodes[this.props.index].__selectedFunction = e.target[e.target.selectedIndex].value;
    }
    
    getType(dbType) {
        let retval = 'string';
        switch(dbType) {
            case 'DATE':
                retval = 'date';
                break;
            case 'NUMBER':
                retval = 'number';
                break;
        }
        
        return retval;
    }
}

export {AggregateFunctionSelect};