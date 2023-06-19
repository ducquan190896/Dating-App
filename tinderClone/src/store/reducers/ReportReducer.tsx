import { ACTION, declaredStateReport, declaredStateUser } from "../../models/index.d" 


let initialState = {
    reports:  [],
    report:  {},
    isReported: false,
    message: null,
    reportSuccess: false,
    reportError: false
}

export default (state: declaredStateReport = initialState, action: ACTION) => {
    switch(action.type) {
        case "add_report":
            return {
                ...state,
                report: action.payload,
                isReported: true,
                reportSuccess: true
            }
        case "check_exist_by_reportedUser_and_auth":
            return {
                ...state,
                isReported: action.payload,
                reportSuccess: true
            }
        case "report_ERROR":
            return {
                ...state,
                message: action.payload,
                reportError: true
            }
        case "report_RESET": 
            return {
                ...state,
                message: null,
                reportSuccess: false,
                reportError: false,
                isReported: false
            }
        default:
            return state
    }
}