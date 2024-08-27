import React, {useEffect} from 'react';
import {Link, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {pokemonAction} from "../../redux/slices/pokemonSlice";
import {Oval} from "react-loader-spinner";
import styles from "./SinglePokemonComponent.module.css";

const SinglePokemonComponent: React.FC = () => {
    const {pokemonId} = useParams<{ pokemonId: string }>();
    const dispatch = useAppDispatch();
    const {loading, pokemon, error} = useAppSelector(state => state.pokemonStore);

    useEffect(() => {
        if (pokemonId) {
            dispatch(pokemonAction.getPokemonById(pokemonId));
        }
    }, [pokemonId, dispatch]);

    return (
        <div>
            {error ? (
                <h2>{error}</h2>
            ) : loading ? (
                <div>
                    <Oval
                        height="150"
                        width="150"
                        color="orange"
                        ariaLabel="loading"
                        secondaryColor="white"
                    />
                </div>
            ) : (
                pokemon && (
                    <div className={styles.divBox}>
                        <div className={styles.divHeader}>
                            <Link className={styles.linkHome} to={'/pokemon'}>
                                <img className={styles.logo} src={'/pokeball-pokemon.svg'} alt={'main page'}/>
                                <p className={styles.pokemonName}>Home Page</p>
                            </Link>
                            <h1>{pokemon.name}</h1>
                        </div>
                        <div className={styles.mainContent}>
                            <div className={styles.divBoxContent}>
                                <div className={styles.leftContent}>
                                    <img
                                        className={styles.mainImg}
                                        src={
                                            pokemon.sprites.other.dream_world.front_default
                                            || pokemon.sprites.other.dream_world.front_female
                                            || '/pokeball-pokemon.svg'
                                        }
                                        alt={pokemon.name}
                                        onError={(e) => {
                                            e.currentTarget.src = '/pokeball-pokemon.svg';
                                        }}
                                    />
                                    <h3>Forms</h3>
                                    <div>

                                        {pokemon.forms?.map((form, index) => (
                                            <div key={index}>{form.name}</div>
                                        ))}
                                    </div>
                                </div>
                                <div className={styles.rightContent}>
                                    <h3>Abilities</h3>
                                    <div>
                                        {pokemon.abilities?.map((ability, index) => (
                                            <div key={index}>{ability.ability.name}</div>
                                        ))}
                                    </div>
                                    <h3>Stats</h3>
                                    <div>
                                        {pokemon.stats?.map((stat, index) => (
                                            <div className={styles.divStat}
                                                 key={index}>
                                                <div className={styles.divStatName}>{stat.stat.name}</div>
                                                <div className={styles.divStatNumber}>{stat.base_stat}</div>
                                            </div>
                                        ))}
                                    </div>
                                    <h3>Types</h3>
                                    <div className={styles.boxType}>
                                        {pokemon.types?.map((type, index) => (
                                            <Link to={`/type/${type.type.name}`} key={index} className={styles.linkType}>
                                               <div> {type.type.name}</div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            )}
        </div>
    );
};

export default SinglePokemonComponent;
