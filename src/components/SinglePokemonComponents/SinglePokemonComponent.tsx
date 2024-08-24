import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import IPokemon from "../../modeles/IPokemon";
import { pokemonService } from "../../services/pokemon.api.service";

const SinglePokemonComponent = () => {
    const { pokemonId } = useParams<{ pokemonId: string }>();
    const [pokemon, setPokemon] = useState<IPokemon | null>(null); // Используем `null` как начальное значение

    useEffect(() => {
        if (pokemonId) {
            pokemonService.getById(pokemonId).then(response => {
                const data = response.data;
                setPokemon(data);
            });
        }
    }, [pokemonId]);

    return (
        <div>
            {pokemon ? (
                <>
                    <p>{pokemon.name}</p>
                    <p>ID: {pokemon.id}</p>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default SinglePokemonComponent;
