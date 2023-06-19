import { ACTION, declaredStateLike, declaredStateUser } from "../../models/index.d" 


let initialState = {
    likes:  [],
    like: {},
    isExist: false,
    message:  null,
    likeSuccess: false,
    likeError: false
}

export default (state: declaredStateLike = initialState, action: ACTION) => {
    switch(action.type) {
        case "get_likingUsers_for_auth":
            return {
                ...state,
                likes: action.payload,
                likeSuccess: true
            }
        case "add_like":
            return {
                ...state,
                like: action.payload,
                likeSuccess: true
            }
        case "get_like_by_likedUser_and_auth":
            return {
                ...state,
                like: action.payload,
                likeSuccess: true
            }
        case "check_exist_by_likedUser_and_auth":
            return {
                ...state,
                isExist: action.payload,
                likeSuccess: true
            }
        case "LIKE_ERROR":
            return {
                ...state,
                message: action.payload,
                likeError: true
            }
        case "LIKE_RESET": 
            return {
                ...state,
                message: null,
                likeSuccess: false,
                likeError: false,
                isExist: false,
                like: null
            }
        default:
            return state
    }
}