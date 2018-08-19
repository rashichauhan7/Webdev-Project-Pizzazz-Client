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
                lng: 0
            };
    }

    componentDidMount()
    {
        this.setState({lat: this.props.lat});
        this.setState({lng: this.props.lng});
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

            />
        );
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyAYjWTBdRuRKeuW_21h3NIeDiws977Yqi0",
})(Maps);