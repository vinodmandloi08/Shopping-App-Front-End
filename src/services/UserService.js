import axios from "axios"

export const login_user = async (data) => {
    return await axios.post('__url',data);
}

export const register_user = async (data) => {
    return await axios.post('__url',data);
}