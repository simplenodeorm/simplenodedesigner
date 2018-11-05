import React from 'react';
import "../app/App.css";
import {ColumnSettingsLine} from './ColumnSettingsLine';
import {BaseDesignComponent} from './BaseDesignComponent';

class ColumnSettingsPanel extends BaseDesignComponent {
    constructor(props) {
        super(props);
        this.loadSelectedNodesIfRequired();
        this.state = {
            move: false
        };
        
        this.onMove = this.onMove.bind(this);
    }

    render() {
        this.loadSelectedNodesIfRequired();
        
        this.state.move = false;

        let loop = (data) => {
            return data.map((node, i) => {
                return <ColumnSettingsLine key={node.key} index={i} nodeCount={this.getNodeCount} onMove={this.onMove}/>;
               });};

        return (<div className="tabContainer">{loop(document.designData.selnodes)}</div>);
    }
    
    onMove(index, inc) {
        let tmp = document.designData.selnodes[index];
        if (inc < 0) {
            document.designData.selnodes[index] = document.designData.selnodes[index-1]; 
            document.designData.selnodes[index-1] = tmp;
        } else {
            document.designData.selnodes[index] = document.designData.selnodes[index+1];
            document.designData.selnodes[index+1] = tmp;
        }   

        this.setState({move: true});
    }

    getNodeCount() {
        return document.designData.selnodes.length;
    }
}

    
export {ColumnSettingsPanel};