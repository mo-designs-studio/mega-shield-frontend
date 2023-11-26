import { StateCreator } from 'zustand';
import { MainServiceProps, MainService } from '@/types';



export interface MainServicesSlice {
    mainServicesState: MainService[],
    setMainServicesState: (payload: {}) => Function
}

export const createMainservicesSlice: StateCreator<MainServicesSlice> = (set: Function) => ({
    mainServicesState: [],
    setMainServicesState: (payload) => set(() => ({ mainServicesState: payload }))
})