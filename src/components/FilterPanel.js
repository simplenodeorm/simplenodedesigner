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
            filterAdded: false,
            lineDeleted: false
        };
        this.onColumnChange = this.onColumnChange.bind(this);
        this.addColumn = this.addColumn.bind(this);
        this.onDeleteLine = this.onDeleteLine.bind(this);
    }

    render() {
        const {error} = this.state;
        const setTabState = this.props.setTabState;
        const loop = (data) => {
            return data.map((node, i) => {
                return <FilterLine key={this.getUniqueKey()} index={i} onDelete={this.onDeleteLine} setTabState={setTabState} />;
               });};
        
        this.loadSelectedNodesIfRequired();
        this.state.filterAdded = false;
        this.state.lineDeleted = false;

        if (error) {
            return <div className="errorMessage">{error}</div>;
        } else if (document.designData.whereComparisons 
                && (document.designData.whereComparisons.length > 0)) {
            
            return <div className="tabContainer">
                <AddFilterColumn onColumnChange={this.onColumnChange} addColumn={this.addColumn}/>
                    {loop(document.designData.whereComparisons)}
                </div>;
        } else {
            return <div><AddFilterColumn onColumnChange={this.onColumnChange} addColumn={this.addColumn}/></div>;
        }
    }
    
    onDeleteLine(indx) {
        document.designData.whereComparisons.splice(indx, 1);
        this.setState({lineDeleted: true});

        if (document.designData.whereComparisons.length > 0) {
            this.props.setTabState(false, false, false, false);
        } else {
            this.props.setTabState(false, false, false, true);
        }
    }
    
    addColumn() {
        let whereComparison = {
            fieldName: this.state.selectedColumn,
            comparisonValue: '',
            comparisonOperator: '=',
            openParen: '',
            closeParen: '',
            logicalOperator: 'AND',
            customFilterInput: ''
        };
        
        if (!document.designData.whereComparisons) {
            document.designData.whereComparisons = new Array();
        }

        document.designData.whereComparisons.push(whereComparison);
        
        if (this.isWhereValid()) {
            this.props.setTabState(false, false, false, false);
        } 

        this.setState({filterAdded: true});
    }
    
    isWhereValid() {
        let retval = false;
        
        if ((document.designData.whereComparisons && document.designData.whereComparisons.length > 0)) {
            let ok = true;
            for (let i = 0; i < document.designData.whereComparisons.length; ++i) {
                if (!document.designData.whereComparisons[i].customFilterInput 
                    && !this.isUnaryOperator(document.designData.whereComparisons[i].comparisonOperator) 
                        && !document.designData.whereComparisons[i].comparisonValue) {
                    ok = false;
                    break;
                }
            }
                
            retval = ok;
        }
        
        return retval;
    }
    
    onColumnChange(sel) {
        this.state.selectedColumn = sel.options[sel.selectedIndex].text;
    }
}

export {FilterPanel};