import serverRequests from './server-requests.js'
import htmlGenerator from './html-generators/html-generator.js';

const renderPageContent = async () => {
    try {
        const toys = await serverRequests.getAllToys();
        let page = htmlGenerator.generateWrapPage();
        page.append(renderHeader());
        page.append(renderToyTable(toys));
        return page;
    } catch (e) {
        return renderErrorMessage(e);
    }
};

const renderHeader = ()=>{
    return htmlGenerator.generateHeader('Welcome to Knitted Toys Store!');
};

const renderToyTable = (toys) => {
    const columns = getColumnsForTable();
    let table = htmlGenerator.generateToyTable(columns, toys);
    return table;
};

const getColumnsForTable = () => {
    return {
        'id': 'ID',
        'name': 'Name',
        'creationDate': 'Date of creation'
    };
};
const renderErrorMessage = (errorMessage) => {
    return htmlGenerator.generateErrorMessage(errorMessage);
};



