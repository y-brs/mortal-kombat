import { HIT, ATTACK } from "./logs.js";
import { getRandom } from "./utils.js";

const $fightForm = document.querySelector(".control");

export const player1 = {
	player: 1,
	name: "SCORPION",
	hp: "100",
	img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
	elHP,
	changeHP,
	renderHP
};

export const player2 = {
	player: 2,
	name: "SONYA",
	hp: "100",
	img: "http://reactmarathon-api.herokuapp.com/assets/sonya.gif",
	elHP,
	changeHP,
	renderHP
};

export function changeHP(num) {
	this.hp -= num;

	if (this.hp <= 0) {
		this.hp = 0;
	}
};

export function elHP() {
	return document.querySelector(`.player${this.player} .life`);
};

export function renderHP() {
	this.elHP().style.width = this.hp + "%";
};

export const enemyAttack = () => {
	const hit = ATTACK[getRandom(3) - 1];
	const defence = ATTACK[getRandom(3) - 1];

	return {
		value: getRandom(HIT[hit]),
		hit,
		defence
	}
};

export const playerAttack = () => {
	const attack = {};

	for (let item of $fightForm) {
		if (item.checked && item.name === "hit") {
			attack.value = getRandom(HIT[item.value]);
			attack.hit = item.value;
		}

		if (item.checked && item.name === "defence") {
			attack.defence = item.value;
		}

		item.checked = false;
	}

	return attack;
};