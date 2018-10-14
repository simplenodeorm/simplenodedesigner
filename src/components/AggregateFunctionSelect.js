import React from 'react';
import "../app/App.css";
import config from '../config/appconfig.json';


const dateFunctions = ['count', 'min', 'max'];
const stringFunctions = ['count'];
const numberFunctions = ['avg', 'count', 'min', 'max', 'sum'];

const options = (functions) => {
    return functions.map((f) => {
        return <option value={f}>{f}</option>;
    })};

class AggregateFunctionSelect extends React.Component {
    constructor(props) {
        super(props);
        this.onFunctionChange = this.onFunctionChange.bind(this);
        
        switch(this.getType(this.props.columnNode.type)) {
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
        return <span className="fieldLabel">{config.textmsg.aggfunctionlabel}<select onChange={this.onFunctionChange}><option></option>{options(this.functions)}</select></span>;
    }
    
    onFunctionChange(e) {
        this.props.columnNode.__selectedFunction = e.target[e.target.selectedIndex].value;
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