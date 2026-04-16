
function elm(query, elm) {
    return (elm ?? document).querySelector(query);
}

function elms(query, elm) {
    const elms = (elm ?? document).querySelectorAll(query);
    return Array.from(elms);
}

function createDownloadAnchor(url,fileName) {
    const a = document.createElement('a');
    a.setAttribute('href',url);
    a.setAttribute('download',fileName);
    return a;
}

export default {
    elm,
    elms,
    createDownloadAnchor
};