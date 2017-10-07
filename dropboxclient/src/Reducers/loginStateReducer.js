/**
 * Created by ManaliJain on 9/30/17.
 */

const loginStatusState = {
    'isLogged' : false
}



export default function (state=loginStatusState,action){

    switch (action.type) {
        case "LOGIN_STATE":
            // const newState = loginStatusState;
            const newState  = Object.assign({}, state, { isLogged: action.flag })
            return newState;
        default :
            return state
    }

}

