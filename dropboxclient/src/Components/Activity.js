/**
 * Created by ManaliJain on 10/26/17.
 */

import React, {Component} from 'react';
import {loginData} from '../Actions/index';
import {connect} from 'react-redux';


class Activity extends Component{
    constructor(props) {
        super(props);
        let loginData = this.props.loginDataProp;
        this.state = {
            "user_uuid" : loginData.user_uuid,
            "message": '',
            "link": ''
        }
    }
    // componentDidMount() {
    //     API.getLinks()
    //         .then((res) => {
    //             if (res.data.statusCode === 201) {
    //                 this.setState({
    //                     message: res.data.message,
    //                     link: res.data.link
    //                 });
    //                 // this.props.userFiles(res.data.files);
    //             } else if (res.data.statusCode === 500) {
    //                 this.setState({
    //                     message: res.data.message
    //                 });
    //             } else if(res.data.statusCode === 300) {
    //                 this.setState({
    //                     message: res.data.message,
    //                 });
    //             } else if (res.data.statusCode === 601  || res.data.statusCode === 600) {
    //                 alert("Token expired or invalid. Please login again");
    //                 this.setState({
    //                     message: res.data.message
    //                 });
    //                 sessionStorage.removeItem("jwtToken");
    //                 this.props.loginState(false);
    //             }
    //         });
    // }
    render() {
        return(
            <div className="row">
                Activity
            </div>
        );
    }
}
function mapDispatchToProps(dispatch) {
    return {
        loginData: (data) => dispatch(loginData(data)),
    };
}

function mapStateToProps(state) {
    return{
        loginDataProp : state.loginData
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Activity);