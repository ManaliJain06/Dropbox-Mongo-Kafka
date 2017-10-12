/**
 * Created by ManaliJain on 10/10/17.
 */
import React, {Component} from 'react';
// import {
//     BrowserRouter as Router,
//     Link
// } from 'react-router-dom'

class FilesInDir extends Component{

    deleteFiles = (fileListInDir) => {
        // this.props.deleteFile('fileListInDir')
    }
    render() {
        const fileListInDir =  this.props.fileListInDir;
        // const dirName = this.props.dirName;
        return(

                    <div className ="row">
                        <li className="starred-item">
                            <div className="starred-item__content col-sm-1">
                                <div className="image-wrapper-fileInDir"></div>
                            </div>
                            <div className="starred-item__content col-sm-9">
                                <a href={fileListInDir.file_path} className="starred-item__title"
                                   download> {fileListInDir.file_name}</a>
                            </div>
                            <div className="starred-item__content col-sm-2">
                                <button type="button" className="btn btn-btn-primary"
                                        onClick = {this.deleteFiles('fileListInDir')}
                                >Delete</button>
                            </div>
                        </li>
                    </div>

        );
    }
}
export default FilesInDir;

