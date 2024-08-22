import React, { useEffect, useState } from 'react';
import { pokemonService } from "../../services/pokemon.api.service";
import IPokemonResault from "../../modeles/IPokemonResault";



const PokemonComponent = () => {
    const [pokemon, setPokemon] = useState<IPokemonResault[]>([]);

    useEffect(() => {
        pokemonService.getAllPokemon().then(response => {
            const rez = response.results;
            console.log(rez);
            setPokemon(rez);
        });
    }, []);

    return (
        <div>
            {pokemon.map((pokemon) => (
                <div key={pokemon.url}>
                    <p>{pokemon.name}</p>
                    <img src={""} alt={pokemon.name} />
                </div>
            ))}
        </div>
    );
};

export default PokemonComponent;
