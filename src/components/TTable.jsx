import React, { useState, useEffect, useRef } from 'react';
import { CheckCircledIcon ,CrossCircledIcon, TrashIcon, GearIcon, MagnifyingGlassIcon, LockClosedIcon, ChatBubbleIcon } from '@radix-ui/react-icons';
import RadiModal from './RadiModal';
import TableHead from './TableHead';
import AlertDialog from './Alert';
import Call from './Calling';
import atualizarCronometro from '../services/cronomoter.js';

const url = "https://api.box3.work/api/Contato";
const urlContato = "https://api.box3.work/api/Telefone";
const token = "6d573016-d980-4275-b513-60b6e3c1e9fb";

function ShowTable(props) 
{
    const {dados, openModal, newCall, onCall, confirmDelete, openCallModal, id, setCallModalOpen} = props

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
                        {onCall && item.id === id ? (
                            <button class="btn btn-success btn-sm" onClick={() => openCallModal(item.id)}><MagnifyingGlassIcon /></button>  
                            ) : (
                            <button class="btn btn-success btn-sm" onClick={() => newCall(item.id)} disabled={(onCall && item.id !== id) || !item.ativo}>
                                {(!item.ativo || (onCall && item.id !== id)) ? <LockClosedIcon /> : <ChatBubbleIcon />}</button>
                        )}
                        <button class="btn btn-secondary btn-sm" onClick={() => openModal(item)} disabled={item.id === id}><GearIcon /></button>
                        <button class="btn btn-danger btn-sm" onClick={() => confirmDelete(item.id)} disabled={item.id === id} ><TrashIcon /></button>
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
    const [callModal, setCallModal] = useState(false);
    const [clientData, setClientData] = useState(null);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [onCall, setOnCall] = useState(false);
    const [callData, setCallData] = useState([]);
    const [cronoStarted, setCronoStarted] = useState(false);
    const [tempoFormatado, setTempoFormatado] = useState('');
    const [id, setId] = useState("");
    let crono = useRef(null)

    const checkCall = () => {
        return fetch(`${urlContato}/${token}/chamada-em-andamento`)
        .then(reponse => {
            if (reponse.ok) {
                return reponse.json()
                .then(res => {
                    setCallData(res);
                    setId(res.contato.id);
                    setOnCall(true);
                    return true;
                })
            } else {
                setCallData([]);
                setId("");
                setOnCall(false);
                return false
            }
        })
    };

    const handleCreateCall = (data) => {

        const body = {
            idContato: data
        };
    
        fetch(`${urlContato}/${token}`, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Erro na requisição');
            }
        })
        .then(() => {checkCall()})
        .catch(error => {
            console.error(error);
        });
    };
    
    
    const openModal = (client) => {
        setClientData(client);
        setIsModalOpen(true);
    };
    
    const closeModal = () => {
        setIsModalOpen(false);
    };

    const openCallModal = (id) => {
        setCallModal(true);
        console.log("abriu");
    }

    const closeCallModal = () => {
        setCallModal(false);
    }

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

    useEffect(() => {
        fecthData();
        checkCall();
    }, []);

    useEffect(() => {
        setTempoFormatado('');
        if (callData && callData.inicioAtendimento) {
          if (!cronoStarted) {
            crono.current = atualizarCronometro(callData.inicioAtendimento, setTempoFormatado);
            setCronoStarted(true);
          }
        } else {
          if (cronoStarted) {
            clearInterval(crono.current);
            setCronoStarted(false);
          }
        }
      
        return () => {
          clearInterval(crono.current);
        };
      }, [callData]);

    return (
        <div>
            {dados.length > 0 ? (
                <>
                <ShowTable dados={dados} openModal={openModal} openCallModal={openCallModal} newCall={newCall} confirmDelete={confirmDelete} onCall={onCall} id={id} setCallModal={setCallModal}/>
                <RadiModal isOpen={isModalOpen} onClose={closeModal} handleUpdate={handleUpdate} clientData={clientData} handleCreate={handleCreate}/>
                <AlertDialog isOpen={showDeleteDialog} onClose={() => setShowDeleteDialog(false)} onConfirmDelete={onConfirmDelete}/>
                {onCall ? (
                    <>
                    <Call callData={callData} clienteId={clientData} checkCall={checkCall} tempoFormatado={tempoFormatado} isModalOpen={callModal} closeCallModal={closeCallModal}/>
                    
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