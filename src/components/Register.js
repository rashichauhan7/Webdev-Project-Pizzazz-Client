import React from 'react';
import {Link} from 'react-router-dom';

export default class Register extends React.Component{
    render(){
        return(
            <div className="container-fluid">
                <h1>Register</h1>
                <div>
                    <label htmlFor="username">
                        Username
                    </label>
                    <input type="text"
                           className="form-control wbdv"
                           placeholder="username"
                           id="username"/>
                </div>

                <div>
                    <label htmlFor="password">
                        Password
                    </label>
                    <input type="password"
                           className="form-control wbdv"
                           placeholder="password"
                           id="password"/>
                </div>

                <div>
                    <label htmlFor="password2">
                        Verify Password
                    </label>
                    <input type="password"
                           className="form-control wbdv"
                           placeholder="verify password"
                           id="password2"/>
                </div>
                <br/>
                <div className="btn btn-success input">
                    Register
                </div>
            </div>
        )
    }
}