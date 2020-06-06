// Function to get the states from the API and create the <options> to the <select>
const populateStates = () => {
    const stateSelect = document.querySelector("select[name=uf]");
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(response => response.json())
        .then(states => {
            for(state of states) {
                stateSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
            }
        })
        .catch(error => console.log(error))
}

populateStates();

// Function to add the Cities <options> according to the selected State
const getCities = (event) => {
    const citySelect = document.querySelector("select[name=city]");
    const stateInput = document.querySelector("input[name=state]");
    const indexOfSelectedState = event.target.selectedIndex;
    stateInput.value = event.target.options[indexOfSelectedState].text;
    console.log(event.target.options[indexOfSelectedState]);
    const state = event.target.value;
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/municipios`
    citySelect.innerHTML = '<option value="">Selecione a cidade</option>';
    citySelect.disabled = true;
    fetch(url)
        .then(response => response.json())
        .then(cities => {
            for(city of cities){
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
            }
            citySelect.disabled = false;
        })
        .catch(error => console.log(error))
}

// Trigger for when the State <select> changes
document.querySelector("select[name=uf]")
        .addEventListener("change", getCities)


// Collectible Items variables
let selectedItems = [];
const collectedItems = document.querySelector("input[name=items]");

// Function to add the selected items according to which were chosen by the user
const handleSelectedItem = (event) => {
    const listItem = event.target;
    listItem.classList.toggle("selected");
    const itemId = listItem.dataset.id;
    const alreadySelected = selectedItems.findIndex(item => {
        const foundItem = item == itemId;
        return foundItem;
    });
    if(alreadySelected >= 0) {
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId;
            return itemIsDifferent;
        })
    selectedItems = filteredItems;
    } else {
        selectedItems.push(itemId);
    }
    collectedItems.value = selectedItems;
}

// Trigger for when the user choose a collectible item
const itemsToCollect = document.querySelectorAll(".items-grid li");
for(item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem);
}