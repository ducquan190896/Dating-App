import { ACTION, declaredStateBlock } from "../../models/index.d" 


let initialState = {
    blocks:  [],
    block:  {},
    isblocked: false,
    message: null,
    blockSuccess: false,
    blockError: false
}

export default (state: declaredStateBlock = initialState, action: ACTION) => {
    switch(action.type) {
        case "add_block":
            return {
                ...state,
                block: action.payload,
                isblocked: true,
                blockSuccess: true
            }
        case "check_exist_by_blockedUser_and_auth":
            return {
                ...state,
                isblocked: action.payload,
                blockSuccess: true
            }
        case "BLOCK_ERROR":
            return {
                ...state,
                message: action.payload,
                blockError: true
            }
        case "Block_RESET": 
            return {
                ...state,
                message: null,
                blockSuccess: false,
                blockError: false,
                isblocked: false
            }
        default:
            return state
    }
}