import React from 'react';
import "../app/App.css";
import config from '../config/appconfig.json';

class AddFilterColumn extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const loadPaths  = (data) => {
            return data.map((node) => {
                return <option>{node.__path__}</option>;
               });};

        return <div className="addFilterColumn">Add filter column:<br /><button className="moveButton" onClick={this.props.addColumn}><img alt='add filter column' src='/images/add.png'/></button><select onChange={this.props.onColumnChange}>{loadPaths(document.designData.selnodes)}</select></div>;
    }
}

export {AddFilterColumn}; 

