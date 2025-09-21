export interface Weight {
  minimum: string;
  maximum: string;
}

export interface Height {
  minimum: string;
  maximum: string;
}

export interface Attack {
  name: string;
  type: string;
  damage: number;
}

export interface Attacks {
  fast: Attack[];
  special: Attack[];
}

// Base Pokemon interface
export interface BasePokemon {
  id: string;
  number: string;
  name: string;
  image: string;
  classification?: string;
  types?: string[];
}

 
export interface PokemonEvolution {
  id: string;
  number: string;
  name: string;
  classification?: string;
  types?: string[];
  resistant?: string[];
  weaknesses?: string[];
  fleeRate?: number;
  maxCP?: number;
  maxHP?: number;
  image: string;
  evolutions?: PokemonEvolution[];
}

 
export interface Pokemon {
  id: string;
  number: string;
  name: string;
  image: string;
  weight?: Weight;
  height?: Height;
  classification?: string;
  types?: string[];
  resistant?: string[];
  weaknesses?: string[];
  fleeRate?: number;
  maxCP?: number;
  maxHP?: number;
  attacks?: Attacks;
  evolutions?: PokemonEvolution[];
}

 
export interface PokemonsData {
  pokemons: BasePokemon[];
}

export interface PokemonData {
  pokemon: Pokemon;
}

 
export interface PokemonSearchVariables {
  id?: string;
  name?: string;
}