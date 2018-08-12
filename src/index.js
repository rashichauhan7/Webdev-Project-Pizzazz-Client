import React from 'react';
import ReactDOM from 'react-dom';
import '../src/css/index.css';
import Home from "./components/Home";
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import Register from './components/Register'
import App from './components/Login'

class Main extends React.Component {
    render() {
        return(
            <Router>
                <div>
                    <Route path='/Home' component={Home}/>
                    <Route path='/login' component={App}/>
                    <Route path='/register' component={Register}/>
                </div>
            </Router>
        );
    }}


ReactDOM.render(
    <Main/>,
    document.getElementById('root')
);
