import axios from 'axios';
import http, { apiUrl, createHeaders, createErrorResponse, ContentType } from '..';
import { Response } from '@/types';
import { ProductProps } from '@/types';

export const getAllProducts = async (): Promise<Response> => {
    const url = apiUrl + '/products/all';
    const header = { ...createHeaders(ContentType.JSON) };

    try {
        const response = await http.get(url, header);
        return { response: response };
    } catch (error) {
        const response = createErrorResponse(error);
        return response;
    }
};

export const geProductById = async (payload: { id: string }): Promise<Response> => {
    const url = apiUrl + '/products/' + payload.id;
    const header = { ...createHeaders(ContentType.JSON) };
    try {
        const response = await http.get(url, header);
        return { response: response };
    } catch (error) {
        const response = createErrorResponse(error);
        return response;
    }
};

export const addProduct = async (payload: ProductProps): Promise<Response> => {
    const url = apiUrl + '/products';
    const header = { ...createHeaders(ContentType.FORM_DATA) };
    let formData = new FormData();
    formData.append('name', payload.name);
    formData.append('price', payload.price);
    formData.append('description', payload.description);
    formData.append('image', payload.image);
    axios.defaults.withCredentials = true
    try {
        const response = await http.post(url, formData, header);
        return { response: response };
    } catch (error) {
        const response = createErrorResponse(error);
        return response;
    }
};

export const updateProduct = async (payload: ProductProps): Promise<Response> => {
    const url = apiUrl + '/products/' + payload.id;
    const header = { ...createHeaders(ContentType.FORM_DATA) };
    let formData = new FormData();
    formData.append('name', payload.name);
    formData.append('price', payload.price);
    formData.append('description', payload.description);
    if (payload.image) formData.append('image', payload.image);
    try {
        const response = await http.patch(url, formData, header);
        return { response: response };
    } catch (error) {
        const response = createErrorResponse(error);
        return response;
    }
};

export const deleteProduct = async (payload: { id: string }): Promise<Response> => {
    const url = apiUrl + '/products/' + payload.id;
    const header = { ...createHeaders(ContentType.FORM_DATA) };
    try {
        const response = await http.delete(url, header);
        return { response: response };
    } catch (error) {
        const response = createErrorResponse(error);
        return response;
    }
};
