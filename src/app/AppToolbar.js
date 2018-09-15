import React from 'react';
import Toolbar from 'react-minimalist-toolbar';
import './App.css';

const menu = [
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
        
    ];

function AppToolbar() {
    return <Toolbar menu={menu} logo="logo.png"></Toolbar>;
}

function preferences() {
    
}

function setup() {
    
}

export default AppToolbar;
