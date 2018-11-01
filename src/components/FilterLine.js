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
        this.setValue = this.setValue.bind(this);
        this.getValue = this.getValue.bind(this);
        this.allowCharacter = this.allowCharacter.bind(this);
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
                        <td><ComparisonValueInput setTabState={this.props.setTabState} 
                            index={this.props.index} 
                            getValue={this.getValue} 
                            setValue={this.setValue} 
                            allowCharacter={this.allowCharacter}
                            fieldType={document.designData.whereComparisons[this.props.index].fieldType}/></td>
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
    
    setValue(indx, val) {
         document.designData.whereComparisons[indx].comparisonValue = val;
    }
    
    getValue(indx) {
        return document.designData.whereComparisons[indx].comparisonValue;
    }

    allowCharacter(charCode) {
        // allow commas on in
        if ((document.designData.whereComparisons[this.props.index].comparisonOperator === 'in') && (charCode === 188)) {
            return true;
        } else {
            return false;
        }
    }
}

export {FilterLine};