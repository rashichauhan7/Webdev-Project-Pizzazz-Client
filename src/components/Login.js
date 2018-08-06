import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';
import config from '../config.json';
import '../../node_modules/font-awesome/css/font-awesome.min.css';

class App extends Component {

    constructor() {
        super();
        this.state = { isAuthenticated: false, user: null, token: ''};
    }

    logout = () => {
        this.setState({isAuthenticated: false, token: '', user: null})
    };

    onFailure = (error) => {
        alert(error);
    };


    facebookResponse = (response) => {
        const tokenBlob = new Blob([JSON.stringify({access_token: response.accessToken}, null, 2)], {type : 'application/json'});
        const options = {
            method: 'POST',
            body: tokenBlob,
            mode: 'cors',
            cache: 'default'
        };
        fetch('http://localhost:4000/api/v1/auth/facebook', options).then(r => {
            const token = r.headers.get('x-auth-token');
            r.json().then(user => {
                if (token) {
                    this.setState({isAuthenticated: true, user, token})
                }
            });
        })
    };

    googleResponse = (response) => {
        const tokenBlob = new Blob([JSON.stringify({access_token: response.accessToken}, null, 2)], {type : 'application/json'});
        const options = {
            method: 'POST',
            body: tokenBlob,
            mode: 'cors',
            cache: 'default'
        };
        fetch('http://localhost:4000/api/v1/auth/google', options).then(r => {
            const token = r.headers.get('x-auth-token');
            r.json().then(user => {
                if (token) {
                    this.setState({isAuthenticated: true, user, token})
                }
            });
        })
    };

    render() {
        let content = this.state.isAuthenticated ?
            (
                <div>
                    <p>Authenticated</p>
                    <div>
                        {this.state.user.email}
                    </div>
                    <div>
                        <button onClick={this.logout} className="button">
                            Log out
                        </button>
                    </div>
                </div>
            ) :
            (
                <div className="container-fluid">
                    <FacebookLogin
                        appId={config.FACEBOOK_APP_ID}
                        autoLoad={false}
                        fields="name,email,picture"
                        callback={this.facebookResponse}
                        cssClass="my-facebook-button-class"
                        icon="fa-facebook"/>
                    <br/>
                    <br/>
                    <GoogleLogin
                        clientId={config.GOOGLE_CLIENT_ID}
                        onSuccess={this.googleResponse}
                        onFailure={this.onFailure}
                    >
                        <span>
                            <i className="fa fa-google"/>
                        </span>
                    <span> Login with Google</span>
                    </GoogleLogin>
                </div>
            );
        return (
            <div>
                <div className="container-fluid">
                    <h1>Sign In</h1>

                    <div>
                        <label htmlFor="username">
                            Username
                        </label>
                        <input type="text"
                               className="form-control wbdv"
                               placeholder="alice"
                               id="username"/>
                    </div>

                    <div>
                        <label htmlFor="password">
                            Password
                        </label>
                        <input type="password"
                               className="form-control wbdv"
                               placeholder="1234qwerasdf"
                               id="password"/>
                    </div>
                    <br/>
                    <button className="btn btn-primary"
                            id="loginBtn">
                        Login
                    </button>
                </div>
                <br/>
                <div className="container-fluid"> or </div>
                <br/>
                <div className="App">
                    {content}
                </div>
            </div>
        );
    }
}

export default App;