import { StateCreator } from 'zustand';
import { Package } from '@/types';



export interface PackagesSlice {
    packagesState: Package[],
    setPackagesState: (payload: {}) => Function
}

export const createPackagsSlice: StateCreator<PackagesSlice> = (set: Function) => ({
    packagesState: [],
    setPackagesState: (payload) => set(() => ({subServicesState: payload }))
})