import { StateCreator } from 'zustand';
import { Product } from '@/types';

export interface ProductSlice {
    productsState: Product[];
    setProductsState: (payload: Product[]) => void;
    resetProductsState: () => void;
}

export const createProductSlice: StateCreator<ProductSlice> = (set: Function) => ({
    productsState: [],
    setProductsState: (payload) => set(() => ({ productsState: payload })),
    resetProductsState: () => set(() => ({ productsState: [] })),
});
