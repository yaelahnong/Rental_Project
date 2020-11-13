const initialState = {
    data_transaksi: [],
}

const transaksi = (state = initialState, action) => {
    switch (action.type) {
        case 'POST_TRANSAKSI_FULFILLED':
            return {
                ...state,
                data_transaksi: action.payload.data
            }
        
        case 'DELETE_TRANSAKSI_FULFILLED':
            return {
                ...state,
                data_transaksi: action.payload.data
            }

        default:
            return state;
    }
}

export default transaksi;