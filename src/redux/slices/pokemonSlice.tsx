import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ResponseModelDefault from "../../modeles/ResponseModelDefault";
import IPokemon from "../../modeles/IPokemon";
import {pokemonService} from "../../services/pokemon.api.service";
import {AxiosError} from "axios";



type PokemonState = {
    allPokemon: ResponseModelDefault;
    pokemon: IPokemon | null;
    loading: boolean;
    error: string | null;
}

const initialState: PokemonState = {
    allPokemon:{
        count:0,
        next: "",
        previous: "",
        results: []
    },
    pokemon: null,
    loading: false,
    error: null,
};

export const getAllPokemon = createAsyncThunk(
    'pokemon/fetchAllPokemon',
    async (params:URLSearchParams, thunkAPI) => {
        try {
            let allPokemon = await pokemonService.getAllPokemon(params);
            return thunkAPI.fulfillWithValue(allPokemon.data);
        } catch (e) {
            let error = e as AxiosError;
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
    });

export const getPokemonById = createAsyncThunk(
    'pokemon/fetchPokemonById',
    async (id:string, thunkAPI) => {
        try {
            let pokemon = await pokemonService.getById(id);
            return thunkAPI.fulfillWithValue(pokemon.data);
        } catch (e) {
            let error = e as AxiosError;
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
    });

export const pokemonSlice = createSlice({
    name: 'pokemonSlice',
    initialState:initialState,
    reducers: {
        fillPokemon: (state, action) => {
            state.pokemon = action.payload;
        },
        refillPokemon: (state, action) => {
            state.allPokemon = action.payload;
        },
        getAllPokemonRequest(state) {
            state.loading = true;
        },
        updateAllPokemon: (state, action) => {
            state.allPokemon = {
                ...state.allPokemon,
                ...action.payload
            };
        }

    },
    extraReducers: (builder) => {
        builder
// ---------------------------------fetchAllPokemon----------------------------------------------//
            .addCase(
                getAllPokemon.pending,
                (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                getAllPokemon.fulfilled,
                (state, action) => {
                state.loading = false;
                state.allPokemon = action.payload;
            })
            .addCase(
                getAllPokemon.rejected,
                (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
// ---------------------------------------getPokemonById----------------------------------------------//
            .addCase(
                getPokemonById.pending,
                (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                getPokemonById.fulfilled,
                (state, action) => {
                state.loading = false;
                state.pokemon = action.payload;
            })
            .addCase(
                getPokemonById.rejected,
                (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});


export const pokemonAction = {
    ...pokemonSlice.actions,
    getAllPokemon,
    getPokemonById
};
