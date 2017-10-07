/**
 * Created by ManaliJain on 9/28/17.
 */

import React, {Component} from 'react';
import '../dropbox.css';
import Header from './Header';
import Footer from './Footer';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import Signup from './Signup';



class Dropbox extends Component{
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         isSignupCicked: false
    //     }
    // }
    // signupPage=(signup) => {
    //     this.setState({
    //         isSignupCicked: signup
    //     });
    // }
    render() {
        // if(!(this.state.isSignupCicked)){
        //     return(
        //         <div className="container-fluid">
        //         <span className="dropbox-2015 dropbox-logo-2015">
        //             <Header signup={this.signupPage}/>
        //             {/*{this.props.children}*/}
        //             <HomePage/>
        //             <Footer/>
        //         </span>
        //         </div>
        //     );
        // } else{
            return(
                <div className="container-fluid">
                    <span className="dropbox-2015 dropbox-logo-2015">
                        <Header signup={this.signupPage}/>
                            <div className="mid-section">
                                <LoginPage/>
                                {/*<Signup/>*/}
                            </div>
                         {/*<HomePage/>*/}

                        <Footer/>
                    </span>
                </div>
            );
        // }

    }
}
export default Dropbox;
