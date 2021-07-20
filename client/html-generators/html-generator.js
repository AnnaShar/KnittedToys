import tableGenerator from './html-table-generator.js';
import errorGenerator from './html-error-generator.js';
import modalWindow from './html-modal-generator.js';

const generateToyTable = (columns, items) => {
    return tableGenerator.generateTable(columns, items);
};

const generateErrorMessage = (message) => {
    return errorGenerator.generateErrorMessage(message);
};

const generateModalWindow = (header, items)=>{
  return modalWindow.generateModalWindow(header,items);
};

export default {
    generateToyTable,
    generateErrorMessage,
    generateModalWindow
}