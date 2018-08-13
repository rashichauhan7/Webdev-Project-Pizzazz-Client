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
                <div>
                    <Link to={`/salon/${this.props.salons.id}`} className="card-title">
                        <h4>{this.props.salons.name}</h4>
                    </Link>
                </div>
                <div style={{width: '100%'}}>
                    <img className="card-img-top" width="200" height="200" src = {this.props.salons.image_url}></img>
                </div>

                <p className="card-text">{this.props.salons.phone}</p>
                <span> <StarRatings
                    rating={this.props.salons.rating}
                    starDimension="20px"
                    starSpacing="2px"
                    starRatedColor="gold"
                /></span>

                <label>{this.props.salons.location.display_address[0]}&nbsp;
                    {this.props.salons.location.display_address[1]}&nbsp;
                    {this.props.salons.location.display_address[2]}
                    <span className="float-right">Distance :{parseFloat(this.props.salons.distance).toFixed(0)}m</span></label>

            </div>
        );
    }

}