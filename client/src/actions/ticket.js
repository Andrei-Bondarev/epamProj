import * as api from '../api'
import {CREATE, END_HANDLE, FETCH_ALL, HANDLE} from "../constants/actionTypes";

export const getTickets = () => async (dispatch) => {
    try {
        const {data} = await api.getTickets();
        dispatch( {
            type: FETCH_ALL,
            payload: data
        })
    }catch (e) {
        console.log(e);
    }
}

export const createTicket = (ticket) => async (dispatch) => {
    try {
        const {data} = await api.createTicket(ticket);
        dispatch({type:CREATE, payload: data});
    }catch (e) {
        console.log(e);
    }
}

export const handleTicket = (name) => async (dispatch) => {
    try {
        const {data} = await api.handleTicket(name);
        dispatch({type: HANDLE, payload: data})
    }catch (e) {
        console.log(e);
    }
}


export const endhandlingTicket = (operator) => async (dispatch) => {
    try {
        const {data} = await api.endHandlingTicket(operator);
        dispatch({type: END_HANDLE, payload: data})
    }catch (e) {
        console.log(e);
    }
}