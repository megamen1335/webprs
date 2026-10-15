import { $getElById } from './utils.js';

export class Pokemon {
    constructor({ name, suffix, defaultHP = 100 }) {
        this.name = name;
        this.defaultHP = defaultHP;
        this.damageHP = defaultHP;
        this.elHP = $getElById(`health-${suffix}`);
        this.elProgressbar = $getElById(`progressbar-${suffix}`);
    }

    get isDead() {
        return this.damageHP === 0;
    }

    changeHP(count) {
        const { damageHP } = this;
        this.damageHP = Math.max(0, damageHP - count);
        this.renderHP();
    }

    renderHP() {
        this.renderHPLife();
        this.renderProgressbarHP();
    }

    renderHPLife() {
        const { elHP, damageHP, defaultHP } = this;
        elHP.innerText = `${damageHP} / ${defaultHP}`;
    }

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
    }

    reset() {
        const { defaultHP } = this;
        this.damageHP = defaultHP;
        this.renderHP();
    }
}
