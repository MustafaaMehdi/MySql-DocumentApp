import { deleteMsg } from "../lib/errorMsg.mjs";

let mainContainer = document.getElementById('mainContainer');
import createElement from "../lib/createElement.mjs";

export default function undoDelete(docTitle) {
    let undoDeleteContainer = createElement('div', 'undoDeleteContainer', 'undoDeleteContainer', '')
    mainContainer.appendChild(undoDeleteContainer)
    let undoDeleteBtn = createElement('button', 'undoDeleteBtn', 'undoDeleteBtn', 'Undo')
    deleteMsg(undoDeleteContainer, `${docTitle} deleted`)
    undoDeleteContainer.append(undoDeleteBtn)
}