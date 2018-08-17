import React from 'react'
import Salon from '../components/Salons'
import YelpApiService from '../services/YelpServices'
export default class SearchEditor extends React.Component {

    constructor(props)
    {
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
        this.yelp = YelpApiService.instance;
        this.getSalons = this.getSalons.bind(this);
        this.sort = this.sort.bind(this);
        this.renderSalons = this.renderSalons.bind(this);

        this.state = {keyword: '',
            location: 'boston , ma',
            salons:[]};

    }

    componentDidMount() {

        this.getSalons(this.props.match.params.keyword);
        this.sort(this.props.location.search);

    }

    componentWillReceiveProps(newProps){

        this.getSalons(newProps.match.params.keyword);
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
    getSalons(keyword)

    {

        this.yelp.searchSalons(keyword, this.state.location)

            .then((response)=> {

                this.setState({salons: []});

                for(var i = 0; i < response.length; i++) {

                    if(response[i].name.toString().toLowerCase().includes(keyword.toLowerCase().substr(0,2)) && response[i].distance < 1500) {

                        this.setState({

                            salons: [response[i], ...this.state.salons]

                        });

                    }

                    else {

                        this.setState({

                            salons: [...this.state.salons, response[i]]

                        });

                    }

                    console.log(this.state.salons);

                }
                this.sort(this.props.location.search);
            })

    }

    renderSalons()
    {
        let salons = this.state.salons.map((salons) => {
            return <Salon key={salons.id} salons={salons}/>
        });

        return salons;
    }

            render() {

        return (

            <div className="row">

                {this.renderSalons()}

            </div>

        );

    }

}