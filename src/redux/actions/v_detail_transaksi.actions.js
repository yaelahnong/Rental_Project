import Axios from 'axios';

export const getViewDetailTransaksiById = (token, id_user) => ({
    type: 'GET_VIEW_DETAIL_TRANSAKSI_BY_ID',
    payload: Axios.get(`http://localhost:8000/details/${id_user}?api_token=${token}`)
});