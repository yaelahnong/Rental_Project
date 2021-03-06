import Axios from 'axios';

export const getMobil = (token) => ({
    type: 'GET_MOBIL',
    payload: Axios.get(`http://localhost:8000/mobil?api_token=${token}`)
});

export const getMobilById = (token, id) => ({
    type: 'GET_MOBIL_BY_ID',
    payload: Axios.get(`http://localhost:8000/mobil/${id}?api_token=${token}`)
});

export const addStokMobilById = (token, id) => ({
    type: 'INCREMENT_STOK_MOBIL_BY_ID',
    payload: Axios.put(`http://localhost:8000/tambahStokMobil/${id}?api_token=${token}`)
});

export const minStokMobilById = (token, id) => ({
    type: 'DECREMENT_STOK_MOBIL_BY_ID',
    payload: Axios.put(`http://localhost:8000/kurangStokMobil/${id}?api_token=${token}`)
});