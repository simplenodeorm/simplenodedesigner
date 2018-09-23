import React from 'react';
import Toolbar from '../components/Toolbar';
import './App.css';

const menu =  [
    {
        text: "File",
        items: [
        {
            text: "xxxxxxxxxxxxxxxxxx",
            callback: addDocument
        },
        {
            text: "Setup",
            callback: setup
        },
        {
            text: "Preferences",
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
