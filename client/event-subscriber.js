import eventHandler from './event-handler.js';

export const subscribeToEvents = (elementsToSubscribe) => {
    elementsToSubscribe.forEach((element) => {
        if (element.selector !== 'document') {
            document.querySelectorAll(element.selector)
                .forEach((selectedElement) => selectedElement
                    .addEventListener(element.event, element.handler));
        } else {
            document.addEventListener(element.event, element.handler);
        }
    });

};

const generalElements = [
    {
        'selector': '.row-content',
        'event': 'click',
        'handler': function () {
            eventHandler.showDetails(this);
        }
    },
    {
        'selector': '.delete-button',
        'event': 'click',
        'handler': function (event) {
            eventHandler.delete(this);
            event.stopPropagation();
        }
    },
    {
        'selector': '.edit-button',
        'event': 'click',
        'handler': function (event) {
            eventHandler.showUpdateWindow(this);
            event.stopPropagation();
        }
    },
    {
        'selector': 'document',
        'event': 'delete-succeed',
        'handler': function (event) {
            eventHandler.completeDeletion(event);
        }
    },
    {
        'selector': 'document',
        'event': 'delete-failed',
        'handler': function (event) {
            eventHandler.completeDeletion(event);
        }
    },
    {
        'selector': 'document',
        'event': 'update-succeed',
        'handler': function (event) {
            eventHandler.completeUpdate(event);
        }
    },
    {
        'selector': 'document',
        'event': 'update-failed',
        'handler': function (event) {
            eventHandler.completeUpdate(event);
        }
    }
];

const modalElements = [
    {
        'selector': '.modal__close-button',
        'event': 'click',
        'handler': function () {
            eventHandler.closeModalWindow();
        }
    },
    {
        'selector': '.modal__submit-button',
        'event': 'click',
        'handler': function () {
            eventHandler.closeModalWindow();
            eventHandler.updateElement(this);
        }
    }
    //,
    // {
    //     'selector': 'window',
    //     'event': 'click',
    //     'handler': function (event) {
    //         let modal = document.querySelector('.modal');
    //         if (event.target === modal) {
    //             eventHandler.closeModalWindow();
    //         }
    //     }
    // }
];

export const subscribers = {
    'general':generalElements,
    'modal':modalElements
};