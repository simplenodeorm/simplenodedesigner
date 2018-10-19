import React from 'react';
import "../app/App.css";
import config from '../config/appconfig.json';


class ComparisonOperatorSelect extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }
    
    render() {
        return <select onChange={this.onChange}>
                <option>&eq;</option>
                <option>&lt;</option>
                <option>&lt;&eq;</option>
                <option>&gt;</option>
                <option>&gt;&eq;</option>
                <option>&lt;&gt;</option>
                <option>null</option>
                <option>not null</option>
                <option>in</option>
                <option>like</option>
            </select>;
    }
    
    onChange(e) {
        document.designData.whereComparisons[this.props.index].comparisonOperator = e.target[e.target.selectedIndex].text;
    }
    
}

export {ComparisonOperatorSelect};