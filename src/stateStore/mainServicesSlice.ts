import { StateCreator } from 'zustand';
import { MainServiceProps } from '@/types';



export interface MainServicesSlice {
    mainServicesState: MainServiceProps[],
    setMainServicesState: (payload: {}) => Function
}

export const createMainservicesSlice: StateCreator<MainServicesSlice> = (set: Function) => ({
    mainServicesState: [],
    setMainServicesState: (payload) => set(() => ({ mainServicesState: payload }))
})