import React from 'react';
import "../app/App.css";
import config from '../config/appconfig.json';

const options = (functions) => {
    return functions.map((f) => {
        return <option value={f}>{f}</option>;
    })};

class AggregateFunctionSelect extends React.Component {
    constructor(props) {
        super(props);
        this.onFunctionChange = this.onFunctionChange.bind(this);
    }
    
    render() {
        return <span className="fieldLabel">{config.textmsg.aggfunctionlabel}<select onChange={this.onFunctionChange}><option></option>{options(this.props.functions)}</select></span>;
    }
    
    onFunctionChange(e) {
        this.props.columnNode.__selectedFunction = e.target[e.target.selectedIndex].value;
    }
    
}

export {AggregateFunctionSelect};