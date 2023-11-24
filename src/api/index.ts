import axios from "axios";

export const apiUrl = import.meta.env.VITE_SERVER_URL;

export enum ContentType {
    json = "application/json",
    formData = "multipart/form-data"
}

export type HeadersContent = {
    "Accept": string,
    "Content-Type": ContentType,
    "accept-language": string,
    "Authorization"?: string,
}
export const createHeaders = (contentType: ContentType) => {
    const token = localStorage.getItem("access-token") && "Bearer " + localStorage.getItem("access-token");
    const headersObject: HeadersContent = {
        "Accept": "application/json",
        "Content-Type": contentType,
        "accept-language": localStorage.getItem("language") ?? "en",
      }
    const headers = {
      headers: headersObject
    };
    if (token) headers.headers["Authorization"] = token;
    return headers;
  };