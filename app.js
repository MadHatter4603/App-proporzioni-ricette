// ======================================================
// 0. SISTEMA INTERNAZIONALIZZAZIONE (i18n)
// ======================================================

const i18n = {
  currentLang: 'it',
  translations: {},
  
  // Traduzioni inline per CodePen
  inlineTranslations: {
    it: {
      "app_title": "Calcolatore per Ricette",
      "menu": {
        "title": "Menu",
        "calculator": "🔢 Calcolatore",
        "saved_recipes": "📚 Ricette salvate",
        "conversions": "📏 Conversioni",
        "timer": "⏰ Timer",
        "settings": "⚙️ Impostazioni",
        "feedback": "📝 Segnalazioni",
        "footer": "© 2026 – Dario Pazienza"
      },
      "calculator": {
        "recipe_name_placeholder": "Nome ricetta",
        "save_button": "💾 Salva",
        "reset_button_title": "Reset quantità",
        "portions_for": "Sarebbe per:",
        "portions_want": "Vorrei / Posso fare:",
        "portions": "porzioni",
        "people": "persone",
        "pieces": "pezzi",
        "ingredient_placeholder": "Ingrediente",
        "quantity_placeholder": "Quantità",
        "you_have_placeholder": "Tu hai",
        "add_ingredient": "Aggiungi ingrediente",
        "calculate_button": "Calcola nuove proporzioni"
      },
      "saved_recipes": {
        "title": "Ricette salvate",
        "search_placeholder": "Cerca ricetta…",
        "load_button": "Carica",
        "edit_name_title": "Modifica nome",
        "link_placeholder": "Link ricetta:",
        "notes_placeholder": "Note..."
      },
      "popup": {
        "cancel": "Annulla",
        "save": "Salva"
      },
      "settings": {
        "title": "Impostazioni",
        "language": "Lingua",
        "select_language": "Seleziona lingua:"
      },
      "pages": {
        "conversions": "Conversioni",
        "timer": "Timer",
        "coming_soon": "Coming Soon!",
        "feedback_text": "Hai trovato un problema o vuoi suggerire miglioramenti?",
        "feedback_button": "Invia una segnalazione"
      },
      "messages": {
        "recipe_saved": "Ricetta salvata ✔️",
        "recipe_not_found": "Ricetta non trovata",
        "ingredients_insufficient": "Non hai abbastanza ingredienti per fare questa ricetta :(",
        "invalid_number": "Inserire numero valido!",
        "invalid_ingredient": "Inserire ingrediente valido!",
        "recipe_name_empty": "Inserire nome ricetta.",
        "recipe_name_duplicate": "Nome ricetta già esistente.",
        "inconsistent_units": "Unità incongruenti!",
        "invalid_quantity": "Quantità non valida!",
        "no_quantity": "Nessuna quantità da ricalcolare!",
        "no_ingredient": "Nessun ingrediente valido",
        "confirm_reset": "Svuotare le caselle con le quantità possedute?",
        "confirm_delete": "Eliminare questa ricetta?",
        "invalid_recipe_name": "Nome ricetta non valido.",
        "recipe_name_exists": "Nome ricetta già esistente."
      },
      "aria": {
        "close_notification": "Chiudi notifica",
        "open_menu": "Apri menu",
        "main_menu": "Menu principale",
        "original_portions": "Numero porzioni originali",
        "original_portions_type": "Tipo porzioni originali",
        "desired_portions": "Numero porzioni desiderate",
        "desired_portions_type": "Tipo porzioni desiderate",
        "ingredients_list": "Lista ingredienti",
        "saved_recipes_list": "Ricette salvate",
        "search_recipes": "Cerca tra le ricette salvate",
        "recipe_ingredients": "Ingredienti della ricetta",
        "recipe_notes": "Note sulla ricetta",
        "recipe_link": "Link alla ricetta online",
        "portions_number": "Numero porzioni"
      },
      "units": {
        "qb": "q.b."
      }
    },
    
    en: {
      "app_title": "Recipe Calculator",
      "menu": {
        "title": "Menu",
        "calculator": "🔢 Calculator",
        "saved_recipes": "📚 Saved Recipes",
        "conversions": "📏 Conversions",
        "timer": "⏰ Timer",
        "settings": "⚙️ Settings",
        "feedback": "📝 Feedback",
        "footer": "© 2026 – Dario Pazienza"
      },
      "calculator": {
        "recipe_name_placeholder": "Recipe name",
        "save_button": "💾 Save",
        "reset_button_title": "Reset quantities",
        "portions_for": "Recipe is for:",
        "portions_want": "I want / Can make:",
        "portions": "servings",
        "people": "people",
        "pieces": "pieces",
        "ingredient_placeholder": "Ingredient",
        "quantity_placeholder": "Quantity",
        "you_have_placeholder": "You have",
        "add_ingredient": "Add ingredient",
        "calculate_button": "Calculate new proportions"
      },
      "saved_recipes": {
        "title": "Saved Recipes",
        "search_placeholder": "Search recipe…",
        "load_button": "Load",
        "edit_name_title": "Edit name",
        "link_placeholder": "Recipe link:",
        "notes_placeholder": "Notes..."
      },
      "popup": {
        "cancel": "Cancel",
        "save": "Save"
      },
      "settings": {
        "title": "Settings",
        "language": "Language",
        "select_language": "Select language:"
      },
      "pages": {
        "conversions": "Conversions",
        "timer": "Timer",
        "coming_soon": "Coming Soon!",
        "feedback_text": "Found a problem or want to suggest improvements?",
        "feedback_button": "Send feedback"
      },
      "messages": {
        "recipe_saved": "Recipe saved ✔️",
        "recipe_not_found": "Recipe not found",
        "ingredients_insufficient": "You don't have enough ingredients for this recipe :(",
        "invalid_number": "Please enter a valid number!",
        "invalid_ingredient": "Please enter a valid ingredient!",
        "recipe_name_empty": "Please enter recipe name.",
        "recipe_name_duplicate": "Recipe name already exists.",
        "inconsistent_units": "Inconsistent units!",
        "invalid_quantity": "Invalid quantity!",
        "no_quantity": "No quantity to recalculate!",
        "no_ingredient": "No valid ingredient",
        "confirm_reset": "Clear the fields with available quantities?",
        "confirm_delete": "Delete this recipe?",
        "invalid_recipe_name": "Invalid recipe name.",
        "recipe_name_exists": "Recipe name already exists."
      },
      "aria": {
        "close_notification": "Close notification",
        "open_menu": "Open menu",
        "main_menu": "Main menu",
        "original_portions": "Original portions number",
        "original_portions_type": "Original portions type",
        "desired_portions": "Desired portions number",
        "desired_portions_type": "Desired portions type",
        "ingredients_list": "Ingredients list",
        "saved_recipes_list": "Saved recipes",
        "search_recipes": "Search among saved recipes",
        "recipe_ingredients": "Recipe ingredients",
        "recipe_notes": "Recipe notes",
        "recipe_link": "Link to online recipe",
        "portions_number": "Portions number"
      },
      "units": {
        "qb": "t.t."
      }
    },
    
    fr: {
      "app_title": "Calculateur de Recettes",
      "menu": {
        "title": "Menu",
        "calculator": "🔢 Calculateur",
        "saved_recipes": "📚 Recettes sauvegardées",
        "conversions": "📏 Conversions",
        "timer": "⏰ Minuteur",
        "settings": "⚙️ Paramètres",
        "feedback": "📝 Commentaires",
        "footer": "© 2026 – Dario Pazienza"
      },
      "calculator": {
        "recipe_name_placeholder": "Nom de la recette",
        "save_button": "💾 Sauvegarder",
        "reset_button_title": "Réinitialiser quantités",
        "portions_for": "Recette pour:",
        "portions_want": "Je veux / Peux faire:",
        "portions": "portions",
        "people": "personnes",
        "pieces": "pièces",
        "ingredient_placeholder": "Ingrédient",
        "quantity_placeholder": "Quantité",
        "you_have_placeholder": "Vous avez",
        "add_ingredient": "Ajouter ingrédient",
        "calculate_button": "Calculer nouvelles proportions"
      },
      "saved_recipes": {
        "title": "Recettes sauvegardées",
        "search_placeholder": "Rechercher recette…",
        "load_button": "Charger",
        "edit_name_title": "Modifier nom",
        "link_placeholder": "Lien recette:",
        "notes_placeholder": "Notes..."
      },
      "popup": {
        "cancel": "Annuler",
        "save": "Sauvegarder"
      },
      "settings": {
        "title": "Paramètres",
        "language": "Langue",
        "select_language": "Sélectionner langue:"
      },
      "pages": {
        "conversions": "Conversions",
        "timer": "Minuteur",
        "coming_soon": "Bientôt disponible!",
        "feedback_text": "Vous avez trouvé un problème ou souhaitez suggérer des améliorations?",
        "feedback_button": "Envoyer commentaire"
      },
      "messages": {
        "recipe_saved": "Recette sauvegardée ✔️",
        "recipe_not_found": "Recette non trouvée",
        "ingredients_insufficient": "Vous n'avez pas assez d'ingrédients pour cette recette :(",
        "invalid_number": "Veuillez saisir un nombre valide!",
        "invalid_ingredient": "Veuillez saisir un ingrédient valide!",
        "recipe_name_empty": "Veuillez saisir le nom de la recette.",
        "recipe_name_duplicate": "Le nom de la recette existe déjà.",
        "inconsistent_units": "Unités incohérentes!",
        "invalid_quantity": "Quantité non valide!",
        "no_quantity": "Aucune quantité à recalculer!",
        "no_ingredient": "Aucun ingrédient valide",
        "confirm_reset": "Vider les champs avec les quantités disponibles?",
        "confirm_delete": "Supprimer cette recette?",
        "invalid_recipe_name": "Nom de recette non valide.",
        "recipe_name_exists": "Le nom de la recette existe déjà."
      },
      "aria": {
        "close_notification": "Fermer notification",
        "open_menu": "Ouvrir menu",
        "main_menu": "Menu principal",
        "original_portions": "Nombre de portions originales",
        "original_portions_type": "Type de portions originales",
        "desired_portions": "Nombre de portions désirées",
        "desired_portions_type": "Type de portions désirées",
        "ingredients_list": "Liste des ingrédients",
        "saved_recipes_list": "Recettes sauvegardées",
        "search_recipes": "Rechercher parmi les recettes sauvegardées",
        "recipe_ingredients": "Ingrédients de la recette",
        "recipe_notes": "Notes sur la recette",
        "recipe_link": "Lien vers recette en ligne",
        "portions_number": "Nombre de portions"
      },
      "units": {
        "qb": "s.n."
      }
    },
    
    es: {
      "app_title": "Calculadora de Recetas",
      "menu": {
        "title": "Menú",
        "calculator": "🔢 Calculadora",
        "saved_recipes": "📚 Recetas guardadas",
        "conversions": "📏 Conversiones",
        "timer": "⏰ Temporizador",
        "settings": "⚙️ Configuración",
        "feedback": "📝 Comentarios",
        "footer": "© 2026 – Dario Pazienza"
      },
      "calculator": {
        "recipe_name_placeholder": "Nombre de receta",
        "save_button": "💾 Guardar",
        "reset_button_title": "Restablecer cantidades",
        "portions_for": "Receta para:",
        "portions_want": "Quiero / Puedo hacer:",
        "portions": "porciones",
        "people": "personas",
        "pieces": "piezas",
        "ingredient_placeholder": "Ingrediente",
        "quantity_placeholder": "Cantidad",
        "you_have_placeholder": "Tienes",
        "add_ingredient": "Añadir ingrediente",
        "calculate_button": "Calcular nuevas proporciones"
      },
      "saved_recipes": {
        "title": "Recetas guardadas",
        "search_placeholder": "Buscar receta…",
        "load_button": "Cargar",
        "edit_name_title": "Editar nombre",
        "link_placeholder": "Enlace receta:",
        "notes_placeholder": "Notas..."
      },
      "popup": {
        "cancel": "Cancelar",
        "save": "Guardar"
      },
      "settings": {
        "title": "Configuración",
        "language": "Idioma",
        "select_language": "Seleccionar idioma:"
      },
      "pages": {
        "conversions": "Conversiones",
        "timer": "Temporizador",
        "coming_soon": "¡Próximamente!",
        "feedback_text": "¿Encontraste un problema o quieres sugerir mejoras?",
        "feedback_button": "Enviar comentario"
      },
      "messages": {
        "recipe_saved": "Receta guardada ✔️",
        "recipe_not_found": "Receta no encontrada",
        "ingredients_insufficient": "No tienes suficientes ingredientes para esta receta :(",
        "invalid_number": "¡Por favor ingresa un número válido!",
        "invalid_ingredient": "¡Por favor ingresa un ingrediente válido!",
        "recipe_name_empty": "Por favor ingresa el nombre de la receta.",
        "recipe_name_duplicate": "El nombre de la receta ya existe.",
        "inconsistent_units": "¡Unidades inconsistentes!",
        "invalid_quantity": "¡Cantidad no válida!",
        "no_quantity": "¡No hay cantidad para recalcular!",
        "no_ingredient": "Ningún ingrediente válido",
        "confirm_reset": "¿Vaciar los campos con las cantidades disponibles?",
        "confirm_delete": "¿Eliminar esta receta?",
        "invalid_recipe_name": "Nombre de receta no válido.",
        "recipe_name_exists": "El nombre de la receta ya existe."
      },
      "aria": {
        "close_notification": "Cerrar notificación",
        "open_menu": "Abrir menú",
        "main_menu": "Menú principal",
        "original_portions": "Número de porciones originales",
        "original_portions_type": "Tipo de porciones originales",
        "desired_portions": "Número de porciones deseadas",
        "desired_portions_type": "Tipo de porciones deseadas",
        "ingredients_list": "Lista de ingredientes",
        "saved_recipes_list": "Recetas guardadas",
        "search_recipes": "Buscar entre las recetas guardadas",
        "recipe_ingredients": "Ingredientes de la receta",
        "recipe_notes": "Notas sobre la receta",
        "recipe_link": "Enlace a receta en línea",
        "portions_number": "Número de porciones"
      },
      "units": {
        "qb": "c/n"
      }
    }
  },
  
  async init() {
    this.currentLang = localStorage.getItem('app_language') || 'it';
    
    try {
      const response = await fetch(`i18n/${this.currentLang}.json`);
      if (response.ok) {
        this.translations[this.currentLang] = await response.json();
      } else {
        throw new Error('File non trovato');
      }
    } catch (error) {
      this.translations[this.currentLang] = this.inlineTranslations[this.currentLang];
    }
    
    this.updateUI();
    
    const langSelect = document.getElementById('language-select');
    if (langSelect) {
      langSelect.value = this.currentLang;
      langSelect.addEventListener('change', (e) => this.changeLanguage(e.target.value));
    }
  },
  
  t(key) {
    const keys = key.split('.');
    let value = this.translations[this.currentLang];
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return key;
      }
    }
    
    return value || key;
  },
  
  async changeLanguage(lang) {
    this.currentLang = lang;
    localStorage.setItem('app_language', lang);
    
    if (!this.translations[lang]) {
      try {
        const response = await fetch(`i18n/${lang}.json`);
        if (response.ok) {
          this.translations[lang] = await response.json();
        } else {
          throw new Error('File non trovato');
        }
      } catch (error) {
        this.translations[lang] = this.inlineTranslations[lang];
      }
    }
    
    this.updateUI();
    document.documentElement.lang = lang;
  },
  
  updateUI() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      el.textContent = this.t(key);
    });
    
    document.querySelectorAll('[data-i18n-attr]').forEach(el => {
      const attrs = el.getAttribute('data-i18n-attr').split(';');
      attrs.forEach(attr => {
        const [attrName, key] = attr.split(':');
        if (attrName && key) {
          el.setAttribute(attrName.trim(), this.t(key.trim()));
        }
      });
    });
    
    document.title = this.t('app_title');
    
    // Aggiorna placeholder delle righe ingredienti esistenti
    if (typeof aggiornaPlaceholderRighe === 'function') {
      aggiornaPlaceholderRighe();
    }
    
    // Aggiorna le card delle ricette salvate se visibili
    const listaRicette = document.getElementById('lista-ricette-pagina');
    if (listaRicette && listaRicette.children.length > 0) {
      if (typeof mostraRicetteSalvate === 'function') {
        mostraRicetteSalvate();
      }
    }
  }
};


// ======================================================
// 1. COSTANTI E CONFIGURAZIONE
// ======================================================

const UNITA = {
  g:   { tipo: "peso",   base: "g",  fattore: 1 },
  kg:  { tipo: "peso",   base: "g",  fattore: 1000 },
  ml:  { tipo: "volume", base: "ml", fattore: 1 },
  l:   { tipo: "volume", base: "ml", fattore: 1000 },
  pz:  { tipo: "pezzi",  base: "pz", fattore: 1 },
  qb:  { tipo: "qb",     base: "qb", fattore: 1 }
};

const DECIMALI_UNITA = {
  g: 0,
  ml: 0,
  kg: 2,
  l: 2,
  pz: 1,
  qb: null
};

const LIMITI_PORZIONI = {
  MIN: 1,
  MAX: 99
};

const CONFIG_SWIPE = {
  ZONA_DESTRA_RATIO: 0.5,
  MAX_SWIPE_RATIO: 0.4,
  SOGLIA_ELIMINAZIONE: 0.6,
  SOGLIA_MOVIMENTO: 10,
  SOGLIA_VERTICALE_RATIO: 1.2
};

const CONFIG_DRAG = {
  GAP_CARD: 10,
  ZONA_AUTO_SCROLL: 80,
  VELOCITA_SCROLL_MAX: 10
};

const TIMING = {
  DURATA_BANNER: 3000,
  ANIMAZIONE_FADE: 600,
  ANIMAZIONE_PULSE: 600,
  RITARDO_EDIT_EXIT: 100,
  PADDING_SCROLL_CURSOR: 12
};

const UI = {
  LARGHEZZA_MENU: "-260px"
};

const STORAGE_KEYS = {
  RICETTE: "ricette"
};


// ======================================================
// 2. UTILITY - Parsing e Conversioni
// ======================================================

function leggiNumero(valore) {
  if (valore === "") return NaN;
  const normalizzato = valore.replace(",", ".");
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
  if (decimali === null || decimali === undefined) return "";
  return Number(valore.toFixed(decimali));
}


// ======================================================
// 3. UTILITY - DOM e Scroll
// ======================================================

function getScrollbarWidth() {
  return window.innerWidth - document.documentElement.clientWidth;
}

function placeCaretAtEnd(el) {
  const range = document.createRange();
  range.selectNodeContents(el);
  range.collapse(false);
  const sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
}

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

function enableAutoScrollOnEdit(el) {
  el.addEventListener("keyup", () => autoScrollCursor(el));
  el.addEventListener("click", () => autoScrollCursor(el));
}

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

function mostraErroreNumero(input) {
  input.classList.add("input-errore");
  let msg = input.parentElement.querySelector(".messaggio-errore");
  if (!msg) {
    msg = document.createElement("div");
    msg.className = "messaggio-errore";
    msg.textContent = i18n.t('messages.invalid_number');
    input.parentElement.appendChild(msg);
  }
  msg.style.display = "block";
}

function nascondiErroreNumero(input) {
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
    msg.textContent = i18n.t('messages.inconsistent_units');
    campo.appendChild(msg);
  }
  msg.style.display = "block";
}

function rimuoviErroreUnita(riga) {
  const selectHai = riga.querySelector(".unita-hai");
  selectHai.classList.remove("select-errore");
  const msg = riga.querySelector(".errore-unita");
  if (msg) msg.style.display = "none";
}

function mostraErroreNomeIngrediente(input) {
  input.classList.add("input-errore");
  let errore = input.parentElement.querySelector(".errore-nome");
  if (!errore) {
    errore = document.createElement("div");
    errore.className = "errore errore-nome";
    errore.textContent = i18n.t('messages.invalid_ingredient');
    input.parentElement.appendChild(errore);
  }
}

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

function aggiornaStatoInputQB(riga) {
  const selectQuantita = riga.querySelector(".unita");
  const inputQuantita = riga.querySelector(".originale");
  const selectHai = riga.querySelector(".unita-hai");
  const inputHai = riga.querySelector(".disponibile");

  if (selectQuantita.value === "qb") {
    inputQuantita.value = "";
    inputQuantita.placeholder = i18n.t('units.qb');
    inputQuantita.disabled = true;
    nascondiErroreNumero(inputQuantita);

    selectHai.value = "qb";
    selectHai.disabled = true;
    inputHai.value = "";
    inputHai.placeholder = i18n.t('units.qb');
    inputHai.disabled = true;
    nascondiErroreNumero(inputHai);
  } else {
    inputQuantita.disabled = false;
    inputQuantita.placeholder = i18n.t('calculator.quantity_placeholder');
    inputHai.disabled = false;
    inputHai.placeholder = i18n.t('calculator.you_have_placeholder');
    selectHai.disabled = false;
  }
}

function aggiornaStatoQBPopup(riga) {
  const select = riga.querySelector(".popup-unita");
  const input = riga.querySelector(".popup-quantita");

  if (select.value === "qb") {
    input.value = "";
    input.placeholder = i18n.t('units.qb');
    input.disabled = true;
    input.classList.remove("input-errore");
  } else {
    input.disabled = false;
    input.placeholder = i18n.t('calculator.quantity_placeholder');
  }
}


// ======================================================
// 7. COMPONENTI - Righe Ingredienti
// ======================================================

function aggiungiRiga(nome = "", originale = "", unita = "g", hai = "", unitaHai = "g") {
  const contenitore = document.getElementById("ingredienti");
  const riga = document.createElement("div");
  riga.className = "riga";

  riga.innerHTML = `
    <button class="remove" onclick="this.parentElement.remove()">−</button>
    <input class="nome" placeholder="${i18n.t('calculator.ingredient_placeholder')}" value="${nome}">
    <div class="campo-unita quantita">
      <input class="originale" type="text" inputmode="decimal" pattern="[0-9.,]*" 
             placeholder="${i18n.t('calculator.quantity_placeholder')}" value="${originale != null ? originale : ""}">
      <select class="unita">
        <option value="g">g</option>
        <option value="kg">kg</option>
        <option value="ml">ml</option>
        <option value="l">l</option>
        <option value="pz">${i18n.t('units.pz')}</option>
        <option value="qb">${i18n.t('units.qb')}</option>
      </select>
    </div>
    <div class="campo-unita tu-hai">
      <input class="disponibile" type="text" inputmode="decimal" pattern="[0-9.,]*" 
             placeholder="${i18n.t('calculator.you_have_placeholder')}" value="${hai != null ? hai : ""}">
      <select class="unita-hai">
        <option value="g">g</option>
        <option value="kg">kg</option>
        <option value="ml">ml</option>
        <option value="l">l</option>
        <option value="pz">${i18n.t('units.pz')}</option>
        <option value="qb">${i18n.t('units.qb')}</option>
      </select>
    </div>
  `;

  contenitore.appendChild(riga);

  const nomeInput = riga.querySelector(".nome");
  nomeInput.addEventListener("input", () => {
    nomeInput.classList.remove("input-errore");
    const errore = nomeInput.parentElement.querySelector(".errore-nome");
    if (errore) errore.remove();
  });

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

function creaRigaIngredientePopup(ing = {}) {
  const riga = document.createElement("div");
  riga.className = "popup-riga";

  riga.innerHTML = `
    <button class="remove">−</button>
    <div class="popup-col popup-col-nome">
      <input class="popup-nome" placeholder="${i18n.t('calculator.ingredient_placeholder')}" value="${ing.nome ?? ""}">
      <div class="popup-errore popup-errore-nome"></div>
    </div>
    <div class="popup-col popup-col-qta">
      <div class="popup-campo-unita">
        <input type="text" class="popup-quantita" inputmode="decimal" pattern="[0-9.,]*" 
               placeholder="${i18n.t('calculator.quantity_placeholder')}" value="${ing.originale ?? ""}">
        <select class="popup-unita">
          <option value="g">g</option>
          <option value="kg">kg</option>
          <option value="ml">ml</option>
          <option value="l">l</option>
          <option value="pz">${i18n.t('units.pz')}</option>
          <option value="qb">${i18n.t('units.qb')}</option>
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

  const porzioni = leggiPorzioniCalcolatore();
  let fattorePorzioni = null;

  if (porzioni.sarebbe.valore !== null && porzioni.vorrei.valore !== null) {
    fattorePorzioni = porzioni.vorrei.valore / porzioni.sarebbe.valore;
  }

  let fattori = [];
  if (rapporti.length > 0) {
    fattori.push(Math.min(...rapporti));
  }
  if (fattorePorzioni !== null) {
    fattori.push(fattorePorzioni);
  }

  if (fattori.length === 0) {
    alert(i18n.t('messages.no_quantity'));
    return;
  }

  const fattore = Math.min(...fattori);

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
    mostraBanner(i18n.t('messages.ingredients_insufficient'));
  }
}

function resetQuantita() {
  const conferma = confirm(i18n.t('messages.confirm_reset'));
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

    if (!nome && !valoreRaw) {
      resetErroriRiga(riga);
      return;
    }

    if (!nome && valoreRaw) {
      mostraErroreNomeIngrediente(nomeInput);
      erroreIngrediente = true;
      return;
    }

    if (nome && !valoreRaw && unita !== "qb") {
      mostraErroreNumero(originaleInput);
      erroreIngrediente = true;
      return;
    }

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

function salvaRicetta() {
  const inputNome = document.getElementById("nomeRicetta");
  const nome = inputNome.value.trim();

  inputNome.classList.remove("error");
  const errorEl = document.getElementById("nome-ricetta-error");
  if (errorEl) errorEl.textContent = "";

  if (!nome) {
    inputNome.classList.add("error");
    errorEl.textContent = i18n.t('messages.recipe_name_empty');
    return;
  }

  if (nomeGiaEsistente(nome)) {
    inputNome.classList.add("error");
    errorEl.textContent = i18n.t('messages.recipe_name_duplicate');
    return;
  }

  const porzioniCalc = leggiPorzioniCalcolatore();
  const ingredienti = leggiRicettaDaUI();
  if (!ingredienti) return;

  if (ingredienti.length === 0) {
    alert(i18n.t('messages.no_ingredient'));
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
  mostraBanner(i18n.t('messages.recipe_saved'));
}

function nomeGiaEsistente(nome, currentId) {
  const ricette = JSON.parse(localStorage.getItem(STORAGE_KEYS.RICETTE)) || [];
  return ricette.some(
    r => r.nome.toLowerCase() === nome.toLowerCase() && r.id !== currentId
  );
}

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

function eliminaRicetta(id) {
  let ricette = JSON.parse(localStorage.getItem(STORAGE_KEYS.RICETTE)) || [];
  ricette = ricette.filter(r => r.id !== id);
  localStorage.setItem(STORAGE_KEYS.RICETTE, JSON.stringify(ricette));
  mostraRicetteSalvate();
}

function togglePreferito(id) {
  const ricette = JSON.parse(localStorage.getItem(STORAGE_KEYS.RICETTE)) || [];
  const ricetta = ricette.find(r => r.id === id);
  if (!ricetta) return;
  ricetta.preferita = !ricetta.preferita;
  localStorage.setItem(STORAGE_KEYS.RICETTE, JSON.stringify(ricette));
  mostraRicetteSalvate();
}

function salvaOrdineDaDOM() {
  const filtro = leggiFiltroRicette();
  if (filtro) {
    return;
  }
  
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

function leggiFiltroRicette() {
  const input = document.getElementById("ricette-search-input");
  return input ? input.value.trim().toLowerCase() : "";
}

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
  
  // Mappatura tipo porzioni per traduzione
  const tipoPorzioniMap = {
    'porzioni': 'portions',
    'persone': 'people',
    'pezzi': 'pieces'
  };
  const tipoPorzioniKey = tipoPorzioniMap[ricetta.tipoPorzioni] || 'portions';

  card.innerHTML = `
    <div class="card-main">
      <div class="card-header">
        <span class="drag-handle">⠿</span>
        <div class="card-title-wrapper">
          <div class="card-title">
            <span class="ricetta-nome">${ricetta.nome}</span>
            <span class="edit-nome" title="${i18n.t('saved_recipes.edit_name_title')}">✏️</span>
          </div>
          <div class="nome-error"></div>
        </div>
        <span class="ricetta-star ${ricetta.preferita ? "attiva" : ""}">★</span>
        <span class="ricetta-porzioni">x${ricetta.porzioni ?? LIMITI_PORZIONI.MIN} <span data-i18n="calculator.${tipoPorzioniKey}">${i18n.t('calculator.' + tipoPorzioniKey)}</span></span>
      </div>
      <div class="card-link">
        ${ricetta.link ? `<a href="${ricetta.link}" target="_blank">${ricetta.link}</a>` : ""}
      </div>
    </div>
    <button class="btn-carica">${i18n.t('saved_recipes.load_button')}</button>
  `;

  wrapper.append(deleteBg, card);

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
      
      const card = wrapper.querySelector(".ricetta-card");
      abilitaSwipe(wrapper, card);
      abilitaDrag(wrapper);
    });
  });
}


// ======================================================
// 12. INTERAZIONI - Modifica Nome
// ======================================================

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
      mostraErrore(i18n.t('messages.invalid_recipe_name'));
      nomeEl.textContent = originalName;
      setTimeout(() => nomeEl.focus(), 10);
      return;
    }

    if (nomeGiaEsistente(nuovoNome, id)) {
      mostraErrore(i18n.t('messages.recipe_name_exists'));
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

function impostaNomeRicettaCalcolatore(nome) {
  const el = document.getElementById("nomeRicetta");
  if (!el) return;
  el.value = nome;
}

function caricaRicettaDaPagina(id) {
  vaiAPagina("home", i18n.t('app_title'));

  document.querySelectorAll(".riga").forEach(r => r.remove());

  const ricette = JSON.parse(localStorage.getItem(STORAGE_KEYS.RICETTE)) || [];
  const ricetta = ricette.find(r => r.id === id);

  if (!ricetta) {
    alert(i18n.t('messages.recipe_not_found'));
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
      if (confirm(i18n.t('messages.confirm_delete'))) {
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
      erroreNomeEl.textContent = i18n.t('messages.invalid_ingredient');
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
      erroreQtaEl.textContent = i18n.t('messages.invalid_quantity');
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

function chiudiPopupRicetta() {
  document.getElementById("popup-overlay").classList.add("hidden");
  document.body.classList.remove("no-scroll");
  ricettaCorrenteId = null;
}


// ======================================================
// 17. NAVIGAZIONE - Menu e Pagine
// ======================================================

function apriMenu() {
  document.querySelector(".menu").style.left = "0";
  document.querySelector(".overlay").style.display = "block";
  document.body.classList.add("no-scroll");
}

function chiudiMenu() {
  document.querySelector(".menu").style.left = UI.LARGHEZZA_MENU;
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
  window.scrollTo({ top: 0, behavior: "instant" });

  if (idPagina === "ricette") {
    mostraRicetteSalvate();
  }
}


// ======================================================
// 18. INIZIALIZZAZIONE
// ======================================================

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

function forzaValoreMinimoSarebbe() {
  const inputSarebbe = document.querySelector('.input-sarebbe-num');
  if (!inputSarebbe) return;

  inputSarebbe.addEventListener('blur', function() {
    if (this.value === '' || parseInt(this.value) < LIMITI_PORZIONI.MIN || isNaN(parseInt(this.value))) {
      this.value = LIMITI_PORZIONI.MIN;
    }
  });
}

function resetAutoChangedVorrei() {
  document.addEventListener("input", e => {
    const input = e.target;
    if (!input.classList.contains("input-vorrei-num")) return;

    input.classList.remove("auto-changed");
    input.classList.remove("pulse");
    delete input.dataset.pulsed;
  });
}

function limitaInputPorzioni() {
  limitaValoriMinMax();
  bloccaTastiNonConsentiti();
  sincronizzaSelectPorzioni();
  forzaValoreMinimoSarebbe();
  resetAutoChangedVorrei();
}

// Funzione per aggiornare i placeholder delle righe esistenti
function aggiornaPlaceholderRighe() {
  document.querySelectorAll('.riga').forEach(riga => {
    const nomeInput = riga.querySelector('.nome');
    const originaleInput = riga.querySelector('.originale');
    const disponibileInput = riga.querySelector('.disponibile');
    
    if (nomeInput && !nomeInput.value) {
      nomeInput.placeholder = i18n.t('calculator.ingredient_placeholder');
    }
    
    if (originaleInput && !originaleInput.disabled) {
      originaleInput.placeholder = i18n.t('calculator.quantity_placeholder');
    }
    
    if (disponibileInput && !disponibileInput.disabled) {
      disponibileInput.placeholder = i18n.t('calculator.you_have_placeholder');
    }
    
    // Aggiorna anche le opzioni pz e q.b.
    const selectOrig = riga.querySelector('.unita');
    const selectHai = riga.querySelector('.unita-hai');
    
    if (selectOrig) {
      const pzOption = selectOrig.querySelector('option[value="pz"]');
      if (pzOption) pzOption.textContent = i18n.t('units.pz');
      
      const qbOption = selectOrig.querySelector('option[value="qb"]');
      if (qbOption) qbOption.textContent = i18n.t('units.qb');
    }
    
    if (selectHai) {
      const pzOption = selectHai.querySelector('option[value="pz"]');
      if (pzOption) pzOption.textContent = i18n.t('units.pz');
      
      const qbOption = selectHai.querySelector('option[value="qb"]');
      if (qbOption) qbOption.textContent = i18n.t('units.qb');
    }
  });
}

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

// Inizializza i18n quando il DOM è pronto
document.addEventListener('DOMContentLoaded', async () => {
  await i18n.init();
  
  // Crea righe iniziali DOPO l'inizializzazione di i18n
  aggiungiRiga();
  aggiungiRiga();
});





// FUORI CODICE ==================================================

if ("serviceWorker" in navigator) {
  const CURRENT_VERSION = "ricette-v3.9"; // Deve corrispondere alla versione nel service-worker.js
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









