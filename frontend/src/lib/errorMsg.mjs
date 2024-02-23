import createElement from "./createElement.mjs";

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

export function deleteMsg(container, feedbackText) {
    let feedback = document.getElementById('feedbackContainer')
    if (feedback) {
        feedback.remove()
    }
    let feedbackContainer = createElement('div', 'feedbackContainer', 'feedbackContainer', '')
    container.appendChild(feedbackContainer)
     let feedbackMessage = createElement('span', 'feedbackMessage', 'feedbackMessage', '')
     feedbackContainer.innerText = ''
     feedbackMessage.innerText = feedbackText
    feedbackContainer.appendChild(feedbackMessage)
}
