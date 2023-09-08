import React, { useState ,useEffect } from "react";
import "../Modal.css";


function Modal({ isOpen, onClose, clientData, handleUpdate})
{   
    const isEditing = !!clientData;
    const [originalClientData, setOriginalClientData] = useState(clientData || {});
    const [nome, setNome] = useState("");
    const [telefone, setTelefone] = useState("");
    const [email, setEmail] = useState("");
    const [nascimento, setNascimento] = useState("");
    const [ativo, setAtivo] = useState(false);

    console.log(clientData)

    useEffect(() => {
        if (!isOpen) {
          return; 
        }

        setTelefone(clientData.telefone)
        setAtivo(clientData.ativo)
    
        if (isEditing) {
            setNome(clientData.nome);
            setTelefone(clientData.telefone);
            setEmail(clientData.email);
            setNascimento(clientData.nascimento);
            setAtivo(clientData.ativo);
          } else {
            setNome("");
            setTelefone("");
            setEmail("");
            setNascimento("");
            setAtivo(false);
          }

    }, [isOpen, clientData, isEditing]);
    
    if (!isOpen) {
        return null;
    }


    const confirmEdit = () => {

        const updatedClient = {
          nome,
          telefone,
          email,
          nascimento,
          ativo,
        };

        const finalClient = {
            ...originalClientData,
            ...updatedClient,
          };
    
        handleUpdate(clientData.id, finalClient);
        onClose();
    };

    return (
        <div class="modal" data-bs-backdrop="static" data-bs-keyboard="false">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header d-flex flex-column align-items-center">
                    <h4 class="modal-title">Contato</h4>
                </div>
                <div class="modal-body">
                    <form id="form" class="mb-3">
                        <div class="mb-3">
                            <input type="text" id="nome" data-index="new" class="form-control" placeholder="Nome"
                             defaultValue={isEditing ? clientData.nome : ""} onChange={(e) => setNome(e.target.value)} required/>	
                        </div>
                        <div class="mb-3">
                            <input type="text" id="telefone" class="form-control" placeholder="Telefone" 
                             defaultValue={isEditing ? clientData.telefone : ""} required/>
                        </div>
                        <div class="mb-3">
                            <input type="email" id="email" class="form-control" placeholder="Email" 
                             defaultValue={isEditing ? clientData.email : ""} onChange={(e) => setEmail(e.target.value)} required/>
                        </div>
                        <div class="mb-3">
                            <input type="date" id="dataNsc" class="form-control" placeholder="Data de Nascimento" 
                             defaultValue={isEditing ? clientData.dataNascimento.substring(0, 10) : ""} onChange={(e) => setNascimento(e.target.value)} required/>
                        </div>
                        <div class="d-flex flex-column align-items-center">
                            <label class="form-label">
                            <input type="checkbox" id="ativo" checked={clientData.ativo}  onChange={(e) => {const novoValorAtivo = e.target.checked; setAtivo(novoValorAtivo)}}/>;
                            </label>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" id="Btn-Volta" data-bs-dismiss="modal" class="btn btn-secondary" onClick={onClose}>Fechar</button>
                    <button type="button" id="Btn-Confirma" class="btn btn-success" onClick={confirmEdit}>Salvar</button>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Modal