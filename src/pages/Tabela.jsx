import { CheckCircledIcon ,CrossCircledIcon, TrashIcon, GearIcon, MagnifyingGlassIcon, LockClosedIcon, ChatBubbleIcon } from '@radix-ui/react-icons';
import {getClients, handleCreate, handleDelete, handleUpdate, handleCreateCall,checkCall} from "../services/requisicoes"
import React, { useState, useEffect, useRef } from 'react';
import atualizarCronometro from '../utils/cronometro.js';
import {ToastContainer, toast } from 'react-toastify';
import ClienteModal from '../components/ClienteModal';
import TdCabecalho from '../components/TdCabecalho';
import Chamada from '../components/Chamada';
import useDebounce from '../utils/debounce';
import Alerta from '../components/Alerta';
import toastShow from '../utils/mostrarToast';

function MostrarTabela(props) 
{
    const {dados, openModal, newCall, onCall, confirmDelete, openCallModal, id, setCallModalOpen} = props

    const newCallDebounce = useDebounce(newCall, 1000)

    return (
        <>
        <main class="d-flex flex-column align-items-start shadow p-3 m-2" style={{ minheight: '70vh', width: '100%' }}>
            <div className='w-100 d-flex flex-row gap-3 align-items-center justify-content-between'>
                <button type="button" class="btn btn-dark mb-1 ml-3 btn-sm" id="Cadastro" onClick={() => openModal("")}>Cadastrar Contato</button>
                {onCall ? (
                    <h9>Chamada em andamento <i class="fa fa-circle-o-notch fa-spin" style={{fontSize : 15}}></i></h9>
                ) : ("")}
            </div>
            <table class="w-100 table-striped table mt-2" id="table">
            <thead>
                <tr>
                <TdCabecalho label="Nome" />
                <TdCabecalho label="Telefone" />
                <TdCabecalho label="Email" />
                <TdCabecalho label="Ativo" />
                <TdCabecalho label="Data Nascimento" />
                <TdCabecalho label="Opções" />
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
                            <button class="btn btn-success btn-sm" onClick={() => newCallDebounce(item.id)} disabled={(onCall && item.id !== id) || !item.ativo}>
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

    const openModal = (client) => {
        setClientData(client);
        setIsModalOpen(true);
    };
    
    const closeModal = () => {
        setIsModalOpen(false);
    };

    const openCallModal = (id) => {
        setCallModal(true);
    }

    const closeCallModal = () => {
        setCallModal(false);
    }

    const newCall = (id) => {
        setId(dados.id)
        handleCreateCall(id, setId, setCallData, setOnCall)
        toastShow("Chamada iniciada!")
    }
 
    const confirmDelete = (id) => {
        setClientData(id);
        setShowDeleteDialog(true);
    };

    const onConfirmDelete = () => {
        if (clientData) {
            handleDelete(clientData, dados,setDados );
        }
        setShowDeleteDialog(false);
        toastShow("Cliente deletado")
    };

    useEffect(() => {
        getClients(setDados);
        checkCall(setId, setCallData, setOnCall);
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
                <MostrarTabela dados={dados} openModal={openModal} openCallModal={openCallModal} newCall={newCall} confirmDelete={confirmDelete} onCall={onCall} id={id} setCallModal={setCallModal}/>
                <ClienteModal isOpen={isModalOpen} onClose={closeModal} handleUpdate={handleUpdate} clientData={clientData} handleCreate={handleCreate} setDados={setDados}/>
                <Alerta isOpen={showDeleteDialog} onClose={() => setShowDeleteDialog(false)} onConfirmDelete={onConfirmDelete}/>
                {onCall ? (
                    <>
                    <Chamada callData={callData} tempoFormatado={tempoFormatado} isModalOpen={callModal} closeCallModal={closeCallModal} 
                    setId={setId} setOnCall={setOnCall} setCallData={setCallData}/>
                    </>
                ) : ""}
                <ToastContainer />
                </>
            ) : (
                <p>Carregando dados...</p>
            )}
        </div>
    );
}


export default InitTable;