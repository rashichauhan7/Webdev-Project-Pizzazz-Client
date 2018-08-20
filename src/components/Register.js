import React from'react';
import{Link}from'react-router-dom';
import UserService from"../services/UserService";
import '../css/Register.css'
import $ from "jquery";
export default class Register extends React.Component {

    constructor(props) {
        super(props);
        this.userService = UserService.instance;
        this.state = {
            currentUser: '',
            newUser:'',
            password :'',
            firstname:'',
            lastname:'',
            email:'',
            role:'',
            hiddenSuccess : true
        }; }


        setStateOfAll(){
        this.setState({
            password :'',
            firstname:'',
            lastname:'',
            email:'',
            role:'',
            hiddenSuccess : false
        })
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
        this.userService.findUserByUsername(this.state.newUser.username)
            .then(response => {
               if (response.length === 0){
                   this.userService.createUser(this.state.newUser)
                       .then((loginUser)=>{
                           {alert('Registration Successful')}
                           console.log(loginUser);
                           $('.login').css('visibility', 'hidden');
                           $('.register').css('visibility', 'hidden');
                           $('.loggedIn').css('visibility', 'visible');
                           $('.logout').css('visibility', 'visible');
                           this.props.close();
                           window.location.reload();
                       }).then(()=>{
                       this.setStateOfAll();
                   })
               }
               else {
                   alert('username already exists');
               }
            })
    };

    componentDidMount()
    {
        $('.topBanner').css('pointer-events','none');
        $('.registercomponent').css('pointer-events','auto');
    }
    componentWillUnmount()
    {
        $('.topBanner').css('pointer-events','auto');

    }
    formChangedpassword=(event)=> {
        console.log(event.target.value);
        console.log(this.state.password);
        this.setState({ password: event.target.value , hiddenSuccess: true}) };

    formChangedusername=(event)=> {
        console.log(event.target.value);
        console.log(this.state.username);
        this.setState({ username: event.target.value , hiddenSuccess: true }) };

    formChangedFirstName=(event)=> {
        console.log(event.target.value);
        console.log(this.state.firstname);
        this.setState({ firstname: event.target.value , hiddenSuccess: true}) };

    formChangedLastName=(event)=> {
        console.log(event.target.value);
        console.log(this.state.lastname);
        this.setState({ lastname: event.target.value , hiddenSuccess: true }) };

    formChangedEmail=(event)=> {
        console.log(event.target.value);
        console.log(this.state.email);
        this.setState({ email: event.target.value , hiddenSuccess: true}) };

    formChangedRole=(event)=> {
        console.log(event.target.checked);
        console.log(this.state.role);
        this.setState({ role: event.target.checked , hiddenSuccess: true}) };

    handleChange({target}){
        if (target.checked){
            target.removeAttribute('checked');
            target.parentNode.style.textDecoration = "";
        } else {
            target.setAttribute('checked', true);
            target.parentNode.style.textDecoration = "line-through";
        }
    }


    render(){ return(

        <div className="popup_inner registercomponent">
            <button onClick={this.props.close}
                    className="btn btn-danger float-right closeBtn">
                <i className="fa fa-close"/>
            </button>

            <form className="text-center border border-light p-5" onSubmit={this.saveUser}>

                <h1>Sign Up</h1>

                <div className="form-row mb-4">
                    <div className="alert alert-success" hidden={this.state.hiddenSuccess}>
                        <strong>Success!</strong> Please Login Using the Credentials created
                    </div>

                    <div className="col">

                        <input type="text"
                               id="defaultRegisterFormFirstName"
                               required
                               className="form-control"
                               placeholder="First name" onChange={this.formChangedFirstName}/>
                    </div>
                    <div className="col">

                        <input type="text"
                               id="defaultRegisterFormLastName"
                               required
                               className="form-control"
                               placeholder="Last name"
                               onChange={this.formChangedLastName}/>
                    </div>
                </div>

                <input type="email"
                       id="defaultRegisterFormEmail"
                       required
                       className="form-control mb-4"
                       placeholder="E-mail"
                       onChange={this.formChangedEmail}/>




                <input type="username"
                       id="defaultRegisterForm"
                       required
                       className="form-control"
                       placeholder="Username"
                       aria-describedby="defaultRegisterFormPasswordHelpBlock"
                       onChange={this.formChangedusername}/>
                    <small id="defaultRegisterFormPasswordHelpBlock"
                           className="form-text text-muted mb-4">
                        Use this to Login
                    </small>



                <input type="password"
                       id="defaultRegisterFormPassword"
                       required
                       className="form-control"
                       placeholder="Password"

                       onChange={this.formChangedpassword}/>

                    <div className="custom-control custom-checkbox">
                        <input type="checkbox"
                               className="custom-control-input"
                               id="defaultRegisterFormNewsletter"
                               onClick={this.formChangedRole}/>
                        <label className="custom-control-label"
                               htmlFor="defaultRegisterFormNewsletter">Register as a salon owner</label>
                    </div>

                    <button  onClick={this.saveUser} className="btn btn-dark my-4 btn-block"
                            type="button">Register
                    </button>

                        <p>By clicking
                            <em> Register</em> you agree to our
                            <a > terms of service</a> and
                            <a >terms of conditions</a>. </p>
                </form>
            </div>
    ) }
}
