// Server Component for static optimization
import { getStaticPokemonList } from "@/lib/staticPokemonData";
import { Pokemon } from "@/types/pokemon";
import PokemonListClient from "./PokemonListClient";

// Server Component - runs at build time for static optimization
export default async function PokemonListServer() {
  // This runs at build time / request time on server
  const staticPokemon = await getStaticPokemonList(160);
  
  // Pass static data to client component
  return <PokemonListClient initialData={staticPokemon} />;
}

// Force static rendering with ISR
export const revalidate = 3600; // Revalidate every hour