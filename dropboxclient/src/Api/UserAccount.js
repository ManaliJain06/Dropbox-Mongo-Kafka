/**
 * Created by ManaliJain on 10/2/17.
 */
const axios = require("axios");
// const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001'


export const saveInterest = (payload) => {
    console.log("payload", payload)
    return axios.post('http://localhost:3003/postUserInterest', {data: payload, credentials:'include' }
    )
        .then(function (response) {
            console.log(response);
            return response
        })
        .catch(function (error) {
            console.log(error);
            return error
        });
};

export const saveAbout = (payload) => {
    console.log("payload", payload)
    return axios.post('http://localhost:3003/postUserAbout', {data: payload, credentials:'include'}
    )
        .then(function (response) {
            console.log(response);
            return response
        })
        .catch(function (error) {
            console.log(error);
            return error
        });
};