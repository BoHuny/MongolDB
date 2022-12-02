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
    alert("Les règles du jeu sont les suivantes:\n-Il faudra baiser un maximum")
}