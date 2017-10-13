/**
 * Created by ManaliJain on 10/1/17.
 */

import React, {Component} from 'react';
import UploadSidebar from './UploadSidebar';
import FilesList from './FilesList';
import * as API from '../Api/FileUpload';
import {loginData,loginState} from '../Actions/index';
import {userFiles} from '../Actions/index';

import {connect} from 'react-redux';

class Home extends Component{
    constructor(props) {
        super(props);
        let loginData = this.props.loginDataProp;
        this.state = {
            "user_uuid" : loginData.user_uuid,
            "message" : '',
            "files":'',
            "updated": false
        }
    }

    myCallbackForHome=(callHome) => {
        // this.props.callHome(callHome);
        this.componentDidMount();
    };

    componentDidMount() {
        API.getFiles()
            .then((res) => {
                if (res.data.statusCode === 201) {
                    this.setState({
                        message: res.data.message,
                        files: res.data.files
                    });
                    this.props.userFiles(res.data.files);
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
        // this.getFiles();
        console.log("files state", this.state.files);
        var fileList ='';
        if(this.state.files === '' || this.state.files === undefined){
            fileList = <FilesList key='' file=''/>;
        } else {
            fileList =  this.state.files.map((item, index) => {
                            return (
                                <FilesList
                                    key={index}
                                    file={item}
                                    callHome={this.myCallbackForHome}
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
                            <li className="home-access-section"></li>

                            <li className="home-access-section">
                                <div className="starred">
                                    <h2 className="home-access-section__header">
                                        <div className="home-access-section__title">
                                            <div className="home-access-section__title-text">
                                                <div>Recent</div>
                                            </div>
                                        </div>
                                    </h2>
                                    {fileList}
                                </div>
                            </li>

                        </ul>
                    </main>

                </div>

                <div className ="col-lg-3">
                    <UploadSidebar callHome={this.myCallbackForHome}/>
                </div>

            </div>

        );
    }
}
function mapStateToProps(state) {
    console.log("state App", state)
    return{
        loginDataProp : state.loginData,
    };
}

function mapDispatchToProps(dispatch) {
    // return bindActionCreators({loginState:loginState},dispatch)
    return {
        userFiles : (data) => dispatch(userFiles(data)),
        loginState: (data) => dispatch(loginState(data))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);