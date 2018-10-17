import React from 'react';
import "../app/App.css";
import config from '../config/appconfig.json';
import {AggregateFunctionSelect} from './AggregateFunctionSelect';
import {SortPositionInput} from './SortPositionInput';
import {AscDescCheckbox} from './AscDescCheckbox';
import {CustomColumnInput} from './CustomColumnInput';
import {ColumnLabel} from './ColumnLabel';
import {MoveButton} from './MoveButton';
    
class ColumnSettingsLine extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            error: '',
            moved: false
        };
        
        this.onMoveUp = this.onMoveUp.bind(this);
        this.onMoveDown = this.onMoveDown.bind(this);
    }
    
    render() {
        this.state.moved = false;
   return <div className="formatSelectionLine">
        <div className="lineStyle1">
        { (this.props.index > 0) ? <MoveButton type='up' index={this.props.index} onMove={this.onMoveUp} /> : <img src="/images/blank.png"/> }
        <span className="label">{this.props.index + 1}.&nbsp;</span>{this._reactInternalFiber.key}</div>
            <div className="lineStyle1">
                { (this.props.index < (this.props.nodeCount() - 1)) ? <MoveButton type='down' index={this.props.index} onMove={this.onMoveDown} /> : <img src="/images/blank.png"/> }
                <ColumnLabel index={this.props.index}/>
                <AggregateFunctionSelect index={this.props.index}/>
                <SortPositionInput index={this.props.index}/>
                <AscDescCheckbox index={this.props.index}/>
                <CustomColumnInput index={this.props.index}/>
            </div>
        </div>;
    }
    
    onMoveDown() {
        this.props.onMove(this.props.index, 1);
    }
    
    onMoveUp() {
        this.props.onMove(this.props.index, -1);
    }
}

export {ColumnSettingsLine};