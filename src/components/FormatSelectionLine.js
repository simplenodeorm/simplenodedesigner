import React from 'react';
import "../app/App.css";
import config from '../config/appconfig.json';
import {AggregateFunctionSelect} from './AggregateFunctionSelect';
import {SortPositionInput} from './SortPositionInput';

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
            selectedFunction: ''
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
            <span className="label">{this.props.columnNode.__index + 1}.&nbsp;</span>
            <span className="lineStyle1">{this.props.columnNode.path}</span>
            <br />
            <SortPositionInput onSortPosChange={this.onSortPosChange}/><AggregateFunctionSelect onFunctionChange={this.onFunctionChange} functions={funcs} />
        </div>;
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