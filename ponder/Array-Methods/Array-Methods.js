class games {
    constructor(name, score){
        this.name = name;
        this.score = score;
    }
}

const all_games = [];

/* Could have made this an object with name, score, and src as properties but I wanted to practice using arrays more */
const game_names = ['Subnautica', 'Zelda', 'Pokemon', 'Stardew Valley', 'Dead Cells', 'Hades 2', 'Slay the Spire 2'];
const game_scores = [0, 0, 0, 0, 0, 0, 0];
const game_src = ['images/subnautica.jpg', 'images/zelda.jpg', 'images/pokemon.png', 'images/stardew.jpg', 'images/dead_cells.jpg', 'images/hades2.jpg', 'images/slay_the_spire2.jpg'];

let current_game = 0;

for (let i = 0; i < game_names.length; i++){
    let new_game = new games(game_names[i], 0);
    all_games.push(new_game);
}
 
console.log(all_games);

const game_img = document.querySelector("img");
const game_name = document.querySelector("#game-name");
const game_score = document.querySelector('#game-score');

const value_btn = document.querySelector(".value-btn");
console.log(value_btn);
value_btn.addEventListener('click', eventHandlervalue);

const next_btn = document.querySelector(".next-btn");
console.log(next_btn);
next_btn.addEventListener('click', eventHandlernext);

function eventHandlervalue(e){
    if (all_games[current_game].score >= 10){
        all_games[current_game].score = 0;
        updateGameScore();
        game_score.textContent = `Score: 0`;
    }
    else{
    all_games[current_game].score += 1;
    updateGameScore();
    game_score.textContent = `Score: ${game_scores[current_game]}`;
    console.log(all_games[current_game].score);
    }
}

function eventHandlernext(e){
    current_game += 1;
    if (current_game >= all_games.length){
        current_game = 0;
    }
    game_score.textContent = `Score: ${game_scores[current_game]}`;
    game_img.src = game_src[current_game];
    game_img.alt = all_games[current_game];
    game_name.textContent = all_games[current_game].name;

}

function updateGameScore(){
    game_scores[current_game] = all_games[current_game].score;
    console.log(game_scores);
}

console.log("Testing array methods");


console.log("Testing map method");
const array1 = [1, 2, 3, 4, 5];

const newary = array1.map(multiplyfunction);
console.log(newary);

function multiplyfunction(num){
    return num*2;
}

console.log("Testing filter method");
const items = ["bike", 'laptop', 'backpack', 'desk']

const filtered_items = items.filter(filterfunction);
function filterfunction(item){
    return item === "laptop";
}
console.log(filtered_items);

console.log("Testing reduce method");
                            
const numbers = [100, 40, 1, 5, 25, 10];

const result = numbers.reduce(reducefunction);

function reducefunction(total, num) {
  return total - num;
}
console.log(result);

console.log("Testing IndexOf method");
console.log(game_names.indexOf("Zelda"));
