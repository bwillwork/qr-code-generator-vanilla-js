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

(function init() {


    const elmCache = buildElementCache(selectors);
    const linkGeneratorFunc = buildLinkGeneratorFunc(elmCache);
    const textGeneratorFunc = buildTextGeneratorFunc(elmCache);
    const emailGeneratorFunc = buildEmailGeneratorFunc(elmCache);

    function condition(key1,key2) {
        return _.isEqual(key1,key2);
    }
    const to = selectors.emailTo;
    const subject = selectors.emailSubject;
    const body = selectors.emailBody;

    const chooseGenerationFunc = choose(condition,
        {key: tabIdMap.link, execFunc: () => linkGeneratorFunc(elmCache, selectors.link, tabIdMap.link)},
        {key: tabIdMap.text, execFunc: () => textGeneratorFunc(elmCache, selectors.text, tabIdMap.text)},
        {key: tabIdMap.email, execFunc: () => emailGeneratorFunc(elmCache, {to,subject,body}, tabIdMap.email)},
    );


    // Create popovers (bootstrap)
    const popovers = elmCache.getElementFromSelector(selectors.popovers);
    console.log(popovers);
    popovers.forEach(popover => (new Popover(popover)));

    // Init Tab Cache
    const tabEls = elmCache.getElementFromSelector(selectors.allTabs);
    tabEls.forEach(elm => {
        elm.addEventListener('shown.bs.tab', event => {
            const activeId = event.target.getAttribute('id');
            const previousId = event.relatedTarget.getAttribute('id');
            chooseGenerationFunc(activeId);
        });
    });

    // Init Link Event Hooks
    const linkInput = elmCache.getElementFromSelector(selectors.link)[0];
    linkGeneratorFunc(elmCache, selectors.link, tabIdMap.link);
    linkInput.addEventListener('keyup', () => linkGeneratorFunc(elmCache, selectors.link, tabIdMap.link));

    // Init Text Event Hooks
    const textInput = elmCache.getElementFromSelector(selectors.text)[0];
    textGeneratorFunc(elmCache, selectors.text, tabIdMap.text);
    textInput.addEventListener('keyup', () => textGeneratorFunc(elmCache, selectors.text, tabIdMap.text));

    // Init Email Event Hooks
    const toInput = elmCache.getElementFromSelector(to)[0];
    const subjectInput = elmCache.getElementFromSelector(subject)[0];
    const bodyInput = elmCache.getElementFromSelector(body)[0];
    emailGeneratorFunc(elmCache, {to,subject,body}, tabIdMap.email);
    toInput.addEventListener('keyup', () => emailGeneratorFunc(elmCache, {to,subject,body}, tabIdMap.email));
    subjectInput.addEventListener('keyup', () => emailGeneratorFunc(elmCache, {to,subject,body}, tabIdMap.email));
    bodyInput.addEventListener('keyup', () => emailGeneratorFunc(elmCache, {to,subject,body}, tabIdMap.email));


})();
