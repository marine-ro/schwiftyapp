export const STORAGE = {
    getItem(key) {
        try {
            return JSON.parse(localStorage.getItem(key));
        }
        catch (error) {
            console.log(error);
            return null;
        }
    },
    setItem(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        }
        catch (error) {
            console.log(error);
        }
    },
    removeItem(key, data) {
        try {
            localStorage.removeItem(key, JSON.stringify(data));
        }
        catch (error) {
            console.log(error);
        }
    },
};
