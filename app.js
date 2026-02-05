// ======================================================
// 1. COSTANTI E CONFIGURAZIONE
// ======================================================

// Unità di misura supportate con fattori di conversione 
const UNITA = {
  g:   { tipo: "peso",   base: "g",  fattore: 1 },
  kg:  { tipo: "peso",   base: "g",  fattore: 1000 },
  ml:  { tipo: "volume", base: "ml", fattore: 1 },
  l:   { tipo: "volume", base: "ml", fattore: 1000 },
  pz:  { tipo: "pezzi",  base: "pz", fattore: 1 },
  qb:  { tipo: "qb",     base: "qb", fattore: 1 }
};

// Numero di decimali per ogni unità di misura
const DECIMALI_UNITA = {
  g: 0,
  ml: 0,
  kg: 2,
  l: 2,
  pz: 1,
  qb: null
};

// Limiti per le porzioni
const LIMITI_PORZIONI = {
  MIN: 1,
  MAX: 99
};

// Configurazione gesture swipe
const CONFIG_SWIPE = {
  ZONA_DESTRA_RATIO: 0.5, // Zona da cui iniziare lo swipe (50% a destra)
  MAX_SWIPE_RATIO: 0.4, // Massimo swipe possibile (40% della larghezza)
  SOGLIA_ELIMINAZIONE: 0.6, // Soglia per eliminazione (60% del max swipe)
  SOGLIA_MOVIMENTO: 10, // Pixel minimi per attivare lo swipe
  SOGLIA_VERTICALE_RATIO: 1.2 // Tolleranza movimento verticale vs orizzontale
};

// Configurazione drag & drop
const CONFIG_DRAG = {
  GAP_CARD: 10, // Gap tra le card durante il drag
  ZONA_AUTO_SCROLL: 80, // Pixel dal bordo per auto-scroll
  VELOCITA_SCROLL_MAX: 10 // Velocità massima auto-scroll
};

// Timing e animazioni
const TIMING = {
  DURATA_BANNER: 3000, // Durata notifica banner (ms)
  ANIMAZIONE_FADE: 600, // Durata fade-out banner (ms)
  ANIMAZIONE_PULSE: 600, // Durata pulse su input modificato (ms)
  RITARDO_EDIT_EXIT: 100, // Ritardo dopo uscita da editing (ms)
  PADDING_SCROLL_CURSOR: 12 // Padding per auto-scroll del cursore
};

// Dimensioni UI
const UI = {
  LARGHEZZA_MENU: "-260px"      // Larghezza menu laterale
};

//Chiavi localStorage
const STORAGE_KEYS = {
  RICETTE: "ricette"
};

// Messaggi di errore
const MESSAGGI_ERRORE = {
  NUMERO_NON_VALIDO: "Inserire numero valido!",
  INGREDIENTE_NON_VALIDO: "Inserire ingrediente valido!",
  NOME_RICETTA_VUOTO: "Inserire nome ricetta.",
  NOME_RICETTA_DUPLICATO: "Nome ricetta già esistente.",
  UNITA_INCONGRUENTI: "Unità incongruenti!",
  QUANTITA_NON_VALIDA: "Quantità non valida!",
  NESSUNA_QUANTITA: "Nessuna quantità da ricalcolare!",
  NESSUN_INGREDIENTE: "Nessun ingrediente valido",
  INGREDIENTI_INSUFFICIENTI: "Non hai abbastanza ingredienti per fare questa ricetta :(",
  RICETTA_NON_TROVATA: "Ricetta non trovata"
};

// Messaggi di conferma
const MESSAGGI_CONFERMA = {
  RESET_QUANTITA: "Svuotare le caselle con le quantità possedute?",
  ELIMINA_RICETTA: "Eliminare questa ricetta?"
};

// Messaggi di successo
const MESSAGGI_SUCCESSO = {
  RICETTA_SALVATA: "Ricetta salvata ✔️"
};


// ======================================================
// 2. UTILITY - Parsing e Conversioni
// ======================================================

/**
 * Converte una stringa in numero, gestendo virgole e punti
 * @param {string} valore - Stringa da convertire
 * @returns {number} - Numero convertito o NaN
 */
function leggiNumero(valore) {
  if (valore === "") return NaN;
  const normalizzato = valore.replace(",", ".");
  if (normalizzato.endsWith(".")) return NaN;
  return parseFloat(normalizzato);
}

/**
 * Converte un valore nell'unità base
 * @param {number} valore - Valore da convertire
 * @param {string} unita - Unità di partenza
 * @returns {number|null} - Valore in unità base o null se qb
 */
function toBase(valore, unita) {
  const info = UNITA[unita];
  if (!info || info.base === "qb") return null;
  return valore * info.fattore;
}

/**
 * Converte un valore dall'unità base all'unità desiderata
 * @param {number} valoreBase - Valore in unità base
 * @param {string} unita - Unità di destinazione
 * @returns {number|null} - Valore convertito o null se qb
 */
function fromBase(valoreBase, unita) {
  const info = UNITA[unita];
  if (!info || info.base === "qb") return null;
  return valoreBase / info.fattore;
}

/**
 * Normalizza un valore in base all'unità più appropriata
 * @param {number} valoreBase - Valore in unità base
 * @param {string} tipo - Tipo di misura (peso, volume, pezzi)
 * @returns {Object} - {valore, unita}
 */
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

/**
 * Formatta un valore con il numero di decimali appropriato
 * @param {number} valore - Valore da formattare
 * @param {string} unita - Unità di misura
 * @returns {string|number} - Valore formattato
 */
function formattaValore(valore, unita) {
  const decimali = DECIMALI_UNITA[unita];
  if (decimali === null || decimali === undefined) return "";
  return Number(valore.toFixed(decimali));
}


// ======================================================
// 3. UTILITY - DOM e Scroll
// ======================================================

/**
 * Calcola la larghezza della scrollbar
 * @returns {number} - Larghezza in pixel
 */
function getScrollbarWidth() {
  return window.innerWidth - document.documentElement.clientWidth;
}

/**
 * Posiziona il cursore alla fine di un elemento contentEditable
 * @param {HTMLElement} el - Elemento da manipolare
 */
function placeCaretAtEnd(el) {
  const range = document.createRange();
  range.selectNodeContents(el);
  range.collapse(false);
  const sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
}

/**
 * Auto-scroll per mantenere il cursore visibile durante la digitazione
 * @param {HTMLElement} el - Elemento contentEditable
 */
function autoScrollCursor(el) {
  const selection = window.getSelection();
  if (!selection.rangeCount) return;

  const range = selection.getRangeAt(0).cloneRange();
  const rect = range.getBoundingClientRect();
  const elRect = el.getBoundingClientRect();
  const padding = TIMING.PADDING_SCROLL_CURSOR;

  if (rect.right > elRect.right - padding) {
    el.scrollLeft += rect.right - elRect.right + padding;
  } else if (rect.left < elRect.left + padding) {
    el.scrollLeft -= elRect.left + padding - rect.left;
  }
}

/**
 * Abilita l'auto-scroll su un elemento durante l'editing
 * @param {HTMLElement} el - Elemento contentEditable
 */
function enableAutoScrollOnEdit(el) {
  el.addEventListener("keyup", () => autoScrollCursor(el));
  el.addEventListener("click", () => autoScrollCursor(el));
}

/**
 * Esegue una callback preservando la posizione di scroll
 * @param {Function} callback - Funzione da eseguire
 */
function preservaScroll(callback) {
  const scrollY = window.scrollY;
  callback();
  requestAnimationFrame(() => {
    window.scrollTo({ top: scrollY, behavior: "auto" });
  });
}


// ======================================================
// 4. GESTIONE ERRORI UI
// ======================================================

/**
 * Mostra un errore numerico su un input
 * @param {HTMLElement} input - Input da marcare come errato
 */
function mostraErroreNumero(input) {
  input.classList.add("input-errore");
  let msg = input.parentElement.querySelector(".messaggio-errore");
  if (!msg) {
    msg = document.createElement("div");
    msg.className = "messaggio-errore";
    msg.textContent = MESSAGGI_ERRORE.NUMERO_NON_VALIDO;
    input.parentElement.appendChild(msg);
  }
  msg.style.display = "block";
}

/**
 * Nasconde l'errore numerico su un input
 * @param {HTMLElement} input - Input da cui rimuovere l'errore
 */
function nascondiErroreNumero(input) {
  input.classList.remove("input-errore");
  const msg = input.parentElement.querySelector(".messaggio-errore");
  if (msg) msg.style.display = "none";
}

/**
 * Mostra un errore su un selettore di unità
 * @param {HTMLElement} select - Select da marcare come errato
 */
function mostraErroreUnita(select) {
  select.classList.add("select-errore");
  const campo = select.closest(".campo-unita");
  let msg = campo.querySelector(".errore-unita");
  if (!msg) {
    msg = document.createElement("div");
    msg.className = "errore-unita";
    msg.textContent = MESSAGGI_ERRORE.UNITA_INCONGRUENTI;
    campo.appendChild(msg);
  }
  msg.style.display = "block";
}

/**
 * Rimuove l'errore unità da una riga
 * @param {HTMLElement} riga - Riga ingrediente
 */
function rimuoviErroreUnita(riga) {
  const selectHai = riga.querySelector(".unita-hai");
  selectHai.classList.remove("select-errore");
  const msg = riga.querySelector(".errore-unita");
  if (msg) msg.style.display = "none";
}

/**
 * Mostra un errore sul nome ingrediente
 * @param {HTMLElement} input - Input del nome
 */
function mostraErroreNomeIngrediente(input) {
  input.classList.add("input-errore");
  let errore = input.parentElement.querySelector(".errore-nome");
  if (!errore) {
    errore = document.createElement("div");
    errore.className = "errore errore-nome";
    errore.textContent = MESSAGGI_ERRORE.INGREDIENTE_NON_VALIDO;
    input.parentElement.appendChild(errore);
  }
}

/**
 * Reset di tutti gli errori di una riga
 * @param {HTMLElement} riga - Riga ingrediente
 */
function resetErroriRiga(riga) {
  const nomeInput = riga.querySelector(".nome");
  if (nomeInput) {
    nomeInput.classList.remove("input-errore");
    const errNome = nomeInput.parentElement.querySelector(".errore-nome");
    if (errNome) errNome.remove();
    const errMsg = nomeInput.parentElement.querySelector(".messaggio-errore");
    if (errMsg) errMsg.remove();
  }

  const originaleInput = riga.querySelector(".originale");
  if (originaleInput) {
    originaleInput.classList.remove("input-errore");
    const errMsg = originaleInput.parentElement.querySelector(".messaggio-errore");
    if (errMsg) errMsg.remove();
  }

  rimuoviErroreUnita(riga);
}

/**
 * Rimuove l'errore quando l'utente inizia a digitare
 * @param {HTMLElement} input - Input da monitorare
 */
function rimuoviErroreOnInput(input) {
  if (!input) return;
  input.addEventListener("input", () => {
    nascondiErroreNumero(input);
  });
}


// ======================================================
// 5. NOTIFICHE BANNER
// ======================================================

let bannerTimeout = null;

/**
 * Mostra una notifica banner
 * @param {string} messaggio - Testo da mostrare
 * @param {number} durata - Durata in millisecondi
 */
function mostraBanner(messaggio, durata = TIMING.DURATA_BANNER) {
  const banner = document.getElementById("banner-notifica");
  const testo = document.getElementById("banner-testo");
  const btnChiudi = banner.querySelector(".chiudi-banner");

  testo.textContent = messaggio;
  banner.classList.remove("nascosto", "fade-out");

  if (bannerTimeout) clearTimeout(bannerTimeout);
  bannerTimeout = setTimeout(nascondi, durata);

  function nascondi() {
    banner.classList.add("fade-out");
    setTimeout(() => {
      banner.classList.add("nascosto");
      banner.classList.remove("sad");
    }, TIMING.ANIMAZIONE_FADE);
  }

  btnChiudi.onclick = () => {
    if (bannerTimeout) clearTimeout(bannerTimeout);
    nascondi();
  };
}


// ======================================================
// 6. GESTIONE STATO QB (Quanto Basta)
// ======================================================

/**
 * Aggiorna lo stato degli input quando l'unità è "q.b."
 * @param {HTMLElement} riga - Riga ingrediente
 */
function aggiornaStatoInputQB(riga) {
  const selectQuantita = riga.querySelector(".unita");
  const inputQuantita = riga.querySelector(".originale");
  const selectHai = riga.querySelector(".unita-hai");
  const inputHai = riga.querySelector(".disponibile");

  if (selectQuantita.value === "qb") {
    inputQuantita.value = "";
    inputQuantita.placeholder = "q.b.";
    inputQuantita.disabled = true;
    nascondiErroreNumero(inputQuantita);

    selectHai.value = "qb";
    selectHai.disabled = true;
    inputHai.value = "";
    inputHai.placeholder = "q.b.";
    inputHai.disabled = true;
    nascondiErroreNumero(inputHai);
  } else {
    inputQuantita.disabled = false;
    inputQuantita.placeholder = "Quantità";
    inputHai.disabled = false;
    inputHai.placeholder = "Tu hai";
    selectHai.disabled = false;
  }
}

/**
 * Aggiorna lo stato QB nel popup
 * @param {HTMLElement} riga - Riga popup
 */
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


// ======================================================
// 7. COMPONENTI - Righe Ingredienti
// ======================================================

/**
 * Aggiunge una nuova riga ingrediente al calcolatore
 * @param {string} nome - Nome ingrediente
 * @param {string} originale - Quantità originale
 * @param {string} unita - Unità di misura
 * @param {string} hai - Quantità disponibile
 * @param {string} unitaHai - Unità quantità disponibile
 */
function aggiungiRiga(nome = "", originale = "", unita = "g", hai = "", unitaHai = "g") {
  const contenitore = document.getElementById("ingredienti");
  const riga = document.createElement("div");
  riga.className = "riga";

  riga.innerHTML = `
    <button class="remove" onclick="this.parentElement.remove()">−</button>
    <input class="nome" placeholder="Ingrediente" value="${nome}">
    <div class="campo-unita quantita">
      <input class="originale" type="text" inputmode="decimal" pattern="[0-9.,]*" 
             placeholder="Quantità" value="${originale != null ? originale : ""}">
      <select class="unita">
        <option value="g">g</option>
        <option value="kg">kg</option>
        <option value="ml">ml</option>
        <option value="l">l</option>
        <option value="pz">pz.</option>
        <option value="qb">q.b.</option>
      </select>
    </div>
    <div class="campo-unita tu-hai">
      <input class="disponibile" type="text" inputmode="decimal" pattern="[0-9.,]*" 
             placeholder="Tu hai" value="${hai != null ? hai : ""}">
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

  // Reset errore nome ingrediente on input
  const nomeInput = riga.querySelector(".nome");
  nomeInput.addEventListener("input", () => {
    nomeInput.classList.remove("input-errore");
    const errore = nomeInput.parentElement.querySelector(".errore-nome");
    if (errore) errore.remove();
  });

  // Imposta unità salvate
  const selectOrig = riga.querySelector(".unita");
  const selectHai = riga.querySelector(".unita-hai");
  selectOrig.value = unita;
  selectHai.value = unitaHai || unita;

  selectOrig.addEventListener("change", () => {
    rimuoviErroreUnita(riga);
    aggiornaStatoInputQB(riga);
  });

  selectHai.addEventListener("change", () => {
    rimuoviErroreUnita(riga);
  });

  aggiornaStatoInputQB(riga);
}

/**
 * Crea una riga ingrediente per il popup
 * @param {Object} ing - Oggetto ingrediente {nome, originale, unita}
 * @returns {HTMLElement} - Elemento riga creato
 */
function creaRigaIngredientePopup(ing = {}) {
  const riga = document.createElement("div");
  riga.className = "popup-riga";

  riga.innerHTML = `
    <button class="remove">−</button>
    <div class="popup-col popup-col-nome">
      <input class="popup-nome" placeholder="Ingrediente" value="${ing.nome ?? ""}">
      <div class="popup-errore popup-errore-nome"></div>
    </div>
    <div class="popup-col popup-col-qta">
      <div class="popup-campo-unita">
        <input type="text" class="popup-quantita" inputmode="decimal" pattern="[0-9.,]*" 
               placeholder="Quantità" value="${ing.originale ?? ""}">
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

  select.addEventListener("change", () => aggiornaStatoQBPopup(riga));
  aggiornaStatoQBPopup(riga);

  // Rimozione errori on input
  const nomeInput = riga.querySelector(".popup-nome");
  const qtaInput = riga.querySelector(".popup-quantita");
  const erroreNomeEl = riga.querySelector(".popup-errore-nome");
  const erroreQtaEl = riga.querySelector(".popup-errore-qta");

  nomeInput.addEventListener("input", () => {
    nomeInput.classList.remove("input-errore");
    erroreNomeEl.textContent = "";
  });

  qtaInput.addEventListener("input", () => {
    qtaInput.classList.remove("input-errore");
    erroreQtaEl.textContent = "";
  });

  return riga;
}


// ======================================================
// 8. BUSINESS LOGIC - Calcoli
// ======================================================

/**
 * Legge i valori delle porzioni dal calcolatore
 * @returns {Object} - {sarebbe: {valore, tipo}, vorrei: {valore, tipo}}
 */
function leggiPorzioniCalcolatore() {
  return {
    sarebbe: {
      valore: Number(document.querySelector(".input-sarebbe-num").value) || LIMITI_PORZIONI.MIN,
      tipo: document.querySelector(".select-sarebbe-tipo").value
    },
    vorrei: {
      valore: document.querySelector(".input-vorrei-num").value === "" 
        ? null 
        : Number(document.querySelector(".input-vorrei-num").value),
      tipo: document.querySelector(".select-vorrei-tipo").value
    }
  };
}

// Calcola le nuove proporzioni degli ingredienti
function calcola() {
  const righe = document.querySelectorAll(".riga");
  const inputVorrei = document.querySelector(".input-vorrei-num");
  const valoreVorreiPrima = inputVorrei && inputVorrei.value !== ""
    ? Number(inputVorrei.value)
    : null;

  if (inputVorrei) {
    inputVorrei.classList.remove("auto-changed");
  }

  let rapporti = [];
  let erroreTrovato = false;

  // PRIMA PASSATA: Validazione + Calcolo rapporti
  righe.forEach(riga => {
    const originaleInput = riga.querySelector(".originale");
    const disponibileInput = riga.querySelector(".disponibile");
    const unitaOrig = riga.querySelector(".unita").value;
    const unitaHai = riga.querySelector(".unita-hai").value;

    rimuoviErroreOnInput(originaleInput);
    rimuoviErroreOnInput(disponibileInput);

    if (unitaOrig === "qb") return;

    const originale = leggiNumero(originaleInput.value);
    const disponibile = leggiNumero(disponibileInput.value);

    nascondiErroreNumero(originaleInput);
    nascondiErroreNumero(disponibileInput);

    if (isNaN(originale)) {
      mostraErroreNumero(originaleInput);
      erroreTrovato = true;
      return;
    }

    if (disponibileInput.value !== "" && isNaN(disponibile)) {
      mostraErroreNumero(disponibileInput);
      erroreTrovato = true;
      return;
    }

    if (isNaN(disponibile)) return;

    if (UNITA[unitaOrig].tipo !== UNITA[unitaHai].tipo) {
      mostraErroreUnita(riga.querySelector(".unita-hai"));
      erroreTrovato = true;
      return;
    }

    const baseOrig = toBase(originale, unitaOrig);
    const baseDisp = toBase(disponibile, unitaHai);

    rapporti.push(baseDisp / baseOrig);
  });

  if (erroreTrovato) return;

  // Fattore porzioni
  const porzioni = leggiPorzioniCalcolatore();
  let fattorePorzioni = null;

  if (porzioni.sarebbe.valore !== null && porzioni.vorrei.valore !== null) {
    fattorePorzioni = porzioni.vorrei.valore / porzioni.sarebbe.valore;
  }

  // Scelta fattore limitante
  let fattori = [];
  if (rapporti.length > 0) {
    fattori.push(Math.min(...rapporti));
  }
  if (fattorePorzioni !== null) {
    fattori.push(fattorePorzioni);
  }

  if (fattori.length === 0) {
    alert(MESSAGGI_ERRORE.NESSUNA_QUANTITA);
    return;
  }

  const fattore = Math.min(...fattori);

  // SECONDA PASSATA: Scrittura risultati
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
    const valoreFormattato = formattaValore(normalizzato.valore, normalizzato.unita);

    disponibileInput.value = valoreFormattato;
    if (normalizzato.unita) {
      selectHai.value = normalizzato.unita;
    }

    if (valoreFormattato <= 0) {
      almenoUnoZero = true;
    }
  });

  // Aggiorna porzioni "vorrei"
  if (porzioni.sarebbe.valore !== null && inputVorrei) {
    const risultatoPorzioni = porzioni.sarebbe.valore * fattore;
    const valoreCalcolato = Number(risultatoPorzioni.toFixed(1));

    inputVorrei.value = valoreCalcolato;

    if (valoreCalcolato <= 0) {
      almenoUnoZero = true;
    }

    if (valoreVorreiPrima !== null && valoreVorreiPrima !== valoreCalcolato) {
      inputVorrei.classList.add("auto-changed");

      if (!inputVorrei.dataset.pulsed) {
        inputVorrei.classList.add("pulse");
        inputVorrei.dataset.pulsed = "true";

        setTimeout(() => {
          inputVorrei.classList.remove("pulse");
        }, TIMING.ANIMAZIONE_PULSE);
      }
    }
  }

  if (almenoUnoZero) {
    const bannerNotifica = document.querySelector(".banner-notifica");
    bannerNotifica.classList.add("sad");
    mostraBanner(MESSAGGI_ERRORE.INGREDIENTI_INSUFFICIENTI);
  }
}

// Reset delle quantità disponibili
function resetQuantita() {
  const conferma = confirm(MESSAGGI_CONFERMA.RESET_QUANTITA);
  if (!conferma) return;

  const inputVorrei = document.querySelector(".input-vorrei-num");
  if (inputVorrei) inputVorrei.value = "";
  if (inputVorrei) {
    inputVorrei.classList.remove("auto-changed");
    inputVorrei.classList.remove("pulse");
    delete inputVorrei.dataset.pulsed;
  }

  document.querySelectorAll(".campo-unita.tu-hai").forEach(campo => {
    const input = campo.querySelector("input");
    const select = campo.querySelector("select");
    if (input) input.value = "";
    if (select && select.value !== "qb") {
      select.selectedIndex = 0;
    }
  });

  document.querySelectorAll(".riga").forEach(riga => {
    rimuoviErroreUnita(riga);
    riga.querySelectorAll("input").forEach(input => {
      nascondiErroreNumero(input);
    });
  });
}


// ======================================================
// 9. BUSINESS LOGIC - Salvataggio
// ======================================================

/**
 * Legge i dati della ricetta dall'interfaccia del calcolatore
 * @returns {Array|null} - Array di ingredienti o null se ci sono errori
 */
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

    nomeInput.classList.remove("input-errore");
    originaleInput.classList.remove("input-errore");

    // Riga completamente vuota
    if (!nome && !valoreRaw) {
      resetErroriRiga(riga);
      return;
    }

    // Quantità piena MA nome vuoto
    if (!nome && valoreRaw) {
      mostraErroreNomeIngrediente(nomeInput);
      erroreIngrediente = true;
      return;
    }

    // Nome pieno MA quantità vuota (e NON è q.b.)
    if (nome && !valoreRaw && unita !== "qb") {
      mostraErroreNumero(originaleInput);
      erroreIngrediente = true;
      return;
    }

    // Caso q.b.
    if (unita === "qb") {
      ingredienti.push({ nome, originale: null, unita: "qb" });
      return;
    }

    const valore = leggiNumero(valoreRaw);
    if (isNaN(valore)) {
      mostraErroreNumero(originaleInput);
      erroreIngrediente = true;
      return;
    }

    ingredienti.push({ nome, originale: valore, unita });
  });

  if (erroreIngrediente) return null;
  return ingredienti;
}

// Salva la ricetta corrente
function salvaRicetta() {
  const inputNome = document.getElementById("nomeRicetta");
  const nome = inputNome.value.trim();

  inputNome.classList.remove("error");
  const errorEl = document.getElementById("nome-ricetta-error");
  if (errorEl) errorEl.textContent = "";

  if (!nome) {
    inputNome.classList.add("error");
    errorEl.textContent = MESSAGGI_ERRORE.NOME_RICETTA_VUOTO;
    return;
  }

  if (nomeGiaEsistente(nome)) {
    inputNome.classList.add("error");
    errorEl.textContent = MESSAGGI_ERRORE.NOME_RICETTA_DUPLICATO;
    return;
  }

  const porzioniCalc = leggiPorzioniCalcolatore();
  const ingredienti = leggiRicettaDaUI();
  if (!ingredienti) return;

  if (ingredienti.length === 0) {
    alert(MESSAGGI_ERRORE.NESSUN_INGREDIENTE);
    return;
  }

  const ricetta = {
    id: Date.now(),
    nome,
    ingredienti,
    preferita: false,
    porzioni: porzioniCalc.sarebbe.valore,
    tipoPorzioni: porzioniCalc.sarebbe.tipo
  };

  const salvate = JSON.parse(localStorage.getItem(STORAGE_KEYS.RICETTE)) || [];
  salvate.push(ricetta);
  localStorage.setItem(STORAGE_KEYS.RICETTE, JSON.stringify(salvate));

  mostraRicetteSalvate();
  mostraBanner(MESSAGGI_SUCCESSO.RICETTA_SALVATA);
}

/**
 * Verifica se un nome ricetta esiste già
 * @param {string} nome - Nome da verificare
 * @param {number} currentId - ID ricetta corrente (per escluderla dal controllo)
 * @returns {boolean} - True se esiste
 */
function nomeGiaEsistente(nome, currentId) {
  const ricette = JSON.parse(localStorage.getItem(STORAGE_KEYS.RICETTE)) || [];
  return ricette.some(
    r => r.nome.toLowerCase() === nome.toLowerCase() && r.id !== currentId
  );
}

/**
 * Salva il nome modificato di una ricetta
 * @param {number} id - ID ricetta
 * @param {string} nuovoNome - Nuovo nome
 */
function salvaNome(id, nuovoNome) {
  const ricette = JSON.parse(localStorage.getItem(STORAGE_KEYS.RICETTE)) || [];
  const ricetta = ricette.find(r => r.id === id);
  if (!ricetta) return;
  ricetta.nome = nuovoNome;
  localStorage.setItem(STORAGE_KEYS.RICETTE, JSON.stringify(ricette));
}


// ======================================================
// 10. STORAGE - LocalStorage
// ======================================================

/**
 * Elimina una ricetta
 * @param {number} id - ID ricetta da eliminare
 */
function eliminaRicetta(id) {
  let ricette = JSON.parse(localStorage.getItem(STORAGE_KEYS.RICETTE)) || [];
  ricette = ricette.filter(r => r.id !== id);
  localStorage.setItem(STORAGE_KEYS.RICETTE, JSON.stringify(ricette));
  mostraRicetteSalvate();
}

/**
 * Toggle stato preferito di una ricetta
 * @param {number} id - ID ricetta
 */
function togglePreferito(id) {
  const ricette = JSON.parse(localStorage.getItem(STORAGE_KEYS.RICETTE)) || [];
  const ricetta = ricette.find(r => r.id === id);
  if (!ricetta) return;
  ricetta.preferita = !ricetta.preferita;
  localStorage.setItem(STORAGE_KEYS.RICETTE, JSON.stringify(ricette));
  mostraRicetteSalvate();
}

// Salva l'ordine delle ricette dal DOM
function salvaOrdineDaDOM() {
  const wrappers = document.querySelectorAll(".ricetta-swipe");
  const ricette = JSON.parse(localStorage.getItem(STORAGE_KEYS.RICETTE)) || [];
  const nuovaLista = [];

  wrappers.forEach(w => {
    const id = Number(w.dataset.id);
    const ricetta = ricette.find(r => r.id === id);
    if (ricetta) nuovaLista.push(ricetta);
  });

  localStorage.setItem(STORAGE_KEYS.RICETTE, JSON.stringify(nuovaLista));
}


// ======================================================
// 11. RENDERING - Lista Ricette
// ======================================================

/**
 * Legge il filtro di ricerca
 * @returns {string} - Testo del filtro (lowercase)
 */
function leggiFiltroRicette() {
  const input = document.getElementById("ricette-search-input");
  return input ? input.value.trim().toLowerCase() : "";
}

/**
 * Crea una singola card ricetta con tutti i suoi event listener
 * @param {Object} ricetta - Dati ricetta
 * @returns {HTMLElement} - Wrapper della card creato
 */
function creaCardRicetta(ricetta) {
  const wrapper = document.createElement("div");
  wrapper.className = "ricetta-swipe";
  wrapper.dataset.id = ricetta.id;
  wrapper.dataset.preferita = ricetta.preferita ? "1" : "0";

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
            <span class="ricetta-nome">${ricetta.nome}</span>
            <span class="edit-nome" title="Modifica nome">✏️</span>
          </div>
          <div class="nome-error"></div>
        </div>
        <span class="ricetta-star ${ricetta.preferita ? "attiva" : ""}">★</span>
        <span class="ricetta-porzioni">x${ricetta.porzioni ?? LIMITI_PORZIONI.MIN} ${ricetta.tipoPorzioni ?? "porzioni"}</span>
      </div>
      <div class="card-link">
        ${ricetta.link ? `<a href="${ricetta.link}" target="_blank">${ricetta.link}</a>` : ""}
      </div>
    </div>
    <button class="btn-carica">Carica</button>
  `;

  wrapper.append(deleteBg, card);

  // Link cliccabile senza popup
  const link = card.querySelector(".card-link a");
  if (link) {
    link.addEventListener("click", e => e.stopPropagation());
  }

  abilitaModificaNome(card, ricetta.id);

  card.querySelector(".ricetta-star").addEventListener("click", e => {
    e.stopPropagation();
    togglePreferito(ricetta.id);
  });

  card.querySelector(".btn-carica").addEventListener("click", e => {
    e.stopPropagation();
    caricaRicettaDaPagina(ricetta.id);
  });

  card.addEventListener("click", e => {
    if (e.target.closest(".ricetta-nome, .edit-nome, .ricetta-star, .btn-carica, .drag-handle")) {
      return;
    }
    if (card.classList.contains("editing-nome") || card.dataset.justExitedEdit === "true") {
      return;
    }
    apriPopupRicetta(ricetta.id);
  });

  return wrapper;
}

// Mostra la lista delle ricette salvate
function mostraRicetteSalvate() {
  preservaScroll(() => {
    const contenitore = document.getElementById("lista-ricette-pagina");
    if (!contenitore) return;

    contenitore.innerHTML = "";

    let ricette = JSON.parse(localStorage.getItem(STORAGE_KEYS.RICETTE)) || [];

    const filtro = leggiFiltroRicette();
    if (filtro) {
      ricette = ricette.filter(r => r.nome.toLowerCase().includes(filtro));
    }

    ricette = ricette.map(r => ({
      id: r.id,
      nome: r.nome,
      ingredienti: r.ingredienti ?? [],
      preferita: r.preferita ?? false,
      link: r.link ?? "",
      note: r.note ?? "",
      porzioni: r.porzioni ?? LIMITI_PORZIONI.MIN,
      tipoPorzioni: r.tipoPorzioni ?? "porzioni"
    }));

    ricette.sort((a, b) => (b.preferita === true) - (a.preferita === true));

    ricette.forEach(r => {
      const wrapper = creaCardRicetta(r);
      contenitore.appendChild(wrapper);
      
      // Abilita swipe e drag DOPO che il wrapper è nel DOM
      const card = wrapper.querySelector(".ricetta-card");
      abilitaSwipe(wrapper, card);
      abilitaDrag(wrapper);
    });
  });
}


// ======================================================
// 12. INTERAZIONI - Modifica Nome
// ======================================================

/**
 * Abilita la modifica inline del nome ricetta
 * @param {HTMLElement} card - Card ricetta
 * @param {number} id - ID ricetta
 */
function abilitaModificaNome(card, id) {
  const nomeEl = card.querySelector(".ricetta-nome");
  const editBtn = card.querySelector(".edit-nome");

  let originalName = nomeEl.textContent;
  let isEditing = false;

  const errorEl = document.createElement("div");
  errorEl.className = "nome-error";

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

  nomeEl.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      e.preventDefault();
      nomeEl.blur();
    }
    if (e.key === "Escape") {
      nomeEl.textContent = originalName;
      cleanup(false);
    }
  });

  nomeEl.addEventListener("blur", () => {
    if (!isEditing) return;

    const nuovoNome = nomeEl.textContent.trim();

    if (!nuovoNome) {
      mostraErrore("Nome ricetta non valido.");
      nomeEl.textContent = originalName;
      setTimeout(() => nomeEl.focus(), 10);
      return;
    }

    if (nomeGiaEsistente(nuovoNome, id)) {
      mostraErrore("Nome ricetta già esistente.");
      nomeEl.textContent = originalName;
      setTimeout(() => nomeEl.focus(), 10);
      return;
    }

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

    card.dataset.justExitedEdit = "true";
    setTimeout(() => {
      card.classList.remove("editing-nome");
      card.dataset.justExitedEdit = "false";
    }, TIMING.RITARDO_EDIT_EXIT);
  }
}


// ======================================================
// 13. INTERAZIONI - Carica Ricetta
// ======================================================

/**
 * Imposta il nome ricetta nel calcolatore
 * @param {string} nome - Nome ricetta
 */
function impostaNomeRicettaCalcolatore(nome) {
  const el = document.getElementById("nomeRicetta");
  if (!el) return;
  el.value = nome;
}

/**
 * Carica una ricetta nel calcolatore
 * @param {number} id - ID ricetta
 */
function caricaRicettaDaPagina(id) {
  vaiAPagina("home", "Calcolatore per Ricette");

  document.querySelectorAll(".riga").forEach(r => r.remove());

  const ricette = JSON.parse(localStorage.getItem(STORAGE_KEYS.RICETTE)) || [];
  const ricetta = ricette.find(r => r.id === id);

  if (!ricetta) {
    alert(MESSAGGI_ERRORE.RICETTA_NON_TROVATA);
    return;
  }

  setTimeout(() => {
    document.querySelectorAll(".riga").forEach(r => r.remove());
    impostaNomeRicettaCalcolatore(ricetta.nome);

    const inputSarebbe = document.querySelector(".input-sarebbe-num");
    const selectSarebbe = document.querySelector(".select-sarebbe-tipo");
    const selectVorrei = document.querySelector(".select-vorrei-tipo");
    const inputVorrei = document.querySelector(".input-vorrei-num");

    if (inputSarebbe && selectSarebbe) {
      inputSarebbe.value = ricetta.porzioni ?? LIMITI_PORZIONI.MIN;
      selectSarebbe.value = ricetta.tipoPorzioni ?? "porzioni";

      if (selectVorrei) {
        selectVorrei.value = selectSarebbe.value;
      }

      if (inputVorrei) {
        inputVorrei.value = "";
        inputVorrei.classList.remove("auto-changed");
      }
    }

    ricetta.ingredienti.forEach(ing => {
      aggiungiRiga(ing.nome, ing.originale, ing.unita, "");
    });

    window.scrollTo({ top: 0, behavior: "instant" });
  }, 0);
}


// ======================================================
// 14. INTERAZIONI - Swipe
// ======================================================

/**
 * Abilita il gesto swipe per eliminare
 * @param {HTMLElement} wrapper - Wrapper ricetta
 * @param {HTMLElement} card - Card ricetta
 */
function abilitaSwipe(wrapper, card) {
  let startX = 0;
  let startY = 0;
  let swiping = false;
  let canSwipe = false;

  const maxSwipe = card.offsetWidth * CONFIG_SWIPE.MAX_SWIPE_RATIO;
  const deleteThreshold = maxSwipe * CONFIG_SWIPE.SOGLIA_ELIMINAZIONE;

  wrapper.addEventListener("pointerdown", e => {
    if (wrapper.dataset.preferita === "1") return;

    if (e.target.closest(".drag-handle, .ricetta-star, .btn-carica, .edit-nome, .ricetta-nome")) {
      return;
    }

    const rect = card.getBoundingClientRect();
    const startOffsetX = e.clientX - rect.left;
    canSwipe = startOffsetX >= rect.width * (1 - CONFIG_SWIPE.ZONA_DESTRA_RATIO);

    startX = e.clientX;
    startY = e.clientY;
  });

  wrapper.addEventListener("pointermove", e => {
    if (!canSwipe) return;

    const deltaX = e.clientX - startX;
    const deltaY = Math.abs(e.clientY - startY);

    if (deltaY > Math.abs(deltaX) * CONFIG_SWIPE.SOGLIA_VERTICALE_RATIO) {
      canSwipe = false;
      swiping = false;
      card.style.transform = "translateX(0)";
      return;
    }

    if (!swiping && deltaX < -CONFIG_SWIPE.SOGLIA_MOVIMENTO) {
      swiping = true;
      card.style.transition = "none";
      wrapper.setPointerCapture(e.pointerId);
      e.preventDefault();
      e.stopPropagation();
    }

    if (swiping && deltaX < 0) {
      card.style.transform = `translateX(${Math.max(deltaX, -maxSwipe)}px)`;
    }
  });

  wrapper.addEventListener("pointerup", () => {
    if (!swiping) {
      canSwipe = false;
      return;
    }

    swiping = false;
    canSwipe = false;
    card.style.transition = "transform 0.2s ease";

    const translate = parseFloat(card.style.transform.replace("translateX(", "")) || 0;

    if (Math.abs(translate) > deleteThreshold) {
      if (confirm(MESSAGGI_CONFERMA.ELIMINA_RICETTA)) {
        eliminaRicetta(Number(wrapper.dataset.id));
        return;
      }
    }

    card.style.transform = "translateX(0)";
  });

  wrapper.addEventListener("pointercancel", () => {
    swiping = false;
    canSwipe = false;
    card.style.transform = "translateX(0)";
  });
}


// ======================================================
// 15. INTERAZIONI - Drag & Drop
// ======================================================

/**
 * Auto-scroll durante il drag
 * @param {number} touchY - Posizione Y del touch
 */
function autoScroll(touchY) {
  const topEdge = CONFIG_DRAG.ZONA_AUTO_SCROLL;
  const bottomEdge = window.innerHeight - CONFIG_DRAG.ZONA_AUTO_SCROLL;

  if (touchY < topEdge) {
    const intensity = 1 - touchY / topEdge;
    window.scrollBy(0, -CONFIG_DRAG.VELOCITA_SCROLL_MAX * intensity);
  } else if (touchY > bottomEdge) {
    const intensity = (touchY - bottomEdge) / CONFIG_DRAG.ZONA_AUTO_SCROLL;
    window.scrollBy(0, CONFIG_DRAG.VELOCITA_SCROLL_MAX * intensity);
  }
}

/**
 * Abilita il drag & drop per riordinare
 * @param {HTMLElement} wrapper - Wrapper ricetta
 */
function abilitaDrag(wrapper) {
  const handle = wrapper.querySelector(".drag-handle");
  if (!handle) return;

  let dragging = false;
  let ghost = null;
  let placeholder = null;
  let startY = 0;
  let offsetY = 0;
  let minY = 0;
  let maxY = 0;

  const container = wrapper.parentNode;

  handle.addEventListener("pointerdown", e => {
    e.preventDefault();
    e.stopPropagation();

    dragging = true;
    handle.setPointerCapture(e.pointerId);

    const rect = wrapper.getBoundingClientRect();
    const header = document.querySelector(".topbar");
    const headerBottom = header ? header.getBoundingClientRect().bottom : 0;

    minY = headerBottom + CONFIG_DRAG.GAP_CARD;
    maxY = window.innerHeight - rect.height - CONFIG_DRAG.GAP_CARD;

    startY = e.clientY;
    offsetY = startY - rect.top;

    placeholder = document.createElement("div");
    placeholder.className = "ricetta-placeholder";
    placeholder.style.height = rect.height + "px";
    container.insertBefore(placeholder, wrapper);

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
    const headerBottom = header ? header.getBoundingClientRect().bottom : 0;
    minY = headerBottom + CONFIG_DRAG.GAP_CARD;
    maxY = window.innerHeight - ghost.offsetHeight - CONFIG_DRAG.GAP_CARD;

    let y = e.clientY - offsetY;
    y = Math.max(minY, Math.min(maxY, y));

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


// ======================================================
// 16. POPUP - Gestione Ricetta
// ======================================================

let ricettaCorrenteId = null;

/**
 * Apre il popup di modifica ricetta
 * @param {number} id - ID ricetta
 */
function apriPopupRicetta(id) {
  const ricette = JSON.parse(localStorage.getItem(STORAGE_KEYS.RICETTE)) || [];
  const ricetta = ricette.find(r => r.id === id);
  if (!ricetta) return;

  ricettaCorrenteId = id;

  const overlay = document.getElementById("popup-overlay");
  overlay.classList.remove("hidden");
  document.body.classList.add("no-scroll");

  overlay.querySelector(".popup-title").textContent = ricetta.nome;

  const porzioniInput = overlay.querySelector(".input-porzioni");
  porzioniInput.value = ricetta.porzioni ?? LIMITI_PORZIONI.MIN;

  overlay.querySelector(".select-porzioni-tipo").value = ricetta.tipoPorzioni ?? "porzioni";
  overlay.querySelector(".popup-link").value = ricetta.link ?? "";
  overlay.querySelector(".popup-note").value = ricetta.note ?? "";

  const contenitore = overlay.querySelector(".popup-ingredienti");
  contenitore.innerHTML = "";

  ricetta.ingredienti.forEach(ing => {
    contenitore.appendChild(creaRigaIngredientePopup(ing));
  });

  overlay.querySelector(".popup-add").onclick = () => {
    contenitore.appendChild(creaRigaIngredientePopup());
  };

  overlay.querySelector(".popup-annulla").onclick = () => {
    chiudiPopupRicetta();
  };

  overlay.querySelector(".popup-salva").onclick = () => {
    const ok = salvaPopupRicetta();
    if (ok) {
      chiudiPopupRicetta();
    }
  };
}

/**
 * Salva le modifiche dal popup
 * @returns {boolean} - True se salvato con successo
 */
function salvaPopupRicetta() {
  if (!ricettaCorrenteId) return false;

  const ricette = JSON.parse(localStorage.getItem(STORAGE_KEYS.RICETTE)) || [];
  const ricetta = ricette.find(r => r.id === ricettaCorrenteId);
  if (!ricetta) return false;

  const overlay = document.getElementById("popup-overlay");

  const porzioniVal = Number(overlay.querySelector(".input-porzioni").value);
  ricetta.porzioni = porzioniVal > 0 ? porzioniVal : LIMITI_PORZIONI.MIN;
  ricetta.tipoPorzioni = overlay.querySelector(".select-porzioni-tipo").value;
  ricetta.link = overlay.querySelector(".popup-link").value.trim();
  ricetta.note = overlay.querySelector(".popup-note").value.trim();

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

    erroreNomeEl.textContent = "";
    erroreQtaEl.textContent = "";
    nomeInput.classList.remove("input-errore");
    inputQta.classList.remove("input-errore");

    if (!nome && (valore || unita !== "g")) {
      nomeInput.classList.add("input-errore");
      erroreNomeEl.textContent = MESSAGGI_ERRORE.INGREDIENTE_NON_VALIDO;
      errore = true;
      return;
    }

    if (!nome && !valore) return;

    if (unita === "qb") {
      nuoviIngredienti.push({ nome, originale: null, unita: "qb" });
      return;
    }

    const num = leggiNumero(valore);
    if (isNaN(num)) {
      inputQta.classList.add("input-errore");
      erroreQtaEl.textContent = MESSAGGI_ERRORE.QUANTITA_NON_VALIDA;
      errore = true;
      return;
    }

    nuoviIngredienti.push({ nome, originale: num, unita });
  });

  if (errore || nuoviIngredienti.length === 0) return false;

  ricetta.ingredienti = nuoviIngredienti;
  localStorage.setItem(STORAGE_KEYS.RICETTE, JSON.stringify(ricette));
  mostraRicetteSalvate();

  return true;
}

// Chiude il popup ricetta
function chiudiPopupRicetta() {
  document.getElementById("popup-overlay").classList.add("hidden");
  document.body.classList.remove("no-scroll");
  ricettaCorrenteId = null;
}


// ======================================================
// 17. NAVIGAZIONE - Menu e Pagine
// ======================================================

// Apre il menu laterale
function apriMenu() {
  document.querySelector(".menu").style.left = "0";
  document.querySelector(".overlay").style.display = "block";
  document.body.classList.add("no-scroll");
}

// Chiude il menu laterale
function chiudiMenu() {
  document.querySelector(".menu").style.left = UI.LARGHEZZA_MENU;
  document.querySelector(".overlay").style.display = "none";
  document.body.classList.remove("no-scroll");
}

/**
 * Naviga a una pagina dell'applicazione
 * @param {string} idPagina - ID della pagina
 * @param {string} titolo - Titolo da mostrare nell'header
 */
function vaiAPagina(idPagina, titolo) {
  document.querySelectorAll(".pagina").forEach(p => {
    p.classList.remove("attiva");
  });

  document.getElementById(idPagina).classList.add("attiva");
  document.getElementById("titoloPagina").textContent = titolo;

  chiudiMenu();
  window.scrollTo({ top: 0, behavior: "instant" });

  if (idPagina === "ricette") {
    mostraRicetteSalvate();
  }
}


// ======================================================
// 18. INIZIALIZZAZIONE
// ======================================================

// Limita i valori degli input porzioni tra MIN e MAX
function limitaValoriMinMax() {
  const inputs = document.querySelectorAll('.input-sarebbe-num, .input-vorrei-num');
  inputs.forEach(input => {
    input.addEventListener('input', function() {
      let val = parseInt(this.value);
      if (val > LIMITI_PORZIONI.MAX) this.value = LIMITI_PORZIONI.MAX;
      if (val < LIMITI_PORZIONI.MIN) this.value = LIMITI_PORZIONI.MIN;
    });
  });
}

// Blocca l'inserimento di caratteri non consentiti negli input porzioni
function bloccaTastiNonConsentiti() {
  document.addEventListener("keydown", e => {
    const input = e.target;
    if (!input.classList.contains("input-porzioni-calc")) return;

    if (e.key === "+" || e.key === "-") {
      e.preventDefault();
      return;
    }

    if (input.classList.contains("input-sarebbe-num") && (e.key === "." || e.key === ",")) {
      e.preventDefault();
    }
  });
}

// Sincronizza il select "vorrei" con il select "sarebbe"
function sincronizzaSelectPorzioni() {
  document.addEventListener("DOMContentLoaded", () => {
    const selectSarebbe = document.querySelector(".select-sarebbe-tipo");
    const selectVorrei = document.querySelector(".select-vorrei-tipo");

    if (!selectSarebbe || !selectVorrei) return;

    selectVorrei.value = selectSarebbe.value;
    selectVorrei.disabled = true;

    selectSarebbe.addEventListener("change", () => {
      selectVorrei.value = selectSarebbe.value;
    });
  });
}

// Forza il valore minimo sull'input "sarebbe" quando perde il focus
function forzaValoreMinimoSarebbe() {
  const inputSarebbe = document.querySelector('.input-sarebbe-num');
  if (!inputSarebbe) return;

  inputSarebbe.addEventListener('blur', function() {
    if (this.value === '' || parseInt(this.value) < LIMITI_PORZIONI.MIN || isNaN(parseInt(this.value))) {
      this.value = LIMITI_PORZIONI.MIN;
    }
  });
}

// Reset dello stato "auto-changed" sull'input "vorrei" quando l'utente modifica manualmente
function resetAutoChangedVorrei() {
  document.addEventListener("input", e => {
    const input = e.target;
    if (!input.classList.contains("input-vorrei-num")) return;

    input.classList.remove("auto-changed");
    input.classList.remove("pulse");
    delete input.dataset.pulsed;
  });
}

// Inizializza tutti i limiti e comportamenti degli input porzioni
function limitaInputPorzioni() {
  limitaValoriMinMax();
  bloccaTastiNonConsentiti();
  sincronizzaSelectPorzioni();
  forzaValoreMinimoSarebbe();
  resetAutoChangedVorrei();
}

// Righe iniziali
aggiungiRiga();
aggiungiRiga();

// Inizializza limiti porzioni
limitaInputPorzioni();

// Reset errore nome ricetta on input
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

// Blocca caratteri non numerici negli input quantità
document.addEventListener("input", e => {
  if (e.target.classList.contains("originale") ||
      e.target.classList.contains("disponibile") ||
      e.target.classList.contains("popup-quantita")) {
    e.target.value = e.target.value.replace(/[^0-9.,]/g, "");
  }
});

// Ricerca ricette
document.addEventListener("input", e => {
  if (e.target.id === "ricette-search-input") {
    mostraRicetteSalvate();
  }
});





// FUORI CODICE ==================================================

if ("serviceWorker" in navigator) {
  const CURRENT_VERSION = "ricette-v3.5.0"; // Deve corrispondere alla versione nel service-worker.js
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







