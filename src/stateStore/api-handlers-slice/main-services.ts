import {LoadData} from "./";
import {getAllMainServices,  addMainService, updateMainService, deleteMainService} from "@/api/endpoints";

export const handleGetAllMainServices: LoadData = async (_, getState) => {
    const { setMainServicesState } = getState!();
    const { response, error } = await getAllMainServices();
    if (!error && response.status == 200) setMainServicesState(response.data?.mainServices)
}



export const handlePostAddMainService: LoadData = async (payload, getState) => {
    const { mainServicesState, setMainServicesState } = getState!();
    const { response, error } = await addMainService(payload);
    if (!error && response.status == 201) {
        const updatedState = [...mainServicesState];
        updatedState.push(response.data.mainService)
        setMainServicesState(updatedState)
    }
}

export const handlePostUpdateMainService: LoadData = async (payload, getState) => {
    const { mainServicesState, setMainServicesState } = getState!();
    const { response, error } = await updateMainService(payload);
    if (!error && response.status == 200) {
        const willUpdatedIndex = mainServicesState.findIndex((service: any) => service._id == payload.id)
        const updatedState = [...mainServicesState];
        updatedState[willUpdatedIndex] = response.data.mainService
        setMainServicesState(updatedState);
    }
}

export const handleDeleteMainService: LoadData = async (payload, getState) => {
    const { mainServicesState, setMainServicesState } = getState!();
    const { response, error } = await deleteMainService(payload);
    if (!error && response.status == 200) {
        const updatedState = mainServicesState.filter((service: any) => service._id != payload.id)
        setMainServicesState(updatedState);
    }
}