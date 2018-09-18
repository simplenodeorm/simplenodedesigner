//import React from 'react';
import './App.css';
//import SplitPane from 'react-split-pane';
//import DocumentTree from './DocumentTree';
//import DesignTabs from './DesignTabs';
//import AppToolbar from './AppToolbar';


import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { PrivateRoute } from '../auth/PrivateRoute';
import { HomePage } from './HomePage';
import { LoginPage } from '../auth/LoginPage';

function App() {
    return <div className="jumbotron">
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
        </div>;

}



export default App;
