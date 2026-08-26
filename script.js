// ==========================================
// 1. VARIABLES & MANIPULATION DU TITRE (DOM)
// ==========================================
const titre = document.querySelector("h1");
let estModifie = false;

if (titre) {
    titre.addEventListener("click", function() {
        if (!estModifie) {
            titre.textContent = "Bienvenue sur le portfolio de Rawane !";
            titre.style.color = "#27ae60";
            estModifie = true;
        } else {
            titre.textContent = "Rawane Koné Niassy - Développeur Web & IA";
            titre.style.color = "#2c3e50";
            estModifie = false;
        }
    });
}

// ==========================================
// 2. GESTION DU FORMULAIRE DE CONTACT
// ==========================================
const formulaire = document.querySelector("form");
const champNom = document.querySelector("#nom");

if (formulaire) {
    formulaire.addEventListener("submit", function(e) {
        e.preventDefault();
        const prenomVisiteur = champNom ? champNom.value.trim() : "";

        if (prenomVisiteur !== "") {
            alert(`Merci ${prenomVisiteur} ! Ton message a bien été envoyé.`);
            formulaire.reset();
        } else {
            alert("S'il te plaît, entre ton prénom avant d'envoyer !");
        }
    });
}

// ==========================================
// 3. INJECTION DE LA LISTE DE COMPÉTENCES
// ==========================================
const competencesTechniques = ["HTML5 / CSS3", "JavaScript Moderne", "Algorithmique & Python", "Git & GitHub"];
const listeHTML = document.querySelector("#liste-dynamique");

if (listeHTML) {
    listeHTML.innerHTML = ""; // Nettoyage de sécurité
    for (let techno of competencesTechniques) {
        const nouvelElement = document.createElement("li");
        nouvelElement.textContent = techno;
        listeHTML.appendChild(nouvelElement);
    }
}

// ==========================================
// 4. INJECTION DES PROJETS À VENIR
// ==========================================
const mesProjetsAVenir = [
    "Portfolio Web Personnel",
    "Plateforme d'échange de ressources",
    "Application d'IA pour la gestion de projets"
];
const listeProjetsHTML = document.querySelector("#liste-projets");

if (listeProjetsHTML) {
    listeProjetsHTML.innerHTML = "";
    for (let projet of mesProjetsAVenir) {
        const elementLi = document.createElement("li");
        elementLi.textContent = projet;
        listeProjetsHTML.appendChild(elementLi);
    }
}

// ==========================================
// 5. LOCALSTORAGE & PERSISTANCE DE VISITEUR
// ==========================================
const nomSauvegarde = localStorage.getItem("prenomVisiteur");
if (nomSauvegarde) {
    console.log("Ravi de te revoir, " + nomSauvegarde + " !");
} else {
    localStorage.setItem("prenomVisiteur", "Rawane");
}

// ==========================================
// 6. GESTION DYNAMIQUE DES PROJETS & FAVORIS
// ==========================================
const mesProjetsComplets = [
    {
        id: "p1",
        titre: "Portfolio Web Personnel",
        techno: "HTML5, CSS3 & JavaScript",
        description: "Mon site vitrine interactif pour présenter mes compétences et objectifs."
    },
    {
        id: "p2",
        titre: "Plateforme d'Échange de Ressources",
        techno: "Python & Web",
        description: "Site web multinational pour le partage de ressources éducatives."
    },
    {
        id: "p3",
        titre: "Assistant IA de Gestion",
        techno: "Python, IA & Web",
        description: "Application intelligente d'aide à la gestion de projets personnels."
    }
];

let favorisEnregistres = JSON.parse(localStorage.getItem("projetsFavoris")) || [];
const conteneurProjets = document.querySelector("#conteneur-projets");

function afficherProjets() {
    if (!conteneurProjets) return;
    conteneurProjets.innerHTML = "";

    for (let projet of mesProjetsComplets) {
        const carte = document.createElement("div");
        carte.classList.add("carte");
        carte.style.marginBottom = "15px";

        const estEnFavori = favorisEnregistres.includes(projet.id);

        carte.innerHTML = `
            <h3 style="color: #27ae60; margin-top: 0;">${projet.titre}</h3>
            <p><strong>Technologies :</strong> ${projet.techno}</p>
            <p>${projet.description}</p>
        `;

        const boutonFavori = document.createElement("button");
        boutonFavori.style.cursor = "pointer";
        boutonFavori.style.padding = "8px 12px";
        boutonFavori.style.marginTop = "10px";

        if (estEnFavori) {
            boutonFavori.textContent = "❤️ Enregistré dans mes Favoris";
            boutonFavori.style.backgroundColor = "#e74c3c";
            boutonFavori.style.color = "white";
        } else {
            boutonFavori.textContent = "🤍 Ajouter aux Favoris";
            boutonFavori.style.backgroundColor = "#f1f1f1";
            boutonFavori.style.color = "#333";
        }

        boutonFavori.addEventListener("click", function() {
            if (favorisEnregistres.includes(projet.id)) {
                favorisEnregistres = favorisEnregistres.filter(id => id !== projet.id);
            } else {
                favorisEnregistres.push(projet.id);
            }

            localStorage.setItem("projetsFavoris", JSON.stringify(favorisEnregistres));
            afficherProjets();
        });

        carte.appendChild(boutonFavori);
        conteneurProjets.appendChild(carte);
    }
}

afficherProjets();

// ==========================================
// 7. SEMAINE 6 : REQUÊTE HTTP ASYNCHRONE (API FETCH)
// ==========================================

// Sélection des éléments HTML de la carte Citation
const texteCitation = document.querySelector("#texte-citation");
const auteurCitation = document.querySelector("#auteur-citation");
const btnCitation = document.querySelector("#btn-citation");

async function chargerNouvelleCitationAPI() {
    if (!texteCitation || !btnCitation) return;

    // 1. État de chargement (UX)
    btnCitation.disabled = true;
    texteCitation.textContent = "🌐 Connexion au serveur distant...";
    if (auteurCitation) auteurCitation.textContent = "";

    try {
        // 2. Appel de l'API publique
        const reponse = await fetch("https://dummyjson.com/quotes/random");

        // 3. Extraction du JSON
        const citation = await reponse.json();

        // 4. Injection dans le DOM
        texteCitation.textContent = `"${citation.quote}"`;
        if (auteurCitation) auteurCitation.textContent = `- ${citation.author}`;

    } catch (erreur) {
        texteCitation.textContent = "⚠️ Impossible de se connecter au serveur distant.";
        console.error("Erreur Fetch :", erreur);
    } finally {
        btnCitation.disabled = false;
    }
}

// Association de l'événement clic
if (btnCitation) {
    btnCitation.onclick = chargerNouvelleCitationAPI;
}

// Chargement automatique au lancement de la page
chargerNouvelleCitationAPI();

// ==========================================
// 8. TEST MANUEL DES MÉTHODES JSON
// ==========================================
const profilRawane = {
    nom: "Rawane Koné Niassy",
    role: "Développeur Web & IA",
    statut: "Étudiant MPCI"
};

const donnesJSON = JSON.stringify(profilRawane);
console.log("Texte JSON :", donnesJSON);

const objetConverti = JSON.parse(donnesJSON);
console.log("Objet JS reconverti :", objetConverti.nom);