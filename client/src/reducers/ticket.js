import {CREATE, END_HANDLE, FETCH_ALL, HANDLE} from "../constants/actionTypes";


const ticketReducer = (state = {tickets: []}, action) => {
    switch (action.type){
        case END_HANDLE:
            return {...state,tickets: state.tickets.map((ticket) => (ticket._id === action.payload._id ? action.payload : ticket))}
        case HANDLE:
            return {...state,tickets: state.tickets.map((ticket) => (ticket._id === action.payload._id ? action.payload : ticket))}
        case CREATE:
            return {...state, tickets: [...state.tickets,action.payload.data]}
        case FETCH_ALL:
            return {...state, tickets: action.payload.data};
        default:
            return state;
    }
}
export default ticketReducer;