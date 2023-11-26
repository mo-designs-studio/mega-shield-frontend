import { StateCreator } from 'zustand';
import { checkApiConnection, getAllMainServices } from "../api/endpoints";

type LoadData = (payload?: {}, get?: Function | null) => Promise<void>;

export interface ApiHandlersSlice {
    loadInitData: LoadData,
    loadAllMainServices: LoadData
}

export const createApiHandlersSlice: StateCreator<ApiHandlersSlice> = (set, get) => ({
    loadInitData: (payload) => handleGetInitData(payload, get),
    loadAllMainServices: (payload) => handleGetAllMainServices(payload, get),
});

const handleGetInitData: LoadData = async (payload, getState) => {
    Promise.all([await checkApiConnection(), await handleGetAllMainServices(payload, getState)]);
};

const handleGetAllMainServices: LoadData = async (_, getState) => {
    const { setMainServicesState } = getState!();
    const { response, error } = await getAllMainServices();
    if (!error && response.status == 200) setMainServicesState(response.data?.mainServices)
}