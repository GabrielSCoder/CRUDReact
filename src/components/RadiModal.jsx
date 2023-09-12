import React, { useState ,useEffect } from "react";
import {formatter, patternNumber} from "../services/script.js";
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import "../style/radMod.css";

function Modal({ isOpen, onClose, clientData, handleUpdate, handleCreate})
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
            handleUpdate(clientData.id, finalClient);
        } else {
            handleCreate(finalClient);
        }

        onClose();
    };


    return (
        <Dialog.Root defaultOpen onOpenChange={onClose}>
        <Dialog.Portal>
          <Dialog.Overlay className="DialogOverlay" />
          <Dialog.Content className="DialogContent" onEscapeKeyDown={console.log("fdfdsfdsf")}>
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
                  <fieldset class="Fieldset w-100 justify-content-center align-items-center">
                      <input type="checkbox" id="ativo" checked={ativo} onChange={(e) => setAtivo(e.target.checked)}/>
                  </fieldset>
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

export default Modal