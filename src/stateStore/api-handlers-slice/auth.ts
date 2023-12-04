import {LoadData} from "./";
import {login, register, getMyProfile} from "@/api/endpoints";

export const handlePostLogin: LoadData = async (payload, getState) => {
    if (!payload) return;
    const { setUser } = getState!();
    const { response, error } = await login(payload);
    setUser(response.data.user)
    if (!error && response.status == 200) setUser(response.data?.user || null);
}

export const handlePostRegister: LoadData = async (payload, getState) => {
    if (!payload) return;
    const { setUser } = getState!();
    const { response, error } = await register(payload);
    setUser(response.data.user)
    if (!error && response.status == 200) setUser(response.data?.user || null);
}

export const handleGetMyProfile: LoadData = async (_, getState) => {
    const { setUser } = getState!();
    const { response, error } = await getMyProfile();
    if (!error && response.status == 200) setUser(response.data?.user || null);
}