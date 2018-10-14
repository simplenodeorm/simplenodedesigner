import React from 'react';
import "../app/App.css";
import config from '../config/appconfig.json';
import Spinner from './Spinner';
import {ColumnSettingsLine} from './ColumnSettingsLine';

const loop = (data) => {
    return data.map((node) => {
       return <ColumnSettingsLine columnNode={node} nodeCount={getNodeCount} onMove={onMove}/>;
       })};

var selnodes = new Array();
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
            if (selnodes.length === 0) {
                this.loadSelectedNodes(document.designData.modelHierarchy, selnodes, '',  new Set(document.designData.selectedObjectKeys));
           
                if (!selnodes[0].__index) {
                    for (let i = 0; i < selnodes.length; ++i) {
                       selnodes[i].__index = i;
                    }
                }
            }
            
            this.state.move = false;
            return (<div className="tabContainer">{loop(selnodes)}</div>);
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
    if (inc < 0) {
        selnodes[index-1].__index = selnodes[index].__index;
    } else {
        selnodes[index+1].__index = selnodes[index].__index;
    }   
    selnodes[index].__index += inc;
    selnodes.sort(function(a, b){return a.__index-b.__index;});
    curobj.setState({move: true});
}

function getNodeCount() {
    return selnodes.length;
}
    
export {ColumnSettingsPanel};