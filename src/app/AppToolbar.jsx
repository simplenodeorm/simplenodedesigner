import React from 'react';
import  Toolbar from 'react-minimalist-toolbar';
import './App.css';


class AppToolbar extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() { 
        return (<Toolbar menu={this.loadMenu} logo="logo.png"></Toolbar>);
    }

    loadMenu() {
        return [
            {
                text: "File",
                items: [
                {
                    text: "addDocument",
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
        
    }
    addDocument() {
    
    }

    preferences() {
    }

    setup() {
    }
}


export { AppToolbar };
