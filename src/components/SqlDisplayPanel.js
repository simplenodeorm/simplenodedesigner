import React from 'react';
import SplitPane from 'react-split-pane';
import "../app/App.css";
import config from '../config/appconfig.json';
import Spinner from './Spinner';
import axios from 'axios';
import {BaseDesignComponent} from './BaseDesignComponent';
import {SqlFormatter} from './SqlFormatter';

class SqlDisplayPanel extends BaseDesignComponent {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            sql: ''
        };
    }

    render() {
        const {error, sql} = this.state;
        if (!sql) {
            this.generateSql();
        }
        
        if (error) {
            return <div className="errorMessage">{error}</div>;
        } else {
            return <div className="tabChildContainer"><SqlFormatter sql={sql}/></div>;
        }
    }

    generateSql() {
        const curcomp = this;
        const orm = JSON.parse(localStorage.getItem('orm'));
        const config = {
            headers: {'Authorization': orm.authString }
        };

        axios.post(orm.url + '/design/generatesql', this.getQueryDocument(), config)
            .then((response) => {
                if (response.status === 200) {
                    curcomp.setState({loading: false, sql: response.data});
                } else {
                    curcomp.setState({error: response.statusText, loading: false});
                }
            })
            .catch((err) => {
               curcomp.setState({error: ('' + err), loading: false});
            });     
    }

}

    
export {SqlDisplayPanel};