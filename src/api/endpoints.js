export const ENDPOINTS = {
    character: {
        baseEndpoint: 'character',
        endpoints: [
            {
                name: 'GetAll',
                method: 'get',
                path: '/character',
            },
            {
                name: 'GetSingle',
                method: 'get',
                path: '/character/:id',
            },
        ],
    },
    location: {
        baseEndpoint: 'location',
        endpoints: [
            {
                name: 'GetAll',
                method: 'get',
                path: '/location',
            },
            {
                name: 'GetSingle',
                method: 'get',
                path: '/location/:id',
            },
        ],
    },
    episode: {
        baseEndpoint: 'episode',
        endpoints: [
            {
                name: 'GetAll',
                method: 'get',
                path: '/episode',
            },
            {
                name: 'GetSingle',
                method: 'get',
                path: '/episode/:id',
            },
        ],
    },
};
