import serverRequests from './server-requests.js'
import htmlGenerator from './html-generators/html-generator.js';
import htmlCreator from './html-generators/html-creator.js';

const renderPage = () => {
    let body = document.querySelector('body');
    let bodyContent = renderBody();
    body.append(bodyContent);
        page.append(renderEventMessageWrap());
        page.append(await renderToyTable());
        return page;
};
const renderBody = () =>{
    let page = htmlCreator.createDiv(['page-content']);
    page.append(renderHeader());
    page.append(await renderToyTable());
};

const renderHeader = () => {
    const headerText = 'Welcome to Knitted Toys Store!';
    return htmlCreator.createHeader(headerText, 'h1', ['page-header']);
};

const renderEventMessageWrap = () => {
    return htmlCreator.createDiv(['event-message']);
};

const renderToyTable = async () => {
    try {
        const toys = await serverRequests.getAllToys();

        let tableWrap = htmlCreator.createDiv(['toys-store']);
        if (toys.length===0) return tableWrap;

        const table = htmlGenerator.generateToyTable(columnsForTable, toys);
        tableWrap.append(table);
        return tableWrap;
    } catch (e) {
        return renderErrorMessage(e);
    }
};

const columnsForTable = {
    'id': 'ID',
    'name': 'Name',
    'creationDate': 'Date of creation'
};

const renderErrorMessage = (errorMessage) => {
    return htmlGenerator.generateErrorMessage(errorMessage);
};

export default {
    renderMainPage: renderPage,
    renderToyTable: renderToyTable
}


