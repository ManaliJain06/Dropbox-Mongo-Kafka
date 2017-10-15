/**
 * Created by ManaliJain on 10/15/17.
 */
import React, {Component} from 'react';
import * as API from '../Api/UserAccount';
import {loginState, loginData, aboutUpdate} from '../Actions/index';
import LinkFiles from './LinkFiles';
import {connect} from 'react-redux';


class Link extends Component{
    constructor(props) {
        super(props);
        let loginData = this.props.loginDataProp;
        this.state = {
            "user_uuid" : loginData.user_uuid,
            "message": '',
            "link": ''
        }
    }
    componentDidMount() {
        API.getLinks()
            .then((res) => {
                if (res.data.statusCode === 201) {
                    this.setState({
                        message: res.data.message,
                        link: res.data.link
                    });
                    // this.props.userFiles(res.data.files);
                } else if (res.data.statusCode === 500) {
                    this.setState({
                        message: res.data.message
                    });
                } else if(res.data.statusCode === 300) {
                    this.setState({
                        message: res.data.message,
                    });
                } else if (res.data.statusCode === 601  || res.data.statusCode === 600) {
                    alert("Token expired or invalid. Please login again");
                    this.setState({
                        message: res.data.message
                    });
                    sessionStorage.removeItem("jwtToken");
                    this.props.loginState(false);
                }
            });
    }
    render() {
        let link ='';
        if(this.state.link === '' || this.state.link === undefined){
            link = <LinkFiles key='' link=''/>;
        } else {
            link =  this.state.link.map((item, index) => {
                return (
                    <LinkFiles
                        key={index}
                        link={item}
                    />
                );
            })
        }
        return(
            <div className="row">
                {/*{this.state.message}*/}
                <div className ="col-lg-9">
                    <main className="home-access" role="main">
                        <ul className="home-access-sections">
                            <li className="home-access-section"> </li>

                            <li className="home-access-section">
                                <div className="starred">
                                    <h2 className="home-access-section__header">
                                        <div className="home-access-section__title">
                                            <div className="home-access-section__title-text">
                                                <div>Links Shared to you</div>
                                            </div>
                                        </div>
                                    </h2>
                                    {link}
                                </div>
                            </li>
                        </ul>
                    </main>
                </div>
            </div>
        );
    }
}
function mapDispatchToProps(dispatch) {
    // return bindActionCreators({loginState:loginState},dispatch)
    return {
        loginState: (data) => dispatch(loginState(data)),
        loginData: (data) => dispatch(loginData(data)),
        aboutUpdate: (data) => dispatch(aboutUpdate(data))
    };
}

function mapStateToProps(state) {
    "use strict";
    console.log("state App", state)
    return{
        loginDataProp : state.loginData
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Link);