import { PokemonEvolution } from "../types/pokemon";

interface EvolutionCardProps {
  evolution: PokemonEvolution;
  onClick?: (evolutionId: string) => void;
}

export default function EvolutionCard({ evolution, onClick }: EvolutionCardProps) {
  const handleClick = () => {
    if (onClick) {
      onClick(evolution.name);
    }
  };

  return (
    <div 
      className="border border-gray-400 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
      onClick={handleClick}
    >
      <div className="text-center">
        <span className="text-sm text-gray-500">#{evolution.number}</span>
        <h4 className="font-bold text-lg text-gray-800">{evolution.name}</h4>
        <img 
          src={evolution.image} 
          alt={evolution.name} 
          className="mx-auto mt-2 mb-3 max-w-full h-auto hover:scale-110  transition-transform duration-500"
           
        />
        {evolution.classification && (
          <p className="text-sm text-gray-600 mb-2">{evolution.classification}</p>
        )}
        {evolution.types && evolution.types.length > 0 && (
          <div className="flex flex-wrap gap-1 justify-center">
            {evolution.types.map((type, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
              >
                {type}
              </span>
            ))}
          </div>
        )}
        {evolution.maxCP && (
          <p className="text-sm text-green-600 mt-2">Max CP: {evolution.maxCP}</p>
        )}
      </div>
    </div>
  );
}