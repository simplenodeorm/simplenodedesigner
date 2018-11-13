import React from 'react';
import "../app/App.css";
import config from '../config/appconfig.json';

class CustomColumnInput extends React.Component {
    constructor(props) {
        super(props);
        this.onBlur = this.onBlur.bind(this);
    }
    
    render() {
        return <span className="fieldLabel">{config.textmsg.customcolinputlabel}
            <input className="customColumnInput" 
                type="text" 
                onBlur={this.onBlur} 
                defaultValue={document.designData.selnodes[this.props.index].__customColumnInput}/>
            </span>;
    }
    
    onBlur(e) {
        document.designData.selnodes[this.props.index].__customColumnInput = e.target.value;
    }
}

export {CustomColumnInput};