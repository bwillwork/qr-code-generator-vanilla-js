export function createDownloadAnchor(url,fileName) {
    const a = document.createElement('a');
    a.setAttribute('href',url);
    a.setAttribute('download',fileName);
    return a;
}