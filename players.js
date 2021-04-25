import { HIT, ATTACK } from "./constants.js";
import { getRandom } from "./utils.js";
import Player from "./playerClass.js";

const $fightForm = document.querySelector(".control");

export const player1 = new Player ({
	player: 1,
	name: "SCORPION",
	hp: "100",
	img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
	rootSelector: "arenas"
});

export const player2 = new Player ({
	player: 2,
	name: "SONYA",
	hp: "100",
	img: "http://reactmarathon-api.herokuapp.com/assets/sonya.gif",
	rootSelector: "arenas"
});

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