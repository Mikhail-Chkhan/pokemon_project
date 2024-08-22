import {createBrowserRouter} from "react-router-dom";
import React from "react";
import MainLayouts from "../layouts/mainLayouts/mainLayouts";
import ALlPokemonPage from "../pages/AllPokemonPage";
import SinglePokemonPage from "../pages/SinglePokemonPage";

export const router = createBrowserRouter([
    {
        path: "/", element: <MainLayouts/>, children: [
            {index: true, element: <ALlPokemonPage/>},
            {path: "pokemon", element: <ALlPokemonPage/>},
            {
                path: "pokemonId", element: <SinglePokemonPage/>
                // children: [
                //     {path: ":pokemonId", element: <CommentsToPostComponent/>}
                // ]
            }
        ]
    }
]);