import React from 'react';
import orms from '../config/orms.json';
import config from '../config/appconfig.json';
import base64 from 'base-64';
import axios from 'axios';
import { withRouter } from 'react-router';

import './LoginPage.css';

const loop = (data) => {
    return data.map((item) => {
        return <option value={item.name}>{item.name}</option>;
    });
};

const options = loop(orms);

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.logout();

        this.state = {
            username: '',
            password: '',
            orm: '',
            submitted: false,
            loading: false,
            error: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const {name, value} = e.target;

        if (name === "orm") {
            if (value) {
                for (let i = 0; i < orms.length; ++i) {
                    if (orms[i].name === e.target.value) {
                        this.setState({orm: orms[i]});
                        this.setState({username: orms[i].defaultUsername});
                        this.setState({password: orms[i].defaultPassword});
                        break;
                    }
                }
            } else {
                this.setState({orm: undefined});
                this.setState({username: ''});
                this.setState({password: ''});
            }
        } else {
            this.setState({[name]: value});
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({submitted: true, error: ''});
        const {username, password, orm} = this.state;

        // stop here if form is invalid
        if (!(username && password && orm)) {
            return;
        }

        this.setState({loading: true});
        this.login(username, password, orm);
    }

    render() {
        const {username, password, orm, submitted, loading, error} = this.state;

        return (
            <div>
                <h1>{config.logintitletext}</h1>
                <div className="errorMessage">{error}</div>
                <div className="login">
                    <h2>Design Login</h2>
                    <form name="form" onSubmit={this.handleSubmit}>
                        <div>
                            <label htmlFor="username">Username</label>
                            <input type="text" name="username" value={username} onChange={this.handleChange} />
                            {submitted && !username &&
                                <div className="errorMessage">*Username is required</div>
                            }
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" value={password} onChange={this.handleChange} /> 
                            {submitted && !password &&
                                <div className="errorMessage">*Password is required</div>
                            }
                        </div>
                        <div>
                            <label>Target ORM</label>
                            <select name="orm" onChange={this.handleChange}><option></option>{options}</select>

                            {submitted && !orm &&
                                <div className="errorMessage">*Target ORM is required</div>
                            }
                        </div>
                        <div>
                            {loading &&
                                <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                            }
                            <input type="submit" disabled={loading} value="Login"/>
                        </div>

                    </form>
                </div>
            </div>
        );
    }

    login(username, password, orm) {
        let curcomp = this;
        const authString = 'Basic ' + base64.encode(username + ':' + password);
        var config = {
            headers: {'Authorization': authString, 'Cache-Control': 'no-cache'}
        };

        localStorage.removeItem('user')
        localStorage.removeItem('orm')
        const instance = axios.create({baseURL: orm.url});
        instance.get('/design/login', config)
                .then((response) => {
                    if ((response.status === 200) && (response.data === 'success')) {
                        localStorage.setItem('user', username)
                        localStorage.setItem('orm', orm.name)
                        curcomp.props.history.push('/');
                    } else {
                        curcomp.setState({error: response.statusText, loading: false, submitted: false});
                    }
                })
                .catch((err) => {
                    curcomp.setState({error: err.toString(), loading: false, submitted: false});
                });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('user');
        localStorage.removeItem('orm');
    }
}

export default withRouter(LoginPage);