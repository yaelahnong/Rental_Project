import Axios from "axios";

export const getRentalInfo = (token) => ({
    type: 'GET_RENTAL_INFO',
    payload: Axios.get(`http://localhost:8000/rental_info?api_token=${token}`)
});