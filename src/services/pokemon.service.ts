import { from, Observable } from 'rxjs';
import { HttpService } from './axios.service';
import { PokemonResponse, PokemonSingleResponse } from '../models/pokemon.interface';

export class PokemonService {
  
  constructor(
    private http: HttpService,
  ) {}

  getPokemons(offset: number = 0, limit: number = 6): Observable<PokemonResponse | null> {
    const data = this.http.get<PokemonResponse>(`pokemon?limit=${limit}&offset=${offset}`)
    return from(data);
  }

  getPokemonByTerm(term: string): Observable<PokemonSingleResponse | null> {
    const data = this.http.get<PokemonSingleResponse>(`pokemon/${term}`);
    return from(data);
  }
}