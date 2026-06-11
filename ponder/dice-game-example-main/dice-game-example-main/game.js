document.getElementById("rollButton").addEventListener("click", event =>  {
    // Roll the dice
    const dice = Math.floor(Math.random() * 6) + 1;
    console.log(`You rolled a ${dice}`);
    const images = document.querySelectorAll("#gameboard img");
    images.forEach((image, index) => {
        if (isDieUnlocked(image)) {
            image.src = "assets/die_rolling.gif"
        }
    });

    setTimeout(() => {

        images.forEach((image, index) => {
            if (isDieUnlocked(image)) {
                image.src = "assets/white_dice_" + (Math.floor(Math.random() * 6) + 1) + ".gif";
            }
        });
    }, 1000);
});

function isDieUnlocked(dieImage) {
    const checks = document.querySelectorAll("#gameboard input");
    const unchecked = Array.from(checks).filter(checkbox => !checkbox.checked);
    return unchecked.find(checkbox => checkbox.className === dieImage.className);
};
