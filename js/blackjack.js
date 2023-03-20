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

function sleep(milliseconds){
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}


// Variables globales
let playerCards = []; // Tableau contenant les cartes du joueur
let croupierCards = []; // Tableau contenant les cartes du croupier
let packet = []; // Tableau contenant les cartes du paquet

let allReady = false; // Booléen indiquant si le jeu est déjà distribué
let attent = false; // Booléen indiquant si le joueur est en attente de la fin de l'animation
let etat = "en attente"; // Etat de la partie (en cours, gagné, perdu, égalité, en attente)

// Fonctions pack de cartes
function createPack() {
    let pack = [];
    let couleurs = ["heart", "diamonds", "spades", "clubs"];
    let valeurs = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
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
    let pack = [];
    pack = createPack();
    pack = shufflePack(pack);
    return pack;
}

// Fonctions resulats
function getCardValue(cards) {
    let value = 0;
    let hasAce = false;
    for (let i = 0; i < cards.length; i++) {
        if (cards[i].valeur === "1") {
            hasAce = true;
        }
        if (cards[i].valeur === "J" || cards[i].valeur === "Q" || cards[i].valeur === "K") {
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
async function startGame() {
    if (!allReady) {
        cleanBoard();
        cleanBoardCroupier();
        allReady = true;
        attent = true;
        if (packet.length < 10) {
            packet = reFillPack();
        }
        playerCards = distributeCards(packet, 1);
        createCarte();  
        croupierCards = distributeCards(packet, 1);
        spawnCarteCroupier(croupierCards[0].valeur, croupierCards[0].couleur, true);
        organiserCroupier();
        await sleep(500);
        playerCards.push(distributeCards(packet, 1)[0]);
        createCarte();
        croupierCards.push(distributeCards(packet, 1)[0]);
        spawnCarteCroupier(croupierCards[1].valeur, croupierCards[1].couleur, false);
        organiserCroupier();
        await sleep(1000);
        recupCarte();
        await sleep(1000);
        spawnCarteMain(playerCards[0].valeur, playerCards[0].couleur, 0);
        spawnCarteMain(playerCards[1].valeur, playerCards[1].couleur, 1);
        organiser();
        attent = false;

        afficheCards(playerCards, "joueur");
        afficheCards(croupierCards, "cache");

        if (blackjack(playerCards) && blackjack(croupierCards)) {
            returnCarte();
            organiserCroupier();
            finish("égalité");
            allReady = false;
        } else if (blackjack(playerCards)) {
            returnCarte();
            organiserCroupier();
            finish("gagné");
            allReady = false;
        } else if (blackjack(croupierCards)) {
            returnCarte();
            organiserCroupier();
            finish("perdu");
            allReady = false;
        }
    } else {
        console.log("La partie est déjà lancée !")
    }
}

async function hit() {
    if (attent) return;
    if (allReady) {
        attent = true;
        playerCards.push(distributeCards(packet, 1)[0]);
        createCarte();
        afficheCards(playerCards, "joueur");
        if (bust(playerCards)) {
            finish("perdu");
            allReady = false;
        } else if (blackjack(playerCards)) {
            stand();
        }
        await sleep(1000);
        recupCarte();
        await sleep(1000);
        spawnCarteMain(playerCards[playerCards.length - 1].valeur, playerCards[playerCards.length - 1].couleur, playerCards.length - 1);
        organiser();
        attent = false;
    }
}

async function stand() {
    if (allReady) {
        returnCarte();
        organiserCroupier();
        await sleep(1000);
        while (getCardValue(croupierCards) < 17) {
            croupierCards.push(distributeCards(packet, 1)[0]);
            spawnCarteCroupier(croupierCards[croupierCards.length - 1].valeur, croupierCards[croupierCards.length - 1].couleur, false);
            organiserCroupier();
            await sleep(1000);
        }
        if (bust(croupierCards)) {
            finish("gagné");
        } else if (blackjack(croupierCards) && blackjack(playerCards) === false) {
            finish("perdu");
        } else if (getCardValue(playerCards) > getCardValue(croupierCards)) {
            finish("gagné");
        } else if (getCardValue(playerCards) < getCardValue(croupierCards)) {
            finish("perdu");
        } else {
            finish("égalité");
        }
        afficheCards(playerCards, "joueur");
        afficheCards(croupierCards, "croupier");
        allReady = false;
    }
}

function double() {
    if (attent) return;
    if (playerCards.length === 2) {
        if (allReady) {
            hit();
            if (allReady) {
                stand();
            }
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

function finish(win) {
    console.log("Résultat : " + win);
}