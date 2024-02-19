let navBar = document.getElementById('navBar');
import createElement from "./createElement.js"
import newDocument from "./newDocument.js";
import myDocuments from "./myDocuments.js";
export default function sideNavRender() {
    let logoContainer = createElement(
        'div',
        `logoContainer`,
        'logoContainer',
        `UniDoc`
    );
    navBar.appendChild(logoContainer)

    let logoContainerImg = createElement(
        'img',
        `logoContainerImg`,
        'logoContainerImg',
        ``
    );
    logoContainer.appendChild(logoContainerImg)

    logoContainerImg.setAttribute('src', './assets/logo/logo.png')
    logoContainerImg.setAttribute('alt', 'logo of unidoc')
    logoContainerImg.setAttribute('width', '50')

    let documentBtnContainer = createElement(
        'section',
        `documentBtnContainer`,
        'documentBtnContainer',
        ``
    );
    navBar.appendChild(documentBtnContainer)

    let myDocumentsBtn = createElement(
        'button',
        `myDocumentsBtn`,
        'myDocumentsBtn',
        `My documents`
    );
    let createDocumentBtn = createElement(
        'button',
        `createDocumentBtn`,
        'createDocumentBtn',
        `New document`
    );    

    documentBtnContainer.append(myDocumentsBtn, createDocumentBtn)

    let userSettingsContainer = createElement(
        'section',
        `userSettingsContainer`,
        'userSettingsContainer',
        ``
    );
    navBar.appendChild(userSettingsContainer)

    let userSettingsBtn = createElement(
        'button',
        `userSettingsBtn`,
        'userSettingsBtn',
        `My settings`
    );

    let profileBtn = createElement(
        'button',
        `userProfileBtn`,
        'userProfileBtn',
        `My Profile`
    );
    userSettingsContainer.append(userSettingsBtn, profileBtn)

    myDocumentsBtn.addEventListener('click', myDocuments)
    
    createDocumentBtn.addEventListener('click', newDocument)
}