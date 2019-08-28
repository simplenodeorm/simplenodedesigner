import React from 'react';
import { BrowserRouter as Router, Route,  } from 'react-router-dom';
import { PrivateRoute } from '../auth/PrivateRoute';
import { HomePage } from '../components/HomePage';
import LoginPage from '../auth/LoginPage';
import './App.css';
import config from '../config/appconfig.json';

class App extends React.Component  {
    constructor(props) {
        super(props);
        this.lastActivity = new Date().getTime();
        this.onActivity = this.onActivity.bind(this);
    }
    
    componentDidMount() {
        let loginTimeout = Number(config.logintimeoutminutes) * 60 * 1000;

        let lastLogin = localStorage.getItem(config.appname + '-lastLogin');
        if (!lastLogin || ((new Date().getTime() - Number(lastLogin)) > loginTimeout)) {
            localStorage.removeItem(config.appname + '-auth');
            localStorage.removeItem(config.appname + '-my-session');
            localStorage.removeItem(config.appname + '-lastLogin');
            this.setState({refresh: true});
        }
        window.addEventListener('keydown', this.onActivity);
    }

    componentWillUnmount() {
    }

    render() {
        return (<div>
            <Router>
                <div>
                    <Route path="/login" component={LoginPage} />
                    <PrivateRoute exact path="/" component={HomePage}/> 
                </div>
            </Router>
        </div>);
    }

    onActivity() {
        let tm = new Date().getTime();
        if ((tm - this.lastActivity) > 10000) {
            if (localStorage.getItem(config.appname + '-auth')) {
                localStorage.setItem(config.appname + '-lastLogin', tm);
                this.lastActivity = tm;
            }
        }
    }
}



export { App };
