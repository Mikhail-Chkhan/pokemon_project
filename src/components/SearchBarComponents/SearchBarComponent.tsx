import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {pokemonAction} from "../../redux/slices/pokemonSlice";
import {searchPokemonSlice} from "../../redux/slices/searchPokemonSlice";
import {typeAction, typeSlice} from "../../redux/slices/typeSlice";
import {useSearchParams} from "react-router-dom";


const SearchComponent = () => {
    const [searchType, setSearchType] = useState('name');
    const [searchQuery, setSearchQuery] = useState('');
    const [result, setResult] = useState(null);

    let dispatch = useAppDispatch();
    let {allPokemon} = useAppSelector(state => state.pokemonStore)
    let {type} = useAppSelector(state => state.typeStore)
    const pokemonArr = useAppSelector(state => state.searchPokemonStore);


    const handleSearchTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSearchType(event.target.value);
    };

    const handleSearchQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleSearch = async () => {
        dispatch(searchPokemonSlice.actions.setIsEnableSearch(true));
        try {
            if (searchType === 'name') {
                const queryParams = new URLSearchParams({
                    offset: "0",
                    limit: "2000"
                });
                const response = await dispatch(pokemonAction.getAllPokemon(queryParams)).unwrap();
                const filteredResults = response.results.filter((pokemon: any) =>
                    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
                );
                dispatch(searchPokemonSlice.actions.setPokemonArr(filteredResults));

            } else if (searchType === 'type') {
                const typeResponse = await dispatch(typeAction.getTypeById(searchQuery)).unwrap();
                const pokemonResults = typeResponse.pokemon.map((pok: any) => pok.pokemon);
                dispatch(searchPokemonSlice.actions.updatePokemonArr(pokemonResults));
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setResult(null);
        }
    };


    const reset = () => {
        dispatch(searchPokemonSlice.actions.resetEnableSearch())
        dispatch(searchPokemonSlice.actions.resetPokemonArr())
        setSearchQuery("")
        const queryParams = new URLSearchParams({
            offset: "0",
            limit: "20"
        });
        dispatch(pokemonAction.getAllPokemon(queryParams));
    }

    return (
        <div>
            <input
                type="text"
                value={searchQuery}
                onChange={handleSearchQueryChange}
                placeholder={`Search by ${searchType}`}
            />
            <select value={searchType} onChange={handleSearchTypeChange}>
                <option value="name">Name</option>
                <option value="ability">Ability</option>
                <option value="type">Type</option>
            </select>

            <button onClick={handleSearch}>Search</button>
            <button onClick={reset}>Reset</button>

        </div>
    );
};

export default SearchComponent;
