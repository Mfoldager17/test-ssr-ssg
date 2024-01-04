import { Suspense } from "react";
import Loading from "./loading";
import React from "react";

export default async function Page() {

    const skeleton = [...Array.from(Array(100).keys())];
    type pokemon = {
        name: string,
    }

    const pokemons = await getPokemons();
    const pokemonImages = await Promise.all(pokemons.results.map(async (pokemon: pokemon) => {
        const image = await getPokemonImage(pokemon.name);
        return image;
    }))


    console.log("Rendering SSR page");
    return (
        <Suspense fallback={skeleton.map((index) => <React.Fragment key={index}><Loading /></React.Fragment>)}>
            <div className="flex flex-row flex-wrap gap-7 row-span-5 place-content-center items-center">
                {pokemons.results.map((pokemon: pokemon, index: number) => {
                    return <div className=" bg-slate-700 border border-white flex flex-col place-content-center items-center w-48 h-48" key={index}>{pokemon.name.toLocaleUpperCase()} <img src={pokemonImages[index]} alt="" /></div>
                })}
            </div>
        </Suspense>
    )
}

const getPokemons = async () => {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=500&offset=0", { cache: "no-store" })
    return await res.json();
}

const getPokemonImage = async (name: string) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`, { cache: "no-store" })
    const pokemon = await res.json();
    const image = pokemon.sprites.front_default;
    return image;
}
