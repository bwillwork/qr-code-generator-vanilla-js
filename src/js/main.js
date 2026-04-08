// Import our custom CSS
import '../scss/styles.scss';
import DOM from './dom';
import _ from 'lodash';
import generator from './qrcodeGenerator';

// Import only the Bootstrap components we need
import { Popover } from 'bootstrap';
import tab from "bootstrap/js/src/tab";

(function init() {

    function valid(elm) {
        let isValid = false;
        if(elm.matches(':valid')) isValid = true;
        if(elm.matches(':invalid')) isValid = false;
        return isValid;
    }

    function filled(elm) {
        let isFilled = false;
        if(linkInput.value) isFilled = true;
        return isFilled
    }

    function enableQRCodeControls() {
        downloadBtn.classList.remove('disabled');
        noDataMessage.classList.add('d-none');
        canvas.classList.remove('d-none');
    }

    function disableQRCodeControls() {
        downloadBtn.classList.add('disabled');
        noDataMessage.classList.remove('d-none');
        canvas.classList.add('d-none');
    }

    function generateLinkQRCode() {
        if(_.isEqual(_.get(cache,['tabs','link-tab','active']), true)) {
            _.set(cache,['data','link','value'], linkInput.value);// Update cache
            if(filled(linkInput) && valid(linkInput)) {
                enableQRCodeControls();
                generator.generate(canvas, linkInput.value);
            } else {
                disableQRCodeControls();
            }
        }
    }

    const cache = {
        tabs: {
            "link-tab": {
                active: false,
            },
            "text-tab": {
                active: false,
            },
            "email-tab": {
                active: false,
            },
            "text-message-tab": {
                active: false,
            },
            "wifi-tab": {
                active: false,
            }
        },
        data: {
            link: {
                value: ''
            },
            text: {
                value: ''
            },
            email: {
                value: ''
            },
            text_message: {
                value: ''
            },
            wifi: {
                value: ''
            },
        }
    };

    // Create popovers (bootstrap)
    const popovers = DOM.elms('[data-bs-toggle="popover"]');
    popovers.forEach(popover => (new Popover(popover)));

    // Init Tab Cache
    const tabEls = DOM.elms('button[data-bs-toggle="tab"]');
    const active = tabEls.find(elm => elm.classList.contains('active'));
    const activeId = active.getAttribute('id');
    _.set(cache,['tabs',activeId,'active'], true);

    tabEls.forEach(elm => {
        elm.addEventListener('shown.bs.tab', event => {
            const activeId = event.target.getAttribute('id');
            const previousId = event.relatedTarget.getAttribute('id');
            _.set(cache,['tabs',activeId,'active'], true);
            _.set(cache,['tabs',previousId,'active'], false);
            console.log('cache: ',cache);
            //console.log(active.getAttribute('id'),active.getAttribute('data-bs-target'));
        })
    });

    const canvas = DOM.elm(`#qr-code-canvas`)
    const noDataMessage = DOM.elm(`#no-data-message`);
    const downloadBtn = DOM.elm(`#download-btn`);
    const linkInput = DOM.elm(`#link-input`);
    _.set(cache,['data','link','value'], linkInput.value);// Init cache value
    generateLinkQRCode();
    linkInput.addEventListener('keyup', () => {
        /*
        if(_.isEqual(_.get(cache,['tabs','link-tab','active']), true)) {
            _.set(cache,['data','link','value'], linkInput.value);// Update cache
            if(filled(linkInput) && valid(linkInput)) {
                downloadBtn.classList.remove('disabled');
                noDataMessage.classList.add('d-none');
                canvas.classList.remove('d-none');
                generator.generate(canvas, linkInput.value);
            }
        }
         */
        generateLinkQRCode();

    });


})();
