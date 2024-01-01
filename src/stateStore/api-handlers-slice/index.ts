import { StateCreator } from 'zustand';
import { checkApiConnection } from '../../api/endpoints';
import { handlePostLogin, handlePostRegister, handleGetMyProfile } from './auth';
import {
    handleGetAllMainServices,
    handlePostAddMainService,
    handlePostUpdateMainService,
    handleDeleteMainService,
} from './main-services';
import {
    handlePostAddSubService,
    handlePostUpdateSubService,
    handleDeleteSubService,
    handleGetAllMainServicesSubServices,
} from './sub-services';
import {
    handleGetAllServicePackages,
    handleAddServicePackages,
    handleUpdateServicePackages,
    handleDeletePackage,
} from './packages';
import { handleGetAllProducts, handlePostAddProduct, handlePatchUpdateProduct, handleDeleteProduct } from './product';
import { handleAddBooking, handleGetAllAppointments, handleUpdateBookingStatus } from './bookings';

export type LoadData = (payload: any | null, get?: Function) => Promise<void>;

export interface ApiHandlersSlice {
    isLoading: boolean;
    setIsLoading: (payload: boolean) => void;
    loadInitData: LoadData;
    loadAllMainServices: LoadData;
    loginHandler: LoadData;
    registerHandler: LoadData;
    myProfileHandler: LoadData;
    addMainService: LoadData;
    updateMainService: LoadData;
    deleteMainService: LoadData;
    addSubService: LoadData;
    updateSubService: LoadData;
    deleteSubService: LoadData;
    loadAllMainServicesSubServices: LoadData;
    loadAllServicePackages: LoadData;
    addServicePackages: LoadData;
    updateServicePackages: LoadData;
    deletePackage: LoadData;
    loadAllProducts: LoadData;
    addProduct: LoadData;
    updateProduct: LoadData;
    deleteProduct: LoadData;
    loadAllAppointments: LoadData;
    addBooking: LoadData;
    updateBookingStatus: LoadData;
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
    loadAllServicePackages: (payload) => handleGetAllServicePackages(payload, get),
    addServicePackages: (payload) => handleAddServicePackages(payload, get),
    updateServicePackages: (payload) => handleUpdateServicePackages(payload, get),
    deletePackage: (payload) => handleDeletePackage(payload, get),
    loadAllProducts: (payload) => handleGetAllProducts(payload, get),
    addProduct: (payload) => handlePostAddProduct(payload, get),
    updateProduct: (payload) => handlePatchUpdateProduct(payload, get),
    deleteProduct: (payload) => handleDeleteProduct(payload, get),
    loadAllAppointments: (payload) => handleGetAllAppointments(payload, get),
    addBooking: (payload) => handleAddBooking(payload, get),
    updateBookingStatus: (payload) => handleUpdateBookingStatus(payload, get),

    
});

const handleGetInitData: LoadData = async (payload, getState) => {
    const { setIsLoading } = getState!();
    setIsLoading(true);
    Promise.all([
        await checkApiConnection(),
        await handleGetMyProfile(payload, getState),
        await handleGetAllMainServices(payload, getState),
    ]);
    setIsLoading(false);
};
