const backendUrl = process.env.VUE_APP_API_URL;

const trimUrl = (url) => (url[0] === '/' ? url.slice(1) : url);

export default {
    delete: async ({ url, headers = {}, body }) => {
        return await fetch(`${backendUrl}/${trimUrl(url)}`, {
            method: 'DELETE',
            headers,
            body,
            credentials: 'include',
        });
    },
    post: async ({ url, headers, body }) => {
        return await fetch(`${backendUrl}/${trimUrl(url)}`, {
            method: 'POST',
            headers,
            body,
            credentials: 'include',
        });
    },
    put: async ({ url, headers = {}, body }) => {
        return await fetch(`${backendUrl}/${trimUrl(url)}`, {
            method: 'PUT',
            headers,
            body,
            credentials: 'include',
        });
    },
    patch: async ({ url, headers = {}, body }) => {
        return await fetch(`${backendUrl}/${trimUrl(url)}`, {
            method: 'PATCH',
            headers,
            body,
            credentials: 'include',
        });
    },
    get: async ({ url, headers = {} }) => {
        return await fetch(`${backendUrl}/${trimUrl(url)}`, {
            method: 'GET',
            headers,
            credentials: 'include',
        });
    },
};
