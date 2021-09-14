const DEEP_CLONE = (obj) => {
    const clone = {};

    for (const key in obj) {
        // eslint-disable-next-line no-prototype-builtins
        if (obj.hasOwnProperty(key)) {
            clone[key] = obj[key];
        }
    }
    return clone;
};

export {DEEP_CLONE};
