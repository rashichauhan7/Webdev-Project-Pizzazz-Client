import React from 'react'

import SalonItem from './SalonItem'

export default class SalonEditor extends React.Component {

    constructor(props)

    {

        super(props);

        this.selectSalon = this.selectSalon.bind(this);

        this.componentDidMount = this.componentDidMount.bind(this);

        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);

        this.state = {salonId: ''};

    }



    selectSalon(salonId) {

        this.setState({salonId: salonId});

    }

    componentDidMount() {

        this.selectSalon

        (this.props.match.params.salonId);

    }

    componentWillReceiveProps(newProps){

        this.selectSalon

        (newProps.match.params.salonId);

    }


    render() {

    return (

        <div className="container-fluid">

            <SalonItem salonId={this.state.salonId}/>

        </div>

    );

}

}