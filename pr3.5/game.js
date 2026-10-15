import { random } from './utils.js';
import { createClickCounter } from './clickCounter.js';
import { generateLog, addLog, clearLogs } from './logger.js';


function hit(attacker, victim, maxDamage) {
    const damage = random(maxDamage);
    victim.changeHP(damage);
    addLog(generateLog(attacker, victim, damage));
}

function showResult(character, enemy) {
    const { name: charName } = character;
    const { name: enemyName } = enemy;

    let text;
    if (character.isDead && enemy.isDead) {
        text = 'Нічия!';
    } else if (enemy.isDead) {
        text = `${charName} переміг!`;
    } else {
        text = `${enemyName} переміг!`;
    }
    addLog(`🏁 ${text}`);
    setTimeout(() => alert(text), 50);
}

export function initGame({ character, enemy, attackButtons }) {
    const counters = [];

    const setButtonsDisabled = disabled =>
        attackButtons.forEach(({ el }) => (el.disabled = disabled));

    
    function fight(maxDamage) {
        hit(enemy, character, maxDamage);
        hit(character, enemy, maxDamage);

        const isOver = character.isDead || enemy.isDead;
        if (isOver) {
            setButtonsDisabled(true);
            showResult(character, enemy);
        }
        return isOver;
    }

    
    function setupAttackButton({ el, name, maxDamage, maxClicks }) {
        const counter = createClickCounter(name, maxClicks);
        counters.push(counter);

        el.addEventListener('click', () => {
            if (!counter.click()) return;

            const isOver = fight(maxDamage);

            if (counter.left() === 0) el.disabled = true;

            
            if (!isOver && counters.every(c => c.left() === 0)) {
                addLog('⏹ Натискання закінчились, бій без переможця.');
            }
        });
    }

    function resetGame() {
        character.reset();
        enemy.reset();
        counters.forEach(c => c.reset());
        clearLogs();
        setButtonsDisabled(false);
        console.clear();
    }

    attackButtons.forEach(setupAttackButton);
    document.querySelector('.logo').addEventListener('click', resetGame);
    character.renderHP();
    enemy.renderHP();
}
