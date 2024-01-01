import http, { apiUrl, createHeaders, createErrorResponse, ContentType } from '..';
import { Response } from '@/types';

export const addBooking = async (payload: {
    carSize: string;
    city: string;
    customerFname: string;
    customerLname: string;
    customerPhone: string;
    date: Date;
    service: string[];
}): Promise<Response> => {
    const url = apiUrl + '/bookings/make-appointment';
    const header = { ...createHeaders(ContentType.JSON) };
    try {
        const response = await http.post(url, payload, header);
        return { response: response };
    } catch (error) {
        const response = createErrorResponse(error);
        return response;
    }
};

export const getAllAppointments = async (): Promise<Response> => {
    const url = apiUrl + '/bookings/appointments';
    const header = { ...createHeaders(ContentType.JSON) };

    try {
        const response = await http.get(url, header);
        return { response: response };
    } catch (error) {
        const response = createErrorResponse(error);
        return response;
    }
};

export const getPendingAppointment = async (): Promise<Response> => {
    const url = apiUrl + '/bookings/pending-appointments';
    const header = { ...createHeaders(ContentType.JSON) };

    try {
        const response = await http.get(url, header);
        return { response: response };
    } catch (error) {
        const response = createErrorResponse(error);
        return response;
    }
};

export const updateStatusToDone = async (payload: { id: string }): Promise<Response> => {
    const url = apiUrl + '/bookings/set-status-done/' + payload.id;
    const header = { ...createHeaders(ContentType.JSON) };

    try {
        const response = await http.patch(url, { status: 'done' }, header);
        return { response: response };
    } catch (error) {
        const response = createErrorResponse(error);
        return response;
    }
};

// export const deleteProduct = async (payload: { id: string }): Promise<Response> => {
//     const url = apiUrl + '/products/' + payload.id;
//     const header = { ...createHeaders(ContentType.FORM_DATA) };
//     try {
//         const response = await http.delete(url, header);
//         return { response: response };
//     } catch (error) {
//         const response = createErrorResponse(error);
//         return response;
//     }
// };
