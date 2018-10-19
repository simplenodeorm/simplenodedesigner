import React from 'react';
import "../app/App.css";
import config from '../config/appconfig.json';

class ComparisonValueInput extends React.Component {
    constructor(props) {
        super(props);
        this.onBlur = this.onBlur.bind(this);
    }
    
    render() {
        return <span><input className="customColumnInput" type='text' onBlur={this.onBlur} value={document.designData.whereComparisons[this.props.index].comparisonValue}/></span>;
    }

    onBlur(e) {
        document.designData.whereComparisons[this.props.index].comparisonValue = e.target.value;
    }
}

export {ComparisonValueInput};