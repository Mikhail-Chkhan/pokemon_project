import {searchPokemonSlice} from "../redux/slices/searchPokemonSlice";
import {pokemonAction} from "../redux/slices/pokemonSlice";
import {useAppDispatch} from "../redux/store";


export  const reset = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    let dispatch = useAppDispatch();
    dispatch(searchPokemonSlice.actions.resetEnableSearch())
    dispatch(searchPokemonSlice.actions.resetPokemonArr())
    // setSearchQuery("")
    const queryParams = new URLSearchParams({
        offset: "0",
        limit: "20"
    });
    dispatch(pokemonAction.getAllPokemon(queryParams));
}