import React, { Component } from 'react';
import UserService from "../services/UserService";
import $ from "jquery";
import SalonService from "../services/SalonService";

export default class AdminHomeComponent extends Component{

    constructor() {
        super();
        this.userService = UserService.instance;
        this.salonService = SalonService.instance;
        this.state = {
            isAdmin : true,
            currentUser : '',
            newUser:'',
            username:'',
            password :'',
            firstname:'',

            lastname:'',
            email:'',
            role:'',

            newSalon : '',
            salonName: '',
            salonWebsite : '',
            salonOwnerId : '',
            salons:[

            ],
            reviewers: [

            ],
            owners: [

            ],
            customers: [

            ],
        };
    }

    setReviewers(reviewers) {
        this.setState({reviewers: reviewers})
    }

    setOwners(owners) {
        this.setState({owners: owners})
    }

    setCustomers(customers) {
        this.setState({customers: customers})
    }

    setCurrentUser(user) {
        this.setState({currentUser: user})
    }

    setSalons(salons) {
        this.setState({salons: salons})
    }

    componentDidMount() {
        $('.topBanner').css('padding-top','2%');
        $('.topBanner').css('padding-bottom','0%');
        $('.logo').css('visibility','hidden');
        $('.logo1').css('visibility','visible');
        this.userService.findCurrentUser()
            .then(user => this.setCurrentUser(user))
            .then(()=>{
                if(this.state.currentUser.role === 'admin'){
                    this.setState({
                        isAdmin : false
                    })
                }
            })


        this.userService.findAllReviewers()
            .then(users=>this.setReviewers(users))
        this.userService.findAllOwners()
            .then(users=>this.setOwners(users))
        this.userService.findAllCustomers()
            .then(users=>this.setCustomers(users))
        this.userService.findAllSalonsFromAdmin()
            .then(salons=>this.setSalons(salons))

    }


    addSalon = ()=> {
        this.state.newSalon ={
            name : this.state.salonName,
            website : this.state.salonWebsite,
            salonOwner : this.state.salonOwnerId
        }
        this.salonService.createApiSalonFromScreen(this.state.salonOwnerId,this.state.newSalon)
            .then(response=>{
                this.userService.findAllSalonsFromAdmin()
                    .then(salons=>this.setSalons(salons))
            })
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
            .then(()=>{
                this.userService.findAllReviewers()
                    .then(users=>this.setReviewers(users))
                this.userService.findAllOwners()
                    .then(users=>this.setOwners(users))
                this.userService.findAllCustomers()
                    .then(users=>this.setCustomers(users))
                this.userService.findAllSalonsFromAdmin()
                    .then(users=>this.setSalons(users))
            })
    };


    deleteSalon=(userId)=> {
        this.salonService.deleteSalon(userId)
            .then( (response)=>{
                this.userService.findAllSalonsFromAdmin()
                    .then(users=>this.setSalons(users))
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

    formChangedNameSalon=(event)=> {
        console.log(event.target.value);
        console.log(this.state.salonName);
        this.setState({ salonName: event.target.value}) };


    formChangedWebsiteSalon=(event)=> {
        console.log(event.target.value);
        console.log(this.state.salonWebsite);
        this.setState({ salonWebsite: event.target.value}) };


    formChangedOwnerSalon=(event)=> {
        console.log(event.target.value);
        console.log(this.state.salonOwnerId);
        this.setState({ salonOwnerId: event.target.value}) };


    render() {
        return(
            <div>
            <div className="border fa-border" hidden={this.state.isAdmin}>
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

                    <input type="text" required className="form-control"
                           placeholder="Last name" onChange={this.formChangedLastName}/>
                </div>
                <div className="col">

                    <input type="email" required className="form-control"
                           placeholder="Email" onChange={this.formChangedEmail}/>
                </div></div>
                <div className="form-row mb-4 border-dark">

                <div className="col">

                    <input type="text" required className="form-control"
                           placeholder="Username" onChange={this.formChangedUsername}/>
                </div>
                <div className="col">

                    <input type="password" required className="form-control"
                           placeholder="Password" onChange={this.formChangedPassword}/>
                </div>
                <div className="col">
                    <div className="form-row mb-1 border-dark">
                        <div className="col">
                    <button className="btn btn-block btn-dark" type="submit" value="Submit">Add Reviewer</button>
                        </div> <div className="col">
                    <button className="btn btn-block btn-dark" type="reset" value="Reset">Clear Fields</button>
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
                            <h6>ID</h6>
                        </div>
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
                        <div key= {reviewer.id} className="form-row mb-3 border-dark">
                            <div className="col">
                                <strong>{reviewer.id}</strong>
                            </div>
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
                            <button className="btn btn btn-danger"
                                    onClick={(e) => { if (window.confirm('Are you sure you wish to delete this Reviewer?'))
                                        this.deleteReviewer(reviewer.id)}}>Delete Profile</button>
                            </div>
                        </div>
                    )}
                </ul>
                </form>

                <form className="text-center border border-light p-5">
                    <div className="form-row mb-3 border-dark">
                        <h3>Owner Profiles</h3>
                    </div>

                    <div className="form-row mb-3 border-dark">
                        <div className="col">
                            <h6>ID</h6>
                        </div>
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
                        {this.state.owners.map((reviewer)=>
                            <div key={reviewer.id} className="form-row mb-3 border-dark">
                                <div className="col">
                                    <strong>{reviewer.id}</strong>
                                </div>
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
                                    <button className="btn btn btn-danger"
                                            onClick={(e) => { if (window.confirm('Are you sure you wish to delete this Reviewer?'))
                                                this.deleteReviewer(reviewer.id)}}>Delete Profile</button>
                                </div>
                            </div>
                        )}
                    </ul>
                </form>



                <form className="text-center border border-light p-5">
                    <div className="form-row mb-3 border-dark">
                        <h3>Customer Profiles</h3>
                    </div>

                    <div className="form-row mb-3 border-dark">
                        <div className="col">
                            <h6>ID</h6>
                        </div>
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
                        {this.state.customers.map((reviewer)=>
                            <div key={reviewer.id} className="form-row mb-3 border-dark">
                                <div className="col">
                                    <strong>{reviewer.id}</strong>
                                </div>
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
                                    <button className="btn btn btn-danger"
                                            onClick={(e) => {
                                                if (window.confirm('Are you sure you wish to delete this Profile?')) {
                                                    this.deleteReviewer(reviewer.id);
                                                }}}>Delete Profile</button>
                                </div>
                            </div>
                        )}
                    </ul>
                </form>


                <form className="text-center border border-light p-5"  onSubmit={this.addSalon}>
                    <div className="form-row mb-3 border-dark">
                        <div className="float-left">
                            <h4>Add New Salon</h4>
                        </div>
                    </div>
                    <div className="form-row mb-3 border-dark">
                        <div className="col">

                            <input type="text"  required className="form-control"
                                   placeholder="Salon Name" onChange={this.formChangedNameSalon}/>
                        </div>
                        <div className="col">


                            <input type="text" required className="form-control"
                                   placeholder="Website" onChange={this.formChangedWebsiteSalon}/>
                        </div>

                        <div className="col">

                            <input type="number"  required className="form-control"
                                   placeholder="Owner Id" onChange={this.formChangedOwnerSalon}/>
                        </div>

                        <div className="col">
                            <div className="form-row mb-1 border-dark">
                                <div className="col">
                                    <button className="btn btn-block btn-dark" type="submit" value="Submit">Add Salon</button>
                                </div> <div className="col">
                                <button className="btn btn-block btn-dark" type="reset" value="Reset">Clear Fields</button>
                            </div>
                            </div>
                        </div>


                    </div>
                </form>


                <form className="text-center border border-light p-5">
                    <div className="form-row mb-3 border-dark">
                        <h3>Pizzazz Verified Salons</h3>
                    </div>

                    <div className="form-row mb-3 border-dark">
                        <div className="col">
                            <h6>ID</h6>
                        </div>
                        <div className="col">
                            <h6>Salon Name</h6>
                        </div>
                        <div className="col">
                            <h6>Website</h6>
                        </div>
                        <div className="col">
                            <h6>Owner Id</h6>
                        </div>
                        <div className="col">
                            <h6>Action</h6>
                        </div>
                    </div>

                    <ul className="list-group">
                        {this.state.salons.map((reviewer)=>
                            <div key={reviewer.id} className="form-row mb-3 border-dark">
                                <div className="col">
                                    <strong>{reviewer.id}</strong>
                                </div>
                                <div className="col">
                                    <strong>{reviewer.name}</strong>
                                </div>
                                <div className="col">
                                    <strong>{reviewer.website}</strong>
                                </div>
                                <div className="col">
                                    <strong>{reviewer.salonOwner}</strong>
                                </div>
                                <div className="col">
                                    <button className="btn btn btn-danger"
                                            onClick={(e) => { if (window.confirm('Are you sure you wish to delete this Salon?'))
                                                this.deleteSalon(reviewer.id)}}>Delete Salon</button>
                                </div>
                            </div>
                        )}
                    </ul>
                </form>


            </div>

                <div className="alert alert-danger" hidden={!this.state.isAdmin}>
                    <strong>Safety Breach!</strong> You need Admin Access to view .
                </div>

            </div>
        )
    }





}