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
        const orm = JSON.parse(localStorage.getItem('orm'));
        return <Toolbar menu={menu} brand={orm.name} logo="logo.png"/>
    }

    newDocument() {
        this.props.setCurrentDocument();
    }
}

export {AppToolbar};
