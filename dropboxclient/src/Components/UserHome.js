/**
 * Created by ManaliJain on 9/30/17.
 */


import React, {Component} from 'react';
import {connect} from 'react-redux';
import {userMenu, loginState} from '../Actions/index';
import Home from './Home';
import About from './About';
import Link from './Link';
import Interest from './Interest';
import Folder from './Folder';
import Groups from './Groups';
import * as API from '../Api/UserLogin';

class UserHome extends Component {
    constructor(props){
        super(props);
        this.state ={
            "isUpdated" : false
        }
    }
    handleSignout = () => {
        API.signout()
            .then((res) => {
                if (res.data.statusCode === 401) {
                    window.sessionStorage.removeItem('jwtToken');
                    this.props.loginState(false);
                } else {
                    console.log("error occured");
                }
            });
    }
    // myCallbackForHome=(callHome)=> {
    //     console.log("reached callback");
    //     this.props.userMenu('home');
    //     this.setState({
    //         "isUpdated" : true
    //      }, this.CallHomeOnUpdation);
    // }
    // CallHomeOnUpdation =()=> {
    //     var switchDecision =null;
    //     switchDecision = <Home/>;
    // }
    render() {
        let switchDecision = null;
        if(this.props.userMenuSelection.menuSelection === 'home'){
            switchDecision = <Home/>;
        }
        if(this.props.userMenuSelection.menuSelection === 'about'){
            switchDecision = <About/>;
        }
        if(this.props.userMenuSelection.menuSelection === 'interest'){
            switchDecision = <Interest/>;
        }
        if(this.props.userMenuSelection.menuSelection === 'groups'){
            switchDecision = <Groups/>;
        }
        if(this.props.userMenuSelection.menuSelection === 'link'){
            switchDecision = <Link/>;
        }

        return (
            <div className="container-fluid">
                <div className="row">

                    <div className="col-lg-3 maestro-nav__container_sidebar">
                        <div className="image-wrapper-logo"/>
                        <ul className="list">
                            <li onClick = {() => this.props.userMenu('home')}>
                                <div className="maestro-nav__product-wrapper">
                                    <span className="ue-effect-container">
                                        <a href="#" className="maestro-nav__product">
                                     Home</a>
                                    </span>
                                </div>
                            </li>
                            <li  onClick = {() => this.props.userMenu('about')}>
                                <div className="maestro-nav__product-wrapper">
                                    <span className="ue-effect-container">
                                        <a href="#" className="maestro-nav__product">
                                     About</a>
                                    </span>
                                </div>
                            </li>
                            <li onClick = {() => this.props.userMenu('interest')}>
                                <div className="maestro-nav__product-wrapper">
                                    <span className="ue-effect-container">
                                        <a href="#" className="maestro-nav__product">
                                     Interest</a>
                                    </span>
                                </div>
                            </li>
                            <li onClick = {() => this.props.userMenu('groups')}>
                                <div className="maestro-nav__product-wrapper">
                                    <span className="ue-effect-container">
                                        <a href="#" className="maestro-nav__product">
                                     Groups</a>
                                    </span>
                                </div>
                            </li>
                            <li onClick = {() => this.props.userMenu('link')}>
                                <div className="maestro-nav__product-wrapper">
                                    <span className="ue-effect-container">
                                        <a href="#" className="maestro-nav__product">
                                     Shared Links</a>
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="col-lg-10">
                        <header className="maestro-header page-header__shadow">
                            <div className="mc-vertically-fixed page-header">
                                <div className="row">
                                    <div className="col-lg-3">
                                        <h3>{this.props.userMenuSelection.menuSelection[0].toUpperCase() +
                                        this.props.userMenuSelection.menuSelection.substring(1)}</h3>
                                    </div>
                                    <div className="col-lg-2 col-lg-offset-7">
                                        <a href="" onClick={() => this.handleSignout()}>Signout</a>
                                    </div>
                                </div>
                            </div>
                        </header>

                        {switchDecision}

                    </div>

                </div>
            </div>
        );
    }
}
// export default UserHome;


function mapStateToProps(state) {
    return{
        userMenuSelection: state.userMenu
    };

}

function mapDispatchToProps(dispatch) {
    // return bindActionCreators({loginState:loginState},dispatch)
    return {
        userMenu: (data) => dispatch(userMenu(data)),
        loginState: (data) => dispatch(loginState(data))
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(UserHome);

