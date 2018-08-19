import React from 'react';
import Map, { GoogleApiWrapper } from 'google-maps-react';

class Maps extends React.Component {
    render() {
        return (
            <Map
                google={this.props.google}
                zoom={14}
                center={{
                    lat: 37.774929,
                    lng: -122.419416,
                }}
            />
        );
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyBf0ykIZXdK2sju-tm9HpyUNGyfiIB73hA",
})(Maps);