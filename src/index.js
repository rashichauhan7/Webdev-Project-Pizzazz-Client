import React from 'react';
import ReactDOM from 'react-dom';
import '../src/css/index.css';
import Home from "./components/Home";



ReactDOM.render(
    <div>
    <div className="signIns">
        <div align="center" className="google"><i className="fa fab fa-google fa-2x"></i></div>
        <div align="center" className="facebook"><i className="fa fab fa-facebook-f fa-2x"></i></div>
    </div>
    <Home/>
    </div>,
    document.getElementById('root')
);
