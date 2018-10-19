import React from 'react';
import "../app/App.css";
import config from '../config/appconfig.json';


class OpenParenthesis extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }
    
    render() {
        return <select onChange={this.onChange}><option></option><option>(</option><option>((</option><option>(((</option></select>;
    }
    
    onChange(e) {
        document.designData.whereComparisons[this.props.index].openParen = e.target[e.target.selectedIndex].text;
    }
    
}

export {OpenParenthesis};