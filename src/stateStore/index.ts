import { create } from "zustand";
import { ApiHandlersSlice, createApiHandlersSlice } from "./apiHandlersSlice";
import { MainServicesSlice, createMainservicesSlice } from "./mainServicesSlice";
import { Auth, createAuthSlice } from "./authSlice";

export const useStatesStore = create<ApiHandlersSlice & MainServicesSlice & Auth>()((...a) => ({
    ...createApiHandlersSlice(...a),
    ...createMainservicesSlice(...a),
    ...createAuthSlice(...a)
}));