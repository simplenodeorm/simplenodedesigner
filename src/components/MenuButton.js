import React from 'react';
import "../app/App.css";

class MenuButton extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            text: props.text
        };
    }
    
    render() {
        const {text} = this.state;
        return <div className="menuButton">
                <a href="#" onClick={this.props.onMenuClick}>
                    <svg viewBox="0 0 24 24">
                        <path focusable="false" color="blue" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
                        </svg>{this.props.text}
                    </a>
            </div>;
    }
    
    
}

export {MenuButton};


