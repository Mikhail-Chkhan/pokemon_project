import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import IPokemonResult from "../../modeles/IPokemonResult";


interface PokemonState {
    pokemonArr: IPokemonResult[];
    isEnableSearch: boolean
}

const initialState: PokemonState = {
    pokemonArr: [],
    isEnableSearch: false
};

export const searchPokemonSlice = createSlice({
    name: 'pokemon',
    initialState,
    reducers: {
        setPokemonArr: (state, action: PayloadAction<IPokemonResult[]>) => {
            state.pokemonArr = action.payload;
        },
        resetPokemonArr: (state) => {
            state.pokemonArr = [];
        },
        updatePokemonArr: (state, action: PayloadAction<IPokemonResult[]>) => {
            state.pokemonArr = [...state.pokemonArr, ...action.payload];
        },
        setIsEnableSearch: (state, action: PayloadAction<boolean>) => {
            state.isEnableSearch = action.payload;
        },
        resetEnableSearch: (state) => {
            state.isEnableSearch = false;
        }
    },
});

export const {setPokemonArr, resetPokemonArr, updatePokemonArr, setIsEnableSearch, resetEnableSearch} = searchPokemonSlice.actions;

export default searchPokemonSlice.reducer;
