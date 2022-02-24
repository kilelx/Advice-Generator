const adviceNumber = document.getElementById("number");
const adviceString = document.getElementById("advice");
const divider = document.querySelector(".svg");


// CHANGING SVG DEPENDING THE DEVICE SIZE
let deviceScreen = window.matchMedia("(min-width: 768px)");

if (deviceScreen.matches) {
    divider.innerHTML = `<svg width="444" height="16" xmlns="http://www.w3.org/2000/svg" id="svg-divider"><g fill="none" fill-rule="evenodd"><path fill="#4F5D74" d="M0 8h196v1H0zM248 8h196v1H248z"/><g transform="translate(212)" fill="#CEE3E9"><rect width="6" height="16" rx="3"/><rect x="14" width="6" height="16" rx="3"/></g></g></svg>`;
} else {
    divider.innerHTML = `<svg width="295" height="16" xmlns="http://www.w3.org/2000/svg" id="svg-divider"><g fill="none" fill-rule="evenodd"><path fill="#4F5D74" d="M0 8h122v1H0zM173 8h122v1H173z"/><g transform="translate(138)" fill="#CEE3E9"><rect width="6" height="16" rx="3"/><rect x="14" width="6" height="16" rx="3"/></g></g></svg>`;
}

function callApi() {

    fetch(`https://api.adviceslip.com/advice`)
    .then((reponse) => {
        return reponse.json();
    })
    .then((adviceObj) => {
        getAdvice(adviceObj);
    })
}

function getAdvice(adviceObj) {

    adviceNumber.innerText = adviceObj.slip.id;
    adviceString.innerText = `"` + adviceObj.slip.advice +  `"`;

    document.getElementById("button").setAttribute("disabled", "true");

//     Modifying the svg according to the time left before getting a new advice
    document.querySelectorAll("#svg-divider rect").forEach((rect) => {
        rect.style.opacity = "0.5";
    })

    setTimeout(() => {
        document.querySelector("#svg-divider rect:first-child").style.opacity = "1";
    }, 1000);

    setTimeout(() => {
        document.querySelector("#svg-divider rect:last-child").style.opacity = "1";
        document.getElementById("button").removeAttribute("disabled");
    }, 2000);

}

// ANIMATION WHEN CLICKING ON THE BUTTON
document.getElementById("button").addEventListener("click", () => {
    document.querySelector("#button img").style.animation = "throwDice .4s ease-in-out";

    let removeAnimation = setTimeout(() => {
        document.querySelector("#button img").style.animation = "";
    }, 400);
})
