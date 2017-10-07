/**
 * Created by ManaliJain on 10/1/17.
 */
import React, {Component} from 'react';
import * as Validate from './validation';
import * as API from '../Api/UserAccount';
import {loginState, loginData, aboutUpdate} from '../Actions/index';
import {connect} from 'react-redux';

class About extends Component{
    constructor(props) {
        super(props);
        let loginData = this.props.loginDataProp;
        console.log("login data after retrieval is",loginData);
        let overview = '';
        if(loginData.overview !== null || loginData.overview !== undefined)
        {
            overview = JSON.parse(loginData.overview);
        }
        this.state = {
            "work": (overview)? overview.work : '',
            "education":(overview)? overview.education : '',
            "phone":(overview)? overview.phone : '',
            "events": (overview)? overview.events : '',
            "message": ''
        }
    }

    handleSubmitForAbout=(event) => {
        var valid = Validate.about(this.state);
        if (valid === '') {
            var loginData = this.props.loginDataProp;
            this.setState({
                ...this.state,
                "id": loginData.id,
                "uuid": loginData.uuid
            }, this.callAPI);
        } else {
            this.setState({
                ...this.state,
                message: valid
            });
            event.preventDefault();
        }
    }

    callAPI = () => {
        API.saveAbout(this.state)
            .then((res) => {
                if (res.data.statusCode === 201) {
                    this.setState({
                        isLoggedIn: true,
                        message: res.data.message
                    });
                    let overview ={
                        "work": this.state.work,
                        "education":this.state.education,
                        "phone":this.state.phone,
                        "events": this.state.events
                    }
                    this.props.aboutUpdate(JSON.stringify(overview));
                } else if (res.data.statusCode === 500) {
                    this.setState({
                        isLoggedIn: false,
                        message: res.data.message
                    });
                } else if(res.data.statusCode === 400) {
                    this.setState({
                        isLoggedIn: false,
                        message: res.data.message
                    });
                }
            });
    };

    render() {
        let messagediv =null;
        if(this.state.message !== ''){
            messagediv = <div className="clearfix">
                <div className="alert alert-danger text-center" role="alert">{this.state.message}</div>
            </div>;
        } else{
            messagediv = <div></div>;
        }
        return(
            <div>
                <div className="row">
                    {messagediv}
                </div>
                <form className="InterestForm">
                    <div className="row">

                        <div className="form-group">
                            <div className="row">
                                <div className="col-sm-12">
                                    <h4>Overview</h4>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-2">
                                    Name
                                </div>
                                <div className="col-sm-offset-1 col-sm-7">
                                    {loginData.firstName + loginData.lastName}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-2">
                                    Email
                                </div>
                                <div className="col-sm-offset-1 col-sm-7">
                                    {loginData.email}
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="row">
                                <div className="col-sm-12">
                                    <h4>Work</h4>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-2">
                                    Currently working at-
                                </div>
                                <div className="col-sm-offset-1 col-sm-7">
                                    <input type="text" className="form-control" placeholder="Workplace"
                                           value={this.state.work}
                                           onChange={(event) => {
                                               this.setState({...this.state,work: event.target.value});
                                           }}/>
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="row">
                                <div className="col-sm-12">
                                    <h4>Education</h4>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-2">
                                    Education
                                </div>
                                <div className="col-sm-offset-1 col-sm-7">
                                    <input type="text" className="form-control" placeholder="Education"
                                           value={this.state.education}
                                           onChange={(event) => {
                                               this.setState({...this.state,education: event.target.value});
                                           }}/>
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="row">
                                <div className="col-sm-12">
                                    <h4>Contact</h4>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-2">
                                    Contact Number
                                </div>
                                <div className="col-sm-offset-1 col-sm-7">
                                    <input type="tel" pattern="^[0-9]{10}" className="form-control" placeholder="Contact"
                                           value={this.state.phone}
                                           onChange={(event) => {
                                               this.setState({...this.state,phone: event.target.value});
                                           }}/>
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="row">
                                <div className="col-sm-12">
                                    <h4>Events</h4>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-2">
                                    Life Events
                                </div>
                                <div className="col-sm-offset-1 col-sm-7">
                                    <input type="text" className="form-control" placeholder="Life Events"
                                           value={this.state.events}
                                           onChange={(event) => {
                                               this.setState({...this.state,events: event.target.value});
                                           }}/>
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="col-sm-offset-3 col-sm-4">

                                <button type="button" className="btn btn-info"
                                        onClick={this.handleSubmitForAbout}>Submit</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
function mapDispatchToProps(dispatch) {
    // return bindActionCreators({loginState:loginState},dispatch)
    return {
        loginState: (data) => dispatch(loginState(data)),
        loginData: (data) => dispatch(loginData(data)),
        aboutUpdate: (data) => dispatch(aboutUpdate(data))
    };
}

function mapStateToProps(state) {
    "use strict";
    console.log("state App", state)
    return{
        loginDataProp : state.loginData
    };


}

export default connect(mapStateToProps, mapDispatchToProps)(About);