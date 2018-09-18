import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { PrivateRoute } from '../auth/PrivateRoute';
import { HomePage } from './HomePage';
import { LoginPage } from '../auth/LoginPage';
import './App.css';

class App extends React.Component  {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (<div className="jumbotron">
            <div className="container">
                <div className="col-sm-8 col-sm-offset-2">
                    <Router>
                        <div>
                            <PrivateRoute exact path="/" component={HomePage} />
                            <Route path="/login" component={LoginPage} />
                        </div>
                    </Router>
                </div>
            </div>
        </div>);
    }
}



export { App };
