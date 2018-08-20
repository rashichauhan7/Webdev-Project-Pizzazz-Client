import React from 'react';
import PropTypes from 'prop-types';
import Map, { GoogleApiWrapper } from 'google-maps-react';


class Maps extends React.Component {
    constructor(props)
    {
        super(props);
        this.state =
            {
                lat: 0,
                lng: 0,
                markers: [{
                    position: {
                        lat: this.props.lat,
                        lng: this.props.lng,
                    }
                }]
            }

    }

    componentDidMount()
    {
        this.setState({lat: this.props.lat});
        this.setState({lat: this.props.lat});
    }
 componentWillReceiveProps(newprops)
    {
        this.setState({lat: newprops.lat});
        this.setState({lng: newprops.lng});
    }


    render() {
        return (
            <Map
                google={this.props.google}
                zoom={14}
                center={{
                    lat: this.props.lat,
                    lng: this.props.lng,
                }}
                markers = {this.state.markers}
            />
        );
    }
}

export default GoogleApiWrapper({
    apiKey: "835486386196-ghrsa4m8q8nn2avpg8ui6gr2ttsl7f93.apps.googleusercontent.com",
})(Maps);