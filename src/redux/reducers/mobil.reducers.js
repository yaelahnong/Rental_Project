const initialState = {
    data_mobil: [],
    data_detail_mobil: [],
    data_update_stok_mobil: [],
}


const mobil = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_MOBIL_FULFILLED':
            return {
                ...state,
                data_mobil: action.payload.data
            }

        case 'GET_MOBIL_BY_ID_FULFILLED':
            return {
                ...state,
                data_detail_mobil: action.payload.data.message
            }

        case 'INCREMENT_STOK_MOBIL_BY_ID':
            return {
                ...state,
                data_update_stok_mobil: action.payload.data
            }

        case 'DECREMENT_STOK_MOBIL_BY_ID':
            return {
                ...state,
                data_update_stok_mobil: action.payload.data
            }
            
        default:
            return state;
    }
}

export default mobil;