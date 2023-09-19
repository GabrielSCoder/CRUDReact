import React, {useState, useEffect} from "react";
import AssuntoModal from "./AssuntoModal";
import * as Dialog from '@radix-ui/react-dialog';
import "../style/radMod.css";


function ChamadaModal({isOpen, onClose, tempoFormatado, callData, setId, setOnCall, setCallData})
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
            <AssuntoModal isOpen={isSubjectOpen} onClose={closeSubjectModal} callData={callData} setId={setId} 
            setOnCall={setOnCall} setCallData={setCallData} />
        )}
    </>
    )
}

function Chamada({callData, tempoFormatado, isModalOpen, closeCallModal, setId, setOnCall, setCallData})
{
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <ChamadaModal isOpen={isModalOpen} onClose={closeCallModal} tempoFormatado={tempoFormatado} callData={callData}
        setId={setId} setOnCall={setOnCall} setCallData={setCallData}/>     
    )
}

export default Chamada