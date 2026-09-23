// Import our custom CSS
import '../scss/styles.scss';

import {allSelectors, tabIdMap, inputSelectors} from "./constants";
import generator from './qrcode/generate';
import DOM from "./dom";
import {disable, enable} from "./ui";


import domCache from "./cache/domCache";
//import appCache from "./cache/appCache";
import {getGeneratorMap} from "./util/featureGeneratorUtil";
import * as tabs from "./ui/tabs";



(function init() {

    function ensureArray(elms) {
        return Array.isArray(elms) ? elms : [elms];
    }

    function bindInputs(selectors,handler) {
        const selectorList = ensureArray(selectors);

        selectorList.forEach(selector => {
            const element = domCache.getElementFromSelector(selector)[0];
            if (element) element.addEventListener('input', handler);
        });
    }


    const generatorMap = getGeneratorMap();
    tabs.initTabs();

    // Init Link Event Hooks
    generatorMap.link(domCache, allSelectors.link, tabIdMap.link);// Needed for the first page
    bindInputs([allSelectors.link],() => generatorMap.link(domCache, allSelectors.link, tabIdMap.link));
    //const linkInput = domCache.getElementFromSelector(allSelectors.link)[0];
    //linkInput.addEventListener('keyup', () => generatorMap.link(domCache, allSelectors.link, tabIdMap.link));

    // Init Text Event Hooks
    bindInputs([allSelectors.text],() => generatorMap.text(domCache, allSelectors.text, tabIdMap.text));
    //const textInput = domCache.getElementFromSelector(allSelectors.text)[0];
    //textInput.addEventListener('keyup', () => generatorMap.text(domCache, allSelectors.text, tabIdMap.text));

    // Init Email Event Hooks
    const emailSelectors = Object.values(inputSelectors.email);
    bindInputs(emailSelectors,() => generatorMap.email(domCache, inputSelectors.email, tabIdMap.email));
    //const {to,subject,body} = inputSelectors.email;
    //const toInput = domCache.getElementFromSelector(to)[0];
    //const subjectInput = domCache.getElementFromSelector(subject)[0];
    //const bodyInput = domCache.getElementFromSelector(body)[0];
    //toInput.addEventListener('keyup', () => generatorMap.email(domCache, inputSelectors.email, tabIdMap.email));
    //subjectInput.addEventListener('keyup', () => generatorMap.email(domCache, inputSelectors.email, tabIdMap.email));
    //bodyInput.addEventListener('keyup', () => generatorMap.email(domCache, inputSelectors.email, tabIdMap.email));

    // Text Message Event Hooks
    const smsSelectors = Object.values(inputSelectors.sms);
    bindInputs(smsSelectors,() => generatorMap.sms(domCache, inputSelectors.sms, tabIdMap.textMessage));
    //const {phoneNumbers,message} = inputSelectors.sms;
    //const phoneNumbersInput = domCache.getElementFromSelector(phoneNumbers)[0];
    //const messageInput = domCache.getElementFromSelector(message)[0];
    //phoneNumbersInput.addEventListener('keyup', () => generatorMap.sms(domCache, inputSelectors.sms, tabIdMap.textMessage));
    //messageInput.addEventListener('keyup', () => generatorMap.sms(domCache, inputSelectors.sms, tabIdMap.textMessage));

    // Wifi Event Hooks
    const wifiSelectors = Object.values(inputSelectors.wifi);
    bindInputs(wifiSelectors,() => generatorMap.wifi(domCache, inputSelectors.wifi, tabIdMap.wifi));
    //const {ssid,password} = inputSelectors.wifi;
    //const ssidInput = domCache.getElementFromSelector(ssid)[0];
    //const passwordInput = domCache.getElementFromSelector(password)[0];
    //ssidInput.addEventListener('keyup', () => generatorMap.wifi(domCache, {ssid,password}, tabIdMap.wifi));
    //passwordInput.addEventListener('keyup', () => generatorMap.wifi(domCache, {ssid,password}, tabIdMap.wifi));

    // Download Button
    const downloadBtn = domCache.getElementFromSelector(allSelectors.downloadBtn)[0];
    downloadBtn.addEventListener('click',function() {
        disable(downloadBtn);
        generator.produceImageUrl((url => {
            DOM.createDownloadAnchor(url,'qrcode').click();
        }),() => {
            enable(downloadBtn);
        });
    });

})();
