const $arenas = document.querySelector(".arenas");
const $randomButton = document.querySelector(".button");

const player1 = {
	player: 1,
	name: "SCORPION",
	hp: "100",
	img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
	weapon: ["gun", "stone"],
	attack: function() {
		console.log (player1.name + "Fight...");
	}
};

const player2 = {
	player: 2,
	name: "SONYA",
	hp: "100",
	img: "http://reactmarathon-api.herokuapp.com/assets/sonya.gif",
	weapon: ["gun", "stone"],
	attack: function() {
		console.log (player2.name + "Fight...");
	}
};

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

	if (player.hp <= 0) {
		player.hp = 0;
		$randomButton.disabled = true;
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
});

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));