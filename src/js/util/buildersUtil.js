export function ifElse(conditionFunc, ifFunc, elseFunc) {
    return function(...values) {
        if(conditionFunc(...values)) return ifFunc(...values);
        else elseFunc(...values);
    };
}

export function choose(conditionFunc,...choices) {
    return function(condition) {
        for(let choice of choices) {
            const {key, execFunc} = choice;
            if(conditionFunc(condition,key)) return execFunc();
        }
        return null;
    };
}

export function isActiveAndValid(elmCache,id,isTabActiveFunc,isValidFunc) {
    return function(currentTabId,...dataElementIds) {
        const isActive = isTabActiveFunc(elmCache,currentTabId);
        const isValid = isValidFunc(elmCache,...dataElementIds);
        return isActive && isValid;
    };
}