import htmlGenerator from './html-generators/html-generator.js';
import htmlCreator from './html-generators/html-helpers.js';

const renderPage = () => {
    let bodyContent = htmlCreator.createDiv(['page-content']);
    bodyContent.append(renderHeader());

    let body = document.querySelector('body');
    body.append(bodyContent);
    return bodyContent;
};

const renderContentPage = (toys) => {
    const toysContent = renderToysTable(toys);
    const pageContent = renderPage();
    pageContent.append(toysContent);
};

const renderErrorPage = (error) => {
    const errorHTML = htmlGenerator.generateErrorMessage(error.message);
    const pageContent = renderPage();
    pageContent.append(errorHTML);
};

const renderHeader = () => {
    const headerText = 'Welcome to Knitted Toys Store!';
    return htmlCreator.createHeader('h1', headerText, ['page-header']);
};

const renderToysTable = (toys) => {
    let tableWrap = htmlCreator.createDiv(['toys-store']);
    if (toys.length === 0) return tableWrap;

    const table = htmlGenerator.generateToyTable(columnsForTable, toys);
    tableWrap.append(table);
    return tableWrap;
};

const columnsForTable = {
    'id': 'ID',
    'name': 'Name',
    'creationDate': 'Date of creation'
};

export default {
    renderContentPage,
    renderToysTable,
    renderErrorPage
}


