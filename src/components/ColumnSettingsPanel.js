import React from 'react';
import "../app/App.css";
import config from '../config/appconfig.json';
import Spinner from './Spinner';
import {ColumnSettingsLine} from './ColumnSettingsLine';
import {BaseDesignComponent} from './BaseDesignComponent';

class ColumnSettingsPanel extends BaseDesignComponent {
    constructor(props) {
        super(props);
        this.loadSelectedNodesIfRequired();
        this.state = {
            error: '',
            move: false
        };
        
        this.onMove = this.onMove.bind(this);
    }

    render() {
        const {error} = this.state;
        this.loadSelectedNodesIfRequired();
        
        if (error) {
            return <div className="errorMessage">{error}</div>;
        } else {
            this.state.move = false;

            let loop = (data) => {
                return data.map((node, i) => {
                    return <ColumnSettingsLine key={node.key} index={i} nodeCount={this.getNodeCount} onMove={this.onMove}/>;
                   });};

            return (<div className="tabContainer">{loop(document.designData.selnodes)}</div>);
        }
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