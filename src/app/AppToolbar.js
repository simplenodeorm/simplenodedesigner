import React from 'react';
import Toolbar from 'react-minimalist-toolbar';
import './App.css';
import databases from '../config/databases.json';

var database;

var menu = [
        {
            text: "File",
            items: [
            {
                text: "Setup",
                callback: setup
            },
            {
                text: "Preferences",
                callback: preferences
            }
            ]
        },
        {
            text: "Target Database:",
            items: loadTargetDatabases()
        },
        
    ];

function AppToolbar() {
    return <Toolbar menu={menu} logo="logo.png"></Toolbar>;
}

function preferences() {
    
}

function setup() {
}

function selectDatabase(e) {
    e.target.parentElement.parentElement.firstChild.text = "Target Database: " + e.target.text;
    setCurrentDatabase(e.target.text);
}

function loadTargetDatabases() {
    let retval = new Array();
    for (let i = 0; i < databases.length; ++i) {
        retval.push({ text: databases[i].name, callback: selectDatabase});
    }
    return retval;
}


function setCurrentDatabase(nm) {
    for (let i = 0; i < databases.length; ++i) {
        if (nm === databases[i].name) {
            database = databases[i];
            break;
        }
    }
}

function getCurrentDatabase() {
    return database;
}

export default AppToolbar;
