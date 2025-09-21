"use client";

import { gql } from "@apollo/client";
import { useQuery, useLazyQuery } from "@apollo/client/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pokemon, BasePokemon, PokemonsData, PokemonData, PokemonSearchVariables } from "../types/pokemon";
import PokemonCard from "./PokemonCard"; 
import {List,Search} from 'lucide-react';

const GET_POKEMONS = gql`
  query pokemons($first: Int!) {
    pokemons(first: $first) {
      id
      number
      name
      image
      types
      classification
      maxCP
    }
  }
`;

interface PokemonListProps {
  staticData?: Pokemon[];
}

export default function PokemonList({ staticData = [] }: PokemonListProps) { 
  const [searchName, setSearchName] = useState("");
  const [searchResult, setSearchResult] = useState<Pokemon | null>(null);
  const router = useRouter();

   
  const { loading, error, data } = useQuery<PokemonsData>(GET_POKEMONS, {
    variables: { first: 160 },
    skip: staticData.length > 0, 
  });

  // Use static data if available, otherwise fall back to Apollo data
  const pokemonData = staticData.length > 0 ? staticData : (data?.pokemons || []);
  const isLoading = staticData.length === 0 && loading;
  const hasError = staticData.length === 0 && error;

  const handleSearch = () => {
    if (searchName.trim()) {
      router.push(`/details?search=${searchName.trim()}`);
    }
  };

  const clearSearch = () => {
    setSearchName(""); 
  };

  const handlePokemonClick = (pokemonName: string) => {
    router.push(`/details?search=${pokemonName}`);
  };

  if (isLoading) return (
    <div className="container mx-auto p-4">
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-xl animate-pulse">Loading Pokemon...</p>
      </div>
    </div>
  );

  if (hasError) return (
    <div className="container mx-auto p-4">
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-red-600">Error: {error?.message}</p>
      </div>
    </div>
  );

 
  return (
    <div className="container mx-auto p-4"> 
        <div className="mb-6 p-4 border-none   flex justify-center">
        <div className="w-full max-w-md">
            <div className="flex flex-row gap-4 mb-2">
                <div className="flex-1">
                    <label htmlFor="searchName" className="block text-sm font-medium mb-1">
                        Search by Name:
                    </label>
                    <input
                        id="searchName"
                        type="text"
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                        placeholder="Enter Pokemon name"
                        className="w-full p-2 border rounded hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    />
                </div>
                <div className="flex flex-col justify-end">
                    <div className="flex gap-2">
                        <button
                            onClick={handleSearch}
                            disabled={!searchName.trim()}
                            className="px-4 py-2 bg-blue-500 text-white flex flex-row items-center rounded hover:bg-blue-600 disabled:opacity-50"
                        >
                           <Search className="mr-2"/> Search
                        </button>
                        <button
                            onClick={clearSearch}
                            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-red-400"
                        >
                            Clear
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </div> 
     
        <div>
            <div className="flex items-center gap-3 mb-4">
                <List color="black" size={28}/>
                <h2 className="text-xl font-bold">
                  Pokemon List ({pokemonData.length})
                  {staticData.length > 0 && (
                    <span className="text-sm text-green-600 ml-2">
                      Statically Optimized
                    </span>
                  )}
                </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {pokemonData.map((p: Pokemon) => (
                <PokemonCard
                    key={p.id}
                    pokemon={p}
                    onClick={handlePokemonClick}
                />
                ))}
            </div>
        </div>
    </div>
  );
}
