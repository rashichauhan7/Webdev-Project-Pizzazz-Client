import React from'react';import{Link}from'react-router-dom';
import UserService from"../services/UserService";
import '../css/Login.css'
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
            role:''
        }; }

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


    formChangedpassword=(event)=> {
        console.log(event.target.value);
        console.log(this.state.password);
        this.setState({ password: event.target.value }) };

    formChangedusername=(event)=> {
        console.log(event.target.value);
        console.log(this.state.username);
        this.setState({ username: event.target.value }) };

    formChangedFirstName=(event)=> {
        console.log(event.target.value);
        console.log(this.state.firstname);
        this.setState({ firstname: event.target.value }) };

    formChangedLastName=(event)=> {
        console.log(event.target.value);
        console.log(this.state.lastname);
        this.setState({ lastname: event.target.value }) };

    formChangedEmail=(event)=> {
        console.log(event.target.value);
        console.log(this.state.email);
        this.setState({ email: event.target.value}) };

    formChangedRole=(event)=> {
        console.log(event.target.checked);
        console.log(this.state.role);
        this.setState({ role: event.target.checked}) };

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
        <div className="popup_inner">
        <div className="container-fluid">
        <h1>Sign Up</h1>
    <div>
    <label htmlFor="firstname"> First Name </label> <input type="text"
        className="form-control wbdv" placeholder="firstname" id="firstname"
        onChange={this.formChangedFirstName} />
        </div>

        <div>
        <label htmlFor="lastname"> Last Name </label> <input type="text"
        className="form-control wbdv" placeholder="lastname" id="lastname"
        onChange={this.formChangedLastName} />

        <div>
        <label htmlFor="username"> Username </label> <input type="text"
        className="form-control wbdv" placeholder="username" id="username"
        onChange={this.formChangedusername} />
        </div>

        <div>
        <label htmlFor="email"> Email </label> <input type="text"
        className="form-control wbdv" placeholder="email" id="email"
        onChange={this.formChangedEmail} />
        </div>

        <div>
        <label htmlFor="password"> Password </label> <input type="password"
        className="form-control wbdv" placeholder="password" id="password"
        onChange={this.formChangedpassword} />
        </div>
        <div>
            <input type="checkbox" name="role" value="false" onClick={this.formChangedRole} /> <label
        htmlFor="role" > Register as Business Owner </label>
        </div>


        </div>

        <div className="btn btn-success input" onClick={this.saveUser}>Register</div>
        </div>
</div>

    ) }
}
