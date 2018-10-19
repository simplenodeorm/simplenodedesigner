import React from 'react';
import "../app/App.css";
import config from '../config/appconfig.json';
import {AddFilterColumn} from './AddFilterColumn';
import {FilterLine} from './FilterLine';
import {BaseDesignComponent} from './BaseDesignComponent';

class FilterPanel extends BaseDesignComponent {
    constructor(props) {
        super(props);
        this.loadSelectedNodesIfRequired();
        this.state = {
            error: '',
            selectedColumn: document.designData.selnodes[0].__path__,
            filterAdded: false
        };
        
        this.onColumnChange = this.onColumnChange.bind(this);
        this.addColumn = this.addColumn.bind(this);
    }

    render() {
        const {error} = this.state;
        const loop = (data) => {
            return data.map((node, i) => {
                return <FilterLine key={i} index={i}/>;
               });};
        
        this.loadSelectedNodesIfRequired();
        this.state.filterAdded = false;
        if (error) {
            return <div className="errorMessage">{error}</div>;
        } else if (document.designData.whereComparisons 
                && (document.designData.whereComparisons.length > 0)) {
            
            return <div>
                <AddFilterColumn onColumnChange={this.onColumnChange} addColumn={this.addColumn}/>
                    {loop(document.designData.whereComparisons)}
                </div>;
        } else {
            return <div><AddFilterColumn onColumnChange={this.onColumnChange} addColumn={this.addColumn}/></div>
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
        this.setState({filterAdded: true});
    }
    
    onColumnChange(sel) {
        this.state.selectedColumn = sel.options[sel.selectedIndex].text;
    }
}

export {FilterPanel};