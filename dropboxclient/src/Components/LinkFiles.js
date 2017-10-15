/**
 * Created by ManaliJain on 10/15/17.
 */

import React, {Component} from 'react';

class LinkFiles extends Component {
    render() {
        const file =  this.props.link;
        return (
            <div>
                <ul className="starred-list">
                    <div className="row">
                        <li className="starred-item">
                            <div className="image-wrapper-fileInDir col-sm-1"> </div>

                            <div className="starred-item__content starred-item__title col-sm-3">
                                <a href={file.link} className="starred-item__title"
                                   download> {file.link}</a>
                            </div>
                        </li>
                    </div>
                </ul>
            </div>
        );
    }
}
export default LinkFiles;