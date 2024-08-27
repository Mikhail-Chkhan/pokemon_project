import {configureStore} from "@reduxjs/toolkit";

import {useDispatch, useSelector} from "react-redux";
import {pokemonSlice} from "./slices/pokemonSlice";
import {searchPokemonSlice} from "./slices/searchPokemonSlice";
import {typeSlice} from "./slices/typeSlice";
import {abilitySlice} from "./slices/abilitySlice";



export const store = configureStore({
    reducer: {
        pokemonStore: pokemonSlice.reducer,
        searchPokemonStore: searchPokemonSlice.reducer,
        typeStore: typeSlice.reducer,
        abilityStore: abilitySlice.reducer,

    }
});

export const useAppDispatch = useDispatch.withTypes<typeof store.dispatch>();
export const useAppSelector = useSelector.withTypes<ReturnType<typeof store.getState>>();