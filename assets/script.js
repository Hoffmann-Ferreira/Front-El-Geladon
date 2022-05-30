//variáveis auxiliares

let listaDePaletas = [];

const baseUrl = "http://localhost:3005";

//requisições:
//Buscar todas as paletas;

const buscarTodasAsPaletas = async () => {
  const resposta = await fetch(`${baseUrl}/paletas/listar-todas/`);

  const paletas = await resposta.json();

  listaDePaletas = paletas;

  return paletas;
};

//Buscar por Id

const buscarPaletasPorId = async (id) => {
  const resposta = await fetch(`${baseUrl}/paletas/paleta/${id}`);

  console.log(resposta);

  const paleta = await resposta.json();

  return paleta;
};

//Criar Paleta;

//fomulario paleta

const formularioCriar = async () => {
  document.querySelector("#criar").classList.remove("escondido");
  document.getElementById("criar").style.display = "flex";
  document.querySelector("#criar").innerHTML = `
   <div class = "fomrulario">
      <form>
         <feldset class = "fomularioItens">
            <legend>Criar Paleta</legend>

            <label for= "sabor">Sabor:</label>
            <input type= "text" id="sabor" class= "sabor" placeholder = "Sabor" required/>

            <label for= "descricao">Descrição:</label>
            <input type= "text" id="descricao" class="descricao" placeholder = "Descrição" required/>

            <label for= "foto">Foto:</label>
            <input type= "url" id="foto" class="foto" placeholder = "URL da Foto" required/>

            <label for= "preco">Preço:</label>
            <input type= "number" id="preco" class= "preco" placeholder = "Preço" required/>

         </feldset>
         <button id= "botaoCriar"> Salvar </button>
         <button id= "botaoCriar" onclick="retornar()">Voltar</button>
      </form>

   </div>`;

  window.scroll({
    top: 0,
    left: 0,
    behavior: "smooth",
  });

  const botaoCriar = document.getElementById("botaoCriar");
  //botão para chamar o put para atualizar
  botaoCriar.addEventListener("click", async () => {
    const sabor = document.getElementById("sabor").value;
    const preco = document.getElementById("preco").value;
    const descricao = document.getElementById("descricao").value;
    const foto = document.getElementById("foto").value;

    await criarPaleta(sabor, descricao, foto, preco);

    esconderModalEdicao();
    imprimirTodasAsPaletas();
  });
};

// função criar paleta
async function criarPaleta(sabor, descricao, foto, preco) {
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
}
// funcao que vai renderizar na tela o formulário para a pessoa poder digitar novamente os dados

const formularioAtualizar = async (id) => {
  document.querySelector("#atualizar").classList.remove("escondido");
  document.getElementById("atualizar").style.display = "flex";
  const paleta = listaDePaletas.find((elemento) => elemento._id === id);

  document.querySelector("#atualizar").innerHTML = `
   <div class = "fomrulario">
      <form>
         <feldset class = "fomularioItens">
            <legend>Atualizar Paleta</legend>

            <label for= "sabor">Sabor:</label>
            <input type= "text" id="sabor" class= "sabor" placeholder = "sabor" required/>

            <label for= "descricao">Descrição:</label>
            <input type= "text" id="descricao" class="descricao" required/>

            <label for= "foto">Foto:</label>
            <input type= "url" id="foto" class="foto" required/>

            <label for= "preco">Preço:</label>
            <input type= "number" id="preco" class= "preco" required/>

         </feldset>
         <button id= "botaoAtualizar">Atualizar</button>
         <button id= "botaoAtualizar" onclick="retornar()">Voltar</button>
      </form>

   </div>`;

  window.scroll({
    top: 0,
    left: 0,
    behavior: "smooth",
  });

  document.getElementById("sabor").value = paleta.sabor;
  document.getElementById("preco").value = paleta.preco;
  document.getElementById("descricao").value = paleta.descricao;
  document.getElementById("foto").value = paleta.foto;
  const botaoAtualizar = document.getElementById("botaoAtualizar");
  //botão para chamar o put para atualizar
  botaoAtualizar.addEventListener("click", async () => {
    const sabor = document.getElementById("sabor").value;
    const preco = document.getElementById("preco").value;
    const descricao = document.getElementById("descricao").value;
    const foto = document.getElementById("foto").value;

    await atualizarPaleta(id, sabor, descricao, foto, preco);

    esconderModalEdicao();
    imprimirTodasAsPaletas();
  });
};

// esconder formulário de atualização
const esconderModalEdicao = () => {
  document.getElementById("atualizar").style.display = "none";
};

//Atualizar paleta
async function atualizarPaleta(id, sabor, descricao, foto, preco) {
  console.log("entrei");
  const paleta = {
    sabor,
    descricao,
    foto,
    preco,
  };
  console.log(paleta);
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
}

// função confirmação de exclusão

const confirmarExclusao = (id) => {
  console.log(id);
  document.querySelector(".Confirmacao").innerHTML = ` 
   <div class="exclusao">
    <p> Tem certeza?</p>
    <button onclick="exlcuirPaleta('${id}')">Sim</button>
    <button onclick="retornar()">Não</button>
   </div>`;
  window.scroll({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
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
  if (resposta.status === 200) {
    retornar();
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
                      <img class ="PaletaListaItem__foto" src=${
                        element.foto
                      } alt=${element.sabor}/>
                      <div class = "botoesCard">
                      <button class="botaoCard" onclick="formularioAtualizar('${
                        element._id
                      }')">Editar</button>
                      <button class="botaoCard" onclick="confirmarExclusao('${
                        element._id
                      }')">Excluir</button>
                 </div>`
    );
  });
};

imprimirTodasAsPaletas();

//Pesquisar uma paleta por ID

const imprimirUmaPaletaPorId = async () => {
  document.querySelector(".remover").classList.remove("escondido");

  document.getElementById("paletaPesquisada").innerHTML = "";

  const input = document.getElementById("inputBuscaSaborPaleta");
  const sabor = input.value;
  const paletaSelecionada = listaDePaletas.find((elem) => elem.sabor === sabor);
  const id = paletaSelecionada._id;

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
         <img src="${paleta.foto}" alt="Paleta sabor ${
      paleta.sabor
    }" class="CartaoPaleta__foto"/>
       </div>
     `;
  }
};
