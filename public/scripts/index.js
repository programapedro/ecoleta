// Script to SHOW and CLOSE the modal
const searchButton = document.querySelector(".homepage main a")
const modal = document.querySelector("#modal");
const close = document.querySelector("#modal .modal-header a");
// SHOW
searchButton.addEventListener("click", () => {
    modal.classList.remove("hide");
});
// CLOSE
close.addEventListener("click", () => {
    modal.classList.add("hide");
})