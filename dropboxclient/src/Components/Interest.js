/**
 * Created by ManaliJain on 10/2/17.
 */
import React, {Component} from 'react';
import * as Validate from './validation';
import * as API from '../Api/UserAccount';
import {loginState, loginData, interestUpdate} from '../Actions/index';
import {connect} from 'react-redux';

class Interest extends Component{
    constructor(props) {
        super(props);
        let loginData = this.props.loginDataProp;
        console.log("login data after retrieval is",loginData);
        let interest = '';
        if(loginData.interest !== null || loginData.interest !== undefined)
        {
            interest = JSON.parse(loginData.interest);
        }
        this.state = {
            "music": (interest)? interest.music : '',
            "sports":(interest)? interest.sports : '',
            "shows":(interest)? interest.shows : '',
           "message": ''
        }
    }
    handleSubmitForInterest=(event) => {
        var valid = Validate.interest(this.state);
        if (valid === '') {
            var loginData = this.props.loginDataProp;
            this.setState({
                ...this.state,
                "id": loginData.id,
                "user_uuid": loginData.user_uuid
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

        API.saveInterest(this.state)
            .then((res) => {
                if (res.data.statusCode === 201) {
                    this.setState({
                        isLoggedIn: true,
                        message: res.data.message
                    });
                    let interest ={
                        "music": this.state.music,
                        "sports":this.state.sports,
                        "shows":this.state.shows,
                    }
                    this.props.interestUpdate(JSON.stringify(interest));
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
                <form className="form-horizontal InterestForm">
                    <div className="row">

                        <div className="form-group">
                            <div className="col-sm-2">
                                Music
                            </div>
                            <div className="col-sm-offset-1 col-sm-7">
                                <input type="text" className="form-control" placeholder="Music"
                                       value={this.state.music}
                                       onChange={(event) => {
                                           this.setState({...this.state,music: event.target.value});
                                       }}/>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="col-sm-2">
                                Sports
                            </div>
                            <div className="col-sm-offset-1 col-sm-7">
                                <input type="text" className="form-control" placeholder="Sports"
                                       value={this.state.sports}
                                       onChange={(event) => {
                                           this.setState({...this.state,sports: event.target.value});
                                       }}/>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="col-sm-2">
                                Shows
                            </div>
                            <div className="col-sm-offset-1 col-sm-7">
                                <input type="text" className="form-control" placeholder="Shows"
                                       value={this.state.shows}
                                       onChange={(event) => {
                                           this.setState({...this.state,shows: event.target.value});
                                       }}/>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="col-sm-offset-3 col-sm-4">
                                <button type="button" className="btn btn-info"
                                        onClick={this.handleSubmitForInterest}>Submit</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
// export default Interest;
function mapDispatchToProps(dispatch) {
    // return bindActionCreators({loginState:loginState},dispatch)
    return {
        loginState: (data) => dispatch(loginState(data)),
        loginData: (data) => dispatch(loginData(data)),
        interestUpdate: (data) => dispatch(interestUpdate(data))
    };
}

function mapStateToProps(state) {
    "use strict";
    console.log("state App", state)
    return{
        loginDataProp : state.loginData
    };


}

export default connect(mapStateToProps, mapDispatchToProps)(Interest);