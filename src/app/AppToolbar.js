import React from 'react';
import Toolbar from 'react-minimalist-toolbar';
import './App.css';

const menu = [
        {
            text: "document",
            items: [
            {
                text: "New Document",
                callback: newDocument
            },
            {
                text: "Open",
                callback: openDocument
            }
            ]
        },
        {
            text: "edit",
            items: [
            {
                text: "Undo",
                callback: undo
            },
            {
                text: "Redo",
                callback: redo
            }
            ]
        },
    ];

function AppToolbar() {
    return <Toolbar menu={menu}></Toolbar>;
}

function newDocument() {
    
}

function openDocument() {
    
}


function undo() {
    
}


function redo() {
    
}
export default AppToolbar;
