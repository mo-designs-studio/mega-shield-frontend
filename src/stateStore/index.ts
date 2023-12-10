import { create } from "zustand";
import { ApiHandlersSlice, createApiHandlersSlice } from "./api-handlers-slice";
import { MainServicesSlice, createMainServicesSlice } from "./mainServicesSlice";
import { SubServicesSlice, createSubServicesSlice } from "./subServicesSlice";
import { PackagesSlice, createPackagsSlice } from "./packagesSlice";
import { ProductSlice, createProductSlice} from "./ProductSlice";
import { Auth, createAuthSlice } from "./authSlice";
import { ModalSlice, createModalSlice} from "./modalSlice";

type SlicesTypes = ApiHandlersSlice & MainServicesSlice & SubServicesSlice & PackagesSlice & ProductSlice & Auth & ModalSlice;

export const useStatesStore = create<SlicesTypes>()((...a) => ({
    ...createApiHandlersSlice(...a),
    ...createMainServicesSlice(...a),
    ...createSubServicesSlice(...a),
    ...createPackagsSlice(...a),
    ...createProductSlice(...a),
    ...createAuthSlice(...a),
    ...createModalSlice(...a),
}));