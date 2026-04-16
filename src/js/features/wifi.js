import {filled, valid} from "../input";
import {ifElse, isActiveAndValid} from "../builders";
import {disableQRCodeControls, enableQRCodeControls} from "./qrcodeUI";
import {selectors, tabIdMap} from "../constants";
import generator from '../qrcodeGenerator';
import {isTabActive} from "../ui";

// Text Message feature
export function buildWifiGeneratorFunc(elmCache) {
    function wifiIsValid(elmCache, wifiSelectors) {

        const {ssid,password} = wifiSelectors;

        const ssidInput = elmCache.getElementFromSelector(ssid)[0];
        const passwordInput = elmCache.getElementFromSelector(password)[0];

        const phoneNumbersValid = filled(ssidInput);
        const messageValid = filled(passwordInput);
        return phoneNumbersValid && messageValid;
    }
    const wifiIsValidAndActiveFunc = isActiveAndValid(elmCache, tabIdMap.wifi, isTabActive, wifiIsValid);
    return ifElse(
        (elmCache,wifiSelectors,tabId) => wifiIsValidAndActiveFunc(tabId,wifiSelectors),
        function(elmCache,wifiSelectors) {
            enableQRCodeControls(elmCache);

            const {ssid,password} = wifiSelectors;

            const ssidInput = elmCache.getElementFromSelector(ssid)[0];
            const passwordInput = elmCache.getElementFromSelector(password)[0];

            const canvas = elmCache.getElementFromSelector(selectors.canvas)[0];

            //Ex: WIFI:T:WPA;S:MyHomeWiFi;P:Password123;;
            const link = `WIFI:T:WPA;S:${ssidInput.value};P:${passwordInput.value};;`;
            generator.generate(canvas, link);
        },
        function(elmCache) {
            disableQRCodeControls(elmCache);
        });
}
