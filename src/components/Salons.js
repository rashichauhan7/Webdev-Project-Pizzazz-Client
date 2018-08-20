import React from 'react';
import {Link} from 'react-router-dom';

export default class Salon extends React.Component{
    constructor(props)
    {

        super(props);
        this.state =
            {
                salons: { },
                showPopUp : false,
                is_open_now: false,
                cssLoaded: false
            }
            this.categories = this.categories.bind(this);
    }

    componentDidMount()
    {
        this.setState({salonId: this.props.salons.id});
        this.setState({is_open_now: !this.props.salons.is_closed});
        this.setState({cssLoaded: false});
    }

    componentWillReceiveProps (newProps) {
        this.setState({salonId: newProps.salons.id});
        this.setState({is_open_now: !newProps.salons.is_closed});
    }


    categories()
    {
        let categorie = this.props.salons.categories.map((categories) =>
        {
            return <Link onClick ={() => this.setState({cssLoaded: true})} className="category2"
                         to={`/category/${categories.title}`}>{categories.title} &nbsp;</Link>
        });

        return categorie;
    }
    render () {
        if (this.state.cssLoaded === false) {
            this.state.cssLoaded = true;
            import('../css/Salons.css');
        }


        return (
            <div className="row salonItem " align="center" style={{marginLeft:"25%"}}>
                <div className="imgdiv col-2 float-left ">
                    <img className="img" src = {this.props.salons.image_url}/>
                </div>
                    <div className="col-8 name list-group ">
                        <Link to={`/salon/${this.props.salons.id}`} onClick={() =>
                                document.getElementById('sidebar').style.visibility = "hidden"
                        } className="title list-group-item">
                            <h2 className="float-left"><span style={{color: 'darkred' }}>{this.props.salons.name}</span> <span style={{textDecorationColor: 'blue'}}>{this.props.salons.price}</span></h2>
                        </Link>

                        <div className="list-group-item">
                            <h3 className="float-left">{this.props.salons.location.address2}</h3>
                        </div>
                        <div className="list-group-item">
                            <h4 className="float-left ">{this.props.salons.location.display_address[0]}</h4>
                        </div>
                        <div className="list-group-item">
                            {this.state.is_open_now && <p className="float-left"><b>Open now</b></p>}
                            {!this.state.is_open_now && <p className="float-left"><b>Closed now</b></p>}
                        </div>

                    </div>

                <div className="col-2"><label className="btn" style={{color: "white" , backgroundColor: "#cdd614" , width: '50%', height: '25%' , fontSize: 'large', margin: '3%',padding: '8%'}}>
                    {this.props.salons.rating.toPrecision(2)}</label><br/>
                    <label style={{color: 'gray'}}>{this.props.salons.review_count} reviews</label>
                </div>
                <label className='call'>
                   Categories:  {this.categories()}
                </label>
                <label className="call" onClick={() => this.setState({showPopUp:true})}>
                    Call
                </label>

                {this.state.showPopUp ?
                <div className=" phone popup_inner list-group">
                        <div className="float-right">
                        <button className="float-right btn btn-danger closeBtn" style={{width: '8%'}}
                                onClick={() => this.setState({showPopUp:false})}><i className="fa fa-close"></i> </button>
                        </div>
                    <div className="list-group-item float-left">
                    <h2>{this.props.salons.name}</h2>
                    </div>
                    <div className="list-group-item">
                        <b> Phone Number :</b>
                        <br/>
                        <i className="fa fa-phone"></i> {this.props.salons.phone}
                    </div>
                </div>: null}

            </div>
        );
    }

}