import React, {useEffect, useState} from "react";
import * as Dialog from '@radix-ui/react-dialog';
import "../style/radMod.css";

const urlContato = "https://api.box3.work/api/Telefone";
const token = "6d573016-d980-4275-b513-60b6e3c1e9fb";

function ShowSubject({idCall, isOpen, onClose, HandleFinishCall})
{
    const [assunto, setAssunto] = useState("");

    useEffect(() =>{

        if (!isOpen)
        {
            return;
        }
    }, [isOpen, assunto])

    return (
        <Dialog.Root open={isOpen} onOpenChange={onClose}>
            <Dialog.Portal>
            <Dialog.Overlay className="DialogOverlay"/>
            <Dialog.Content className="DialogContent">
                <Dialog.Title className="DialogTitle">Fechar Chamada</Dialog.Title>
                <div style={{textAlign: "center", marginTop: 10}}>
                    <input type="text" placeholder="Assunto" class="form-control" onChange={(e) => setAssunto(e.target.value)}required/>
                </div>
                <div style={{ display: 'flex', marginTop: 25, textAlign:'center', justifyContent: 'flex-end', gap: 10 }}
                 class="justify-content-center align-items-center">
                    <Dialog.Close asChild>
                        <input type="button" class="Button green" onClick={() => HandleFinishCall(assunto)} value="Confirmar" />
                    </Dialog.Close>
                    <Dialog.Close asChild>
                        <input type="button" class="Button red" value="Cancelar" />
                    </Dialog.Close>
                </div>
            </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}

function Call({callData, onCall, checkCall})
{
    const [isOpen, setIsOpen] = useState(false);

    const HandleFinishCall = (assunto) => {
        const body = {
            assunto : assunto
        }

        fetch(`${urlContato}/${token}/${callData.id}`, {
            method: "PUT",
            body: JSON.stringify(body),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(() => {checkCall()})
        .catch(() => { console.log("Ocorreu um erro na atualização.") })
    }

    const openModal = () => {
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <div>
            {onCall ? (
            <>
            <h5>Ligação</h5>
            <span>{callData.contato.nome}</span><br></br>
            <span>{callData.inicioAtendimento}</span><br></br>
            <button onClick={openModal}>Encerrar</button>
            <ShowSubject idCall={callData.id} isOpen={isOpen} onClose={closeModal} HandleFinishCall={HandleFinishCall}/>
            </>
            ) : ("")}
        </div>
    )
}

export default Call