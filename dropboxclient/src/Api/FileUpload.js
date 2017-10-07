/**
 * Created by ManaliJain on 10/4/17.
 */
const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3003'
const axios = require("axios");

export const uploadFile = (payload) => {
    console.log("payload", payload);
    return axios.post('http://localhost:3003/files/upload')
        .then(function (response) {
            console.log(response);
            return response
        })
        .catch(function (error) {
            console.log(error);
            return error
        });
};

// export const uploadFile = (payload) =>
//     fetch(`${api}/files/upload`, {
//         method: 'POST',
//         body: payload
//     }).then(res => {
//         return res.status;
//     }).catch(error => {
//         console.log("This is error");
//         return error;
//     });
