import { BrowserRouter, Route } from 'react-router-dom'
import Dropbox from './Components/Dropbox';
import HomePage from './Components/HomePage';
import Signup from './Components/Signup';
import React from 'react';
// var React = require('react');
// var ReactRouter = require('react-router');



// var Router = ReactRouter.Router;
// var Route =   ReactRouter.Route;
console.log('ss');
const Routes=  () => (
    <BrowserRouter>
        <Route path="/" component={Dropbox}>
            {/*<Route path="/" component={HomePage}/>*/}
             <Route path="/signup" component={Signup}/>
        </Route>
    </BrowserRouter>

)
export default Routes;


