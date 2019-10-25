/*
 * Copyright (c) 2019 simplenodeorm.org
 */

import React from 'react';
import { BrowserRouter as Router, Route,  } from 'react-router-dom';
import { HomePage } from '../components/HomePage';
import {PrivateRoute} from '@simplenodeorm/simplenodeclientbase/lib/PrivateRoute';
import DesignerLogin from '../auth/DesignerLogin';
import './App.css';
import config from '../config/appconfig.json';

class App extends React.Component  {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (<div>
            <Router>
                <div>
                    <Route path="/login"  render={()=>{return <DesignerLogin logo={"/logo-small.png"} config={config}/>}}/>
                    <PrivateRoute exact config={config} path="/" component={HomePage} />
                </div>
            </Router>
        </div>);
    }
}



export { App };
