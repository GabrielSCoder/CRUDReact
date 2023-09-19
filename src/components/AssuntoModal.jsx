import React, {useState, useEffect} from "react";
import * as Dialog from '@radix-ui/react-dialog';
import { HandleFinishCall } from "../services/requisicoes";

function MostrarAssunto({callData, isOpen, onClose, setId, setOnCall, setCallData})
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
                        <input type="button" class="Button green" onClick={() => HandleFinishCall(callData, assunto, setId, setOnCall, setCallData)} value="Confirmar" />
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

export default MostrarAssunto