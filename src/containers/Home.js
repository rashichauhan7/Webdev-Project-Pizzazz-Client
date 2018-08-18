import React from 'react';
import ReactDOM from 'react-dom';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import YelpApiService from '../services/YelpServices'
import logo from '../css/img/logo3.png'
import logo1 from '../css/img/logo3.png'
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import Login from '../components/Login'
import Register from '../components/Register'
import {Link} from 'react-router-dom';
import $ from 'jquery';
import UserService from "../services/UserService";

export default class Home extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            keyword: '',
            location: 'boston , ma',
            salons:[],
            options:[],
            value:'Select option',
            showLogin: false,
            showSignUp: false,
            mainPage: true,
            user: { username: ''},
            cssLoaded: false
        };
        this.titleChanged = this.titleChanged.bind(this);
        this.yelp = YelpApiService.instance;
        this.userService = UserService.instance;
        this.getOptions = this.getOptions.bind(this);
        this.handleChange=  this.handleChange.bind(this);
        this.searchBtn = React.createRef();
        this.toggleSignUpPopup = this.toggleSignUpPopup.bind(this);
        this.toggleLoginPopup = this.toggleLoginPopup.bind(this);
    }

    componentDidMount()
    {

        this.userService.findCurrentUser()
            .then((user) => {this.setState({user: user});
                if(user.username !== undefined){
                    $('.login').css('visibility', 'hidden');
                    $('.register').css('visibility', 'hidden');
                    $('.loggedIn').css('visibility', 'visible');
                }});
    }


    componentWillReceiveProps(newProps)
    {
        this.userService.findCurrentUser()
            .then((user) => {this.setState({user: user});
            if(user !== ''){
                $('.login').css('visibility', 'hidden');
                $('.loggedIn').css('visibility', 'visible');
            }});
    }
    toggleSignUpPopup() {
        this.setState({
            showSignUp: !this.state.showSignUp
        });
    }
    toggleLoginPopup() {
        this.setState({
            showLogin: !this.state.showLogin
        });
    }

    titleChanged(e)
    {
        this.setState({keyword:e.target.value});
        this.getOptions(e.target.value);
        this.refs.searchbar.style.visibility = 'visible';

    }

    getOptions(keyword)
    {
let options = [];
        this.yelp.getAutocomplete(keyword, "en_US")
            .then((search) => {
                search.map((category) => {
                    options = [...options, category.title];
                })
                this.setState({options: options});
                console.log(this.state.options);
                this.refs.searchbar.size = this.state.options.length+ 1;
            });
    }

    handleChange = (event) => {

        this.setState({ value: event.target.value });
        this.setState({ keyword: event.target.value });
        this.refs.searchbar.size = 1;
        var homeLink = ReactDOM.findDOMNode(this.refs.searchBtn);
        homeLink.focus();
    };


    render() {
        if (this.state.cssLoaded === false) {
            this.state.cssLoaded = true;
            import('../css/Home.css');
        }


        return (
            <div className="align-content-center" ref="maincontent">
                <div className="mainbody">
                    <img className="logo" src={logo} ref="logo"/>
                    <img width='10%' height="15%" className="logo1" src={logo1} ref="logo1" />
                <div className="topBanner" ref="topBanner">
                    <button className="btn login" onClick={this.toggleLoginPopup}>Login</button>
                    <button className="btn loggedIn"><Link to='/profile'>{this.state.user.username}</Link></button>
                    <button className="btn register" onClick={this.toggleSignUpPopup}>Sign Up</button>
                    {this.state.showLogin ? <Login close={this.toggleLoginPopup} maincontent={this.maincontent}/>: null }
                    {this.state.showSignUp ? <Register close={this.toggleSignUpPopup}/>: null}
                    <div align="center">
                    <label className="search">
                <input onChange={this.titleChanged} onFocus={this.titleChanged}  className="form-control" align="center" placeholder="Find Salons, Spas and more.." value={this.state.keyword}/>
                    </label>
                    <label align = "center">
                        <Link className="searchbtn btn btn-danger" ref="searchBtn" to={`/search/${this.state.keyword}`} onClick={() =>
                        {
                            this.refs.logo.style.visibility = 'hidden';
                            this.refs.logo1.style.visibility = 'visible';
                            var homeLink = ReactDOM.findDOMNode(this.refs.searchBtn);
                            // homeLink.focus(false);
                        }}>
                            <i className="fa fa-search fa-2x"/> </Link>
                    </label>
                    <div className="search">
                    <select style={{visibility: 'hidden'}} className="form-control" onFocusOff={() => this.refs.searchbar.size = 1}
                            onChange={this.handleChange} value={this.state.value} ref="searchbar">
                           <option key='1' value=''>Categories ..</option>
                            {this.state.options.map(item => (
                                <option key={item.name} value={item.name}>
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                    <div className="nav nav-pills categories">

                        <div className="nav-item" onClick={(e) =>
                        {
                            this.state.keyword = "Spas";
                            this.refs.logo.style.visibility = 'hidden';
                            this.refs.logo1.style.visibility = 'visible';

                        }}>
                            <Link onClick={(e) => {
                                $('.nav-item').removeClass('active');

                                //Add active class to the clicked item
                                $(e.target).parent().parent().addClass('active');

                            }}
                                  className="category" to='/category/Spas' >
                             <label>Spas</label>
                            </Link>
                        </div>
                        <div className="nav-item" onClick={(e) =>
                        {
                            this.state.keyword = "Haircuts";
                            this.refs.logo.style.visibility = 'hidden';
                            this.refs.logo1.style.visibility = 'visible';
                        }}>
                            <Link className="category" onClick={(e) => {
                                $('.nav-item').removeClass('active');

                                //Add active class to the clicked item
                                $(e.target).parent().parent().addClass('active');

                            }}  to='/category/Haircuts' >
                               <label>Haircuts</label>
                            </Link>
                        </div>
                        <div className="nav-item"onClick={(e) =>
                        {
                            this.state.keyword = "Skin Treatment";
                            this.refs.logo.style.visibility = 'hidden';
                            this.refs.logo1.style.visibility = 'visible';
                        }}>
                        <Link className="category" onClick={(e) => {
                            $('.nav-item').removeClass('active');

                            //Add active class to the clicked item
                            $(e.target).parent().parent().addClass('active');

                        }} to='/category/Skin'>
                            <label> Skin Treatment</label>
                        </Link>
                    </div><div className="nav-item" onClick={(e) =>
                    {
                        this.state.keyword = "Massage";
                        this.refs.logo.style.visibility = 'hidden';
                        this.refs.logo1.style.visibility = 'visible';
                    }}>
                        <Link className="category" onClick={(e) => {
                            $('.nav-item').removeClass('active');

                            //Add active class to the clicked item
                            $(e.target).parent().parent().addClass('active');

                        }} to='/category/Massage' >
                            <label>Massage</label>
                        </Link>
                    </div>
                        <div className="nav-item" onClick={(e) =>
                        {
                            this.state.keyword = "Facial";
                            this.refs.logo.style.visibility = 'hidden';
                            this.refs.logo1.style.visibility = 'visible';
                        }}>
                        <Link className="category" onClick={(e) => {
                            $('.nav-item').removeClass('active');

                            //Add active class to the clicked item
                            $(e.target).parent().parent().addClass('active');

                        }} to='/category/Facial' >
                            <label>Facial</label>
                        </Link>
                    </div><div className="nav-item"  onClick={(e) =>
                    {
                        this.state.keyword = "Styling";
                        this.refs.logo.style.visibility = 'hidden';
                        this.refs.logo1.style.visibility = 'visible';
                    }}>
                        <Link className="category" onClick={(e) => {
                            $('.nav-item').removeClass('active');

                            //Add active class to the clicked item
                            $(e.target).parent().parent().addClass('active');

                        }} to='/category/Styling'>
                           <label> Styling</label>
                        </Link>
                    </div>
                    </div>
                    <div id = 'sidebar' className="sidebar w3-sidebar w3-bar-block"  >
                        <h4 className="w3-bar-item"><b>Filters</b></h4>
                        <h5 className='w3-bar-item active'>Sort by:</h5>
                        <Link to="?sort=ci" className="w3-bar-item w3-button" onClick={(e) => {
                            $('.w3-bar-item').removeClass('active');

                            //Add active class to the clicked item
                            $(e.target).addClass('active');

                        }} >Cost Increasing</Link>
                        <Link to="?sort=cd" className="w3-bar-item w3-button" onClick={(e) => {
                            $('.w3-bar-item').removeClass('active');

                            //Add active class to the clicked item
                            $(e.target).addClass('active');

                        }} >Cost Decreasing</Link>
                        <Link to="?sort=ra" className="w3-bar-item w3-button" onClick={(e) => {
                            $('.w3-bar-item').removeClass('active');

                            //Add active class to the clicked item
                            $(e.target).addClass('active');

                        }} >Rating</Link>
                        <Link to="?sort=op" className="w3-bar-item w3-button" onClick={(e) => {
                            $('.w3-bar-item').removeClass('active');

                            //Add active class to the clicked item
                            $(e.target).addClass('active');

                        }} >Open Now</Link>
                    </div>
                </div>
                </div>

              </div>
        );
    }
}

