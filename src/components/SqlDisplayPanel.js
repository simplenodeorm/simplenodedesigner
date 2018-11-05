import React from 'react';
import "../app/App.css";
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
            return <div className="tabChildContainer"><div className="errorMessage">{error}</div></div>;
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
                    curcomp.setState({sql: response.data});
                } else {
                    curcomp.setState({error: response.statusText});
                }
            })
            .catch((err) => {
                curcomp.setState({error: ('' + err)});
                curcomp.clearWaitMessage();
            });     
    }

}

    
export {SqlDisplayPanel};