// const fetch = require ("cross-fetch");
import fetch from "cross-fetch";

 async function listarTodasAsPaletas() {
    const response = await fetch("http://localhost:3005/paletas/lista-todas/");
    
    const paletas = await response.json();

    paletas.forEach((element) =>{
      
       document.querySelector("#paletaList").innerHTML(
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