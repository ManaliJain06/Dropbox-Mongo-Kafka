import React, {Component} from 'react';
// import {
//     BrowserRouter as Router,
//     Link
// } from 'react-router-dom'

class Header extends Component{
    signupPage = ()=>{
        var clicked=true;
        this.props.signup(clicked);
    };

    render() {

        return(
            <header className="mast-head">
                <div className="container">
                    <div className="blocks">
                    <div className = "row">
                        <div className="col-md-12">
                            <div className="image-wrapper col-md-3 col-md-offset-5"/>
                            <div  className="col-md-2 col-md-offset-2 signin">
                                {/*<Router>*/}
                                    {/*<Link to="/signup">SignUp</Link>*/}
                                {/*</Router>*/}

                                <a href="/login" className="button-link" onClick={() => this.signupPage}>Sign in</a>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </header>
        );
    }
}
export default Header;