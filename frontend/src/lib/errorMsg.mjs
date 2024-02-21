import createElement from "./createElement.mjs";
let mainContainer = document.getElementById('mainContainer');

export default function errorMsg(container, errorText) {
    let existingError = document.getElementById('errorContainer')
    if (existingError) {
     existingError.remove()
    }
    let errorContainer = createElement('div', 'errorContainer', 'errorContainer', '')
    container.appendChild(errorContainer)
     let errorMessage = createElement('span', 'errorMessage', 'errorMessage', '')
    errorContainer.innerText = ''
    errorMessage.innerText = errorText
    errorContainer.appendChild(errorMessage)
}
