import React, { useState, useEffect } from 'react';
import { CheckCircledIcon ,CrossCircledIcon } from '@radix-ui/react-icons';
import RadiModal from './RadiModal';
import TableHead from './TableHead';
import AlertDialog from './Alert';
import Call from './Calling';

const url = "https://api.box3.work/api/Contato";
const urlContato = "https://api.box3.work/api/Telefone";
const token = "6d573016-d980-4275-b513-60b6e3c1e9fb";

function ShowTable(props) 
{
    const {dados, openModal, newCall, onCall, confirmDelete} = props

    return (
        <>
        <main class="d-flex flex-column align-items-start shadow p-3 m-2" style={{ minheight: '70vh', width: '100%' }}>
            <button type="button" class="btn btn-dark mb-1 ml-3 btn-sm" id="Cadastro" onClick={() => openModal("")}>Cadastrar Contato</button>
            <table class="w-100 table-striped table mt-2" id="table">
            <thead>
                <tr>
                <TableHead label="Nome" />
                <TableHead label="Telefone" />
                <TableHead label="Email" />
                <TableHead label="Ativo" />
                <TableHead label="Data Nascimento" />
                <TableHead label="Opções" />
                </tr>
            </thead>
            <tbody>
                {dados.map((item) => (
                <>
                <tr key={item.id}>
                    <td className="p-2">{item.nome}</td>
                    <td>{item.telefone}</td>
                    <td>{item.email}</td>
                    <td className="text-center">{item.ativo ? <CheckCircledIcon/> : <CrossCircledIcon/>}</td>
                    <td className="text-center">{new Date(item.dataNascimento).toLocaleDateString("pt-BR")}</td>
                    <td className="d-flex justify-content-between">
                        <button class="btn btn-success btn-sm" onClick={() => newCall(item.id)} disabled={onCall ? true : !item.ativo}>Chamar</button>
                        <button class="btn btn-secondary btn-sm" onClick={() => openModal(item)}>Editar</button>
                        <button class="btn btn-danger btn-sm" onClick={() => confirmDelete(item.id)}>Excluir</button>
                    </td>
                </tr>
                </>
                ))}
            </tbody>
            </table>    
        </main>
        </>
    )
}

function InitTable()
{
    const [dados, setDados] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [clientData, setClientData] = useState(null);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [onCall, setOnCall] = useState(false);
    const [callData, setCallData] = useState([]);
    const [id, setId] = useState("");

    const checkCall = () => {
        fetch(`${urlContato}/${token}/chamada-em-andamento`)
        .then(res => {
            if (res.status === 200)
            {
              return res.json()  
            }
        })
        .then(dados => {
            if(dados){
                setOnCall(true)
                setCallData(dados)
            } else {
                setOnCall(false)
                setCallData([])
            }
        })
        
    }

    const handleCreateCall = (data) => {

        const body = {
            idContato : data
        }

        fetch(`${urlContato}/${token}`, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(() => {
            checkCall()
        })
        .catch((e) => { console.error(e) })
    }    
    
    const openModal = (client) => {
        setClientData(client);
        setIsModalOpen(true);
    };
    
    const closeModal = () => {
        setIsModalOpen(false);
    };

    const newCall = (id) => {
        setId(dados.id);
        handleCreateCall(id);
    }

    const fecthData = () => 
    {
        fetch(`${url}/${token}`)
         .then(res => res.json())
         .then(dados => {
            setDados(dados);
        })
    }

    useEffect(() => {
        fecthData();
        checkCall();
    }, []);

    const handleCreate = (data) => {
        fetch(`${url}/${token}`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(() => {
            fecthData()
        })
        .catch((e) => { console.error(e) })
    }    

    const handleDelete = (clientId) =>
    {
        fetch(`${url}/${token}/${clientId}`, {
            method: 'DELETE',
        }).then(response => {
            if (response.status === 200)
            {
                setDados(dados.filter(item => item.id !== clientId))
                setDados([])
                fecthData()
            } else 
            {
                console.log("erro na exclusão")
            }
        }).catch(error => {
            console.error(error)
        })
    }

    const handleUpdate = (id,data) => {
        fetch(`${url}/${token}/${id}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(() => {
            fecthData()
        })
        .catch(() => { console.log("Ocorreu um erro na atualização.") })
    }

    const confirmDelete = (id) => {
        setClientData(id);
        setShowDeleteDialog(true);
    };

    const onConfirmDelete = () => {
        if (clientData) {
            handleDelete(clientData);
        }
        setShowDeleteDialog(false);
    };

    return (
        <div>
            {dados.length > 0 ? (
                <>
                <ShowTable dados={dados} openModal={openModal} newCall={newCall} confirmDelete={confirmDelete} onCall={onCall}/>
                <RadiModal isOpen={isModalOpen} onClose={closeModal} handleUpdate={handleUpdate} clientData={clientData} handleCreate={handleCreate}/>
                <AlertDialog isOpen={showDeleteDialog} onClose={() => setShowDeleteDialog(false)} onConfirmDelete={onConfirmDelete}/>
                {onCall ? (
                    <>
                    {console.log(callData)}
                    <Call onCall={onCall} callData={callData} clienteId={clientData} checkCall={checkCall}/>
                    </>
                ) : ""}
                </>
            ) : (
                <p>Carregando dados...</p>
            )}
        </div>
    );
}


export default InitTable;