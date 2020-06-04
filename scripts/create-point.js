const populateStates = () => {
    const stateSelect = document.querySelector("select[name=state]");
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

const getCities = (event) => {
    const citySelect = document.querySelector("select[name=city]");
    const stateInput = document.querySelector("input[name=uf]");
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

document.querySelector("select[name=state]")
        .addEventListener("change", getCities)

let selectedItems = [];
const collectedItems = document.querySelector("input[name=items]");

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

const itemsToCollect = document.querySelectorAll(".items-grid li");
for(item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem);
}