import { create } from "zustand";
import { ApiHandlersSlice, createApiHandlersSlice } from "./apiHandlersSlice";
import { MainServicesSlice, createMainservicesSlice } from "./mainServicesSlice";

export const useStatesStore = create<ApiHandlersSlice & MainServicesSlice>()((...a) => ({
    ...createApiHandlersSlice(...a),
    ...createMainservicesSlice(...a),
}));