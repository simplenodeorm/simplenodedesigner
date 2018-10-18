import React from 'react';
import "../app/App.css";
import config from '../config/appconfig.json';
import Spinner from './Spinner';
import {AddFilterColumn} from './AddFilterColumn';

class FilterPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            selectedColumn: document.designData.selnodes[0].__path__
        };
    }

    render() {
        const {error} = this.state;
        
        if (error) {
            return <div className="errorMessage">{error}</div>;
        } else {
            return <AddFilterColumn onColumnChange={this.onColumnChange} addColumn={this.addColumn}/>;
        }
    }
    
    addColumn() {
        let whereComparison = {
            fieldName: this.state.selectedColumn,
            comparisonValue: '',
            comparisonOperator: '=',
            openParen: '',
            closeParen: '',
            logicalOperator: 'AND'
        };
        
        if (!document.designData.whereComparisons) {
            document.designData.whereComparisons = new Array();
        }
        
        document.designData.whereComparisons.push(whereComparison);
    }
    
    onColumnChange(e) {
        this.state.selectedColumn = e.target.options[e.target.selectedIndex].text;
    }
}

export {FilterPanel};