'use strict';

const $getElById = id => document.getElementById(id);

const random = max => Math.ceil(Math.random() * max);

function createFighter(name, suffix) {
    return {
        name,
        defaultHP: 100,
        damageHP: 100,
        elHP: $getElById(`health-${suffix}`),
        elProgressbar: $getElById(`progressbar-${suffix}`),

        
        changeHP(count) {
            this.damageHP = Math.max(0, this.damageHP - count);
            this.renderHP();
        },

        renderHP() {
            this.renderHPLife();
            this.renderProgressbarHP();
        },

        
        renderHPLife() {
            this.elHP.innerText = `${this.damageHP} / ${this.defaultHP}`;
        },

        
        renderProgressbarHP() {
            const percent = (this.damageHP / this.defaultHP) * 100;
            this.elProgressbar.style.width = `${percent}%`;
            this.elProgressbar.classList.remove('low', 'critical');
            if (percent <= 20) {
                this.elProgressbar.classList.add('critical');
            } else if (percent <= 50) {
                this.elProgressbar.classList.add('low');
            }
        },

        reset() {
            this.damageHP = this.defaultHP;
            this.renderHP();
        }
    };
}

const character = createFighter('Pikachu', 'character');
const enemy = createFighter('Charmander', 'enemy');

const buttons = [$getElById('btn-kick'), $getElById('btn-strong')];


function setButtonsDisabled(disabled) {
    buttons.forEach(btn => (btn.disabled = disabled));
}


function fight(maxDamage) {
    character.changeHP(random(maxDamage));
    enemy.changeHP(random(maxDamage));

    if (character.damageHP === 0 || enemy.damageHP === 0) {
        setButtonsDisabled(true);
        showResult();
    }
}

function showResult() {
    let text;
    if (character.damageHP === 0 && enemy.damageHP === 0) {
        text = 'Нічия!';
    } else if (enemy.damageHP === 0) {
        text = `${character.name} переміг!`;
    } else {
        text = `${enemy.name} переміг!`;
    }
    
    setTimeout(() => alert(text), 50);
}


const attackHandler = maxDamage => () => fight(maxDamage);

function resetGame() {
    character.reset();
    enemy.reset();
    setButtonsDisabled(false);
}


function init() {
    $getElById('btn-kick').addEventListener('click', attackHandler(20));   
    $getElById('btn-strong').addEventListener('click', attackHandler(40)); 
    document.querySelector('.logo').addEventListener('click', resetGame);
    character.renderHP();
    enemy.renderHP();
}

init();
