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

(function init() {


    const elmCache = buildElementCache(selectors);
    const linkGeneratorFunc = buildLinkGeneratorFunc(elmCache);
    const textGeneratorFunc = buildTextGeneratorFunc(elmCache);

    function condition(key1,key2) {
        return _.isEqual(key1,key2);
    }
    const chooseGenerationFunc = choose(condition,
        {key: tabIdMap.link, execFunc: () => linkGeneratorFunc(elmCache, selectors.link, tabIdMap.link)},
        {key: tabIdMap.text, execFunc: () => textGeneratorFunc(elmCache, selectors.text, tabIdMap.text)},
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


    const linkInput = elmCache.getElementFromSelector(selectors.link)[0];//DOM.elm(`#link-input`);
    linkGeneratorFunc(elmCache, selectors.link, tabIdMap.link);
    linkInput.addEventListener('keyup', () => linkGeneratorFunc(elmCache, selectors.link, tabIdMap.link));

    const textInput = elmCache.getElementFromSelector(selectors.text)[0];//DOM.elm(`#link-input`);
    textGeneratorFunc(elmCache, selectors.text, tabIdMap.text);
    textInput.addEventListener('keyup', () => textGeneratorFunc(elmCache, selectors.text, tabIdMap.text));


})();
