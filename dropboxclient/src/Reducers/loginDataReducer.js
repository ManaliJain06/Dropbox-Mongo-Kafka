/**
 * Created by ManaliJain on 10/3/17.
 */
const loginDataState  = {

}

export default function(state=loginDataState,action){

    switch (action.type) {
        case "LOGIN_DATA":
            // const newState = loginStatusState;
            const newState  = Object.assign({}, state,action.payload)
            return newState;

        case "LOGIN_DATA_INTEREST_UPDATE":
            // const newState = loginStatusState;
            const newState1  = Object.assign({}, state,{ interest: action.interest })
            console.log("updated interest is", newState1);
            return newState1;

        case "LOGIN_DATA_ABOUT_UPDATE":
            // const newState = loginStatusState;
            const newState2  = Object.assign({}, state,{ overview: action.about })
            console.log("updated about is", newState1);
            return newState2;

        default :
            return state
    }

}