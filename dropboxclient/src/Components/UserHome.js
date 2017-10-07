/**
 * Created by ManaliJain on 9/30/17.
 */


import React, {Component} from 'react';
import {connect} from 'react-redux';
import {userMenu, loginState} from '../Actions/index';
import Home from './Home';
import About from './About';
import Interest from './Interest';
import Files from './Files';
import * as API from '../Api/UserLogin';

class UserHome extends Component {
    constructor(props){
        super(props);
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
        if(this.props.userMenuSelection.menuSelection === 'files'){
            switchDecision = <Files/>;
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
                            <li onClick = {() => this.props.userMenu('files')}>
                                <div className="maestro-nav__product-wrapper">
                                    <span className="ue-effect-container">
                                        <a href="#" className="maestro-nav__product">
                                     Files</a>
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


                    {/*<div clasName="maestro-chrome">*/}
                        {/*<header className="maestro-header page-header__shadow">*/}
                            {/*<div className="mc-vertically-fixed page-header">*/}
                                {/*<div className="page-header__title" tabindex="0">*/}
                                    {/*<h1 className="page-header__heading">Home</h1>*/}
                                {/*</div>*/}
                                {/*<div className="top-menu-container ">*/}
                                {/*</div>*/}
                            {/*</div>*/}
                        {/*</header>*/}
                        {/*<div className="maestro-nav__container">*/}
                            {/*<div className="maestro-nav__panel">*/}
                                {/*<div className="maestro-nav__contents">*/}
                                    {/*<ul className="maestro-nav__products">*/}
                                        {/*<li>*/}
                                            {/*<div className="maestro-nav__product-wrapper"><span*/}
                                                {/*class="ue-effect-container"><a*/}
                                                {/*href="https://www.dropbox.com/h?role=personal">Home</a></span></div>*/}
                                        {/*</li>*/}
                                        {/*<li >*/}
                                            {/*<div class="maestro-nav__product-wrapper"><span class="ue-effect-container"><a*/}
                                                {/*href="https://www.dropbox.com/h?role=personal">About</a></span></div>*/}
                                        {/*</li>*/}
                                        {/*<li >*/}
                                            {/*<div class="maestro-nav__product-wrapper"><span class="ue-effect-container"><a*/}
                                                {/*href="https://www.dropbox.com/h?role=personal">Home</a></span></div>*/}
                                        {/*</li>*/}
                                    {/*</ul>*/}
                                {/*</div>*/}
                            {/*</div>*/}
                        {/*</div>*/}
                    {/*</div>*/}
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

