import _ from "lodash";
import {tabIdMap} from "./constants";


function link({value}) {}
function text({value}) {}
function email({to,subject, body}) {}
function textMessage({phoneNumbers, message}) {}
function wifi({ssid,password}) {}



export function validate(tabId, tabData) {
    if(_.isEqual(tabId,tabIdMap.link)) return link(tabData);
    if(_.isEqual(tabId,tabIdMap.text)) return link(tabData);
    if(_.isEqual(tabId,tabIdMap.email)) return link(tabData);
    if(_.isEqual(tabId,tabIdMap.textMessage)) return link(tabData);
    if(_.isEqual(tabId,tabIdMap.wifi)) return link(tabData);
    return false;
}