import React, {useEffect, useState} from 'react';
import {pokemonService} from "../../services/pokemon.api.service";
import {Link, useSearchParams} from "react-router-dom";
import {urls} from "../../constants/urls";
import PaginationComponent from "../PaginationComponents/PaginationComponent";
import ResponseModelAllPokemon from "../../modeles/ResponseModelAllPokemon";
import styles from "./PokemonComponent.module.css"

const PokemonComponent = () => {
    const [data, setData] = useState<ResponseModelAllPokemon>(
        {
            count: 0,
            next: "",
            previous: "",
            results: []
        }
    );
    let [query] = useSearchParams()

    useEffect(() => {
        pokemonService.getAllPokemon(query).then(response => {
            const rez = response.data;
            console.log(rez);
            setData(rez);
        });
    }, [data.next, query]);

    const extractPokemonId = (url: string) => {
        const urlParts = url.split('/');
        console.log(urlParts)
        return urlParts[urlParts.length - 2];
    };

    return (

            <div className={styles.contentBox}>
                {data.results.map((pokemon) => (
                    <div className={styles.divCard}
                         key={pokemon.url}>
                        <Link
                            className={styles.pokemonLink}
                            to={`/pokemon/${extractPokemonId(pokemon.url)}`}>

                            <img
                                className={styles.mainImg}
                                src={`${urls.imageUrl.mainImgById(extractPokemonId(pokemon.url))}`}
                                alt={pokemon.name}
                                onError={(e) => {
                                    e.currentTarget.src = `${urls.imageUrl.secondImgById(extractPokemonId(pokemon.url))}`
                                }}
                            />

                        </Link>
                        <h3>{pokemon.name}</h3>
                    </div>
                ))}
                <PaginationComponent next={data.next} previous={data.previous} count={data.count} step={20}/>
            </div>

    );
};

export default PokemonComponent;
