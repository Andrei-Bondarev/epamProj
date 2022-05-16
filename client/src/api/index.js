import axios from "axios";

const API = axios.create({baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
})

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);

export const getTickets = () => API.get('/tickets');
export const createTicket = (ticket) => API.post('/tickets',ticket);
export const handleTicket = (name) => API.post('/tickets/handleNew',name);
export const endHandlingTicket = (operator) => API.post('/tickets/handleInprogress', operator);
