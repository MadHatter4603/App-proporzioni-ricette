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
   RESET ERRORE NOME INGREDIENTE
   ============================= */
    const nomeInput = riga.querySelector(".nome");

    nomeInput.addEventListener("input", () => {
      nomeInput.classList.remove("input-errore");

      const errore = nomeInput.parentElement.querySelector(".errore-nome");
      if (errore) errore.remove();
    });

  /* =============================
     IMPOSTAZIONE UNITÀ SALVATE
     ============================= */
  const selectOrig = riga.querySelector(".unita");
  const selectHai = riga.querySelector(".unita-hai");

  selectOrig.value = unita;
  selectHai.value = unitaHai || unita;
  
  selectOrig.addEventListener("change", () => {
    rimuoviErroreUnita(riga);
  });
  selectHai.addEventListener("change", () => {
    rimuoviErroreUnita(riga);
  });

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

limitaInputPorzioni();

//=====================================================
// per togliere l'errore sul nome della ricetta in fase di input
const nomeRicettaInput = document.getElementById("nomeRicetta");
const nomeRicettaErrore = document.getElementById("nome-ricetta-error");

if (nomeRicettaInput) {
  nomeRicettaInput.addEventListener("input", () => {
    nomeRicettaInput.classList.remove("error");
    if (nomeRicettaErrore) {
      nomeRicettaErrore.textContent = "";
    }
  });
}
//=====================================================


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

function mostraErroreUnita(select) {
  select.classList.add("select-errore");

  const campo = select.closest(".campo-unita");

  let msg = campo.querySelector(".errore-unita");
  if (!msg) {
    msg = document.createElement("div");
    msg.className = "errore-unita";
    msg.textContent = "Unità incongruenti!";
    campo.appendChild(msg);
  }

  msg.style.display = "block";
}

function rimuoviErroreUnita(riga) {
  const selectHai = riga.querySelector(".unita-hai");
  selectHai.classList.remove("select-errore");

  const msg = riga.querySelector(".errore-unita");
  if (msg) {
    msg.style.display = "none";
  }
}

function rimuoviErroreOnInput(input) {
  if (!input) return;

  input.addEventListener("input", () => {
    nascondiErrore(input);
  });
}

function mostraErroreNomeIngrediente(input) {
  input.classList.add("input-errore");

  let errore = input.parentElement.querySelector(".errore-nome");
  if (!errore) {
    errore = document.createElement("div");
    errore.className = "errore errore-nome";
    errore.textContent = "Inserire ingrediente valido!";
    input.parentElement.appendChild(errore);
  }
}

function resetErroriRiga(riga) {
  // input nome
  const nomeInput = riga.querySelector(".nome");
  if (nomeInput) {
    nomeInput.classList.remove("input-errore");

    const errNome = nomeInput.parentElement.querySelector(".errore-nome");
    if (errNome) errNome.remove();

    const errMsg = nomeInput.parentElement.querySelector(".messaggio-errore");
    if (errMsg) errMsg.remove();
  }

  // input quantità
  const originaleInput = riga.querySelector(".originale");
  if (originaleInput) {
    originaleInput.classList.remove("input-errore");

    const errMsg = originaleInput.parentElement.querySelector(".messaggio-errore");
    if (errMsg) errMsg.remove();
  }

  // errore unità
  rimuoviErroreUnita(riga);
}


function calcola() {
  const righe = document.querySelectorAll(".riga");
  const inputVorrei = document.querySelector(".input-vorrei-num");
  const valoreVorreiPrima = inputVorrei && inputVorrei.value !== ""
    ? Number(inputVorrei.value)
    : null;

  // reset stato visivo
  if (inputVorrei) {
    inputVorrei.classList.remove("auto-changed");
  }

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
    
    rimuoviErroreOnInput(originaleInput);
    rimuoviErroreOnInput(disponibileInput);

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
      mostraErroreUnita(riga.querySelector(".unita-hai"));
      erroreTrovato = true;
      return;
    }

    const baseOrig = toBase(originale, unitaOrig);
    const baseDisp = toBase(disponibile, unitaHai);

    rapporti.push(baseDisp / baseOrig);
  });

  if (erroreTrovato) return; //!!!!

  /* =============================
   FATTORE PORZIONI
   ============================= */
  const porzioni = leggiPorzioniCalcolatore();

  let fattorePorzioni = null;

  if (
    porzioni.sarebbe.valore !== null &&
    porzioni.vorrei.valore !== null
  ) {
    fattorePorzioni = porzioni.vorrei.valore / porzioni.sarebbe.valore;
  }

  /* =============================
   SCELTA FATTORE LIMITANTE
   ============================= */
  let fattori = [];

  if (rapporti.length > 0) {
    fattori.push(Math.min(...rapporti));
  }

  if (fattorePorzioni !== null) {
    fattori.push(fattorePorzioni);
  }

  if (fattori.length === 0) {
    alert("Nessuna quantità da ricalcolare!");
    return;
  }

  const fattore = Math.min(...fattori);

  /* =============================
     SECONDA PASSATA: SCRITTURA
     RISULTATI
     ============================= */
  let almenoUnoZero = false;
  
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
    
    if (valoreFormattato <= 0) {
      almenoUnoZero = true;
    }

  });
  
  /* =============================
   AGGIORNA PORZIONI "VORREI"
   ============================= */
  if (porzioni.sarebbe.valore !== null && inputVorrei) {
    const risultatoPorzioni = porzioni.sarebbe.valore * fattore;
    const valoreCalcolato = Number(risultatoPorzioni.toFixed(1));

    // scrive sempre il valore calcolato
    inputVorrei.value = valoreCalcolato;
    
    if (valoreCalcolato <= 0) {
      almenoUnoZero = true;
    }

    // evidenzia SOLO se il valore precedente esisteva ed è cambiato
    if (
      valoreVorreiPrima !== null &&
      valoreVorreiPrima !== valoreCalcolato
    ) {
      inputVorrei.classList.add("auto-changed");
      
      // pulse SOLO se non era già stato modificato automaticamente
      if (!inputVorrei.dataset.pulsed) {
        inputVorrei.classList.add("pulse");
        inputVorrei.dataset.pulsed = "true";

        // rimuove la classe pulse dopo l'animazione
        setTimeout(() => {
          inputVorrei.classList.remove("pulse");
        }, 600);
      }
    }
  }
  
  if (almenoUnoZero) {
    const bannerNotifica = document.querySelector(".banner-notifica");
    bannerNotifica.classList.add("sad");
    mostraBanner("Non hai abbastanza ingredienti per fare questa ricetta :(");
  }
}


let bannerTimeout = null;

function mostraBanner(messaggio, durata = 3000) {
  const banner = document.getElementById("banner-notifica");
  const testo = document.getElementById("banner-testo");
  const btnChiudi = banner.querySelector(".chiudi-banner");

  testo.textContent = messaggio;
  banner.classList.remove("nascosto", "fade-out");

  // ⛔ annulla eventuale timeout precedente
  if (bannerTimeout) {
    clearTimeout(bannerTimeout);
  }

  bannerTimeout = setTimeout(nascondi, durata);

  function nascondi() {
    banner.classList.add("fade-out");
    setTimeout(() => {
      banner.classList.add("nascosto");
      banner.classList.remove("sad");
    }, 600);
  }

  btnChiudi.onclick = () => {
    if (bannerTimeout) clearTimeout(bannerTimeout);
    nascondi();
  };
}


function leggiRicettaDaUI() {
  const righe = document.querySelectorAll(".riga");
  const ingredienti = [];

  let erroreIngrediente = false;

  righe.forEach(riga => {
    const nomeInput = riga.querySelector(".nome");
    const originaleInput = riga.querySelector(".originale");
    const unita = riga.querySelector(".unita").value;

    const nome = nomeInput.value.trim();
    const valoreRaw = originaleInput.value.trim();

    // reset errore visivo
    nomeInput.classList.remove("input-errore");
    originaleInput.classList.remove("input-errore");

    // ✅ CASO 1: entrambi vuoti → ignora la riga
    if (!nome && !valoreRaw) {
      resetErroriRiga(riga);
      return; // salta questa riga
    }

    // ❌ CASO 2: quantità piena MA nome vuoto
    if (!nome && valoreRaw) {
      mostraErroreNomeIngrediente(nomeInput);
      erroreIngrediente = true;
      return;
    }

    // ❌ CASO 3: nome pieno MA quantità vuota (e NON è q.b.)
    if (nome && !valoreRaw && unita !== "qb") {
      mostraErrore(originaleInput);
      erroreIngrediente = true;
      return;
    }

    // caso q.b.
    if (unita === "qb") {
      ingredienti.push({
        nome,
        originale: null,
        unita: "qb"
      });
      return;
    }

    const valore = leggiNumero(valoreRaw);
    if (isNaN(valore)) { //
      mostraErrore(originaleInput);
      erroreIngrediente = true;
      return;
    }

    ingredienti.push({
      nome,
      originale: valore,
      unita
    });
  });

  // ❌ se c'è almeno un errore → BLOCCA il salvataggio
  if (erroreIngrediente) {
    return null;
  }

  return ingredienti;
}

function salvaRicetta() {
  const inputNome = document.getElementById("nomeRicetta");
  const nome = inputNome.value.trim();

  // reset errore visivo
  inputNome.classList.remove("error");
  const errorEl = document.getElementById("nome-ricetta-error");
  if (errorEl) errorEl.textContent = "";

  if (!nome) {
    inputNome.classList.add("error");
    errorEl.textContent = "Inserire nome ricetta.";
    return;
  }

  // ❗ controllo duplicato
  if (nomeGiaEsistente(nome)) {
    inputNome.classList.add("error");
    errorEl.textContent = "Nome ricetta già esistente.";
    return;
  }
  
  const porzioniCalc = leggiPorzioniCalcolatore();

  const porzioni = porzioniCalc.sarebbe.valore;
  const tipoPorzioni = porzioniCalc.sarebbe.tipo;


  const ingredienti = leggiRicettaDaUI();
  if (!ingredienti) return;
  
  if (ingredienti.length === 0) {
    alert("Nessun ingrediente valido");
    return;
  }

  const ricetta = {
    id: Date.now(),
    nome,
    ingredienti,
    preferita: false,
    porzioni,
    tipoPorzioni
  };

  const salvate = JSON.parse(localStorage.getItem("ricette")) || [];
  salvate.push(ricetta);

  localStorage.setItem("ricette", JSON.stringify(salvate));

  mostraRicetteSalvate();
  mostraBanner("Ricetta salvata ✔️");
}


function resetQuantita() {
  const conferma = confirm(
    "Svuotare le caselle con le quantità possedute?"
  );
  if (!conferma) return;

  // vorrei
  const inputVorrei = document.querySelector(".input-vorrei-num");
  if (inputVorrei) inputVorrei.value = "";
  if (inputVorrei) {
    inputVorrei.classList.remove("auto-changed");
    inputVorrei.classList.remove("pulse");
    delete inputVorrei.dataset.pulsed;
  }

  // tu hai
  document.querySelectorAll(".campo-unita.tu-hai").forEach(campo => {
    const input = campo.querySelector("input");
    const select = campo.querySelector("select");

    if (input) input.value = "";
    if (select && select.value !== "qb") {
      select.selectedIndex = 0;
    }
  });

  // rimuove TUTTI gli errori (input + unità)
  document.querySelectorAll(".riga").forEach(riga => {
    // errore unità
    rimuoviErroreUnita(riga);

    // errori numerici: originale + tu hai
    riga.querySelectorAll("input").forEach(input => {
      nascondiErrore(input);
    });
  });
}


function leggiPorzioniCalcolatore() {
  return {
    sarebbe: {
      valore: Number(document.querySelector(".input-sarebbe-num").value) || 1,
      tipo: document.querySelector(".select-sarebbe-tipo").value
    },
    vorrei: {
      valore: document.querySelector(".input-vorrei-num").value === "" ? null : Number(document.querySelector(".input-vorrei-num").value),
      tipo: document.querySelector(".select-vorrei-tipo").value
    }
  };
}

function limitaInputPorzioni() {
  const inputs = document.querySelectorAll('.input-sarebbe-num, .input-vorrei-num');
  
  inputs.forEach(input => {
    input.addEventListener('input', function() {
      let val = parseInt(this.value);
      if (val > 99) this.value = 99;
      if (val < 1) this.value = 1;
    });
  });
  
  document.addEventListener("keydown", e => {
    const input = e.target;

    if (!input.classList.contains("input-porzioni-calc")) return;

    // blocca sempre + e -
    if (e.key === "+" || e.key === "-") {
      e.preventDefault();
      return;
    }

    // blocca il punto SOLO nella colonna "Sarebbe"
    if (
      input.classList.contains("input-sarebbe-num") &&
      (e.key === "." || e.key === ",")
    ) {
      e.preventDefault();
    }
  });

  document.addEventListener("DOMContentLoaded", () => {
    const selectSarebbe = document.querySelector(".select-sarebbe-tipo");
    const selectVorrei  = document.querySelector(".select-vorrei-tipo");

    if (!selectSarebbe || !selectVorrei) return;

    // inizializza: il destro segue il sinistro
    selectVorrei.value = selectSarebbe.value;
    selectVorrei.disabled = true;

    // ogni cambio a sinistra si riflette a destra
    selectSarebbe.addEventListener("change", () => {
      selectVorrei.value = selectSarebbe.value;
    });
  });
  
  const inputSarebbe = document.querySelector('.input-sarebbe-num');
  if (inputSarebbe) {
    inputSarebbe.addEventListener('blur', function() {
      if (this.value === '' || parseInt(this.value) < 1 || isNaN(parseInt(this.value))) {
        this.value = 1;
      }
    });
  }
  
  document.addEventListener("input", e => {
    const input = e.target;

    if (!input.classList.contains("input-vorrei-num")) return;

    // se l'utente modifica manualmente → reset evidenziazione
    input.classList.remove("auto-changed");
    input.classList.remove("pulse");
    delete input.dataset.pulsed;
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
} //obsoleta ma crea problemi con la funzione apriMenu() se viene eliminata


function mostraRicetteSalvate() {
  const contenitore = document.getElementById("lista-ricette-pagina");
  if (!contenitore) return;

  const scrollY = window.scrollY;
  contenitore.innerHTML = "";

  let ricette = JSON.parse(localStorage.getItem("ricette")) || [];
  
  const filtro = leggiFiltroRicette();

  if (filtro) {
    ricette = ricette.filter(r =>
      r.nome.toLowerCase().includes(filtro)
    );
  }

  ricette = ricette.map(r => ({
    id: r.id,
    nome: r.nome,
    ingredienti: r.ingredienti ?? [],
    preferita: r.preferita ?? false,
    link: r.link ?? "",
    note: r.note ?? "",
    porzioni: r.porzioni ?? 1,
    tipoPorzioni: r.tipoPorzioni ?? "porzioni"
  }));

  // ⭐ preferiti in cima
  ricette.sort((a, b) => (b.preferita === true) - (a.preferita === true));

  ricette.forEach(r => {
    const wrapper = document.createElement("div");
    wrapper.className = "ricetta-swipe";
    wrapper.dataset.id = r.id;
    wrapper.dataset.preferita = r.preferita ? "1" : "0";

    const deleteBg = document.createElement("div");
    deleteBg.className = "ricetta-delete";
    deleteBg.textContent = "🗑";

    const card = document.createElement("div");
    card.className = "ricetta-card";

    card.innerHTML = `
      <div class="card-main">
        <div class="card-header">
          <span class="drag-handle">⠿</span>

          <div class="card-title-wrapper">
            <div class="card-title">
              <span class="ricetta-nome">${r.nome}</span>
              <span class="edit-nome" title="Modifica nome">✏️</span>
            </div>
            <div class="nome-error"></div>
          </div>

          <span class="ricetta-star ${r.preferita ? "attiva" : ""}">★</span>
          
          <span class="ricetta-porzioni">
          x${r.porzioni ?? 1} ${r.tipoPorzioni ?? "porzioni"}
          </span>
          
        </div>

        <div class="card-link">
          ${r.link ? `<a href="${r.link}" target="_blank">${r.link}</a>` : ""}
        </div>
      </div>

      <button class="btn-carica">Carica</button>
    `;

    // ⚠️ STRUTTURA OBBLIGATORIA PER SWIPE
    wrapper.append(deleteBg, card);
    contenitore.appendChild(wrapper);

    // link cliccabile senza popup
    const link = card.querySelector(".card-link a");
    if (link) {
      link.addEventListener("click", e => e.stopPropagation());
    }

    // ✏️ modifica nome
    abilitaModificaNome(card, r.id);

    // ⭐ preferito
    card.querySelector(".ricetta-star").addEventListener("click", e => {
      e.stopPropagation();
      togglePreferito(r.id);
    });

    // 📂 carica nel calcolatore
    card.querySelector(".btn-carica").addEventListener("click", e => {
      e.stopPropagation();
      caricaRicettaDaPagina(r.id);
    });

    // 📘 apri popup con controllo editing migliorato
    card.addEventListener("click", e => {
      const nomeEl = card.querySelector(".ricetta-nome");
      
      // 1️⃣ click su elementi interattivi → NON aprire popup
      if (e.target.closest(".ricetta-nome, .edit-nome, .ricetta-star, .btn-carica, .drag-handle")) {
        return;
      }

      // 2️⃣ se è appena uscito da editing → NON aprire popup
      if (card.classList.contains("editing-nome") || card.dataset.justExitedEdit === "true") {
        return;
      }

      // 3️⃣ altrimenti apri popup
      apriPopupRicetta(r.id);
    });

    // gesture
    abilitaSwipe(wrapper, card);
    abilitaDrag(wrapper);
  });

  //localStorage.setItem("ricette", JSON.stringify(ricette)); //dava problemi con la barra di ricerca

  requestAnimationFrame(() => {
    window.scrollTo({ top: scrollY, behavior: "auto" });
  });
}

function leggiFiltroRicette() {
  const input = document.getElementById("ricette-search-input");
  return input ? input.value.trim().toLowerCase() : "";
}


function abilitaModificaNome(card, id) {
  const nomeEl = card.querySelector(".ricetta-nome");
  const editBtn = card.querySelector(".edit-nome");

  let originalName = nomeEl.textContent;
  let isEditing = false; // 🔑 flag per tracciare lo stato

  const errorEl = document.createElement("div");
  errorEl.className = "nome-error";

  // ✏️ AVVIO EDIT
  editBtn.addEventListener("click", e => {
    e.stopPropagation();

    isEditing = true;
    card.classList.add("editing-nome");
    card.dataset.justExitedEdit = "false";

    originalName = nomeEl.textContent;
    nomeEl.contentEditable = "true";
    nomeEl.classList.add("editing");

    nomeEl.scrollLeft = 0;
    nomeEl.focus();
    
    if (typeof enableAutoScrollOnEdit === 'function') {
      enableAutoScrollOnEdit(nomeEl);
    }
    if (typeof placeCaretAtEnd === 'function') {
      placeCaretAtEnd(nomeEl);
    }
  });

  // ⌨️ gestione tasti
  nomeEl.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      e.preventDefault();
      nomeEl.blur();
    }

    if (e.key === "Escape") {
      nomeEl.textContent = originalName;
      cleanup(false); // no salvataggio
    }
  });

  // 🔚 FINE EDIT
  nomeEl.addEventListener("blur", () => {
    if (!isEditing) return; // già gestito

    const nuovoNome = nomeEl.textContent.trim();

    // ❌ vuoto
    if (!nuovoNome) {
      mostraErrore("Nome ricetta non valido.");
      nomeEl.textContent = originalName;
      
      // riapri editing dopo un attimo
      setTimeout(() => nomeEl.focus(), 10);
      return;
    }

    // ❌ duplicato
    if (nomeGiaEsistente(nuovoNome, id)) {
      mostraErrore("Nome ricetta già esistente.");
      nomeEl.textContent = originalName;
      
      // riapri editing dopo un attimo
      setTimeout(() => nomeEl.focus(), 10);
      return;
    }

    // ✅ valido
    salvaNome(id, nuovoNome);
    cleanup(true);
  });

  function mostraErrore(msg) {
    nomeEl.classList.add("error");
    errorEl.textContent = msg;

    const wrapper = nomeEl.closest(".card-title-wrapper");
    if (!wrapper.contains(errorEl)) {
      wrapper.appendChild(errorEl);
    }
  }

  function cleanup(wasSuccessful) {
    isEditing = false;
    nomeEl.contentEditable = "false";
    nomeEl.classList.remove("editing", "error");
    nomeEl.scrollLeft = 0;
    errorEl.remove();

    // ritarda la rimozione della classe per bloccare il click
    card.dataset.justExitedEdit = "true";
    
    setTimeout(() => {
      card.classList.remove("editing-nome");
      card.dataset.justExitedEdit = "false";
    }, 100); // 100ms di ritardo per evitare il click
  }
}

function nomeGiaEsistente(nome, currentId) {
  const ricette = JSON.parse(localStorage.getItem("ricette")) || [];
  return ricette.some(
    r => r.nome.toLowerCase() === nome.toLowerCase() && r.id !== currentId
  );
}

function mostraErroreNomeInput() {
  const input = document.getElementById("nome-ricetta");
  const error = document.getElementById("nome-ricetta-error");

  input.classList.add("error");
  error.textContent = "Nome ricetta già esistente.";
  error.style.display = "block";
}

function salvaNome(id, nuovoNome) {
  const ricette = JSON.parse(localStorage.getItem("ricette")) || [];

  const ricetta = ricette.find(r => r.id === id);
  if (!ricetta) return;

  ricetta.nome = nuovoNome;
  localStorage.setItem("ricette", JSON.stringify(ricette));
}

function placeCaretAtEnd(el) {
  const range = document.createRange();
  range.selectNodeContents(el);
  range.collapse(false);

  const sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
}

function enableAutoScrollOnEdit(el) {
  el.addEventListener("keyup", () => autoScrollCursor(el));
  el.addEventListener("click", () => autoScrollCursor(el));
}

function autoScrollCursor(el) {
  const selection = window.getSelection();
  if (!selection.rangeCount) return;

  const range = selection.getRangeAt(0).cloneRange();
  const rect = range.getBoundingClientRect();
  const elRect = el.getBoundingClientRect();

  const padding = 12;

  if (rect.right > elRect.right - padding) {
    el.scrollLeft += rect.right - elRect.right + padding;
  } else if (rect.left < elRect.left + padding) {
    el.scrollLeft -= elRect.left + padding - rect.left;
  }
}


function caricaRicettaDaPagina(id) {
  vaiAPagina("home", "Calcolatore per Ricette");
  
  document.querySelectorAll(".riga").forEach(r => r.remove());

  const ricette = JSON.parse(localStorage.getItem("ricette")) || [];
  const ricetta = ricette.find(r => r.id === id);

  if (!ricetta) {
    alert("Ricetta non trovata");
    return;
  }
  
  setTimeout(() => {
    document.querySelectorAll(".riga").forEach(r => r.remove());

    impostaNomeRicettaCalcolatore(ricetta.nome);

    // =============================
    // CARICA PORZIONI "SAREBBE"
    // =============================
    const inputSarebbe = document.querySelector(".input-sarebbe-num");
    const selectSarebbe = document.querySelector(".select-sarebbe-tipo");
    const selectVorrei  = document.querySelector(".select-vorrei-tipo");
    const inputVorrei = document.querySelector(".input-vorrei-num");

    if (inputSarebbe && selectSarebbe) {
      inputSarebbe.value = ricetta.porzioni ?? 1;
      selectSarebbe.value = ricetta.tipoPorzioni ?? "porzioni";

      // il destro segue il sinistro (lock)
      if (selectVorrei) {
        selectVorrei.value = selectSarebbe.value;
      }
      
      // RESET "VORREI"
      if (inputVorrei) {
        inputVorrei.value = "";
        inputVorrei.classList.remove("auto-changed"); // se usi il bordo giallo
      }
    }

    // =============================
    // INGREDIENTI
    // =============================
    ricetta.ingredienti.forEach(ing => {
      aggiungiRiga(ing.nome, ing.originale, ing.unita, "");
    });

    window.scrollTo({ top: 0, behavior: "instant" });
  }, 0);
}

function impostaNomeRicettaCalcolatore(nome) {
  const el = document.getElementById("nomeRicetta");
  if (!el) return;
  el.value = nome;
}


function abilitaSwipe(wrapper, card) {
  let startX = 0;
  let startY = 0;
  let swiping = false;
  let hasMoved = false;
  let canSwipe = false; // 🔑 permetti swipe solo dalla zona giusta
  
  const RIGHT_ZONE_RATIO = 0.5;
  const maxSwipe = card.offsetWidth * 0.4;
  const deleteThreshold = maxSwipe * 0.6;
  const MOVE_THRESHOLD = 10;

  wrapper.addEventListener("pointerdown", e => {
    // ❌ niente swipe sui preferiti
    if (wrapper.dataset.preferita === "1") return;
    
    // ❌ elementi interattivi
    if (
      e.target.closest(".drag-handle") ||
      e.target.closest(".ricetta-star") ||
      e.target.closest(".btn-carica") ||
      e.target.closest(".edit-nome") ||
      e.target.closest(".ricetta-nome")
    ) return;

    const rect = card.getBoundingClientRect();
    const startOffsetX = e.clientX - rect.left;
    
    // 🔑 determina se POTREBBE essere uno swipe
    canSwipe = startOffsetX >= rect.width * (1 - RIGHT_ZONE_RATIO);

    startX = e.clientX;
    startY = e.clientY;
    hasMoved = false;
    
    // NON attiviamo swiping qui, aspettiamo il movimento
  });

  wrapper.addEventListener("pointermove", e => {
    // se non può fare swipe, esci subito
    if (!canSwipe) return;
    
    const deltaX = e.clientX - startX;
    const deltaY = Math.abs(e.clientY - startY);

    // se movimento verticale eccessivo, annulla
    if (deltaY > Math.abs(deltaX) * 1.2) {
      canSwipe = false;
      swiping = false;
      card.style.transform = "translateX(0)";
      return;
    }

    // 🔑 attiva swiping SOLO se movimento orizzontale significativo VERSO SINISTRA
    if (!swiping && deltaX < -MOVE_THRESHOLD) {
      swiping = true;
      hasMoved = true;
      card.style.transition = "none";
      wrapper.setPointerCapture(e.pointerId);
      
      // 🔑 BLOCCA il click event che arriverebbe
      e.preventDefault();
      e.stopPropagation();
    }

    if (swiping && deltaX < 0) {
      card.style.transform = `translateX(${Math.max(deltaX, -maxSwipe)}px)`;
    }
  });

  wrapper.addEventListener("pointerup", e => {
    if (!swiping) {
      // 🔑 reset flags
      canSwipe = false;
      hasMoved = false;
      return; // lascia passare il click normalmente
    }

    swiping = false;
    canSwipe = false;
    hasMoved = false;
    card.style.transition = "transform 0.2s ease";

    const translate = parseFloat(card.style.transform.replace("translateX(", "")) || 0;

    if (Math.abs(translate) > deleteThreshold) {
      if (confirm("Eliminare questa ricetta?")) {
        eliminaRicetta(Number(wrapper.dataset.id));
        return;
      }
    }

    card.style.transform = "translateX(0)";
  });

  wrapper.addEventListener("pointercancel", () => {
    swiping = false;
    canSwipe = false;
    hasMoved = false;
    card.style.transform = "translateX(0)";
  });
}

function eliminaRicetta(id) {
  let ricette = JSON.parse(localStorage.getItem("ricette")) || [];
  ricette = ricette.filter(r => r.id !== id);
  localStorage.setItem("ricette", JSON.stringify(ricette));
  mostraRicetteSalvate();
}


function togglePreferito(id) {
  const ricette = JSON.parse(localStorage.getItem("ricette")) || [];

  const ricetta = ricette.find(r => r.id === id);
  if (!ricetta) return;

  ricetta.preferita = !ricetta.preferita;

  localStorage.setItem("ricette", JSON.stringify(ricette));
  mostraRicetteSalvate();
}


function abilitaDrag(wrapper) {
  const handle = wrapper.querySelector(".drag-handle");
  if (!handle) return;

  const CARD_GAP = 10;

  let dragging = false;
  let ghost = null;
  let placeholder = null;

  let startY = 0;
  let offsetY = 0;

  const container = wrapper.parentNode;

  let minY = 0;
  let maxY = 0;

  handle.addEventListener("pointerdown", e => {
    e.preventDefault();
    e.stopPropagation();

    dragging = true;
    handle.setPointerCapture(e.pointerId);

    const rect = wrapper.getBoundingClientRect();

    const header = document.querySelector(".topbar");
    const headerBottom = header
      ? header.getBoundingClientRect().bottom
      : 0;

    minY = headerBottom + CARD_GAP;
    maxY = window.innerHeight - rect.height - CARD_GAP;

    startY = e.clientY;
    offsetY = startY - rect.top;

    // 🔹 placeholder al posto ESATTO
    placeholder = document.createElement("div");
    placeholder.className = "ricetta-placeholder";
    placeholder.style.height = rect.height + "px";

    container.insertBefore(placeholder, wrapper);

    // 🔹 wrapper diventa ghost
    ghost = wrapper;
    ghost.classList.add("ricetta-ghost");
    ghost.style.top = rect.top + "px";
    ghost.style.left = rect.left + "px";
    ghost.style.width = rect.width + "px";

    wrapper.remove();
    document.body.appendChild(ghost);

    const scrollbarWidth = getScrollbarWidth();
    document.body.style.paddingRight = scrollbarWidth + "px";
    document.body.classList.add("dragging");
    wrapper.classList.add("dragging");
  });

  document.addEventListener("pointermove", e => {
    if (!dragging) return;

    const header = document.querySelector(".topbar");
    const headerBottom = header
      ? header.getBoundingClientRect().bottom
      : 0;

    minY = headerBottom + CARD_GAP;
    maxY = window.innerHeight - ghost.offsetHeight - CARD_GAP;

    let y = e.clientY - offsetY;

    // 🔒 clamp aggiornato
    y = Math.max(minY, y);
    y = Math.min(maxY, y);

    ghost.style.top = y + "px";

    autoScroll(e.clientY);

    const ghostRect = ghost.getBoundingClientRect();
    const draggingIsFav = wrapper.dataset.preferita === "1";

    const prev = placeholder.previousElementSibling;
    const next = placeholder.nextElementSibling;

    if (prev && prev.dataset.preferita === (draggingIsFav ? "1" : "0")) {
      const prevRect = prev.getBoundingClientRect();
      if (ghostRect.top < prevRect.top + prevRect.height / 2) {
        container.insertBefore(placeholder, prev);
      }
    }

    if (next && next.dataset.preferita === (draggingIsFav ? "1" : "0")) {
      const nextRect = next.getBoundingClientRect();
      if (ghostRect.bottom > nextRect.top + nextRect.height / 2) {
        container.insertBefore(placeholder, next.nextSibling);
      }
    }
  });

  document.addEventListener("pointerup", () => {
    if (!dragging) return;
    dragging = false;

    wrapper.classList.remove("dragging");
    document.body.classList.remove("dragging");
    document.body.style.paddingRight = "";

    container.insertBefore(wrapper, placeholder);

    ghost.classList.remove("ricetta-ghost");
    ghost.style.top = "";
    ghost.style.left = "";
    ghost.style.width = "";

    placeholder.remove();

    salvaOrdineDaDOM();
  });
}

function salvaOrdineDaDOM() {
  const wrappers = document.querySelectorAll(".ricetta-swipe");
  const ricette = JSON.parse(localStorage.getItem("ricette")) || [];

  const nuovaLista = [];

  wrappers.forEach(w => {
    const id = Number(w.dataset.id);
    const ricetta = ricette.find(r => r.id === id);
    if (ricetta) nuovaLista.push(ricetta);
  });

  localStorage.setItem("ricette", JSON.stringify(nuovaLista));
}

function autoScroll(touchY) {
  const edge = 80;
  const maxSpeed = 10;

  const topEdge = edge;
  const bottomEdge = window.innerHeight - edge;

  if (touchY < topEdge) {
    const intensity = 1 - touchY / topEdge;
    window.scrollBy(0, -maxSpeed * intensity);
  } 
  else if (touchY > bottomEdge) {
    const intensity = (touchY - bottomEdge) / edge;
    window.scrollBy(0, maxSpeed * intensity);
  }
}

function getScrollbarWidth() {
  return window.innerWidth - document.documentElement.clientWidth;
}


let ricettaCorrenteId = null;

function apriPopupRicetta(id) {
  const ricette = JSON.parse(localStorage.getItem("ricette")) || [];
  const ricetta = ricette.find(r => r.id === id);
  if (!ricetta) return;

  ricettaCorrenteId = id;

  const overlay = document.getElementById("popup-overlay");
  overlay.classList.remove("hidden");
  document.body.classList.add("no-scroll");

  // ===== HEADER =====
  overlay.querySelector(".popup-title").textContent = ricetta.nome;

  const porzioniInput = overlay.querySelector(".input-porzioni");
  porzioniInput.value = ricetta.porzioni ?? 1;
  
  overlay.querySelector(".select-porzioni-tipo").value =
  ricetta.tipoPorzioni ?? "porzioni";

  // ===== LINK =====
  overlay.querySelector(".popup-link").value = ricetta.link ?? "";

  // ===== NOTE =====
  overlay.querySelector(".popup-note").value = ricetta.note ?? "";

  // ===== INGREDIENTI =====
  const contenitore = overlay.querySelector(".popup-ingredienti");
  contenitore.innerHTML = "";

  ricetta.ingredienti.forEach(ing => {
    contenitore.appendChild(creaRigaIngredientePopup(ing));
  });

  // ===== AGGIUNGI INGREDIENTE =====
  overlay.querySelector(".popup-add").onclick = () => {
    contenitore.appendChild(creaRigaIngredientePopup());
  };

  // ===== ANNULLA =====
  overlay.querySelector(".popup-annulla").onclick = () => {
    chiudiPopupRicetta();
  };

  // ===== SALVA =====
  overlay.querySelector(".popup-salva").onclick = () => {
    const ok = salvaPopupRicetta();
    if (ok) {
      chiudiPopupRicetta();
    }
  };
}

function creaRigaIngredientePopup(ing = {}) {
  const riga = document.createElement("div");
  riga.className = "popup-riga";

  riga.innerHTML = `
    <button class="remove">−</button>

    <!-- COLONNA NOME -->
    <div class="popup-col popup-col-nome">
      <input class="popup-nome"
             placeholder="Ingrediente"
             value="${ing.nome ?? ""}">
      <div class="popup-errore popup-errore-nome"></div>
    </div>

    <!-- COLONNA QUANTITÀ -->
    <div class="popup-col popup-col-qta">
      <div class="popup-campo-unita">
        <input type="text"
               class="popup-quantita"
               inputmode="decimal"
               pattern="[0-9.,]*"
               placeholder="Quantità"
               value="${ing.originale ?? ""}">
        <select class="popup-unita">
          <option value="g">g</option>
          <option value="kg">kg</option>
          <option value="ml">ml</option>
          <option value="l">l</option>
          <option value="pz">pz.</option>
          <option value="qb">q.b.</option>
        </select>
      </div>
      <div class="popup-errore popup-errore-qta"></div>
    </div>
  `;

  riga.querySelector(".remove").onclick = () => riga.remove();

  const select = riga.querySelector(".popup-unita");
  if (ing.unita) select.value = ing.unita;

  select.addEventListener("change", () => {
    aggiornaStatoQBPopup(riga);
  });

  aggiornaStatoQBPopup(riga);
  
  // ===== RIMOZIONE ERRORI ON INPUT =====
  const nomeInput = riga.querySelector(".popup-nome");
  const qtaInput  = riga.querySelector(".popup-quantita");
  const erroreNomeEl = riga.querySelector(".popup-errore-nome");
  const erroreQtaEl  = riga.querySelector(".popup-errore-qta");

  // nome ingrediente
  nomeInput.addEventListener("input", () => {
    nomeInput.classList.remove("input-errore");
    erroreNomeEl.textContent = "";
  });

  // quantità
  qtaInput.addEventListener("input", () => {
    qtaInput.classList.remove("input-errore");
    erroreQtaEl.textContent = "";
  });

  return riga;
}

function salvaPopupRicetta() {
  if (!ricettaCorrenteId) return false;

  const ricette = JSON.parse(localStorage.getItem("ricette")) || [];
  const ricetta = ricette.find(r => r.id === ricettaCorrenteId);
  if (!ricetta) return false;

  const overlay = document.getElementById("popup-overlay");

  // ===== PORZIONI =====
  const porzioniVal = Number(
    overlay.querySelector(".input-porzioni").value
  );
  ricetta.porzioni = porzioniVal > 0 ? porzioniVal : 1;
  ricetta.tipoPorzioni =
  overlay.querySelector(".select-porzioni-tipo").value;

  // ===== LINK =====
  ricetta.link = overlay.querySelector(".popup-link").value.trim();

  // ===== NOTE =====
  ricetta.note = overlay.querySelector(".popup-note").value.trim();

  // ===== INGREDIENTI =====
  const righe = overlay.querySelectorAll(".popup-riga");
  const nuoviIngredienti = [];

  let errore = false;
  
  righe.forEach(riga => {
    const nomeInput = riga.querySelector(".popup-nome");
    const inputQta = riga.querySelector(".popup-quantita");
    const selectUnita = riga.querySelector(".popup-unita");
    const erroreNomeEl = riga.querySelector(".popup-errore-nome");
    const erroreQtaEl = riga.querySelector(".popup-errore-qta");


    const nome = nomeInput.value.trim();
    const unita = selectUnita.value;
    const valore = inputQta.value.trim();

    // reset errori
    erroreNomeEl.textContent = "";
    erroreQtaEl.textContent = "";
    nomeInput.classList.remove("input-errore");
    inputQta.classList.remove("input-errore");

    // ❌ nome mancante ma altri campi compilati
    if (!nome && (valore || unita !== "g")) {
      nomeInput.classList.add("input-errore");
      erroreNomeEl.textContent = "Ingrediente non valido!";
      errore = true;
      return;
    }

    // riga completamente vuota → ignorala
    if (!nome && !valore) return;

    // q.b.
    if (unita === "qb") {
      nuoviIngredienti.push({
        nome,
        originale: null,
        unita: "qb"
      });
      return;
    }

    const num = leggiNumeroPopup(valore);
    if (isNaN(num)) {
      inputQta.classList.add("input-errore");
      erroreQtaEl.textContent = "Quantità non valida!";
      errore = true;
      return;
    }

    nuoviIngredienti.push({
      nome,
      originale: num,
      unita
    });
  });

  if (errore) return;

  ricetta.ingredienti = nuoviIngredienti;


  // ❌ errore: non chiudere popup
  if (errore || nuoviIngredienti.length === 0) {
    return false;
  }

  // salva ingredienti
  ricetta.ingredienti = nuoviIngredienti;

  localStorage.setItem("ricette", JSON.stringify(ricette));
  mostraRicetteSalvate();

  return true;
}

function aggiornaStatoQBPopup(riga) {
  const select = riga.querySelector(".popup-unita");
  const input = riga.querySelector(".popup-quantita");

  if (select.value === "qb") {
    input.value = "";
    input.placeholder = "q.b.";
    input.disabled = true;
    input.classList.remove("input-errore");
  } else {
    input.disabled = false;
    input.placeholder = "Quantità";
  }
}

function leggiNumeroPopup(valore) {
  if (valore === "") return NaN;

  const normalizzato = valore.replace(",", ".");
  if (normalizzato.endsWith(".")) return NaN;

  return parseFloat(normalizzato);
}

function chiudiPopupRicetta() {
  document.getElementById("popup-overlay").classList.add("hidden");
  document.body.classList.remove("no-scroll");
  ricettaCorrenteId = null;
}



/* =========================
   BLOCCO CARATTERE "-"
   ========================= */
document.addEventListener("input", e => {
  if (
    e.target.classList.contains("originale") ||
    e.target.classList.contains("disponibile") ||
    e.target.classList.contains("popup-quantita")
  ) {
    e.target.value = e.target.value.replace(/[^0-9.,]/g, "");
  }
});


function apriMenu() {
  document.querySelector(".menu").style.left = "0";
  document.querySelector(".overlay").style.display = "block";
  document.body.classList.add("no-scroll");
}

function chiudiMenu() {
  document.querySelector(".menu").style.left = "-260px";
  document.querySelector(".overlay").style.display = "none";
  document.body.classList.remove("no-scroll");
}

function vaiAPagina(idPagina, titolo) {
  document.querySelectorAll(".pagina").forEach(p => {
    p.classList.remove("attiva");
  });

  document.getElementById(idPagina).classList.add("attiva");

  document.getElementById("titoloPagina").textContent = titolo;

  chiudiMenu();
  
  // 🔽 FIX SCROLL
  window.scrollTo({ top: 0, behavior: "instant" });
  
  if (idPagina === "ricette") {
    mostraRicetteSalvate();
  }
}


document.addEventListener("input", e => {
  if (e.target.id === "ricette-search-input") {
    mostraRicetteSalvate();
  }
});





// FUORI CODICE ==================================================

if ("serviceWorker" in navigator) {
  const CURRENT_VERSION = "ricette-v3.5"; // Deve corrispondere alla versione nel service-worker.js
  const lastReloadVersion = localStorage.getItem("lastReloadVersion");
  
  // Se abbiamo già ricaricato per questa versione, non farlo più
  if (lastReloadVersion === CURRENT_VERSION) {
    console.log('[App] Already reloaded for this version, skipping refresh logic');
    
    // Registra il SW normalmente senza logica di reload
    navigator.serviceWorker.register("service-worker.js").then(registration => {
      console.log('[App] SW registered (no refresh mode)');
    });
    
  } else {
    // Prima volta con questa versione, abilita la logica di reload
    console.log('[App] New version detected, enabling refresh logic');
    
    let hasReloaded = false;
    
    navigator.serviceWorker.getRegistrations().then(registrations => {
      registrations.forEach(registration => {
        registration.unregister();
      });
    }).then(() => {
      return navigator.serviceWorker.register("service-worker.js");
    }).then(registration => {
      console.log('[App] SW registered');
      registration.update();
      
      registration.addEventListener("updatefound", () => {
        const newWorker = registration.installing;
        console.log('[App] New SW found');
        
        newWorker.addEventListener("statechange", () => {
          console.log('[App] SW state:', newWorker.state);
          if (newWorker.state === "activated" && navigator.serviceWorker.controller && !hasReloaded) {
            hasReloaded = true;
            localStorage.setItem("lastReloadVersion", CURRENT_VERSION);
            console.log('[App] Reloading for version:', CURRENT_VERSION);
            window.location.reload();
          }
        });
      });
    });

    navigator.serviceWorker.addEventListener("message", event => {
      console.log('[App] Message from SW:', event.data);
      if (event.data.type === "SW_UPDATED" && !hasReloaded) {
        hasReloaded = true;
        localStorage.setItem("lastReloadVersion", CURRENT_VERSION);
        console.log('[App] Reloading for version:', event.data.version);
        setTimeout(() => {
          window.location.reload();
        }, 100);
      }
    });

    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (!hasReloaded) {
        hasReloaded = true;
        localStorage.setItem("lastReloadVersion", CURRENT_VERSION);
        console.log('[App] Controller changed, reloading once');
        setTimeout(() => {
          window.location.reload();
        }, 100);
      }
    });
  }
}






