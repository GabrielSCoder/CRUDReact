import React, { useState ,useEffect } from "react";
import {formatter, patternNumber} from "../services/script.js";
import "../Modal.css";



function Modal({ isOpen, onClose, clientData, handleUpdate, handleCreate})
{   
    const isEditing = !!clientData;
    const [originalClientData, setOriginalClientData] = useState(clientData || {});
    const [nome, setNome] = useState("");
    const [telefone, setTelefone] = useState("");
    const [email, setEmail] = useState("");
    const [dataNascimento, setNascimento] = useState("");
    const [ativo, setAtivo] = useState(false);

    useEffect(() => {
        if (!isOpen) {
          return; 
        }
    
        if (isEditing) {
            setNome(clientData.nome);
            setTelefone(clientData.telefone);
            setEmail(clientData.email);
            setNascimento(clientData.dataNascimento);
            setAtivo(clientData.ativo);
        } else {
            setNome("");
            setTelefone("");
            setEmail("");
            setNascimento("");
            setAtivo(false);
        }

        console.log(clientData);

    }, [isOpen, clientData, isEditing]);
    
    if (!isOpen) {
        return null;
    }


    const confirm = () => {
        
        if (!nome || !telefone || !email || !dataNascimento)
        {   
            alert("Preencha todos os campos!");
            return;
        }

        const updatedClient = {
          nome,
          telefone,
          email,
          dataNascimento,
          ativo,
        };

        const finalClient = {
            ...originalClientData,
            ...updatedClient,
        };
        
        if(isEditing)
        {
            handleUpdate(clientData.id, finalClient);
        } else {
            handleCreate(finalClient);
        }

        onClose();
    };


    return (
        <div class="modal" data-bs-backdrop="static" data-bs-keyboard="false">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header d-flex flex-column align-items-center mb-1">
                        <h4 class="modal-title">Contato</h4>
                    </div>
                    <div class="modal-body">
                        <form id="form" class="mb-1">
                            <div class="mb-2">
                                <input type="text" id="nome" data-index="new" class="form-control" placeholder="Nome"
                                defaultValue={isEditing ? clientData.nome : ""} onChange={(e) => setNome(e.target.value)} required/>	
                            </div>
                            <div class="mb-2">
                                <input type="text" id="telefone" class="form-control" placeholder="Telefone" onChange={(e) => {formatter(e, patternNumber); setTelefone(e.target.value);}}
                                onkeypress={(e) => formatter(e, patternNumber)} defaultValue={isEditing ? clientData.telefone : ""} required/>
                            </div>
                            <div class="mb-2">
                                <input type="email" id="email" class="form-control" placeholder="Email" 
                                defaultValue={isEditing ? clientData.email : ""} onChange={(e) => setEmail(e.target.value)}
                                required/>
                            </div>
                            <div class="mb-2">
                                <input type="date" id="dataNsc" class="form-control" placeholder="Data de Nascimento" 
                                defaultValue={isEditing ? clientData.dataNascimento.substring(0, 10) : ""}
                                onChange={(e) => setNascimento(e.target.value)} required/>
                            </div>
                            <div class="d-flex flex-column align-items-center">
                                <h5>Ativo</h5>
                                <label class="form-label">
                                <input type="checkbox" id="ativo" checked={ativo} onChange={(e) => setAtivo(e.target.checked)}/>
                                </label>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer ">
                        <button type="button" id="Btn-Volta" data-bs-dismiss="modal" class="btn btn-secondary" onClick={onClose}>Fechar</button>
                        <button type="button" id="Btn-Confirma" class="btn btn-success" onClick={confirm}>Salvar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal