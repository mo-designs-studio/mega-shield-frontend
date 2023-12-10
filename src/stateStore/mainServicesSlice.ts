import { StateCreator } from 'zustand';
import { MainService } from '@/types';

export interface MainServicesSlice {
    mainServicesState: MainService[];
    setMainServicesState: (payload: MainService[]) => Function;
}

export const createMainServicesSlice: StateCreator<MainServicesSlice> = (set: Function) => ({
    mainServicesState: [],
    setMainServicesState: (payload) => set(() => ({ mainServicesState: payload })),
});
