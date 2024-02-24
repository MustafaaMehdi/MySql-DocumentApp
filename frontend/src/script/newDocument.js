// import FroalaEditor from '.../node_modules/froala-editor';
import createElement from "../lib/createElement.mjs";
import myDocuments from "./myDocuments.js";
import saveDocument from "./saveDocument.js";

let mainContainer = document.getElementById('mainContainer');

export default function newDocument() {
    mainContainer.innerText = '';
    let documentBodyContent

    let docEditorContainer = createElement(
        'div',
        'docEditorContainer',
        'docEditorContainer',
        ''
    );
    mainContainer.appendChild(docEditorContainer);

    let createDocHeader = createElement(
        'h3',
        'createDocHeader',
        'createDocHeader',
        'Create new document'
    );
    mainContainer.appendChild(docEditorContainer);

    let documentTitle = createElement(
        'input',
        'documentTitle',
        'documentTitle',
        ''
    );
    documentTitle.placeholder = 'Title'
    docEditorContainer.append(createDocHeader, documentTitle);

    let textContent = createElement(
        'textarea',
        'textContent',
        'textContent',
        ''
    );
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

    let saveBtn = createElement(
        'button',
        'saveBtn',
        'saveBtn',
        'Save'
    );

    let cancelBtn = createElement(
        'button',
        'cancelBtn',
        'cancelBtn',
        'Cancel'
    );

    mainContainer.append(cancelBtn, saveBtn)

    cancelBtn.addEventListener('click', myDocuments);

    saveBtn.addEventListener('click', () => saveDocument(documentBodyContent, documentTitle));
}

