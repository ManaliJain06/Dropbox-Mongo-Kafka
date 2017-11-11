/**
 * Created by ManaliJain on 10/26/17.
 */

import React, {Component} from 'react';
import {loginData} from '../Actions/index';
import {connect} from 'react-redux';
import createPlotlyComponent from 'react-plotlyjs';
import Plotly from 'plotly.js/dist/plotly-cartesian';
const PlotlyComponent = createPlotlyComponent(Plotly);

class Activity extends Component{
    constructor(props) {
        super(props);
        let loginData = this.props.loginDataProp;
        this.state = {
            "user_uuid" : loginData.user_uuid,
            "message": '',
            "link": ''
        }
    }

    render() {
        let dates = [];
        let frequency = [];
        let graphData = [];
        let files =  this.props.useFilesProp;
        let flag =true;
        let fileDatePart;
        console.log(files);

        for(let i=0; i<files.length; i++){

            for (let j = 0; j < graphData.length; j++) {
                let graphDatePart = graphData[j].date.split(" ");
                if(files[i].dir_name === "") {
                    fileDatePart = files[i].filesArray[0].file_created.split(" ");
                } else {
                    fileDatePart = files[i].dir_created.split(" ");
                }

                if(fileDatePart[0] === graphDatePart[0]) {
                    flag = false;
                    graphData[j].frequency = graphData[j].frequency+1;
                    break;
                }
                flag = true;
            }

            if (flag) {
                let json = {};
                if(files[i].dir_name === ""){
                      json = {
                        "date": files[i].filesArray[0].file_created,
                        "frequency": 1
                    };
                } else{
                    json = {
                        "date": files[i].dir_created,
                        "frequency": 1
                    };
                }
                graphData.push(json);
            }
            console.log(graphData);
        }

    if(graphData.length >0){
        for(let i=0; i<graphData.length; i++){
            dates.push(graphData[i].date);
            frequency.push(graphData[i].frequency);
        }
    }
    let data = [
        {
            type: 'scatter',
            x: dates,
            y: frequency,
            marker: {
                color: '#0070E0'
            }
        },
    ];
    let layout = {
        title: 'Activity Report',
        xaxis: {
            title: 'time'
        },
        yaxis: {
            title: 'All Directories and file created'
        },
    };
    let config = {
        showLink: false,
        displayModeBar: true
    };
    return(
        <div className="row">
            <div className ="col-lg-1"> </div>
            <div className ="col-lg-11">
                <PlotlyComponent data={data} layout={layout} config={config}/>
            </div>
        </div>
    );
    }
}
function mapDispatchToProps(dispatch) {
    return {
        loginData: (data) => dispatch(loginData(data)),
    };
}

function mapStateToProps(state) {
    return{
        loginDataProp : state.loginData,
        useFilesProp : state.userFiles
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Activity);