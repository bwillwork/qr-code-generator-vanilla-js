
function elm(query, elm) {
    return (elm ?? document).querySelector(query);
}

function elms(query, elm) {
    const elms = (elm ?? document).querySelectorAll(query);
    return Array.from(elms);
}

export default {
    elm,
    elms
};