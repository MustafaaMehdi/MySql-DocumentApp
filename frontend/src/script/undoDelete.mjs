import { deleteMsg } from '../lib/errorMsg.mjs';
import { deleteMethod } from './deleteDoc.mjs';
import myDocuments from './myDocuments.mjs';

let mainContainer = document.getElementById('mainContainer');
import createElement from '../lib/createElement.mjs';

export default function undoDelete(docId, docTitle) {
	let deletedId = docId;
	console.log(deletedId);
	console.log(docTitle);
	let undoDeleteContainer = createElement(
		'div',
		'undoDeleteContainer',
		'undoDeleteContainer',
		''
	);
	mainContainer.appendChild(undoDeleteContainer);
	let undoDeleteBtn = createElement(
		'button',
		'undoDeleteBtn',
		'undoDeleteBtn',
		'Undo'
	);
	deleteMsg(undoDeleteContainer, `${docTitle} deleted`);
	undoDeleteContainer.append(undoDeleteBtn);
    undoDeleteBtn.addEventListener('click', async () => {
        try {
            await deleteMethod(deletedId);
            undoDeleteContainer.remove();
        } catch (error) {
            console.error('There was an error restoring', error);
        } finally {
            myDocuments();
        }
    });
	// myDocuments()
}
