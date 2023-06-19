import { ACTION, declaredStateLike, declaredStateMatch, declaredStateUser } from "../../models/index.d" 


let initialState = {
    matches:  [],
    match:  {},
    isExist: false,
    message:  null,
    matchSuccess: false,
    matchError: false
}

export default (state: declaredStateMatch = initialState, action: ACTION) => {
    switch(action.type) {
        case "get_match_by_matchID":
            return {
                ...state,
                match: action.payload,
                matchSuccess: true
            }
        case "get_match_by_user1_and_user2":
            return {
                ...state,
                match: action.payload,
                matchSuccess: true
            }
        case "get_matches_by_auth":
            return {
                ...state,
                matches: action.payload,
                matchSuccess: true
            }
        case "get_match_existence_by_user1_and_user2":
            return {
                ...state,
                isExist: action.payload,
                matchSuccess: true
            }
        case "get_match_existence_by_matchID":
            return {
                ...state,
                isExist: action.payload,
                matchSuccess: true
            }
        case "MATCH_ERROR":
            return {
                ...state,
                message: action.payload,
                matchError: true
            }
        case "MATCH_RESET": 
            return {
                ...state,
                message: null,
                matchSuccess: false,
                matchError: false,
                isExist: false
            }
        default:
            return state
    }
}