import React from 'react';
import ReactDOM from 'react-dom';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import YelpApiService from '../services/YelpServices'
import '../css/Home.css'
import logo from '../css/img/logo.png'
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import StarRatings from '../../node_modules/react-star-ratings';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

export default class Home extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            keyword: '',
            location: 'boston , ma',
            salons:[]
        };
        let selectedLabel;
        this.yelp = YelpApiService.instance;
        this.getSalons = this.getSalons.bind(this);
        this.renderSalons = this.renderSalons.bind(this);
        this.titleChanged = this.titleChanged.bind(this);
        this.defaultData = this.defaultData.bind(this);
        this.renderSalons = this.renderSalons.bind(this);
        this._handleKeyPress = this._handleKeyPress.bind(this);
    }

    componentWillMount()
    {
        this.defaultData();
    }
    titleChanged(e)
    {
        this.state.keyword = e.target.value;
    }
    getSalons()
    {

        this.yelp.searchSalons(this.state.keyword, this.state.location)
            .then((response)=> {
                this.setState({salons: []});
                for(var i = 0; i < response.length; i++) {
                    if(response[i].name.toString().toLowerCase().includes(this.state.keyword.toLowerCase().substr(0,3)) && response[i].distance < 1500) {
                        this.setState({
                            salons: [response[i], ...this.state.salons]
                        });
                    }
                    else {
                        this.setState({
                            salons: [...this.state.salons, response[i]]
                        });
                    }
                    console.log(this.state.salons);
                }
            })
    }
    renderSalons()
    {

        let salons = this.state.salons.map((salons) =>
        {

            return <div className="card col-sm-3" adivgn="center">
                <div>
                    <a href={salons.name} className="card-title"><h4>{salons.name}</h4></a>
                </div>
                <div style={{width: '100%'}}>
                    <img className="card-img-top" width="200" height="200" src = {salons.image_url}/>
                </div>

                <p className="card-text">{salons.phone}</p>
                <span> <StarRatings
                    rating={salons.rating}
                    starDimension="20px"
                    starSpacing="2px"
                    starRatedColor="gold"
                /></span>

                <label>{salons.location.display_address[0]}&nbsp;
                    {salons.location.display_address[1]}&nbsp;
                    {salons.location.display_address[2]}
                    <span className="float-right">Distance :{parseFloat(salons.distance).toFixed(0)}m</span></label>

            </div>

        });

        return salons;

    }


    defaultData() {
        this.yelp.searchSalons('salons', this.state.location)
            .then((response)=> {
                for(var i = 0; i < 9; i++) {
                    // console.log(response[i]);
                    this.setState({
                        salons: [...this.state.salons, response[i]]
                    });
                    //console.log(this.state.salons);
                }
            })
    }

    _handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.getSalons();
        }
    }


    render() {
        return (
            <div>
                <div className="navbar navbar-dark bg-dark">
                    <div className="navbar-brand">
                        <h3>Pizzazz</h3>
                    </div>
                    <div className="navbar-text pull-right">
                        <Link to="/login"
                              className="login">
                            Login
                        </Link>
                        <Link to="/register" className = "input">Register</Link>
                    </div>
                </div>
                <div className="container-fluid align-content-center" >
                    <div className="mainbody">
                        <img className="logo" src={logo}/>
                        <div className="topBanner" ref="topBanner">

                            <div align="center">
                                <label className="search">
                                    <input onKeyPress={this._handleKeyPress} onChange={this.titleChanged} className="form-control" align="center" placeholder="Find Salons, Spas and more.."/>
                                </label>
                                <label align = "center"><button className="btn btn-danger" onClick={this.getSalons}>Search</button></label>
                            </div>
                            <div className="row">

                                <div className="col-2">
                                    <div onClick={(e) =>
                                    {
                                        this.state.keyword = "Spas";
                                        this.getSalons();
                                        this.refs.topBanner.style.paddingBottom = "2%";
                                    }}>
                                        <i className="fa fa-chevron-circle-right float-left"><label>Spas</label></i>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div onClick={(e) =>
                                    {
                                        this.state.keyword = "Haircuts";
                                        this.getSalons();
                                        this.refs.topBanner.style.paddingBottom = "2%";
                                    }}>
                                        <i className="fa fa-chevron-circle-right float-left"><label>Haircuts</label></i>
                                    </div>
                                </div><div className="col-2">
                                <div onClick={(e) =>
                                {
                                    this.state.keyword = "Skin Treatment";
                                    this.getSalons();
                                    this.refs.topBanner.style.paddingBottom = "2%";
                                }}>
                                    <i className="fa fa-chevron-circle-right float-left"><label> Skin Treatment</label></i>
                                </div>
                            </div><div className="col-2">
                                <div onClick={(e) =>
                                {
                                    this.state.keyword = "Massage";
                                    this.getSalons();
                                    this.refs.topBanner.style.paddingBottom = "2%";
                                }}>
                                    <i className="fa fa-chevron-circle-right float-left"><label>Massage</label></i>
                                </div>
                            </div><div className="col-2">
                                <div onClick={(e) =>
                                {
                                    this.state.keyword = "Facial";
                                    this.getSalons();
                                    this.refs.topBanner.style.paddingBottom = "2%";
                                }}>
                                    <i className="fa fa-chevron-circle-right float-left"><label>Facial</label></i>
                                </div>
                            </div><div className="col-2">
                                <div onClick={(e) =>
                                {
                                    this.state.keyword = "Styling";
                                    this.getSalons();
                                    this.refs.topBanner.style.paddingBottom = "2%";
                                }}>
                                    <i className="fa fa-chevron-circle-right float-left"><label> Styling</label></i>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {this.renderSalons()}
                    </div>
                </div>
            </div>
        );
    }
}