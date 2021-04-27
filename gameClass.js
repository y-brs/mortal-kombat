import { player1, player2, enemyAttack, playerAttack } from "./players.js";
import { generateLogs, showResult } from "./logs.js";

const $fightForm = document.querySelector(".control");

class Game {
	start = () => {
		$fightForm.addEventListener("submit", function(e) {
			e.preventDefault();
			const {hit: hitEnemy, defence: defenceEnemy, value: valueEnemy} = enemyAttack();
			const {hit, defence, value} = playerAttack();

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

		player1.createPlayer();
		player2.createPlayer();

		generateLogs("start", this.player1, this.player2);
	};
};

export default Game;