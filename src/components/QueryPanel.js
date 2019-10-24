/*
 * Copyright (c) 2019 simplenodeorm.org
 */

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
        this.state.newQueryResults = false;
        return <div className="tabSplitPaneContainer">
             <SplitPane 
                 split="horizontal" 
                 minSize={20} 
                 defaultSize={250}>
                 <SqlDisplayPanel setStatus={this.props.setStatus}/>
                 <QueryResultsPanel setStatus={this.props.setStatus}/>
             </SplitPane>
         </div>;
    }
}

    
export {QueryPanel};