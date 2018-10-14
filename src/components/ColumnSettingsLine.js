import React from 'react';
import "../app/App.css";
import config from '../config/appconfig.json';
import {AggregateFunctionSelect} from './AggregateFunctionSelect';
import {SortPositionInput} from './SortPositionInput';
import {AscDescCheckbox} from './AscDescCheckbox';
import {CustomColumnInput} from './CustomColumnInput';
import {ColumnLabel} from './ColumnLabel';
import {MoveButton} from './MoveButton';
    
const dateFunctions = ['count', 'min', 'max'];
const stringFunctions = ['count'];
const numberFunctions = ['avg', 'count', 'min', 'max', 'sum'];

class ColumnSettingsLine extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            error: '',
        };
        
        this.onMove = this.onMove.bind(this);
    }

    render() {
        let funcs;
        switch(this.getType(this.props.columnNode.type)) {
            case "date":
                funcs = dateFunctions;
                break;
            case "number":
                funcs = numberFunctions;
                break;
            default:
                funcs = stringFunctions;
                break;
        }

        return <div className="formatSelectionLine">
        <div className="lineStyle1">
        { (this.props.columnNode.__index > 0) ? <MoveButton type='up' index={this.props.columnNode.__index} onMove={this.onMove} /> : <img src="/images/blank.png"/> }
        <span className="label">{this.props.columnNode.__index + 1}.&nbsp;</span>{this.props.columnNode.path}</div>
        <div className="lineStyle1">
            { (this.props.columnNode.__index < (this.props.nodeCount() - 1)) ? <MoveButton type='down' index={this.props.columnNode.__index} onMove={this.onMove} /> : <img src="/images/blank.png"/> }
            <ColumnLabel onColumnChange={this.onColumnLabelChange}/>
            <AggregateFunctionSelect onFunctionChange={this.onFunctionChange} functions={funcs} />
            <SortPositionInput onSortPosChange={this.onSortPosChange}/>
            <AscDescCheckbox onAscDescChange={this.onAscDescChange}/>
            <CustomColumnInput onCustomColumnInputChange={this.onCustomColumnInputChange}/></div>
        </div>;
    }
    
    onMove(index, inc) {
        this.props.onMove(index, inc);
    }
    
    onAscDescChange(e) {
        this.props.columnNode.__sortDescending = e.target.checked;
    }

    onCustomColumnInputChantge(e) {
        this.props.columnNode.__customColumnInput = e.target.value;
    }

    onSortPosChange(e) {
        this.props.columnNode.__sortPosition = e.target.value;
    }

    onFunctionChange(e) {
        this.props.columnNode.__selectedFunction = e.target[e.target.selectedIndex].value;
    }
    
    onColumnLabelChange(e) {
        this.props.columnNode.__columnLabel = e.target[e.target.selectedIndex].value;
    }
    
    getType(dbType) {
        let retval = 'string'
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

export {ColumnSettingsLine};