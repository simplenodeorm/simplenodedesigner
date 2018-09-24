import React from 'react';
import Toolbar from '../components/Toolbar';
import './App.css';
import config from '../config/appconfig';

const menu =  [
    {
        text: "File",
        items: [
        {
            text: config.textmsg.adddocument,
            callback: addDocument
        },
        {
            text: config.textmsg.setup,
            callback: setup
        },
        {
            text: config.textmsg.preferences,
            callback: preferences
        }
        ]
    }
];

function AppToolbar() {
    const orm = JSON.parse(localStorage.getItem('orm'));
    return (<Toolbar menu={menu} brand={orm.name} logo="logo.png"></Toolbar>);
}

function addDocument() {
}

function preferences() {
}

function setup() {
}


export default AppToolbar;
