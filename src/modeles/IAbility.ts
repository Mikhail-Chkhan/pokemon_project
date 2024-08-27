
import IPokemonResult from "./IPokemonResult";

export default interface IAbility {
    pokemon: [
        {pokemon: IPokemonResult }
    ],
    name:string,
    id:number
}