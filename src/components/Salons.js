import React from 'react';
import {Link} from 'react-router-dom';
import StarRatings from '../../node_modules/react-star-ratings';

export default class Salon extends React.Component{

    constructor(props)
    {
        super(props);
        this.state =
            {
                salons: {}
            }
    }

    componentDidMount()
    {
        this.setState({salonId: this.props.salons.id});
    }
    componentWillReceiveProps (newProps)
    {
        this.setState({salonId: newProps.salons.id});
    }
    render () {
        return (
            <div className="card col-sm-3" align="center">
                <div style={{width: '100%'}}>
                    <img className="card-img-top" width="20%" height="250px" src = {this.props.salons.image_url}></img>
                </div>
                <div>
                    <Link to={`/salon/${this.props.salons.id}`} className="card-title">
                        <h4>{this.props.salons.name}</h4>
                    </Link>
                </div>
                <span>
                    <StarRatings
                    rating={this.props.salons.rating}
                    starDimension="20px"
                    starSpacing="2px"
                    starRatedColor="gold"
                /></span>



            </div>
        );
    }

}