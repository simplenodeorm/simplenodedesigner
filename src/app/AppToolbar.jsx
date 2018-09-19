import React from 'react';
import Toolbar from 'react-minimalist-toolbar';
import 'react-minimalist-toolbar/lib/index.css';
import './App.css';

const menu =  [
    {
        text: "File",
        items: [
        {
            text: "Add Document",
            callback: this.addDocument
        },
        {
            text: "Setup",
            callback: this.setup
        },
        {
            text: "Preferences",
            callback: this.preferences
        }
        ]
    }
];

function AppToolbar() {
    return (<Toolbar menu={menu} logo="logo.png"></Toolbar>);
}

function loadMenu() {
}

function addDocument() {
}

function preferences() {
}

function setup() {
}


export default AppToolbar;
