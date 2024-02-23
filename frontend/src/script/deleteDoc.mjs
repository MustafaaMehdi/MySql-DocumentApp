import myDocuments from "./myDocuments.js";
import createElement from "../lib/createElement.mjs";
import undoDelete from "./undoDelete.mjs";

export default function deleteDoc(deleteDocBtn, docArticle, doc) {
       
    let docTitle = doc.title

    let deleteCheckContainer = createElement('div', 'deleteCheckContainer', 'deleteCheckContainer', ``)
    deleteCheckContainer.innerText = ''
    docArticle.appendChild(deleteCheckContainer)
    let deleteCheck = createElement('h4', 'deleteCheck', 'deleteCheck', `Are you sure you want to delete ${doc.title}?`)
    let deleteCheckBtn = createElement('button', 'deleteCheckBtn', 'deleteCheckBtn', `Yes delete`)
    let cancelDeleteBtn = createElement('button', 'cancelDeleteBtn', 'cancelDeleteBtn', `Cancel`)
    deleteCheckContainer.append(deleteCheck, deleteCheckBtn, cancelDeleteBtn)

    cancelDeleteBtn.addEventListener('click', () => {
        deleteCheckContainer.remove()
    })
    deleteCheckBtn.addEventListener('click', () => {

        let deleteDoc = {
         userId: localStorage.getItem('loggedInUser')
          };
         console.log(deleteDoc);
     fetch(`http://localhost:3000/api/document/delete/${deleteDocBtn.id}`, {
         method: 'DELETE',
         headers: {
             'Content-Type': 'application/json',
         },
         body: JSON.stringify(deleteDoc)
     })
     .then(res => res.json())
     .then((doc) => {
         console.log(doc);
         myDocuments()
         undoDelete(docTitle)
        //  setTimeout(() => {deleteCheckContainer.remove()
        // myDocuments()}, 5000);
     })
    })
}