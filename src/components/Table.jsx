import { Fragment, useState } from "react";
import TableHead from "./TableHead";
import TableRow from "./TableRow";

export default function Mid()
{
    return (
        <Fragment>
        <main class="d-flex flex-column align-items-center shadow p-5 m-2" style={{height: '70vh', width: '90%'}}> 
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
                </tbody>
            </table>		
        </main>
        </Fragment>
    )
}