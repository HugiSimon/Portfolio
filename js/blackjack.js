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
let premierTour = true; // Booléen indiquant si c'est le premier tour du joueur

let projet = [["Ropin' Thieves", "Ropin' Thieves est un jeu plateforme 2D où le but en duo est de passer toutes les salles qui regorgent de pièges et d'énigmes en s'aidant d'un grapin pour se déplacer", "2022", "TODO", "https://gaetan-piou.itch.io/ropin-thieves"],
              ["Emotions Driven", "Emotions Driven est un jeu de plateforme 2D avec différent type de gameplay qui accompagnent les émotions du joueur", "2022", "TODO", "https://hugosimon.itch.io/emotion-driven"],
              ["Casino Sourcils", "Casino Sourcils est une démonstration pour faire comuniquer Construct et la page web, et faire un système qui peut rendre accro", "2022", "TODO", "https://hugisimon.github.io/Casino_Sourcils/"],
              ["Rolquor", "[EN COURS] Rolquor est un logiciel destiné aux streamers pour jouer à des jeux de rôles en lignes tout en rendant le jeu assez joli pour les spectateurs", "2023", "TODO", "https://github.com/HugiSimon/Rolquor"]];
lesProjets = [];

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
        scoreReset();
        cleanBoard();
        cleanBoardCroupier();
        if (premierTour) {
            let lesProjets2 = projet;
            let randomIndex;
            while (lesProjets2.length > 0) {
                randomIndex = Math.floor(Math.random() * lesProjets2.length);
                lesProjets.push(lesProjets2[randomIndex]);
                lesProjets2.splice(randomIndex, 1);
            }
        }
        premierTour = false;
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
        score(true, false);
        await sleep(1000);
        recupCarte();
        await sleep(1000);
        spawnCarteMain(playerCards[0].valeur, playerCards[0].couleur, 0);
        spawnCarteMain(playerCards[1].valeur, playerCards[1].couleur, 1);
        organiser();
        score(true, true);
        attent = false;

        //afficheCards(playerCards, "joueur");
        //afficheCards(croupierCards, "cache");

        if (blackjack(playerCards) && blackjack(croupierCards)) {
            returnCarte();
            organiserCroupier();
            score(false, true);
            finish("égalité");
            allReady = false;
        } else if (blackjack(playerCards)) {
            returnCarte();
            organiserCroupier();
            score(false, true);
            finish("gagné");
            allReady = false;
        } else if (blackjack(croupierCards)) {
            returnCarte();
            organiserCroupier();
            score(false, true);
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
        await sleep(1000);
        recupCarte();
        await sleep(1000);
        spawnCarteMain(playerCards[playerCards.length - 1].valeur, playerCards[playerCards.length - 1].couleur, playerCards.length);
        organiser();
        score(true, true);
        //afficheCards(playerCards, "joueur");
        if (bust(playerCards)) {
            returnCarte();
            organiserCroupier();
            score(false, true);
            finish("perdu");
            allReady = false;
        } else if (blackjack(playerCards)) {
            stand();
        }
        attent = false;
    }
}

async function stand() {
    if (attent) return;
    if (allReady) {
        returnCarte();
        organiserCroupier();
        score(false, true);
        await sleep(1000);
        while (getCardValue(croupierCards) < 17) {
            croupierCards.push(distributeCards(packet, 1)[0]);
            spawnCarteCroupier(croupierCards[croupierCards.length - 1].valeur, croupierCards[croupierCards.length - 1].couleur, false);
            organiserCroupier();
            score(false, true);
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
        //afficheCards(playerCards, "joueur");
        //afficheCards(croupierCards, "croupier");
        allReady = false;
    }
}

async function double() {
    if (attent) return;
    if (playerCards.length === 2) {
        if (allReady) {
            hit();
            await sleep(2500);
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
        text += cards[1].valeur + " de " + cards[1].couleur + " et une carte cachée, avec un score de " + getCardValue([cards[1]]) + " points.";
    }
    console.log(text);
}

function finish(win) {
    console.log("Résultat : " + win);
}