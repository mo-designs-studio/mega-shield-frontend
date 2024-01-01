import axios from "axios";
import { LoginInfo, RegisterInfo } from "@/types";
import http, { apiUrl, createHeaders, createErrorResponse, ContentType } from "..";
import { Response } from '@/types';

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