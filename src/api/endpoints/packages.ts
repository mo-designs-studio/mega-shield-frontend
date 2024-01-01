import { PackageProps } from '@/types';
import http, { apiUrl, createHeaders, createErrorResponse, ContentType } from '..';
import { Response } from '@/types';

export const getAllServicePackages = async (payload: { id: string }): Promise<Response> => {
    const url = apiUrl + '/packages/service-packages/' + payload.id;
    const header = { ...createHeaders(ContentType.JSON) };
    try {
        const response = await http.get(url, header);
        return { response: response };
    } catch (error) {
        const response = createErrorResponse(error);
        return response;
    }
};

export const addPackage = async (payload: PackageProps): Promise<Response> => {
    const url = apiUrl + '/packages/add-package';
    const header = { ...createHeaders(ContentType.JSON) };
    try {
        const response = await http.post(url, { ...payload }, header);
        return { response: response };
    } catch (error) {
        const response = createErrorResponse(error);
        return response;
    }
};
export const updatePackage = async (payload: {id: string, package:PackageProps}): Promise<Response> => {
    const url = apiUrl + "/packages/update-package/" + payload.id;
    const header = { ...createHeaders(ContentType.JSON) }
    try {
      const response = await http.patch(url, payload.package, header);
      return { response: response };
    } catch (error) {
      const response = createErrorResponse(error);
      return response;
    }
  }

  export const deletePackage = async (payload: { id: string }): Promise<Response> => {
    const url = apiUrl + "/packages/delete-package/" + payload.id;
    const header = { ...createHeaders(ContentType.FORM_DATA) }
    try {
      const response = await http.delete(url, header);
      return { response: response };
    } catch (error) {
      const response = createErrorResponse(error);
      return response;
    }
  }
