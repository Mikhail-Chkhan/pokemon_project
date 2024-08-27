export default interface IPokemon {
    name: string,
    id: number,
    abilities?: [{ ability: { name: string } }],
    stats?: [
        {
            base_stat: number,
            stat: { name: string }
        }
    ],
    types?: [
        { type: { name: string } }
    ],
    forms?: [
        { name: string }
    ],

    sprites: {
        other: {
            dream_world: {
                front_default: string | null,
                front_female: string | null
            }
        },
        home: {
            front_default: string | null,
            front_female: string | null,
            front_shiny: string | null,
            front_shiny_female: string | null
        }
    }
}