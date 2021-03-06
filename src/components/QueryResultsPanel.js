/*
 * Copyright (c) 2019 simplenodeorm.org
 */

import React from 'react';
import "../app/App.css";
import {BaseDesignComponent} from './BaseDesignComponent';
import {ClipboardButton} from './ClipboardButton';
import {copyToClipboard} from './helpers';

class QueryResultsPanel extends BaseDesignComponent {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            queryResults: this.props.newQueryResults
        };

        this.onCopyToClipboard = this.onCopyToClipboard.bind(this);
    }
    
    componentWillReceiveProps(nextProps) {
        const {newQueryResults} = this.state;
        if (nextProps.newQueryResults !== newQueryResults) {
            this.setState({newQueryResults: nextProps.newQueryResults});
        }
    }

    render() {
        const {newQueryResults} = this.state;
        if (document.designData.queryResults) {
            this.state.newQueryResults = false;
            return <div className="tabChildContainer"><div className="formattedJson"><ClipboardButton onCopyToClipboard={this.onCopyToClipboard}/><pre>{this.formatJson()}</pre></div></div>;
        } else {
            return <div className="tabChildContainer"/>;
        }
    }
    
    formatJson() {
        return JSON.stringify(document.designData.queryResults, undefined, 3);
    }
    
    onCopyToClipboard() {
        copyToClipboard('formattedJson');
    }
}

    
export {QueryResultsPanel};