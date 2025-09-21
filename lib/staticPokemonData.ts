// Static data fetching service for Pokemon
import { Pokemon, PokemonsData } from "../types/pokemon";

const GRAPHQL_ENDPOINT = process.env.GRAPHQL_ENDPOINT || "https://graphql-pokemon2.vercel.app";

// Server-side GraphQL fetch function
async function fetchGraphQL(query: string, variables?: any) {
  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
    // Cache for static optimization
    cache: 'force-cache',
    next: { 
      revalidate: 3600 // Revalidate every hour (ISR)
    }
  });

  if (!response.ok) {
    throw new Error(`GraphQL request failed: ${response.statusText}`);
  }

  const result = await response.json();
  
  if (result.errors) {
    throw new Error(`GraphQL errors: ${JSON.stringify(result.errors)}`);
  }

  return result;
}

// Fetch all Pokemon (for static generation)
export async function getStaticPokemonList(first: number = 160): Promise<Pokemon[]> {
  const query = `
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

  try {
    const result = await fetchGraphQL(query, { first });
    return result.data?.pokemons || [];
  } catch (error) {
    console.error("Failed to fetch Pokemon list:", error);
    return [];
  }
}

// Fetch single Pokemon by name (for static generation)
export async function getStaticPokemonByName(name: string): Promise<Pokemon | null> {
  const query = `
    fragment RecursivePokemonFragment on Pokemon {
      id
      number
      name
      classification
      types
      resistant
      weaknesses
      fleeRate
      maxCP
      maxHP
      image
      evolutions {
        id
        name
        number
      }
    }

    query pokemon($name: String) {
      pokemon(name: $name) {
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
          resistant
          weaknesses
          fleeRate
          maxCP
          maxHP
          image
          evolutions {
            ...RecursivePokemonFragment
          }
        }
      }
    }
  `;

  try {
    const result = await fetchGraphQL(query, { name });
    return result.data?.pokemon || null;
  } catch (error) {
    console.error(`Failed to fetch Pokemon ${name}:`, error);
    return null;
  }
}

// Get all Pokemon names for static path generation
export async function getAllPokemonNames(): Promise<string[]> {
  const pokemon = await getStaticPokemonList(160);
  return pokemon.map(p => p.name);
}

// Client-side fallback data structure
export interface StaticPokemonData {
  pokemon: Pokemon[];
  timestamp: number;
}