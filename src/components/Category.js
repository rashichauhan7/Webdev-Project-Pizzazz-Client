import React from 'react'
import YelpApiService from "../services/YelpServices";
import Salon from "../components/Salons"
export default class Category extends React.Component {

    constructor(props)

    {

        super(props);

        this.selectCategory = this.selectCategory.bind(this);

        this.componentDidMount = this.componentDidMount.bind(this);

        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
        this.renderSalons = this.renderSalons.bind(this);
        this.yelp = YelpApiService.instance;
        this.getSalons = this.getSalons.bind(this);
        this.sort = this.sort.bind(this);
        this.state = {category: '',
            location: 'boston , ma',
            salons:[]
        };

    }



    selectCategory(category) {

        this.setState({category: category});
    }

    componentDidMount() {

        this.getSalons(this.props.match.params.category);
        this.sort(this.props.location.search);
    }

    componentWillReceiveProps(newProps){

        this.getSalons(newProps.match.params.category);
        this.sort(newProps.location.search);
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
    getSalons(category)
    {

        this.yelp.searchSalons(category, this.state.location)
            .then((response)=> {
                this.setState({salons: []});
                for(var i = 0; i < response.length; i++) {
                    if(response[i].name.toString().toLowerCase().includes(category.toLowerCase().substr(0,3)) && response[i].distance < 1500) {
                        this.setState({
                            salons: [response[i], ...this.state.salons]
                        });
                    }
                    else {
                        this.setState({
                            salons: [...this.state.salons, response[i]]
                        }, () => {
                            this.sort(this.props.location.search);
                        });
                    }
                    console.log(this.state.salons);
                    this.sort(this.props.location.search);
                }
            })
    }
    renderSalons() {
        let salons = this.state.salons.map((salons) => {
            return <Salon key={salons.id} salons={salons}/>
        });
        return salons;
    }

    render() {
        return (

            <div className="list-group">

                {this.renderSalons()}

            </div>

        );

    }

}