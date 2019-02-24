import React from 'react';
import ReactDOM from 'react-dom';
import {getWaitMessage} from './helpers';
import {removeWaitMessage} from './helpers';

class BaseDesignComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    loadSelectedNodesIfRequired(force) {
        if (!document.designData.selnodes || force) {
            document.designData.selnodes = [];
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


    getQueryDocument(params) {
        if (!params) {
            params = {distinct: false, resultFormat: 'object'};
        }
        
        let selectedColumns = [];
        for (let i = 0; i < document.designData.selnodes.length; ++i) {
            selectedColumns.push({
                path: document.designData.selnodes[i].__path__,
                label: document.designData.selnodes[i].__columnLabel,
                function: document.designData.selnodes[i].__selectedFunction,
                sortPosition: document.designData.selnodes[i].__sortPosition,
                sortDescending: document.designData.selnodes[i].__sortDescending,
                customInput: document.designData.selnodes[i].__customColumnInput
            });
        }

        if (params.documentName) {
            params.documentName = params.documentName.replace(/ /g, '_');
        }
        
        return {
            interactive: params.interactive,
            distinct: params.distinct,
            authenticator: params.authenticator,
            documentName: params.documentName,
            group: params.group,
            resultFormat: params.resultFormat,
            validityCheckOnly: params.validityCheckOnly,
            parameters: params.parameters,
            document: {
                rootModel: document.designData.modelHierarchy.title,
                selectedColumns: selectedColumns,
                whereComparisons: document.designData.whereComparisons
            }
        };
    }

    isWhereValid() {
        return (document.designData.whereComparisons && document.designData.whereComparisons.length > 0);
    }

    
    isModalClick(e) {
        let retval = false;
        while (e) {
            if (e.id && (e.id === 'modalcontainer')) {
                retval = true;
                break;
            }
            
            e = e.parentNode;
        }
        
        return retval;
    }
    
    showWaitMessage(msg) {
        removeWaitMessage();
        ReactDOM.render(<div className="waitMessage"><img alt="waiting" src="/images/spinner.gif"/><span>{msg}</span></div>, getWaitMessage());
    }
    
}

export {BaseDesignComponent};

