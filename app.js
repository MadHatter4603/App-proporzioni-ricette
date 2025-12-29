const contenitore = document.getElementById("ingredienti");

function aggiungiRiga() {
  const riga = document.createElement("div");
  riga.className = "riga";

  riga.innerHTML = `
    <button class="remove" onclick="this.parentElement.remove()">−</button>
    <input class="nome" placeholder="Ingrediente">
    <input class="originale" type="number" placeholder="Quantità">
    <input class="disponibile" type="number" placeholder="Tu hai">
  `;

  contenitore.appendChild(riga);
}

// righe iniziali
aggiungiRiga();
aggiungiRiga();

function calcola() {
  const righe = document.querySelectorAll(".riga");

  let rapporti = [];

  righe.forEach(riga => {
    const originale = parseFloat(riga.querySelector(".originale").value);
    const disponibile = parseFloat(riga.querySelector(".disponibile").value);

    if (!isNaN(originale) && !isNaN(disponibile)) {
      rapporti.push(disponibile / originale);
    }
  });

  if (rapporti.length === 0) {
    alert("Inserisci almeno un valore nella colonna 'tu hai'");
    return;
  }

  // ingrediente limitante
  const fattore = Math.min(...rapporti);

  // aggiorna TUTTI gli altri
  righe.forEach(riga => {
    const originale = parseFloat(riga.querySelector(".originale").value);
    const disponibileInput = riga.querySelector(".disponibile");
    const disponibile = parseFloat(disponibileInput.value);

    // se NON è l'ingrediente limitante
    if (isNaN(disponibile) || !isNaN(originale)) {
      disponibileInput.value = Math.round(originale * fattore);
    }
  });
}



//if ("serviceWorker" in navigator) {
//  navigator.serviceWorker.register("service-worker.js");
//}
