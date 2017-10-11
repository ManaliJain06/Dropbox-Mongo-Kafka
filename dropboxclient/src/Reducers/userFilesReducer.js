/**
 * Created by ManaliJain on 10/10/17.
 */

const userFiles = {

}

export default function (state=userFiles,action){

    switch (action.type) {
        case "USER_FILE":
            // const newState = loginStatusState;
            const newState  = Object.assign({}, state, action.payload)
            return newState;
        default :
            return state;
    }

}