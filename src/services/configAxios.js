import axios from 'axios';
import { toast } from 'react-toastify';
import API_URL from './utils/api'

const getAxios = async (timeout = 30000) => {
    try {
        const token = localStorage.getItem('@admin_Token');

        const instance = axios.create({
            baseURL: API_URL,
            timeout: timeout,
            headers: {
                'Authorization': 'Bearer ' +  token
            }
        });

        return instance
    } catch (error) {
        toast.error("Erro na configuração com o servidor")
    }
}

export default getAxios;