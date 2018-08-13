import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Home from "./Home";
import SalonEditor from "../components/SalonEditor";
import InitialList from "../components/IntialList";
import Category from "../components/Category"
import SearchEditor from "../components/SearchEditor"
import Register from '../components/Register'
import App from '../components/Login'

export default class Manager extends React.Component {

    render() {
        return(
            <Router>
                <div>
                    <Route path='/login' component={App}/>
                    <Route path='/register' component={Register}/>
                    <Route path="*" component={Home}></Route>
                    <Route path="/home" component={InitialList}/>
                    <Route path="/category/:category" component = {Category}/>
                    <Route path="/salon/:salonId" component={SalonEditor}></Route>
                    <Route path="/search/:keyword" component={SearchEditor}></Route>
                </div>
            </Router>
        )
    }
}