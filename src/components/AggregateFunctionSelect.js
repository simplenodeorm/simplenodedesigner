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
    }
    
    render() {
        return <span className="fieldLabel">{config.textmsg.aggfunctionlabel}<select onChange={this.props.onFunctionChange}><option></option>{options(this.props.functions)}</select></span>;
    }
}

export {AggregateFunctionSelect};