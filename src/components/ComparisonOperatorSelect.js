import React from 'react';
import "../app/App.css";

const copSelections = ['=', '<', '<=', '>', '>=', '<>', 'is null', 'is not null', 'in', 'like'];
class ComparisonOperatorSelect extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }
    
    render() {
        const curindx = this.props.index;
        const loop = (data) => {
            return data.map((p, i) => {
                if (p === document.designData.whereComparisons[curindx].comparisonOperator) {
                    return <option selected>{p}</option>;
                } else {
                    return <option>{p}</option>;
                }
            })
        };

        return <select onChange={this.onChange}>{loop(copSelections)}</select>;
    }
    
    onChange(e) {
        document.designData.whereComparisons[this.props.index].comparisonOperator = e.target[e.target.selectedIndex].text;
    }
    
}

export {ComparisonOperatorSelect};