import { LoadData } from './';
import { getAllServicePackages, addPackage, updatePackage, deletePackage } from '@/api/endpoints';

export const handleGetAllServicePackages: LoadData = async (payload, getState) => {
    const { setPackagesState } = getState!();
    const { response, error } = await getAllServicePackages(payload);
    if (!error && response.status == 200) {
        setPackagesState(response.data.packages);
    }
};

export const handleAddServicePackages: LoadData = async (payload, getState) => {
    const { packagesState, setPackagesState } = getState!();
    const { response, error } = await addPackage(payload);
    if (!error && response.status == 201) {
        const updatedState = [...packagesState];
        updatedState.push(response.data.package);
        setPackagesState(updatedState);
    }
};

export const handleUpdateServicePackages: LoadData = async (payload, getState) => {
    const { packagesState, setPackagesState } = getState!();
    const { response, error } = await updatePackage(payload);
    if (!error && response.status == 200) {
        const willUpdatedIndex = packagesState.findIndex((pkg: any) => pkg._id == payload.id);
        const updatedState = [...packagesState];
        updatedState[willUpdatedIndex] = response.data.package;
        setPackagesState(updatedState);
    }
};

export const handleDeletePackage: LoadData = async (payload, getState) => {
    const { packagesState, setPackagesState } = getState!();
    const { response, error } = await deletePackage(payload);
    if (!error && response.status == 200) {
        const updatedState = packagesState.filter((pkg: any) => pkg._id != payload.id);
        setPackagesState(updatedState);
    }
};
