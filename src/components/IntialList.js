import React from 'react'
import Salon from '../components/Salons'
import YelpApiService from "../services/YelpServices";
import $ from 'jquery';
export default class InitialList extends React.Component {

    constructor(props)
    {
        super(props);
        this.state = {
            keyword: '',
            location: 'boston , ma',
            salons:[]
        };
        this.renderSalons = this.renderSalons.bind(this);
        this.yelp = YelpApiService.instance;
        // this.getSalons = this.getSalons.bind(this);
        this.defaultData = this.defaultData.bind(this);
    }

    componentWillMount()
    {
        this.defaultData();
        $('.sidebar').css('visibility','visible');
        this.sort(this.props.location.search);
    }

    componentWillReceiveProps(newProps)
    {
        this.sort(newProps.location.search);
        if(newProps.salons !== undefined)
        this.setState({salons: newProps.salons});
    }
    renderSalons() {
        if(this.state.salons !== undefined) {
            let salons = this.state.salons.map((salons) => {
                return <Salon key={salons.id} salons={salons}/>
            });
            return salons;
        }
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
    sort(sortId)
    {
        switch(sortId)
        {
            case "?sort=ci":
            {
                let salons = this.state.salons;
                salons = salons.sort(function (a, b) {
                    if(a.price !== undefined && b.price !== undefined) {
                        return a.price.toString().length - b.price.toString().length;
                    }
                    else return 0;
                });
                this.setState({salons: salons});
                return;
            }
            case "?sort=cd": {
                let salons = this.state.salons;
                salons = salons.sort(function (a, b) {
                    if(a.price !== undefined && b.price !== undefined) {

                        return (b.price.toString().length - a.price.toString().length);
                    }
                    else return 0;
                });
                this.setState({salons: salons});
                return;
            }
            case "?sort=ra":
            {
                let salons = this.state.salons;
                salons = salons.sort(function (a, b) {
                    if(a.rating !== undefined && b.rating !== undefined)
                        return b.rating - a.rating;
                    else return 0;
                });
                this.setState({salons: salons});
                return;
            }
            case "?sort=op":
            {
                let salons = this.state.salons;
                salons = salons.sort(function (a, b) {
                    if(a.is_closed !== undefined && b.is_closed !== undefined)
                        return a.is_closed ? 1: -1;
                    else return 0;
                });
                this.setState({salons: salons});
                return;
            }
            default: return;

        }

    }
    render() {


        return (
            <div className="row">
                {this.renderSalons()}
            </div>
        );
    }
}