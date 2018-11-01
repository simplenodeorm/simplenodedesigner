import React from 'react';
import SplitPane from 'react-split-pane';
import "../app/App.css";
import config from '../config/appconfig.json';
import Spinner from './Spinner';
import axios from 'axios';
import {BaseDesignComponent} from './BaseDesignComponent';
import {JsonFormatter} from './JsonFormatter';

class QueryResultsPanel extends BaseDesignComponent {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            newresults: false
        };
        
    }

    componentWillReceiveProps(nextProps) {
        const {model} = this.state;
        if (nextProps.queryResults !== this.props.queryResults) {
            this.props.queryResults = nextProps.queryResults;
            this.setState({newresults: true});
        }
    }

    render() {
        const {error} = this.state;
        if (error) {
            return <div className="errorMessage">{error}</div>;
        } else {
            this.state.newresults = false;
            return <div className="tabChildContainer"><JsonFormatter json={this.props.queryResults}/></div>;
        }
    }
}

    
export {QueryResultsPanel};