import { AxiosResponse } from "axios";
import http, { apiUrl, createHeaders, createErrorResponse, ContentType } from "./";

type Response = {
  response: AxiosResponse,
  error?: Object
}

export const checkApiConnection = async (): Promise<Response> => {
  const url = apiUrl + "/check-connectivity";
  const header = { ...createHeaders(ContentType.JSON) };

  try {
    const response = await http.get(url, header);
    return { response: response };
  } catch (error) {
    const response = createErrorResponse(error);
    return response;
  }
};

export const getAllMainServices = async (): Promise<Response> => {
  const url = apiUrl + "/mainservices/allMainServices";
  const header = { ...createHeaders(ContentType.JSON) };

  try {
    const response = await http.get(url, header);
    return { response: response };
  } catch (error) {
    const response = createErrorResponse(error);
    return response;
  }
}