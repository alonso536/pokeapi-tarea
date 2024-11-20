import { forkJoin, map, mergeMap, Observable } from 'rxjs';
import { Pokemon } from '../models/pokemon.interface';
import { PokemonService } from './pokemon.service';

export class PokemonLogicService {

  constructor(
    private pokemonService: PokemonService,
  ) {}

  getPokemons(offset: number): Observable<Pokemon[]> {
    return this.pokemonService
      .getPokemons(offset).pipe(
        mergeMap((response) => {
          const ids = response!.results.map((r) => {
            const fragments = r.url.split('/')
            return +fragments[fragments.length - 2];
          });
          return forkJoin(ids?.map((id) => this.pokemonService.getPokemonByTerm(id.toString())))
        }),
        map((response) => {
          return response.map((p) => {
            return { 
              name: p?.name,
              num: p?.id,
              image: p?.sprites.other?.['official-artwork'].front_default,
            };
          });
        }),
      );
  }

  getPokemonByTerm(term: string): Observable<Pokemon[]> {
    return this.pokemonService.getPokemonByTerm(term)
      .pipe(
        map((response) => {
          if(!response) {
            return [];
          }

          return [{     
            name: response.name,
            num: response.id,
            image: response.sprites.other?.['official-artwork'].front_default,
          }];
        }),
      );
  }
}