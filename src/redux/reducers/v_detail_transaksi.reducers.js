const initialState = {
    data_view_detail_transaksi: [],
}

const view_detail_transaksi = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_VIEW_DETAIL_TRANSAKSI_BY_ID_FULFILLED':
            return {
                ...state,
                data_view_detail_transaksi: action.payload.data
            }
        default:
            return state;
    }
}

export default view_detail_transaksi;