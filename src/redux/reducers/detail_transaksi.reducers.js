const initialState = {
    data_detail_transaksi: [],
}

const detail_transaksi = (state = initialState, action) => {
    switch (action.type) {
        case 'POST_DETAIL_TRANSAKSI_FULFILLED':
            return {
                ...state,
                data_detail_transaksi: action.payload.data
            }

        case 'DELETE_DETAIL_TRANSAKSI_FULFILLED':
            return {
                ...state,
                data_detail_transaksi: action.payload.data
            }
        default:
            return state;
    }
}

export default detail_transaksi;