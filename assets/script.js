//  async function listarTodasAsPaletas() {
//     const response = await fetch("http://localhost:3005/paletas/listar-todas/");

//     const paletas = await response.json();

//     paletas.forEach(function (element) {

//       document.querySelector("#paletaList").insertAdjacentHTML(
//           "beforeend",
//            `<div class= "paletaListaItem">
//                 <div>
//                    <div class ="PaletaListaItem__sabor"> ${element.sabor} </div>
//                    <div class ="PaletaListaItem__preco"> R$ ${parseFloat(element.preco).toFixed(2)} </div>
//                    <div class ="PaletaListaItem__descricao"> ${element.descricao} </div>
//                 </div>
//                 <img class ="PaletaListaItem__foto" src=${element.foto} alt=${element.sabor}/>
//            </div>`
//        );
//    });
// };

// listarTodasAsPaletas();

//variáveis auxiliares

const baseUrl = "http://localhost:3005";

//requisições:
//Buscar todas as paletas;

const buscarTodasAsPaletas = async () => {
  const resposta = await fetch(`${baseUrl}/paletas/listar-todas/`);

  const paletas = await resposta.json();

  return paletas;
};

//Buscar por Id

const buscarPaletasPorId = async (id) => {
  const resposta = await fetch(`${baseUrl}/paletas/paleta/${id}`);

  const paleta = await resposta.json();

  return paleta;
};

//Criar Paleta;

const CriarPaleta = async (sabor, descricao, foto, preco) => {
  const paleta = {
    sabor,
    descricao,
    foto,
    preco,
  };

  const resposta = await fetch(`${baseUrl}/paletas/criar-paleta`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    mode: "cors",
    body: JSON.stringify(paleta),
  });

  const novaPaleta = await resposta.json();

  return novaPaleta;
};
// funcao que vai renderizar na tela o formulário para a pessoa poder digitar novamente os dados

const formularioAtualizar = async (id) => {
  document.querySelector("#atualizar").innerHTML = `
   <div>
      <form>
         <feldset>
            <legend>Atualizar Paleta</legend>

            <label for= "sabor">Sabor:</label>
            <input type= "text" id="sabor" name= "sabor" placeholder = "sabor" required/>

            <label for= "descricao">Descrição:</label>
            <input type= "text" id="descricao" name= "descricao" required/>

            <label for= "foto">Foto:</label>
            <input type= "url" id="foto" name= "foto"/>

            <label for= "preco">Preço:</label>
            <input type= "number" id="preco" name= "preco" required/>

         </feldset>
         <button onclick="atualizarPaleta(${id})">Atualizar</button>
      </form>

   </div>`;

  const paletaFiltro = await fetch(`${baseUrl}/paletas/paleta/${id}`);

  const paleta = await paletaFiltro.json();
  paleta.length != 0
    ? ((document.querySelector("#sabor").value = paleta.sabor),
      (document.querySelector("#descricao").value = paleta.descricao),
      (document.querySelector("#foto").value = paleta.foto),
      (document.querySelector("#preco").value = paleta.preco))
    : ((document.querySelector("#sabor").value = ""),
      (document.querySelector("#descricao").value = ""),
      (document.querySelector("#foto").value = ""),
      (document.querySelector("#preco").value = 0));
};

//Atualizar paleta

const atualizarPaleta = async (id) => {
  const paleta = {
    sabor,
    descricao,
    foto,
    preco,
  };

  const resposta = await fetch(`${baseUrl}/paletas/atualizar-paleta/${id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    mode: "cors",
    body: JSON.stringify(paleta),
  });

  const paletaAtualizada = await resposta.json();

  return paletaAtualizada;
};

// função confirmação de exclusão

const confirmarExclusao = (id) => {
  document.querySelector(".Confirmacao").innerHTML = ` 
   <div class="exclusao">
    <p> Tem certeza?</p>
    <button onclick="exlcuirPaleta(${id})">Sim</button>
    <button onclick="retornar()">Não</button>
   </div>`;
};

// retornar para a página inicial
const retornar = () => {
  window.location.reload(true);
};
//Exclui paletas:

const exlcuirPaleta = async (id) => {
  const resposta = await fetch(`${baseUrl}/paletas/excluir-paleta/${id}`, {
    method: "DELETE",
    mode: "cors",
  });

  if (resposta.status === 204) {
    window.location.reload(true);
    return "Paleta Excluída com sucesso";
  } else {
    return "Paleta não encontrada";
  }
};

//Manipulação do documento (HMTL);

const imprimirTodasAsPaletas = async () => {
  const paletas = await buscarTodasAsPaletas();

  paletas.forEach(function (element) {
    document.querySelector("#paletaList").insertAdjacentHTML(
      "beforeend",
      `<div class= "PaletaListaItem">
                      <div>
                         <div class ="PaletaListaItem__sabor"> ${
                           element.sabor
                         } </div>
                         <div class ="PaletaListaItem__preco"> R$ ${parseFloat(
                           element.preco
                         ).toFixed(2)} </div>
                         <div class ="PaletaListaItem__descricao"> ${
                           element.descricao
                         } </div>
                      </div>
                      <img class ="PaletaListaItem__foto" src=${
                        element.foto
                      } alt=${element.sabor}/>
                      <button class="botaoCard" onclick="formularioAtualizar(${
                        element.id
                      })">Editar</button>
                      <button class="botaoCard" onclick="confirmarExclusao(${
                        element.id
                      })">Excluir</button>
                 </div>`
    );
  });
};

imprimirTodasAsPaletas();

//Botão
// const ImprimirUmaPaletaPorId = async () => {

//    document.getElementById("paletaPesquisada").innerHTML = "";

//    const input = document.getElementById("inputIdPaleta");
//    const id = input.value;

//    const paleta = await buscarPaletasPorId(id);

//    if (paleta === false) {
//       const mensagemDeErro = document.createElement("p");
//       mensagemDeErro.id = "mensagemDeErro";
//       mensagemDeErro.classList.add("MensagemDeErro");
//       mensagemDeErro.innerText = "Nenhuma paleta encontrada";

//       document.getElementById("paletaPesquisada").appendChild(mensagemDeErro);
//    } else {

//    document.getElementById("paletaPesquisada").innerHTML =
//    `
//    <div class= "paletaListaItem">
//                       <div>
//                          <div class ="PaletaListaItem__sabor"> ${paleta.sabor} </div>
//                          <div class ="PaletaListaItem__preco"> R$ ${parseFloat(paleta.preco).toFixed(2)} </div>
//                          <div class ="PaletaListaItem__descricao"> ${paleta.descricao} </div>
//                       </div>
//                       <img class ="PaletaListaItem__foto" src=${paleta.foto} alt=${paleta.sabor}/>
//                  </div>
//    `;
//    };

// };

const imprimirUmaPaletaPorId = async () => {
  document.getElementById("paletaPesquisada").innerHTML = "";

  const input = document.getElementById("inputIdPaleta");
  const id = input.value;

  const paleta = await buscarPaletasPorId(id);

  if (paleta === false) {
    const mensagemDeErro = document.createElement("p");
    mensagemDeErro.id = "mensagemDeErro";
    mensagemDeErro.classList.add("MensagemDeErro");
    mensagemDeErro.innerText = "Nenhuma paleta encontrada";

    document.getElementById("paletaPesquisada").appendChild(mensagemDeErro);
  } else {
    document.getElementById("paletaPesquisada").innerHTML = `
       <div class="CartaoPaleta">
         <div class="CartaoPaleta__infos">
           <h4>${paleta.sabor}</h4>
           <span>R$${parseFloat(paleta.preco).toFixed(2)}</span>
           <p>${paleta.descricao}</p>
         </div>
         <img src="./${paleta.foto}" alt="Paleta sabor ${
      paleta.sabor
    }" class="CartaoPaleta__foto"/>
       </div>
     `;
  }
};
