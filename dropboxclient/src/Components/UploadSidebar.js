/**
 * Created by ManaliJain on 10/4/17.
 */

import React, {Component} from 'react';
import * as API from '../Api/FileUpload';
import {connect} from 'react-redux';

class UploadSidebar extends Component{
    constructor(props) {
        super(props);
            this.state = ({
                "valid": false,
                "payload": ''
            });
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
        // payload.append('doc', event.target.files[0]);
        var x = event.target.files[0];
        API.uploadFile(x)
            .then((status) => {
                if (status === 204) {

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
                            <input className="upload" type="file" name="doc"
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
                    <button className="btn btn-primary btn-sm mc-button-primary" >
                        New folder
                    </button>
                </div>
            </div>
        );
    }
}
// export default Interest;
// function mapDispatchToProps(dispatch) {
//     // return bindActionCreators({loginState:loginState},dispatch)
//     return {
//         loginState: (data) => dispatch(loginState(data)),
//         loginData: (data) => dispatch(loginData(data)),
//         interestUpdate: (data) => dispatch(interestUpdate(data))
//     };
// }

function mapStateToProps(state) {
    "use strict";
    console.log("state App", state)
    return{
        loginDataProp : state.loginData
    };


}

export default connect(mapStateToProps, null)(UploadSidebar);