/* Modal
 * Author: Hart Liddell <hart@leapingfish.io>
 * Purpose: Open/close a simple modal
 */
import './simple-modal-es6.scss';
import { addEvent, removeEvent } from './helpers';

const modalHtml = function(content) {
    return `<div class="smpl-modal__content">
        <div class="smpl-modal__content__inner">${ content }</div>
        <button title="Close (Esc)" type="button" class="smpl-modal__close">×</button>
    </div>`;
}

const createDomElement = function(htmlContent) {

    // Create domNode to put html template in,
    // later we'll use basic javascript to drop this on the page
    const domNode = document.createElement('div');
    domNode.id = 'smpl-modal';
    domNode.innerHTML = modalHtml(htmlContent);
    return domNode;
}

const addNewModalElement = function(obj, content) {

    document.body.appendChild(createDomElement(content));
    obj.state.modal = document.getElementById('smpl-modal');
    obj.state.closeBtn = obj.state.modal.getElementsByClassName('smpl-modal__close')[0];

    // Close modal with Esc key
    addEvent(document, 'keyup', bindEscKeyToClose.bind(obj));

    // Close modal with close button
    addEvent(obj.state.closeBtn, 'click', () => {
        obj.close();
    });

    // Close modal by clicking on overlay background
    addEvent(obj.state.modal, 'click', (event) => {
        if (event.target.id === 'smpl-modal') {
            obj.close();
        }
    });
}

const bindEscKeyToClose = function(event) {
    if (event.keyCode == 27) {
        this.close();
    }
}

const closeModal = function() {
    removeEvent(document, 'keyup', bindEscKeyToClose);
    this.state.modal.remove();
    this.state.modal = false;
}

const openModal = function(htmlContent) {


    if (this.state.modal) {
        this.state.modal.getElementsByClassName('smpl-modal__content__inner')[0]
            .innerHTML = htmlContent;
    } else {
        addNewModalElement(this, htmlContent);
    }
}


export default {
    state: {},
    close: closeModal,
    open: openModal
};
