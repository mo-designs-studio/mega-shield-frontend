import { LoadData } from './';
import { addSubService, updateSubService, deleteSubService, getAllMainServicesSubServices } from '@/api/endpoints';

export const handlePostAddSubService: LoadData = async (payload, getState) => {
    const { subServicesState, setSubServicesState } = getState!();
    const { response, error } = await addSubService(payload);
    if (!error && response.status == 201) {
        const updatedState = [...subServicesState];
        updatedState.push(response.data.service);
        setSubServicesState(updatedState);
    }
};

export const handlePostUpdateSubService: LoadData = async (payload, getState) => {
    const { subServicesState, setSubServicesState } = getState!();
    const { response, error } = await updateSubService(payload);
    if (!error && response.status == 200) {
        const willUpdatedIndex = subServicesState.findIndex((service: any) => service._id == payload.id);
        const updatedState = [...subServicesState];
        updatedState[willUpdatedIndex] = response.data.service;
        setSubServicesState(updatedState);
    }
};

export const handleDeleteSubService: LoadData = async (payload, getState) => {
    const { subServicesState, setSubServicesState } = getState!();
    const { response, error } = await deleteSubService(payload);
    if (!error && response.status == 200) {
        const updatedState = subServicesState.filter((service: any) => service._id != payload.id);
        setSubServicesState(updatedState);
    }
};

export const handleGetAllMainServicesSubServices: LoadData = async (payload, getState) => {
    const { setSubServicesState } = getState!();
    const { response, error } = await getAllMainServicesSubServices(payload);
    if (!error && response.status == 200) setSubServicesState(response.data.services);
};
