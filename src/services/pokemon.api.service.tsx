import ResponseModelDefault from "../modeles/ResponseModelDefault";
import {baseUrl, urls} from "../constants/urls";
import axios, {AxiosResponse} from "axios";
import IPokemon from "../modeles/IPokemon";


let axiosInstance = axios.create({
    baseURL: baseUrl
})

interface IParams {
    offset?:string,
    limit?:string
}

export const pokemonService = {
    getAllPokemon: async (params?: URLSearchParams): Promise<AxiosResponse<ResponseModelDefault>> => {
        const url = urls.pokemonUrl.all;
        const response: AxiosResponse<ResponseModelDefault> = await axiosInstance.get(url,{params:params})
        // console.log(response)
        return response
    },
    getById: async (id:string):Promise<AxiosResponse<IPokemon>> => {
        const url = urls.pokemonUrl.byId(id)
        const response:AxiosResponse<IPokemon> = await axiosInstance.get(url)
        console.log(response)
        return response
    }
}