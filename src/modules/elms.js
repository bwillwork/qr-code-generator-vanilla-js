import _ from 'lodash';

function _create(tag,{id,classes,attributes}, ...elms) {
    const elm = document.createElement(tag);
    if(!_.isNil(id)) elm.setAttribute('id',id);
    if(_.isArray(classes)) elm.classList.add(...classes);// Add classes
    if(_.isArray(attributes)) attributes.forEach(a => elm.setAttribute(a.label,a.value));// Set attributes
    if(_.isArray(elms)) elm.append(...elms);// Add children
    return elm;
}

function el(query, elm) {
    return (elm ?? document).querySelector(query);
}

function els(query, elm) {
    return Array.from((elm ?? document).querySelectorAll(query));// Return an array instead of a NodeList
}

function text(string) {
    return document.createTextNode(string ?? '');
}

const tags = [
    'div',
    'main',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'p',
    'hr',
    'br',
    'canvas',
    'textarea'
];

// Here we create a library of element creation functions
const create = {};
for(let tag of tags) {
    create[tag] = function(optional,...elms) {
        return _create(tag,optional,...elms);
    };
}
create['text'] = text;

export default {
    query: {
        el,
        els
    },
    ...create
};