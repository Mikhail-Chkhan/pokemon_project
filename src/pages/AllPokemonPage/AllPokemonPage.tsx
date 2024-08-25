import React from 'react';
import PokemonComponent from "../../components/PokemonComponents/PokemonComponent";
import {useAppSelector} from "../../redux/store";
import PaginationComponent from "../../components/PaginationComponents/PaginationComponent";
import SearchBarComponent from "../../components/SearchBarComponents/SearchBarComponent";
import styles from './AllPokemonPage.module.css'

const AllPokemonPage = () => {
    let {allPokemon} = useAppSelector(state => state.pokemonStore)
    const isEnableSearch = useAppSelector(state => state.searchPokemonStore.isEnableSearch);
    return (
        <div className={styles.mainBox}>
            <div className={styles.searchBox}><SearchBarComponent/></div>
            <div className={styles.pokemonBox}><PokemonComponent/></div>

            {isEnableSearch ? (<div></div>) : (
                <div className={styles.paginatorBox}><PaginationComponent
                    next={allPokemon.next}
                    previous={allPokemon.previous}
                    count={allPokemon.count}
                    step={20}/>
                </div>
            )}
        </div>
    );
};

export default AllPokemonPage;