import React from 'react';
import Toolbar from './Toolbar';
import '../app/App.css';
import config from '../config/appconfig';

const menu =  [
    {
        text: config.textmsg.filemenuname,
        items: [
        {
            text: config.textmsg.newmenuname,
            callback: newDocument
        },

        {
            text: config.textmsg.setupmenuname,
            callback: setup
        },
        {
            text: config.textmsg.preferencesmenuname,
            callback: preferences
        }
        ]
    }
];

function AppToolbar() {
    const orm = JSON.parse(localStorage.getItem('orm'));
    return (<Toolbar menu={menu} brand={orm.name} logo="logo.png"></Toolbar>);
}

function newDocument() {
    document.designData.modelHierarchy = '';
    document.designData.selectedObjectKeys = '';
    document.designData.selnodes = '';
    document.designData.whereComparisons = '';
    document.designData.queryResult = '';
    document.designData.currentDocument = '';
}

function preferences() {
    alert("under construction");
}

function setup() {
    alert("under construction");
}


export default AppToolbar;
