const DEEP_CLONE = (obj) => {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }
    const clone = Array.isArray(obj) ? new Array(obj.length) : {};
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            clone[key] = DEEP_CLONE(obj[key]);
        }
    }
    return clone;
};

const DEEP_COPY = (arr) => {
    const out = [];
    for (let i = 0, len = arr.length; i < len; i++) {
        const item = arr[i];
        const obj = {};
        for (const k in item) {
            obj[k] = item[k];
        }
        out.push(obj);
    }
    return out;
};
const IS_OBJECT = (a) => (!!a) && (a.constructor === Object);
const IS_STRING = str => ((typeof str === 'string') || (str instanceof String));
//const IS_NULL = str => ((typeof str === 'string') || (str instanceof String));
export {
    DEEP_CLONE, DEEP_COPY, IS_OBJECT, IS_STRING,
};
