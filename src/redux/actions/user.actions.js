import Axios from 'axios';

export const userLogin = (data) => ({   
    type: 'USER_LOGIN',
    payload: Axios.post("http://localhost:8000/login", data),
});

export const userRegister = (data) => ({   
    type: 'USER_REGISTER',
    payload: Axios.post("http://localhost:8000/register", data),
});

// export const userSendEmail = (data) => ({   
//     type: 'USER_SEND_EMAIL',
//     payload: Axios.post("http://localhost:8000/forgot_password", data),
// });

export const updatePasswordViaEmail = (data, id) => ({   
    type: 'UPDATE_PASSWORD_VIA_EMAIL',
    payload: Axios.post(`http://localhost:8000/user/${id}`, data),
});