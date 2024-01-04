'use client';

import { Suspense, useEffect, useState } from "react";

export default function Page() {

    const [pokemons, setPokemons] = useState([] as pokemon[])

    type pokemon = {
        name: string,
        image: string,
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

    useEffect(() => {
        const fetchData = async () => {
            getPokemons().then((data) => {
                data.results.map(async (pokemon: pokemon) => {
                    pokemon.image = await getPokemonImage(pokemon.name);
                    pokemon.name = pokemon.name.toLocaleUpperCase();
                    setPokemons((pokemons) => [...pokemons, pokemon])
                })
            })
        }
        fetchData();
    }, []);


    return (
        <div className="flex flex-row flex-wrap gap-7 row-span-5 place-content-center items-center">
            {pokemons.map((pokemon: pokemon, index: number) => {
                return <div className=" bg-slate-700 border border-white flex flex-col place-content-center items-center w-48 h-48" key={index}>{pokemon.name.toLocaleUpperCase()}<img src={pokemon.image} /></div>
            })}
        </div>
    )
}

