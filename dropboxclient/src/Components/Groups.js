/**
 * Created by ManaliJain on 10/2/17.
 */
import React, {Component} from 'react';
import GroupList from './GroupList';
import {connect} from 'react-redux';
import * as API from '../Api/GroupOperations';
import {loginData,loginState} from '../Actions/index';
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

class Groups extends Component{
    constructor(props) {
        super(props);
        let loginData = this.props.loginDataProp;
        let name = loginData.firstname + " " + loginData.lastname;
        this.state = {
            "user_uuid" : loginData.user_uuid,
            "user_name" : name,
            "modalIsOpenGroup" : false,
            "message" : '',
            "group" : '',
            "groupName": ''
        }
        this.openModalGroup = this.openModalGroup.bind(this);
        this.closeModalGroup = this.closeModalGroup.bind(this);
    }

    openModalGroup() {
        this.setState({modalIsOpenGroup: true});
    }
    closeModalGroup() {
        this.setState({modalIsOpenGroup: false});
    }

    handleSubmitForCreateGroup =()=> {
        // const file = this.props.file;
        let createGroup = {
            "groupName" : this.state.groupName,
            "user_uuid": this.state.user_uuid,
            "user_name": this.state.user_name
        }
        console.log("shared dir data", createGroup);
        this.callAPIForCreateGroup(createGroup);
    }

    callAPIForCreateGroup = (payload) => {
        API.createGroup(payload)
            .then((res) => {
                if (res.data.statusCode === 201) {
                    this.closeModalGroup();
                    this.componentDidMount();
                } else if (res.data.statusCode === 500) {
                    this.setState({
                        messgae: res.data.message
                    });
                    this.closeModalGroup();
                } else if(res.data.statusCode === 400) {
                    this.setState({
                        message: res.data.message,
                    });
                    this.closeModalGroup();
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

    afterOpenModalGroup() {
        // references are now sync'd and can be accessed.
        // this.subtitle.style.color = '#f00';
    }

    myCallbackForGroup=(callGroup) => {
        this.componentDidMount();
    };

    componentDidMount() {
        API.getGroups()
            .then((res) => {
            console.log("res of component did mount is",res);
                if (res.data.statusCode === 201) {
                    this.setState({
                        message: res.data.message,
                        group: res.data.group
                    });
                    // this.props.userFiles(res.data.files);
                } else if (res.data.statusCode === 500) {
                    this.setState({
                        message: res.data.message
                    });
                } else if(res.data.statusCode === 300) {
                    this.setState({
                        message: res.data.message,
                        group: res.data.group
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
        console.log("groups state is --- ", this.state.group);
        let groupList ='';
        if(this.state.group === '' || this.state.group === undefined){
            groupList = <GroupList key='' group=''/>;
        } else {
            groupList =  this.state.group.map((item, index) => {
                return (
                    <GroupList
                        key={index}
                        group={item}
                        callGroup={this.myCallbackForGroup}
                    />
                );
            })
        }
        return(
            <div>
                {/*{this.state.message}*/}
                <div className="row">
                    <div className="form-group home-access-sections-groups">
                        <div className="col-sm-2">
                            <button type="submit" className="btn btn-primary"
                                    onClick={this.openModalGroup}>Create new Group</button>
                        </div>
                        <div className="col-sm-10"> </div>
                    </div>
                </div>
                <Modal isOpen={this.state.modalIsOpenGroup} onAfterOpen={this.afterOpenModalGroup} onRequestClose={this.closeModalGroup}
                       style={customStyles} contentLabel="Example Modal">
                    {/*{messageForShareGroup}*/}
                    <h2>Create Group</h2>
                    <form>
                        <input type="text" className="form-control" placeholder="Group Name"
                               value={this.state.groupName}
                               onChange={(event) => {
                                   this.setState({...this.state,groupName: event.target.value});
                               }}required/>
                        <br/>
                        <div className ="row">
                            <div className ="col-sm-8"> </div>
                            <div className ="col-sm-2"><button className ="btn btn-info" onClick={this.closeModalGroup}>close</button></div>
                            <div className ="col-sm-2"><button className ="btn btn-info" onClick={this.handleSubmitForCreateGroup}>Create</button></div>
                        </div>
                    </form>
                </Modal>
                <div className="row">
                    {/*{this.state.message}*/}
                    <div className ="col-lg-12">
                        <main className="home-access" role="main">
                            <ul className="home-access-sections-groups">
                                <li className="home-access-section"> </li>

                                <li className="home-access-section">
                                    <div className="starred">
                                        <h2 className="home-access-section__header">
                                            <div className="home-access-section__title">
                                                <div className="home-access-section__title-text">
                                                    <div>Groups</div>
                                                </div>
                                            </div>
                                        </h2>
                                        {groupList}
                                    </div>
                                </li>
                            </ul>
                        </main>
                    </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Groups);
