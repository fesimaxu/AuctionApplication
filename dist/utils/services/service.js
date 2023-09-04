"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.excludeProperty = void 0;
const excludeProperty = (obj, keysToExclude) => {
    const newObj = Object.assign({}, obj);
    for (const key of keysToExclude) {
        if (newObj.hasOwnProperty(key)) {
            delete newObj[key];
        }
    }
    return newObj;
};
exports.excludeProperty = excludeProperty;
