let menuButton = document.querySelector('.menu-btn');
console.log(menuButton);

menuButton.addEventListener("click", handleMenuButtonClick); 

function handleMenuButtonClick(event) {
    console.log(event);
    let nav = document.querySelector('nav');
    nav.classList.toggle('unhide');
    menuButton.classList.toggle('change');
}