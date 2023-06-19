import { ACTION, declaredStateUser, declaredStateView } from "../../models/index.d" 


let initialState = {
    viewers: [],
    message: null,
    viewSuccess: false,
    viewError: false
}

export default (state: declaredStateView = initialState, action: ACTION) => {
    switch(action.type) {
        case "get_viewers_for_auth":
            return {
                ...state,
                viewers: action.payload,
                viewSuccess: true
            }
        case "VIEW_ERROR":
            return {
                ...state,
                message: action.payload,
                viewError: true
            }
        case "VIEW_RESET": 
            return {
                ...state,
                message: null,
                viewSuccess: false,
                viewError: false
            }
        default:
            return state
    }
}