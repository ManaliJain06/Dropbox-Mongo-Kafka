/**
 * Created by ManaliJain on 10/14/17.
 */
import React, {Component} from 'react';
import * as API from '../Api/GroupOperations';
import * as api from '../Api/FileUpload';
import {loginData,loginState} from '../Actions/index';
import {connect} from 'react-redux';
import FilesInGroup from './FilesInGroup';
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
class GroupList extends Component{
    constructor(props) {
        super(props);
        let loginData = this.props.loginDataProp;
        // let name = loginData.firstname + " " + loginData.lastname;
        this.state = {
            "user_uuid" : loginData.user_uuid,
            "email": '',
            "addMember":'',
            "deleteMember": '',
            "messageForAddMem" :'',
            "messageForDeleteMem" :'',
            "d_name": ''
            // "user_name" : name,
            // "modalIsOpenGroup" : false,
            // "message" : '',
            // "group" : '',
            // "groupName": ''
        }
        this.openAddMember = this.openAddMember.bind(this);
        this.closeAddMember = this.closeAddMember.bind(this);
        this.openDeleteMember = this.openDeleteMember.bind(this);
        this.closeDeleteMember = this.closeDeleteMember.bind(this);
    }
    openAddMember() {
        this.setState({addMember: true});
    }
    openDeleteMember() {
        this.setState({deleteMember: true});
    }
    closeAddMember() {
        this.setState({addMember: false});
    }
    closeDeleteMember() {
        this.setState({deleteMember: false});
    }

    handleDeleteMember = () => {
        const group = this.props.group;
        var flag = true;

        if (this.state.d_name === group.creator_name) {
            this.setState({
                messageForDeleteMem: 'You cannot delete yourself as you created the group. Delete the group instead'
            });
        } else {
            if (group.membersArray.length > 0) {
                for (let i = 0; i < group.membersArray.length; i++) {
                    if (this.state.d_name === group.membersArray[i].member_name) {
                        let deleteMem = {
                            "delete_uuid": group.membersArray[i].member_uuid,
                            "group_name": group.group_name,
                            "group_uuid": group.group_uuid
                        }
                        flag = false;
                        this.callAPIForDeleteMember(deleteMem);
                    }
                }
                if(flag){
                    this.setState({
                        messageForDeleteMem: 'Member Name is not in group. Please select from below member names'
                    });
                }
            } else {
                this.setState({
                    messageForDeleteMem: 'No Members in the group to delete'
                });
            }
        }

    }

    callAPIForDeleteMember = (payload) => {
        API.deleteMember(payload)
            .then((res) => {
                if (res.data.statusCode === 201) {
                    this.closeDeleteMember();
                    this.props.callGroup('group');
                } else if (res.data.statusCode === 500) {
                    this.setState({
                        messageForDeleteMem: res.data.message
                    });
                    this.closeModalDir();
                } else if(res.data.statusCode === 300) {
                    this.setState({
                        messageForDeleteMem: res.data.message,
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

    handleAddMember = () => {
        const group =  this.props.group;
        let addMem = {
            "addToEmail" : this.state.email,
            "group_name": group.group_name,
            "group_uuid": group.group_uuid
        }
        // console.log("shared dir data", shareDirData);
        this.callAPIForAddMember(addMem);
    }

    callAPIForAddMember = (payload) => {
        API.addMember(payload)
            .then((res) => {
                if (res.data.statusCode === 201) {
                    this.closeAddMember();
                    this.props.callGroup('group');
                } else if (res.data.statusCode === 500) {
                    this.setState({
                        messageForAddMem: res.data.message
                    });
                    this.closeModalDir();
                } else if(res.data.statusCode === 300) {
                    this.setState({
                        messageForAddMem: res.data.message,
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

    uploadFileInGroup = (event) => {
        const payload = new FormData();
        payload.append('file', event.target.files[0]);
        payload.append('user_uuid', loginData.user_uuid);

        api.uploadFileGroup(payload)
            .then((res) => {
                if (res.status === 201) {
                    const group =  this.props.group;
                    this.setState({
                        ...this.state,
                        "file_uuid": res.data.file_uuid,
                        "group_name": group.group_name,
                        "group_uuid": group.group_uuid,
                    }, this.callUploadInGroupAPI);
                } else {
                    alert("Error in file upload");
                }
            });
    };
    callUploadInGroupAPI = () => {
        api.uploadInGroup(this.state)
            .then((res) => {
                if (res.data.statusCode === 201) {
                    this.props.callGroup('group');
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
    myCallbackForDeleteFileGroup = (callFileList) =>{
        console.log("inside this hti thsi");
        this.props.callGroup('group');
    }

    render() {
        // for message on Modal(popup) add member
        let messageForAddMem =null;
        if(this.state.messageForAddMem !== ''){
            messageForAddMem = <div className="clearfix">
                <div className="alert alert-info text-center" role="alert">{this.state.messageForAddMem}</div>
            </div>;
        } else{
            messageForAddMem = <div></div>;
        }

        let messageForDeleteMem = null;
        if(this.state.messageForDeleteMem !== ''){
            messageForDeleteMem = <div className="clearfix">
                <div className="alert alert-info text-center" role="alert">{this.state.messageForDeleteMem}</div>
            </div>;
        } else{
            messageForDeleteMem = <div></div>;
        }

        const group =  this.props.group;
        console.log("groupffff",group);

        if(group !== ''){
            let members = '';
            if(group.membersArray.length>0){
                for(let i = 0; i<group.membersArray.length;i++){
                    members = members + group.membersArray[i].member_name +" " + " ";
                }
            }
            let filesInGroup ='';
            if(group.filesArray.length>0){
                filesInGroup =  group.filesArray.map((item, index) => {
                    return (
                        <FilesInGroup
                            key={index}
                            fileListInGrp={item}
                            group1 = {group}
                            callFileGroup={this.myCallbackForDeleteFileGroup}
                        />
                    );
                });
            } else {
                filesInGroup = <div> </div>
            }
            return (
                <div>
                    <ul className="starred-list">
                        <div className ="row">
                            <li className="starred-item">
                                <div className="image-wrapper-groups col-sm-1"> </div>

                                <div className="starred-item__content starred-item__title col-sm-3">
                                    {   group.group_name}
                                </div>
                                <div className="starred-item__content col-sm-2">
                                    <div className="side-buttons">
                                        <div className="upload-button-dir">
                                            <div>Upload File</div>
                                            <input className="upload" type="file" name="file"
                                                   onChange={this.uploadFileInGroup}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="starred-item__content col-sm-2">
                                    <div className="star" onClick={this.openAddMember}><u>Show/Add Member</u></div>
                                </div>
                                <Modal isOpen={this.state.addMember} onRequestClose={this.closeAddMember}
                                       style={customStyles} contentLabel="Example Modal">
                                    {messageForAddMem}
                                    <h2>Add Members</h2>
                                    <form>
                                        <h4> Members in the group are-</h4>
                                        <div className ="star">
                                            <b>{members}</b>
                                        </div>
                                        <input type="text" className="form-control" placeholder="Email Id"
                                               value={this.state.email}
                                               onChange={(event) => {
                                                   this.setState({...this.state,email: event.target.value});
                                               }}required/>
                                        <br/>
                                        <div className ="row">
                                            <div className ="col-sm-8"></div>
                                            <div className ="col-sm-2"><button className ="btn btn-info" onClick={this.closeAddMember}>close</button></div>
                                            <div className ="col-sm-2"><button className ="btn btn-info" onClick={this.handleAddMember}>Add</button></div>
                                        </div>
                                    </form>
                                </Modal>
                                <div className="starred-item__content col-sm-2">
                                    <div className="star" onClick={this.openDeleteMember}><u>Delete Member</u></div>
                                </div>
                                <Modal isOpen={this.state.deleteMember} onRequestClose={this.closeDeleteMember}
                                       style={customStyles} contentLabel="Example Modal">
                                    {messageForDeleteMem}
                                    <h2>Delete Members</h2>
                                    <form>
                                        <h4> Select Members to delete form the group-</h4>
                                        <div className ="star">
                                            <b>{members}</b>
                                        </div>
                                        <input type="text" className="form-control" placeholder="Member Full Name"
                                               value={this.state.d_name}
                                               onChange={(event) => {
                                                   this.setState({...this.state,d_name: event.target.value});
                                               }}required/>
                                        <br/>
                                        <div className ="row">
                                            <div className ="col-sm-8"></div>
                                            <div className ="col-sm-2"><button className ="btn btn-info" onClick={this.closeDeleteMember}>close</button></div>
                                            <div className ="col-sm-2"><button className ="btn btn-info" onClick={this.handleDeleteMember}>Delete</button></div>
                                        </div>
                                    </form>
                                </Modal>
                                <div className="starred-item__content col-sm-2">
                                    <div className="star" onClick={this.handleDeleteFile}><u>Delete Group</u></div>
                                </div>
                            </li>
                        </div>
                        <ul className="starred-list">
                            {filesInGroup}
                        </ul>
                    </ul>
                </div>
            );
        }else {
            return (
                <div>
                    <div className = "row">
                        <ul className="starred-list">
                            <li className="starred-item">
                                <div className="starred-item__content">

                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(GroupList);