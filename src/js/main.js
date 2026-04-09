// Import our custom CSS
import '../scss/styles.scss';
import DOM from './dom';
import _ from 'lodash';
import generator from './qrcodeGenerator';

// Import only the Bootstrap components we need
import { Popover } from 'bootstrap';
import tab from "bootstrap/js/src/tab";
import {disableQRCodeControls, enableQRCodeControls} from "./ui";
import {filled, valid} from "./input";
import {buildCache} from "./cache";
import {tabIdMap} from "./constants";

(function init() {

    function generateLinkQRCode() {
        const isActive = _cache.isTabActive(tabIdMap.link);
        if(isActive) {
            //_.set(cache,['data','link','value'], linkInput.value);// Update cache
            _cache.updateLink({value: linkInput.value});
            if(filled(linkInput) && valid(linkInput)) {
                enableQRCodeControls({downloadBtn,noDataMessage,canvas});
                generator.generate(canvas, linkInput.value);
            } else {
                disableQRCodeControls({downloadBtn,noDataMessage,canvas});
            }
        }
    }

    const _cache = buildCache();

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
                input: DOM.elm(`#link-input`),
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
    //_.set(cache,['tabs',activeId,'active'], true);

    _cache.updateActiveTab(activeId);

    tabEls.forEach(elm => {
        elm.addEventListener('shown.bs.tab', event => {
            const activeId = event.target.getAttribute('id');
            const previousId = event.relatedTarget.getAttribute('id');
            _cache.updateActiveTab(activeId,previousId);
            console.log('cache: ',cache);
            //console.log(active.getAttribute('id'),active.getAttribute('data-bs-target'));
            const tabData = _cache.fetchTab(activeId);

        })
    });

    const canvas = DOM.elm(`#qr-code-canvas`)
    const noDataMessage = DOM.elm(`#no-data-message`);
    const downloadBtn = DOM.elm(`#download-btn`);

    const linkInput = DOM.elm(`#link-input`);
    _cache.updateLink({value: linkInput.value});
    // _.set(cache,['data','link','value'], linkInput.value);// Init cache value
    // _.set(cache,['data','link','input'], linkInput);
    generateLinkQRCode();
    linkInput.addEventListener('keyup', () => {
        generateLinkQRCode();
    });


})();
