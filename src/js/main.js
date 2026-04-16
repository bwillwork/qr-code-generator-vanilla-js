// Import our custom CSS
import '../scss/styles.scss';
import _ from 'lodash';

// Import only the Bootstrap components we need
import {Popover} from 'bootstrap';
import {buildElementCache} from "./cache";
import {selectors, tabIdMap} from "./constants";
import {choose} from './builders';
import {buildLinkGeneratorFunc} from "./features/link";
import {buildTextGeneratorFunc} from "./features/text";
import {buildEmailGeneratorFunc} from "./features/email";
import {buildTextMessageGeneratorFunc} from "./features/textMessage";
import {buildWifiGeneratorFunc} from "./features/wifi";

(function init() {


    const elmCache = buildElementCache(selectors);
    const linkGeneratorFunc = buildLinkGeneratorFunc(elmCache);
    const textGeneratorFunc = buildTextGeneratorFunc(elmCache);
    const emailGeneratorFunc = buildEmailGeneratorFunc(elmCache);
    const textMessageGeneratorFunc = buildTextMessageGeneratorFunc(elmCache);
    const wifiGeneratorFunc = buildWifiGeneratorFunc(elmCache);

    function condition(key1,key2) {
        return _.isEqual(key1,key2);
    }
    const to = selectors.emailTo;
    const subject = selectors.emailSubject;
    const body = selectors.emailBody;

    const phoneNumbers = selectors.textMessagePhone;
    const message = selectors.textMessageBody;

    const ssid = selectors.wifiSSID;
    const password = selectors.wifiPassword;

    const chooseGenerationFunc = choose(condition,
        {key: tabIdMap.link, execFunc: () => linkGeneratorFunc(elmCache, selectors.link, tabIdMap.link)},
        {key: tabIdMap.text, execFunc: () => textGeneratorFunc(elmCache, selectors.text, tabIdMap.text)},
        {key: tabIdMap.email, execFunc: () => emailGeneratorFunc(elmCache, {to,subject,body}, tabIdMap.email)},
        {key: tabIdMap.textMessage, execFunc: () => textMessageGeneratorFunc(elmCache, {phoneNumbers,message}, tabIdMap.textMessage)},
        {key: tabIdMap.wifi, execFunc: () => wifiGeneratorFunc(elmCache, {ssid,password}, tabIdMap.wifi)},
    );


    // Create popovers (bootstrap)
    const popovers = elmCache.getElementFromSelector(selectors.popovers);
    popovers.forEach(popover => (new Popover(popover)));

    // Init Tab Cache
    const tabEls = elmCache.getElementFromSelector(selectors.allTabs);
    tabEls.forEach(elm => {
        elm.addEventListener('shown.bs.tab', event => {
            const activeId = event.target.getAttribute('id');
            chooseGenerationFunc(activeId);
        });
    });

    // Init Link Event Hooks
    const linkInput = elmCache.getElementFromSelector(selectors.link)[0];
    linkGeneratorFunc(elmCache, selectors.link, tabIdMap.link);
    linkInput.addEventListener('keyup', () => linkGeneratorFunc(elmCache, selectors.link, tabIdMap.link));

    // Init Text Event Hooks
    const textInput = elmCache.getElementFromSelector(selectors.text)[0];
    textInput.addEventListener('keyup', () => textGeneratorFunc(elmCache, selectors.text, tabIdMap.text));

    // Init Email Event Hooks
    const toInput = elmCache.getElementFromSelector(to)[0];
    const subjectInput = elmCache.getElementFromSelector(subject)[0];
    const bodyInput = elmCache.getElementFromSelector(body)[0];
    toInput.addEventListener('keyup', () => emailGeneratorFunc(elmCache, {to,subject,body}, tabIdMap.email));
    subjectInput.addEventListener('keyup', () => emailGeneratorFunc(elmCache, {to,subject,body}, tabIdMap.email));
    bodyInput.addEventListener('keyup', () => emailGeneratorFunc(elmCache, {to,subject,body}, tabIdMap.email));

    // Text Message Event Hooks
    const phoneNumbersInput = elmCache.getElementFromSelector(phoneNumbers)[0];
    const messageInput = elmCache.getElementFromSelector(message)[0];
    phoneNumbersInput.addEventListener('keyup', () => textMessageGeneratorFunc(elmCache, {phoneNumbers,message}, tabIdMap.textMessage));
    messageInput.addEventListener('keyup', () => textMessageGeneratorFunc(elmCache, {phoneNumbers,message}, tabIdMap.textMessage));

    // Wifi Event Hooks
    const ssidInput = elmCache.getElementFromSelector(ssid)[0];
    const passwordInput = elmCache.getElementFromSelector(password)[0];
    ssidInput.addEventListener('keyup', () => wifiGeneratorFunc(elmCache, {ssid,password}, tabIdMap.wifi));
    passwordInput.addEventListener('keyup', () => wifiGeneratorFunc(elmCache, {ssid,password}, tabIdMap.wifi));



})();
