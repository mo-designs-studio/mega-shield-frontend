import axios from "axios";

export const apiUrl = import.meta.env.VITE_SERVER_URL + "/api";

export enum ContentType {
    JSON = "application/json",
    FORM_DATA = "multipart/form-data"
}

export type HeadersContent = {
    "Accept": string,
    "Content-Type": ContentType,
    "accept-language": string,
    "Authorization"?: string,
}
export const createHeaders = (contentType: ContentType) => {
    const token = localStorage.getItem("access-token") && "Bearer " + localStorage.getItem("access-token");
    const localeLang: string = localStorage.getItem("language") ?? "ar"
    const headersObject: HeadersContent = {
        "Accept": "application/json",
        "Content-Type": contentType,
        "accept-language": localeLang,
      }
    const headers = {
      headers: headersObject
    };
    if (token) headers.headers["Authorization"] = token;
    return headers;
  };

  export const createErrorResponse = (error: any) => {
    const response = {
      error: {
        title: error.response
          ? "error " + error.response.status
          : "connection error",
        text: error.response?.data?.message || error.message,
      },
      response: error.response || { status: null },
    };
    return response;
  };
  
  const http = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
  };
  
  export default http;