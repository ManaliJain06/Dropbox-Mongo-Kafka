/**
 * Created by ManaliJain on 10/1/17.
 */

import React, {Component} from 'react';
import UploadSidebar from './UploadSidebar';
import * as API from '../Api/FileUpload';
import {loginData} from '../Actions/index';
import {connect} from 'react-redux';
// import {
//     BrowserRouter as Router,
//     Link
// } from 'react-router-dom'

class Home extends Component{
    constructor(props) {
        super(props);
        let loginData = this.props.loginDataProp;
        this.state = {
            "user_uuid" : loginData.user_uuid,
            "message" : ''
        }
    }
    componentDidMount() {
        console.log(this.state);
        API.getFiles(this.state)
            .then((res) => {
                if (res.data.statusCode === 201) {
                    this.setState({
                        message: res.data.message,
                        // dir_name: ''
                    });
                } else if (res.data.statusCode === 500) {
                    this.setState({
                        message: res.data.message
                    });
                } else if(res.data.statusCode === 400) {
                    this.setState({
                        message: res.data.message
                    });
                } else if (res.data.statusCode === 601  || res.data.statusCode === 600) {
                    alert("Token expired or invalid. Please login again");
                    this.setState({
                        isLoggedIn: false,
                        message: res.data.message
                    });
                    sessionStorage.removeItem("jwtToken");
                    this.props.loginState(false);
                }
        });
    }

    render() {
        return(
            <div className="row">
                {this.state.message}
                <div className ="col-lg-9">
                    <main className="home-access" role="main">
                    <ul className="home-access-sections">
                        <li className="home-access-section"></li>
                        <li className="home-access-section">
                        <div className="starred">
                            <h2 className="home-access-section__header">
                            <div className="home-access-section__title">
                                <div className="home-access-section__title-text">
                                    <div>Starred</div>
                                </div>
                            </div>
                            </h2>
                            <ul className="starred-list">
                                <li className="starred-item">
                                    <div className="starred-item__content">
                                        <a href="#" className="starred-item__title">test</a>
                                        <div className="starred-item__star">
                                            <div className="react-title-bubble__container">
                                                <button className="star__toggle star__toggle--starred"
                                                        role="button" aria-pressed="true" aria-label="Star"></button>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        </li>
                        <li className="home-access-section">
                            <div className="starred">
                                <h2 className="home-access-section__header">
                                    <div className="home-access-section__title">
                                        <div className="home-access-section__title-text">
                                            <div>Recent</div>
                                        </div>
                                    </div>
                                </h2>
                                <ul className="starred-list">
                                    <li className="starred-item">
                                        <div className="starred-item__content">
                                            <a href="#" className="starred-item__title">Manali</a>
                                            <div className="starred-item__star">
                                                <div className="react-title-bubble__container">
                                                    <button className="star__toggle star__toggle--starred"
                                                            role="button" aria-pressed="true" aria-label="Star"></button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </main>
                </div>

                <div className ="col-lg-3">
                    <UploadSidebar/>
                </div>

            </div>

        );
    }
}
function mapStateToProps(state) {
    console.log("state App", state)
    return{
        loginDataProp : state.loginData
    };


}

export default connect(mapStateToProps, null)(Home);