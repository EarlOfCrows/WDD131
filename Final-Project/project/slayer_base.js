let currentData = [];
let filteredCards = []; 

const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const cardRelicSelect = document.getElementById('card/relic');
const raritySelect = document.getElementById('rarity_search');
const characterSelect = document.getElementById('character_search');
const includeDescriptionSelect = document.getElementById('include_description');    
const card_typeSelect = document.getElementById('card_type');
const upgradedSelect = document.getElementById('Upgraded');

const orderBySelect = document.getElementById('Order');

function chnageSelectors(){
    if (cardRelicSelect.value === 'Relic') {
        card_typeSelect.toggleAttribute('hidden', true);
    }
}


function makeFetchUrl(selectedOption, selectedRarity, selectedCharacter, selectedCardType) {
    let firstParamAdded = false;
    let fetchUrl = "https://spire-codex.com/api/";
    if (selectedOption === 'Relic') {
        fetchUrl += "relics";
    } else {
        fetchUrl += "cards";
    }
    if (selectedRarity !== 'All') {
        if (selectedOption === 'Relic') {
            fetchUrl += `?rarity=${selectedRarity} Relic`; 
        }
        else{
        fetchUrl += `?rarity=${selectedRarity}`;
        }
        firstParamAdded = true;
    }
    if (selectedCharacter !== 'All') {
        if (selectedOption === 'Relic') {
        fetchUrl += `${firstParamAdded ? '&' : '?'}pool=${selectedCharacter.toLowerCase()}`;
        }
        else{
        fetchUrl += `${firstParamAdded ? '&' : '?'}color=${selectedCharacter.toLowerCase()}`;
        }
        firstParamAdded = true;
    }
    if (selectedCardType !== 'All') {
        if (selectedOption === 'Card') {
        fetchUrl += `${firstParamAdded ? '&' : '?'}type=${selectedCardType}`;
        firstParamAdded = true;}
    }
    console.log('Fetch URL:', fetchUrl);
    return fetchUrl;
}


async function fetchCards() {
    let fetchUrl = makeFetchUrl(cardRelicSelect.value, raritySelect.value, characterSelect.value, card_typeSelect.value);
    try{
    const res = await fetch(fetchUrl);
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    const spireData = await res.json();
    currentData = spireData; 
    }
    catch (error) {
        console.error('Error fetching relics:', error);
    }
    
};


function filterData(cards, searchValue, includeDescription) {
    searchValue = searchValue.toLowerCase();
    return cards.filter(card => {
        const nameMatch = card.name.toLowerCase().includes(searchValue);
        const descriptionMatch = includeDescription && card.description && card.description.toLowerCase().includes(searchValue);
        return nameMatch || descriptionMatch;
    });
}


searchButton.addEventListener('click', async function() {
    await fetchCards();
    chnageSelectors();
    const searchValue = searchInput.value.toLowerCase();
    const includeDescription = includeDescriptionSelect.checked;
    console.log('Search:', includeDescription, searchValue, cardRelicSelect.value, raritySelect.value, characterSelect.value, card_typeSelect.value);
    console.log('Current Data:', currentData);
    
    filteredCards = filterData(currentData, searchValue, includeDescription);
    filteredCards = orderCards(filteredCards);
    displayCards(filteredCards);
    console.log('Filtered Data:', filteredCards);
});

// Have a fetch function that gets the general cards, fiters through stuff like card/relic, rarity, character, and card type. Then have a separate function that filters through the cards based on the search input and the include description checkbox. Then have a function that displays the cards in the card container.
function displayCards(cards) {
    const resultsLimit = 1000;
    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = ''; 
    resultsContainer.style.display = 'grid'; 
    cards.forEach(card => {
        if (resultsContainer.childElementCount >= resultsLimit) {
            return; 
        }
        let cardDiv = ``;

        if (cardRelicSelect.value === 'Card' && upgradedSelect.checked) {
            cardDiv = `<img src="${card.image_url_card_upg}" alt="${card.name}">`; 
        }
        else{
            cardDiv = `<img src="${card.image_url_card}" alt="${card.name}">`;
        }
        resultsContainer.innerHTML += cardDiv;
        
    });
}

function orderCards(cards, orderBy = orderBySelect.value) {
    switch (orderBy) {
        case 'NAME':
            return cards.sort((a, b) => a.name.localeCompare(b.name));
        case 'RARITY':
            return cards.sort((a, b) => {
                let rarityOrder = ['Basic', 'Common', 'Uncommon', 'Rare', 'Ancient', 'Event', 'Shop', 'Starter'];
                if (rarityOrder.indexOf(a.rarity) === -1) rarityOrder.push(a.rarity);
                if (rarityOrder.indexOf(b.rarity) === -1) rarityOrder.push(b.rarity);
                return rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity);
            });
        case 'CHARACTER':
            return cards.sort((a, b) => a.color.localeCompare((b.color)));
        default:
            return cards;
    }
}
