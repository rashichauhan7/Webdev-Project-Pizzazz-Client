import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';
import config from '../config.json';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import '../css/Login.css'
import UserService from'../services/UserService';

class App extends Component {

     constructor(props) {
        super(props);
        this.state = { isAuthenticated: false, user: null, token: '' , username : '' , password : '' , loginUser : ''};
        this.userService = UserService.instance;
    }

    logout = () => {
        this.setState({isAuthenticated: false, token: '', user: null})
    };

    onFailure = (error) => {
        alert(error);
    };

    loginUser = () => {

            this.state.loginUser = {
                username : this.state.username,
                password : this.state.password
            }

        console.log(this.state.loginUser);
        this.userService.findUserByUsernameAndPassword(this.state.loginUser)
            .then((loginUser)=>{(window.location.replace(`/profile`))})

    };

    formChanged = (event) => {
        console.log(event.target.value);
        console.log(this.state.username);
        this.setState({
                username: event.target.value
            })
    };

    formChanged2 = (event) => {
        console.log(event.target.value);
        console.log(this.state.password);
        this.setState({
                password: event.target.value
            })
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
                    {/*<FacebookLogin
                        appId={config.FACEBOOK_APP_ID}
                        autoLoad={false}
                        fields="name,email,picture"
                        callback={this.facebookResponse}
                        cssClass="my-facebook-button-class"
                        icon="fa fa-facebook"/>

                    <GoogleLogin
                        clientId={config.GOOGLE_CLIENT_ID}
                        onSuccess={this.googleResponse}
                        onFailure={this.onFailure}>
                        <span>
                            <i className="fa fa-google"/>
                        </span>
                        <span> Login with Google</span>
                    </GoogleLogin>*/}

                    <a className="btn btn-social-icon btn-google">
                        <span className="fa fa-google"></span>
                    </a>
                    <a className="btn btn-social-icon btn-facebook">
                        <span className="fa fa-facebook"></span>
                    </a>
                </div>
            );
        return (


            <div className="popup_inner">

            <button onClick={this.props.close} className="btn btn-danger float-right"><i className="fa fa-close"/> </button>
                <form className="text-center border border-light p-5">
                    <h1>Sign In</h1>
                    <input type="text" className="form-control mb-4 wbdv" placeholder="username" onChange={this.formChanged}/>
                        <input type="password" id="defaultLoginFormPassword" className="form-control mb-4"
                               placeholder="Password"  onChange={this.formChanged2}/>

                            <button className="btn btn-dark btn-block my-4" type="submit" onClick={this.loginUser}>Continue</button>

                    <p>Not a member?
                        <a href="">Register</a>
                    </p>

                    <p>or sign in with:</p>
                    <div className="App">
                        {content}
                    </div>

                </form>

            </div>
        );
    }
}

export default App;