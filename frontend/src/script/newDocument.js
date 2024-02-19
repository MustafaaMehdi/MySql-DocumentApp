// import FroalaEditor from '.../node_modules/froala-editor';
import createElement from "./createElement.js";

let mainContainer = document.getElementById('mainContainer');

export default function newDocument() {
    mainContainer.innerText = '';

    let docEditorContainer = createElement(
        'div',
        'docEditorContainer',
        'docEditorContainer',
        ''
    );
    mainContainer.appendChild(docEditorContainer);

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
            'color', 'background', '|',   
            'formatBlock', 'align', 'insertOrderedList', 'insertUnorderedList', '|',
            'html'
        ],
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
                const textCons = editor.html.get();
                console.log(textCons);
            }
        }
    });

    let saveBtn = createElement(
        'button',
        'saveBtn',
        'saveBtn',
        'SAVE'
    );
    
    docEditorContainer.appendChild(saveBtn);

    saveBtn.addEventListener('click', () => {
        const savedText = editor.html.get();
        console.log(savedText);
    });
}