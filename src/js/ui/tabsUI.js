import _ from 'lodash';
import domCache from "../cache/domCache";
import {allSelectors, tabIdMap, inputSelectors} from "../constants";
import {choose} from "../util/buildersUtil";
import {getGeneratorMap} from "../util/featureGeneratorUtil";

import {Popover} from 'bootstrap';// Import only the Bootstrap components we need

export function initTabs() {

    const generatorMap = getGeneratorMap();

    const chooseFeatureFunc = choose(_.isEqual,
        {key: tabIdMap.link, execFunc: () => generatorMap.link(domCache, inputSelectors.link, tabIdMap.link)},
        {key: tabIdMap.text, execFunc: () => generatorMap.text(domCache, inputSelectors.text, tabIdMap.text)},
        {key: tabIdMap.email, execFunc: () => generatorMap.email(domCache, inputSelectors.email, tabIdMap.email)},
        {key: tabIdMap.textMessage, execFunc: () => generatorMap.sms(domCache, inputSelectors.sms, tabIdMap.textMessage)},
        {key: tabIdMap.wifi, execFunc: () => generatorMap.wifi(domCache, inputSelectors.wifi, tabIdMap.wifi)},
    );

    // Create popovers (bootstrap)
    const popovers = domCache.getFromSelector(allSelectors.popovers);
    popovers.forEach(popover => (new Popover(popover)));

    // Init Tabs
    const tabEls = domCache.getFromSelector(allSelectors.allTabs);
    tabEls.forEach(elm => {
        elm.addEventListener('shown.bs.tab', event => {
            const activeId = event.target.getAttribute('id');
            chooseFeatureFunc(activeId);
        });
    });

}