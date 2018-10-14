import React from 'react';
import "../app/App.css";
import config from '../config/appconfig.json';
import Spinner from './Spinner';
import {ColumnSettingsLine} from './ColumnSettingsLine';

const loop = (data) => {
    return data.map((node) => {
       return <ColumnSettingsLine columnNode={node} nodeCount={getNodeCount} onMove={onMove}/>;
       })};
var curobj;
class ColumnSettingsPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            move: false
        };
        curobj = this;
    }

    render() {
        const {error} = this.state;
        
        if (error) {
            return <div className="errorMessage">{error}</div>;
        } else {
            if (!document.designData.selnodes) {
                document.designData.selnodes = new Array();
                this.loadSelectedNodes(document.designData.modelHierarchy, document.designData.selnodes, '',  new Set(document.designData.selectedObjectKeys));
           
                for (let i = 0; i < document.designData.selnodes.length; ++i) {
                   document.designData.selnodes[i].__index = i;
                }
            }
            
            this.state.move = false;
            return (<div className="tabContainer">{loop(document.designData.selnodes)}</div>);
        }
    }
    
    loadSelectedNodes(pnode, nodes, curpath, keyset) {
        for (let i = 0; i < pnode.children.length; ++i) {
            if (pnode.children[i].columnName && keyset.has(pnode.children[i].key)) {
                if (curpath) {
                    pnode.children[i].path = curpath + '.' + pnode.children[i].title;
                } else {
                    pnode.children[i].path = pnode.children[i].title;
                }
                nodes.push(pnode.children[i]);
            }
        }
 
        
        for (let i = 0; i < pnode.children.length; ++i) {
            if (!pnode.children[i].columnName) {
                let newpath;
                if (curpath) {
                    newpath = curpath + '.' + pnode.children[i].title;
                } else {
                    newpath = pnode.children[i].title;
                }
                
                this.loadSelectedNodes(pnode.children[i], nodes, newpath, keyset);
            }
        }
    }
    
}

function onMove(index, inc) {
    let tmp = document.designData.selnodes[index];
    if (inc < 0) {
        document.designData.selnodes[index] = document.designData.selnodes[index - 1];
        document.designData.selnodes[index-1] = tmp;
    } else {
        document.designData.selnodes[index] = document.designData.selnodes[index + 1];
        document.designData.selnodes[index+1] = tmp;
    }   
    
    for (let i = 0; i < document.designData.selnodes.length; ++i) {
        document.designData.selnodes[i].__index = i;
    }
    
    curobj.setState({move: true});
}

function getNodeCount() {
    return document.designData.selnodes.length;
}
    
export {ColumnSettingsPanel};