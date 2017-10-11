/**
 * Created by ManaliJain on 10/10/17.
 */
import React, {Component} from 'react';
// import {
//     BrowserRouter as Router,
//     Link
// } from 'react-router-dom'

class FilesInDir extends Component{

    render() {
        const fileListInDir =  this.props.fileListInDir;
        // const dirName = this.props.dirName;
        return(
             <p className="mb-3">
                <ul className="starred-list">
                    <div className ="row">
                        <li className="starred-item">
                            <div className="starred-item__content col-sm-9">
                                <a href={fileListInDir.file} className="starred-item__title"
                                   download>{fileListInDir.file_name}</a>
                            </div>
                            <div className="starred-item__content col-sm-2">
                                <button type="button" className="btn btn-btn-primary">Delete</button>
                            </div>
                        </li>
                    </div>
                </ul>

            </p>
        );
    }
}
export default FilesInDir;

