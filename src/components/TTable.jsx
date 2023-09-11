import React, { useState, useEffect } from 'react';
import RadiModal from './RadiModal';
import TableHead from './TableHead';
import AlertDialog from './Alert';

const url = "https://api.box3.work/api/Contato";
const token = "6d573016-d980-4275-b513-60b6e3c1e9fb";

function ShowTable(props) 
{
    const {dados, openModal, confirmDelete} = props

    return (
        <>
        <main class="d-flex flex-column align-items-center shadow p-3 m-2" style={{ minheight: '70vh', width: '100%' }}>
            <button type="button" class="btn btn-dark mb-1" id="Cadastro" onClick={() => openModal("")}>Cadastrar Contato</button>
            <br></br>
            <table class="w-100 table-striped table" id="table">
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
                <tr key={item.id}>
                    <td className="p-2">{item.nome}</td>
                    <td>{item.telefone}</td>
                    <td>{item.email}</td>
                    <td className="text-center">{item.ativo ? <span>Ativado</span> : <span>Desativado</span>}</td>
                    <td className="text-center">{new Date(item.dataNascimento).toLocaleDateString("pt-BR")}</td>
                    <td className="d-flex justify-content-between">
                    <button type="button" className="btn btn-secondary btn-sm" onClick={() => openModal(item)}>Editar</button>
                    <button type="button" className="btn btn-danger btn-sm" onClick={() => confirmDelete(item.id)}>Excluir</button>
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
    const [clientData, setClientData] = useState(null);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    

    const openModal = (client) => {
        setClientData(client);
        setIsModalOpen(true);
    };
    
    const closeModal = () => {
        setIsModalOpen(false);
    };

    const fecthData = () => 
    {
        fetch(`${url}/${token}`)
        .then(res => res.json())
        .then(dados => {
            setDados(dados);
        })
        .then(console.log("deu certo"));
    }

    useEffect(() => {
        fecthData()
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
                <ShowTable dados={dados} openModal={openModal} confirmDelete={confirmDelete} />
                <RadiModal isOpen={isModalOpen} onClose={closeModal} handleUpdate={handleUpdate} clientData={clientData} handleCreate={handleCreate}/>
                <AlertDialog isOpen={showDeleteDialog} onClose={() => setShowDeleteDialog(false)} onConfirmDelete={onConfirmDelete}/>
                </>
            ) : (
                <p>Carregando dados...</p>
            )}
        </div>
    );
}


export default InitTable;