let selector = document.querySelector('#mode-select');
const image = document.getElementById('image').querySelector('img');
let body = document.querySelector('body');
console.log(image);


selector.addEventListener('change', changeMode);

function changeMode() {
    let current = selector.value;
    if (current === "dark"){
        document.body.style.backgroundColor = "#565656";
        document.body.style.color = "white";
        console.log("dark mode selected");
        image.src = "images/byui-logo-black_Wtext.png";
        

    } else if (current === "light"){
        document.body.style.backgroundColor = "white";
        document.body.style.color = "black";
        console.log("light mode selected");
    }
}