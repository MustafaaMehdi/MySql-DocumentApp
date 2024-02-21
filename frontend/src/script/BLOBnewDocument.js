// import FroalaEditor from '.../node_modules/froala-editor';
import createElement from './createElement.js';

const reader = new FileReader()

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

	let newDocumentTitle = createElement(
		'input',
		'newDocumentTitle',
		'newDocumentTitle',
		''
	);
	docEditorContainer.appendChild(newDocumentTitle);

	let textContent = createElement('textarea', 'textContent', 'textContent', '');
	textContent.setAttribute('maxlength', '50');
	docEditorContainer.appendChild(textContent);

	textContent = new FroalaEditor('#textContent', {
		maxLength: 10,
		height: 500,
		// toolbarButtons: [
		//     'undo', 'redo', '|',
		//     'bold', 'italic', 'underline', 'strikeThrough', '|',
		//     'fontFamily', 'fontSize', '|',
		//     'color', 'background', 'colorsBackground',
		//     'formatBlock', 'align', 'insertOrderedList', 'insertUnorderedList', '|',
		//     'html'
		// ],
		fontFamily: {
			'Arial,Helvetica,sans-serif': 'Arial',
			'Georgia,serif': 'Georgia',
			'Impact,Charcoal,sans-serif': 'Impact',
			'Tahoma,Geneva,sans-serif': 'Tahoma',
			'Times New Roman,Times,serif': 'Times New Roman',
			'Verdana,Geneva,sans-serif': 'Verdana',
		},
		fontSize: ['8', '10', '12', '14', '18', '24', '36'],
		colorsStep: 7,
		colorsText: [
			'#15E67F',
			'#E3DE8C',
			'#D8A076',
			'#D83762',
			'#76B6D8',
			'#FFFFFF',
			'#1C7A90',
			'#249CB8',
			'#4ABED9',
			'#FBD75B',
			'#FBE571',
			'REMOVE',
		],
		colorsBackground: [
			'#15E67F',
			'#E3DE8C',
			'#D8A076',
			'#D83762',
			'#76B6D8',
			'REMOVE',
			'#1C7A90',
			'#249CB8',
			'#4ABED9',
			'#FBD75B',
			'#FBE571',
			'#FFFFFF',
		]
	});

	let saveBtn = createElement('button', 'saveBtn', 'saveBtn', 'SAVE');

	docEditorContainer.appendChild(saveBtn);

	let pTag = createElement('p', 'pTag', 'pTag', 'Text: ');

	saveBtn.addEventListener('click', () => {
        let sendDoc = {userId: '75f88fa3-226c-4718-bd78-dfd18a466207'}
		fetch('http://localhost:3000/api/document/getdoc/33', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(sendDoc),
		})
            .then((res => res.json()))
            .then((document) => {

                let binaryData = document.data[0].documentBody.data;
let blob = new Blob([binaryData], { type: 'application/octet-stream' });

reader.onload = function (event) {
    let text = event.target.result;
    console.log(text);
    // Process the text or update your UI here
};

reader.readAsText(blob);
                // console.log(document.data[0]);
                // let blob = document.data[0].documentBody.data
                // let text = reader.readAsText(blob)
                // console.log(text);
                // pTag.innerText = document.documentBody.text();
                // mainContainer.append(pTag)
            })
        // const blob = new Blob([textContent.html.get()], { type: 'text/html' })
        // console.log(blob);
        // pTag.innerHTML = blob
        // mainContainer.append(pTag)
		// let sendDoc = {
            
		// 	userId: localStorage.getItem('loggedInUser'),
		// 	title: 'Test',
        //     documentBody: textContent.html.get()
        // 		};
        //     console.log(sendDoc);
		// fetch('http://localhost:3000/api/document/add', {
		// 	method: 'POST',
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 	},
		// 	body: JSON.stringify(sendDoc)
		// })
        // .then(res => res.json())
        // .then(data => console.log(data))
	});
}

// tinymce.init({
//     selector: '#textContent',
//     height: '500',
//     toolbar:
//       'undo redo | formatselect | fontselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | outdent indent',
//     setup: (editor) => {
//       editor.on('init', () => {
//         editor.setContent(textContent.value ? textContent.value : '');
//         console.log('helllloooooo!!!!!!');
//       });
//       editor.on('change', () => {
//         editor.save();
//         console.log('helllloooooo');
//       });
//     },
//   });
