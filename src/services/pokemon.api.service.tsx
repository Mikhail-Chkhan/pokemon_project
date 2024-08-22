import ResponseModelAllPokemon from "../modeles/ResponseModelAllPokemon";
import {urls} from "../constants/urls";

export const pokemonService = {
    getAllPokemon: async (): Promise<ResponseModelAllPokemon> => {
        const url = urls.AllPokemon.base;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                accept: 'application/json',
            }
        }).then(response => response.json());
        return response;
    }
    }