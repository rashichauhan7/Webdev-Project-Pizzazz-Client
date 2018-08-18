import React, {Component} from 'react'
import UserService from "../services/UserService";
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import SalonManagerComponent from "./SalonManager";
import '../css/ProfileViewer.css'

class ProfileViewerComponent extends Component {

    constructor() {
        super();
        this.userService = UserService.instance;
        this.state = {
            currentUser: '',
            newUser:'',
            password :'',
            firstname:'',
            lastname:'',
            email:'',
            phone:'',
            profileId : '',
            image : '',
            selectedUser: {},
            reviews: [

            ],
            isReviewer : false,
            isAdmin : false,
            isDifferentUser : true,
            isLoggedIn : true,
            invitation : {
                salonOwner : {},
                reviewer : {}
            },
            cannotBeInvited : true,
            editMode : true
        };

    }

    setReviews(reviews) {
        this.setState({reviews: reviews})
    }

    selectProfile(profileId) {
        this.setState({profileId: profileId});
    }

    componentWillReceiveProps(newProps){
        this.selectProfile(newProps.match.params.profileId);
    }

    componentDidMount() {
        this.selectProfile
        (this.props.match.params.profileId);

        this.userService.findCurrentUser()
            .then(user => {
                this.setState({currentUser: user});
            }).then(()=>this.userService.findProfileById(this.state.profileId)
            .then(user => {
                this.setState({selectedUser: user});
            })).then(()=>{ this.setReviews(this.state.selectedUser.reviews)})
            .then(()=>{
                if(this.state.currentUser.id === this.state.selectedUser.id){
                    this.setState({isDifferentUser : false})
                }else if(this.state.currentUser.id === 0){
                    this.setState({isLoggedIn : false})
                }else if(this.state.currentUser.role === 'admin'){
                    this.setState({isAdmin : true})
                }else if(this.state.selectedUser.role === 'reviewer'){
                    this.setState({isReviewer : true})}
                if(this.state.currentUser.role === 'owner' && this.state.selectedUser.role === 'reviewer'){
                    this.setState({cannotBeInvited : false})
                }  })
    }

    saveUser = () => {
        this.state.newUser = {
            username : this.state.currentUser.username,
            password : this.state.password,
            firstName: this.state.firstname,
            lastName: this.state.lastname,
            email: this.state.email,
            phone: this.state.phone

        }
        console.log(this.state.newUser);
        this.userService.updateUser(this.state.currentUser.id,this.state.newUser)
            .then((loginUser)=>{alert('Saved Changes')})

    };

    changeEditState = () => {
        this.setState({
            editMode: !this.state.editMode
        })
    };

    inviteToReview = () =>{
        this.state.invitation = {
            salonOwner : this.state.currentUser,
            reviewer : this.state.selectedUser
        }
        this.userService.createInvite(this.state.invitation)
    }

    formChangedPassword = (event) => {
        console.log(event.target.value);
        console.log(this.state.password);
        this.setState({
            password: event.target.value
        })
    };

    formChangedFirstName = (event) => {
        console.log(event.target.value);
        console.log(this.state.firstname);
        this.setState({
            firstname: event.target.value
        })
    };

    formChangedLastName = (event) => {
        console.log(event.target.value);
        console.log(this.state.lastname);
        this.setState({
            lastname: event.target.value
        })
    };

    formChangedEmail = (event) => {
        console.log(event.target.value);
        console.log(this.state.email);
        this.setState({
            email: event.target.value
        })
    };

    formChangedPhone = (event) => {
        console.log(event.target.value);
        console.log(this.state.phone);
        this.setState({
            phone: event.target.value
        })
    };

    formChangedImage = (event) => {
        console.log(event.target.value);
        console.log(this.state.image);
        this.setState({
            image: event.target.value
        })
    };




    render() {
        return (

            <Router>
                <div className="container">
                    <div className="form-row">
                    <div className="col-sm-4 form-control-plaintext text-center">
                        <div className="card ">
                            <img src={this.state.selectedUser.image}  className="card-header crop" alt="avatar"/>

                            <h1 className="card-body">{this.state.selectedUser.firstName} {this.state.selectedUser.lastName}</h1>
                        </div>
                    </div>


                    <div  className="col-sm-8 form-control-plaintext">

                        <div id="viewerProfile" hidden={!this.state.editMode}>

                        <div className="row">
                        <div className="col-md-6">
                            <h6>About</h6>
                            <h3>
                                {this.state.selectedUser.status}
                            </h3>
                        </div>

                        <div className="col-md-6">
                            <h5>Likes</h5>
                            <ul className="list-group">
                                {this.state.reviews.map((review)=>
                                    <a href={review.salon.id} className="tag tag-default tag-pill">{review.salon.name}</a>
                                )}
                            </ul>
                            <div><button className="btn btn-info"
                                         hidden={this.state.cannotBeInvited}
                                         onClick={this.inviteToReview}>
                                <i className="fa fa-envelope"></i> Invite to Review Salon
                            </button></div>
                            <button hidden={this.state.isDifferentUser}
                                    onClick={this.changeEditState}
                                    className="btn btn-warning">
                                <i className="fa fa-pencil"></i> Edit Profile</button>
                        </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12 fa-border rounded-right">
                                <h4 className="m-t-2"><span
                                    className="fa fa-star ion-clock pull-xs-right"></span> Reviews Posted</h4>
                                <table className="table table-danger">
                                    <tbody>
                                    <tr>
                                        <td>
                                            <ul className="list-group">
                                                {this.state.reviews.map((review)=>
                                                    <div><strong>{review.comment}</strong>
                                                        <h6>{review.salon.name}</h6></div>

                                                )}
                                            </ul>
                                            <strong>Abby</strong> liked
                                            in <strong>`Collaboration`</strong>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        </div>

                        <div id="editorProfile" hidden={this.state.editMode}>
                        <div className="row">
                            <h5>Profile Editor</h5>
                        </div>
                            <form>

                            <div className="form-group row">
                                <label htmlFor="username" className="col-sm-2 col-form-label">Username</label>
                                <div className="col-sm-10">
                                    <input type="text" disabled className="form-control-plaintext" value=  {this.state.currentUser.username}
                                           id="username"/>

                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
                                <div className="col-sm-10">
                                    <input type="password" required className="form-control" id="password"
                                           placeholder="New Password" onChange={this.formChanged}/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="firstName" className="col-sm-2 col-form-label"> First
                                    Name </label>
                                <div className="col-sm-10">
                                    <input type="text" required className="form-control" id="firstName"
                                           value= {this.state.currentUser.firstName}
                                           placeholder="First name" onChange={this.formChanged2}/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="lastName" className="col-sm-2 col-form-label">Last
                                    Name</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" id="lastName"

                                           value= {this.state.currentUser.lastName}
                                           placeholder="Last Name" onChange={this.formChanged3}/>
                                </div>
                            </div>


                            <div className="form-group row">
                                <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                                <div className="col-sm-10">
                                    <input type="email" required className="form-control" id="email"
                                           placeholder= {this.state.currentUser.email} onChange={this.formChanged4}/>
                                </div>
                            </div>

                                <div className="form-group row">
                                <label htmlFor="phone" className="col-sm-2 col-form-label">Phone</label>
                                <div className="col-sm-10">
                                    <input type="tel" required className="form-control" id="phone"
                                           value= {this.state.currentUser.phone} onChange={this.formChanged5}/>
                                </div>
                            </div>

                                <div className="form-group row">
                                    <label htmlFor="img" className="col-sm-2 col-form-label">Image URL</label>
                                    <div className="col-sm-10">
                                        <input type="link" required className="form-control" id="img"
                                               value= {this.state.currentUser.image} onChange={this.formChanged5}/>
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label htmlFor="status" className="col-sm-2 col-form-label">Status</label>
                                    <div className="col-sm-10">
                                        <input  className="form-control" id="status"
                                               value= {this.state.currentUser.status} onChange={this.formChanged5}/>
                                    </div>
                                </div>


                                <div className="form-group row">

                                    <div className="col">
                                        <button className="btn btn-block btn-dark" type="submit" value="Submit">Save Changes</button>
                                    </div>

                                    <div className="col">
                                        <button className="btn btn-block btn-secondary" onClick={this.changeEditState}>Cancel</button>
                                    </div>

                                    <div className="col">
                                        <a className="btn btn-primary" hidden={this.state.currentUser.role !== 'owner'}
                                           href="/manageSalon">
                                            Manage My Salon
                                        </a>
                                    </div>

                                </div>


                            </form>

                        </div>



                    </div>
                    </div>
                </div>
            </Router>
    )
    }

    }

    export default ProfileViewerComponent;