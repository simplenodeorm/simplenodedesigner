import React from 'react';
import "../app/App.css";
import config from '../config/appconfig.json';

const dateAggFunction = <select><option></option><option>count</option><option>max</option><option>min</option></select>
const numAggFunction = <select><option></option><option>avg</option><option>count</option><option>max</option><option>min</option><option>sum</option></select>
const strAggFunction = <select><option></option><option>count</option></select>

class FormatSelectionLine extends React.Component {
    constructor(props) {
        super(props);
        
        let fsel;
        switch(this.getType(props.columnNode.type)) {
            case "string":
                fsel = strAggFunction;
                break;
            case "date":
                fsel = dateAggFunction;
                break;
            case "number":
                fsel = numAggFunction;
                break;
        }
        
        this.state = {
            loading: false,
            error: '',
            functionSelect: fsel
        };
    }

    render() {
        return <div className="formatSelectionLine">
            <span className="label">{this.props.columnNode.__index + 1}.&nbsp;</span>
            <span className="lineStyle1">{this.props.columnNode.path}</span>
            <br />
            <input type="text" value=''/>{this.state.functionSelect}
        </div>;
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