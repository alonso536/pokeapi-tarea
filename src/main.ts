import './style.css';
import { pokemonCardComponent } from './components/pokemon-card.component';
import { Pokemon } from './models/pokemon.interface';
import { HttpService } from './services/axios.service';
import { PokemonService } from './services/pokemon.service';
import { PokemonLogicService } from './services/pokemon-logic.service';

const section = document.querySelector<HTMLElement>('#app');
const pageButton = document.querySelector<HTMLElement>('#page');
const previous = document.querySelector<HTMLElement>('#previous');
const next = document.querySelector<HTMLElement>('#next');
const form = document.querySelector<HTMLFormElement>('#form');
const input = document.querySelector<HTMLInputElement>('#search');
const reset = document.querySelector<HTMLElement>('#reset');

const http = new HttpService();
const pokemonService = new PokemonService(http);
const pokemonLogicService = new PokemonLogicService(pokemonService);

let page: number = 1;

const getPokemons = (page: number) => {
  const offset = (page - 1) * 6;
  pokemonLogicService.getPokemons(offset)
    .subscribe((pokemons: Pokemon[]) => {
      let content = '';
      pokemons.forEach((p) => {
        content += pokemonCardComponent(p);
      });
    
      section!.innerHTML = content;
    });
}

const changePage = (page: number) => {
  pageButton!.innerHTML = `${page}`;
}

getPokemons(page);

previous?.addEventListener('click', () => {
  if(page === 1) {
    return;
  }

  page -= 1;
  changePage(page);
  getPokemons(page);
});

next?.addEventListener('click', () => {
  page += 1;
  changePage(page);
  getPokemons(page);
});

reset?.addEventListener('click', () => {
  page = 1;
  changePage(page);
  getPokemons(page);
});

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const term = input?.value || '';
  pokemonLogicService.getPokemonByTerm(term)
    .subscribe((pokemons: Pokemon[]) => {
      if(pokemons.length === 0) {
        section!.innerHTML = '<h3 class="my-3">No records available</h3>';
        return;
      }

      let content = '';
      pokemons.forEach((p) => {
        content += pokemonCardComponent(p);
      });
    
      section!.innerHTML = content;
    });
});


