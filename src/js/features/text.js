import {filled} from "../util/inputUtil";
import {ifElse, isActiveAndValid} from "../util/buildersUtil";
import {allSelectors, tabIdMap} from "../constants";
import {isTabActive} from "../ui";
import {disableQRCodeControls, enableQRCodeControls} from "../ui/qrcodeUI";
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
            const canvas = elmCache.getElementFromSelector(allSelectors.canvas)[0];
            const textInput = elmCache.getElementFromSelector(textSelector)[0];
            generator.generate(canvas, textInput.value);
        },
        function(elmCache) {
            disableQRCodeControls(elmCache);
        });
}