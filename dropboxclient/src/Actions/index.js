/**
 * Created by ManaliJain on 10/1/17.
 */
export const LOGIN_STATE = 'LOGIN_STATE';

export const loginState = (flag) => {
console.log("action", flag)
    return {
        type: "LOGIN_STATE",
        flag
    }
}
export const loginData = (payload) => {
    console.log("action", payload)
    return {
        type: "LOGIN_DATA",
        payload
    }
}

export const userMenu = (flag) => {
    return {
        type: "MENU_SELECTED",
        flag
    }
}

export const interestUpdate = (interest) => {
    return {
        type: "LOGIN_DATA_INTEREST_UPDATE",
        interest
    }
}

export const aboutUpdate = (about) => {
    return {
        type: "LOGIN_DATA_ABOUT_UPDATE",
        about
    }
}

export const userFiles = (payload) => {
    return {
        type: "USER_FILE",
        payload
    }
}