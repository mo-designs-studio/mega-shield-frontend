import { getCookie } from '@/app/helpers';
import axios from 'axios';

export const apiUrl = import.meta.env.VITE_SERVER_URL + '/api';

export enum ContentType {
    JSON = 'application/json',
    FORM_DATA = 'multipart/form-data',
}

export type HeadersContent = {
    Accept: string;
    'Content-Type': ContentType;
    'accept-language': string;
    Authorization?: string;
};
export const createHeaders = (contentType: ContentType) => {
    const token = getCookie('token');
    const localeLang: string = localStorage.getItem('language') ?? 'ar';
    const headersObject: HeadersContent = {
        Accept: 'application/json',
        'Content-Type': contentType,
        'accept-language': localeLang,
    };
    const headers = {
        headers: headersObject,
    };
    if (token) axios.defaults.withCredentials = true;
    return headers;
};

export const createErrorResponse = (error: any) => {
    let code: string = error.code;
    let message: string = error.message;
    if (error.response && error.response.data) {
        code = `error: ${error.response.status} | type: ${error.code}`;
        message = error.response.data.msg;
    }
    const response = {
        error: {
            code,
            message,
        },
        response: error.response || null,
    };

    return response;
};

const http = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    patch: axios.patch,
    delete: axios.delete,
};

export default http;
