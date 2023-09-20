import {toast} from 'react-toastify';

export default function toastShow(texto) {
    toast.success(texto, {autoClose : 3000, pauseOnHover : false})
}

