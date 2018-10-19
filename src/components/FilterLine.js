import React from 'react';
import "../app/App.css";
import config from '../config/appconfig.json';
import {LogicalOperatorSelect} from './LogicalOperatorSelect';
import {OpenParenthesis} from './OpenParenthesis';
import {CloseParenthesis} from './CloseParenthesis';

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
        <span className="label">{this.props.index + 1}.&nbsp;</span>{document.designData.whereComparisons[this.props.index].__path__.replace(/\./g, '->')}</div>
            <div className="lineStyle1">
                <LogicalOperatorSelect/>
                <OpenParenthesis/>
                <ComparisonOperatorSelect/>
                <ComparisonValueInput/>
                <CloseParenthesis/>
            </div>
        </div>;
    }
    
    onDelete() {
    }
}

export {FilterLine};