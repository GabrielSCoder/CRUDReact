
function CreateRow(props)
{
    const {client} = props
    return (
        <tr>
            <td class="p-2">{client.nome}</td>
            <td>{client.numero}</td>
            <td>{client.email}</td>
            <td>{client.ativo ? <span>Ativado</span> : <span>Desativado</span>}</td>            
            <td className="text-center">{client.dataNascimento}</td>
            <td class="d-flex justify-content-between">
                <button type="button" class="btn btn-primary">Editar</button>
                <button type="button" class="btn btn-danger">Excluir</button>
            </td>
        </tr>
      );
}


export default CreateRow;