import React from 'react';
import SplitPane from 'react-split-pane';
import "../app/App.css";
import config from '../config/appconfig.json';
import Spinner from './Spinner';
import {BaseDesignComponent} from './BaseDesignComponent';

class QueryPanel extends BaseDesignComponent {
    constructor(props) {
        super(props);
        this.state = {
            error: ''
        };
        
    }

    render() {
        const {error} = this.state;
        if (error) {
            return <div className="errorMessage">{error}</div>;
        } else {
            return <SplitPane 
                split="horizontal" 
                minSize={20} 
                defaultSize={250}>
                <div>Upper</div>
                <div>Lower</div>
            </SplitPane>
        }
    }
}

    
export {QueryPanel};