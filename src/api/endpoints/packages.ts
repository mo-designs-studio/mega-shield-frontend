import http, { apiUrl, createHeaders, createErrorResponse, ContentType } from "..";
import { Response } from "./index";

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