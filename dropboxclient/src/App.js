import React, { Component } from 'react';
import './App.css';
// import {Routes} from './Routes.js';
// var Routes = require('./Routes');
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Dropbox from './Components/Dropbox';
import UserHome from './Components/UserHome';
import shallowCompare from 'react-addons-shallow-compare';

class App extends Component {

    // shouldComponentUpdate(nextProps, nextState) {
    //     return shallowCompare(this, nextProps, nextState);
    // }
    constructor(props){
        super(props);
    }

    render() {

      // console.log('ss111');
      //console.log("in app", this.props.loginState.isLogged)
      if(this.props.loginStateProp.isLogged){
          return (
            <UserHome />
          );
      } else{
          return (
              <Dropbox />
          );
      }
    }
}

function mapStateToProps(state) {
    // "use strict";

    console.log("state App", state)
    return{
        loginStateProp : state.loginState,
    };

    // const array = Object.keys(state.loginState).map((i) => (
    //     {
    //         'status' : state.loginState[i]
    //     }
    // ));
    // return {array};

}
export default connect(mapStateToProps,null)(App);

