import {LoadData} from "./";
import {getAllServicePackagess} from "@/api/endpoints";

export const handleGetAllServicePackages: LoadData = async (payload, getState) => {
    const { setPackagesState } = getState!();
    const { response, error } = await getAllServicePackagess(payload);
    if (!error && response.status == 200) {
        setPackagesState(response.data.packages);
    }
}