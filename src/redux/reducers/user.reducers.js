// inisialisasi state
const initialState = {
    // membuat state data_user lalu dimasukkan kedalam array
    data_user: [],
    data_user_register: [],
    data_reset_password: [],
    data_update_password: [],
}

const user = (state = initialState, action) => {
    switch (action.type) {
        case 'USER_LOGIN_FULFILLED':
            return {
                // membuat baru state lalu dirubah nilainya
                ...state,
                data_user: action.payload.data
            }    
            
        case 'USER_REGISTER_FULFILLED':
            return {
                ...state,
                data_user_register: action.payload.data
            }
        
        // case 'USER_SEND_EMAIL_FULFILLED':
        //     console.log(action.payload)
        //     return {
        //         ...state,
        //         data_reset_password: action.payload.data
        //     }
        
        case 'UPDATE_PASSWORD_VIA_EMAIL_FULFILLED':
            console.log(action.payload)
            return {
                ...state,
                data_update_password: action.payload.data
            }
    

        default:
            return state;
    }
}

export default user;