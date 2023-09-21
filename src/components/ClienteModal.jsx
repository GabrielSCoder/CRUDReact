import React, { useState ,useEffect } from "react";
import {formatter, patternNumber} from "../utils/mascaraNumero.js";
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import "../style/radMod.css";
import toastShow from '../utils/mostrarToast.js';

function ClienteModal({ isOpen, onClose, clientData, handleUpdate, handleCreate, setDados})
{   
    const isEditing = !!clientData;
    const [originalClientData] = useState(clientData || {});
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

        if (telefone.length > 15)
        {
          setTelefone(telefone.substring(0,13));
        }

        if (telefone.length < 15)
        {
          alert("Numero inválido!");
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
            handleUpdate(clientData.id, finalClient, setDados);
            toastShow("Cliente atualizado!")
        } else {
            handleCreate(finalClient, setDados);
            toastShow("Cliente criado!")
        }
        onClose();
    };


    return (
        <Dialog.Root defaultOpen onOpenChange={onClose}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-50 animate-overlayShow"/>
          <Dialog.Content className="bg-white p-6 fixed top-1/2 left-1/2  translate-y-[-50%] 
            translate-x-[-50%] w-[90vh] max-w-[450px] max-h-[85vh] rounded-md shadow-lg shadow-black">
            <Dialog.Title className="DialogTitle">Contato</Dialog.Title>
            <br></br>
            <form>
                <fieldset className="Fieldset">
                  <input type="text" id="nome" data-index="new" class="form-control" placeholder="Nome"
                      defaultValue={isEditing ? clientData.nome : ""} onChange={(e) => setNome(e.target.value)}
                      required/>	
                </fieldset>
                <fieldset className="Fieldset">
                <input type="text" id="telefone" class="form-control" placeholder="Telefone" onChange={(e) => {formatter(e, patternNumber); setTelefone(e.target.value);}}
                    onkeypress={(e) => formatter(e, patternNumber)}
                    defaultValue={isEditing ? clientData.telefone : ""} required/>
                </fieldset>
                <fieldset className="Fieldset">
                <input type="email" id="email" class="form-control" placeholder="Email" 
                    defaultValue={isEditing ? clientData.email : ""} onChange={(e) => setEmail(e.target.value)}
                        required/>               
                </fieldset>
                <fieldset className="Fieldset">
                <input type="date" id="dataNsc" class="form-control" placeholder="Data de Nascimento" 
                    defaultValue={isEditing ? clientData.dataNascimento.substring(0, 10) : ""}
                    onChange={(e) => setNascimento(e.target.value)} required/>
                </fieldset>
                  <div class="d-flex flex-column justify-content-center align-items-center">
                      <div><h7>Ativo</h7></div>
                      <div><input type="checkbox" id="ativo" checked={ativo} onChange={(e) => setAtivo(e.target.checked)}/></div>
                  </div>
            </form>
            <div style={{ display: 'flex', marginTop: 25, textAlign:'center', justifyContent: 'flex-end' }} class="justify-content-center align-items-center">
              <Dialog.Close asChild>
                <button class="Button green" onClick={confirm}>Salvar</button>
              </Dialog.Close>
            </div>
            <Dialog.Close asChild>
              <button class="IconButton" aria-label="Close">
                <Cross2Icon />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    )
}

export default ClienteModal