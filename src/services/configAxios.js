import axios from 'axios';
import { Toast } from '@radix-ui/react-toast';

const getAxios = async (baseURL, timeout = 30000) => {
    try {
        const token = localStorage.getItem('@admin_Token');

        const instance = axios.create({
            baseURL: baseURL,
            timeout: timeout,
            headers: {
                'Authorization': 'Bearer ' +  token
            }
        });

        return instance
    } catch (error) {
        Toast.error("Erro na configuração com o servidor")
    }
}

export default getAxios;