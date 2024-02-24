import myDocuments from "./myDocuments.mjs";
import createElement from "../lib/createElement.mjs";
import undoDelete from "./undoDelete.mjs";

export default function deleteDoc(docArticle, doc) {
    let docTitle = doc.title
    let docId = doc.documentId
    console.log(docTitle);
    let deleteCheckContainer = createElement('div', 'deleteCheckContainer', 'deleteCheckContainer', ``)
    deleteCheckContainer.innerText = ''
    docArticle.appendChild(deleteCheckContainer)
    let deleteCheck = createElement('h4', `${docId}`, 'deleteCheck', `Are you sure you want to delete ${docTitle}?`)
    let deleteCheckBtn = createElement('button', 'deleteCheckBtn', 'deleteCheckBtn', `Yes delete`)
    let cancelDeleteBtn = createElement('button', 'cancelDeleteBtn', 'cancelDeleteBtn', `Cancel`)
    deleteCheckContainer.append(deleteCheck, deleteCheckBtn, cancelDeleteBtn)
    console.log(deleteCheck.id);

    cancelDeleteBtn.addEventListener('click', () => {
        deleteCheckContainer.remove()
    })
    deleteCheckBtn.addEventListener('click', async () => {
        try {
            await deleteMethod(docId);
        } catch (error) {
            console.error('Error while deleting document:', error);
        } finally {
            deleteCheckContainer.remove();
            await myDocuments();
            undoDelete(docId, docTitle);
        }
    });
}

export function deleteMethod(docId) {
    
    let deleteDoc = {
        userId: localStorage.getItem('loggedInUser')
         };
        console.log(deleteDoc);
    fetch(`http://localhost:3000/api/document/delete/${docId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(deleteDoc)
    })
    .then(res => res.json())
    .then((doc) => {
        // myDocuments()
    })
}