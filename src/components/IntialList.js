import React from 'react'
import Salon from '../components/Salons'
import YelpApiService from "../services/YelpServices";
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
    }

    componentWillReceiveProps(newProps)
    {
        this.setState({salons: newProps.salons})
    }
    renderSalons() {
        let salons = this.state.salons.map((salons) => {
            return <Salon key={salons.id} salons={salons}/>
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
    render() {


        return (
            <div className="row">
                {this.renderSalons()}
            </div>
        );
    }
}