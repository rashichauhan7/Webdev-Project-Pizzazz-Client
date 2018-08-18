import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Home from "./Home";
import SalonEditor from "../components/SalonEditor";
import InitialList from "../components/IntialList";
import Category from "../components/Category"
import SearchEditor from "../components/SearchEditor"
import Register from '../components/Register'
import App from '../components/Login'
import ProfileComponent from "../components/Profile";
import ProfileViewerComponent from "../components/ProfileViewer";
import SalonManagerComponent from "../components/SalonManager";
import AdminHomeComponent from "../components/AdminHome";
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
                    <Route path="/category/:category?sort=:sid" component = {Category}/>
                    <Route path="/salon/:salonId" component={SalonEditor}></Route>
                    <Route path="/salon/:salonId?sort=:sid" component={SalonEditor}></Route>
                    <Route path="/search/:keyword" component={SearchEditor}></Route>
                    <Route path="/search/:keyword?sort=:sid" component={SearchEditor}></Route>
                    <Route path="/profile" component={ProfileComponent}></Route>
                    <Route path="/manageSalon" component={SalonManagerComponent}></Route>
                    <Route path="/profiles/:profileId" component={ProfileViewerComponent}></Route>
                    <Route path="/manage" component={AdminHomeComponent}></Route>


                </div>
            </Router>
        )
    }
}