import React from 'react';
import config from '../config/appconfig.json';
import base64 from 'base-64';
import axios from 'axios';
import uuid from 'uuid';
import {BaseDesignComponent} from '../components/BaseDesignComponent';
import {removeWaitMessage,getServerContext} from '../components/helpers';
import { withRouter } from 'react-router';
import '../app/App.css';

class LoginPage extends BaseDesignComponent {
    constructor(props) {
        super(props);
    
        this.state = {
            username: '',
            password: '',
            submitted: false,
            loading: false,
            error: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
   }

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({submitted: true, error: ''});
        const {username, password} = this.state;

        // stop here if form is invalid
        if (!(username && password)) {
            return;
        }

        this.setState({loading: true});
        this.login(username, password, config);
    }

    render() {
        const {username, password, submitted, loading, error} = this.state;

        if (error) {
            removeWaitMessage();
            localStorage.removeItem('auth');
            localStorage.removeItem('my-session');
        }

        return (
            <div>
                <h1 className="loginTitle">{config.textmsg.logintitletext}</h1>
                <div className="errorDisplay">{error}</div>
                <div className="login">
                    <h3>{config.textmsg.designlogin}</h3>
                    <form name="form" onSubmit={this.handleSubmit}>
                        <div style={{paddingTop: "15px"}}>
                            <label htmlFor="username">{config.textmsg.username}</label>
                            <input type="text" name="username"
                                   ref={(input) => {
                                       this.username = input;
                                   }}
                                   defaultValue={username} onChange={this.handleChange}/>
                            {submitted && !username &&
                            <div className="errorDisplay">*{config.textmsg.usernamerequired}</div>
                            }
                        </div>
                        <div>
                            <label htmlFor="password">{config.textmsg.password}</label>
                            <input type="password" name="password" defaultValue={password}
                                   onChange={this.handleChange}/>
                            {submitted && !password &&
                            <div className="errorDisplay">*{config.textmsg.passwordrequired}</div>
                            }
                        </div>
                        <div>
                            <input type="submit" disabled={loading} value="Login"/>
                        </div>

                    </form>
                </div>
            </div>
        );
    }

    login(username, password, cfg) {
        this.showWaitMessage(cfg.textmsg.authenticating);
        let curcomp = this;
        const authString = 'Basic ' + base64.encode(username + ':' + password);
        const mySession = uuid();
        const httpcfg = {
            headers: {'Authorization': authString, 'Cache-Control': 'no-cache', 'my-session': mySession}
        };

        localStorage.removeItem('auth');
        localStorage.removeItem('my-session');
        localStorage.removeItem('lastLogin');

        axios.get(getServerContext() + '/api/query/login', httpcfg)
                .then((response) => {
                    if (response.status === 200) {
                        localStorage.setItem('auth', authString);
                        localStorage.setItem('lastLogin', new Date().getMilliseconds());
                        localStorage.setItem('my-session', mySession);
                        curcomp.props.history.push('/');
                        removeWaitMessage();
                    } else  {
                        curcomp.setState({error: config.textmsg.invalidlogin, loading: false, submitted: false});
                    }
                })
                .catch((err) => {
                    curcomp.setState({error: config.textmsg.invalidlogin, loading: false, submitted: false});
                });
    }

    logout() {
        localStorage.removeItem('auth');
        localStorage.removeItem('my-session')
    }
}

export default withRouter(LoginPage);