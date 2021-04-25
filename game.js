import { player1, player2, enemyAttack, playerAttack } from "./players.js";
import { generateLogs, showResult } from "./logs.js";
import { createElement } from "./utils.js";

const $arenas = document.querySelector(".arenas");
const $fightForm = document.querySelector(".control");

const createPlayer = ({player, hp, name, img}) => {
	const $player = createElement("div", `player${player}`);
	const $progressbar = createElement("div", "progressbar");
	const $character = createElement("div", "character");
	const $life = createElement("div", "life");
	const $name = createElement("div", "name");
	const $img = createElement("img");

	$life.style.width = hp + "%";
	$name.innerText = name;
	$img.src = img;

	$player.appendChild($progressbar);
	$player.appendChild($character);
	$progressbar.appendChild($life);
	$progressbar.appendChild($name);
	$character.appendChild($img);

	return $player;
};

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

function init() {
	$arenas.appendChild(createPlayer(player1));
	$arenas.appendChild(createPlayer(player2));

	generateLogs("start", player1, player2);
};

init();