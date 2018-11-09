import React from 'react';
import "../app/App.css";
import axios from 'axios';
import {BaseDesignComponent} from './BaseDesignComponent';
import {SqlFormatter} from './SqlFormatter';
import {ClipboardButton} from './ClipboardButton';

class SqlDisplayPanel extends BaseDesignComponent {
    constructor(props) {
        super(props);
        this.state = {
            sql: ''
        };
        
        this.onCopyToClipboard = this.onCopyToClipboard.bind(this);
    }

    render() {
        const {sql} = this.state;
        if (!sql) {
            this.generateSql();
        }
        
        return <div className="tabChildContainer"><ClipboardButton onCopyToClipboard={this.onCopyToClipboard}/><SqlFormatter sql={sql}/></div>;
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
                    curcomp.props.setStatus(response.statusText, true);
                }
                curcomp.clearWaitMessage();
            })
            .catch((err) => {
                curcomp.props.setStatus('' + err, true);
                curcomp.clearWaitMessage();
            });     
    }
    
    onCopyToClipboard() {
        const {sql} = this.state;
        navigator.clipboard.writeText(sql);
    }
}

    
export {SqlDisplayPanel};