import { StateCreator } from 'zustand';

export interface App {
    isSidebarOpen: boolean,
    setIsSidebarOpen: (payload: {}) => void,
}
export const createAppSlice: StateCreator<App> = (set: Function) => ({
    isSidebarOpen: false,
    setIsSidebarOpen: (payload) => set(() => ({ isSidebarOpen: payload })),
})