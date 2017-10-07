
/**
 * Created by ManaliJain on 9/30/17.
 */

const menuState = {
    'menuSelection' : 'home'
}

export default function (state=menuState,action){

    switch (action.type) {
        case "MENU_SELECTED":
            // const newState = loginStatusState;
            const newState  = Object.assign({}, state, { menuSelection: action.flag })
            return newState;
        default :
            return state;
    }

}