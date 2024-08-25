import ResponseModelDefault from "../modeles/ResponseModelDefault";
import {baseUrl, urls} from "../constants/urls";
import axios, {AxiosResponse} from "axios";
import IType from "../modeles/IType";


let axiosInstance = axios.create({
    baseURL: baseUrl
})

export const typeService = {
    getAllTypes: async (params?: URLSearchParams): Promise<AxiosResponse<ResponseModelDefault>> => {
        const url = urls.typeUrl.all;
        const response: AxiosResponse<ResponseModelDefault> = await axiosInstance.get(url,{params:params})
         console.log(response)
        return response
    },
    getById: async (id:string):Promise<AxiosResponse<IType>> => {
        const url = urls.typeUrl.byId(id)
        const response:AxiosResponse<IType> = await axiosInstance.get(url)
        return response
    }
}