/*
 * Copyright (c) 2019 simplenodeorm.org
 */

import React from 'react';
import "../app/App.css";

let loop = (data, ch) => {
    let l = data.split(ch);
    for (let i = 0; i < l.length; ++i) {
        if (i < l.length - 1) {
            l[i] += ch;
        }
    }
    return l.map((txt) => {
        if (txt.includes('join')) {
            let pos = txt.indexOf(' join ');
            let pos2 = txt.indexOf(' on ');
            return <div className="noWrap"><span className="join">{txt.substring(0, pos+6)}</span><span className="table">{txt.substring(pos+6, pos2)}</span><span className="sqlText2">{txt.substring(pos2)}</span></div>;
        } else {
            return <div className="sqlText">{txt}</div>;
        }
       });};

class SqlFormatter extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let selectPos = this.props.sql.indexOf('select ');
        let fromPos = this.props.sql.indexOf(' from ');
        let wherePos = this.props.sql.indexOf(' where ');
        let groupByPos = this.props.sql.indexOf(' group by ');
        let orderByPos = this.props.sql.indexOf(' order by ');
        let t0Pos = this.props.sql.indexOf(' t0 ', fromPos);
        if (orderByPos < 0) {
            orderByPos = this.props.sql.length+1;
        }
        
        let joins;
        if (this.props.sql.substring(t0Pos + 4, wherePos).includes(' join ')) {
            joins = this.props.sql.substring(t0Pos + 4, wherePos);
        }
        
        return <div className="formattedSql">
                <div className="keyWord">select</div>
                <div>{loop(this.props.sql.substring(selectPos + 7, fromPos), ',')}</div>
                <div><span className="keyWord">from&nbsp;</span><span className="table">{this.props.sql.substring(fromPos + 6, t0Pos + 4)}</span></div>
                { joins && <div>{loop(joins, ')')}</div> }
                <div className="keyWord">where</div>
                { (groupByPos > 0) && <div className="sqlText">{this.props.sql.substring(wherePos + 7, groupByPos)}</div> }
                { (groupByPos < 0) && <div className="sqlText">{this.props.sql.substring(wherePos + 7, orderByPos)}</div> }
                { (groupByPos > 0) &&  <div className="keyWord">group by</div> }
                { (groupByPos > 0) && <div>{loop(this.props.sql.substring(groupByPos + 10, orderByPos), ',')}</div>}
                { (orderByPos < this.props.sql.length) && <div className="keyWord">order by</div> }
                { (orderByPos < this.props.sql.length) && <div className="sqlText">{this.props.sql.substring(orderByPos + 10)}</div>}
            </div>
    }
}

export {SqlFormatter};