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
                return <option>{node.path}</option>;
               });};

        return <div className="addFilterColumn"><button className="moveButton" onClick={this.props.addColumn()}><img src='/images/add.png'/></button><select>{loadPaths(document.designData.selnodes)}</select></div>;
    }
}

export {AddFilterColumn}; 

