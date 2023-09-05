const token = "6d573016-d980-4275-b513-60b6e3c1e9fb";
const url = "https://api.box3.work/api/Contato";

let data = null
let idClient = null

//Requisição da lista de contatos
const getData = async () => {
  try {
    const res = await fetch(`${url}/${token}`)
    const json = await res.json()
    
    json.forEach(createRow)
  } catch(e) {
    console.error(e)
  }
}

//PUT
const updateClient = (index, client) => {
    fetch(`${url}/${token}/${index}`, {
        method: "PUT",
        body: JSON.stringify(client),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(() => {
        getData()
    })
    .catch(() => { console.log("Ocorreu um erro na atualização.") })
}

//Criar uma nova linha cliente
const createRow = (client, index) => {
    document.querySelector('#table>tbody').appendChild()
}


//Chamada do GET 
const readClient = () => getData()


//A configuração da requisitação post
const config = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {"Content-type": "application/json; charset=UTF-8"}
}

//Passar o formato vindo do json para um formato mais habitual 
const formatDate = (date) => {
    return date.split("/").reverse().join("-")
}

//Inserir os campos do modal
const fillFields = (client) => {
    document.getElementById('nome').value = client.nome
    document.getElementById('telefone').value = client.telefone
    document.getElementById('email').value = client.email
    document.getElementById('ativo').checked = client.ativo
    document.getElementById('nome').dataset.index = client.index
    document.getElementById('dataNsc').value = formatDate(client.dataNascimento)
}



//GET inicial
getData()



