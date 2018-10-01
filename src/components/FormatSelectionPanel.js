import React from 'react';
import "../app/App.css";
import config from '../config/appconfig.json';
import Spinner from './Spinner';
import {FormatSelectionLine} from './FormatSelectionLine';

class FormatSelectionPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: ''
        };
    }

    render() {
        const {selectedItems, loading, error} = this.state;
        
        if (error) {
            return <div className="errorMessage">{error}</div>;
        } else {
            return <div>Format selection panel</div>;
        } 
    }
    
}

export {FormatSelectionPanel};