import ResponseModelDefault from "../modeles/ResponseModelDefault";
import {baseUrl, urls} from "../constants/urls";
import axios, {AxiosResponse} from "axios";
import IAbility from "../modeles/IAbility";


let axiosInstance = axios.create({
    baseURL: baseUrl
})

export const abilityService = {
    getAllAbilities: async (params?: URLSearchParams): Promise<AxiosResponse<ResponseModelDefault>> => {
        const url = urls.abilityUrl.all;
        const response: AxiosResponse<ResponseModelDefault> = await axiosInstance.get(url,{params:params})
         console.log(response)
        return response
    },
    getById: async (id:string):Promise<AxiosResponse<IAbility>> => {
        const url = urls.abilityUrl.byId(id)
        const response:AxiosResponse<IAbility> = await axiosInstance.get(url)
        return response
    }
}