export const getCookie = (name: string) => {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [cookieName, cookieValue] = cookie.trim().split('=');
        if (cookieName === name && cookieValue) {
            return cookieValue;
        }
    }
    return null;
};

export const deleteCookies = (name: string) => {
    const date = new Date();
    const expiredDate = date.setDate(date.getDate() - 1);
    document.cookie = `${name}=; expires=${expiredDate}`;
};

import { CarSizes } from "@/types";

export const getEnumValue = (value: string) => {
    const index = Object.keys(CarSizes).indexOf(value);
    return Object.values(CarSizes)[index];
}
