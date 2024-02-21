let mainContainer = document.getElementById('mainContainer');
import createElement from '../lib/createElement.mjs';
import getViewDocument from './editDocument.js';

export default function myDocuments() {
    mainContainer.innerText = ''
	fetch(
		`http://localhost:3000/api/document/all/${localStorage.getItem(
			'loggedInUser'
		)}`,
		{
			method: 'GET',
		}
	)
		.then((res) => {
			if (res.status !== 200) {
				categoryMessage.innerText = 'No documents yet';
				categoryFiter.appendChild(categoryMessage);

				throw new Error('You have no existing documents');
			}
			return res.json();
		})
		.then((userDocs) => {
			userDocs.forEach((doc) => {

                let creationDate = doc.createdAt; 
                let formatCreateDate = new Date(creationDate).toLocaleString();
                let updateDate = doc.lastUpdated; 
                let formatUpdateDate = new Date(updateDate).toLocaleString();

				let docArticle = createElement(
					'article',
					`docArticle${doc.documentId}`,
					'docArticle',
					``
				);
				mainContainer.appendChild(docArticle);

				let docTitle = createElement(
					'h3',
					`docTitle${doc.documentId}`,
					'docTitle',
					`${doc.title}`
				);
				docArticle.appendChild(docTitle);

				let docBody = createElement(
					'p',
					`docBody${doc.documentId}`,
					'docBody',
					``
				);
				docBody.innerHTML = doc.documentBody;
				docArticle.appendChild(docBody);
                
				let docCreationDate = createElement(
					'p',
					`docCreationDate${doc.createdAt}`,
					'docCreationDate',
					`Creation: ${formatCreateDate}`
				);
				docArticle.appendChild(docCreationDate);

                if (formatCreateDate !== formatUpdateDate) {
                let docUpdateDate = createElement(
					'p',
					`docBody${formatUpdateDate}`,
					'docCreationDate',
					`Updated: ${formatUpdateDate}`
				);
				docArticle.appendChild(docUpdateDate);
            }

				let viewDocBtn = createElement(
					'button',
					`${doc.documentId}`,
					'viewDocBtn',
					'View document'
				);
				docArticle.appendChild(viewDocBtn);

				let editDocBtn = createElement(
					'button',
					`${doc.documentId}`,
					'editDocBtn',
					'Edit document'
				);
				docArticle.appendChild(editDocBtn);

				viewDocBtn.addEventListener('click', () => {
					console.log(viewDocBtn.id);
				});

				editDocBtn.addEventListener('click', () => getViewDocument(editDocBtn));
			});
		});
}
