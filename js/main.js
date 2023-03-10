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
    console.log(texteArray);
}

function createCarte() {
    let carte = document.createElement("img");
    carte.src = "../img/card-back.png"
    carte.classList.add("carteDos");

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

function iconCentre(n) {
    let num = parseInt(document.getElementsByClassName("icon-entre")[n].classList[1]);
    let icons = [];
    for (let i = 0; i < num; i++) {
        let icon = document.createElement("img");
        icon.src = "../img/clubs.png";
        document.getElementsByClassName("icon-entre")[n].appendChild(icon);
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