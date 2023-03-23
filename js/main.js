function onLoad() {
    rectangleCarte();
    tailleJeu();
    carteDosProjet();
    fermerCote();
}

window.onresize = tailleJeu;

function tailleJeu() {
    document.getElementById("fond").style.height = window.innerHeight + "px";
}

function carteDosProjet() {
    let carteDiv = document.getElementsByClassName("lesCartesDos")[0];
    let pack = reFillPack();
    let card;
    let j = 0;
    for (let i = 0; i < 15; i++) {
        let carte = document.createElement("div");
        if (i === 1 || i === 5 || i === 9 || i === 13) {
            do {
                card = pack.pop();
            } while (card.valeur === "10" || card.valeur === "Q")
            carte.appendChild(document.createElement("p"))
            carte.lastChild.innerHTML = card.valeur;
            carte.lastChild.classList.add("num-cards");
            if (card.couleur === "heart" || card.couleur === "diamonds") {
                carte.lastChild.style.color = "red";
            }
            carte.appendChild(document.createElement("img"))
            carte.lastChild.src = "../img/" + card.couleur + ".png";
            carte.lastChild.classList.add("icon-cards");
            carte.style.marginTop = "60mm";
            carte.id = "carteProjet" + i;
            carte.appendChild(document.createElement("p"));
            carte.lastChild.innerHTML = projet[j][0];
            carte.lastChild.classList.add("nomProjet");
            carte.appendChild(document.createElement("div"));
            carte.lastChild.classList.add("separation");
            carte.appendChild(document.createElement("p"));
            let description = projet[j][1];
            if (description.length > 90) {
                description = description.substring(0, 90);
                let lastSpace = description.lastIndexOf(" ");
                description = description.substring(0, lastSpace) + "...";
            }
            description += " <a href='" + projet[j][4] + "'>En savoir plus</a>";
            carte.lastChild.innerHTML = description;
            carte.lastChild.classList.add("descriptionProjet");
            carte.appendChild(document.createElement("div"));
            carte.lastChild.classList.add("separation");
            carte.appendChild(document.createElement("img"));
            carte.lastChild.src = "../img/" + projet[j][0] + ".png" ;
            carte.lastChild.classList.add("imgProjet");
            carte.classList.add("carteProjet");
            j++;
        } else {
            carte.classList.add("dosProjet");
            carte.appendChild(document.createElement("img"));
            carte.lastChild.src = "../img/card-back.png";
            carte.lastChild.classList.add("dosProjet");
        }
        carte.style.left = i * 5.6666 + "%";
        carteDiv.appendChild(carte);
    }
}

function jeuCarteProjet(id, projet) {
    let carte = document.getElementById(id);
    carte.appendChild(document.createElement("p"));
    carte.lastChild.innerHTML = projet[0];
    carte.lastChild.classList.add("nomProjet");
    carte.appendChild(document.createElement("div"));
    carte.lastChild.classList.add("separation");
    carte.appendChild(document.createElement("p"));
    let description = projet[1];
    if (description.length > 90) {
        description = description.substring(0, 90);
        let lastSpace = description.lastIndexOf(" ");
        description = description.substring(0, lastSpace) + "...";
    }
    description += " <a href='#listeProjet'>En savoir plus</a>";
    carte.lastChild.innerHTML = description;
    carte.lastChild.classList.add("descriptionProjet");
    carte.appendChild(document.createElement("div"));
    carte.lastChild.classList.add("separation");
    carte.appendChild(document.createElement("img"));
    carte.lastChild.src = "../img/" + projet[0] + ".png" ;
    carte.lastChild.classList.add("imgProjet");
}

addEventListener("mousemove", function (e) {
    if (e.target.classList[0] !== "carteProjet") {return}
    if (e.target.style.animation === "hoverCarteProjet 1s forwards") {return}
    e.target.style.animation = "hoverCarteProjet 1s forwards";
    
    let carte = document.getElementsByClassName("carteProjet");
    for (let i = 0; i < carte.length; i++) {
        if (carte[i] !== e.target && carte[i].style.animation === "1s ease 0s 1 normal forwards running hoverCarteProjet") {
            carte[i].style.animation = "notHover 1s forwards";
        }
    }
});

function rectangleCarte() {
    let rectangle = document.getElementsByClassName("rectangle");
    let angle = 11;
    let left = 8;
    for (let i = 0; i < rectangle.length; i++) {
        rectangle[i].style.rotate = angle + "deg";
        angle -= 5.5;

        rectangle[i].style.left = left + "%";
        left += 18;

        if (i === 0 || i === 4) {
            rectangle[i].style.bottom = "14%";
        }
        if (i === 1 || i === 3) {
            rectangle[i].style.bottom = "7%";
        }
    }
}

function fermerCote() {
    document.getElementById("jetons").style.animation = "fermeCote 1s cubic-bezier( .42, 0, .58, 1 ) forwards";
    document.getElementById("jetonsFerme").style.animation = "btnFerme 1s forwards";
}

async function ouvrirCote() {
    document.getElementById("jetons").style.animation = "ouvreCote 1s cubic-bezier( .42, 0, .58, 1 ) forwards";
    document.getElementById("jetonsFerme").style.animation = "btnOuvre 1s forwards";
}

function circulise() {
    let texte = document.getElementsByClassName("circulise")[0];
    let texteArray = Array.from(texte.innerHTML);
    let texteArrayHTML = [];

    let rotate = 0;
    let rotateStep = 30 / texteArray.length;
    rotate = rotateStep * texteArray.length / 2;

    texte.remove();
    for (let i = 0; i < texteArray.length; i++) {
        texteArrayHTML[i] = document.createElement("h1");

        if (texteArray[i] === " ") {
            texteArrayHTML[i].innerHTML = "&nbsp;";
        } else {
            texteArrayHTML[i].innerHTML = texteArray[i];
        }

        texteArrayHTML[i].classList.add("cestCirculise");

        texteArrayHTML[i].style.rotate = rotate + "deg";
        rotate -= rotateStep;

        document.getElementById("leTitre").appendChild(texteArrayHTML[i]);
    }
}

function createCarte() {
    let carte = document.createElement("img");
    carte.src = "../img/card-back.png"
    carte.classList.add("carteDos");
    carte.style.bottom = "5%";

    carte.style.rotate = Math.floor(Math.random() * 10 - 5) + "deg";
    
    document.body.appendChild(carte);
    carte.style.animation = "carteDos 1s cubic-bezier(0.21, 0.83, 0.24, 1)";
}

async function recupCarte() {
    let carte = document.getElementsByClassName("carteDos");
    for (let i = 0; i < carte.length; i++) {
        carte[i].style.animation = "recupCarte 1s cubic-bezier(0.58, 0.24, 0.4, 1.01) forwards";
    }
}

function spawnCarteMain(num, val, combientieme) {
    let uneCarteNormal = true;
    if (lesProjets.length > 0) {
        if (Math.floor(Math.random() * 2) === 0) {
            uneCarteNormal = false;
        }
    } /*else {
        if (Math.floor(Math.random() * 10) === 0) {
            uneCarteNormal = false;
        }
    }*/

    let laCarte = document.createElement("div");

    laCarte.appendChild(document.createElement("p"));
    laCarte.children[0].innerHTML = num;

    if (num === "Q") {
        laCarte.children[0].style.marginLeft = "2px";
    }
    if (num === "10") {
        laCarte.children[0].style.marginLeft = "-3px";
    }

    laCarte.appendChild(document.createElement("img"));
    laCarte.children[1].src = "../img/" + val +".png";

    if (uneCarteNormal) {
        laCarte.appendChild(document.createElement("div"));
        laCarte.children[2].classList.add("icon-entre");
        laCarte.children[2].classList.add(num + "num");

        if (num === "J" || num === "Q" || num === "K") {
            laCarte.children[2].appendChild(document.createElement("img"));
            laCarte.children[2].children[0].src = "../img/" + num + " " + val + ".png";
            laCarte.children[2].children[0].classList.add("image-icon-entre");
        }

        laCarte.appendChild(document.createElement("img"));
        laCarte.children[3].src = "../img/" + val +".png";

        laCarte.appendChild(document.createElement("p"));
        laCarte.children[4].innerHTML = num;
    }

    if(val === "heart" || val === "diamonds") {
        laCarte.children[0].style.color = "#dc2021";
        if (uneCarteNormal) {
            laCarte.children[4].style.color = "#dc2021";
        }
    }

    laCarte.children[0].classList.add("num-cards");
    laCarte.children[1].classList.add("icon-cards");
    if (uneCarteNormal) {
        laCarte.children[3].classList.add("icon-cards-upside");
        laCarte.children[4].classList.add("num-cards-upside");
    }

    laCarte.classList.add("carteFace");
    laCarte.id = "carte" + combientieme;
    document.body.appendChild(laCarte);
    
    if (uneCarteNormal) {
        iconCentre(combientieme, val);
    } else {
        if (lesProjets.length > 0) {
            jeuCarteProjet("carte" + combientieme, lesProjets.pop());
        } else {
            jeuCarteProjet("carte" + combientieme, projet[Math.floor(Math.random() * projet.length)]);
        }
    }
    
}

function iconCentre(n, val) {
    //let num = parseInt(document.getElementsByClassName("icon-entre")[n].classList[1]);
    let num = parseInt(document.getElementById("carte" + n).children[2].classList[1]);
    let icons = [];
    for (let i = 0; i < num; i++) {
        let icon = document.createElement("img");
        icon.src = "../img/" + val + ".png";
        document.getElementById("carte" + n).children[2].appendChild(icon);
        icons.push(icon);
    }

    if (num === 1) {
        icons[0].style.left = "36%";
        icons[0].style.top = "40%";
    }
    if (num === 2 || num === 3) {
        icons[0].style.left = "36%";
        icons[0].style.top = "5%";
        icons[1].style.left = "36%";
        icons[1].style.top = "75%";
        icons[1].style.transform = "rotate(180deg)";
        if (num === 3) {
            icons[2].style.left = "36%";
            icons[2].style.top = "40%";
        }
    }
    if (num === 4 || num === 5) {
        icons[0].style.left = "15.8%";
        icons[0].style.top = "5%";
        icons[1].style.left = "15.8%";
        icons[1].style.top = "75%";
        icons[1].style.transform = "rotate(180deg)";
        icons[2].style.left = "56.2%";
        icons[2].style.top = "5%";
        icons[3].style.left = "56.2%";
        icons[3].style.top = "75%";
        icons[3].style.transform = "rotate(180deg)";
        if (num === 5) {
            icons[4].style.left = "36%";
            icons[4].style.top = "40%";
        }
    }
    if (num === 6 || num === 7 || num === 8) {
        icons[0].style.left = "15.8%";
        icons[0].style.top = "5%";
        icons[1].style.left = "15.8%";
        icons[1].style.top = "75%";
        icons[1].style.transform = "rotate(180deg)";
        icons[2].style.left = "56.2%";
        icons[2].style.top = "5%";
        icons[3].style.left = "56.2%";
        icons[3].style.top = "75%";
        icons[3].style.transform = "rotate(180deg)";
        icons[4].style.left = "15.8%";
        icons[4].style.top = "40%";
        icons[5].style.left = "56.2%";
        icons[5].style.top = "40%";
        if (num === 7 || num === 8) {
            icons[6].style.left = "36%";
            icons[6].style.top = "58%";
            icons[6].style.transform = "rotate(180deg)";
            if (num === 8) {
                icons[7].style.left = "36%";
                icons[7].style.top = "22%";
            }
        }
    }
    if (num === 9 || num === 10) {
        icons[0].style.left = "15.8%";
        icons[0].style.top = "5%";
        icons[1].style.left = "15.8%";
        icons[1].style.top = "76%";
        icons[1].style.transform = "rotate(180deg)";
        icons[2].style.left = "56.2%";
        icons[2].style.top = "5%";
        icons[3].style.left = "56.2%";
        icons[3].style.top = "76%";
        icons[3].style.transform = "rotate(180deg)";
        if (num === 9) {
            icons[4].style.left = "15.8%";
            icons[4].style.top = "27%";
            icons[5].style.left = "56.2%";
            icons[5].style.top = "27%";
            icons[6].style.left = "15.8%";
            icons[6].style.top = "54%";
            icons[6].style.transform = "rotate(180deg)";
            icons[7].style.left = "56.2%";
            icons[7].style.top = "54%";
            icons[7].style.transform = "rotate(180deg)";        
            icons[8].style.left = "36%";
            icons[8].style.top = "40%";
        }
        if (num === 10) {
            icons[4].style.left = "15.8%";
            icons[4].style.top = "29%";
            icons[5].style.left = "56.2%";
            icons[5].style.top = "29%";
            icons[6].style.left = "15.8%";
            icons[6].style.top = "52%"
            icons[6].style.transform = "rotate(180deg)";
            icons[7].style.left = "56.2%";
            icons[7].style.top = "52%";
            icons[7].style.transform = "rotate(180deg)";        
            icons[8].style.left = "36%";
            icons[8].style.top = "17%";
            icons[9].style.left = "36%";
            icons[9].style.top = "64%";
            icons[9].style.transform = "rotate(180deg)";
        }
    }
}

async function organiser() {
    let nbcartes = document.getElementsByClassName("carteFace").length;

    if (nbcartes === 2) {
        document.getElementsByClassName("carteFace")[0].style.left = "39%";
        document.getElementsByClassName("carteFace")[0].style.rotate = "-5deg"; 
        document.getElementsByClassName("carteFace")[1].style.left = "47%";
        document.getElementsByClassName("carteFace")[1].style.rotate = "5deg";
    }
    if (nbcartes === 3) {
        document.getElementsByClassName("carteFace")[0].style.left = "35%";
        document.getElementsByClassName("carteFace")[0].style.rotate = "-7deg";
        document.getElementsByClassName("carteFace")[1].style.left = "43%";
        document.getElementsByClassName("carteFace")[1].style.rotate = "0deg";
        document.getElementsByClassName("carteFace")[1].style.bottom = "-15%";        
        document.getElementsByClassName("carteFace")[2].style.left = "51%";
        document.getElementsByClassName("carteFace")[2].style.rotate = "7deg";
    }
    if (nbcartes === 4) {
        document.getElementsByClassName("carteFace")[0].style.left = "31%";
        document.getElementsByClassName("carteFace")[0].style.rotate = "-10deg";
        document.getElementsByClassName("carteFace")[1].style.left = "39%";
        document.getElementsByClassName("carteFace")[1].style.rotate = "-5deg";
        document.getElementsByClassName("carteFace")[1].style.bottom = "-13%";        
        document.getElementsByClassName("carteFace")[2].style.left = "47%";
        document.getElementsByClassName("carteFace")[2].style.rotate = "5deg";
        document.getElementsByClassName("carteFace")[2].style.bottom = "-13%";        
        document.getElementsByClassName("carteFace")[3].style.left = "55%";
        document.getElementsByClassName("carteFace")[3].style.rotate = "10deg";
    }
    if (nbcartes === 5) {
        document.getElementsByClassName("carteFace")[0].style.left = "27%";
        document.getElementsByClassName("carteFace")[0].style.rotate = "-13deg";
        document.getElementsByClassName("carteFace")[1].style.left = "35%";
        document.getElementsByClassName("carteFace")[1].style.rotate = "-7deg";
        document.getElementsByClassName("carteFace")[1].style.bottom = "-13%";
        document.getElementsByClassName("carteFace")[2].style.left = "43%";
        document.getElementsByClassName("carteFace")[2].style.rotate = "0deg";
        document.getElementsByClassName("carteFace")[2].style.bottom = "-11%";        
        document.getElementsByClassName("carteFace")[3].style.left = "51%";
        document.getElementsByClassName("carteFace")[3].style.rotate = "7deg";
        document.getElementsByClassName("carteFace")[3].style.bottom = "-13%";        
        document.getElementsByClassName("carteFace")[4].style.left = "59%";
        document.getElementsByClassName("carteFace")[4].style.rotate = "13deg";
    }
    if (nbcartes === 6) {
        document.getElementsByClassName("carteFace")[0].style.left = "23%";
        document.getElementsByClassName("carteFace")[0].style.rotate = "-16deg";
        document.getElementsByClassName("carteFace")[1].style.left = "31%";
        document.getElementsByClassName("carteFace")[1].style.rotate = "-10deg";
        document.getElementsByClassName("carteFace")[1].style.bottom = "-11%";
        document.getElementsByClassName("carteFace")[2].style.left = "39%";
        document.getElementsByClassName("carteFace")[2].style.rotate = "-5deg";
        document.getElementsByClassName("carteFace")[2].style.bottom = "-9%";
        document.getElementsByClassName("carteFace")[3].style.left = "47%";
        document.getElementsByClassName("carteFace")[3].style.rotate = "5deg";
        document.getElementsByClassName("carteFace")[3].style.bottom = "-9%";
        document.getElementsByClassName("carteFace")[4].style.left = "55%";
        document.getElementsByClassName("carteFace")[4].style.rotate = "10deg";
        document.getElementsByClassName("carteFace")[4].style.bottom = "-11%";
        document.getElementsByClassName("carteFace")[5].style.left = "63%";
        document.getElementsByClassName("carteFace")[5].style.rotate = "16deg";
    }
    if (nbcartes === 7) {
        document.getElementsByClassName("carteFace")[0].style.left = "19%";
        document.getElementsByClassName("carteFace")[0].style.rotate = "-19deg";
        document.getElementsByClassName("carteFace")[0].style.bottom = "-20%";
        document.getElementsByClassName("carteFace")[1].style.left = "27%";
        document.getElementsByClassName("carteFace")[1].style.rotate = "-13deg";
        document.getElementsByClassName("carteFace")[1].style.bottom = "-12%";
        document.getElementsByClassName("carteFace")[2].style.left = "35%";
        document.getElementsByClassName("carteFace")[2].style.rotate = "-7deg";
        document.getElementsByClassName("carteFace")[2].style.bottom = "-7%";
        document.getElementsByClassName("carteFace")[3].style.left = "43%";
        document.getElementsByClassName("carteFace")[3].style.rotate = "0deg";
        document.getElementsByClassName("carteFace")[3].style.bottom = "-5%";
        document.getElementsByClassName("carteFace")[4].style.left = "51%";
        document.getElementsByClassName("carteFace")[4].style.rotate = "7deg";
        document.getElementsByClassName("carteFace")[4].style.bottom = "-7%";
        document.getElementsByClassName("carteFace")[5].style.left = "59%";
        document.getElementsByClassName("carteFace")[5].style.rotate = "13deg";
        document.getElementsByClassName("carteFace")[5].style.bottom = "-12%";
        document.getElementsByClassName("carteFace")[6].style.left = "67%";
        document.getElementsByClassName("carteFace")[6].style.rotate = "19deg";
        document.getElementsByClassName("carteFace")[6].style.bottom = "-20%";
    }
    if (nbcartes === 8) {
        document.getElementsByClassName("carteFace")[0].style.left = "15%";
        document.getElementsByClassName("carteFace")[0].style.rotate = "-22deg";
        document.getElementsByClassName("carteFace")[0].style.bottom = "-20%";
        document.getElementsByClassName("carteFace")[1].style.left = "23%";
        document.getElementsByClassName("carteFace")[1].style.rotate = "-16deg";
        document.getElementsByClassName("carteFace")[1].style.bottom = "-12%";
        document.getElementsByClassName("carteFace")[2].style.left = "31%";
        document.getElementsByClassName("carteFace")[2].style.rotate = "-10deg";
        document.getElementsByClassName("carteFace")[2].style.bottom = "-7%";
        document.getElementsByClassName("carteFace")[3].style.left = "39%";
        document.getElementsByClassName("carteFace")[3].style.rotate = "-5deg";
        document.getElementsByClassName("carteFace")[3].style.bottom = "-5%";
        document.getElementsByClassName("carteFace")[4].style.left = "47%";
        document.getElementsByClassName("carteFace")[4].style.rotate = "5deg";
        document.getElementsByClassName("carteFace")[4].style.bottom = "-5%";
        document.getElementsByClassName("carteFace")[5].style.left = "55%";
        document.getElementsByClassName("carteFace")[5].style.rotate = "10deg";
        document.getElementsByClassName("carteFace")[5].style.bottom = "-7%";
        document.getElementsByClassName("carteFace")[6].style.left = "63%";
        document.getElementsByClassName("carteFace")[6].style.rotate = "16deg";
        document.getElementsByClassName("carteFace")[6].style.bottom = "-12%";
        document.getElementsByClassName("carteFace")[7].style.left = "71%";
        document.getElementsByClassName("carteFace")[7].style.rotate = "22deg";
        document.getElementsByClassName("carteFace")[7].style.bottom = "-20%";
    }
    if (nbcartes === 9) {
        document.getElementsByClassName("carteFace")[0].style.left = "11%";
        document.getElementsByClassName("carteFace")[0].style.rotate = "-25deg";
        document.getElementsByClassName("carteFace")[0].style.bottom = "-20%";
        document.getElementsByClassName("carteFace")[1].style.left = "19%";
        document.getElementsByClassName("carteFace")[1].style.rotate = "-19deg";
        document.getElementsByClassName("carteFace")[1].style.bottom = "-12%";
        document.getElementsByClassName("carteFace")[2].style.left = "27%";
        document.getElementsByClassName("carteFace")[2].style.rotate = "-13deg";
        document.getElementsByClassName("carteFace")[2].style.bottom = "-7%";
        document.getElementsByClassName("carteFace")[3].style.left = "35%";
        document.getElementsByClassName("carteFace")[3].style.rotate = "-7deg";
        document.getElementsByClassName("carteFace")[3].style.bottom = "-5%";
        document.getElementsByClassName("carteFace")[4].style.left = "43%";
        document.getElementsByClassName("carteFace")[4].style.rotate = "0deg";
        document.getElementsByClassName("carteFace")[4].style.bottom = "-5%";
        document.getElementsByClassName("carteFace")[5].style.left = "51%";
        document.getElementsByClassName("carteFace")[5].style.rotate = "7deg";
        document.getElementsByClassName("carteFace")[5].style.bottom = "-5%";
        document.getElementsByClassName("carteFace")[6].style.left = "59%";
        document.getElementsByClassName("carteFace")[6].style.rotate = "13deg";
        document.getElementsByClassName("carteFace")[6].style.bottom = "-7%";
        document.getElementsByClassName("carteFace")[7].style.left = "67%";
        document.getElementsByClassName("carteFace")[7].style.rotate = "19deg";
        document.getElementsByClassName("carteFace")[7].style.bottom = "-12%";
        document.getElementsByClassName("carteFace")[8].style.left = "75%";
        document.getElementsByClassName("carteFace")[8].style.rotate = "25deg";
        document.getElementsByClassName("carteFace")[8].style.bottom = "-20%";
    }
    for (let i = 0; i < nbcartes-1; i++) {
        let random = Math.floor(Math.random() * 100);
        document.getElementsByClassName("carteFace")[i].style.animation = "carteOrganise 0.2s " + random + "ms";        
    }
    document.getElementsByClassName("carteFace")[nbcartes-1].style.animation = "carteMain 0.4s";

    await sleep(400);
    for (let i = 0; i < nbcartes; i++) {
        document.getElementsByClassName("carteFace")[i].style.animation = "none";
    }
}

function cleanBoard(){
    let carteDos = document.getElementsByClassName("carteDos");
    let carteFace = document.getElementsByClassName("carteFace");
    while (carteDos[0]) {
        carteDos[0].parentNode.removeChild(carteDos[0]);    
    }
    while (carteFace[0]) {
        carteFace[0].parentNode.removeChild(carteFace[0]);
    }
}

let dejaSocial = [];

function spawnCarteCroupier(num, val, hide) {
    let carte = document.createElement("div");
    carte.classList.add("carteCroupier");

    if (hide) {
        carte.appendChild(document.createElement("img"));
        carte.lastChild.src = "../img/card-back.png";
        carte.lastChild.classList.add("carte");
        dejaSocial = [];
    }else{
        carte.appendChild(document.createElement("p"));
        carte.lastChild.innerHTML = num;

        carte.appendChild(document.createElement("img"));
        carte.lastChild.src = "../img/" + val + ".png";
        carte.lastChild.classList.add("petit");

        if (dejaSocial.length !== 5) {
            do {
                var numSocial = Math.floor(Math.random() * 5);
            } while (dejaSocial.includes(numSocial));
            dejaSocial.push(numSocial);
            carte.appendChild(document.createElement("a"));
            carte.lastChild.appendChild(document.createElement("img"));
            carte.lastChild.lastChild.src = "../img/" + social[numSocial][0];
            carte.lastChild.lastChild.alt = social[numSocial][2];
            carte.lastChild.lastChild.classList.add("reseau");
            carte.lastChild.href = social[numSocial][1];
            carte.lastChild.target = "_blank";
        }


        if (val === "spades" || val === "clubs") {
            carte.children[0].style.color = "black";
        }

        if (num === "10") {
            carte.children[0].style.marginLeft = "-2px"
        }
    }

    document.body.appendChild(carte);
}

function cleanBoardCroupier(){
    let carteCroupier = document.getElementsByClassName("carteCroupier");
    while (carteCroupier[0]) {
        carteCroupier[0].parentNode.removeChild(carteCroupier[0]);
    }
}

function returnCarte() {
    let carte = document.getElementsByClassName("carteCroupier");
    let nbCarte = carte.length;
    for (let i = 0; i < nbCarte; i++) {
        if (carte[i].children.length === 1) {
            spawnCarteCroupier(croupierCards[i].valeur, croupierCards[i].couleur, false);
            carte[i].parentNode.removeChild(carte[i]);
        }
    }
}

async function organiserCroupier() {
    let nbCarteCroupier = document.getElementsByClassName("carteCroupier").length;

    if (nbCarteCroupier === 1) {
        document.getElementsByClassName("carteCroupier")[0].style.left = "47.4%";
        document.getElementsByClassName("carteCroupier")[0].style.rotate = "180deg";
    }
    if (nbCarteCroupier === 2) {
        document.getElementsByClassName("carteCroupier")[0].style.left = "49%";
        document.getElementsByClassName("carteCroupier")[0].style.rotate = "-185deg";
        document.getElementsByClassName("carteCroupier")[1].style.left = "45%";
        document.getElementsByClassName("carteCroupier")[1].style.rotate = "185deg";
    }
    if (nbCarteCroupier === 3) {
        document.getElementsByClassName("carteCroupier")[0].style.left = "51%";
        document.getElementsByClassName("carteCroupier")[0].style.rotate = "-185deg";
        document.getElementsByClassName("carteCroupier")[1].style.left = "47%";
        document.getElementsByClassName("carteCroupier")[1].style.rotate = "180deg";
        document.getElementsByClassName("carteCroupier")[1].style.top = "-1%";
        document.getElementsByClassName("carteCroupier")[2].style.left = "43%";
        document.getElementsByClassName("carteCroupier")[2].style.rotate = "185deg";
    }
    if (nbCarteCroupier === 4) {
        document.getElementsByClassName("carteCroupier")[0].style.left = "53%";
        document.getElementsByClassName("carteCroupier")[0].style.rotate = "-187.5deg";
        document.getElementsByClassName("carteCroupier")[1].style.left = "49%";
        document.getElementsByClassName("carteCroupier")[1].style.rotate = "-182.5deg";
        document.getElementsByClassName("carteCroupier")[1].style.top = "-1%";
        document.getElementsByClassName("carteCroupier")[2].style.left = "45%";
        document.getElementsByClassName("carteCroupier")[2].style.rotate = "182.5deg";
        document.getElementsByClassName("carteCroupier")[2].style.top = "-1%";
        document.getElementsByClassName("carteCroupier")[3].style.left = "41%";
        document.getElementsByClassName("carteCroupier")[3].style.rotate = "187.5deg";
    }
    if (nbCarteCroupier === 5) {
        document.getElementsByClassName("carteCroupier")[0].style.left = "55%";
        document.getElementsByClassName("carteCroupier")[0].style.rotate = "-190deg";
        document.getElementsByClassName("carteCroupier")[0].style.top = "-4%";
        document.getElementsByClassName("carteCroupier")[1].style.left = "51%";
        document.getElementsByClassName("carteCroupier")[1].style.rotate = "-185deg";
        document.getElementsByClassName("carteCroupier")[1].style.top = "-2%";
        document.getElementsByClassName("carteCroupier")[2].style.left = "47%";
        document.getElementsByClassName("carteCroupier")[2].style.rotate = "180deg";
        document.getElementsByClassName("carteCroupier")[2].style.top = "-1%";
        document.getElementsByClassName("carteCroupier")[3].style.left = "43%";
        document.getElementsByClassName("carteCroupier")[3].style.rotate = "185deg";
        document.getElementsByClassName("carteCroupier")[4].style.left = "39%";
        document.getElementsByClassName("carteCroupier")[4].style.rotate = "190deg";
        document.getElementsByClassName("carteCroupier")[4].style.top = "-4%";
    }
    if (nbCarteCroupier === 6) {
        document.getElementsByClassName("carteCroupier")[0].style.left = "57%";
        document.getElementsByClassName("carteCroupier")[0].style.rotate = "-192.5deg";
        document.getElementsByClassName("carteCroupier")[0].style.top = "-5%";
        document.getElementsByClassName("carteCroupier")[1].style.left = "53%";
        document.getElementsByClassName("carteCroupier")[1].style.rotate = "-187.5deg";
        document.getElementsByClassName("carteCroupier")[2].style.left = "49%";
        document.getElementsByClassName("carteCroupier")[2].style.rotate = "-182.5deg";
        document.getElementsByClassName("carteCroupier")[2].style.top = "-1%";
        document.getElementsByClassName("carteCroupier")[3].style.left = "45%";
        document.getElementsByClassName("carteCroupier")[3].style.rotate = "182.5deg";
        document.getElementsByClassName("carteCroupier")[3].style.top = "-1%";
        document.getElementsByClassName("carteCroupier")[4].style.left = "41%";
        document.getElementsByClassName("carteCroupier")[4].style.rotate = "187.5deg";
        document.getElementsByClassName("carteCroupier")[5].style.left = "37%";
        document.getElementsByClassName("carteCroupier")[5].style.rotate = "192.5deg";
        document.getElementsByClassName("carteCroupier")[5].style.top = "-5%";
    }
    if (nbCarteCroupier === 7) {
        document.getElementsByClassName("carteCroupier")[0].style.left = "59%";
        document.getElementsByClassName("carteCroupier")[0].style.rotate = "-195deg";
        document.getElementsByClassName("carteCroupier")[0].style.top = "-8%";
        document.getElementsByClassName("carteCroupier")[1].style.left = "55%";
        document.getElementsByClassName("carteCroupier")[1].style.rotate = "-190deg";
        document.getElementsByClassName("carteCroupier")[1].style.top = "-4%";
        document.getElementsByClassName("carteCroupier")[2].style.left = "51%";
        document.getElementsByClassName("carteCroupier")[2].style.rotate = "-185deg";
        document.getElementsByClassName("carteCroupier")[3].style.left = "47%";
        document.getElementsByClassName("carteCroupier")[3].style.rotate = "180deg";
        document.getElementsByClassName("carteCroupier")[3].style.top = "-1%";
        document.getElementsByClassName("carteCroupier")[4].style.left = "43%";
        document.getElementsByClassName("carteCroupier")[4].style.rotate = "185deg";
        document.getElementsByClassName("carteCroupier")[5].style.left = "39%";
        document.getElementsByClassName("carteCroupier")[5].style.rotate = "190deg";
        document.getElementsByClassName("carteCroupier")[5].style.top = "-4%";
        document.getElementsByClassName("carteCroupier")[6].style.left = "35%";
        document.getElementsByClassName("carteCroupier")[6].style.rotate = "195deg";
        document.getElementsByClassName("carteCroupier")[6].style.top = "-8%";
    }

    for (let i = 0; i < nbCarteCroupier-1; i++) {
        let random = Math.floor(Math.random() * 50);
        document.getElementsByClassName("carteCroupier")[i].style.animation = "carteOrganiseCroupier 0.2s " + random + "ms";
    }
    document.getElementsByClassName("carteCroupier")[nbCarteCroupier-1].style.animation = "carteMainCroupier 0.4s";

    await sleep(400);
    for (let i = 0; i < nbCarteCroupier; i++) {
        document.getElementsByClassName("carteCroupier")[i].style.animation = "none";
    }
}

function score(hide, main) {
    if (hide) {
        document.getElementById("scoreCroupier").innerHTML = getCardValue([croupierCards[1]]);
    } else {
        document.getElementById("scoreCroupier").innerHTML = getCardValue(croupierCards);
    }
    if (main) {
        document.getElementById("scorePlayer").innerHTML = getCardValue(playerCards);
    }
}

function scoreReset() {
    document.getElementById("scoreCroupier").innerHTML = "0";
    document.getElementById("scorePlayer").innerHTML = "0";
}