let classElement = document.querySelector('.stats p.class')
let levelElement = document.querySelector('.stats p.level')
let healthElement = document.querySelector('.stats p.health')

const card_stats = {
  class: "Swamp Beast Diplomat",
  level: 5,
  health: 100
};

const attackedButton = document.querySelector(".attacked")
const levelUpButton = document.querySelector(".level-up")

//.attacked() equivilent 
attackedButton.addEventListener("click", () => {
    card_stats.health -= 20;
    updateCardStats();
    if (card_stats.health <= 0) {
        alert("Character Died");
    }
});

//.levelUp() equivilent
levelUpButton.addEventListener("click", () => {
    card_stats.level ++
    updateCardStats();
});

function updateCardStats() {
  classElement.textContent = `Class: ${card_stats.class}`;
  levelElement.textContent = `Level: ${card_stats.level}`;
  healthElement.textContent = `Health: ${card_stats.health}`;
}

updateCardStats();