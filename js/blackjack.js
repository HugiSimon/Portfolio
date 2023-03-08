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

let playerCards = [];

function AfficheCardsPlayer() {
    console.log(playerCards);
}

function createPack() {
    let pack = [];
    let couleurs = ["coeur", "carreau", "pique", "trefle"];
    let valeurs = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "V", "D", "R"];
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

function getCardValue(card) {
    if (card.valeur === "A") {
        return 11; // A modifier pour le cas où la valeur de l'as est 1
    } else if (card.valeur === "V" || card.valeur === "D" || card.valeur === "R") {
        return 10;
    } else {
        return parseInt(card.valeur);
    }
}

function main() {
    let pack = createPack();
    pack = shufflePack(pack);
    playerCards = distributeCards(pack, 2);
    let score = 0;
    for (let i = 0; i < playerCards.length; i++) {
        console.log(playerCards[i].couleur + " " + playerCards[i].valeur);
        score += getCardValue(playerCards[i]);
    }
    console.log(score);
}