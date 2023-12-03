import { create } from "zustand";
import { ApiHandlersSlice, createApiHandlersSlice } from "./apiHandlersSlice";
import { MainServicesSlice, createMainServicesSlice } from "./mainServicesSlice";
import { SubServicesSlice, createSubServicesSlice } from "./subServicesSlice";
import { Auth, createAuthSlice } from "./authSlice";

export const useStatesStore = create<ApiHandlersSlice & MainServicesSlice & SubServicesSlice&  Auth>()((...a) => ({
    ...createApiHandlersSlice(...a),
    ...createMainServicesSlice(...a),
    ...createSubServicesSlice(...a),
    ...createAuthSlice(...a)
}));