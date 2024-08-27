export const baseUrl = 'https://pokeapi.co/api/v2/';
export const baseImgUrl = "https://raw.githubusercontent.com/"


export const urls = {
    pokemonUrl: {
        all: baseUrl + 'pokemon',
        byId: (id: string): string => baseUrl + 'pokemon/' + id,
    },
    imageUrl: {
        mainImgById: (id: string): string => baseImgUrl + 'PokeAPI/sprites/master/sprites/pokemon/other/dream-world/' + id + '.svg',
        secondImgById: (id: string): string => baseImgUrl + 'PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/' + id + '.png'
    },
    typeUrl : {
        all: baseUrl + 'type',
        byId: (id: string): string => baseUrl + 'type/' + id,
    },
    abilityUrl:{
        all: baseUrl + 'ability',
        byId: (id: string): string => baseUrl + 'ability/' + id,
    }
}
