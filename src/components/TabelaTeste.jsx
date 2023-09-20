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
        <main class="w-full flex flex-col items-start shadow p-3 m-2 min-h-[70vh] ">
            <div className='flex w-full flex-row gap-3 items-center justify-between mt-2'>
                <div className='py-1'> 
                    <h1 className='font-medium'>Contatos</h1>
                    <p className='text-small font-small py-1'>Lista de todos os clientes contendo suas informações</p>
                </div>
                <button type="button" className="rounded-md bg-blue-600 text-white p-1 hover:bg-blue-500" onClick={() => openModal("")}>Cadastrar Contato</button>
            </div>
            <table class="min-w-full font-light mt-4">
                <thead class="border-b font-medium dark:border-neutral-500">
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
                    <tr key={item.id} class="border-b dark:border-neutral-500">
                        <td className="p-2 text-sm font-medium py-3">{item.nome}</td>
                        <td className='text-sm font-medium text-slate-500 text-center'>{item.telefone}</td>
                        <td className='text-sm font-medium text-slate-500'>{item.email}</td>
                        <td class="whitespace-nowrap text-center px-5">{item.ativo ? <CheckCircledIcon/> : <CrossCircledIcon/>}</td>
                        <td className="text-center text-sm font-medium text-slate-500">{new Date(item.dataNascimento).toLocaleDateString("pt-BR")}</td>
                        <td className='justify-items-center items-center'>
                            <div className="flex items-center space-x-3 px-3">
                                {onCall && item.id === id ? (
                                    <button class="rounded-md bg-green-700 hover:bg-green-800 text-white p-2" onClick={() => openCallModal(item.id)}><MagnifyingGlassIcon /></button>  
                                    ) : (
                                    <button class="rounded-md bg-green-700 hover:bg-green-800 text-white p-2 disabled:opacity-75" onClick={() => newCallDebounce(item.id)} disabled={(onCall && item.id !== id) || !item.ativo}>
                                        {(!item.ativo || (onCall && item.id !== id)) ? <LockClosedIcon /> : <ChatBubbleIcon />}</button>
                                )}
                                <button class="rounded-md bg-gray-400 hover:bg-gray-600 text-white p-2" onClick={() => openModal(item)} disabled={item.id === id}><GearIcon /></button>
                                <button class="rounded-md bg-red-700 hover:bg-red-800 text-white p-2" onClick={() => confirmDelete(item.id)} disabled={item.id === id} ><TrashIcon /></button>
                            </div>
                        </td>
                    </tr>
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