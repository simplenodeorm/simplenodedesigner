import React from 'react';
import "../app/App.css";
import config from '../config/appconfig.json';
import Spinner from './Spinner';

class FormatSelectionPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            error: '',
            slectedItems: ''
        };
    }

    render() {
        const {selectedItems, loading, error} = this.state;
        
        if (error) {
            return <div className="errorMessage">{error}</div>;
        } else if (loading) {
            return <div className="panelPrompt1"><Spinner/>&nbsp;&nbsp;Loading selected items...</div>;
        } else {
            return <div>Format selection panel</div>;
        } 
    }
    
}

export {FormatSelectionPanel};