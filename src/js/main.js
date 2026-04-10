// Import our custom CSS
import '../scss/styles.scss';
import _ from 'lodash';
import generator from './qrcodeGenerator';

// Import only the Bootstrap components we need
import {Popover} from 'bootstrap';
import {disableQRCodeControls, enableQRCodeControls} from "./ui";
import {filled, valid} from "./input";
import {buildElementCache} from "./cache";
import {selectors, tabIdMap} from "./constants";

(function init() {


    const elmCache = buildElementCache(selectors);



    function fork(conditionFunc, ifFunc, elseFunc) {
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
    const linkIsValidAndActiveFunc = isActiveAndValid(
        elmCache,
        tabIdMap.link,
        isTabActive,
        linkIsValid);

    const linkGeneratorFunc = fork(
        (elmCache,linkSelector,tabId) => linkIsValidAndActiveFunc(tabId,linkSelector),
        function(elmCache,linkSelector) {
            const linkInput = elmCache.getElementFromSelector(linkSelector)[0];
            const downloadBtn = elmCache.getElementFromSelector(selectors.downloadBtn)[0];
            const noDataMessage = elmCache.getElementFromSelector(selectors.noDataMessage)[0];
            const canvas = elmCache.getElementFromSelector(selectors.canvas)[0];

            enableQRCodeControls({downloadBtn,noDataMessage,canvas});
            generator.generate(canvas, linkInput.value);
        },
        function(elmCache) {
            const downloadBtn = elmCache.getElementFromSelector(selectors.downloadBtn)[0];
            const noDataMessage = elmCache.getElementFromSelector(selectors.noDataMessage)[0];
            const canvas = elmCache.getElementFromSelector(selectors.canvas)[0];
            disableQRCodeControls({downloadBtn,noDataMessage,canvas});
        });

    function generateLinkQRCode(elmCache) {
        const isActive = isTabActive(elmCache,tabIdMap.link);
        const downloadBtn = elmCache.getElementFromSelector(selectors.downloadBtn)[0];
        const noDataMessage = elmCache.getElementFromSelector(selectors.noDataMessage)[0];
        const canvas = elmCache.getElementFromSelector(selectors.canvas)[0];
        if(isActive) {
            if(filled(linkInput) && valid(linkInput)) {
                enableQRCodeControls({downloadBtn,noDataMessage,canvas});
                generator.generate(canvas, linkInput.value);
            } else {
                disableQRCodeControls({downloadBtn,noDataMessage,canvas});
            }
        }
    }




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

        });
    });


    const linkInput = elmCache.getElementFromSelector(selectors.link)[0];//DOM.elm(`#link-input`);
    linkGeneratorFunc(elmCache, selectors.link, tabIdMap.link);
    linkInput.addEventListener('keyup', () => linkGeneratorFunc(elmCache, selectors.link, tabIdMap.link));


})();
