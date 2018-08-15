import React from 'react';
import ReactDOM from 'react-dom';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import YelpApiService from '../services/YelpServices'
import '../css/Home.css'
import logo from '../css/img/logo.png'
import logo1 from '../css/img/logo1.png'
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import {Link} from 'react-router-dom';

export default class Home extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            keyword: '',
            location: 'boston , ma',
            salons:[],
            options:[],
            value:'Select option'
        };
        this.titleChanged = this.titleChanged.bind(this);
        this.yelp = YelpApiService.instance;
        this.getOptions = this.getOptions.bind(this);
        this.handleChange=  this.handleChange.bind(this);
        this.searchBtn = React.createRef();
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
        return (
            <div className="align-content-center" >
                <div className="mainbody">
                    <img className="logo" src={logo} ref="logo"/>
                    <img width="150px" className="logo1" src={logo1} ref="logo1" />
                <div className="topBanner" ref="topBanner">

                <div align="center">
                    <label className="search">
                <input onChange={this.titleChanged} onFocus={this.titleChanged}  className="form-control" align="center" placeholder="Find Salons, Spas and more.." value={this.state.keyword}/>
                    </label>
                    <label align = "center" >
                        <Link className="btn btn-danger" ref="searchBtn" to={`/search/${this.state.keyword}`} onClick={() =>
                        { this.refs.topBanner.style.paddingBottom = "2%";
                            this.refs.topBanner.style.paddingTop = "2%";
                            this.refs.logo.style.visibility = 'hidden';
                            this.refs.logo1.style.visibility = 'visible';
                        }}>
                            Search</Link>
                    </label>
                    <div className="search">
                    <select style={{visibility: 'hidden'}} className="form-control" onFocusOff={() => this.refs.searchbar.size = 1} onChange={this.handleChange} value={this.state.value} ref="searchbar">
                           <option key='1' value='1'>Select ..</option>
                            {this.state.options.map(item => (
                                <option key={item.name} value={item.name}>
                                    {item}
                                </option>
                            ))}
                        </select>
                        </div>



                </div>
                    <div className="row">

                        <div className="col-2">
                            <Link className="category" to='/category/Spas' onClick={(e) =>
                            {
                                this.state.keyword = "Spas";
                                this.refs.topBanner.style.paddingBottom = "2%";
                                this.refs.topBanner.style.paddingTop = "2%";
                                this.refs.logo.style.visibility = 'hidden';
                                this.refs.logo1.style.visibility = 'visible';
                            }}>
                                <i className="fa fa-chevron-circle-right float-left"><label>Spas</label></i>
                            </Link>
                        </div>
                        <div className="col-2">
                            <Link className="category"  to='/category/Haircuts' onClick={(e) =>
                            {
                                this.state.keyword = "Haircuts";
                                this.refs.topBanner.style.paddingBottom = "2%";
                                this.refs.topBanner.style.paddingTop = "2%";
                                this.refs.logo.style.visibility = 'hidden';
                                this.refs.logo1.style.visibility = 'visible';
                            }}>
                                <i className="fa fa-chevron-circle-right float-left"><label>Haircuts</label></i>
                            </Link>
                        </div>
                        <div className="col-2">
                        <Link className="category" to='/category/Skin' onClick={(e) =>
                        {
                            this.state.keyword = "Skin Treatment";
                            this.refs.topBanner.style.paddingBottom = "2%";
                            this.refs.topBanner.style.paddingTop = "2%";
                            this.refs.logo.style.visibility = 'hidden';
                            this.refs.logo1.style.visibility = 'visible';
                        }}>
                            <i className="fa fa-chevron-circle-right float-left"><label> Skin Treatment</label></i>
                        </Link>
                    </div><div className="col-2">
                        <Link className="category" to='/category/Massage' onClick={(e) =>
                        {
                            this.state.keyword = "Massage";
                            this.refs.topBanner.style.paddingBottom = "2%";
                            this.refs.topBanner.style.paddingTop = "2%";
                            this.refs.logo.style.visibility = 'hidden';
                            this.refs.logo1.style.visibility = 'visible';
                        }}>
                            <i className="fa fa-chevron-circle-right float-left"><label>Massage</label></i>
                        </Link>
                    </div>
                        <div className="col-2">
                        <Link className="category" to='/category/Facial' onClick={(e) =>
                        {
                            this.state.keyword = "Facial";
                            this.refs.topBanner.style.paddingBottom = "2%";
                            this.refs.topBanner.style.paddingTop = "2%";
                            this.refs.logo.style.visibility = 'hidden';
                            this.refs.logo1.style.visibility = 'visible';
                        }}>
                            <i className="fa fa-chevron-circle-right float-left"><label>Facial</label></i>
                        </Link>
                    </div><div className="col-2">
                        <Link className="category" to='/category/Styling' onClick={(e) =>
                        {
                            this.state.keyword = "Styling";
                            this.refs.topBanner.style.paddingBottom = "2%";
                            this.refs.topBanner.style.paddingTop = "2%";
                            this.refs.logo.style.visibility = 'hidden';
                            this.refs.logo1.style.visibility = 'visible';
                        }}>
                            <i className="fa fa-chevron-circle-right float-left"><label> Styling</label></i>
                        </Link>
                    </div>
                    </div>
                </div>
                </div>
              </div>
        );
    }
}