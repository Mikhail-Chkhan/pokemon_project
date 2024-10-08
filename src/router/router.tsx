import { createBrowserRouter } from "react-router-dom";
import React from "react";
import MainLayouts from "../layouts/mainLayouts/mainLayouts";
import ALlPokemonPage from "../pages/AllPokemonPage/AllPokemonPage";
import SinglePokemonPage from "../pages/SinglePokemonPage";
import TypePage from "../pages/TypePage";

export const router = createBrowserRouter([
    {
        path: "/", element: <MainLayouts />, children: [
            { index: true, element: <ALlPokemonPage /> },
            { path: "pokemon", element: <ALlPokemonPage /> },
            { path: "pokemon/:pokemonId", element: <SinglePokemonPage /> },
            { path: "type/:typeId", element: <TypePage/> }
        ]
    }
]);
