/**
 * Created by ManaliJain on 10/10/17.
 */
import React, {Component} from 'react';
import UploadSidebar from './UploadSidebar';
import FilesInDir from './FilesInDir';
import * as API from '../Api/FileUpload';
import {loginData} from '../Actions/index';
import {connect} from 'react-redux';

class FilesList extends Component{

    render() {

        const file =  this.props.file;
        if(file !== ''){
            if(file.dir_name !== null){
                var fileInDirList ='';
                if(file.filesArray.length>0){
                    fileInDirList =  file.filesArray.map((item, index) => {
                            return (
                                <FilesInDir
                                        key={index}
                                        fileListInDir={item}
                                />
                            );
                    });
                }

                var isStar = file.star_id;
                var starred ='';
                if(isStar === 1){
                    starred = 'Starred';
                } else {
                    starred = <div className="starred-item__content col-sm-1">
                                 <button type="button" className="btn btn-btn-primary">Star</button>
                            </div>
                }
                return(
                    <ul className="starred-list">
                        <div className ="row">
                            <li className="starred-item">
                                <div className="image-wrapper-folder col-sm-1"></div>

                                <div className="starred-item__content tarred-item__title col-sm-8">
                                    <div id="fileAccordion" data-children=".item">
                                        <div className="item">
                                            <a data-toggle="collapse" data-parent="#fileAccordion" href="#fileAccordion1"
                                               aria-expanded="true" aria-controls="fileAccordion1">
                                                {   file.dir_name}
                                            </a>
                                            <div id="exampleAccordion1" className="collapse show" role="tabpanel">
                                                {fileInDirList}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="starred-item__content col-sm-1">
                                    {starred}
                                </div>
                                <div className="starred-item__content col-sm-1">
                                    <button type="button" className="btn btn-btn-primary">Share</button>
                                </div>
                                <div className="starred-item__content col-sm-1">
                                    <button type="button" className="btn btn-btn-primary">Delete</button>
                                </div>
                            </li>
                        </div>
                    </ul>
                );
            } else {
                return(
                    <ul className="starred-list">
                        <div className ="row">
                            <li className="starred-item">
                                <div className="starred-item__content col-sm-9">
                                    <a href={file.filesArray[0].file} className="starred-item__title" download>{file.filesArray[0].file_name}</a>
                                </div>
                                <div className="starred-item__content col-sm-2">
                                    <button type="button" className="btn btn-btn-primary">Delete</button>
                                </div>
                            </li>
                        </div>
                    </ul>

                );
            }

        } else {
            return(
                <ul className="starred-list">
                    <li className="starred-item">
                        <div className="starred-item__content">

                        </div>
                    </li>
                </ul>
            );
        }

    }
}
export default FilesList;