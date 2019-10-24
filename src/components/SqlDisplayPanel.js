/*
 * Copyright (c) 2019 simplenodeorm.org
 */

import React from 'react';
import "../app/App.css";
import axios from 'axios';
import {BaseDesignComponent} from './BaseDesignComponent';
import {SqlFormatter} from './SqlFormatter';
import {ClipboardButton} from './ClipboardButton';
import {removeWaitMessage,copyToClipboard,getServerContext,getRequestHeaders} from './helpers';

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
        const httpcfg = {
            headers: getRequestHeaders()
        };

        axios.post(getServerContext() + '/api/query/generatesql', this.getQueryDocument(), httpcfg)
            .then((response) => {
                if (response.status === 200) {
                    curcomp.setState({sql: response.data});
                } else {
                    curcomp.props.setStatus(response.statusText, true);
                }
                removeWaitMessage();
            })
            .catch((err) => {
                curcomp.props.setStatus('' + err, true);
                removeWaitMessage();
            });     
    }
    
    onCopyToClipboard() {
        copyToClipboard('formattedSql');
    }
}

    
export {SqlDisplayPanel};