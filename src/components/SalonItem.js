import React from 'react';
import YelpApiService from "../services/YelpServices";
import '../css/SalonItem.css'
import StarRatings from '../../node_modules/react-star-ratings';
import {Link} from 'react-router-dom';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import '../../node_modules/bootstrap/scss/bootstrap.scss'
export default class SalonItem extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            salonId: '',
            salon: {photos: [], categories: [], location: {display_address: [], cross_streets: ''}, hours: []},
            is_open_now: true,
            reviews: []
        }

        this.yelp = YelpApiService.instance;
        this.getSalon = this.getSalon.bind(this);
        this.photos = this.photos.bind(this);
        this.categories = this.categories.bind(this);
        this.getTime = this.getTime.bind(this);
        this.getReviews = this.getReviews.bind(this);
    }


    componentDidMount()
    {
        this.setState({salonId: this.props.salonId});


    }
    componentWillReceiveProps (newProps)
    {
        this.setState({salonId: newProps.salonId});
        this.getSalon(newProps.salonId);
        this.getReviews(newProps.salonId);
    }

    getSalon(salonId)
    {
        this.yelp.getSalon(salonId)
            .then(salon => this.setState({salon: salon}));

    }

    getReviews(salonId)
    {
        this.yelp.getReviews(salonId)
            .then(reviews => this.setState({reviews: reviews.reviews}));
    }

    renderReviews()
    {
        let reviews = this.state.reviews.map((review) => {
            return <li className="list-group-item reviews">
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
            return <Link className="category1" to={`/category/${categories.title}`}>{categories.title}</Link>
        });
        return categorie;
    }

    getTime()
    {
        if(this.state.salon.hours.length > 0) {
            let hours = this.state.salon.hours[0].open;
            var today = new Date().getDay();
            this.state.is_open_now = this.state.salon.hours[0].is_open_now;
            let start = hours[today].start;
            let end = hours[today].end;
            start = start.substr(0,2) > 10 ? start.substr(0,2)- 12 + ':' + start.substr(2,2) + 'pm' : start.substr(0,2) + ':' + start.substr(2,2) + 'am';
            end = end.substr(0,2) > 10 ? end.substr(0,2)- 12 + ':' + end.substr(2,2) + 'pm' : end.substr(0,2) + ':' + end.substr(2,2) + 'am';
            return <span> Today <b>{start} - {end}</b></span>;
        }
    }

    render () {
        return (
           <div className="item container-fluid">
               <div className="row">
                   <div className="col-4">
               <h1>{this.state.salon.name}</h1>
               <span> <StarRatings
                   rating={this.state.salon.rating}
                   starDimension="30px"
                   starSpacing="2px"
                   starRatedColor="gold"
               />
               </span>
               <span><h4>Reviews {this.state.salon.review_count}</h4></span>
               <span><button className="btn btn-danger ">
                   <StarRatings rating= {1.0} starDimension="25px"
                                starRatedColor="white" numberOfStars="5"/>Write a Review</button></span>

                      <div style={{marginTop: '10px'}}>
                          <span className="float-left" style={{marginRight: "10px"}}>{this.state.salon.price}</span>
                          <span>{this.categories()}</span>
                      </div>
                    <div className="card col-lg-10">
                        <div style={{width: '100%' ,padding: '0%'}}>
                        <img className="card-img-top" height="250px" src={'https://maps.googleapis.com/maps/api/staticmap?center='+
                        this.state.salon.location.display_address[0] + ','
                        + this.state.salon.location.display_address[0] +
                        '&zoom=13&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&key=AIzaSyBp8gPpJ1UADCI1B4jc9JWkC4378KYtdTc'}/>
                        </div>
                        <h5 className="card-text">{this.state.salon.location.display_address[0]}, &nbsp; {this.state.salon.location.display_address[1]}</h5>
                        <span className="card-text">{this.state.salon.location.cross_streets}</span>

                        <span className="card-text" style={{fontSize: "large"}}><i className="fa fa-phone"></i>&nbsp;{this.state.salon.phone}</span>
                    </div>

                </div>
               <div className="col-8">
                  <div>
                   {this.photos()}
                  </div>
                   <div className="side">
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
                       {this.renderReviews()}
                   </ul>

               </div>
           </div>
        )
    }
}