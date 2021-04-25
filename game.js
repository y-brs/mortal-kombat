import { player1, player2, enemyAttack, playerAttack } from "./players.js";
import { generateLogs, showResult } from "./logs.js";
import { createElement } from "./utils.js";

const $arenas = document.querySelector(".arenas");
const $fightForm = document.querySelector(".control");

const createPlayer = (playerObj) => {
	const $player = createElement("div", "player" + playerObj.player);
	const $progressbar = createElement("div", "progressbar");
	const $character = createElement("div", "character");
	const $life = createElement("div", "life");
	const $name = createElement("div", "name");
	const $img = createElement("img");

	$life.style.width = playerObj.hp + "%";
	$name.innerText = playerObj.name;
	$img.src = playerObj.img;

	$player.appendChild($progressbar);
	$player.appendChild($character);
	$progressbar.appendChild($life);
	$progressbar.appendChild($name);
	$character.appendChild($img);

	return $player;
};

$fightForm.addEventListener("submit", function(e) {
	e.preventDefault();
	const enemy = enemyAttack();
	const player = playerAttack();

	if (player.defence !== enemy.hit) {
		player1.changeHP(enemy.value);
		player1.renderHP();
		generateLogs("hit", player2, player1, enemy.value);
	} else {
		generateLogs("defence", player2, player1);
	}

	if (enemy.defence !== player.hit) {
		player2.changeHP(player.value);
		player2.renderHP();
		generateLogs("hit", player1, player2, player.value);
	} else {
		generateLogs("defence", player1, player2);
	}

	showResult();
});

function init() {
	$arenas.appendChild(createPlayer(player1));
	$arenas.appendChild(createPlayer(player2));

	generateLogs("start", player1, player2);
};

init();