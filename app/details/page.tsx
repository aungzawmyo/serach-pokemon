"use client";

import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { useRouter } from "next/navigation"; 
import {  PokemonData } from "../../types/pokemon";
import { useSearchParams } from "next/navigation";
import EvolutionCard from "../../components/EvolutionCard";
import ErrorDisplay from "../../components/ErrorDisplay";
import {ChevronLeft} from 'lucide-react';
import { Suspense } from 'react';

const GET_POKEMON_BY_NAME = gql`
  fragment RecursivePokemonFragment on Pokemon {
    id
    number
    name
    classification
    types 
    maxCP 
    image
    evolutions {
      id
      name
      number
    }
  }

  query pokemon($id: String, $name: String) {
    pokemon(id: $id, name: $name) {
      id
      number
      name
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      classification
      types
      resistant
      weaknesses
      fleeRate
      maxCP
      maxHP
      image
      attacks {
        fast {
          name
          type
          damage
        }
        special {
          name
          type
          damage
        }
      }
      evolutions {
        id
        number
        name
        classification
        types 
        maxCP 
        image
        evolutions {
          ...RecursivePokemonFragment
        }
      }
    }
  }
`;

export default function PokemonDetail() {
  return (
    <Suspense fallback={
      <div className="container mx-auto p-4">
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-xl animate-pulse">Loading Pokemon details...</div>
        </div>
      </div>
    }>
      <PokemonDetailContent />
    </Suspense>
  );
}

function PokemonDetailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("search"); // 👉 "Ivysaur"
  console.log("Params:", search);

  const pokemonName =  search;

  const { loading, error, data } = useQuery<PokemonData>(GET_POKEMON_BY_NAME, {
    variables: { name: pokemonName },
    skip: !pokemonName,
  });

  const handleGoBack = () => {
    router.back();
  };

  const handleGoBackHome = () => {
    router.push("/");
  };

  const handleEvolutionClick = (evolutionId: string) => {
    router.push(`/details?search=${evolutionId}`);
  };

  if (!pokemonName) {
    return (
      <ErrorDisplay
        message="No Pokémon selected! Use the search to find a Pokémon."
        onGoBack={handleGoBack}
        onGoHome={handleGoBackHome}
      />
    );
  }
  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex flex-col justify-center items-center min-h-screen">
           
          <div className="text-xl animate-pulse">Loading Pokemon details...</div>
          <div className="mt-2 text-sm text-gray-600">Catching Pokemon data...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <ErrorDisplay
        message={`Error: ${error.message}`}
        onGoBack={handleGoBack}
        onGoHome={handleGoBackHome}
      />
    );
  }

  if (!data?.pokemon) {
    return (
      <ErrorDisplay
        message="Pokemon not found"
        onGoBack={handleGoBack}
        onGoHome={handleGoBackHome}
      />
    );
  }

  const pokemon = data.pokemon;

  return (
    <div className="container mx-auto p-4 w-full max-w-7xl">
     

        {/* Header with back button */}
        <div className="flex items-center mb-6">
            <button
            onClick={handleGoBack}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 mr-4"
            >
            <ChevronLeft /> 
            </button> 
            <h1 className="text-2xl font-bold">Pokemon Details</h1>
        </div>

        {/* Pokemon Detail Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-blue-200">
        
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column - Image and Basic Info */}
                <div className="text-center">
                    <div className="mb-6">
                    
                        <span className="text-sm text-gray-500">#{pokemon.number}</span>
                        <h2 className="text-2xl font-bold text-gray-800">{pokemon.name} </h2>
                    </div>
                    <div className="relative">
                    <img 
                        src={pokemon.image} 
                        alt={pokemon.name} 
                        className="mx-auto mb-4 max-w-full h-auto   rounded-lg "
                        style={{ maxHeight: "300px" }}
                    />
                    
                    </div>
                    {pokemon.classification && (
                    <div className="bg-blue-100 rounded-lg p-3 border-2 border-blue-300 w-[55%]  m-auto">
                        <span className="text-blue-800 font-semibold"> {pokemon.classification}</span>
                    </div>
                    )}
                     {/* Evolutions Section */}
                    {pokemon.evolutions && pokemon.evolutions.length > 0 && (
                    <div className="m-auto mt-15 p-6">
                        <h3 className="text-lg font-semibold mb-4 text-gray-700">Evolutions</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {pokemon.evolutions.map((evolution) => (
                                <EvolutionCard
                                key={evolution.id}
                                evolution={evolution}
                                onClick={handleEvolutionClick}
                                />
                            ))}
                        </div>
                    </div>
                    )}
                </div>

                {/* Detailed Stats */}
                <div className="space-y-4">
                    {/* Types */}
                    {pokemon.types && pokemon.types.length > 0 && (
                    <div >
                        <h3 className="text-lg font-semibold mb-2 text-gray-700">Types</h3>
                        <div className="flex flex-wrap gap-2">
                        {pokemon.types.map((type, index) => (
                            <span 
                            key={index}
                            className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium"
                            >
                            {type}
                            </span>
                        ))}
                        </div>
                    </div>
                    )}

                    {/* Physical Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {pokemon.weight && (
                        <div className="bg-gray-50 p-3 rounded-lg">
                        <h4 className="font-semibold text-gray-700 mb-1">Weight</h4>
                        <p className="text-sm text-gray-600">
                            {pokemon.weight.minimum} - {pokemon.weight.maximum}
                        </p>
                        </div>
                    )}
                    {pokemon.height && (
                        <div className="bg-gray-50 p-3 rounded-lg">
                        <h4 className="font-semibold text-gray-700 mb-1">Height</h4>
                        <p className="text-sm text-gray-600">
                            {pokemon.height.minimum} - {pokemon.height.maximum}
                        </p>
                        </div>
                    )}
                    </div>

                    {/* Combat Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {pokemon.maxCP && (
                        <div className="bg-green-50 p-3 rounded-lg">
                        <h4 className="font-semibold text-green-700 mb-1">Max CP</h4>
                        <p className="text-lg font-bold text-green-800">{pokemon.maxCP}</p>
                        </div>
                    )}
                    {pokemon.maxHP && (
                        <div className="bg-red-50 p-3 rounded-lg">
                        <h4 className="font-semibold text-red-700 mb-1">Max HP</h4>
                        <p className="text-lg font-bold text-red-800">{pokemon.maxHP}</p>
                        </div>
                    )}
                    </div>

                    {/* Flee Rate */}
                    {pokemon.fleeRate !== undefined && (
                    <div className="bg-yellow-50 p-3 rounded-lg">
                        <h4 className="font-semibold text-yellow-700 mb-1">Flee Rate</h4>
                        <p className="text-yellow-800">{(pokemon.fleeRate * 100).toFixed(1)}%</p>
                    </div>
                    )}

                    {/* Weaknesses */}
                    {pokemon.weaknesses && pokemon.weaknesses.length > 0 && (
                    <div>
                        <h3 className="text-lg font-semibold mb-2 text-gray-700">Weaknesses</h3>
                        <div className="flex flex-wrap gap-2">
                        {pokemon.weaknesses.map((weakness, index) => (
                            <span 
                            key={index}
                            className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium"
                            >
                            {weakness}
                            </span>
                        ))}
                        </div>
                    </div>
                    )}

                    {/* Resistances */}
                    {pokemon.resistant && pokemon.resistant.length > 0 && (
                    <div>
                        <h3 className="text-lg font-semibold mb-2 text-gray-700">Resistances</h3>
                        <div className="flex flex-wrap gap-2">
                        {pokemon.resistant.map((resistance, index) => (
                            <span 
                            key={index}
                            className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                            >
                            {resistance}
                            </span>
                        ))}
                        </div>
                    </div>
                    )}

                    {/* Attacks */}
                    {pokemon.attacks && (pokemon.attacks.fast?.length > 0 || pokemon.attacks.special?.length > 0) && (
                    <div>
                        <h3 className="text-lg font-semibold mb-3 text-gray-700">Attacks</h3>
                        <div className="space-y-4">
                        {/* Fast Attacks */}
                        {pokemon.attacks.fast && pokemon.attacks.fast.length > 0 && (
                            <div>
                            <h4 className="font-medium text-gray-600 mb-2">Fast Attacks</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {pokemon.attacks.fast.map((attack, index) => (
                                <div key={index} className="bg-blue-50 p-3 rounded-lg">
                                    <div className="font-medium text-blue-800">{attack.name}</div>
                                    <div className="text-sm text-blue-600">
                                    Type: {attack.type} | Damage: {attack.damage}
                                    </div>
                                </div>
                                ))}
                            </div>
                            </div>
                        )}

                        {/* Special Attacks */}
                        {pokemon.attacks.special && pokemon.attacks.special.length > 0 && (
                            <div>
                            <h4 className="font-medium text-gray-600 mb-2">Special Attacks</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {pokemon.attacks.special.map((attack, index) => (
                                <div key={index} className="bg-purple-50 p-3 rounded-lg">
                                    <div className="font-medium text-purple-800">{attack.name}</div>
                                    <div className="text-sm text-purple-600">
                                    Type: {attack.type} | Damage: {attack.damage}
                                    </div>
                                </div>
                                ))}
                            </div>
                            </div>
                        )}
                        </div>
                    </div>
                    )}
                </div>
            </div> 
       
        </div>
 
    </div>
  );
}