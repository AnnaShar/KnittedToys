import serverRequests from './server-requests.js';
import customEvents from './custom-events.js';
import eventMessage from './event-messages.js';
import render from './main-page-rendering.js';
import {subscribeToEvents, subscribers} from "./event-subscriber.js";
import htmlGenerator from './html-generators/html-modal-generator.js';

const showUpdateWindow = async (item) => {
    const row = item.closest('.row-content');
    const id = row.getAttribute('data-row-id');
    try {
        let toy = await serverRequests.getToy(id);
        let page = document.querySelector('.page-content');
        let modal = htmlGenerator.generateModalWindow('updating toy', Object.entries(toy), 'update');
        modal.setAttribute('data-toy-id', id);
        page.append(modal);
        subscribeToEvents(subscribers.modal);
    } catch (e) {
        //throw unsuccessful event
    }
};

const updateElement = async (item) => {
    const modal = item.closest('.modal');
    const id = modal.getAttribute('data-toy-id');
    let rows = modal.querySelectorAll('.details-row');
    let newToy = {};
    rows.forEach(row => {
        let newToyKey = row.querySelector('.details-row__key').innerHTML;
        let newToyValue = row.querySelector('.details-row__value').value;
        newToy[newToyKey] = newToyValue;
    });

    try {
        await serverRequests.updateToy(id, newToy);
        customEvents.updateSucceed(id);

    } catch (e) {
        customEvents.updateFailed(id);
    }
};

const deleteElement = async (item) => {
    const row = item.closest('.row-content');
    const id = row.getAttribute('data-row-id');
    try {
        await serverRequests.deleteToy(id);
        customEvents.deleteSucceed(id);
    } catch (e) {
        customEvents.deleteFailed(id);
    }

};

const showDetails = async (item) => {
    const id = item.getAttribute('data-row-id');
    try {
        let toy = await serverRequests.getToy(id);
        let page = document.querySelector('.page-content');
        const modal = htmlGenerator.generateModalWindow('Details', Object.entries(toy), 'show');

        page.append(modal);
        subscribeToEvents(subscribers.modal);
    } catch (e) {

    }
};


const completeDeletion = async (event) => {
    eventMessage.show(event.detail.message, event.detail.status);
    await updateTable();
    setTimeout(() => {
        eventMessage.clear();
    }, 3000);
};

const completeUpdate = async (event) => {
    eventMessage.show(event.detail.message, event.detail.status);
    await updateTable();
    let updatedRow = document.querySelector(`[data-row-id="${event.detail.id}"`);
    updatedRow.classList.add('updated');
    setTimeout(() => {
        eventMessage.clear();
        updatedRow.classList.remove('updated');
    }, 3000);
};


const updateTable = async () => {
    const table = document.querySelector('.toys-store');
    const updatedTable = await render.renderToyTable();
    table.parentNode.replaceChild(updatedTable, table);
    subscribeToEvents(subscribers.general);
};

const closeModalWindow = () => {
    let modals = document.querySelectorAll('.modal');
    modals.forEach(modal => modal.style.display = 'none');
};

export default {
    showUpdateWindow: showUpdateWindow,
    updateElement: updateElement,
    delete: deleteElement,
    showDetails: showDetails,
    completeDeletion: completeDeletion,
    completeUpdate: completeUpdate,
    closeModalWindow: closeModalWindow

}