let navBar = document.getElementById('navBar');
import createElement from "../lib/createElement.mjs"
import newDocument from "./newDocument.js";
import myDocuments from "./myDocuments.js";
import getUserProfile from "./getUserProfile.mjs";

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

    // let userSettingsBtn = createElement(
    //     'button',
    //     `userSettingsBtn`,
    //     'userSettingsBtn',
    //     `Settings`
    // );

    let profileBtn = createElement(
        'button',
        `userProfileBtn`,
        'userProfileBtn',
        `Profile`
    );
    userSettingsContainer.appendChild(profileBtn)

    myDocumentsBtn.addEventListener('click', myDocuments)
    
    createDocumentBtn.addEventListener('click', newDocument)

    profileBtn.addEventListener('click', getUserProfile)
}