import { Pokemon, BasePokemon } from "../types/pokemon";

interface PokemonCardProps {
  pokemon: Pokemon | BasePokemon;
  onClick?: (pokemonName: string) => void;
}

export default function PokemonCard({ pokemon, onClick }: PokemonCardProps) {
  const handleClick = () => {
    if (onClick) {
      onClick(pokemon.name);
    }
  };

  // Function to get type-specific colors
  const getTypeColor = (type: string) => {
    const typeColors: { [key: string]: string } = {
      'Normal': 'bg-gray-400',
      'Fire': 'bg-red-500',
      'Water': 'bg-blue-500',
      'Electric': 'bg-yellow-400',
      'Grass': 'bg-green-500',
      'Ice': 'bg-blue-300',
      'Fighting': 'bg-red-700',
      'Poison': 'bg-purple-500',
      'Ground': 'bg-yellow-600',
      'Flying': 'bg-indigo-400',
      'Psychic': 'bg-pink-500',
      'Bug': 'bg-green-400',
      'Rock': 'bg-yellow-800',
      'Ghost': 'bg-purple-700',
      'Dragon': 'bg-indigo-700',
      'Dark': 'bg-gray-800',
      'Steel': 'bg-gray-500',
      'Fairy': 'bg-pink-300'
    };
    return typeColors[type] || 'bg-gray-400';
  };

  return (
    <div 
      className="bg-white border border-gray-300 p-4 rounded-lg cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
      onClick={handleClick}
    >
      <div className="text-center">
        
        {/* Pokemon Image */}
        <div className="mb-3">
          <img 
            src={pokemon.image} 
            alt={pokemon.name} 
            className="mx-auto object-contain w-24 h-24"
          />
        </div>
        
        {/* Pokemon Number */}
        <div className="text-sm text-gray-600 mb-1">
          #{pokemon.number}
        </div>
        
        {/* Pokemon Name */}
        <h3 className="font-bold text-sm text-gray-900 mb-3">
          {pokemon.name} ({pokemon.classification})
        </h3>
        
        {/* Type Badges */}
        {'types' in pokemon && pokemon.types && pokemon.types.length > 0 && (
          <div className="flex flex-wrap gap-1 justify-center">
            {pokemon.types.map((type, index) => (
              <span 
                key={index}
                className={`px-2 py-0 rounded-full text-white text-xs font-normal ${getTypeColor(type)}`}
              >
                {type}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}