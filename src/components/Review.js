import React from 'react';
import SalonService from "../services/SalonService";
import '../css/Review.css'
import StarRating from 'react-star-ratings';
import $ from "jquery";
export default class Review extends React.Component {
    constructor(props)
    {
        super(props);
        this.salonService = SalonService.instance;
        this.state = {
            rating: 0,
            comment: ''
        };
        this.changeRating = this.changeRating.bind(this);
    }

    changeRating( newRating, name ) {
        this.setState({
            rating: newRating
        });
    }

    componentDidMount()
    {
        $('.topBanner').css('pointer-events','none');
        $('.reviewcomponent').css('pointer-events','auto');
    }

    componentWillUnmount()
    {
        $('.topBanner').css('pointer-events','auto');
    }
render() {
        return (
            <div className="popup reviewcomponent">
                <button onClick={this.props.close} className="btn btn-danger float-right closeBtn"><i className="fa fa-close"/>
                </button>
                <h1 style={{color: 'black', margin: '2%'}}>{this.props.salon.name}</h1>
                <div style={{border: '1px solid lightgray', width: '90%', height: '60%', margin: '5%', borderRadius: '2px'}}>

                    <StarRating  rating={this.state.rating}
                                 starRatedColor="red"
                                 starDefaultColor="gray"
                                 changeRating={this.changeRating}
                                 numberOfStars={5}
                                 name='rating'></StarRating>
                    <span style={{fontSize: 'large', padding: '2%'}}>Select your Rating</span>
                    <textarea onChange={(e)=> this.setState({comment: e.target.value})} value={this.state.comment} style={{ resize: 'none', padding: '2%',
                        width: '100%' ,height: '75%', textDecorationColor: 'lightgray', border: 'none', marginTop: '2%'
                    }} placeholder="Your review helps others learn about great local businesses.
                    Please don't review this business if you received a freebie for writing this review,
                     or if you're connected in any way to the owner or employees."></textarea>
                    <button onClick={() => this.props.sendReview(this.state.rating, this.state.comment)} style={{ marginTop: '1%'}} className="btn btn-danger float-left">Post Comment</button>
                </div>
            </div>
        )
}

}
