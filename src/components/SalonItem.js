import React from 'react';
import ReactDOM from 'react-dom';
import YelpApiService from "../services/YelpServices";
import '../css/SalonItem.css'
import StarRatings from '../../node_modules/react-star-ratings';
import {Link} from 'react-router-dom';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import '../../node_modules/bootstrap/scss/bootstrap.scss'
import SalonService from '../services/SalonService';
import UserService from '../services/UserService';
import $ from 'jquery';
import Review from './Review';
import Maps from './Maps';

export default class SalonItem extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            showReview: false,
            salonId: '',
            yelpreviews: [],
            comments: [],
            reviewz: [],
            salon: {photos: [],
                name:[],
                categories: [],
                location:
                    {display_address: [], cross_streets: '', address2: ""},
                hours: [],
                appointments: [],
                coordinates: {}},
            is_open_now: false,
            reviews: [],
            dateValue: new Date().toJSON().slice(0,10),
            timeValue: '',
            cssLoaded: false,
            currentUser : {},
            reviewCount: 0,
            loaded: false
        }

        this.yelp = YelpApiService.instance;
        this.getSalon = this.getSalon.bind(this);
        this.photos = this.photos.bind(this);
        this.categories = this.categories.bind(this);
        this.getTime = this.getTime.bind(this);
        this.getTimes = this.getTimes.bind(this);
        this.getReviews = this.getReviews.bind(this);
        this.getYelpReviews = this.getYelpReviews.bind(this);
        this.convertTime = this.convertTime.bind(this);
        this.getValue = this.getValue.bind(this);
        this.sendReview = this.sendReview.bind(this);
        this.toggleReview = this.toggleReview.bind(this);
        this.renderReviews = this.renderReviews.bind(this);
        this.renderYelpReviews = this.renderYelpReviews.bind(this);
        this.renderReview = this.renderReview.bind(this);
        this.renderComments = this.renderComments.bind(this);
        this.SalonService = SalonService.instance;
        this.UService = UserService.instance;
        this.loadMap = this.loadMap.bind(this);
    }

    componentDidMount()
    {
        this.setState({salonId: this.props.salonId});
        console.log(this.state.dateValue);
        import('../css/SalonItem.css');
        $('.topBanner').css('padding-top','2%');
        $('.topBanner').css('padding-bottom','0%');
        $('.logo').css('visibility','hidden');
        $('.logo1').css('visibility','visible');
    }
    componentWillReceiveProps (newProps)
    {
        this.setState({salonId: newProps.salonId});
        this.getSalon(newProps.salonId);
        this.getReviews(newProps.salonId);
        this.getYelpReviews(newProps.salonId);

    }

    componentWillUnmount()
    {
        if(this.props.history !== undefined && this.props.history.action === 'POP') {
            window.location.reload();
        }
    }

    getYelpReviews(salonId)
    {
        this.yelp.getReviews(salonId)
            .then(reviews => this.setState({yelpreviews: reviews.reviews}));
    }

    loadMap()
    {
        var _this = this;
        //wait for a paint to do scrolly stuff
        if(this.state.loaded === false) {
            window.requestAnimationFrame(function () {
                var node = ReactDOM.findDOMNode(_this);
                if (node !== undefined) {
                    //and scroll them!
                    _this.setState({loaded: true});
                }
            });
        }

    }
    renderYelpReviews()
    {
        let reviews = this.state.yelpreviews.map((review) => {
            return <li className="list-group-item yelpreviewz">
                {review.user.image_url!== null && <img className="image" height="60px" width="60px" src={review.user.image_url}/>}
                {review.user.image_url === null && <img className="image" height="60px" width="60px" src='http://strongvoicespublishing.com/wp-content/uploads/2017/06/user.png'/>}

                <b style={{fontStyle: "Verdana"}}>{review.user.name}</b>
                <StarRatings
                    rating={review.rating}
                    starDimension="30px"
                    starSpacing="2px"
                    starRatedColor="red"
                />
                <p>{review.text}</p></li>
        })
        return reviews;
    }




    toggleReview() {
        this.UService.findCurrentUser()
            .then(user => {
                if(user.id !== 0 ) {
                    this.setState({
                        showReview: !this.state.showReview
                    });
                }
                else {
                    alert("Please log in to post a review");
                }
            })

    }

    getSalon(salonId)
    {
        this.yelp.getSalon(salonId)
            .then(salon => this.setState({salon: salon}));

    }


    renderReviews() {
        let rev = [];
        let comments = [];
        this.state.reviews.map((review) => {
            this.UService.findProfileById(review.reviewerId)
                .then((user) => {
                    if(user.role.localeCompare("reviewer") !== 0)
                    {
                        review.user = user;
                        comments = [...comments, review];
                        this.setState({comments: comments});
                    }
                    else {
                        review.user = user;
                        rev = [...rev, review];
                        this.setState({reviewz: rev});
                    }
                });
            console.log(rev);
        });



    }
    renderComments() {
        let rev = this.state.comments.map((review) => {
            if(review!= undefined && review.user!== undefined) {
                return <li className="list-group-item reviewz">
                    {review.user.image !== null &&
                    <img className="image" height="60px" width="60px" src={review.user.image}/>}
                    {review.user.image === null && <img className="image" height="60px" width="60px"
                                                        src='http://strongvoicespublishing.com/wp-content/uploads/2017/06/user.png'/>}

                    <Link to={`/profiles/${review.user.id}`}><b style={{fontStyle: "Verdana"}}>{review.user.username}</b></Link>
                    <StarRatings
                        rating={review.rating}
                        starDimension="30px"
                        starSpacing="2px"
                        starRatedColor="red"/>
                    <p>{review.comment}</p></li>
            }
        });
        console.log("rev "+rev.length);
        return rev;
    }

     renderReview() {

                    let rev = this.state.reviewz.map((review) => {
                        if(review!= undefined && review.user!== undefined) {
                            return <li className="list-group-item reviewz">
                                {review.user.image !== null &&
                                <img className="image" height="60px" width="60px" src={review.user.image}/>}
                                {review.user.image === null && <img className="image" height="60px" width="60px"
                                                                    src='http://strongvoicespublishing.com/wp-content/uploads/2017/06/user.png'/>}

                                <Link to={`/profiles/${review.user.id}`}><b style={{fontStyle: "Verdana"}}>{review.user.username}</b></Link>
                                <StarRatings
                                    rating={review.rating}
                                    starDimension="30px"
                                    starSpacing="2px"
                                    starRatedColor="red"/>
                                <p>{review.comment}</p></li>
                        }
                    });
         if(rev.length === 0)
             rev = <h4> No Reviews yet!</h4>
        return rev;
    }

    photos()
    {

        let photos = this.state.salon.photos.map((photo) =>
        {
            return <img ref = "img" className="image" height="200px" width="200px" src={photo}/>
        });

        return photos;
    }

    categories()
    {
        let categorie = this.state.salon.categories.map((categories) =>
        {
            return <Link onClick ={() => this.setState({cssLoaded: true})} className="category1" to={`/category/${categories.title}`}>{categories.title}</Link>
        });
        return categorie;
    }

    getTime()
    {
        var now = new Date();
        var today = now.getDay();
        var hour = "" + now.getHours(); if (hour.length == 1) { hour = "0" + hour; }
        var minute = "" + now.getMinutes(); if (minute.length == 1) { minute = "0" + minute; }

        var time = hour + minute;
         // this.state.is_open_now = !this.state.salon.closed_now;
        if(this.state.salon.hours !== undefined && this.state.salon.hours.length > today) {
            let hours = this.state.salon.hours[0].open;
            let start = hours[today].start;
            let end = hours[today].end;
            console.log(start);
            console.log(end);
            console.log(time);
            if(time > start && time < end)
                this.state.is_open_now = true;
            else
                this.state.is_open_now = false;
            start = start.substr(0,2) > 12 ? start.substr(0,2)- 12 + ':' + start.substr(2,2) + 'pm' : start.substr(0,2) + ':' + start.substr(2,2) + 'am';
            end = end.substr(0,2) > 12 ? end.substr(0,2)- 12 + ':' + end.substr(2,2) + 'pm' : end.substr(0,2) + ':' + end.substr(2,2) + 'am';
            return <span> Today:  <b>{start} - {end}</b></span>;
        }
        else if(this.state.salon.hours !== undefined && this.state.salon.hours.length >0 && this.state.is_open_now) {
            let hours = this.state.salon.hours[0].open;
            let start = hours[0].start;
            let end = hours[0].end;
            console.log(start);
            console.log(end);
            console.log(time);
            if(time > start && time < end)
                this.state.is_open_now = true;
            else
                this.state.is_open_now = false;
            start = start.substr(0,2) > 12 ? start.substr(0,2)- 12 + ':' + start.substr(2,2) + 'pm' : start.substr(0,2) + ':' + start.substr(2,2) + 'am';
            end = end.substr(0,2) > 12 ? end.substr(0,2)- 12 + ':' + end.substr(2,2) + 'pm' : end.substr(0,2) + ':' + end.substr(2,2) + 'am';
            return <span> Today:  <b>{start} - {end}</b></span>;
        }
    }

    sendReview(rating, comment)
    {
        let review;
        this.SalonService.findSalonByYelpId(this.state.salonId)
            .then(salon => {
                if (salon.id === 0){
                    this.SalonService.createApiSalon(this.state.salonId, this.state.salon.name)
                        .then(salon => {
                            this.UService.findCurrentUser()
                                .then(user => {
                                    this.setState({
                                        customer: user
                                    });
                                })
                            review = {
                                rating: rating,
                                comment: comment,
                                salon: salon,
                                customer : this.state.customer
                            }
                            this.SalonService.createReview(review)
                                .then(review => {
                                    console.log(review);
                                    window.location.reload();
                                })
                        })
                }
                else {
                    this.UService.findCurrentUser()
                        .then(user => {
                            this.setState({
                                customer: user
                            });
                        })

                    this.SalonService.getSalonReviews(salon.id)
                        .then(reviews =>{
                            console.log(this.state.like);
                            review = {
                                rating: rating,
                                comment: comment,
                                salon: salon,
                                customer : this.state.customer

                            }
                            reviews = [...reviews, review];
                            this.SalonService.updateReviews(reviews)
                                .then(response => {
                                    console.log(response);
                                    window.location.reload();
                                })
                    })
                }
            });

        setTimeout(() => $('.post').html('Posted') , 2000);
        setTimeout(this.toggleReview, 3000);
    }
    getReviews(salonId)
    {
        let review;
        this.SalonService.findSalonByYelpId(salonId)
            .then(salon => {
                if (salon.id !== 0){
                    this.SalonService.getSalonReviews(salon.id)
                        .then(reviews =>{
                            // if(reviews.reviewerId)
                            this.setState({reviews: reviews});
                            this.setState({reviewCount: reviews.length});
                            this.renderReviews();
                            this.loadMap();
                    })
                }
            });
    }

    convertTime(time){
        if(time.length === 3)
            time = '0'+ time;
        return time.substr(0,2) > 12 ? time.substr(0,2)- 12 + ':' + time.substr(2,2) + 'pm' : time.substr(0,2) + ':' + time.substr(2,2) + 'am';
    }

    getTimes() {
        var today = new Date().getDay();
        this.state.is_open_now = !this.state.salon.closed_now;
        var hours;
        var start;
        var end;
        if(this.state.salon.hours.length > today) {
           hours = this.state.salon.hours[0].open;
           start = parseInt(hours[today].start);
           end = parseInt(hours[today].end);
        }
        else if(this.state.salon.hours.length >0 && this.state.is_open_now) {
            hours = this.state.salon.hours[0].open;
            start = parseInt(hours[0].start);
            end = parseInt(hours[0].end);
        }
        let start1 = [];
        let end1 = [];
        let options;
        for (let i = start; i <= end; i = i + 100) {
            start1 = [...start1, i];
            end1 = [...end1, i + 100];
        }

        options = start1.map((start,index)=> {
        if(index === 0)
        {
            return <option selected value={start}>{this.convertTime(String(start))} - {this.convertTime(String(start + 100))}</option>
        }
        else {
            return <option value={start}>{this.convertTime(String(start))} - {this.convertTime(String(start + 100))}</option>
        }
        })
        return options;
    }

    getValue(date, time) {
        this.UService.findCurrentUser()
            .then(user => {
                if(user.id !== 0 ) {
                    let appoint;
                    if (time === ""){
                        alert('select time')
                    }
                    else {
                        this.SalonService.findSalonByYelpId(this.state.salonId)
                            .then(salon => {
                                if (salon.id === 0){
                                    this.UService.findCurrentUser()
                                        .then(user => {
                                            this.setState({
                                                customer: user
                                            });
                                        })
                                    this.SalonService.createApiSalon(this.state.salonId, this.state.salon.name)
                                        .then(salon => {
                                            appoint = {
                                                time: time,
                                                date: date,
                                                salon: salon,
                                                customer: this.state.customer
                                            };
                                            this.SalonService.createAppointment(appoint)
                                                .then(appt => {
                                                    console.log(appt);
                                                })
                                        })
                                }
                                else {
                                    this.SalonService.getSalonApp(salon.id)
                                        .then(appts =>{
                                            console.log(appts)
                                            for(let appt in appts){
                                                if (appts[appt].time === time && appts[appt].date === date){
                                                    alert('appointment not available select different date and time');
                                                    return;
                                                }
                                            }
                                            console.log(appts);
                                            this.UService.findCurrentUser()
                                                .then(user => {
                                                    this.setState({
                                                        customer: user
                                                    });
                                                })
                                            appoint = {
                                                time: time,
                                                date: date,
                                                salon: salon,
                                                customer: this.state.currentUser
                                            }
                                            appts = [...appts, appoint];
                                            this.SalonService.updateAppointments(appts)
                                                .then(appts => {
                                                    console.log(appts);
                                                    alert('Appointment Booked')
                                                })


                                        })
                                }
                            });
                    }
                }
                else {
                    alert("Please log in to book an appointment");
                }
            })

    }

    handleTimeChange = (event) => {
        this.setState({ timeValue: event.target.value });
    }

    handleDateChange = (event) => {
        this.setState({ dateValue: event.target.value });
    }

    render () {
        if (this.state.cssLoaded === false) {
            this.state.cssLoaded = true;
            import('../css/SalonItem.css');
        }

        return (
            <div className="item container-fluid">
                <div className="row">
                    <div className="col-4 col-lg-4 col-sm-12">
                        <h1>{this.state.salon.name}</h1>
                        <span> <StarRatings
                            rating={this.state.salon.rating}
                            starDimension="30px"
                            starSpacing="2px"
                            starRatedColor="gold"/>
                        </span>
                        <span><h4>Reviews {this.state.reviewCount}</h4></span>
                        <span>
                            <button className="btn btn-danger" onClick={this.toggleReview}>
                        <StarRatings rating= {1.0} starDimension="25px"
                                     starRatedColor="white" numberOfStars="5"/>Write a Review</button>
                            {this.state.showReview ? <Review sendReview={this.sendReview} salon={this.state.salon} close={this.toggleReview}/>: null }</span>

                        <div style={{marginTop: '10px'}}>
                            <span className="float-left" style={{marginRight: "10px"}}>{this.state.salon.price}</span>
                            <span>{this.categories()}</span>
                        </div>
                        <div className="card col-12 col-sm-12 col-lg-10">
                            {this.state.loaded && <div className="card-img-top" style={{width: '300px' , height: '100px',padding: '0%'}}>
                                    <Maps lat = {this.state.salon.coordinates.latitude} lng={this.state.salon.coordinates.longitude}/>
                            </div>}

                        </div>
                        <ul className="list-group">
                            <h1>Reviews</h1>
                            {this.renderReview()}
                        </ul>
                    </div>


                        <div className="col-8 col-lg-8 col-sm-12 list-group">
                            <div className="list-group-item">
                                {this.photos()}
                            </div>
                            <div className="side">
                                <div className="card" style={{ marginLeft: '20%' , width: '40%', height: '30%'}}>
                                    <div className="card-text">
                                        <h3> <i className="fa fa-location-arrow"/> Address</h3>
                                        {this.state.salon.location.display_address[0]},
                                        &nbsp; {this.state.salon.location.display_address[1]}, &nbsp;
                                        {this.state.salon.location.cross_streets}</div>

                                <span className="card-text" style={{fontSize: "large"}}><i className="fa fa-phone"></i>&nbsp;{this.state.salon.phone}</span>
                                </div>
                                <div className="row timing container-fluid">
                                    <label><i className="fa fa-calendar-times-o fa-2x"/> Make an Appointment</label>
                                    <div style={{alignContent: "center" ,margin: '5%'}}>
                                        <input className="form-control" type="date"
                                               onChange={this.handleDateChange}
                                               value={this.state.dateValue}/>
                                        <div>
                                            <select className="form-control" id = "dropdown"
                                                    onChange={this.handleTimeChange}
                                                    value={this.state.timeValue}>
                                                <option>select time</option>
                                                {this.getTimes()}
                                            </select>
                                        </div>

                                    </div>
                                    <div className="submit">
                                        <button onClick={() => {this.getValue(this.state.dateValue, this.state.timeValue)}}
                                                className="btn btn-success float-md-left">Reserve</button>
                                    </div>
                                </div>
                                <div className="row timing">
                                    <div className="clock"><i className="fa fa-clock-o fa-2x"></i>
                                    </div>
                                    <div className="time col-sm-9 ">
                                        <ul className="time list-group">
                                            <li className="list-group-item time-text">{this.getTime()}</li>
                                            <li className="list-group-item time-text" style={{color: "red", fontSize: "small", fontStyle: 'bold'}}>{this.state.is_open_now && <p>Open now</p>}
                                                {!this.state.is_open_now && <p>Closed now</p>}</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="row timing">
                                    <div className="clock"><i className="fa fa-dollar fa-2x"></i>
                                    </div>
                                    <div className="time col-sm-9 ">
                                        <ul className="time list-group">
                                            <li className="list-group-item time-text">Price Range</li>
                                            {this.state.salon.price === '$$$$' &&<li className="list-group-item time-text" style={{color: "red", fontSize: "small"}}>Ultra High-end</li>}
                                            {this.state.salon.price === '$$$' &&<li className="list-group-item time-text" style={{color: "red", fontSize: "small"}}>Pricey</li>}
                                            {this.state.salon.price === '$$' &&<li className="list-group-item time-text" style={{color: "red", fontSize: "small"}}>Moderate</li>}
                                            {this.state.salon.price === '$' &&<li className="list-group-item time-text" style={{color: "red", fontSize: "small"}}>Inexpensive</li>}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <ul className="list-group">
                    <h1>Comments</h1>
                        {this.renderComments()}
                    {this.renderYelpReviews()}

                    </ul>
                    </div>
                </div>
        )
    }
}