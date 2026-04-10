// Import our custom CSS
import '../scss/styles.scss';
import _ from 'lodash';
import generator from './qrcodeGenerator';

// Import only the Bootstrap components we need
import {Popover} from 'bootstrap';
import {disable, enable, hide, show} from "./ui";
import {filled, valid} from "./input";
import {buildElementCache} from "./cache";
import {selectors, tabIdMap} from "./constants";

(function init() {


    const elmCache = buildElementCache(selectors);

    function ifElse(conditionFunc, ifFunc, elseFunc) {
        return function(...values) {
            if(conditionFunc(...values)) return ifFunc(...values);
            else elseFunc(...values);
        };
    }

    function choose(conditionFunc,...choices) {
        return function(condition) {
            for(let choice of choices) {
                const {key, execFunc} = choice;
                if(conditionFunc(condition,key)) return execFunc();
            }
            return null;
        };
    }

    function enableQRCodeControls(elmCache) {
        const downloadBtn = elmCache.getElementFromSelector(selectors.downloadBtn)[0];
        const noDataMessage = elmCache.getElementFromSelector(selectors.noDataMessage)[0];
        const canvas = elmCache.getElementFromSelector(selectors.canvas)[0];
        enable(downloadBtn);
        hide(noDataMessage);
        show(canvas);
    }

    function disableQRCodeControls(elmCache) {
        const downloadBtn = elmCache.getElementFromSelector(selectors.downloadBtn)[0];
        const noDataMessage = elmCache.getElementFromSelector(selectors.noDataMessage)[0];
        const canvas = elmCache.getElementFromSelector(selectors.canvas)[0];
        disable(downloadBtn);
        show(noDataMessage);
        hide(canvas);
    }


    function isTabActive(elmCache,id) {
        const tabs = elmCache.getElementFromSelector(selectors.allTabs);
        const activeTab = tabs.find(t => t.classList.contains('active'));
        return _.isEqual(activeTab.id, id);
    }

    function isActiveAndValid(elmCache,id,isTabActiveFunc,isValidFunc) {
        return function(currentTabId,...dataElementIds) {
            const isActive = isTabActiveFunc(elmCache,currentTabId);
            const isValid = isValidFunc(elmCache,...dataElementIds);
            return isActive && isValid;
        };
    }

    function linkIsValid(elmCache,linkSelector) {
        const linkInput = elmCache.getElementFromSelector(linkSelector)[0];
        return filled(linkInput) && valid(linkInput)
    }
    const linkIsValidAndActiveFunc = isActiveAndValid(elmCache, tabIdMap.link, isTabActive, linkIsValid);
    const linkGeneratorFunc = ifElse(
        (elmCache,linkSelector,tabId) => linkIsValidAndActiveFunc(tabId,linkSelector),
        function(elmCache,linkSelector) {
            enableQRCodeControls(elmCache);
            const canvas = elmCache.getElementFromSelector(selectors.canvas)[0];
            const linkInput = elmCache.getElementFromSelector(linkSelector)[0];
            generator.generate(canvas, linkInput.value);
        },
        function(elmCache) {
            disableQRCodeControls(elmCache);
        });

    function isTextValid(elmCache,textSelector) {
        const textInput = elmCache.getElementFromSelector(textSelector)[0];
        return filled(textInput);
    }
    const textIsValidAndActiveFunc = isActiveAndValid(elmCache, tabIdMap.text, isTabActive, isTextValid);
    const textGeneratorFunc = ifElse(
        (elmCache,textSelector,tabId) => textIsValidAndActiveFunc(tabId,textSelector),
        function(elmCache,textSelector) {
            enableQRCodeControls(elmCache);
            const canvas = elmCache.getElementFromSelector(selectors.canvas)[0];
            const textInput = elmCache.getElementFromSelector(textSelector)[0];
            generator.generate(canvas, textInput.value);
        },
        function(elmCache) {
            disableQRCodeControls(elmCache);
        });


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
