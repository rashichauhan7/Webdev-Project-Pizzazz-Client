import React from 'react'
import { withGoogleMap, GoogleMap } from "react-google-maps"
import withScriptjs from "react-google-maps/lib/async/withScriptjs"

class Map extends React.Component{

    constructor(props){
        super(props)
    }

    shouldComponentUpdate(nextProps, nextState){
        if(this.props.center.lat === nextProps.center.lat){
            return false
        }else{
            return true
        }
    }

    render(){
        const AsyncMap = withScriptjs(
            withGoogleMap(
                props => (
                    <GoogleMap
                        defaultZoom={this.props.zoom}
                        defaultCenter={{ lat: this.props.center.lat, lng: this.props.center.lng }}
                    >
                    </GoogleMap>
                )
            )
        )
        var map
        if(this.props.center.lat !== undefined){
            map = <AsyncMap
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=your_key"
                loadingElement={
                    <div style={{ height: `100%` }} />
                }
                containerElement={
                    <div style={{ height: this.props.height }} />
                }
                mapElement={
                    <div style={{ height: `100%` }} />
                }
            />
        }else{
            map = <div style={{height: this.props.height}} />
        }
        return(map)
    }
}

export default Map