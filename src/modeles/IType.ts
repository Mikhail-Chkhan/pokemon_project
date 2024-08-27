
import IPokemonResult from "./IPokemonResult";

export default interface IType {
    pokemon: [
        {pokemon: IPokemonResult }
    ],
    name:string,
    id:number,
    damage_relations: {
        double_damage_from: [{ name: string }];
        double_damage_to: [{ name: string }];
        half_damage_from: [{ name: string }];
        half_damage_to: [{ name: string }];
    };
}