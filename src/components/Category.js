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


    }

    componentWillReceiveProps(newProps){

        this.getSalons(newProps.match.params.category)
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
                        });
                    }
                    console.log(this.state.salons);
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

            <div className="row">

                {this.renderSalons()}

            </div>

        );

    }

}