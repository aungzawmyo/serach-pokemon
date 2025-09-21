import PokemonList from "@/components/PokemonList"; 
import { getStaticPokemonList } from "@/lib/staticPokemonData";
import { Pokemon } from "@/types/pokemon";

 export default async function Home() {
  // Pre-fetch Pokemon data at build time for static optimization.
  let staticPokemonData: Pokemon[] = [];
  
  try {
    staticPokemonData = await getStaticPokemonList(160);
  } catch (error) {
    console.error("Failed to load static Pokemon data:", error);
  }
   
  return (
    <div className="min-h-screen bg-gray-100">
      
      <div className="font-sans flex flex-col min-h-screen p-8 pb-20 gap-16 sm:p-10 items-center justify-between">
        <main className="flex flex-col gap-[10px] flex-1 items-center sm:items-start w-full">
          <div className="w-full">
             
            <PokemonList staticData={staticPokemonData} />
          </div>
        </main>
        
      </div>
      
    </div>
    
  );
}

// Enable Incremental Static Regeneration
export const revalidate = 3600; // Revalidate every hour
