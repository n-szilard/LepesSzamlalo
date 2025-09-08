const AppTitle = "Lépésszámláló App";
const Author = "13. A";
const Company = "Bajai SZC Türr Istvàn Technikum"

let title = document.getElementById("appTitle");
let company = document.getElementById("company");
let author = document.getElementById("author");
let lightmodeBtn = document.getElementById("lightmodeBtn");
let darkmodeBtn = document.getElementById("darkmodeBtn");

let main = document.querySelector("main");
let theme = "light";

title.innerHTML = AppTitle;
company.innerHTML = Company;
author.innerHTML = Author;

lightmodeBtn.addEventListener("click", () => {
    setTheme("light");
});

darkmodeBtn.addEventListener("click", () => {
    setTheme("dark");
});

let loadTheme = () => {
    theme = "dark";
    if (localStorage.getItem("SCTheme")) {
        theme = localStorage.getItem("SCTheme");
    }
    setTheme(theme);
}

let saveTheme = (theme) => {
    localStorage.setItem("SCTheme", theme)
}

let setTheme = (theme) => {
    document.documentElement.setAttribute('data-bs-theme', theme);
    setThemeBtn(theme);
    saveTheme(theme);
}

setThemeBtn = (theme) => {
    if (theme == "light") {
        lightmodeBtn.classList.add("hide");
        darkmodeBtn.classList.remove("hide");
    } else {
        lightmodeBtn.classList.remove("hide");
        darkmodeBtn.classList.add("hide");
    }
}

let render = async (view) => {
    main.innerHTML = await (await fetch(`views/${view}.html`)).text();
}



loadTheme();
render("login");