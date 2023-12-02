import { StateCreator } from 'zustand';
import { User } from "@/types";

export interface Auth {
    user: User | null,
    setUser: (payload: {}) => void,
    resetUser: () => void
}

export const createAuthSlice: StateCreator<Auth> = (set: Function) => ({
    user: null,
    setUser: (payload) => set(() => ({ user: payload })),
    resetUser: () => set(() => ({ user: null }))
})