import createElement from "../lib/createElement.mjs";
import myDocuments from "./myDocuments.js";
import updateDocument from "./updateDocument.mjs";
export default function getEditDocument(editDocBtn) {
        // let docId = editDocBtn.id
        let userId = {
                userId: localStorage.getItem('loggedInUser')
                 };
                console.log(userId);
            fetch(`http://localhost:3000/api/document/getdoc/${editDocBtn.id}`, {
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
                let documentBodyContent
            
                let docEditorContainer = createElement(
                    'div',
                    'docEditorContainer',
                    'docEditorContainer',
                    ''
                );
                mainContainer.appendChild(docEditorContainer);
            
                let documentTitle = createElement(
                    'input',
                    'documentTitle',
                    'documentTitle',
                    ``
                );
                documentTitle.value = doc.data[0].title
                docEditorContainer.appendChild(documentTitle);
            
                let textContent = createElement(
                    'textarea',
                    'textContent',
                    'textContent',
                    ''
                );
                textContent.innerHTML = doc.data[0].documentBody
                docEditorContainer.appendChild(textContent);
            
                const editor = new FroalaEditor('#textContent', {
                    height: 500,
                    toolbarButtons: [
                        'undo', 'redo', '|',
                        'bold', 'italic', 'underline', 'strikeThrough', '|',
                        'fontFamily', 'fontSize', '|',  
                        'textColor', 'backgroundColor', '|',   
                        'formatBlock', 'align', 'insertOrderedList', 'insertUnorderedList', '|',
                        'html', '|', 'print'
                    ],
                    quickInsertTags: ['insertOrderedList', 'fontFamily' ],
                    fontFamily: {
                        'Arial,Helvetica,sans-serif': 'Arial',
                        'Georgia,serif': 'Georgia',
                        'Impact,Charcoal,sans-serif': 'Impact',
                        'Tahoma,Geneva,sans-serif': 'Tahoma',
                        'Times New Roman,Times,serif': 'Times New Roman',
                        'Verdana,Geneva,sans-serif': 'Verdana'
                    },
                    fontSize: ['8', '10', '12', '14', '18', '24', '36'],
                    colorsStep: 7, 
                    colorsText: ['#000000', '#333333', '#666666', '#999999', '#CCCCCC', '#FFFFFF'],
                    colorsBackground: ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'],  
                    events: {
                        'contentChanged': function () {
                            documentBodyContent = editor.html.get();
                            console.log(documentBodyContent);
                        }
                    }
                });
                console.log(documentBodyContent);
            
                let updateBtn = createElement(
                    'button',
                    `${editDocBtn.id}`,
                    'updateBtn',
                    'Save changes'
                );
                // updateBtn.setAttribute('disabled', '')
                let cancelBtn = createElement(
                    'button',
                    'cancelBtn',
                     `${editDocBtn.id}`,
                    'Cancel'
                );
                
                docEditorContainer.append(cancelBtn, updateBtn);

                cancelBtn.addEventListener('click', myDocuments);
            
                updateBtn.addEventListener('click', () => updateDocument(updateBtn, documentBodyContent, documentTitle));

            })
    
}