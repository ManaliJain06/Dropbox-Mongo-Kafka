/**
 * Created by ManaliJain on 10/11/17.
 */

const axios = require("axios");
// const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001'
// const token = localStorage.jwtToken;


export const starItem = (payload) => {
    const token = sessionStorage.jwtToken;
    console.log("token",token);
    return axios.post('http://localhost:3003/star', payload, {
            headers: { 'authorization': token }
        }
    )
        .then(function (response) {
            console.log("cookie: ",document.cookie);
            console.log(response);
            return response
        })
        .catch(function (error) {
            console.log(error);
            return error
        });
};

export const deleteFile = (payload) => {
    const token = sessionStorage.jwtToken;
    console.log("token",token);
    return axios.post('http://localhost:3003/deleteFile', payload, {
            headers: { 'authorization': token }
        }
    )
        .then(function (response) {
            console.log("cookie: ",document.cookie);
            console.log(response);
            return response
        })
        .catch(function (error) {
            console.log(error);
            return error
        });
};

export const deleteDir = (payload) => {
    const token = sessionStorage.jwtToken;
    console.log("token",token);
    return axios.post('http://localhost:3003/deleteDir', payload, {
            headers: { 'authorization': token }
        }
    )
        .then(function (response) {
            console.log("cookie: ",document.cookie);
            console.log(response);
            return response
        })
        .catch(function (error) {
            console.log(error);
            return error
        });
};

export const deleteFileInDir = (payload) => {
    const token = sessionStorage.jwtToken;
    console.log("token",token);
    return axios.post('http://localhost:3003/deleteFileInDir', payload, {
            headers: { 'authorization': token }
        }
    )
        .then(function (response) {
            console.log("cookie: ",document.cookie);
            console.log(response);
            return response
        })
        .catch(function (error) {
            console.log(error);
            return error
        });
};

export const shareFile = (payload) => {
    const token = sessionStorage.jwtToken;
    console.log("token",token);
    return axios.post('http://localhost:3003/shareFile', payload, {
            headers: { 'authorization': token }
        }
    )
        .then(function (response) {
            console.log("cookie: ",document.cookie);
            console.log(response);
            return response
        })
        .catch(function (error) {
            console.log(error);
            return error
        });
};

export const shareDir = (payload) => {
    const token = sessionStorage.jwtToken;
    console.log("token",token);
    return axios.post('http://localhost:3003/shareDir', payload, {
            headers: { 'authorization': token }
        }
    )
        .then(function (response) {
            console.log("cookie: ",document.cookie);
            console.log(response);
            return response
        })
        .catch(function (error) {
            console.log(error);
            return error
        });
};
