import React, { FC, useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import styles from "./TypeComponent.module.css";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { typeAction } from "../../redux/slices/typeSlice";
import { searchPokemonSlice } from "../../redux/slices/searchPokemonSlice";
import PokemonComponent from "../PokemonComponents/PokemonComponent";


const TypeComponent: FC = () => {
    const { typeId } = useParams<{ typeId: string }>();
    const [enablePokemon, setEnablePokemon] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const { type, error, loading } = useAppSelector(state => state.typeStore);

    useEffect(() => {
        if (typeId) {
            dispatch(typeAction.getTypeById(typeId));
        }
    }, [typeId, dispatch]);

    const getPokemon = () => {
        if (type) {
            setEnablePokemon(!enablePokemon);
            dispatch(searchPokemonSlice.actions.setIsEnableSearch(true));
            dispatch(searchPokemonSlice.actions.resetPokemonArr());
            const pokemonResults = type.pokemon.map((pok) => pok.pokemon);
            dispatch(searchPokemonSlice.actions.updatePokemonArr(pokemonResults));

        }
    };

    return (
        <div>
            {error ? (
                <h2>{error}</h2>
            ) : loading ? (
                <div className={styles.loader}>
                    <Oval height="150" width="150" color="orange" ariaLabel="loading" />
                </div>
            ) : type ? (
                <div className={styles.content}>
                    <div className={styles.divHeader}>
                        <Link className={styles.linkHome} to={'/pokemon'}>
                            <img className={styles.logo} src={'/pokeball-pokemon.svg'} alt={'main page'} />
                            <p className={styles.pokemonName}>Home Page</p>
                        </Link>
                        <h1 className={styles.title}>{type.name} Type</h1>
                    </div>

                    <div className={styles.section}>
                        <h3>Damage Relations</h3>
                        <p><strong>Double Damage From: </strong>
                            {type.damage_relations.double_damage_from.map(d => d.name).join(', ')}
                        </p>
                        <p><strong>Double Damage To: </strong>
                            {type.damage_relations.double_damage_to.map(d => d.name).join(', ')}
                        </p>
                        <p><strong>Half Damage From: </strong>
                            {type.damage_relations.half_damage_from.map(d => d.name).join(', ')}
                        </p>
                        <p><strong>Half Damage To: </strong>
                            {type.damage_relations.half_damage_to.map(d => d.name).join(', ')}
                        </p>
                    </div>

                    <button
                        className={styles.hideShowPokemon}
                        onClick={getPokemon}>
                        {enablePokemon ? "Hide":"Show"} Pokemon with this Type
                    </button>
                    {enablePokemon ? <PokemonComponent/> : null}
                </div>
            ) : null}
        </div>
    );
};

export default TypeComponent;
