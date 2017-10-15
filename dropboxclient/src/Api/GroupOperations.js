/**
 * Created by ManaliJain on 10/14/17.
 */
const axios = require("axios");

export const createGroup = (payload) => {
    const token = sessionStorage.jwtToken;
    console.log("token",token);
    return axios.post('http://localhost:3003/createGroup', payload, {
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

export const getGroups = (payload) => {
    const token = sessionStorage.jwtToken;
    console.log("token",token);
    return axios.post('http://localhost:3003/getGroup', payload, {
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

export const addMember = (payload) => {
    const token = sessionStorage.jwtToken;
    console.log("token",token);
    return axios.post('http://localhost:3003/addMember', payload, {
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

export const deleteMember = (payload) => {
    const token = sessionStorage.jwtToken;
    console.log("token",token);
    return axios.post('http://localhost:3003/deleteMember', payload, {
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

export const deleteFileFromGroup = (payload) => {
    const token = sessionStorage.jwtToken;
    console.log("token",token);
    return axios.post('http://localhost:3003/deleteFileFromGroup', payload, {
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