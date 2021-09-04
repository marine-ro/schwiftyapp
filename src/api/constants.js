const BACKEND_SCHEME = process.env.VUE_APP_BACKEND_SCHEME;
const BACKEND_HOST = process.env.VUE_APP_BACKEND_HOST;
const DEFAULT_HEADERS = {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
};
export {BACKEND_SCHEME, BACKEND_HOST, DEFAULT_HEADERS};
