/**
 * Created by ManaliJain on 9/29/17.
 */
import React, {Component} from 'react';
import Signup from './Signup';
import Login from './Login';

class LoginPage extends Component{
    // signupPage = ()=>{
    //     var clicked=true;
    //     this.props.signup(clicked);
    // };
    constructor(props){
        super(props);
        this.state = {
            isLoginClicked : true,
            isSignupClicked : false
        };
    }
    mycallbackForLogin=()=>{
        this.setState({
            isLoginClicked : true,
            isSignupClicked : false
        });
    }
    mycallbackForSignUp = () => {
        this.setState({
            isLoginClicked : false,
            isSignupClicked : true
        });
    }
    render() {
        let switchDecision = null;
        if(this.state.isSignupClicked){
            switchDecision = <Signup showlogin = {this.mycallbackForLogin}/>;
        }
        if(this.state.isLoginClicked){
            switchDecision = <Login showSignup = {this.mycallbackForSignUp}/>;
        }

        return(
            <div>
                <div className="modal-body row">
                    <div className="col-md-6">
                        <div className="image-wrapper-signup"></div>
                    </div>
                    <div className="login-signup col-md-6">
                        {switchDecision}
                    </div>
                </div>
            </div>
        );
    }
}
export default LoginPage;