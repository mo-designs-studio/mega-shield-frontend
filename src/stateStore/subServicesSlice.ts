import { StateCreator } from 'zustand';
import { Service } from '@/types';



export interface SubServicesSlice {
    subServicesState: Service[],
    setSubServicesState: (payload: {}) => Function
}

export const createSubServicesSlice: StateCreator<SubServicesSlice> = (set: Function) => ({
    subServicesState: [],
    setSubServicesState: (payload) => set(() => ({subServicesState: payload }))
})