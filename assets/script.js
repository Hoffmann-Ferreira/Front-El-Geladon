
 async function listarTodasAsPaletas() {
    const response = await fetch("http://localhost:3005/paletas/listar-todas/");
    
    const paletas = await response.json();

    paletas.forEach(function (element) {
      
      document.querySelector("#paletaList").insertAdjacentHTML(
          "beforeend",
           `<div class= "paletaListaItem">
                <div>
                   <div class ="PaletaListaItem__sabor"> ${element.sabor} </div>
                   <div class ="PaletaListaItem__preco"> R$ ${parseFloat(element.preco).toFixed(2)} </div>
                   <div class ="PaletaListaItem__descricao"> ${element.descricao} </div>
                </div>
                <img class ="PaletaListaItem__foto" src=${element.foto} alt=${element.sabor}/>
           </div>`
       );
   });
};

listarTodasAsPaletas();

//variáveis auxiliares

const baseUrl = "http://localhost:3005"

//requisições: 
//Buscar todas as paletas;

const buscarTodasAsPaletas = async () => {
   const resposta = await fetch(`${baseUrl}/paletas/listar-todas/`);

   const paletas = await resposta.json();

   console.log(paletas);
   
   return paletas;
};

// buscarTodasAsPaletas();

//Buscar por Id

const buscarPaletasPorId = async (id) => {
   const resposta = await fetch(`${baseUrl}/paletas/paleta/${id}`);

   const paleta = await resposta.json();

   console.log(paleta);

   return paleta;
};

// buscarPaletasPorId(1);

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
         "Content-type": "application/json"

      },
      mode:"cors",
      body: JSON.stringify(paleta),
   });

   const novaPaleta = await resposta.json();
   console.log(novaPaleta);

   return novaPaleta;

};

// CriarPaleta("chocolate", "teste","testefoto", "10.50" );

//Atualizar paleta

const atualizarPaleta = async (id, sabor, descricao, foto, preco) => {
   const paleta = {
      sabor,
      descricao,
      foto,
      preco,
   };

   const resposta = await fetch(`${baseUrl}/paletas/atualizar-paleta/${id}`, {
      method: "PUT",
      headers: {
         "Content-type": "application/json"

      },
      mode:"cors",
      body: JSON.stringify(paleta),
   });

   const paletaAtualizada = await resposta.json();

   console.log(paletaAtualizada);
   return paletaAtualizada;

};

// atualizarPaleta(5,"Brigadeiro", "teste","testefoto", "10.50");

//Exclui paletas:

const exlcuirPaleta = async (id) => {
   const resposta = await fetch(`${baseUrl}/paletas/excluir-paleta/${id}`, {
      method: "DELETE",
      mode:"cors",
   });

   console.log(paletaExcluida);

   if(resposta.status === 204){
      return "Paleta Excluída com sucesso"
   } else {
      return "Paleta não encontrada"
   }

};

exlcuirPaleta(14);







