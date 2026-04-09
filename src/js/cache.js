import _ from "lodash";

export function buildCache() {
    // Init
    const cache = {
        tabs: {
            "link-tab": {
                active: false,
                data: {
                    link: ''
                }
            },
            "text-tab": {
                active: false,
                data: {
                    text: null
                }
            },
            "email-tab": {
                active: false,
                data: {
                    to: null,
                    subject: null,
                    body: null
                }
            },
            "text-message-tab": {
                active: false,
                data: {
                    phones: [],
                    message: ''
                }
            },
            "wifi-tab": {
                active: false,
                data: {
                    ssid: '',
                    password: ''
                }
            }
        }
    };

    function updateActiveTab(activeId, previousId) {
        _.set(cache,['tabs',activeId,'active'], true);
        if(previousId) _.set(cache,['tabs',previousId,'active'], false);
    }

    function updateLink({value}) {}
    function updateText({value}) {}
    function updateEmail({to, subject, body}) {}
    function updateTextMessage({phoneNumbers, message}) {}
    function updateWifi({ssid, password}) {}

    function isTabActive(tabId) {
        const activeVal = _.get(cache,['tabs',tabId,'active']);
        return _.isEqual(activeVal, true);
    }

    function fetchTab(tabId) {
        return _.get(cache,['tabs',tabId]);
    }

    function fetchActiveTab() {
        const tabs = _.get(cache,['tabs']);
        const tabIds = Object.keys(tabs);
        const activeTabId = tabIds.find(id => _.isEqual(_.get(cache,['tabs',id,'active']), true));
        return fetchTab(activeTabId);
    }

    function fetchLink() {
        return fetchTab('link-tab');
    }
    function fetchText() {
        return fetchTab('text-tab');
    }
    function fetchEmail() {
        return fetchTab('email-tab');
    }
    function fetchTextMessage() {
        return fetchTab('text-message-tab');
    }
    function fetchWifi() {
        return fetchTab('wifi-tab');
    }


    return {
        // update
        updateActiveTab,
        updateLink,
        updateText,
        updateEmail,
        updateTextMessage,
        updateWifi,

        // fetch
        isTabActive,
        fetchTab,
        fetchActiveTab,
        fetchLink,
        fetchText,
        fetchEmail,
        fetchTextMessage,
        fetchWifi
    };

}