

function buildCache() {
    const state = {
        url: {
            value: "",
        },

        text: {
            value: "",
        },

        email: {
            address: "",
            subject: "",
            body: "",
        },

        sms: {
            phone: "",
            message: "",
        },

        wifi: {
            ssid: "",
            password: "",
            security: "",
        },
    };

    return {
        url: {
            get:  () => state.url.value,
            set: (val) => state.url.value = val
        },
        text: {
            get:  () => state.text.value,
            set: (val) => state.text.value = val
        },
        email: {
            get:  () => state.email,
            set: (val) => state.email = {...val}
        },
        sms: {
            get:  () => state.sms,
            set: (val) => state.sms = {...val}
        },
        wifi: {
            get:  () => state.wifi,
            set: (val) => state.wifi = {...val}
        },
    };

}

const appCache = buildCache();
export default appCache;