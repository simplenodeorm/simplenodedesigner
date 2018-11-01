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
            error: ''
        };
        
    }

    render() {
        const {error} = this.state;
        if (error) {
            return <div className="errorMessage">{error}</div>;
        } else {
            return <div className="tabChildContainer"><JsonFormatter json={this.props.queryResults}/></div>;
        }
    }

    generateSql() {
        const curcomp = this;
        const orm = JSON.parse(localStorage.getItem('orm'));
        const config = {
            headers: {'Authorization': orm.authString}
        };

        axios.get(orm.url + '/design/runquery', config)
            .then((response) => {
                if (response.status === 200) {
                    curcomp.setState({loading: false});
                } else {
                    curcomp.setState({error: response.statusText, loading: false});
                }
            })
            .catch((err) => {
               curcomp.setState({error: ('' + err), loading: false});
            });     
    }

}

    
export {QueryResultsPanel};