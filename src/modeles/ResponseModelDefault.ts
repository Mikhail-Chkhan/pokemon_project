import IPokemonResault from "./IPokemonResult";

export default interface ResponseModelDefault {
    count: number;
    next: string,
    previous: string,
    results: IPokemonResault[]
}