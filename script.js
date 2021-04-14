const $arenas = document.querySelector(".arenas");
const $randomButton = document.querySelector(".button");

const player1 = {
	player: 1,
	name: "SCORPION",
	hp: "100",
	img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
	weapon: ["gun", "stone"],
	attack: function(name) {
		console.log (name + "Fight...");
	},
	elHP: elHP,
	changeHP: changeHP,
	renderHP: renderHP
};

const player2 = {
	player: 2,
	name: "SONYA",
	hp: "100",
	img: "http://reactmarathon-api.herokuapp.com/assets/sonya.gif",
	weapon: ["gun", "stone"],
	attack: function(name) {
		console.log (name + "Fight...");
	},
	elHP: elHP,
	changeHP: changeHP,
	renderHP: renderHP
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

function changeHP(num) {
	this.hp -= num;

	if (this.hp <= 0) {
		this.hp = 0;
	}
};

function elHP() {
	const playerLife = document.querySelector(".player" + this.player + " .life");

	return playerLife;
}

function renderHP() {
	this.elHP().style.width = this.hp + "%";
}

function showResultText(name) {
	const $showResult = createElement('div', 'loseTitle');

	if (name) {
		$showResult.innerText = name + ' wins';
	} else {
		$showResult.innerText = 'draw';
	}

	return $showResult;
};

function getRandom(num) {
	return Math.ceil(Math.random() * num);
};

function createReloadButton() {
	const $restart = createElement("div", "reloadWrap");
	const $restartButton = createElement("button", "button");

	$restartButton.innerText = "Restart";

	$restartButton.onclick = function() {
		window.location.reload();
	};

	$restart.appendChild($restartButton);

	return $restart;
};



$randomButton.addEventListener("click", function() {
	player1.changeHP(getRandom(20));
	player1.renderHP();

	player2.changeHP(getRandom(20));
	player2.renderHP();

	if (player1.hp === 0 || player2.hp === 0) {
		// $randomButton.disabled = true;
		$randomButton.style.visibility = "hidden";

		$arenas.appendChild(createReloadButton());
	}

	if (player1.hp === 0 && player1.hp < player2.hp) {
		$arenas.appendChild(showResultText(player2.name));
	} else if (player2.hp === 0 && player2.hp < player1.hp) {
		$arenas.appendChild(showResultText(player1.name));
	} else if (player1.hp === 0 && player2.hp === 0) {
		$arenas.appendChild(showResultText());
	}
});

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));