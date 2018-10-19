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
}

export {BaseDesignComponent};

