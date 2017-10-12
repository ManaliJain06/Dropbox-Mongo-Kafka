/**
 * Created by ManaliJain on 10/10/17.
 */
import React, {Component} from 'react';
import UploadSidebar from './UploadSidebar';
import FilesInDir from './FilesInDir';
import * as API from '../Api/FileOperations';
import * as api from '../Api/FileUpload';
import {loginData} from '../Actions/index';
import {connect} from 'react-redux';

class FilesList extends Component{

    constructor(props) {
        super(props);
        let loginData = this.props.loginDataProp;
        this.state = {
            "user_uuid" : loginData.user_uuid,
            'message': ''
        }
    }

    // mycallBackForDeleteFile = (deleteItem) =>{
    //     // const file = this.props.file;
    //     // this.setState({
    //     //     ...this.state,
    //     //     "file_uuid": file.filesArray[0].file_uuid,
    //     //     "dir_name": file.dir_name,
    //     //     "dir_uuid": file.dir_uuid,
    //     // });
    // }
    uploadFileInFolder = (event) => {
        // const payload = new FormData();
        // let user_uuid = this.state.user_uuid;
        // payload.append('myfile', event.target.files[0]);
        // payload.append('user_uuid', loginData.user_uuid);
        //
        // api.uploadFile(payload)
        //     .then((res) => {
        //         if (res.status === 200) {
        //             this.setState({
        //                 ...this.state,
        //                 "file_uuid": file.filesArray[0].file_uuid,
        //                 "dir_name": file.dir_name,
        //                 "dir_uuid": file.dir_uuid,
        //             }, this.callUploadInDirAPI);
        //             this.props.callHome('home');
        //         } else {
        //             alert("Error in file upload");
        //         }
        //     });
    };
    callUploadInDirAPI = () => {
        API.deleteFile(this.state)
            .then((res) => {
                if (res.data.statusCode === 201) {
                    this.props.callHome('home');
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
    handleDeleteFile = () => {
        console.log("selsected file is", file);
        const file = this.props.file;
        var payload = {
            "file_uuid": file.filesArray[0].file_uuid,
            "user_uuid": this.state.user_uuid
        }
        this.callDeleteFileAPI(payload);
    }

    callDeleteFileAPI = (payload) => {
        API.deleteFile(payload)
            .then((res) => {
                if (res.data.statusCode === 201) {
                    this.props.callHome('home');
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
    handleDeleteDir = () => {
        console.log("selsected file is", file);
        const file = this.props.file;
        var payload = {
            "file_uuid": file.filesArray,
            "dir_name": file.dir_name,
            "dir_uuid": file.dir_uuid,
            "user_uuid": this.state.user_uuid
        }
        this.callDeleteDirAPI(payload);
    }

    callDeleteDirAPI = (payload) => {
        API.deleteDir(payload)
            .then((res) => {
                if (res.data.statusCode === 201) {
                    this.props.callHome('home');
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
    handleStarItem = () => {
        const file = this.props.file;
        let file_uuid ='';
        if(file.filesArray.length>0){
            file_uuid=file.filesArray[0].file_uuid;
        }
        this.setState({
            ...this.state,
            "file_uuid": file_uuid,
            "dir_name": file.dir_name,
            "dir_uuid": file.dir_uuid,
        }, this.callStarAPI);
    }
    callStarAPI = ()=>{
        API.starItem(this.state)
            .then((res) => {
                if (res.data.statusCode === 201) {
                    this.props.callHome('home');
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
        let messagediv =null;
        if(this.state.message !== ''){
            messagediv = <div className="clearfix">
                <div className="alert alert-danger text-center" role="alert">{this.state.message}</div>
            </div>;
        } else{
            messagediv = <div></div>;
        }

        const file =  this.props.file;
        console.log("dsjkdsjd",file);
        if(file !== ''){
            let isStar = file.star_id;
            let starred ='';
            if(isStar === '1'){
                starred = <div className="folder">Starred</div>;
            } else {
                starred = <div className="starred-item__content col-sm-1">
                            <button type="button" className="btn btn-btn-primary"
                                onClick={this.handleStarItem}>Star</button>
                        </div>
            }
            if(file.dir_name !== ''){
                var fileInDirList ='';
                if(file.filesArray.length>0){
                    fileInDirList =  file.filesArray.map((item, index) => {
                            return (
                                <FilesInDir
                                        key={index}
                                        fileListInDir={item}
                                />
                            );
                    });
                } else {
                    fileInDirList = <div> </div>
                }
                return(
                <div>{messagediv}
                    <ul className="starred-list">
                        <div className ="row">
                            <li className="starred-item">
                                <div className="image-wrapper-folder col-sm-1"></div>

                                <div className="starred-item__content tarred-item__title col-sm-5">
                                    {   file.dir_name}
                                </div>

                                <div className="starred-item__content col-sm-3">
                                    <div className="side-buttons">
                                        <div className="upload-button">
                                            <div>Upload Files in Folder</div>
                                            <input className="upload" type="file" name="myfile"
                                                   onChange={this.uploadFileInFolder}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="starred-item__content col-sm-1">
                                    {starred}
                                </div>
                                <div className="starred-item__content col-sm-1">
                                    <button type="button" className="btn btn-btn-primary">Share</button>
                                </div>
                                <div className="starred-item__content col-sm-1">
                                    <button type="button" className="btn btn-btn-primary"
                                            onClick={this.handleDeleteDir}>Delete</button>
                                </div>
                            </li>
                        </div>
                        <ul className="starred-list">
                            {fileInDirList}
                        </ul>
                    </ul>
                </div>
                );
            } else {
                return(
                    <div>{messagediv}
                    <ul className="starred-list">
                        <div className ="row">
                            <li className="starred-item">
                                <div className="starred-item__content col-sm-9">
                                    <a href={file.filesArray[0].file_path}
                                       className="starred-item__title" download>{file.filesArray[0].file_name}</a>
                                </div>
                                <div className="starred-item__content col-sm-1 ">
                                    {starred}
                                </div>
                                <div className="starred-item__content col-sm-2 ">
                                    <button type="button" className="btn btn-btn-primary"
                                            onClick={this.handleDeleteFile}
                                    >Delete
                                    </button>
                                </div>
                            </li>
                        </div>
                    </ul>
                    </div>
                );
            }

        } else {
            return(
                <ul className="starred-list">
                    <li className="starred-item">
                        <div className="starred-item__content">

                        </div>
                    </li>
                </ul>
            );
        }

    }
}
function mapStateToProps(state) {
    console.log("state App", state)
    return{
        loginDataProp : state.loginData
    };


}

export default connect(mapStateToProps, null)(FilesList);