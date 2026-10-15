import { $getElById, random } from './utils.js';
import { logs } from './logs.js';

const $logs = $getElById('logs');


export function generateLog({ name: attackerName }, { name: victimName, damageHP, defaultHP }, damage) {
    const text = logs[random(logs.length) - 1]
        .replace('[ПЕРСОНАЖ №1]', victimName)
        .replace('[ПЕРСОНАЖ №2]', attackerName);
    return `${text} −${damage} [${damageHP}/${defaultHP}]`;
}

export function addLog(text) {
    const $p = document.createElement('p');
    $p.innerText = text;
    $logs.insertBefore($p, $logs.children[0]);
}

export function clearLogs() {
    $logs.innerHTML = '';
}
