import { StateCreator } from 'zustand';
import { checkApiConnection, getAllMainServices, login, register, getMyProfile, addMainService, updateMainService, deleteMainService, addSubService, updateSubService, deleteSubService, getAllMainServicesSubServices, getAllServicePackagess } from "../api/endpoints";


type LoadData = (payload: any | null, get?: Function) => Promise<void>;

export interface ApiHandlersSlice {
    isLoading: boolean,
    setIsLoading: (payload: boolean) => void,
    loadInitData: LoadData,
    loadAllMainServices: LoadData,
    loginHandler: LoadData,
    registerHandler: LoadData,
    myProfileHandler: LoadData,
    addMainService: LoadData,
    updateMainService: LoadData,
    deleteMainService: LoadData,
    addSubService: LoadData,
    updateSubService: LoadData,
    deleteSubService: LoadData,
    loadAllMainServicesSubServices: LoadData,
    loadAllServicePackages: LoadData,
}

export const createApiHandlersSlice: StateCreator<ApiHandlersSlice> = (set, get) => ({
    isLoading: false,
    setIsLoading: (payload) => set(() => ({ isLoading: payload })),
    loadInitData: (payload) => handleGetInitData(payload, get),
    loadAllMainServices: (payload) => handleGetAllMainServices(payload, get),
    loginHandler: (payload) => handlePostLogin(payload, get),
    registerHandler: (payload) => handlePostRegister(payload, get),
    myProfileHandler: (payload) => handleGetMyProfile(payload, get),
    // mainServiceById: (payload) => handleGetgetMainServiceById(payload, get)
    addMainService: (payload) => handlePostAddMainService(payload, get),
    updateMainService: (payload) => handlePostUpdateMainService(payload, get),
    deleteMainService: (payload) => handleDeleteMainService(payload, get),
    addSubService: (payload) => handlePostAddSubService(payload, get),
    updateSubService: (payload) => handlePostUpdateSubService(payload, get),
    deleteSubService: (payload) => handleDeleteSubService(payload, get),
    loadAllMainServicesSubServices: (payload) => handleGetAllMainServicesSubServices(payload, get),
    loadAllServicePackages: (payload) => handleGetAllServicePackages(payload, get)
});

const handleGetInitData: LoadData = async (payload, getState) => {
    const { setIsLoading } = getState!();
    setIsLoading(true);
    Promise.all([await checkApiConnection(), await handleGetMyProfile(payload, getState), await handleGetAllMainServices(payload, getState)]);
    setIsLoading(false)
};

const handleGetAllMainServices: LoadData = async (_, getState) => {
    const { setMainServicesState } = getState!();
    const { response, error } = await getAllMainServices();
    if (!error && response.status == 200) setMainServicesState(response.data?.mainServices)
}

const handlePostLogin: LoadData = async (payload, getState) => {
    if (!payload) return;
    const { setUser } = getState!();
    const { response, error } = await login(payload);
    setUser(response.data.user)
    if (!error && response.status == 200) setUser(response.data?.user || null);
}

const handlePostRegister: LoadData = async (payload, getState) => {
    if (!payload) return;
    const { setUser } = getState!();
    const { response, error } = await register(payload);
    setUser(response.data.user)
    if (!error && response.status == 200) setUser(response.data?.user || null);
}

const handleGetMyProfile: LoadData = async (_, getState) => {
    const { setUser } = getState!();
    const { response, error } = await getMyProfile();
    if (!error && response.status == 200) setUser(response.data?.user || null);
}

const handlePostAddMainService: LoadData = async (payload, getState) => {
    const { mainServicesState, setMainServicesState } = getState!();
    const { response, error } = await addMainService(payload);
    if (!error && response.status == 201) {
        const updatedState = [...mainServicesState];
        updatedState.push(response.data.mainService)
        setMainServicesState(updatedState)
    }
}

const handlePostUpdateMainService: LoadData = async (payload, getState) => {
    const { mainServicesState, setMainServicesState } = getState!();
    const { response, error } = await updateMainService(payload);
    if (!error && response.status == 200) {
        const willUpdatedIndex = mainServicesState.findIndex((service: any) => service._id == payload.id)
        const updatedState = [...mainServicesState];
        updatedState[willUpdatedIndex] = response.data.mainService
        setMainServicesState(updatedState);
    }
}

const handleDeleteMainService: LoadData = async (payload, getState) => {
    const { mainServicesState, setMainServicesState } = getState!();
    const { response, error } = await deleteMainService(payload);
    if (!error && response.status == 200) {
        const updatedState = mainServicesState.filter((service: any) => service._id != payload.id)
        setMainServicesState(updatedState);
    }
}

const handlePostAddSubService: LoadData = async (payload, getState) => {
    const { subServicesState, setSubServicesState } = getState!();
    const { response, error } = await addSubService(payload);
    if (!error && response.status == 201) {
        const updatedState = [...subServicesState];
        updatedState.push(response.data.service)
        setSubServicesState(updatedState)
    }
}

const handlePostUpdateSubService: LoadData = async (payload, getState) => {
    const { subServicesState, setSubServicesState } = getState!();
    const { response, error } = await updateSubService(payload);
    if (!error && response.status == 200) {
        const willUpdatedIndex = subServicesState.findIndex((service: any) => service._id == payload.id)
        const updatedState = [...subServicesState];
        updatedState[willUpdatedIndex] = response.data.service
        setSubServicesState(updatedState);
    }
}

const handleDeleteSubService: LoadData = async (payload, getState) => {
    const { subServicesState, setSubServicesState } = getState!();
    const { response, error } = await deleteSubService(payload);
    if (!error && response.status == 200) {
        const updatedState = subServicesState.filter((service: any) => service._id != payload.id)
        setSubServicesState(updatedState);
    }
}

const handleGetAllMainServicesSubServices: LoadData = async (payload, getState) => {
    const { setSubServicesState } = getState!();
    const { response, error } = await getAllMainServicesSubServices(payload);
    if (!error && response.status == 200) {
        setSubServicesState(response.data.services);
    }
}

const handleGetAllServicePackages: LoadData = async (payload, getState) => {
    const { setPackagesState } = getState!();
    const { response, error } = await getAllServicePackagess(payload);
    if (!error && response.status == 200) {
        setPackagesState(response.data.packages);
    }
}