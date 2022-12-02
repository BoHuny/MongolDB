let navMenuDiv = document.getElementById("nav-content");
let navMenu = document.getElementById("nav-toggle");

document.onclick = check;
function check(e) {
    let target = (e && e.target) || (event && event.srcElement);

    //Nav Menu
    if (!checkParent(target, navMenuDiv)) {
    // click NOT on the menu
    if (checkParent(target, navMenu)) {
        // click on the link
        if (navMenuDiv.classList.contains("hidden")) {
        navMenuDiv.classList.remove("hidden");
        } else {
        navMenuDiv.classList.add("hidden");
        }
    } else {
        // click both outside link and outside menu, hide menu
        navMenuDiv.classList.add("hidden");
    }
    }
}
function checkParent(t, elm) {
    while (t.parentNode) {
    if (t == elm) {
        return true;
    }
    t = t.parentNode;
    }
    return false;
}
function rules(){
    alert("COMMENT JOUER A MSTinder ? \nLe but du jeu est très simple: tu dois avoir la vie sexuelle la plus épanouie (et la plus saine possible !!)\nTu peux accéder à la liste des joueurs et leur proposer de coucher avec toi, avec protection ou non, pour gagner des points. Attention, respecte leur décision si ça ne les tente pas ;)\nFais bien attention à toi ! Tu peux te retrouver contaminé par un de tes partenaires... Pense à te faire dépister régulièrement pour éviter une mauvais surprise! Tu perdras des points si tu infectes quelqu'un :/\nLe jeu à une durée limitée. A la fin, le gagnant sera le joueur avec le plus haut score !!!");
}