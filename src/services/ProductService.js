import axios from "axios"

export const getAllProducts = async () => {
    return await axios.get('__url');
}