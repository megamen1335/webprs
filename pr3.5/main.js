import { $getElById } from './utils.js';
import { Pokemon } from './pokemon.js';
import { initGame } from './game.js';

const character = new Pokemon({ name: 'Pikachu', suffix: 'character' });
const enemy = new Pokemon({ name: 'Charmander', suffix: 'enemy' });

const attackButtons = [
    { el: $getElById('btn-kick'),   name: 'Thunder Jolt', maxDamage: 20, maxClicks: 8 },
    { el: $getElById('btn-strong'), name: 'Thunderbolt',  maxDamage: 40, maxClicks: 7 }
];

initGame({ character, enemy, attackButtons });
