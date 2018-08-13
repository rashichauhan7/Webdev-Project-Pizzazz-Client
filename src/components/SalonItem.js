import React from 'react';
import YelpApiService from "../services/YelpServices";
import '../css/SalonItem.css'
import StarRatings from '../../node_modules/react-star-ratings';
import {Link} from 'react-router-dom';
export default class SalonItem extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            salonId: '',
            salon : { photos : [], categories:[], location: {display_address: [], cross_streets : ''}}
        }
        this.yelp = YelpApiService.instance;
        this.getSalon = this.getSalon.bind(this);
        this.photos = this.photos.bind(this);
        this.categories = this.categories.bind(this);
    }


    componentDidMount()
    {
        this.setState({salonId: this.props.salonId});

    }
    componentWillReceiveProps (newProps)
    {
        this.setState({salonId: newProps.salonId});
        this.getSalon(newProps.salonId);
    }

    getSalon(salonId)
    {
        this.yelp.getSalon(salonId)
            .then(salon => this.setState({salon: salon}));
    }


    photos()
    {
        let photos = this.state.salon.photos.map((photo) =>
        {
            return <img className="image" height="200px" width="200px" src={photo}/>
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
                   <StarRatings rating= {1.0} starDimension="30px"
                                starRatedColor="white" numberOfStars="5"/>Write a Review</button></span>

                      <div style={{marginTop: '10px'}}>
                          <span className="float-left" style={{marginRight: "10px"}}>{this.state.salon.price}</span>
                          <span>{this.categories()}</span>
                      </div>
                    <div className="card col-lg-12">
                        <div style={{width: '100%'}}>
                        <img className="card-img-top" src="https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=13&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&key=AIzaSyCzl1R3lOawX15aFS8OIBZsGDnoJXAkpQo"/>
                        </div>
                        <h4 className="card-text">{this.state.salon.location.display_address[0]}, &nbsp; {this.state.salon.location.display_address[1]}</h4>
                        <p className="card-text">{this.state.salon.location.cross_streets}</p>

                        <p className="card-text">{this.state.salon.phone}</p>
                    </div>

                </div>
               <div className="col-8">
                   {this.photos()}
               </div>


               </div>
           </div>
        )
    }
}