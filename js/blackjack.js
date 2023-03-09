// Class 
class Carte {
    constructor(couleur, valeur) {
        this.couleur = couleur;
        this.valeur = valeur;
    }
}

class Project {
    constructor(titre, description, sorti, image, lien) {
        this.titre = titre;
        this.description = description;
        this.sorti = sorti;
        this.image = image;
        this.lien = lien;
    }
}

class ProjectInCarte {
    constructor(carte, project) {
        this.carte = carte;
        this.project = project;
    }
}

// Variables globales
let playerCards = []; // Tableau contenant les cartes du joueur
let croupierCards = []; // Tableau contenant les cartes du croupier
let packet = []; // Tableau contenant les cartes du paquet

let allReady = false; // Booléen indiquant si le jeu est déjà distribué


// Fonctions pack de cartes
function createPack() {
    let pack = [];
    let couleurs = ["coeur", "carreau", "pique", "trefle"];
    let valeurs = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "V", "D", "R"];
    for (let i = 0; i < couleurs.length; i++) {
        for (let j = 0; j < valeurs.length; j++) {
            pack.push(new Carte(couleurs[i], valeurs[j]));
        }
    }
    return pack;
}

function shufflePack(pack) {
    let shuffledPack = [];
    let randomIndex;
    while (pack.length > 0) {
        randomIndex = Math.floor(Math.random() * pack.length);
        shuffledPack.push(pack[randomIndex]);
        pack.splice(randomIndex, 1);
    }
    return shuffledPack;
}

function distributeCards(pack, n) {
    let cards = [];
    for (let i = 0; i < n; i++) {
        cards.push(pack.pop());
    }
    return cards;
}

function reFillPack() {
    packet = createPack();
    packet = shufflePack(packet);
}

// Fonctions resulats
function getCardValue(cards) {
    let value = 0;
    let hasAce = false;
    for (let i = 0; i < cards.length; i++) {
        if (cards[i].valeur === "1") {
            hasAce = true;
        }
        if (cards[i].valeur === "V" || cards[i].valeur === "D" || cards[i].valeur === "R") {
            value += 10;
        } else {
            value += parseInt(cards[i].valeur);
        }
    }
    if (hasAce && value < 12) {
        value += 10;
    }
    return value;
}


function bust(cards) {
    return getCardValue(cards) > 21;
}

function blackjack(cards) {
    return getCardValue(cards) === 21;
}


// Fonctions jeu
function startGame() {
    if (!allReady) {
        if (packet.length < 10) {
            reFillPack();
        }
        playerCards = distributeCards(packet, 1);
        croupierCards = distributeCards(packet, 1);
        playerCards.push(distributeCards(packet, 1)[0]);
        croupierCards.push(distributeCards(packet, 1)[0]);
        allReady = true;

        afficheCards(playerCards, "joueur");
        afficheCards(croupierCards, "cache");

        if (blackjack(playerCards) && blackjack(croupierCards)) {
            console.log("Égalité !")
            allReady = false;
        } else if (blackjack(playerCards)) {
            console.log("Blackjack ! Vous avez gagné !")
            allReady = false;
        } else if (blackjack(croupierCards)) {
            console.log("Blackjack ! Le croupier a gagné !")
            allReady = false;
        }
    } else {
        console.log("La partie est déjà lancée !")
    }
}

function hit() {
    if (allReady) {
        playerCards.push(distributeCards(packet, 1)[0]);
        afficheCards(playerCards, "joueur");
        if (bust(playerCards)) {
            console.log("Vous avez perdu !")
            allReady = false;
        } else if (blackjack(playerCards)) {
            console.log("Blackjack ! Vous avez gagné !")
            allReady = false;
        }
    }
}

function stand() {
    if (allReady) {
        while (getCardValue(croupierCards) < 17) {
            croupierCards.push(distributeCards(packet, 1)[0]);
        }
        if (bust(croupierCards)) {
            console.log("Le croupier a perdu !")
        } else if (blackjack(croupierCards)) {
            console.log("Blackjack ! Le croupier a gagné !")
        } else if (getCardValue(playerCards) > getCardValue(croupierCards)) {
            console.log("Vous avez gagné !")
        } else if (getCardValue(playerCards) < getCardValue(croupierCards)) {
            console.log("Vous avez perdu !")
        } else {
            console.log("Egalité !")
        }
        afficheCards(playerCards, "joueur");
        afficheCards(croupierCards, "croupier");
        allReady = false;
    }
}

function double() {
    if (allReady) {
        hit();
        if (allReady) {
            stand();
        }
    }
}

// Fonction affichage
function afficheCards(cards, etat) {
    let text = "";
    if (etat === "joueur") {
        text = "Vous avez : "
        for (let i = 0; i < cards.length; i++) {
            text += cards[i].valeur + " de " + cards[i].couleur + ", ";
        }
        text += "pour un total de " + getCardValue(cards) + " points.";
    }
    if (etat === "croupier") {
        text = "Le croupier a : "
        for (let i = 0; i < cards.length; i++) {
            text += cards[i].valeur + " de " + cards[i].couleur + ", ";
        }
        text += "pour un total de " + getCardValue(cards) + " points.";
    }
    if (etat === "cache") {
        text = "Le croupier a : "
        text += cards[0].valeur + " de " + cards[0].couleur + " et une carte cachée, avec un score de " + getCardValue([cards[0]]) + " points.";
    }
    console.log(text);
}