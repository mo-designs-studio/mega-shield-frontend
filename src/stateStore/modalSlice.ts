import { StateCreator } from 'zustand';
type mode = 'add' | 'edit';
type ModalState = {
    name: string;
    mode: mode;
    status: boolean;
    extras?: any;
};
const initStateValue: ModalState = {
    name: '',
    mode: 'add',
    status: false,
    extras: null,
};
export type ModalSlice = {
    modalState: ModalState;
    setModalState: (payload: ModalState) => void;
    resetModalState: () => void;
};

export const createModalSlice: StateCreator<ModalSlice> = (set: Function) => ({
    modalState: { ...initStateValue },
    setModalState: (payload: ModalState) => set(() => ({ modalState: payload })),
    resetModalState: () => set(() => ({ modalState: { ...initStateValue } })),
});
