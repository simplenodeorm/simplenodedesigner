import React from 'react';
import SplitPane from 'react-split-pane';
import "../app/App.css";
import {BaseDesignComponent} from './BaseDesignComponent';
import {SqlDisplayPanel} from './SqlDisplayPanel';
import {QueryResultsPanel} from './QueryResultsPanel';

class QueryPanel extends BaseDesignComponent {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            newQueryResults: false
        };
    }
    
    componentWillReceiveProps(nextProps) {
        const {newQueryResults} = this.state;
        if (nextProps.newQueryResults !== newQueryResults) {
            this.setState({newQueryResults: nextProps.newResults});
        }
    }

    render() {
        const {error, newQueryResults} = this.state;
        if (error) {
            return <div className="errorMessage">{error}</div>;
        } else {
            this.state.newQueryResults = false;
           return <div className="tabSplitPaneContainer">
                <SplitPane 
                    split="horizontal" 
                    minSize={20} 
                    defaultSize={250}>
                    <SqlDisplayPanel/>
                    <QueryResultsPanel/>
                </SplitPane>
            </div>;
        }
    }
}

    
export {QueryPanel};