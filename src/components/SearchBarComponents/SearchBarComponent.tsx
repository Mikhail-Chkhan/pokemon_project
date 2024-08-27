import React, { useState } from 'react';
import { useAppDispatch } from "../../redux/store";
import { pokemonAction } from "../../redux/slices/pokemonSlice";
import { searchPokemonSlice } from "../../redux/slices/searchPokemonSlice";
import { typeAction } from "../../redux/slices/typeSlice";
import { abilityAction } from "../../redux/slices/abilitySlice";
import styles from "./SearchBarComponent.module.css";
import { useSearchParams } from "react-router-dom";

const SearchComponent = () => {
    const [searchType, setSearchType] = useState('name');
    const [searchQuery, setSearchQuery] = useState('');
    const [result, setResult] = useState(null);
    const [query, setQuery] = useSearchParams();

    const dispatch = useAppDispatch();

    const handleSearchTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSearchType(event.target.value);
    };

    const handleSearchQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleSearch = async () => {
        dispatch(searchPokemonSlice.actions.setIsEnableSearch(true));
        try {
            dispatch(searchPokemonSlice.actions.resetPokemonArr());

            if (searchType === 'name') {
                setQuery({ offset: '0', limit: '2000' });
                const response = await dispatch(pokemonAction.getAllPokemon(query)).unwrap();
                const filteredResults = response.results.filter((pokemon) =>
                    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
                );
                dispatch(searchPokemonSlice.actions.setPokemonArr(filteredResults));
            } else if (searchType === 'type') {
                const typeResponse = await dispatch(typeAction.getTypeById(searchQuery)).unwrap();
                const pokemonResults = typeResponse.pokemon.map((pok) => pok.pokemon);
                dispatch(searchPokemonSlice.actions.updatePokemonArr(pokemonResults));
            } else if (searchType === 'ability') {
                const abilityResponse = await dispatch(abilityAction.getAbilityById(searchQuery)).unwrap();
                const pokemonResults = abilityResponse.pokemon.map((pok) => pok.pokemon);
                dispatch(searchPokemonSlice.actions.updatePokemonArr(pokemonResults));
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setResult(null);
        }
    };

    const reset = () => {
        setSearchQuery('');
        dispatch(searchPokemonSlice.actions.resetEnableSearch());
        dispatch(searchPokemonSlice.actions.resetPokemonArr());
        setQuery({ offset: '0', limit: '20' });
        dispatch(pokemonAction.getAllPokemon(query));
    };

    return (
        <div className={styles.headerDiv}>
            <input
                className={styles.inputBox}
                type="text"
                value={searchQuery}
                onChange={handleSearchQueryChange}
                placeholder={`Search by ${searchType}`}
            />
            <select
                className={styles.dropDown}
                value={searchType}
                onChange={handleSearchTypeChange}>
                <option value="name">Name</option>
                <option value="ability">Ability</option>
                <option value="type">Type</option>
            </select>

            <button
                className={styles.searchButton}
                onClick={handleSearch}>Search</button>
            <button
                className={styles.resetButton}
                onClick={reset}>Reset</button>
        </div>
    );
};

export default SearchComponent;
