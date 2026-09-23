// Import our custom CSS
import '../scss/styles.scss';
import _ from 'lodash';

// Import only the Bootstrap components we need
import {Popover} from 'bootstrap';


import {allSelectors, tabIdMap, inputSelectors} from "./constants";
import {choose} from './builders';
import generator from './qrcodeGenerator';
import DOM from "./dom";
import {disable, enable} from "./ui";


import domCache from "./cache/domCache";
//import appCache from "./cache/appCache";
import {getGeneratorMap} from "./util/featureGeneratorUtil";
import {initTabs} from "./ui/tabs";


(function init() {

    const generatorMap = getGeneratorMap();

    function condition(key1,key2) {
        return _.isEqual(key1,key2);
    }

    const {to,subject,body} = inputSelectors.email;
    //const to = allSelectors.emailTo;
    //const subject = allSelectors.emailSubject;
    //const body = allSelectors.emailBody;

    const {phoneNumbers,message} = inputSelectors.sms;
    //const phoneNumbers = allSelectors.textMessagePhone;
    //const message = allSelectors.textMessageBody;

    const {ssid,password} = inputSelectors.wifi;
    //const ssid = allSelectors.wifiSSID;
    //const password = allSelectors.wifiPassword;

    /*
    const chooseFeatureFunc = choose(condition,
        {key: tabIdMap.link, execFunc: () => generatorMap.link(domCache, allSelectors.link, tabIdMap.link)},
        {key: tabIdMap.text, execFunc: () => generatorMap.text(domCache, allSelectors.text, tabIdMap.text)},
        {key: tabIdMap.email, execFunc: () => generatorMap.email(domCache, {to,subject,body}, tabIdMap.email)},
        {key: tabIdMap.textMessage, execFunc: () => generatorMap.sms(domCache, {phoneNumbers,message}, tabIdMap.textMessage)},
        {key: tabIdMap.wifi, execFunc: () => generatorMap.wifi(domCache, {ssid,password}, tabIdMap.wifi)},
    );
    */

    /*
    // Create popovers (bootstrap)
    const popovers = domCache.getElementFromSelector(allSelectors.popovers);
    popovers.forEach(popover => (new Popover(popover)));

    // Init Tabs
    const tabEls = domCache.getElementFromSelector(allSelectors.allTabs);
    tabEls.forEach(elm => {
        elm.addEventListener('shown.bs.tab', event => {
            const activeId = event.target.getAttribute('id');
            chooseFeatureFunc(activeId);
        });
    });
    */
    initTabs();


    // Init Link Event Hooks
    const linkInput = domCache.getElementFromSelector(allSelectors.link)[0];
    generatorMap.link(domCache, allSelectors.link, tabIdMap.link);
    linkInput.addEventListener('keyup', () => generatorMap.link(domCache, allSelectors.link, tabIdMap.link));

    // Init Text Event Hooks
    const textInput = domCache.getElementFromSelector(allSelectors.text)[0];
    textInput.addEventListener('keyup', () => generatorMap.text(domCache, allSelectors.text, tabIdMap.text));

    // Init Email Event Hooks
    const toInput = domCache.getElementFromSelector(to)[0];
    const subjectInput = domCache.getElementFromSelector(subject)[0];
    const bodyInput = domCache.getElementFromSelector(body)[0];
    toInput.addEventListener('keyup', () => generatorMap.email(domCache, inputSelectors.email, tabIdMap.email));
    subjectInput.addEventListener('keyup', () => generatorMap.email(domCache, inputSelectors.email, tabIdMap.email));
    bodyInput.addEventListener('keyup', () => generatorMap.email(domCache, inputSelectors.email, tabIdMap.email));

    // Text Message Event Hooks
    const phoneNumbersInput = domCache.getElementFromSelector(phoneNumbers)[0];
    const messageInput = domCache.getElementFromSelector(message)[0];
    phoneNumbersInput.addEventListener('keyup', () => generatorMap.sms(domCache, inputSelectors.sms, tabIdMap.textMessage));
    messageInput.addEventListener('keyup', () => generatorMap.sms(domCache, inputSelectors.sms, tabIdMap.textMessage));

    // Wifi Event Hooks
    const ssidInput = domCache.getElementFromSelector(ssid)[0];
    const passwordInput = domCache.getElementFromSelector(password)[0];
    ssidInput.addEventListener('keyup', () => generatorMap.wifi(domCache, {ssid,password}, tabIdMap.wifi));
    passwordInput.addEventListener('keyup', () => generatorMap.wifi(domCache, {ssid,password}, tabIdMap.wifi));

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
