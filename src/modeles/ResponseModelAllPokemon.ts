import IPokemonResault from "./IPokemonResault";

export default interface ResponseModelAllPokemon {
    count: number;
    next: string,
    previous: string,
    results: IPokemonResault[]
}