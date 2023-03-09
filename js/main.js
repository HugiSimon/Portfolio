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