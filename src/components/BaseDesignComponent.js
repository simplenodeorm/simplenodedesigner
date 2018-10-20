import React from 'react';

class BaseDesignComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    
    clearDocumentDesignData() {
        document.designData.modelHierarchy = '';
        document.designData.selectedObjectKeys = '';
        document.designData.selnodes = '';
        document.designData.whereComparisons = '';
    }
    
    
    loadSelectedNodesIfRequired() {
        if (!document.designData.selnodes) {
            document.designData.selnodes = new Array();
            this.loadSelectedNodes(document.designData.modelHierarchy, document.designData.selnodes, new Set(document.designData.selectedObjectKeys));
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
    
    getUniqueKey() {
        let dt = new Date().getTime();
        let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            let r = (dt + Math.random()*16)%16 | 0;
            dt = Math.floor(dt/16);
            return (c==='x' ? r :(r&0x3|0x8)).toString(16);
        });
        return uuid;
    }
    
    getSelectNode(fieldName) {
        let retval;
        
        for (let i = 0; i < document.designData.selnodes.length; ++i) {
            if (fieldName === document.designData.selnodes[i].__path__) {
                retval = document.designData.selnodes[i];
                break;
            }
        }
        
        return retval;
    }
    
    getFieldType(dbType) {
        let retval = 'string';
        switch(dbType) {
            case 'DATE':
                retval = 'date';
                break;
            case 'NUMBER':
                retval = 'number';
                break;
        }
        
        return retval;
    }

}

export {BaseDesignComponent};

