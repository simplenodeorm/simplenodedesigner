import React from 'react';
import "../app/App.css";
import config from '../config/appconfig.json';
import {LogicalOperatorSelect} from './LogicalOperatorSelect';
import {OpenParenthesis} from './OpenParenthesis';
import {CloseParenthesis} from './CloseParenthesis';
import {ComparisonOperatorSelect} from './ComparisonOperatorSelect';
import {ComparisonValueInput} from './ComparisonValueInput';
import {CustomFilterInput} from './CustomFilterInput';

class FilterLine extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: ''
        };
        
        this.onDelete = this.onDelete.bind(this);
    }
    
    render() {
        return <div className="formatSelectionLine">
            <div className="lineStyle1">
                <span className="label"><button className="moveButton" onClick={this.onDelete}><img alt='add filter column' src='/images/delete.png'/></button>{this.props.index + 1}.&nbsp;</span>{document.designData.whereComparisons[this.props.index].fieldName.replace(/\./g, '->')}
            </div>
            <div className="lineStyle1">
                <table>
                    <tr>
                        <td><LogicalOperatorSelect index={this.props.index}/></td>
                        <td><OpenParenthesis index={this.props.index}/></td>
                        <td><span className="label">field</span></td>
                        <td><ComparisonOperatorSelect index={this.props.index}/></td>
                        <td><ComparisonValueInput index={this.props.index} /></td>
                    </tr>
                </table>
            </div>
            <div className="lineStyle1">
                <table>
                    <tr>
                        <td><span className="fieldLabel">{config.textmsg.customcolinputlabel}</span>&nbsp;<CustomFilterInput index={this.props.index} /></td>
                        <td><CloseParenthesis index={this.props.index}/></td>
                    </tr>
               </table>
            </div>
        </div>;
    }
    
    onDelete() {
        this.props.onDelete(this.props.index);
    }
    
    getColumnName() {
        let pos = document.designData.whereComparisons[this.props.index].fieldName.lastIndexOf('.');
        return document.designData.whereComparisons[this.props.index].fieldName.substring(pos+1);
    }
}

export {FilterLine};