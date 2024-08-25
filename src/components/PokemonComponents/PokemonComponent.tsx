import React, {useEffect} from 'react';
import {Link, useSearchParams} from "react-router-dom";
import {urls} from "../../constants/urls";
import styles from "./PokemonComponent.module.css";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {pokemonAction} from "../../redux/slices/pokemonSlice";
import {Oval} from "react-loader-spinner";
import IPokemonResult from "../../modeles/IPokemonResult";

const PokemonComponent = () => {
    let [query] = useSearchParams();
    let dispatch = useAppDispatch();
    let {loading, allPokemon, error} = useAppSelector(state => state.pokemonStore);
    const pokemonStore = useAppSelector(state => state.searchPokemonStore);

    let pokemonArr: IPokemonResult[] = [];

    useEffect(() => {
        dispatch(pokemonAction.getAllPokemon(query));
        console.log(query);
    }, [query]);

    if (pokemonStore.isEnableSearch) {
        pokemonArr = pokemonStore.pokemonArr;
    } else {
        pokemonArr = allPokemon.results;
    }

    const extractPokemonId = (url: string) => {
        const urlParts = url.split('/');
        return urlParts[urlParts.length - 2];
    };

    return (
        <div className={styles.contentBox}>
            {error ? (
                <h2>{error}</h2>
            ) : !loading ? (
                pokemonArr.map((pokemon) => (
                    <div className={styles.divCard} key={pokemon.url}>
                        <Link
                            className={styles.pokemonLink}
                            to={`/pokemon/${extractPokemonId(pokemon.url)}`}
                        >
                            <img
                                className={styles.mainImg}
                                src={`${urls.imageUrl.mainImgById(extractPokemonId(pokemon.url))}`}
                                alt={pokemon.name}
                                onError={(e) => {
                                    e.currentTarget.src = '/pokeball-pokemon.svg';
                                }}
                            />
                        </Link>
                        <h3>{pokemon.name}</h3>
                    </div>
                ))
            ) : (
                <div className={styles.divLoading}>
                    <Oval
                        height="150"
                        width="150"
                        color="orange"
                        ariaLabel="loading"
                        secondaryColor="white"
                    />
                </div>
            )}
        </div>
    );
};

export default PokemonComponent;
