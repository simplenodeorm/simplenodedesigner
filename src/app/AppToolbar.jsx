import React from 'react';
import Toolbar from '../components/Toolbar';
import './App.css';

const menu =  [
    {
        text: "File",
        items: [
        {
            text: "Add Document",
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
    const orm = localStorage.getItem('orm');
    return (<Toolbar menu={menu} brand={orm} logo="logo.png"></Toolbar>);
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
