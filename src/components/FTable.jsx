import React, { useState, useEffect } from 'react';
import TableHead from "./TableHead";

const token = "6d573016-d980-4275-b513-60b6e3c1e9fb";
const url = "https://api.box3.work/api/Contato";

function TabelaComDados(props) {
    const { dados } = props;
  
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
                {dados.map((item, index) => (
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
    );
}
  
function FillTable() {
    const [dados, setDados] = useState(null);

    useEffect(() => {
        async function fetchData() {
        try {
            const res = await fetch(`${url}/${token}`);
            if (!res.ok) {
            throw new Error('Erro ao buscar os dados');
            }
            const json = await res.json();
            setDados(json);
        } catch (e) {
            console.error(e);
        }
        }
    fetchData();
    }, []);

    return (
        <div>
        {dados ? (
            <TabelaComDados dados={dados} />
        ) : (
            <p>Carregando dados...</p>
        )}
        </div>
    );
}

export default FillTable;