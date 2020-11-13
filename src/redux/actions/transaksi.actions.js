import Axios from 'axios';

export const postTransaksi = (token, data) => ({
    type: 'POST_TRANSAKSI',
    payload: Axios.post(`http://localhost:8000/transaksi?api_token=${token}`, data)
});

export const deleteTransaksi = (token, kode_transaksi) => ({
    type: 'DELETE_TRANSAKSI',
    payload: Axios.delete(`http://localhost:8000/transaksi/${kode_transaksi}?api_token=${token}`)
});