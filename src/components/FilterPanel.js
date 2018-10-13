import React from 'react';
import "../app/App.css";
import config from '../config/appconfig.json';
import Spinner from './Spinner';
import {ColumnSettingsLine} from './ColumnSettingsLine';

const loop = (data) => {
    return data.map((node) => {
       return <ColumnSettingsLine columnNode={node}/>;
       })};

class FilterPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: ''
        };
    }

    render() {
        const {error} = this.state;
        
        if (error) {
            return <div className="errorMessage">{error}</div>;
        } else {
           let selnodes = new Array();
           this.loadSelectedNodes(document.designData.modelHierarchy, selnodes, '',  new Set(document.designData.selectedObjectKeys));
           
           if (!selnodes[0].__index) {
               for (let i = 0; i < selnodes.length; ++i) {
                   selnodes[i].__index = i;
               }
           } else {
               selnodes.sort(function(a, b){return a.__index-b.__index});
           }
           
           return (<div className="tabContainer">{loop(selnodes)}</div>);
        }
    }
    
    loadSelectedNodes(pnode, selnodes, curpath, keyset) {
        for (let i = 0; i < pnode.children.length; ++i) {
            if (pnode.children[i].columnName && keyset.has(pnode.children[i].key)) {
                if (curpath) {
                    pnode.children[i].path = curpath + '.' + pnode.children[i].title;
                } else {
                    pnode.children[i].path = pnode.children[i].title;
                }
                selnodes.push(pnode.children[i]);
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
                
                this.loadSelectedNodes(pnode.children[i], selnodes, newpath, keyset);
            }
        }
    }
}

export {FilterPanel};