/**
 * Created by ManaliJain on 10/4/17.
 */

import React, {Component} from 'react';
import * as API from '../Api/FileUpload';
import {connect} from 'react-redux';
import {userMenu, loginState} from '../Actions/index';

class UploadSidebar extends Component{
    constructor(props) {
        super(props);
        // let loginData = this.props.loginDataProp;
        // this.state = {
        //     "user_uuid" : loginData.user_uuid,
        //     "message" : ''
        // }
    }
    // handleFileUpload = (event) => {
    //     if (event.target.files[0]) {
    //
    //         // event.preventDefault();
    //         console.log("file:", event.target.files[0]);
    //
    //         let data = new FormData();
    //         data.append('myfile', event.target.files[0]);
    //         // data.append('name', event.target.files[0].name);
    //         // data.append('type', event.target.files[0].type);
    //
    //         // data.append('name', name);
    //         var loginData = this.props.loginDataProp;
    //         this.setState({
    //             ...this.state,
    //             valid: true,
    //             payload: data,
    //             "id": loginData.id,
    //             "user_uuid": loginData.user_uuid
    //         }, this.callAPI(data));
    //
    //     } else {
    //         this.setState({
    //             valid: false
    //         });
    //     }
    // }

    handleFileUpload = (event) => {
        const payload = new FormData();
        let loginData = this.props.loginDataProp;
        payload.append('file', event.target.files[0]);
        payload.append('user_uuid', loginData.user_uuid);

        API.uploadFile(payload)
            .then((res) => {
                if (res.status === 201) {
                    this.props.callHome('home');
                } else if(res.status === 500){
                    alert("Error in file upload");
                }
            });
    };

    render() {
        return(
            <div className="mc-vertically-fixed maestro-secondary-sidebar">
                <form method="post" encType="multipart/form-data">
                <div className="side-buttons">
                        <div className="upload-button">
                            <div>Upload Files</div>
                            <input className="upload" type="file" name="file"
                                   onChange={this.handleFileUpload}/>
                        </div>
                </div>
                </form>

                <div className="side-buttons">
                    <button className="btn btn-primary btn-sm mc-button-primary">
                        New shared folder
                    </button>
                </div>

                <div className="side-buttons">
                    <button className="btn btn-primary btn-sm mc-button-primary"
                            onClick = {() => this.props.userMenu('folder')}>
                        New folder
                    </button>
                </div>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return{
        loginDataProp : state.loginData
    };

}

function mapDispatchToProps(dispatch) {
    // return bindActionCreators({loginState:loginState},dispatch)
    return {
        userMenu: (data) => dispatch(userMenu(data)),
        loginState: (data) => dispatch(loginState(data))
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(UploadSidebar);