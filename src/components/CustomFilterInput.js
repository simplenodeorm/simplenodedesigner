/*
 * Copyright (c) 2019 simplenodeorm.org
 */

import React from 'react';
import "../app/App.css";

class CustomFilterInput extends React.Component {
    constructor(props) {
        super(props);
        this.onBlur = this.onBlur.bind(this);
    }
    
    render() {
        return <input className="customFilterInput" 
                type='text' 
                onBlur={this.onBlur} 
                defaultValue={document.designData.whereComparisons[this.props.index].customFilterInput}/>;
    }
    
    onBlur(e) {
        document.designData.whereComparisons[this.props.index].customFilterInput = e.target.value;
    }
}

export {CustomFilterInput};