import axios, { AxiosResponse } from "axios";
import http, { apiUrl, createHeaders, createErrorResponse, ContentType } from "./";
import { LoginInfo, RegisterInfo, NewMainService, UpdatedMainService, NewSubService, UpdatedSubService } from "@/types";

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

export const login = async (payload: LoginInfo): Promise<Response> => {
  const url = apiUrl + "/auth/login";
  const header = { ...createHeaders(ContentType.JSON) };
  try {
    const response = await http.post(url, { ...payload }, header);
    return { response: response };
  } catch (error) {
    const response = createErrorResponse(error);
    return response;
  }
}

export const register = async (payload: RegisterInfo): Promise<Response> => {
  const url = apiUrl + "/auth/register";
  const header = { ...createHeaders(ContentType.JSON) };
  try {
    const response = await http.post(url, { ...payload }, header);
    return { response: response };
  } catch (error) {
    const response = createErrorResponse(error);
    return response;
  }
}

export const getMyProfile = async (): Promise<Response> => {
  const url = apiUrl + "/users/my-profile";
  const header = { ...createHeaders(ContentType.JSON) };
  axios.defaults.withCredentials = true
  try {
    const response = await http.get(url, header);
    return { response: response };
  } catch (error) {
    const response = createErrorResponse(error);
    return response;
  }
}

export const getMainServiceById = async (payload: { id: string }): Promise<Response> => {
  const url = apiUrl + "/mainservices/getSingleMainService/" + payload.id;
  const header = { ...createHeaders(ContentType.JSON) };
  try {
    const response = await http.get(url, header);
    return { response: response };
  } catch (error) {
    const response = createErrorResponse(error);
    return response;
  }
}

export const addMainService = async (payload: NewMainService): Promise<Response> => {
  const url = apiUrl + "/mainservices/add-main-service";
  const header = { ...createHeaders(ContentType.FORM_DATA) }
  let formData = new FormData();
  formData.append("name", payload.name)
  formData.append("description", payload.description)
  formData.append("image", payload.image)
  if (payload.isAdditional) formData.append("isAdditional", payload.isAdditional.toString())
  try {
    const response = await http.post(url, formData, header);
    return { response: response };
  } catch (error) {
    const response = createErrorResponse(error);
    return response;
  }
}

export const updateMainService = async (payload: UpdatedMainService): Promise<Response> => {
  const url = apiUrl + "/mainservices/update-main-service/" + payload.id;
  const header = { ...createHeaders(ContentType.FORM_DATA) }
  let formData = new FormData();
  formData.append("name", payload.name)
  formData.append("description", payload.description)
  if (payload.image) formData.append("image", payload.image)
  try {
    const response = await http.put(url, formData, header);
    return { response: response };
  } catch (error) {
    const response = createErrorResponse(error);
    return response;
  }
}

export const deleteMainService = async (payload: { id: string }): Promise<Response> => {
  const url = apiUrl + "/mainservices/delete-main-service/" + payload.id;
  const header = { ...createHeaders(ContentType.FORM_DATA) }
  try {
    const response = await http.delete(url, header);
    return { response: response };
  } catch (error) {
    const response = createErrorResponse(error);
    return response;
  }
}

export const addSubService = async (payload: NewSubService): Promise<Response> => {
  const url = apiUrl + "/services/add-sub-service";
  const header = { ...createHeaders(ContentType.FORM_DATA) }
  let formData = new FormData();
  formData.append("name", payload.name)
  formData.append("description", payload.description)
  formData.append("belongsTo", payload.belongsTo)
  formData.append("image", payload.image)
  try {
    const response = await http.post(url, formData, header);
    return { response: response };
  } catch (error) {
    const response = createErrorResponse(error);
    return response;
  }
}

export const updateSubService = async (payload: UpdatedSubService): Promise<Response> => {
  const url = apiUrl + "/services/update-sub-service/" + payload.id;
  const header = { ...createHeaders(ContentType.FORM_DATA) }
  let formData = new FormData();
  formData.append("name", payload.name)
  formData.append("description", payload.description)
  formData.append("belongsTo", payload.belongsTo)
  if (payload.image) formData.append("image", payload.image)
  try {
    const response = await http.put(url, formData, header);
    return { response: response };
  } catch (error) {
    const response = createErrorResponse(error);
    return response;
  }
}

export const deleteSubService = async (payload: { id: string }): Promise<Response> => {
  const url = apiUrl + "/services/delete-sub-service/" + payload.id;
  const header = { ...createHeaders(ContentType.FORM_DATA) }
  try {
    const response = await http.delete(url, header);
    return { response: response };
  } catch (error) {
    const response = createErrorResponse(error);
    return response;
  }
}
export const getAllMainServicesSubServices = async (payload: { id: string }): Promise<Response> => {
  const url = apiUrl + "/services/main-service-sub-services/" + payload.id;
  const header = { ...createHeaders(ContentType.JSON) };
  try {
    const response = await http.get(url, header);
    return { response: response };
  } catch (error) {
    const response = createErrorResponse(error);
    return response;
  }
}

export const getAllServicePackagess = async (payload: { id: string }): Promise<Response> => {
  const url = apiUrl + "/packages/service-packages/" + payload.id;
  const header = { ...createHeaders(ContentType.JSON) };
  try {
    const response = await http.get(url, header);
    return { response: response };
  } catch (error) {
    const response = createErrorResponse(error);
    return response;
  }
}