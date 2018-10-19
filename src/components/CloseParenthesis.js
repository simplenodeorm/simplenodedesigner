import React from 'react';
import "../app/App.css";
import config from '../config/appconfig.json';

const parenSelections = ['', ')', '))', ')))', '))))'];
class CloseParenthesis extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }
    
    render() {
        const loop = (data) => {
            return data.map((p, i) => {
                if (p === document.designData.whereComparisons[this.props.index].openParen) {
                    return <option value={p} selected>{p}</option>;
                } else {
                    return <option value={p}>{p}</option>;
                }
            });
        };

        return <select onChange={this.onChange}>{loop(parenSelections)}</select>;
    }
    
    onChange(e) {
        document.designData.whereComparisons[this.props.index].closeParen = e.target[e.target.selectedIndex].text;
    }
    
}

export {CloseParenthesis};