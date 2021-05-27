const initialState = {
    data_rental_info: []
}

const rental_info = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_RENTAL_INFO_FULFILLED':
            return {
                ...state,
                data_rental_info: action.payload.data
            }
    
        default:
            return state;
    }
}

export default rental_info;