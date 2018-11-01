import React from 'react';
import SplitPane from 'react-split-pane';
import "../app/App.css";
import config from '../config/appconfig.json';
import Spinner from './Spinner';
import axios from 'axios';
import {BaseDesignComponent} from './BaseDesignComponent';

class QueryResultsPanel extends BaseDesignComponent {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            queryResults: this.props.newQueryResults
        };
        
    }
    
    componentWillReceiveProps(nextProps) {
        const {model, newQueryResults} = this.state;
        if (nextProps.newQueryResults !== newQueryResults) {
            this.setState({newQueryResults: nextProps.newQueryResults});
        }
    }

    render() {
        const {error, newQueryResults} = this.state;
        if (error) {
            return <div className="tabChildContainer"><div className="errorMessage">{error}</div></div>;
        } else if (document.designData.queryResults) {
            this.state.newQueryResults = false;
            return <div className="tabChildContainer"><div className="formattedJson"><pre>{this.formatJson()}</pre></div></div>;
        } else {
            return <div className="tabChildContainer"></div>;
        }
    }
    
    formatJson() {
        return JSON.stringify(document.designData.queryResults, undefined, 3);
    }
}

    
export {QueryResultsPanel};