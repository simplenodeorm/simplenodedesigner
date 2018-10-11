import React from 'react';
import "../app/App.css";
import config from '../config/appconfig.json';
import {AggregateFunctionSelect} from './AggregateFunctionSelect';
import {SortPositionInput} from './SortPositionInput';
import {AscDescCheckbox} from './AscDescCheckbox';
import {CustomColumnInput} from './CustomColumnInput';

const dateFunctions = ['count', 'min', 'max'];
const stringFunctions = ['count'];
const numberFunctions = ['avg', 'count', 'min', 'max', 'sum'];

class FormatSelectionLine extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            error: '',
            sortPosition: '',
            aortAscending: true,
            selectedFunction: '',
            customColumnInput: ''
        };
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
            <div className="lineStyle1"><span className="label">{this.props.columnNode.__index + 1}.&nbsp;</span>{this.props.columnNode.path}</div>
            <AggregateFunctionSelect onFunctionChange={this.onFunctionChange} functions={funcs} />
            <SortPositionInput onSortPosChange={this.onSortPosChange}/>
            <AscDescCheckbox onAscDescChange={this.onAscDescChange}/>
            <CustomColumnInput onCustomColumnInputChange={this.onCustomColumnInputChange}/>
        </div>;
    }
    
    onAscDescChange(e) {
        this.state.sortAscending = !e.target.checked;
    }

    onCustomColumnInputChantge(e) {
        this.state.customColumnInput = e.target.value;
    }

    onSortPosChange(e) {
        this.state.sortPosition = e.target.value;
    }

    onFunctionChange(e) {
        this.state.selectedFunction = e.target[e.target.selectedIndex].value;
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

export {FormatSelectionLine};