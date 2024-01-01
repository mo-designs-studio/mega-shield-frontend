import { AxiosResponse } from 'axios';
import http, { apiUrl, createHeaders, createErrorResponse, ContentType } from '..';
import {
    getAllMainServices,
    getMainServiceById,
    addMainService,
    updateMainService,
    deleteMainService,
} from './main-services';
import { addSubService, updateSubService, deleteSubService, getAllMainServicesSubServices } from './sub-services';
import { login, register, getMyProfile } from './auth';
import { getAllServicePackages, addPackage, updatePackage, deletePackage } from './packages';
import { addBooking, getAllAppointments, getPendingAppointment, updateStatusToDone } from './booking';

export type Response = {
    response: AxiosResponse;
    error?: Object;
};

export const checkApiConnection = async (): Promise<Response> => {
    const url = apiUrl + '/check-connectivity';
    const header = { ...createHeaders(ContentType.JSON) };
    try {
        const response = await http.get(url, header);
        return { response: response };
    } catch (error) {
        const response = createErrorResponse(error);
        return response;
    }
};

export {
    login,
    register,
    getMyProfile,
    getAllMainServices,
    getMainServiceById,
    addMainService,
    updateMainService,
    deleteMainService,
    addSubService,
    updateSubService,
    deleteSubService,
    getAllMainServicesSubServices,
    getAllServicePackages,
    addPackage,
    updatePackage,
    deletePackage,
    addBooking,
    getAllAppointments,
    getPendingAppointment,
    updateStatusToDone,
};
