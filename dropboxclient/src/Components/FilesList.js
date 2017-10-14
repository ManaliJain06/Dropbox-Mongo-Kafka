/**
 * Created by ManaliJain on 10/10/17.
 */
import React, {Component} from 'react';
import FilesInDir from './FilesInDir';
import * as API from '../Api/FileOperations';
import * as api from '../Api/FileUpload';
import {loginData,loginState} from '../Actions/index';
import {connect} from 'react-redux';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        width                 : '50%',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }
};
class FilesList extends Component{

    constructor(props) {
        super(props);
        let loginData = this.props.loginDataProp;
        this.state = {
            "user_uuid" : loginData.user_uuid,
            "modalIsOpenFile": false,
            'modalIsOpenDir' : false,
            "email": '',
            'message': '',
            'messageForShareFile': ''
        }
        this.openModalFile = this.openModalFile.bind(this);
        this.closeModalFile = this.closeModalFile.bind(this);
        this.openModalDir = this.openModalDir.bind(this);
        this.closeModalDir = this.closeModalDir.bind(this);
    }

    openModalFile() {
        this.setState({modalIsOpenFile: true});
    }
    openModalDir() {
        this.setState({modalIsOpenDir: true});
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        // this.subtitle.style.color = '#f00';
    }

    closeModalFile() {
        this.setState({modalIsOpenFile: false});
    }
    closeModalDir() {
        this.setState({modalIsOpenDir: false});
    }
    handleShareDir =()=> {
        const file = this.props.file;
        var shareDirData = {
            "shareToEmail" : this.state.email,
            "file": file,
            "user_uuid": this.state.user_uuid
        }
        console.log("shared dir data", shareDirData);
        this.callAPIForShareDir(shareDirData);
    }

    callAPIForShareDir = (payload) => {
        API.shareDir(payload)
            .then((res) => {
                if (res.data.statusCode === 201) {
                    this.closeModalDir();
                    // this.props.callHome('home');
                } else if (res.data.statusCode === 500) {
                    this.setState({
                        messageForShareFile: res.data.message
                    });
                } else if(res.data.statusCode === 300) {
                    this.setState({
                        messageForShareFile: res.data.message,
                        email : ''
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

    handleShareFile = () =>{
        const file = this.props.file;
        var shareFileData = {
            "shareToEmail" : this.state.email,
            "file": file,
            "user_uuid": this.state.user_uuid
        }
        console.log("shared file data", shareFileData);
        this.callAPIForShareFile(shareFileData);

    }
    callAPIForShareFile =(payload) => {
        API.shareFile(payload)
            .then((res) => {
                if (res.data.statusCode === 201) {
                    this.closeModalFile();
                    this.props.callHome('home');
                } else if (res.data.statusCode === 500) {
                    this.setState({
                        messageForShareFile: res.data.message
                    });
                } else if(res.data.statusCode === 300) {
                    this.setState({
                        messageForShareFile: res.data.message,
                        email : ''
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
    myCallbackForDeleteFile = (callFileList) =>{
        console.log("inside this hti thsi");
        this.props.callHome('home');
    }

    uploadFileInFolder = (event) => {
        const payload = new FormData();
        payload.append('file', event.target.files[0]);
        payload.append('user_uuid', loginData.user_uuid);

        api.uploadFile(payload)
            .then((res) => {
                if (res.status === 201) {
                    const file = this.props.file;
                    this.setState({
                        ...this.state,
                        "file_uuid": res.data.file_uuid,
                        "dir_name": file.dir_name,
                        "dir_uuid": file.dir_uuid,
                    }, this.callUploadInDirAPI);
                } else {
                    alert("Error in file upload");
                }
            });
    };
    callUploadInDirAPI = () => {
        api.uploadInDir(this.state)
            .then((res) => {
                if (res.data.statusCode === 201) {
                    this.props.callHome('home');
                } else if (res.data.statusCode === 500) {
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
        const file = this.props.file;
        var payload = {
            "file": file.filesArray,
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
        //for message on home page
        let messagediv =null;
        if(this.state.message !== ''){
            messagediv = <div className="clearfix">
                <div className="alert alert-danger text-center" role="alert">{this.state.message}</div>
            </div>;
        } else{
            messagediv = <div></div>;
        }

        // for message on Modal(popup)
        let messageForShareFile =null;
        if(this.state.messageForShareFile !== ''){
            messageForShareFile = <div className="clearfix">
                                    <div className="alert alert-info text-center" role="alert">{this.state.messageForShareFile}</div>
                                </div>;
        } else{
            messageForShareFile = <div></div>;
        }

        //for message on Modal(popup) for Dir
        let messageForShareDir =null;
        if(this.state.messageForShareFile !== ''){
            messageForShareDir = <div className="clearfix">
                <div className="alert alert-info text-center" role="alert">{this.state.messageForShareFile}</div>
            </div>;
        } else{
            messageForShareDir = <div></div>;
        }

        const file =  this.props.file;
        console.log("dsjkdsjd",file);

        if(file !== ''){
            // to decide whether user can star a file or directory and also to set the starred/unstarred value
            let isStar = file.star_id;
            let starred ='';
            if(isStar === '1'){
                starred = <div className="star-files">Starred</div>;
            } else if(isStar === ''){
               starred = <div></div>
            } else if(isStar === '0'){
                starred = <div className="starred-item__content col-sm-1">
                    {/*<button type="button" className="btn btn-btn-primary"*/}
                            {/*onClick={this.handleStarItem}>Star</button>*/}
                    <div className="star" onClick={this.handleStarItem}> <u>Star</u></div>
                </div>
            }

            //to decide whether user can delete and share file
            let canDelete =null;
            let canShare =null;
            let isOwner = file.isOwner;
            if(isOwner !== undefined){
                if(isOwner === false){
                    canDelete = <div></div>;
                    canShare = <div></div>;
                }
                else{
                    // canDelete = <button type="button" className="btn btn-btn-primary" onClick={this.handleDeleteFile}>Delete </button>
                    canDelete = <div className="star" onClick={this.handleDeleteFile}><u>Delete</u></div>
                    // canShare =   <button type="button" className="btn btn-btn-primary" onClick={this.openModalFile}>Share</button>
                    canShare = <div className="star" onClick={this.openModalFile}><u>Share</u></div>
                }
            } else{
                // canDelete = <button type="button" className="btn btn-btn-primary" onClick={this.handleDeleteFile}>Delete </button>
                canDelete = <div className="star" onClick={this.handleDeleteFile}><u>Delete</u></div>
                // canShare =   <button type="button" className="btn btn-btn-primary" onClick={this.openModalFile}>Share</button>
                canShare = <div className="star" onClick={this.openModalFile}><u>Share</u></div>
            }

            //to decide whether user can delete and share directory
            let canDeleteDir =null;
            let canShareDir =null;
            let uploadFileInDir =null;
            let isOwnerDir = file.isOwnerDir;
            if(isOwnerDir !== undefined){
                if(isOwnerDir === false){
                    canDeleteDir = <div></div>;
                    // canShareDir = <div></div>;
                    uploadFileInDir =<div></div>;
                }
                else{
                    // canDeleteDir = <button type="button" className="btn btn-btn-primary" onClick={this.handleDeleteDir}>Delete </button>
                    canDeleteDir = <div className="star" onClick={this.handleDeleteDir}><u>Delete</u></div>
                    // canShareDir =   <button type="button" className="btn btn-btn-primary" onClick={this.openModalDir}>Share</button>
                    uploadFileInDir = <div className="side-buttons">
                                         <div className="upload-button-dir">
                                             <div>Upload Files in Folder</div>
                                            <input className="upload" type="file" name="file"
                                            onChange={this.uploadFileInFolder}/>
                                        </div>
                                    </div>
                }
            } else{
                // canDeleteDir = <button type="button" className="btn btn-btn-primary" onClick={this.handleDeleteDir}>Delete </button>
                canDeleteDir = <div className="star" onClick={this.handleDeleteDir}><u>Delete</u></div>
                // canShareDir =   <button type="button" className="btn btn-btn-primary" onClick={this.openModalDir}>Share</button>
                uploadFileInDir = <div className="side-buttons">
                                    <div className="upload-button-dir">
                                        <div>Upload Files in Folder</div>
                                        <input className="upload" type="file" name="file"
                                               onChange={this.uploadFileInFolder}/>
                                    </div>
                                </div>
            }

            if(file.filesArray.length>0 && isOwnerDir === undefined) {
                // canShareDir =   <button type="button" className="btn btn-btn-primary" onClick={this.openModalDir}>Share</button>
                canShareDir = <div className="star" onClick={this.openModalDir}><u>Share</u></div>
            } else{
                canShareDir = <div></div>;
            }

                if(file.dir_name !== ''){
                var fileInDirList ='';
                if(file.filesArray.length>0){
                    fileInDirList =  file.filesArray.map((item, index) => {
                            return (
                                <FilesInDir
                                        key={index}
                                        fileListInDir={item}
                                        file1 = {file}
                                        callFileList={this.myCallbackForDeleteFile}
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

                                <div className="starred-item__content starred-item__title col-sm-5">
                                    {   file.dir_name}
                                </div>
                                <div className="starred-item__content col-sm-3">
                                    {uploadFileInDir}
                                </div>
                                <div className="starred-item__content col-sm-1">
                                    {canShareDir}
                                </div>
                                <div className="starred-item__content col-sm-1">
                                    {starred}
                                </div>
                                <Modal isOpen={this.state.modalIsOpenDir} onAfterOpen={this.afterOpenModal} onRequestClose={this.closeModalDir}
                                       style={customStyles} contentLabel="Example Modal">
                                    {messageForShareDir}
                                    <h2>Share Folder</h2>
                                    <form>
                                        <input type="text" className="form-control" placeholder="Email Id"
                                               value={this.state.email}
                                               onChange={(event) => {
                                                   this.setState({...this.state,email: event.target.value});
                                               }}required/>
                                        <br/>
                                        <div className ="row">
                                            <div className ="col-sm-8"></div>
                                            <div className ="col-sm-2"><button className ="btn btn-info" onClick={this.closeModalDir}>close</button></div>
                                            <div className ="col-sm-2"><button className ="btn btn-info" onClick={this.handleShareDir}>Share</button></div>
                                        </div>
                                    </form>
                                </Modal>
                                <div className="starred-item__content col-sm-1">
                                    {canDeleteDir}
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
                                <div className="starred-item__content col-sm-1">
                                    {canShare}
                                </div>
                                <div className="starred-item__content col-sm-1 ">
                                    {starred}
                                </div>
                                <Modal isOpen={this.state.modalIsOpenFile} onAfterOpen={this.afterOpenModal} onRequestClose={this.closeModalFile}
                                       style={customStyles} contentLabel="Example Modal">
                                    {messageForShareFile}
                                    <h2>Share File</h2>
                                    <form>
                                        <input type="email" className="form-control" placeholder="Email Id"
                                               value={this.state.email}
                                               onChange={(event) => {
                                                   this.setState({...this.state,email: event.target.value});
                                               }}required/>
                                        <br/>
                                        <div className ="row">
                                        <div className ="col-sm-8"></div>
                                            <div className ="col-sm-2"><button className ="btn btn-info" onClick={this.closeModalFile}>close</button></div>
                                            <div className ="col-sm-2"><button className ="btn btn-info" onClick={this.handleShareFile}>Share</button></div>
                                        </div>
                                    </form>
                                </Modal>
                                <div className="col-sm-1">
                                    {canDelete}
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

function mapDispatchToProps(dispatch) {
    // return bindActionCreators({loginState:loginState},dispatch)
    return {
        loginState: (data) => dispatch(loginState(data))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FilesList);