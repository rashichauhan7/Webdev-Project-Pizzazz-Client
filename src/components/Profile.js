import React, {Component} from 'react'
import UserService from "../services/UserService";

class ProfileComponent extends Component {

    constructor() {
        super();
        this.userService = UserService.instance;
        this.state = {
            currentUser: {},
            newUser:{},
            password :{},
            firstname:{},
            lastname:{},
            email:{},
            phone:{}
        };

    }

    componentDidMount() {
        this.userService.findCurrentUser()
            .then(user => {
                this.setState({currentUser: user});
            });
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

    formChanged = (event) => {
        console.log(event.target.value);
        console.log(this.state.password);
        this.setState({
            password: event.target.value
        })
    };

    formChanged2 = (event) => {
        console.log(event.target.value);
        console.log(this.state.firstname);
        this.setState({
            firstname: event.target.value
        })
    };

    formChanged3 = (event) => {
        console.log(event.target.value);
        console.log(this.state.lastname);
        this.setState({
            lastname: event.target.value
        })
    };

    formChanged4 = (event) => {
        console.log(event.target.value);
        console.log(this.state.email);
        this.setState({
            email: event.target.value
        })
    };

    formChanged5 = (event) => {
        console.log(event.target.value);
        console.log(this.state.phone);
        this.setState({
            phone: event.target.value
        })
    };


    render() {
        return (
            <div>
            <div>Welcome to your profile</div>
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
                        <input type="password" className="form-control" id="password"
                               placeholder="New Password" onChange={this.formChanged}/>
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="firstName" className="col-sm-2 col-form-label"> First
                        Name </label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="firstName"
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
                        <input type="text" className="form-control" id="email"
        value= {this.state.currentUser.email} onChange={this.formChanged4}/>
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="phone" className="col-sm-2 col-form-label">Phone</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="phone"
        value= {this.state.currentUser.phone} onChange={this.formChanged5}/>
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="role" className="col-sm-2 col-form-label">Role</label>
                    <div className="col-sm-10">
                        <select className="custom-select mr-sm-2" id="role">
                            <option value="Faculty">Owner</option>
                            <option value="Student">Customer</option>
                        </select>
                    </div>
                </div>

                <button id="updateBtn" type="button" onClick={this.saveUser} className="btn btn-success btn-block">Save Changes</button>

                <button id="logoutBtn" type="button" className="btn btn-danger btn-block">Cancel</button>
            </div>



    )
    }

}

export default ProfileComponent;