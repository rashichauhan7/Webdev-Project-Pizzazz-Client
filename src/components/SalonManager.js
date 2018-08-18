import React,{Component}from'react'
import UserService from"../services/UserService";
import{BrowserRouter as Router,Route,Link}from'react-router-dom'
import SalonService from "../services/SalonService";

class SalonManagerComponent extends Component {

    constructor() {
        super();
        this.salonService = SalonService.instance;
        this.userService = UserService.instance;
        this.state = {
            currentUser:'',
            currentSalon: '',
            updatedSalon:'',
            name :'',
            address:'',
            city:'',
            website:'',
            phone:'',
            isPresent:'true'
        };

    }

    componentDidMount() {
      this.userService.findCurrentUser()
            .then(user => {
                this.setState({currentUser: user});
            });
        this.salonService.findCurrentSalon().
            then(salon =>{
                this.setState({currentSalon: salon});
        }).then(()=>{if(this.state.currentSalon.id === 0){
            this.setState({isPresent: "false"});
            console.log(this.state.isPresent)
        }});

    }

    saveSalon=()=>

    {
        this.state.updatedSalon = {
            name : this.state.name,
            address : this.state.address,
            city: this.state.city,
            website: this.state.website,
            phone: this.state.phone

        }
        console.log(this.state.updatedSalon);
        this.salonService.createSalon(this.state.updatedSalon)
            .then((loginUser)=>{alert('Saved Changes')})

    };

    updateSalon=()=>

    {
        this.state.updatedSalon = {
            name : this.state.name,
            address : this.state.address,
            city: this.state.city,
            website: this.state.website,
            phone: this.state.phone

        }
        console.log(this.state.updatedSalon);
        this.salonService.updateSalon(this.state.currentSalon.id, this.state.updatedSalon)
            .then((loginUser)=>{alert('Saved Changes')})

    };


    formChangedPhone=(event)=>
    {
        console.log(event.target.value);
        console.log(this.state.phone);
        this.setState({
            phone: event.target.value
        })
    };

    formChangedWebsite=(event)=>
    {
        console.log(event.target.value);
        console.log(this.state.website);
        this.setState({
            website: event.target.value
        })
    };

    formChangedCity=(event)=>
    {
        console.log(event.target.value);
        console.log(this.state.city);
        this.setState({
            city: event.target.value
        })
    };

    formChangedAddress=(event)=>
    {
        console.log(event.target.value);
        console.log(this.state.address);
        this.setState({
            address: event.target.value
        })
    };

    formChangedName=(event)=>
    {
        console.log(event.target.value);
        console.log(this.state.name);
        this.setState({
            name: event.target.value
        })
    };

    render() {
        return (

            <div>
            <div>{this.state.currentUser.firstName}'s Salon</div>
        <div className="form-group row">
            <label htmlFor="username" className="col-sm-2 col-form-label">Salon Name</label>
            <div className="col-sm-10">
            <input type="text"  className="form-control" placeholder= {this.state.currentSalon.name} onChange={this.formChangedName}/>
            </div> </div>

        <div className="form-group row">
            <label htmlFor="email" className="col-sm-2 col-form-label">Website</label>
            <div className="col-sm-10">
            <input type="text" className="form-control" id="email"
        placeholder= {this.state.currentSalon.website} onChange={this.formChangedWebsite}/>
        </div>
        </div>

        <div className="form-group row">
            <label htmlFor="email" className="col-sm-2 col-form-label">Address</label>
            <div className="col-sm-10">
            <input type="text" className="form-control" id="email"
        placeholder= {this.state.currentSalon.address} onChange={this.formChangedAddress}/>
        </div>
        </div>

        <div className="form-group row">
            <label htmlFor="email" className="col-sm-2 col-form-label">City</label>
            <div className="col-sm-10">
            <input type="text" className="form-control" id="email"
        placeholder= {this.state.currentSalon.city} onChange={this.formChangedCity}/>
        </div>
        </div>

        <div className="form-group row">
            <label htmlFor="phone" className="col-sm-2 col-form-label">Phone</label>
            <div className="col-sm-10">
            <input type="text" className="form-control" id="phone"
        value= {this.state.currentSalon.phone} onChange={this.formChangedPhone}/>
        </div>
        </div>

        <button id="saveBtn" type="button" onClick={this.saveSalon} hidden={this.state.currentSalon.id !== 0} className="btn btn-success btn-block">Create New Salon</button>

        <button id="updateBtn" type="button" onClick={this.updateSalon} hidden={this.state.currentSalon.id === 0} className="btn btn-success btn-block">Update Salon Changes</button>

        </div>



    )
    }

}

export default SalonManagerComponent;