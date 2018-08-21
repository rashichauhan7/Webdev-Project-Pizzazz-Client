import React from 'react';
import Map, { GoogleApiWrapper } from 'google-maps-react';


class Maps extends React.Component {
    constructor(props)
    {
        super(props);
        this.state =
            {
                  markers: [{
                    position: {
                        lat: this.props.lat,
                        lng: this.props.lng,
                    }
                }]
            }

    }
    shouldComponentUpdate(nextProps, nextState){
        if(this.props.lat === nextProps.lat){
            return false
        }else{
            return true
        }
    }

 //    componentDidMount()
 //    {
 //        this.setState({lat: this.props.lat});
 //        this.setState({lat: this.props.lat});
 //    }
 // componentWillReceiveProps(newprops)
 //    {
 //        this.setState({lat: newprops.lat});
 //        this.setState({lng: newprops.lng});
 //    }


    render() {
        if(this.props.lat !== undefined) {
            return (
                <Map
                    google={this.props.google}
                    zoom={14}
                    center={{
                        lat: this.props.lat,
                        lng: this.props.lng,
                    }}
                    markers={this.state.markers}
                />
            );

        }
        return <div></div>;
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyDlq9XPSo4UthVauw6xBlXDS9wx8aStUsM",
    // apiKey: "",
})(Maps);