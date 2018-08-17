import React from 'react';
import {Link} from 'react-router-dom';
import '../css/Login.css'
export default class Register extends React.Component {
    constructor(props) {
        super(props);
    }
    render(){
        return(
            <div className="popup_inner">
            <div className="container-fluid">
                <button onClick={this.props.close} className="btn btn-danger float-right"><i className="fa fa-close"/> </button>

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
            </div>
        )
    }
}