import { ACTION, declaredStateUser } from "../../models/index.d" 


let initialState = {
    authUser: {},
    users: [],
    userUpdateStatus: false,
    userUpdated: {},
    message: null,
    authSuccess: false,
    authError: false
}

export default (state: declaredStateUser = initialState, action: ACTION) => {
    switch(action.type) {
        case "LOG_IN":
            return {
                ...state,
                authUser: action.payload,
                authSuccess: true
            }
        case "REGISTER":
            return {
                ...state,
                authUser: action.payload,
                authSuccess: true
            }    
        case "update_profile":
            return {
                ...state,
                authUser: action.payload,
                userSuccess: true
            }
        case "get_authUser":
            return {
                ...state,
                authUser: action.payload,
                userSuccess: true
            }
        case "Change_Password":
            return {
                ...state,
                authUser: action.payload,
                userSuccess: true
            }
        case "add_image":
            return {
                ...state,
                authUser: action.payload,
                userSuccess: true
            }
        case "remove_image":
            return {
                ...state,
                authUser: action.payload,
                userSuccess: true
            }
        case "remove_interest":
            return {
                ...state,
                authUser: action.payload,
                userSuccess: true
            }
        case "add_interest":
            return {
                ...state,
                authUser: action.payload,
                userSuccess: true
            }
        case "update_preference":
            return {
                ...state,
                authUser: action.payload,
                userSuccess: true
            }
        case "add_preference":
            return {
                ...state,
                authUser: action.payload,
                userSuccess: true
            }
        case "LOG_OUT":
            return {
                ...state,
                authUser: {},
                users: [],
                otherUser: {},
                userSuccess: true
            }
        case "AUTH_ERROR":
            return {
                ...state,
                message: action.payload,
                authError: true
            }
        case "USER_RESET": 
            return {
                ...state,
                userUpdateStatus: false,
                userUpdated: {},
                message: null,
                authSuccess: false,
                authError: false
            }
        default:
            return state
    }
}