import axios from 'axios';
import qs from 'qs';
import router from '@/router';
import {BACKEND_SCHEME, BACKEND_HOST, DEFAULT_HEADERS} from '@/api/constants';

const isObject = (a) => (!!a) && (a.constructor === Object);
const isString = str => ((typeof str === 'string') || (str instanceof String));

export default class BaseApiService {
    CONFIG = {
        baseURL: this.getApiPrefix(),
        headers: {
            common: DEFAULT_HEADERS,
        },
    };

    constructor(endpointsModule) {
        this._axios = axios;
        this._endpointsModule = endpointsModule;
        this._endpoints = {};
        this._url = null;
        this._requestParams = {};

        this.setHeaders();
        this.setInterceptors();
    }

    getApiPrefix() {
        return `${BACKEND_SCHEME}://${BACKEND_HOST}/api`;
    }

    setHeaders() {
        this._axios.create(this.CONFIG);
    }

    setInterceptors() {
        // this._axios.interceptors.response.use(null, error => {
        //     if (error.response.status === 404) {
        //         router.push({
        //             name: '404',
        //         });
        //     }
        //     return Promise.reject(error);
        // });
    }

    setEndpoints() {
        for (const key in this.endpointsModule) {
            this._endpoints[key] = this.endpointsModule[key].endpoints;
        }
    }

    getEndpointByName(endpointFullName) {
        const endpointParts = endpointFullName.split('.');
        const [endpointModule, endpointName] = endpointParts;
        const endpoints = this._endpointsModule[endpointModule].endpoints.filter((endpoint) => {
            return endpoint.name === endpointName;
        });
        return endpoints[0] ? endpoints[0] : {}; // надо проверить
    }

    setSegments(params) {
        if (isObject(params) && isObject(params.segments)) {
            const segments = params.segments;
            segments.forEach((segment, key) => {
                this._url = this._url.replace(':' + key, segment);
            });
        }
    }

    setRequestParams(endpoint, params = null, headers = null) {
        const requestParams = {
            method: endpoint.method,
            url: this._url,
            paramsSerializer: params => qs.stringify(params, {arrayFormat: 'brackets'}),
        };
        if (isObject(params) && isObject(params.query)) {
            requestParams.params = params.query;
        }
        if (isObject(params) && isObject(params.requestBody)) {
            requestParams.params = params.query;
        }
        if (isObject(headers)) {
            Object.assign(requestParams, headers);
        }
        return requestParams;
    }

    prepareCall(endpointName, params = null, headers = null) {
        const endpoint = this.getEndpointByName(endpointName);
        this._url = this.getApiPrefix() + endpoint.path;
        this.setSegments(params);
        this._requestParams = this.setRequestParams(endpoint, params, headers);
    }

    async call(endpointName, params = null, headers = null) {
        if (!isString(endpointName)) console.log('Endpoint name must be a string');
        this.prepareCall(endpointName, params, headers);
        return this._axios.request(this._requestParams);

        // this.prepareCall(endpointName, params, headers);
        // try {
        //     const { data } = await this._axios.request(this._requestParams)
        //     return [null, data];
        // } catch (response) {
        //     ///console.error(error);
        //     return [response];
        // }
        // return new Promise((resolve, reject) => {

        //         .then(response => {
        //             resolve(response);
        //         })
        //         .catch((response) => {
                    // response = response.response;
                    // let title = response.data.message;
                    // let errors = '';

                    // if (Object.prototype.hasOwnProperty.call(response.data, 'errors')) {
                    //     errors = Object.values(response.data.errors).flat().join('<br>');
                    // }

                    // if (title.length < 1) {
                    //     title = 'Something wents wrong';
                    // }
        //             return response;
        //         });
        // });
    }
}
