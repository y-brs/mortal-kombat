const $arenas = document.querySelector(".arenas"),
	$fightForm = document.querySelector(".control");

const player1 = {
	player: 1,
	name: "SCORPION",
	hp: "100",
	img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
	weapon: ["gun", "stone"],
<<<<<<< Updated upstream
	attack: function() {
		console.log (player1.name + "Fight...");
	}
=======
	elHP,
	changeHP,
	renderHP
>>>>>>> Stashed changes
};

const player2 = {
	player: 2,
	name: "SONYA",
	hp: "100",
	img: "http://reactmarathon-api.herokuapp.com/assets/sonya.gif",
	weapon: ["gun", "stone"],
<<<<<<< Updated upstream
	attack: function() {
		console.log (player2.name + "Fight...");
	}
=======
	elHP,
	changeHP,
	renderHP
>>>>>>> Stashed changes
};

const HIT = {
	head: 30,
	body: 25,
	foot: 20
};

const ATTACK = ["head", "body", "foot"];

function createElement(tag, className) {
	const $tag = document.createElement(tag);

	if (className) {
		$tag.classList.add(className);
	}

	return $tag;
};

function createPlayer(playerObj) {
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

function changeHP(player) {
	const $playerLife = document.querySelector(".player" + player.player + " .life");

	player.hp -= randomDamage();

<<<<<<< Updated upstream
	if (player.hp <= 0) {
		player.hp = 0;
		$randomButton.disabled = true;
=======
function showResultText(name) {
	const $showResult = createElement("div", "loseTitle");

	if (name) {
		$showResult.innerText = name + " wins";
	} else {
		$showResult.innerText = "draw";
>>>>>>> Stashed changes
	}

	$playerLife.style.width = player.hp + '%';
};

function playerFight(firstPlayer, secondPlayer) {
	if (firstPlayer.hp === 0 && secondPlayer.hp === 0) {
		$arenas.appendChild(playerDraw());
	} else if (firstPlayer.hp === 0) {
		$arenas.appendChild(playerWin(secondPlayer.name));
	} else if (secondPlayer.hp === 0) {
		$arenas.appendChild(playerWin(firstPlayer.name));
	}
}

function playerDraw() {
	const $drawTitle = createElement('div', 'loseTitle');
	$drawTitle.innerText = 'draw';

<<<<<<< Updated upstream
	return $drawTitle;
}

function playerWin(name) {
	const $winTitle = createElement('div', 'loseTitle');
	$winTitle.innerText = name + ' wins';

	return $winTitle;
}

function playerLose(name) {
	const $loseTitle = createElement("div", "loseTitle");
	$loseTitle.innerText = name + " lose";

	return $loseTitle;
};

function randomDamage() {
	return Math.ceil(Math.random() * 20);
}

$randomButton.addEventListener("click", function() {
	changeHP(player1);
	changeHP(player2);

	playerFight(player1, player2);
=======
function createReloadButton() {
	const $reloadButtonDiv = createElement("div", "reloadWrap");
	const $reloadButton = createElement("button", "button");

	$reloadButton.innerText = "reload";

	$reloadButton.addEventListener("click", function() {
		window.location.reload();
	});

	$reloadButtonDiv.appendChild($reloadButton);
	$arenas.appendChild($reloadButtonDiv);
};

function enemyAttack() {
	const hit = ATTACK[getRandom(3) - 1];
	const defence = ATTACK[getRandom(3) - 1];

	return {
		value: getRandom(HIT[hit]),
		hit,
		defence
	}
};

$fightForm.addEventListener("submit", function(e) {
	e.preventDefault();
	const enemy = enemyAttack();
	const attack = {};

	for (let item of $fightForm) {
		if (item.checked && item.name === "hit") {
			attack.value = getRandom(HIT[item.value])
			attack.hit = item.value;
		}

		if (item.checked && item.name === "defence") {
			attack.defence = item.value;
		}

		item.checked = false;
	}

	player1.changeHP(enemy.value);
	player1.renderHP();

	player2.changeHP(attack.value);
	player2.renderHP();

	if (player1.hp === 0 || player2.hp === 0) {
		$fightForm.style.visibility = "hidden";
		createReloadButton();
	}

	if (player1.hp === 0 && player1.hp < player2.hp) {
		$arenas.appendChild(showResultText(player2.name));
	} else if (player2.hp === 0 && player2.hp < player1.hp) {
		$arenas.appendChild(showResultText(player1.name));
	} else if (player1.hp === 0 && player2.hp === 0) {
		$arenas.appendChild(showResultText());
	}
>>>>>>> Stashed changes
});

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));