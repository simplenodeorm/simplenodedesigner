import React from 'react';
import "../app/App.css";
import config from '../config/appconfig.json';


class LogicalOperatorSelect extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }
    
    render() {
        return <select onChange={this.onChange}><option>AND</option><option>OR</option></select>;
    }
    
    onChange(e) {
        document.designData.whereComparisons[this.props.index].logicalOperator = e.target[e.target.selectedIndex].text;
    }
    
}

export {LogicalOperatorSelect};