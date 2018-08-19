import React, {Component} from 'react';
import UserService from "../services/UserService";
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import SalonManagerComponent from "./SalonManager";
import '../css/ProfileViewer.css'
import SalonService from "../services/SalonService";
import SalonEditor from "./SalonEditor";

class ProfileViewerComponent extends Component {

    constructor() {
        super();
        this.userService = UserService.instance;
        this.salonService = SalonService.instance;
        this.state = {
            currentUser: '',
            newUser:'',
            password :'',
            firstname:'',
            lastname:'',
            email:'',
            phone:'',
            status: '',
            profileId : '',
            image : '',
            selectedUser: {},
            reviews: [

            ],
            likes: [

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
            editMode : true,
            editModeSalon : true,
            cssLoaded: false,

            currentSalon: '',
            updatedSalon:'',

            nameSalon :'',
            address:'',
            city:'',
            website:'',
            phoneSalon:'',
            isPresent:'true'
        };

    }

    setCustomerState(customer){
        this.setState({
            currentUser : customer,
            firstname : customer.firstName,
            lastname : customer.lastName,
            password : customer.password,
            email : customer.email,
            image : customer.image,
            phone : customer.phone,
            status : customer.status

        })
    }

    setSalonState(salon){
        this.setState({
            currentSalon: salon,
            nameSalon : salon.name,
            address: salon.address,
            city: salon.city,
            website: salon.website,
            phoneSalon: salon.phone
        })
    }

    setReviews(reviews) {
        this.setState({reviews: reviews})
    }

    setLikes(likes) {
        this.setState({likes: likes})
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
                this.setCustomerState(user);
            }).then(()=>this.userService.findProfileById(this.state.profileId)
            .then(user => {
                this.setState({selectedUser: user});
            })).then(()=>{
            this.userService.findReviewsById(this.state.selectedUser.id)
                .then(reviews => {
                    this.setReviews(reviews)})
                .then(()=>{
                    this.userService.findLikesById(this.state.selectedUser.id)
                        .then(likes =>
                        this.setLikes(likes))
                })
        })
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
            phone: this.state.phone,
            status : this.state.status,
            image : this.state.image

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

    changeEditSalonState = () => {
        this.userService.findCurrentUser()
            .then(user => {
                this.setState({currentUser: user});
            });
        this.salonService.findCurrentSalon()
            .then(salon =>{
                this.setSalonState(salon);
            }).then(()=>{if(this.state.currentSalon.id === 0){
            this.setState({isPresent: "false"});
            console.log(this.state.isPresent)
        }}).then(()=>this.setState({
            editModeSalon: !this.state.editModeSalon
        }))
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

    formChangedStatus = (event) => {
        console.log(event.target.value);
        console.log(this.state.status);
        this.setState({
            status: event.target.value
        })
    };


    formChangedPhoneSalon=(event)=>
    {
        console.log(event.target.value);
        console.log(this.state.phoneSalon);
        this.setState({
            phoneSalon: event.target.value
        })
    };

    formChangedWebsiteSalon=(event)=>
    {
        console.log(event.target.value);
        console.log(this.state.website);
        this.setState({
            website: event.target.value
        })
    };

    formChangedCitySalon=(event)=>
    {
        console.log(event.target.value);
        console.log(this.state.city);
        this.setState({
            city: event.target.value
        })
    };

    formChangedAddressSalon=(event)=>
    {
        console.log(event.target.value);
        console.log(this.state.address);
        this.setState({
            address: event.target.value
        })
    };

    formChangedNameSalon=(event)=>
    {
        console.log(event.target.value);
        console.log(this.state.nameSalon);
        this.setState({
            nameSalon: event.target.value
        })
    };

    saveSalon=()=>

    {
        this.state.updatedSalon = {
            name : this.state.nameSalon,
            address : this.state.address,
            city: this.state.city,
            website: this.state.website,
            phone: this.state.phoneSalon

        }
        console.log(this.state.updatedSalon);
        this.salonService.createSalon(this.state.updatedSalon)
            .then((salon)=>{
                this.setState({
                    currentSalon : salon
                })
            })
            .then(()=>{alert('Saved Changes')})
    };

    updateSalon=()=>

    {
        this.state.updatedSalon = {
            name : this.state.nameSalon,
            address : this.state.address,
            city: this.state.city,
            website: this.state.website,
            phone: this.state.phoneSalon

        }
        console.log(this.state.updatedSalon);
        this.salonService.updateSalon( this.state.updatedSalon , this.state.currentSalon.id)
            .then((salon)=>{
                this.setState({
                    currentSalon : salon
                })
            })
            .then(()=>{alert('Saved Changes')})

    };

    render() {
        if (this.state.cssLoaded === false) {
            this.state.cssLoaded = true;
            import('../css/Profile.css');
        }
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

                            <div id="viewerProfile" hidden={!this.state.editMode} >

                                <div className="row border card-body" >
                                    <div className="col-md-6">
                                        <h6>About</h6>
                                        <h3>
                                            {this.state.selectedUser.status}
                                        </h3>
                                    </div>

                                    <div className="col-md-6">
                                        <h5>Likes</h5>
                                            {this.state.likes.map((review)=>
                                                <a className="text-danger">'{review.salonName}' </a>
                                            )}

                                        <div className="container-fluid"><button className="btn btn-info"
                                                                                 hidden={this.state.cannotBeInvited}
                                                                                 onClick={this.inviteToReview}>
                                            <i className="fa fa-envelope"></i> Invite to Review Salon
                                        </button></div>
                                        <div className="form-row">
                                            <button hidden={this.state.isDifferentUser}
                                                    onClick={this.changeEditState}
                                                    className="btn btn-danger">
                                                <i className="fa fa-pencil"></i>  Edit Profile</button>
                                        </div>

                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-12 ">
                                        <h4 className="m-t-2"><span
                                            className="fa fa-star ion-clock pull-xs-right"></span> Reviews Posted</h4>
                                        <table className="table table-danger">
                                            <tbody>
                                            <tr>
                                                <td>
                                                    <ul className="list-group">
                                                        {this.state.reviews.map((review)=>
                                                            <div><h6>{this.state.selectedUser.firstName} commented
                                                                <strong> "{review.comment}" </strong> on
                                                                <Link to= {`/salon/${review.salonYelpId}`}>
                                                                    <strong> {review.salonName} </strong>
                                                                </Link>
                                                                and rated {review.rating} stars!! </h6>
                                                            </div>
                                                        )}
                                                    </ul>

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
                                <form  onSubmit={this.saveUser}>

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
                                            <input type="password" required className="form-control" id="password" value=  {this.state.password}
                                                   placeholder="New Password" onChange={this.formChangedPassword}/>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="firstName" className="col-sm-2 col-form-label"> First
                                            Name </label>
                                        <div className="col-sm-10">
                                            <input type="text" required className="form-control" id="firstName"
                                                   value= {this.state.firstname}
                                                   placeholder="First name" onChange={this.formChangedFirstName}/>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="lastName" className="col-sm-2 col-form-label">Last
                                            Name</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" id="lastName"

                                                   value= {this.state.lastname}
                                                   placeholder="Last Name" onChange={this.formChangedLastName}/>
                                        </div>
                                    </div>


                                    <div className="form-group row">
                                        <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                                        <div className="col-sm-10">
                                            <input type="email" required className="form-control" id="email"
                                                   value= {this.state.email} onChange={this.formChangedEmail}/>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="phone" className="col-sm-2 col-form-label">Phone</label>
                                        <div className="col-sm-10">
                                            <input type="tel" required className="form-control" id="phone"
                                                   value= {this.state.phone} onChange={this.formChangedPhone}/>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="img" className="col-sm-2 col-form-label">Image URL</label>
                                        <div className="col-sm-10">
                                            <input type="link"  className="form-control" id="img"
                                                   value= {this.state.image} onChange={this.formChangedImage}/>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="status" className="col-sm-2 col-form-label">Status</label>
                                        <div className="col-sm-10">
                                            <input  className="form-control" id="status"
                                                    value= {this.state.status} onChange={this.formChangedStatus}/>
                                        </div>
                                    </div>


                                    <div className="form-group row">

                                        <div className="col">
                                            <button className="btn btn-block btn-danger" type="submit" value="Submit">
                                                <i className="fa fa-check"></i> Save Changes</button>
                                        </div>

                                    </div>


                                </form>

                                <div className="form-group row float-lg-right ">

                                    <div>
                                        <button className="btn btn-danger" onClick={this.changeEditState}>
                                            <i className="fa fa-times"></i> Cancel Without Saving</button>

                                    </div>
                                    <div  className="col">
                                        <button className="btn btn-danger" hidden={this.state.currentUser.role !== 'owner'}
                                                onClick={this.changeEditSalonState}> <i className="fa fa-scissors">

                                        </i> Manage My Salon
                                        </button>
                                    </div>

                                </div>



                                <div id="salonEditor" hidden={this.state.editModeSalon} className="float-lg-left">

                                    <div>
                                        <div className="text-center"><h3>{this.state.currentUser.firstName}'s Salon</h3></div>
                                        <div className="form-group row">
                                            <label htmlFor="username" className="col-sm-2 col-form-label">Name</label>
                                            <div className="col-sm-10">
                                                <input type="text"  className="form-control" value= {this.state.nameSalon} onChange={this.formChangedNameSalon}/>
                                            </div> </div>

                                        <div className="form-group row">
                                            <label htmlFor="email" className="col-sm-2 col-form-label">Website</label>
                                            <div className="col-sm-10">
                                                <input type="text" className="form-control" id="email"
                                                       value = {this.state.website} onChange={this.formChangedWebsiteSalon}/>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="email" className="col-sm-2 col-form-label">Address</label>
                                            <div className="col-sm-10">
                                                <input type="text" className="form-control" id="email"
                                                       value = {this.state.address} onChange={this.formChangedAddressSalon}/>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="email" className="col-sm-2 col-form-label">City</label>
                                            <div className="col-sm-10">
                                                <input type="text" className="form-control" id="email"
                                                       value = {this.state.city} onChange={this.formChangedCitySalon}/>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="phone" className="col-sm-2 col-form-label">Phone</label>
                                            <div className="col-sm-10">
                                                <input type="text" className="form-control" id="phone"
                                                       value = {this.state.phoneSalon} onChange={this.formChangedPhoneSalon}/>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col">
                                                <button id="saveBtn" type="button" onClick={this.saveSalon}
                                                        hidden={this.state.currentSalon.id !== 0}
                                                        className="btn btn-success btn-block">Create New Salon</button>
                                            </div>

                                            <div className="col">
                                                <button id="updateBtn" type="button" onClick={this.updateSalon}
                                                        hidden={this.state.currentSalon.id === 0}
                                                        className="btn btn-success btn-block">Update Salon Changes</button>
                                            </div>

                                            <div className="col">
                                                <button className="btn btn-danger" onClick={this.changeEditSalonState}>
                                                    <i className="fa fa-reply"></i> Cancel Without Saving</button>
                                            </div>


                                        </div>



                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </Router>
        )
    }

}

export default ProfileViewerComponent;