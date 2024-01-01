import { NewSubService, UpdatedSubService } from "@/types";
import http, { apiUrl, createHeaders, createErrorResponse, ContentType } from "..";
import { Response } from '@/types';

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