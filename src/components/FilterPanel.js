import React from 'react';
import "../app/App.css";
import {AddFilterColumn} from './AddFilterColumn';
import {FilterLine} from './FilterLine';
import {BaseDesignComponent} from './BaseDesignComponent';
import {getFieldType} from './helpers';
import {getUniqueKey} from './helpers';

class FilterPanel extends BaseDesignComponent {
    constructor(props) {
        super(props);
        this.loadSelectedNodesIfRequired();
        this.state = {
            selectedColumn: document.designData.selnodes[0].__path__,
            filterAdded: false,
            filterDeleted: false,
            redraw: false
        };
        
        this.onColumnChange = this.onColumnChange.bind(this);
        this.addColumn = this.addColumn.bind(this);
        this.onDeleteLine = this.onDeleteLine.bind(this);
    }

    render() {
        const setTabState = this.props.setTabState;
        const loop = (data) => {
            return data.map((node, i) => {
                return <FilterLine key={getUniqueKey()} index={i} onDelete={this.onDeleteLine} setTabState={setTabState} />;
               });};
        
        this.loadSelectedNodesIfRequired();
        this.state.filterAdded = false;
        this.state.filterDeleted = false;
        this.state.redraw = false;

        if (document.designData.whereComparisons 
            && (document.designData.whereComparisons.length > 0)) {
            
            return <div className="tabContainer">
                <AddFilterColumn onColumnChange={this.onColumnChange} addColumn={this.addColumn}/>
                    {loop(document.designData.whereComparisons)}
                </div>;
        } else {
            this.state.fieldType = getFieldType(document.designData.selnodes[0].type);
            return <div><AddFilterColumn onColumnChange={this.onColumnChange} addColumn={this.addColumn}/></div>;
        }
    }
    
    onDeleteLine(indx) {
        document.designData.whereComparisons.splice(indx, 1);
        this.setState({filterDeleted: true});

        if (this.isWhereValid()) {
            this.props.setTabState(false, false, false, false);
        } else {
            this.props.setTabState(false, false, false, true);
        }
    }
    
    addColumn() {
        let whereComparison = {
            fieldName: this.state.selectedColumn,
            comparisonOperator: '=',
            fieldType: this.state.fieldType
        };
        
        if (!document.designData.whereComparisons) {
            document.designData.whereComparisons = [];
        } else {
            whereComparison.logicalOperator = 'and';
        }

        document.designData.whereComparisons.push(whereComparison);
        
        if (this.isWhereValid()) {
            this.props.setTabState(false, false, false, false);
        } 

        this.setState({filterAdded: true});
    }
    
    onColumnChange(sel) {
        this.state.selectedColumn = sel.options[sel.selectedIndex].text;
        this.state.fieldType = getFieldType(document.designData.selnodes[sel.selectedIndex].type);
    }
}

export {FilterPanel};