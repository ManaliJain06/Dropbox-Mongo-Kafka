/**
 * Created by ManaliJain on 10/1/17.
 */

import React, {Component} from 'react';
import UploadSidebar from './UploadSidebar';
// import {
//     BrowserRouter as Router,
//     Link
// } from 'react-router-dom'

class Home extends Component{


    render() {

        return(
            <div className="row">
                <div className ="col-lg-9">
                 <div className="maestro-app-content">
                    <div className="home">
                        <main className="home-access" role="main">
                            <ul className="home-access-sections">
                                <li className="home-access-section"></li>
                                <li className="home-access-section">
                                    <div className="starred">
                                        <h2 className="home-access-section__header">
                                            <div className="home-access-section__title">
                                                <div className="home-access-section__title-text">
                                                    <div>Starred</div>
                                                </div>
                                            </div>
                                        </h2>
                                        <ul className="starred-list">
                                            <li className="starred-item">
                                                <div className="starred-item__content">
                                                    <a href="#" className="starred-item__title">test</a>
                                                    <div className="starred-item__star">
                                                        <div className="react-title-bubble__container">
                                                            <button className="star__toggle star__toggle--starred" role="button" aria-pressed="true" aria-label="Star"></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </main>
                    </div>
                </div>
                </div>

                <div className ="col-lg-3">
                    <UploadSidebar/>
                </div>
            </div>

        );
    }
}
export default Home;