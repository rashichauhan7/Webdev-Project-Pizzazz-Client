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

        $('.customertag').hide();
        $('.reviewertag').hide();
        $('.ownertag').hide();

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
        this.salonService.validateOwner(this.state.salonOwnerId)
            .then((user)=>{
                if(user.id === 0){
                    {alert('Please enter a valid owner Id')}
                }else{
                    this.salonService.createApiSalonFromScreen(this.state.salonOwnerId,this.state.newSalon)
                        .then(response=>{
                            this.userService.findAllSalonsFromAdmin()
                                .then(salons=>this.setSalons(salons))
                        })
                }
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
        this.userService.findUserByUsername(this.state.username)
            .then(response=>{
                if (response.length === 0){
                    this.userService.createUserFromAdminPage(this.state.newUser)
                        .then((loginUser)=>{this.userService.findAllReviewers()
                            .then(users=>this.setReviewers(users))})
                } else {
                    {alert('Username already taken')}
                }
            })

    };

    EditReviewer = (user)=> {
        if(user.role === "reviewer"){
            $('.r-user-id').val(user.id);
            $('.r-first-name').val(user.firstName);
            $('.r-last-name').val(user.lastName);
            $('.r-username').val(user.username);
            $('.r-email').val(user.email);
        }

        if(user.role === "owner"){
            $('.o-user-id').val(user.id);
            $('.o-first-name').val(user.firstName);
            $('.o-last-name').val(user.lastName);
            $('.o-username').val(user.username);
            $('.o-email').val(user.email);
        }

        if(user.role === ""){
            $('.c-user-id').val(user.id);
            $('.c-first-name').val(user.firstName);
            $('.c-last-name').val(user.lastName);
            $('.c-username').val(user.username);
            $('.c-email').val(user.email);
        }

        if(user.role.localeCompare('') === 0)
            $('.customertag').show();
        if(user.role.localeCompare('reviewer') === 0)
            $('.reviewertag').show();
        if(user.role.localeCompare('owner') === 0)
            $('.ownertag').show();


    }

    UpdateReviewer = (u)=> {
        let user;
        if(u === "r"){
             user = {
                id: $('.r-user-id').val(),
                firstName: $('.r-first-name').val(),
                lastName: $('.r-last-name').val(),
                username: $('.r-username').val(),
                email: $('.r-email').val()
            }
        }
        if(u === "o"){
            user = {
                id: $('.o-user-id').val(),
                firstName: $('.o-first-name').val(),
                lastName: $('.o-last-name').val(),
                username: $('.o-username').val(),
                email: $('.o-email').val()
            }
        }
        if(u === "c"){
            user = {
                id: $('.c-user-id').val(),
                firstName: $('.c-first-name').val(),
                lastName: $('.c-last-name').val(),
                username: $('.c-username').val(),
                email: $('.c-email').val()
            }
        }
        console.log(user);
        this.userService.updateUserFromAdmin(user.id, user)
            .then(() => { window.location.reload()});
    }

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
                            <div className="form-row mb-3 border-dark reviewertag">

                                <div className="col">
                                    <input disabled className="r-user-id form-control"/>
                                </div>
                                <div className="col">
                                    <input className="r-first-name form-control"/>
                                </div>
                                <div className="col">
                                    <input className="r-last-name form-control"/>
                                </div>
                                <div className="col">
                                    <input disabled className="r-username form-control"/>
                                </div>
                                <div className="col">
                                    <input className="r-email form-control"/>
                                </div>
                                <div className="col">
                                    <button className="btn btn-light"
                                            type="button"
                                            onClick={()=> {this.UpdateReviewer("r")}}>
                                        Update
                                    </button>
                                </div>
                            </div>
                            {this.state.reviewers.map((reviewer)=>
                                <div className="form-row mb-3 border-dark">
                                    <div  className="col">
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
                                        <button style={{marginRight: '5%'}} className="btn btn btn-danger delete"
                                                onClick={(e) => { if (window.confirm('Are you sure you wish to delete this Reviewer?'))
                                                    this.deleteReviewer(reviewer.id)}}><i className="fa fa-trash"></i></button>
                                        <button type="button" className="btn btn btn-danger edit"
                                                onClick={()=> {this.EditReviewer(reviewer)}}><i className="fa fa-pencil"></i></button>
                                    </div>
                                </div>
                            )}
                        </ul>
                    </form>

                    <form className="text-center border border-light p-5">
                        <div className="form-row mb-3 border-dark">
                            <h3>Owner Profiles</h3>
                        </div>

                        <div className="form-row mb-3 border-dark ">
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
                            <div className="form-row mb-3 border-dark ownertag">
                                <div className="col">
                                    <input disabled className="o-user-id"/>
                                </div>
                                <div className="col">
                                    <input className="o-first-name"/>
                                </div>
                                <div className="col">
                                    <input className="o-last-name"/>
                                </div>
                                <div className="col">
                                    <input disabled className="o-username"/>
                                </div>
                                <div className="col">
                                    <input className="o-email"/>
                                </div>
                                <div className="col">
                                    <button className="btn btn-light"
                                            type="button"
                                            onClick={()=> {this.UpdateReviewer("o")}}>
                                        Update
                                    </button>
                                </div>
                            </div>
                            {this.state.owners.map((reviewer)=>
                                <div className="form-row mb-3 border-dark">
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
                                        <button style={{marginRight: '5%'}} className="btn btn btn-danger delete"
                                                onClick={(e) => { if (window.confirm('Are you sure you wish to delete this Reviewer?'))
                                                    this.deleteReviewer(reviewer.id)}}><i className="fa fa-trash"></i></button>
                                        <button type="button" className="btn btn btn-danger edit"
                                                onClick={()=> {this.EditReviewer(reviewer)}}><i className="fa fa-pencil"></i></button>
                                    </div>
                                </div>
                            )}
                        </ul>
                    </form>



                    <form className="text-center border border-light p-5">
                        <div className="form-row mb-3 border-dark">
                            <h3>Customer Profiles</h3>
                        </div>

                        <div className="form-row mb-3 border-dark ">
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
                            <div className="form-row mb-3 border-dark customertag">
                                <div className="col">
                                    <input disabled className="c-user-id"/>
                                </div>
                                <div className="col">
                                    <input className="c-first-name"/>
                                </div>
                                <div className="col">
                                    <input className="c-last-name"/>
                                </div>
                                <div className="col">
                                    <input disabled className="c-username"/>
                                </div>
                                <div className="col">
                                    <input className="c-email"/>
                                </div>
                                <div className="col">
                                    <button className="btn btn-light"
                                            type="button"
                                            onClick={()=> {this.UpdateReviewer("c")}}>
                                        Update
                                    </button>
                                </div>
                            </div>
                            {this.state.customers.map((reviewer)=>
                                <div className="form-row mb-3 border-dark">
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
                                        <button style={{marginRight: '5%'}} className="btn btn btn-danger delete"
                                                onClick={(e) => { if (window.confirm('Are you sure you wish to delete this Reviewer?'))
                                                    this.deleteReviewer(reviewer.id)}}><i className="fa fa-trash"></i></button>
                                        <button type="button" className="btn btn btn-danger edit"
                                                onClick={()=> {this.EditReviewer(reviewer)}}><i className="fa fa-pencil"></i></button>
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
                                       placeholder="Valid Salon Id" onChange={this.formChangedWebsiteSalon}/>
                            </div>

                            <div className="col">

                                <input type="number"  required className="form-control"
                                       placeholder="Owner Id" onChange={this.formChangedOwnerSalon}/>
                            </div>

                            <div className="col">
                                <div className="form-row mb-1 border-dark">
                                    <div className="col">
                                        <button style={{marginRight: '5%'}} className="btn btn-block btn-dark" type="submit" value="Submit">Add Salon</button>
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
                                <h6>Pizzazz Salon Id</h6>
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
                                <div className="form-row mb-3 border-dark">
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