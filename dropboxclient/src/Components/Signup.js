import React, {Component} from 'react';
import * as API from '../Api/UserLogin';
import * as Validate from './validation';

class Signup extends Component{
    constructor(props){
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            message: '',
            switchState: ''
        };
    }
    // validate = () => {
    //     var valid=false;
    //     valid = document.getElementById("signupForm").addEventListener("submit",function(event){
    //         event.target.checkValidity();
    //         event.preventDefault()
    //     },false);
    //     if(valid){
    //         this.handleSubmit;
    //     }
    //     $
    // }
    loginPage = () => {
        this.props.showlogin();
    }

    handleSubmitForSignup = (event) => {
       var valid = Validate.signup(this.state);
       if(valid ===''){
           API.signup(this.state)
               .then((res) => {
                   if (res.data.statusCode === 201) {
                       this.setState({
                           isLoggedIn: true,
                           message: res.data.message
                       });
                   } else if (res.data.statusCode === 401) {
                       this.setState({
                           isLoggedIn: false,
                           message: res.data.message
                       });
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
                        {messagediv}
                        <div className="clearfix">
                            <div className="login-register-header">Create an account</div>
                            <div className="login-register-switch">or
                                <a href="#" className="login-register-switch-link" onClick={() => this.loginPage()}> log in</a>
                            </div>
                        </div>
                        <form id="signupForm" className="form-horizontal">
                            <div className="row">

                                <div className="form-group">
                                    <div className="col-sm-offset-1 col-sm-7">
                                        <input type="text" className="form-control" placeholder="First Name"
                                               value={this.state.firstName}
                                               onChange={(event) => {
                                                   this.setState({...this.state,firstName: event.target.value});
                                               }}required/>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="col-sm-offset-1 col-sm-7">
                                        <input type="test" className="form-control" placeholder="Last Name"
                                               value={this.state.lastName}
                                               onChange={(event) => {
                                                   this.setState({...this.state,lastName: event.target.value});
                                               }}required/>
                                    </div>
                                </div>

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
                                        <input type="checkbox" id="agree" required/>I agree to
                                        <a href="https://www.dropbox.com/terms">Dropbox Terms</a>
                                    </div>
                                    <div className="col-sm-3">
                                        <button type="button" className="btn btn-primary"
                                                onClick={this.handleSubmitForSignup}>Create an account</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

        );
    }
}
export default Signup;

