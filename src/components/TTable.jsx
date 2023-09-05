import React from "react";
import TableHead from "./TableHead"
class Tables extends React.Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            clientes : []
        }
    }

    componentDidMount()
    {
        const token = "6d573016-d980-4275-b513-60b6e3c1e9fb";
        const url = "https://api.box3.work/api/Contato";

        fetch(`${url}/${token}`)
            .then(res => res.json())
            .then(dados => {
                this.setState({clientes : dados})
            })
    }

    render()
    {
        return (
            <main class="d-flex flex-column align-items-center shadow p-5 m-2" style={{height: '70vh', width: '100%'}}> 
                <table class="w-100" id="table">
                    <thead>
                        <tr>
                            <TableHead label="Nome"/>
                            <TableHead label="Telefone"/>
                            <TableHead label="Email"/>
                            <TableHead label="Ativo"/>
                            <TableHead label="Data Nascimento"/>
                            <TableHead label="Opções"/>
                        </tr>
                    </thead>  
                    <tbody>
                        {this.clientes.map((item, index) => (
                            <tr key={index}>
                            <td class="p-2">{item.nome}</td>
                            <td>{item.telefone}</td>
                            <td>{item.email}</td>
                            <td class="text-center">{item.ativo ? <span>Ativado</span> : <span>Desativado</span>}</td>            
                            <td class="text-center">{new Date(item.dataNascimento).toLocaleDateString("pt-BR")}</td>
                            <td class="d-flex justify-content-between">
                                <button type="button" class="btn btn-primary">Editar</button>
                                <button type="button" class="btn btn-danger">Excluir</button>
                            </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>         
        )
    }
}