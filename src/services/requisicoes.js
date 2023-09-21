import getAxios from './configAxios'
const urlBase = "https://api.box3.work/api"
const token = "6d573016-d980-4275-b513-60b6e3c1e9fb"

export const getClients = async (setDados) => {
    try {
        const axiosInstance = await getAxios();
        const response = await axiosInstance.get(`${urlBase}/Contato/${token}`)
        await setDados(response.data)
    } catch (error) {
        throw error
    }
}

export const handleCreate = async (data, setDados) => {
    try {
        const axiosInstance = await getAxios();
        await axiosInstance.post(`${urlBase}/Contato/${token}`, data)
        await getClients(setDados)
    } catch (error) {
        throw error;
    }
}

export const handleUpdate = async (clientId, data, setDados) => {
    try {
        const axiosInstance = await getAxios()
        await axiosInstance.put(`${urlBase}/Contato/${token}/${clientId}`, data)
        await getClients(setDados)
    } catch (error) {
        throw error;
    }
}

export const handleDelete = async (clientId, dados, setDados) => {
    try {
        const axiosInstance = await getAxios()
        await axiosInstance.delete(`${urlBase}/Contato/${token}/${clientId}`)
        await setDados(dados.filter(item => item.id !== clientId))
        //await getClients(setDados)
    } catch (error) {
        throw error;
    }
    
}

export const checkCall = async (setId, setCallData, setOnCall) => {
    try {
        const axiosInstance = await getAxios()
        const response = await axiosInstance.get(`${urlBase}/Telefone/${token}/chamada-em-andamento`)
        const res = response.data;
        setCallData(res);
        setId(res.contato.id);
        setOnCall(true);
    } catch {
        setCallData([]);
        setId("");
        setOnCall(false);
    }
} 

export const handleCreateCall = async (id, setId, setCallData, setOnCall) => {
    try {
        const axiosInstance = await getAxios()
        await axiosInstance.post(`${urlBase}/Telefone/${token}`, {idContato : id}, {headers: {'Content-Type':'application/json'}})
        await checkCall(setId, setCallData, setOnCall)
    } catch (error) {
        throw error
    }
}

export const HandleFinishCall = async (callData, assunto, setId, setOnCall, setCallData) => {
    try {
        const axiosInstance = await getAxios()
        await axiosInstance.put(`${urlBase}/Telefone/${token}/${callData.id}`, {assunto : assunto })
        await checkCall(setId, setCallData, setOnCall)
    }  catch(error) {
        throw error
    }
}