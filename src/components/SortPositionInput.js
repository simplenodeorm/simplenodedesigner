/*
 * Copyright (c) 2019 simplenodeorm.org
 */

import React from 'react';
import "../app/App.css";
import config from '../config/appconfig.json';
import {NumericInput} from './NumericInput';

class SortPositionInput extends React.Component {
    constructor(props) {
        super(props);
        this.onBlur = this.onBlur.bind(this);
        if (document.designData.currentDocument
            && document.designData.currentDocument.selectedColumns
            && document.designData.currentDocument.selectedColumns[this.props.index].sortPosition
            && !document.designData.selnodes[this.props.index].__sortPosition) {
            document.designData.selnodes[this.props.index].__sortPosition = document.designData.currentDocument.document.selectedColumns[this.props.index].sortPosition;
        }
    }
    
    render() {
        return <span className="fieldLabel">{config.textmsg.sortposlabel}
            <NumericInput maxLength='2' onBlur={this.onBlur} defaultValue={document.designData.selnodes[this.props.index].__sortPosition}/>
            </span>;
    }

    onBlur(e) {
        document.designData.selnodes[this.props.index].__sortPosition = e.target.value;
        if (document.designData.currentDocument.document
            && document.designData.currentDocument.document.selectedColumns) {
            document.designData.currentDocument.document.selectedColumns[this.props.index].sortPosition = e.target.value;
        }
    }
}

export {SortPositionInput};