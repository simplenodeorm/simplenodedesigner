import React from 'react';
import "../app/App.css";
import config from '../config/appconfig.json';

class MoveButton extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }
    
    render() {
        switch(this.props.type) {
            case 'up':
                return <button className="moveButton" onClick={this.onClick} ><img src='/images/uparrow.png' /></button>;              
            case 'down':
                return <button className="moveButton" onClick={this.onClick}><img src='/images/downarrow.png' /></button>;               
            
        }
    }
    
    onClick(e) {
        switch(this.props.type) {
            case 'up':
                this.props.onMove(this.props.index, -1);
                break;
            case 'down':
                this.props.onMove(this.props.index, 1);
                break;
        }
    }
}

export {MoveButton};