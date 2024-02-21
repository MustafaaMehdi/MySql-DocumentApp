import createElement from "../lib/createElement.mjs";
import myDocuments from "./myDocuments.js";
import getEditDocument from './editDocument.js';

export default function getViewDoc(viewDocBtn) {
        // let docId = editDocBtn.id
        let userId = {
                userId: localStorage.getItem('loggedInUser')
                 };
                console.log(userId);
            fetch(`http://localhost:3000/api/document/getdoc/${viewDocBtn.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userId)
            })
            .then(res => res.json())
            .then((doc) => {
                console.log('Body: ', doc.data[0].documentBody);
                console.log('title: ', doc.data[0].title);
                mainContainer.innerText = '';
            
                let docEditorContainer = createElement(
                    'div',
                    'docEditorContainer',
                    'docEditorContainer',
                    ''
                );
                mainContainer.appendChild(docEditorContainer);
            
                let documentTitle = createElement(
                    'h2',
                    'documentTitle',
                    'documentTitle',
                    doc.data[0].title
                );
                docEditorContainer.appendChild(documentTitle);
            
                let textContent = createElement(
                    'p',
                    'textContent',
                    'textContent',
                    ''
                );
                textContent.innerHTML = doc.data[0].documentBody
                docEditorContainer.appendChild(textContent);
            
                let editDocBtn = createElement(
                    'button',
                    `${viewDocBtn.id}`,
                    'editDocBtn',
                    'Edit document'
                );
                let cancelBtn = createElement(
                    'button',
                    'cancelBtn',
                     `${editDocBtn.id}`,
                    'Cancel'
                );
                
                
                docEditorContainer.append(cancelBtn, editDocBtn);

                cancelBtn.addEventListener('click', myDocuments);
            
                editDocBtn.addEventListener('click', () => getEditDocument(editDocBtn))

            })
    
}