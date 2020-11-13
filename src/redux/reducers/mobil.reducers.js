const initialState = {
    data_mobil: [],
    data_detail_mobil: []
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

        default:
            return state;
    }
}

export default mobil;