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
}

export {BaseDesignComponent};

