import React from 'react';
import "../app/App.css";

const logSelections = ['', 'and', 'or'];

class LogicalOperatorSelect extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }
    
    render() {
        const loop = (data) => {
            return data.map((p, i) => {
                if (p === document.designData.whereComparisons[this.props.index].logicalOperator) {
                    return <option selected>{p}</option>;
                } else {
                    return <option>{p}</option>;
                }
            });
        };

        if (this.props.index > 0) {
            return <select onChange={this.onChange}>{loop(logSelections)}</select>;
        } else {
            document.designData.whereComparisons[this.props.index].logicalOperator = '';
            return <select onChange={this.onChange} disabled><option></option></select>;
        }
    }
    
    onChange(e) {
        document.designData.whereComparisons[this.props.index].logicalOperator = e.target[e.target.selectedIndex].text;
    }
    
}

export {LogicalOperatorSelect};