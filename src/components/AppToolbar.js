import React from 'react';
import Toolbar from './Toolbar';
import '../app/App.css';
import config from '../config/appconfig';
import {BaseDesignComponent} from './BaseDesignComponent';
import {clearDocumentDesignData} from './helpers';

class AppToolbar extends BaseDesignComponent {
    constructor(props) {
        super(props);
    }
    
    
    render() {
        const menu =  [
            {
                text: config.textmsg.filemenuname,
                items: [
                {
                    text: config.textmsg.newmenuname,
                    callback: this.newDocument
                },

                {
                    text: config.textmsg.setupmenuname,
                    callback: this.setup
                },
                {
                    text: config.textmsg.preferencesmenuname,
                    callback: this.preferences
                }
                ]
            }
        ];
        const orm = JSON.parse(localStorage.getItem('orm'));
        return <Toolbar menu={menu} brand={orm.name} logo="logo.png"></Toolbar>
    }

    newDocument() {
        clearDocumentDesignData();
    }

    preferences() {
        alert("under construction");
    }

    setup() {
        alert("under construction");
    }
}

export {AppToolbar};
