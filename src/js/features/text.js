import {filled} from "../input";
import {ifElse, isActiveAndValid} from "../builders";
import {selectors, tabIdMap} from "../constants";
import {isTabActive} from "../ui";
import {disableQRCodeControls, enableQRCodeControls} from "./qrcodeUI";
import generator from "../qrcodeGenerator";


// Text feature
export function buildTextGeneratorFunc(elmCache) {
    function isTextValid(elmCache,textSelector) {
        const textInput = elmCache.getElementFromSelector(textSelector)[0];
        return filled(textInput);
    }
    const textIsValidAndActiveFunc = isActiveAndValid(elmCache, tabIdMap.text, isTabActive, isTextValid);
    return ifElse(
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
}