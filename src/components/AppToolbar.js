/*
 * Copyright (c) 2019 simplenodeorm.org
 */

import React from 'react';
import Toolbar from './Toolbar';
import '../app/App.css';
import config from '../config/appconfig';
import {BaseDesignComponent} from './BaseDesignComponent';

class AppToolbar extends BaseDesignComponent {
    constructor(props) {
        super(props);
        this.newDocument = this.newDocument.bind(this);
    }
    
    
    render() {
        const menu =  [
            {
                text: config.textmsg.filemenuname,
                items: [
                {
                    text: config.textmsg.newmenuname,
                    callback: this.newDocument
                }
                ]
            }
        ];
        return <Toolbar menu={menu} logo="logo.png"/>
    }

    newDocument() {
        this.props.setCurrentDocument();
    }
}

export {AppToolbar};
