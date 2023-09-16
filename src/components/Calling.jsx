import React, {useState, useEffect} from "react";
import ShowSubject from "./Subject";
import * as Dialog from '@radix-ui/react-dialog';
import "../style/radMod.css";

const urlContato = "https://api.box3.work/api/Telefone";
const token = "6d573016-d980-4275-b513-60b6e3c1e9fb";

function CallModal({isOpen, onClose, tempoFormatado , HandleFinishCall})
{
    const [isSubjectOpen, setSubjectOpen] = useState(false)

    const openSubjectModal = () => {
        setSubjectOpen(true);
    };

    const closeSubjectModal = () => {
        setSubjectOpen(false);
    };
    
    useEffect(() =>{

        if (!isOpen)
        {
            return;
        }
    }, [isOpen])

    return (
        <>
        <Dialog.Root open={isOpen} onOpenChange={onClose}>
            <Dialog.Portal>
            <Dialog.Overlay className="DialogOverlay"/>
            <Dialog.Content className="DialogContent">
                <Dialog.Title className="DialogTitle">Chamada</Dialog.Title>
                <br></br>
                <div className="Fieldset w-100 justify-content-center align-items-center">
                    <p className="fs-7">Tempo Percorrido: </p>
                    <p>{tempoFormatado}</p>
                </div>
                <div className="d-flex justify-content-center align-items-center mt-4">
                    <Dialog.Close asChild>
                        <input type="button" className="Button green" style={{marginRight : 5}} onClick={openSubjectModal} value="Finalizar" />
                    </Dialog.Close>
                    <Dialog.Close asChild>
                        <input type="button" className="Button red" value="Cancelar" />
                    </Dialog.Close>
                </div>
            </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
        {isSubjectOpen && (
            <ShowSubject isOpen={isSubjectOpen} onClose={closeSubjectModal} HandleFinishCall={HandleFinishCall} />
        )}
    </>
    )
}

function Call({callData, checkCall, tempoFormatado, isModalOpen, closeCallModal})
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
        .then(() => {
            checkCall()
        })
        .catch(() => { console.log("Ocorreu um erro na atualização.") })
    }

    const openModal = () => {
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <>
        <CallModal isOpen={isModalOpen} onClose={closeCallModal} tempoFormatado={tempoFormatado} HandleFinishCall={HandleFinishCall}/>     
        </>
    )
}

export default Call