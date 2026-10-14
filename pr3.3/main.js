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
            const { damageHP } = this;
            this.damageHP = Math.max(0, damageHP - count);
            this.renderHP();
        },

        renderHP() {
            this.renderHPLife();
            this.renderProgressbarHP();
        },

        renderHPLife() {
            const { elHP, damageHP, defaultHP } = this;
            elHP.innerText = `${damageHP} / ${defaultHP}`;
        },

        renderProgressbarHP() {
            const { elProgressbar, damageHP, defaultHP } = this;
            const percent = (damageHP / defaultHP) * 100;
            elProgressbar.style.width = `${percent}%`;
            elProgressbar.classList.remove('low', 'critical');
            if (percent <= 20) {
                elProgressbar.classList.add('critical');
            } else if (percent <= 50) {
                elProgressbar.classList.add('low');
            }
        },

        reset() {
            const { defaultHP } = this;
            this.damageHP = defaultHP;
            this.renderHP();
        }
    };
}

const character = createFighter('Pikachu', 'character');
const enemy = createFighter('Charmander', 'enemy');

const [btnKick, btnStrong] = [$getElById('btn-kick'), $getElById('btn-strong')];
const $logs = $getElById('logs');

const setButtonsDisabled = disabled =>
    [btnKick, btnStrong].forEach(btn => (btn.disabled = disabled));


function generateLog({ name: attackerName }, { name: victimName, damageHP, defaultHP }, damage) {
    const text = logs[random(logs.length) - 1]
        .replace('[ПЕРСОНАЖ №1]', victimName)
        .replace('[ПЕРСОНАЖ №2]', attackerName);
    return `${text} −${damage} [${damageHP}/${defaultHP}]`;
}

function addLog(text) {
    const $p = document.createElement('p');
    $p.innerText = text;
    $logs.insertBefore($p, $logs.children[0]);
}


function hit(attacker, victim, maxDamage) {
    const damage = random(maxDamage);
    victim.changeHP(damage);
    addLog(generateLog(attacker, victim, damage));
}

function fight(maxDamage) {
    hit(enemy, character, maxDamage);
    hit(character, enemy, maxDamage);

    if (character.damageHP === 0 || enemy.damageHP === 0) {
        setButtonsDisabled(true);
        showResult();
    }
}

function showResult() {
    const { damageHP: charHP, name: charName } = character;
    const { damageHP: enemyHP, name: enemyName } = enemy;

    let text;
    if (charHP === 0 && enemyHP === 0) {
        text = 'Нічия!';
    } else if (enemyHP === 0) {
        text = `${charName} переміг!`;
    } else {
        text = `${enemyName} переміг!`;
    }
    addLog(`🏁 ${text}`);
    setTimeout(() => alert(text), 50);
}

const attackHandler = maxDamage => () => fight(maxDamage);

function resetGame() {
    character.reset();
    enemy.reset();
    $logs.innerHTML = '';
    setButtonsDisabled(false);
}

function init() {
    btnKick.addEventListener('click', attackHandler(20));
    btnStrong.addEventListener('click', attackHandler(40));
    document.querySelector('.logo').addEventListener('click', resetGame);
    character.renderHP();
    enemy.renderHP();
}

init();
