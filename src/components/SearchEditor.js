import React from 'react'
import Salon from '../components/Salons'
import YelpApiService from '../services/YelpServices'
export default class SearchEditor extends React.Component {

    constructor(props)

    {

        super(props);

        // this.selectSalon = this.selectSalon.bind(this);

        this.componentDidMount = this.componentDidMount.bind(this);

        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);

        this.yelp = YelpApiService.instance;

        this.getSalons = this.getSalons.bind(this);

        this.renderSalons = this.renderSalons.bind(this);

        this.state = {keyword: '',
            location: 'boston , ma',
            salons:[]};

    }

    componentDidMount() {

        this.getSalons(this.props.match.params.keyword);


    }

    componentWillReceiveProps(newProps){

        this.getSalons(newProps.match.params.keyword)
    }
    getSalons(keyword)

    {

        this.yelp.searchSalons(keyword, this.state.location)

            .then((response)=> {

                this.setState({salons: []});

                for(var i = 0; i < response.length; i++) {

                    if(response[i].name.toString().toLowerCase().includes(keyword.toLowerCase().substr(0,3)) && response[i].distance < 1500) {

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