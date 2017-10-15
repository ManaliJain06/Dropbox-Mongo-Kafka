/**
 * Created by ManaliJain on 10/14/17.
 */
/**
 * Created by ManaliJain on 10/10/17.
 */
import React, {Component} from 'react';
import * as API from '../Api/GroupOperations';
import {loginData,loginState} from '../Actions/index';
import * as home from './Home';
import {connect} from 'react-redux';

class FilesInGroup extends Component{

    constructor(props) {
        super(props);
        let loginData = this.props.loginDataProp;
        this.state = {
            "user_uuid" : loginData.user_uuid,
            'message': ''
        }
    }

    deleteFilesGroup = () => {
        const fileListInGrp =  this.props.fileListInGrp;
        const group =  this.props.group1;
        let deleteFile = {
            "file_uuid" : fileListInGrp.file_uuid,
            "group_name": group.group_name,
            "group_uuid": group.group_uuid
        }
        this.callDeleteFileInGroupAPI(deleteFile);
    }

    callDeleteFileInGroupAPI = (payload) => {
        API.deleteFileFromGroup(payload)
            .then((res) => {
                if (res.data.statusCode === 201) {
                    this.props.callFileGroup('group');
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
        const fileListInGrp =  this.props.fileListInGrp;
        const group = this.props.group1;

        let canDelete =null;
        let isOwner = fileListInGrp.file_owner;
        if(isOwner !== undefined){
            if(isOwner === this.state.user_uuid){
                canDelete = <div className="options star" onClick={this.deleteFilesGroup}><u>Delete</u></div>;
            }
            else{
                canDelete = <div></div>
            }
        } else{
            canDelete = <div className="options star" onClick={this.deleteFilesGroup}><u>Delete</u></div>
        }
        return(
            <div className ="row">
                <li className="starred-item">
                    <div className="starred-item__content col-sm-1">
                        <div className="image-wrapper-fileInDir"> </div>
                    </div>
                    <div className="starred-item__content col-sm-7">
                        <a href={fileListInGrp.file_path} className="starred-item__title"
                           download> {fileListInGrp.file_name}</a>
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
    // return bindActionCreators({loginState:loginState},dispatch)
    return {
        loginState: (data) => dispatch(loginState(data))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FilesInGroup);

