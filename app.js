const UNITA = {
  g:   { tipo: "peso",  base: "g",  fattore: 1 },
  kg:  { tipo: "peso",  base: "g",  fattore: 1000 },

  ml:  { tipo: "volume", base: "ml", fattore: 1 },
  l:   { tipo: "volume", base: "ml", fattore: 1000 },

  pz:  { tipo: "pezzi", base: "pz", fattore: 1 },
  qb:  { tipo: "qb",    base: "qb", fattore: 1 }
};

const DECIMALI_UNITA = {
  g: 0,
  ml: 0,
  kg: 2,
  l: 2,
  pz: 1,
  qb: null
};


function aggiungiRiga(nome = "", originale = "", unita = "g", hai = "", unitaHai = "g") {
  const contenitore = document.getElementById("ingredienti");

  const riga = document.createElement("div");
  riga.className = "riga";

  riga.innerHTML = `
    <button class="remove" onclick="this.parentElement.remove()">−</button>

    <input
      class="nome"
      placeholder="Ingrediente"
      value="${nome}"
    >

    <!-- QUANTITÀ -->
    <div class="campo-unita quantita">
      <input
        class="originale"
        type="text"
        inputmode="decimal"
        pattern="[0-9.,]*"
        placeholder="Quantità"
        value="${originale != null ? originale : ""}"
      >

      <select class="unita">
        <option value="g">g</option>
        <option value="kg">kg</option>
        <option value="ml">ml</option>
        <option value="l">l</option>
        <option value="pz">pz.</option>
        <option value="qb">q.b.</option>
      </select>
    </div>

    <!-- TU HAI -->
    <div class="campo-unita tu-hai">
      <input
        class="disponibile"
        type="text"
        inputmode="decimal"
        pattern="[0-9.,]*"
        placeholder="Tu hai"
        value="${hai != null ? hai : ""}"
      >

      <select class="unita-hai">
        <option value="g">g</option>
        <option value="kg">kg</option>
        <option value="ml">ml</option>
        <option value="l">l</option>
        <option value="pz">pz.</option>
        <option value="qb">q.b.</option>
      </select>
    </div>
  `;

  contenitore.appendChild(riga);

  /* =============================
     IMPOSTAZIONE UNITÀ SALVATE
     ============================= */
  const selectOrig = riga.querySelector(".unita");
  const selectHai = riga.querySelector(".unita-hai");

  selectOrig.value = unita;
  selectHai.value = unitaHai || unita;

  /* =============================
     GESTIONE q.b.
     ============================= */
  selectOrig.addEventListener("change", () => {
    aggiornaStatoInputQB(riga);
  });

  // applica subito lo stato corretto
  aggiornaStatoInputQB(riga);
}


// righe iniziali
aggiungiRiga();
aggiungiRiga();

// carica ricette salvate all'avvio
aggiornaListaRicette();


function leggiNumero(valore) {
  if (valore === "") return NaN;

  // sostituisce la virgola con il punto
  const normalizzato = valore.replace(",", ".");

  // rifiuta numeri che finiscono con "."
  if (normalizzato.endsWith(".")) return NaN;

  return parseFloat(normalizzato);
}


function toBase(valore, unita) {
  const info = UNITA[unita];
  if (!info || info.base === "qb") return null;

  return valore * info.fattore;
}

function fromBase(valoreBase, unita) {
  const info = UNITA[unita];
  if (!info || info.base === "qb") return null;

  return valoreBase / info.fattore;
}


function normalizzaUnita(valoreBase, tipo) {
  if (tipo === "peso") {
    if (valoreBase >= 1000) return { valore: valoreBase / 1000, unita: "kg" };
    return { valore: valoreBase, unita: "g" };
  }

  if (tipo === "volume") {
    if (valoreBase >= 1000) return { valore: valoreBase / 1000, unita: "l" };
    return { valore: valoreBase, unita: "ml" };
  }
  
  if (tipo === "pezzi") {
    return { valore: valoreBase, unita: "pz" };
  }

  return { valore: valoreBase, unita: null };
}

function formattaValore(valore, unita) {
  const decimali = DECIMALI_UNITA[unita];

  if (decimali === null || decimali === undefined) {
    return "";
  }

  return Number(valore.toFixed(decimali));
}


function aggiornaStatoInputQB(riga) {
  const selectQuantita = riga.querySelector(".unita");
  const inputQuantita = riga.querySelector(".originale");

  const selectHai = riga.querySelector(".unita-hai");
  const inputHai = riga.querySelector(".disponibile");

  if (selectQuantita.value === "qb") {
    // Quantità
    inputQuantita.value = "";
    inputQuantita.placeholder = "q.b.";
    inputQuantita.disabled = true;
    nascondiErrore(inputQuantita);

    // Tu hai
    selectHai.value = "qb";
    selectHai.disabled = true;
    inputHai.value = "";
    inputHai.placeholder = "q.b.";
    inputHai.disabled = true;
    nascondiErrore(inputHai);
    
  } else { //ripristino normale
    // Quantità
    inputQuantita.disabled = false;
    inputQuantita.placeholder = "Quantità";

    // Tu hai
    inputHai.disabled = false;
    inputHai.placeholder = "Tu hai";
    selectHai.disabled = false;
  }
}

function aggiornaStatoQBCompleto(riga) {
  const unitaOrig = riga.querySelector(".unita").value;
  const unitaHai = riga.querySelector(".unita-hai");
  const inputOrig = riga.querySelector(".originale");
  const inputHai = riga.querySelector(".disponibile");

  if (unitaOrig === "qb") {
    // quantità
    inputOrig.value = "";
    inputOrig.placeholder = "q.b.";
    inputOrig.disabled = true;

    // tu hai
    unitaHai.value = "qb";
    inputHai.value = "";
    inputHai.placeholder = "q.b.";
    inputHai.disabled = true;

    nascondiErrore(inputOrig);
    nascondiErrore(inputHai);
  } else {
    inputOrig.disabled = false;
    inputOrig.placeholder = "Quantità";

    inputHai.disabled = false;
    inputHai.placeholder = "Tu hai";
  }
}


function mostraErrore(input) {
  input.classList.add("input-errore");
  
  // Crea il messaggio se non esiste
  let msg = input.parentElement.querySelector(".messaggio-errore");
  if (!msg) {
    msg = document.createElement("div");
    msg.className = "messaggio-errore";
    msg.textContent = "Inserire numero valido!";
    input.parentElement.appendChild(msg);
  }
  msg.style.display = "block";
}

function nascondiErrore(input) {
  input.classList.remove("input-errore");
  const msg = input.parentElement.querySelector(".messaggio-errore");
  if (msg) msg.style.display = "none";
}


function calcola() {
  const righe = document.querySelectorAll(".riga");

  let rapporti = [];
  let erroreTrovato = false;

  /* =============================
     PRIMA PASSATA: VALIDAZIONE
     + CALCOLO RAPPORTI
     ============================= */
  righe.forEach(riga => {
    const originaleInput = riga.querySelector(".originale");
    const disponibileInput = riga.querySelector(".disponibile");

    const unitaOrig = riga.querySelector(".unita").value;
    const unitaHai = riga.querySelector(".unita-hai").value;

    // se è q.b. → ignora completamente la riga
    if (unitaOrig === "qb") return;

    const originale = leggiNumero(originaleInput.value);
    const disponibile = leggiNumero(disponibileInput.value);

    nascondiErrore(originaleInput);
    nascondiErrore(disponibileInput);

    // originale NON valido
    if (isNaN(originale)) {
      mostraErrore(originaleInput);
      erroreTrovato = true;
      return;
    }

    // disponibile compilato ma NON valido
    if (disponibileInput.value !== "" && isNaN(disponibile)) {
      mostraErrore(disponibileInput);
      erroreTrovato = true;
      return;
    }

    // se "tu hai" è vuoto → non partecipa
    if (isNaN(disponibile)) return;

    // unità incompatibili
    if (UNITA[unitaOrig].tipo !== UNITA[unitaHai].tipo) {
      mostraErrore(disponibileInput);
      erroreTrovato = true;
      return;
    }

    const baseOrig = toBase(originale, unitaOrig);
    const baseDisp = toBase(disponibile, unitaHai);

    rapporti.push(baseDisp / baseOrig);
  });

  if (erroreTrovato) return;

  if (rapporti.length === 0) {
    alert("Inserisci almeno un valore nella colonna 'tu hai'");
    return;
  }

  /* =============================
     INGREDIENTE LIMITANTE
     ============================= */
  const fattore = Math.min(...rapporti);

  /* =============================
     SECONDA PASSATA: SCRITTURA
     RISULTATI
     ============================= */
  righe.forEach(riga => {
    const unitaOrig = riga.querySelector(".unita").value;
    if (unitaOrig === "qb") return;

    const originaleInput = riga.querySelector(".originale");
    const disponibileInput = riga.querySelector(".disponibile");
    const selectHai = riga.querySelector(".unita-hai");

    const originale = leggiNumero(originaleInput.value);
    if (isNaN(originale)) return;

    const baseOrig = toBase(originale, unitaOrig);
    const risultatoBase = baseOrig * fattore;

    const tipo = UNITA[unitaOrig].tipo;
    const normalizzato = normalizzaUnita(risultatoBase, tipo);

    const valoreFormattato = formattaValore(
      normalizzato.valore,
      normalizzato.unita
    );

    disponibileInput.value = valoreFormattato;

    if (normalizzato.unita) {
      selectHai.value = normalizzato.unita;
    }
  });
}


function leggiRicettaDaUI() {
  const righe = document.querySelectorAll(".riga");
  const ingredienti = [];

  righe.forEach(riga => {
    const nome = riga.querySelector(".nome").value.trim();
    const originaleInput = riga.querySelector(".originale");
    const unita = riga.querySelector(".unita").value;

    // nome obbligatorio
    if (!nome) return;

    // caso q.b.
    if (unita === "qb") {
      ingredienti.push({
        nome,
        originale: null,
        unita: "qb"
      });
      return;
    }

    // altri casi → quantità numerica richiesta
    const valore = leggiNumero(originaleInput.value);
    if (isNaN(valore)) return;

    ingredienti.push({
      nome,
      originale: valore,
      unita
    });
  });

  return ingredienti;
}

function salvaRicetta() {
  const nome = document.getElementById("nomeRicetta").value.trim();
  if (!nome) {
    alert("Inserisci un nome per la ricetta");
    return;
  }

  const ingredienti = leggiRicettaDaUI();
  if (ingredienti.length === 0) {
    alert("Nessun ingrediente valido");
    return;
  }

  const ricetta = { nome, ingredienti };

  const salvate = JSON.parse(localStorage.getItem("ricette")) || [];
  salvate.push(ricetta);

  localStorage.setItem("ricette", JSON.stringify(salvate));

  aggiornaListaRicette();
  alert("Ricetta salvata ✅");
}

function aggiornaListaRicette() {
  const select = document.getElementById("listaRicette");
  select.innerHTML = '<option value="">-- Ricette salvate --</option>';

  const ricette = JSON.parse(localStorage.getItem("ricette")) || [];

  ricette.forEach((r, i) => {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = r.nome;
    select.appendChild(option);
  });
}

function caricaRicetta() {
  const index = document.getElementById("listaRicette").value;
  if (index === "") return;

  const ricette = JSON.parse(localStorage.getItem("ricette"));
  const ricetta = ricette[index];

  // pulisci griglia
  document.querySelectorAll(".riga").forEach(r => r.remove());

  ricetta.ingredienti.forEach(ing => {
    aggiungiRiga(ing.nome, ing.originale, ing.unita, "");
  });
}


/* =========================
   BLOCCO CARATTERE "-"
   ========================= */
document.addEventListener("input", e => {
  if (
    e.target.classList.contains("originale") ||
    e.target.classList.contains("disponibile")
  ) {
    e.target.value = e.target.value.replace(/-/g, "");
  }
});



// FUORI CODICE ==================================================

if ("serviceWorker" in navigator) {
  let isRefreshing = false;
  
  // Deregistra tutti i SW vecchi prima di registrarne uno nuovo
  navigator.serviceWorker.getRegistrations().then(registrations => {
    registrations.forEach(registration => {
      registration.unregister();
    });
  }).then(() => {
    // Registra il nuovo SW
    return navigator.serviceWorker.register("service-worker.js");
  }).then(registration => {
    console.log('[App] SW registered');
    
    // Controlla aggiornamenti solo una volta all'apertura
    registration.update();
    
    // Gestisci gli aggiornamenti
    registration.addEventListener("updatefound", () => {
      const newWorker = registration.installing;
      console.log('[App] New SW found');
      
      newWorker.addEventListener("statechange", () => {
        console.log('[App] SW state:', newWorker.state);
        if (newWorker.state === "activated" && !navigator.serviceWorker.controller) {
          // Primo caricamento, non ricaricare
          console.log('[App] First load, no reload needed');
          return;
        }
        if (newWorker.state === "activated" && navigator.serviceWorker.controller && !isRefreshing) {
          isRefreshing = true;
          console.log('[App] New SW activated, reloading...');
          window.location.reload();
        }
      });
    });
  });

  // Ascolta messaggi dal SW
  navigator.serviceWorker.addEventListener("message", event => {
    console.log('[App] Message from SW:', event.data);
    if (event.data.type === "SW_UPDATED" && !isRefreshing) {
      isRefreshing = true;
      console.log('[App] SW updated to version:', event.data.version);
      // Aspetta un attimo prima di ricaricare per evitare loop
      setTimeout(() => {
        window.location.reload();
      }, 100);
    }
  });

  // Ascolta cambiamenti del controller
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (!isRefreshing) {
      isRefreshing = true;
      console.log('[App] Controller changed, reloading...');
      // Aspetta un attimo prima di ricaricare
      setTimeout(() => {
        window.location.reload();
      }, 100);
    }
  });
}









