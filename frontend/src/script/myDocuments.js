let mainContainer = document.getElementById('mainContainer');
import createElement from '../lib/createElement.mjs';
import getEditDocument from './editDocument.js';
import getViewDoc from './viewDoc.mjs';
import errorMsg from "../lib/errorMsg.mjs";
import deleteDoc from './deleteDoc.mjs';

export default function myDocuments() {
    mainContainer.innerText = '';
    let docArticleContainer = createElement(
        'article',
        `docArticleContainer`,
        'docArticleContainer',
        ''
    );
    mainContainer.appendChild(docArticleContainer);

    fetch(`http://localhost:3000/api/document/all/${localStorage.getItem('loggedInUser')}`, {
        method: 'GET',
    })
    .then((res) => {
        if (res.status !== 200) {
            errorMsg(mainContainer, 'No documents found, create a document to view') 


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
                ''
            );
            docArticleContainer.appendChild(docArticle);

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
                ''
            );
            
            const textLimit = 200; 
            if (doc.documentBody && doc.documentBody.length > textLimit) {
                const minifiedContent = doc.documentBody.substring(0, textLimit) + '...';
                docBody.innerHTML = minifiedContent;
            } else {
                docBody.innerHTML = doc.documentBody || 'Document is empty';
            }
            
            
            docBody.style.fontSize = '0.5rem';
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

            let deleteDocBtn = createElement(
                'button',
                `${doc.documentId}`,
                'deleteDocBtn',
                'Delete document'
            );
            docArticle.appendChild(deleteDocBtn);

            viewDocBtn.addEventListener('click', () => getViewDoc(viewDocBtn, formatCreateDate, formatUpdateDate))
            

            editDocBtn.addEventListener('click', () => getEditDocument(editDocBtn));

            deleteDocBtn.addEventListener('click', () => deleteDoc(docArticle, doc));

        });
    })
    .catch((error) => {
        console.error('Error fetching or processing documents:', error);
    });
}