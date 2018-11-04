import React from 'react';
import "../app/App.css";

class AddFilterColumn extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }
    
    render() {
        const loadPaths  = (data) => {
            return data.map((node) => {
                return <option>{node.__path__}</option>;
               });};

        return <div className="addFilterColumn">Add filter column:<br /><button className="moveButton" onClick={this.props.addColumn}><img alt='add filter column' src='/images/add.png'/></button><select onChange={this.onChange}>{loadPaths(document.designData.selnodes)}</select></div>;
    }
    
    onChange(e) {
        this.props.onColumnChange(e.target);
    }
}

export {AddFilterColumn}; 

