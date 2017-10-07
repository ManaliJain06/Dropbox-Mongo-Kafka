/**
 * Created by ManaliJain on 9/29/17.
 */
import React, {Component} from 'react';
import * as API from '../Api/UserLogin';
import * as Validate from './validation';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {loginState, loginData} from '../Actions/index';
class Login extends Component{

    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            message: '',
        };
    }

    signupPage = ()=>{
        var clicked=true;
        this.props.showSignup(clicked);
    };

    handleSubmitForLogin = (event) => {
        var valid = Validate.login(this.state);
        if(valid ===''){
             API.login(this.state)
                .then((res) => {
                    if (res.data.statusCode === 201) {
                        this.setState({
                            isLoggedIn: true,
                            message: res.data.message
                        });
                        const token = res.data.token;
                        sessionStorage.setItem('jwtToken',token);
                        this.props.loginState(res.data.isLogged);
                        this.props.loginData(res.data.payload);
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
        } else{
            this.setState({
                ...this.state,
                message: valid
            });
            event.preventDefault();
        }


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
                <div>
                    {messagediv}
                    <div className="clearfix">
                        <div className="login-register-header">Sign in</div>
                        <div className="login-register-switch">or
                            <a href="#" className="login-register-switch-link" onClick={() => this.signupPage()}> Create an account</a>
                        </div>
                    </div>
                    <form id="signupForm" className="form-horizontal">
                        <div className="row">


                            <div className="form-group">
                                <div className="col-sm-offset-1 col-sm-7">
                                    <input type="email" className="form-control" placeholder="Email Id"
                                           value={this.state.email}
                                           onChange={(event) => {
                                               this.setState({...this.state,email: event.target.value});
                                           }}required/>
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="col-sm-offset-1 col-sm-7">
                                    <input type="password" className="form-control" placeholder="Password"
                                           value={this.state.password}
                                           onChange={(event) => {
                                               this.setState({...this.state,password: event.target.value});
                                           }}required/>
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="col-sm-offset-1 col-sm-4">
                                    <input type="checkbox" name="terms" value="banks" required/> Remember me
                                </div>
                                <div className="col-sm-3">
                                    <button type="button" className="btn btn-primary"
                                            onClick={this.handleSubmitForLogin}>Sign in</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    // return bindActionCreators({loginState:loginState},dispatch)
    return {
        loginState: (data) => dispatch(loginState(data)),
        loginData: (data) => dispatch(loginData(data))
    };
}

// function mapStateToProps(state) {
//     "use strict";
//     console.log("state App", state)
//     return{
//         loginState : state.loginState
//     };
//
// }

export default connect(null, mapDispatchToProps)(Login);