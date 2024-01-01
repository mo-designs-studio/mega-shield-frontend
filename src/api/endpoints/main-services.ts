import http, { apiUrl, createHeaders, createErrorResponse, ContentType } from "..";
import { Response } from '@/types';
import { NewMainService, UpdatedMainService } from "@/types";

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