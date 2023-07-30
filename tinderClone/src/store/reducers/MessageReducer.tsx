import { ACTION,  declaredStateMESSAGE} from "../../models/index.d" 

const initialState = {
    chatMessage:  {},
    chatMessages: [],
    chatMessageError: false,
    chatMessageSuccess: false,
    message: null
}

export default (state: declaredStateMESSAGE = initialState, action: ACTION) => {
    switch(action.type) {   
        case "get_all_messages_by_chatID":
            return {
                ...state,
                chatMessages: action.payload,
                chatMessageSuccess: true
            } 
        case "add_message_to_chat":
            return {
                ...state,
                chatMessageSuccess: true
            } 
        case "receive_message_from_socket":
            return {
                ...state,
                chatMessage: action.payload,
                chatMessages: [...state.chatMessages, action.payload],
                chatMessageSuccess: true
            } 
        case "clear_messages":
            return {
                ...state,
                chatMessages: [],
                chatMessage: {},
                chatMessageSuccess: true
            } 
        case "message_error":
            return {
                ...state,
                message: action.payload,
                chatMessageError: true
            }
        case "message_reset": 
            return {
                ...state,
                chatMessageSuccess: false,
                chatMessageError: false,
                message: null
            }
       
        default:
            return state
    }
}