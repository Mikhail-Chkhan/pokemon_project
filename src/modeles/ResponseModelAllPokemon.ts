import IPokemonResault from "./IPokemonResult";

export default interface ResponseModelAllPokemon {
    count: number;
    next: string,
    previous: string,
    results: IPokemonResault[]
}