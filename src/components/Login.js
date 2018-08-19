import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';
import config from '../config.json';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import '../css/Login.css'
import UserService from'../services/UserService';
import $ from 'jquery';

class App extends Component {

     constructor(props) {
        super(props);
        this.state = { newUser:'', isAuthenticated: false, user: null, token: '' , username : '' , password : '' , loginUser : ''};
        this.userService = UserService.instance;

    }

    saveUser=()=> {
        this.state.newUser = {
            username : this.state.username,
            password : this.state.password,
            firstName: this.state.firstname,
            lastName: this.state.lastname,
            email: this.state.email,
            role: (this.state.role).toString()
        }

        console.log(this.state.newUser);
        this.userService.createUser(this.state.newUser)
            .then((loginUser)=>{alert('Saved Changes')})
    };

    componentDidMount()
    {
        $('.topBanner').css('pointer-events','none');
         $('.logincomponent').css('pointer-events','auto');
    }

    componentWillUnmount()
    {
        $('.topBanner').css('pointer-events','auto');
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
            .then((loginUser)=>{
                if(loginUser.id === 0)
                {
                    alert('Invalid Credentials')
                }
                else {
                    $('.login').css('visibility', 'hidden');
                    $('.register').css('visibility', 'hidden');
                    $('.loggedIn').css('visibility', 'visible');
                    $('.logout').css('visibility', 'visible');
                    this.props.close();
                    window.location.reload();
                }
            })

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
        this.state.loginUser = {
            username : response.email,
            password : response.id,
        }
        this.userService.findUserByUsernameAndPassword(this.state.loginUser)
            .then((user) => {
                if(user.username != undefined)
                {
                    $('.login').css('visibility', 'hidden');
                    $('.register').css('visibility', 'hidden');
                    $('.loggedIn').css('visibility', 'visible');
                    $('.logout').css('visibility', 'visible');
                    this.props.close();
                    window.location.reload();
                }
                else {
                    this.state.newUser = {
                        username: response.email,
                        password: response.id,
                        firstName: response.name.split(' ')[0],
                        lastName: response.name.split(' ')[1],
                        email: response.email,
                        role: ''
                    }
                    console.log(this.state.newUser);
                    this.userService.createUser(this.state.newUser)
                        .then((loginUser)=>{
                            $('.login').css('visibility', 'hidden');
                            $('.register').css('visibility', 'hidden');
                            $('.loggedIn').css('visibility', 'visible');
                            $('.logout').css('visibility', 'visible');
                            this.props.close();
                            window.location.reload();
                        })
                }


            });

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
                        icon="fa fa-facebook"/>

                    <GoogleLogin
                        clientId={config.GOOGLE_CLIENT_ID}
                        onSuccess={this.googleResponse}
                        onFailure={this.onFailure}>
                        <span>
                            <i className="fa fa-google"/>
                        </span>
                        <span> Login with Google</span>
                    </GoogleLogin>
                </div>
            );
        return (


            <div className="popup_inner logincomponent">

            <button onClick={this.props.close} className="close btn btn-danger float-right closeBtn"><i className="fa fa-close"/> </button>
                <form className="text-center border border-light p-5">
                    <h1>Sign In</h1>
                    <input type="text" className="form-control mb-4 wbdv" placeholder="username" onChange={this.formChanged}/>
                        <input type="password" id="defaultLoginFormPassword" className="form-control mb-4"
                               placeholder="Password"  onChange={this.formChanged2}/>
                            <button className="btn btn-dark btn-block my-4" type="button" onClick={this.loginUser}>Continue</button>

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