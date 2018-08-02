import React from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import YelpApiService from '../services/YelpServices'
import '../css/Home.css'
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import StarRatings from '../../node_modules/react-star-ratings';
export default class Home extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            keyword: '',
            location: 'boston , ma',
            salons:[]
        };
        this.yelp = YelpApiService.instance;
       this.getSalons = this.getSalons.bind(this);
       this.renderSalons = this.renderSalons.bind(this);
        this.titleChanged = this.titleChanged.bind(this);
        this.defaultData = this.defaultData.bind(this);
        this.renderSalons = this.renderSalons.bind(this);
        this._handleKeyPress = this._handleKeyPress.bind(this);
    }

    componentWillMount()
    {
        this.defaultData();
    }
    titleChanged(e)
    {
        this.state.keyword = e.target.value;
    }
    getSalons()
    {

        this.yelp.searchSalons(this.state.keyword, this.state.location)
            .then((response)=> {
                this.setState({salons: []});
                for(var i = 0; i < response.length; i++) {
                    if(response[i].name.toString().toLowerCase().includes(this.state.keyword.toLowerCase().substr(0,3)) && response[i].distance < 1500) {
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

                let salons = this.state.salons.map((salons) =>
                {

                    return <div className="card col-sm-6"  >
                        <div style={{width: '100%'}}><img className="card-img-top" width="100" height="400" src = {salons.image_url}></img></div>
                            <h5 className="card-title">{salons.name}</h5>
                        <p className="card-text">{salons.phone}</p>
                        <span> <StarRatings
                            rating={salons.rating}
                            starDimension="20px"
                            starSpacing="2px"
                            starRatedColor="gold"
                        /></span>

                        <label>{salons.location.display_address[0]}&nbsp;
                        {salons.location.display_address[1]}&nbsp;
                        {salons.location.display_address[2]}
                        <span className="float-right">Distance :{parseFloat(salons.distance).toFixed(0)}m</span></label>

                        </div>

                });

                return salons;

    }


     defaultData() {
          this.yelp.searchSalons('salons', this.state.location)
              .then((response)=> {
                  for(var i = 0; i < 10; i++) {
                     // console.log(response[i]);
                      this.setState({
                          salons: [...this.state.salons, response[i]]
                      });
                      console.log(this.state.salons);
                  }
              })
     }

    _handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.getSalons();
        }
    }


    render() {
        return (
            <div className="container-fluid " >
               <h1 align="center">Pizzazz</h1>
                <div align="center">
                    <label className="search">
                <input onKeyPress={this._handleKeyPress} onChange={this.titleChanged} className="form-control" align="center" placeholder="Find Salons, Spas and more.."/>
                    </label>
                    <label align = "center"><button className="btn btn-danger" onClick={this.getSalons}>Find</button></label>
                </div>
                <div className="row">
                    {this.renderSalons()}

                </div>
            </div>
        );
    }
}