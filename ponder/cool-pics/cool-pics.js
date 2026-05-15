
const pics = document.querySelector('#images');
const modal = document.querySelector('dialog');
const modalImage = modal.querySelector('img');
const modalText = modal.querySelector('p');
const closeButton = modal.querySelector('.close-viewer');

const menuButton = document.querySelector('#mobile-menu');
const desktopMenu = document.querySelector('#desktop-menu');

menuButton.addEventListener('click', openMenu);

function openMenu(event) {
    console.log(event);
    let menu = desktopMenu.querySelector('a');
    desktopMenu.classList.toggle('show');
}

pics.addEventListener('click', openModal);

function openModal(e) {
    
    console.log("yay");

    if (e.target.tagName == 'IMG') {
        console.log(e);
        console.log(e.target.src);
        let image = e.target.src;
        modalImage.src = image;
        modalText.textContent = e.target.alt;
        modal.showModal();
    }

     
}
// Close modal on button click
closeButton.addEventListener('click', () => {
    modal.close();
});

// Close modal if clicking outside the image
modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.close();
    }
});
          