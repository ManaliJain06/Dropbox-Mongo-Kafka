/**
 * Created by ManaliJain on 10/4/17.
 */
const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3003'
const axios = require("axios");

// export const uploadFile = (payload) => {
//     console.log("payload", payload);
//     return axios.post('http://localhost:3003/files/upload')
//         .then(function (response) {
//             console.log(response);
//             return response
//         })
//         .catch(function (error) {
//             console.log(error);
//             return error
//         });
// };

export const uploadFile = (payload) => {
    const token = sessionStorage.jwtToken;
    return fetch(`http://localhost:3003/files`, {
        method: 'POST',
        headers: { 'authorization': token },
        body: payload
    }).then(response =>
        response.json().then(data => ({
            data: data,
            status: response.status
        })
        ).then(res => {
            console.log("hjhjhjhjhjkkjhjhkj",res);
            return res;
        }))
}

export const uploadFileGroup = (payload) => {
    const token = sessionStorage.jwtToken;
    return fetch(`http://localhost:3003/filesGroup`, {
        method: 'POST',
        headers: { 'authorization': token },
        body: payload
    }).then(response =>
        response.json().then(data => ({
                data: data,
                status: response.status
            })
        ).then(res => {
            console.log("hjhjhjhjhjkkjhjhkj",res);
            return res;
        }))
}
// fetch(url).then(response =>
//     response.json().then(data => ({
//             data: data,
//             status: response.status
//         })
//     ).then(res => {
//         console.log(res);
//     }).catch(error => {
//         console.log("This is error");
//         return error;
//     })


export const uploadInDir = (payload) => {
    const token = sessionStorage.jwtToken;
    console.log("token",token);
    return axios.post('http://localhost:3003/uploadFileInDir', payload, {
            headers: { 'authorization': token }
        }
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

export const uploadInGroup = (payload) => {
    const token = sessionStorage.jwtToken;
    console.log("token",token);
    return axios.post('http://localhost:3003/uploadFileInGroup', payload, {
            headers: { 'authorization': token }
        }
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

export const createDirectory = (payload) => {
    const token = sessionStorage.jwtToken;
    console.log("token",token);
    console.log("recahde");
    return axios.post('http://localhost:3003/createDirectory', payload, {
        headers: { 'authorization': token }
        }
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

export const getFiles = () => {
    const token = sessionStorage.jwtToken;
    return axios.get('http://localhost:3003/getFiles', {
        headers: { 'authorization': token }
        }
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
