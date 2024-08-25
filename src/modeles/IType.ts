
import IPokemonResult from "./IPokemonResult";

export default interface IType {
    pokemon: [
        {pokemon: IPokemonResult }
    ],
    name:string,
    id:number
}