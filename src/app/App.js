import React from 'react';
import { BrowserRouter as Router, Route,  } from 'react-router-dom';
import { PrivateRoute } from '../auth/PrivateRoute';
import { HomePage } from '../components/HomePage';
import LoginPage from '../auth/LoginPage';
import uuid from 'uuid';
import './App.css';

const millisPerDay = 1000 * 60 * 60 * 24;

class App extends React.Component  {
    constructor(props) {
        super(props);
    }
    
    onUnload(event) { 
    }

    componentDidMount() {
        let lastLogin = localStorage.getItem('lastLogin');
        if (!lastLogin || ((new Date().getMilliseconds() - Number(lastLogin)) > millisPerDay)) {
            localStorage.removeItem('auth');
            localStorage.removeItem('my-session', uuid());
            localStorage.removeItem('lastLogin', uuid());
        }
       window.addEventListener("beforeunload", this.onUnload)
    }

    componentWillUnmount() {
        window.removeEventListener("beforeunload", this.onUnload)
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
}



export { App };
