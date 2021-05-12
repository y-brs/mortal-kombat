import { generateLogs, showResult } from "./logs.js";
import { getRandom } from "./utils.js";
import Player from "./playerClass.js";

export const $arenas = document.querySelector(".arenas");
export const $chat = document.querySelector(".chat");
export const $fightForm = document.querySelector(".control");

export let player1;
export let player2;

class Game {
	getPlayerEnemy = async () => {
		const body = fetch("https://reactmarathon-api.herokuapp.com/api/mk/player/choose").then(res => res.json());
		return body;
	};

	start = async () => {
		const playerEnemy = await this.getPlayerEnemy();
		const playerFirst = JSON.parse(localStorage.getItem("player1"));

		player1 = new Player({
			...playerFirst,
			player: 1,
			rootSelector: "arenas",
		});

		player2 = new Player({
			...playerEnemy,
			player: 2,
			rootSelector: "arenas",
		});

		player1.createPlayer();
		player2.createPlayer();

		$arenas.classList.add(`arena${getRandom(5)}`);

		generateLogs("start", player1, player2);

		$fightForm.addEventListener("submit", async function (e) {
			e.preventDefault();

			const attacks = await playerAttack();

			const {hit: hitEnemy, defence: defenceEnemy, value: valueEnemy} = attacks.player1;
			const {hit, defence, value} = attacks.player2;

			if (defence !== hitEnemy) {
				player1.changeHP(valueEnemy);
				player1.renderHP();
				generateLogs("hit", player2, player1, valueEnemy);
			} else {
				generateLogs("defence", player2, player1);
			}

			if (defenceEnemy !== hit) {
				player2.changeHP(value);
				player2.renderHP();
				generateLogs("hit", player1, player2, value);
			} else {
				generateLogs("defence", player1, player2);
			}

			showResult();

		});

		const playerAttack = async () => {
			const attack = {};

			for (let item of $fightForm) {
				if (item.checked && item.name === "hit") {
					attack.hit = item.value;
				}

				if (item.checked && item.name === "defence") {
					attack.defence = item.value;
				}

				item.checked = false;
			};

			const getHits = async () => {
				const answer = fetch("https://reactmarathon-api.herokuapp.com/api/mk/player/fight", {
					method: "POST",
					body: JSON.stringify(attack)
				}).then(res => res.json());
				return answer;
			};

			return await getHits();
		};

	};
};

export default Game;