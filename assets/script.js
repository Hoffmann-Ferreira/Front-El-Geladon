
 async function listarTodasAsPaletas() {
    const response = await fetch("http://localhost:3005/paletas/lista-todas/");
    
    const paletas = await response.json();

    paletas.forEach(function (element) {
      
      document.querySelector("#paletaList").insertAdjacentHTML(
          "beforeend",
           `<div class= "paletaListaItem">
                <div>
                   <div class ="PaletaListaItem__sabor"> ${element.sabor} </div>
                   <div class ="PaletaListaItem__preco"> R$ ${element.preco.toFixed(2)} </div>
                   <div class ="PaletaListaItem__descricao"> ${element.descricao} </div>
                </div>
                <img class ="PaletaListaItem__foto" src=${element.foto} alt=${element.sabor}/>
           </div>`
       );
   });
};

listarTodasAsPaletas();
