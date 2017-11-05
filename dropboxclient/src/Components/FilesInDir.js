/**
 * Created by ManaliJain on 10/10/17.
 */
import React, {Component} from 'react';
import * as API from '../Api/FileOperations';
import {loginData,loginState} from '../Actions/index';
import * as home from './Home';
import {connect} from 'react-redux';

class FilesInDir extends Component{

    constructor(props) {
        super(props);
        let loginData = this.props.loginDataProp;
        this.state = {
            "user_uuid" : loginData.user_uuid,
            'message': ''
        }
    }

    deleteFile = () => {
        const fileListInDir =  this.props.fileListInDir;
        const file = this.props.file1;
        let payload = {
            "file": file.filesArray,
            "dir_name": file.dir_name,
            "dir_uuid": file.dir_uuid,
            "user_uuid": this.state.user_uuid,
            "file_uuid": fileListInDir.file_uuid,
            "file_name": fileListInDir.file_name,
            "_id": file._id,
        }
        this.callDeleteFileInDirAPI(payload);
    }

    callDeleteFileInDirAPI = (payload) => {
        API.deleteFileInDir(payload)
            .then((res) => {
                if (res.data.statusCode === 201) {
                    this.props.callFileList('home');
                    console.log("file deleted");
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
                        message: res.data.message
                    });
                    sessionStorage.removeItem("jwtToken");
                    this.props.loginState(false);
                }
            });
    }
    render() {
        const fileListInDir =  this.props.fileListInDir;
        const file = this.props.file1;
        let canDelete =null;
        // let isOwner = file.isOwnerDir;
        // if(isOwner !== undefined){
        //     if(isOwner === false){
        //         canDelete = <div></div>;
        //     }
        //     else{
        //         canDelete = <div className="options star" onClick={this.deleteFiles}><u>Delete</u></div>
        //     }
        // } else{
        //     canDelete = <div className="options star" onClick={this.deleteFiles}><u>Delete</u></div>
        // }
        if(file.owner_uuid !== this.state.user_uuid) {
            canDelete = <div></div>
        } else {
            canDelete = <div className="star" onClick={this.deleteFile}><u>Delete</u></div>
        }
        return(
                    <div className ="row">
                        <li className="starred-item">
                            <div className="starred-item__content col-sm-1">
                                <div className="image-wrapper-fileInDir"> </div>
                            </div>
                            <div className="starred-item__content col-sm-9">
                                <a href={fileListInDir.file_path} className="starred-item__title"
                                   download> {fileListInDir.file_name}</a>
                            </div>
                            <div className="starred-item__content col-sm-2">
                                {canDelete}
                            </div>
                        </li>
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

function mapDispatchToProps(dispatch) {
    return {
        loginState: (data) => dispatch(loginState(data))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FilesInDir);

