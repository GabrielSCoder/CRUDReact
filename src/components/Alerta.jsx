import React, {useState} from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import useDebounce from '../utils/debounce';
import '../style/alert.css';

function AlertaExclusao({ isOpen, onClose, onConfirmDelete }) {

    const confirmDeleteDebounce = useDebounce(onConfirmDelete, 1000)

    return (
    <AlertDialog.Root open={isOpen} onOpenChange={onClose}>
        <AlertDialog.Portal>
        <AlertDialog.Overlay className="AlertDialogOverlay" />
        <AlertDialog.Content className="AlertDialogContent">
            <AlertDialog.Title className="AlertDialogTitle">Você tem certeza?</AlertDialog.Title>
            <AlertDialog.Description className="AlertDialogDescription">
            Isso excluirá permanentemente o contato.
            </AlertDialog.Description>
            <div style={{ display: 'flex', gap: 25, justifyContent: 'flex-end' }}>
            <AlertDialog.Cancel asChild>
                <button className="Button mauve">Cancelar</button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
                <button className="Button red" onClick={confirmDeleteDebounce}>Sim, deletar contato</button>
            </AlertDialog.Action>
            </div>
        </AlertDialog.Content>
        </AlertDialog.Portal>
        </AlertDialog.Root>
    )
}

export default AlertaExclusao;

