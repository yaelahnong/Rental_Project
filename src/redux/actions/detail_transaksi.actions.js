import Axios from 'axios';

export const postDetailTransaksi = (token, data) => ({
    type: 'POST_DETAIL_TRANSAKSI',
    payload: Axios.post(`http://localhost:8000/detail_transaksi?api_token=${token}`, data)
});

export const deleteDetailTransaksi = (token, id_detail_transaksi) => ({
    type: 'DELETE_DETAIL_TRANSAKSI',
    payload: Axios.delete(`http://localhost:8000/detail_transaksi/${id_detail_transaksi}?api_token=${token}`)
});