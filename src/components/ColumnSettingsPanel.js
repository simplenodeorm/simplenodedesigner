import React from 'react';
import "../app/App.css";
import config from '../config/appconfig.json';
import Spinner from './Spinner';
import {ColumnSettingsLine} from './ColumnSettingsLine';

class ColumnSettingsPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            move: false
        };
        
        this.onMove = this.onMove.bind(this);
    }

    render() {
        const {error} = this.state;
        
        if (error) {
            return <div className="errorMessage">{error}</div>;
        } else {
            if (!document.designData.selnodes) {
                document.designData.selnodes = new Array();
                this.loadSelectedNodes(document.designData.modelHierarchy, document.designData.selnodes, new Set(document.designData.selectedObjectKeys));
            }
            
            this.state.move = false;

            let loop = (data) => {
                return data.map((node, i) => {
                    return <ColumnSettingsLine key={node.key} index={i} nodeCount={this.getNodeCount} onMove={this.onMove}/>;
                   });};

            return (<div className="tabContainer">{loop(document.designData.selnodes)}</div>);
        }
    }
    
    loadSelectedNodes(pnode, nodes, keyset) {
        for (let i = 0; i < pnode.children.length; ++i) {
            if (pnode.children[i].columnName && keyset.has(pnode.children[i].key)) {
                nodes.push(pnode.children[i]);
            }
        }
 
        
        for (let i = 0; i < pnode.children.length; ++i) {
            if (!pnode.children[i].columnName) {
                this.loadSelectedNodes(pnode.children[i], nodes, keyset);
            }
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