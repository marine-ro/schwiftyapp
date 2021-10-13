import {IS_STRING} from '@/utils/constants';

const getValue = (value) => (IS_STRING(value) ? value.toUpperCase() : value);

const filterArray = (array, filters) => {
    const filterKeys = Object.keys(filters);
    return array.filter((item) => {
        return filterKeys.every((key) => {
            if (!filters[key] || !filters[key].length) return true;
            if (IS_STRING(item[key])) {
                return getValue(item[key]).includes(getValue(filters[key]));
            }
            return getValue(filters[key]) === getValue(item[key]);
        });
    });
};

export {
    filterArray,
};
