import { Pokemon } from '../models/pokemon.interface';

export const pokemonCardComponent = (pokemon: Pokemon) => {
  return `
    <article class="col-12 col-md-6 col-lg-4 g-2">
      <div class="card">
        <img src="${pokemon.image}" class="card-img-top" alt="${pokemon.name}">
        <div class="card-body">
          <h5 class="card-title">${pokemon.num} - ${pokemon.name}</h5>
        </div>
      </div>
    </article>
  `;
}