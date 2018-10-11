import React from 'react';
import "../app/App.css";
import config from '../config/appconfig.json';

class SortPositionInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sortPosition: '',
            ascending: true
        };
    }
    
    render() {
        return <span className="fieldLabel">{config.textmsg.sortposlabel}<input type='text' maxlength='2' onChange={this.props.onSortPosChange}/></span>;
    }
}

export {SortPositionInput};