import React from 'react';
import "../app/App.css";
import config from '../config/appconfig.json';
import Spinner from './Spinner';
import {AddFilterColumn} from './AddFilterColumn';

class FilterPanel extends React.Component {
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
            return <AddFilterColumn addColumn={this.addColumn}/>;
        }
    }
    
    addColumn(path) {
        
    }
}

export {FilterPanel};