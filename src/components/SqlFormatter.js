import React from 'react';
import "../app/App.css";
import config from '../config/appconfig.json';

class SqlFormatter extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let selectPos = this.props.sql.indexOf('select ');
        let wherePos = this.props.sql.indexOf(' where ');
        let groupByPos = this.props.sql.indexOf(' group by ');
        let orderByPos = this.props.sql.indexOf(' order by ');
        
        if (orderByPos < 0) {
            orderByPos = this.props.sql.length+1;
        }
        return <div className="formattedSql">
                <div className="keyWord">select</div>
                <div className="sqlText">{this.props.sql.substring(selectPos + 7, wherePos)}</div>
                <div className="keyWord">where</div>
                <div className="sqlText">{this.props.sql.substring(wherePos + 7, orderByPos)}</div>
                { (groupByPos > 0) &&  <div className="keyWord">group by</div> }
                { (groupByPos > 0) && <div className="sqlText">{this.props.sql.substring(orderByPos)}</div>}
                <div className="keyWord">order by</div>
                <div className="sqlText">{this.props.sql.substring(orderByPos + 10)}</div>
            </div>;
    }
}

export {SqlFormatter};