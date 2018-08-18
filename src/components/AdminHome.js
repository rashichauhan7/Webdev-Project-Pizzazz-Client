import React, { Component } from 'react';
import UserService from "../services/UserService";

export default class AdminHomeComponent extends Component{

    constructor() {
        super();
        this.userService = UserService.instance;
        this.state = {
            newUser:'',
            username:'',
            password :'',
            firstname:'',
            lastname:'',
            email:'',
            role:'',
            reviewers: [

            ],
        };
    }

    setReviewers(reviewers) {
        this.setState({reviewers: reviewers})
    }

    componentDidMount() {
        this.userService.findAllReviewers()
            .then(users=>this.setReviewers(users))
    }


    addReviewer=()=> {
        this.state.newUser = {
            username : this.state.username,
            password : this.state.password,
            firstName: this.state.firstname,
            lastName: this.state.lastname,
            email: this.state.email,
            role: 'reviewer'
        }

        console.log(this.state.newUser);
        this.userService.createUser(this.state.newUser)
            .then((loginUser)=>{this.userService.findAllReviewers()
                .then(users=>this.setReviewers(users))})
    };

    deleteReviewer=(userId)=> {
        this.userService.deleteUser(userId)
            .then( ()=>{
                this.userService.findAllReviewers()
                    .then(users=>this.setReviewers(users))
            })
    };


    formChangedPassword=(event)=> {
        console.log(event.target.value);
        console.log(this.state.password);
        this.setState({ password: event.target.value }) };

    formChangedUsername=(event)=> {
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

    render() {
        return(
            <div className="border fa-border">
                <form className="text-center border border-light p-5"  onSubmit={this.addReviewer}>

                    <div className="form-row mb-3 border-dark">
                        <div className="float-left">
                            <h4>Add New Reviewer</h4>
                        </div>
                    </div>
            <div className="form-row mb-3 border-dark">
                <div className="col">

                    <input type="text" id="defaultRegisterFormFirstName" required className="form-control"
                           placeholder="First name" onChange={this.formChangedFirstName}/>
                </div>
                <div className="col">

                    <input type="text" id="defaultRegisterFormLastName" required className="form-control"
                           placeholder="Last name" onChange={this.formChangedLastName}/>
                </div>
                <div className="col">

                    <input type="email" id="defaultRegisterFormLastName" required className="form-control"
                           placeholder="Email" onChange={this.formChangedEmail}/>
                </div></div>
                <div className="form-row mb-4 border-dark">

                <div className="col">

                    <input type="text" id="defaultRegisterFormLastName" required className="form-control"
                           placeholder="Username" onChange={this.formChangedUsername}/>
                </div>
                <div className="col">

                    <input type="password" id="defaultRegisterFormLastName" required className="form-control"
                           placeholder="Password" onChange={this.formChangedPassword}/>
                </div>
                <div className="col">
                    <div className="form-row mb-1 border-dark">
                        <div className="col">
                    <button className="btn btn-block btn-dark" type="submit" value="Submit">Add Reviewer</button>
                        </div> <div className="col">
                    <button className="btn btn-block btn-dark">Cancel</button>
                    </div>
                    </div>
                </div>


            </div>
                </form>
                <form className="text-center border border-light p-5">
                    <div className="form-row mb-3 border-dark">
                    <h3>Reviewer Profiles</h3>
                    </div>

                    <div className="form-row mb-3 border-dark">
                        <div className="col">
                            <h6>First Name</h6>
                        </div>
                        <div className="col">
                            <h6>Last Name</h6>
                        </div>
                        <div className="col">
                            <h6>Username</h6>
                        </div>
                        <div className="col">
                            <h6>Email</h6>
                        </div>
                        <div className="col">
                            <h6>Action</h6>
                        </div>
                    </div>

                    <ul className="list-group">
                    {this.state.reviewers.map((reviewer)=>
                        <div className="form-row mb-3 border-dark">

                            <div className="col">
                                <strong>{reviewer.firstName}</strong>
                            </div>
                            <div className="col">
                                <strong>{reviewer.lastName}</strong>
                            </div>
                            <div className="col">
                                <strong>{reviewer.username}</strong>
                            </div>
                            <div className="col">
                                <strong>{reviewer.email}</strong>
                            </div>
                            <div className="col">
                            <button className="btn btn btn-warning"
                                    onClick={(e) => { if (window.confirm('Are you sure you wish to delete this Reviewer?'))
                                        this.deleteReviewer(reviewer.id)}}>Delete Profile</button>
                            </div>
                        </div>




                    )}
                </ul>
                </form>
            </div>
        )
    }





}