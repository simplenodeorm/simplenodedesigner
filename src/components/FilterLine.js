import React from 'react';
import "../app/App.css";
import config from '../config/appconfig.json';
import {LogicalOperatorSelect} from './LogicalOperatorSelect';
import {OpenParenthesis} from './OpenParenthesis';
import {CloseParenthesis} from './CloseParenthesis';
import {ComparisonOperatorSelect} from './ComparisonOperatorSelect';
import {ComparisonValueInput} from './ComparisonValueInput';

class FilterLine extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            error: ''
        };
        
        this.onDelete = this.onDelete.bind(this);
    }
    
    render() {
        return <div className="formatSelectionLine">
            <div className="lineStyle1">
                <span className="label">{this.props.index + 1}.&nbsp;</span>{document.designData.whereComparisons[this.props.index].fieldName.replace(/\./g, '->')}
            </div>
            <div className="lineStyle1">
                <LogicalOperatorSelect index={this.props.index}/>
                <OpenParenthesis index={this.props.index}/>
                &nbsp;<span className="label">current field</span>&nbsp;
                <ComparisonOperatorSelect index={this.props.index}/>
                <ComparisonValueInput index={this.props.index}/>
                <CloseParenthesis index={this.props.index}/>
            </div>
        </div>;
    }
    
    onDelete() {
    }
    
    getColumnName() {
        let pos = document.designData.whereComparisons[this.props.index].fieldName.lastIndexOf('.');
        return document.designData.whereComparisons[this.props.index].fieldName.substring(pos+1);
    }
}

export {FilterLine};