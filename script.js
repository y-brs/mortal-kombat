const $arenas = document.querySelector(".arenas"),
	$fightForm = document.querySelector(".control"),
	$chat = document.querySelector(".chat");

const HIT = {
	head: 30,
	body: 25,
	foot: 20
};

const ATTACK = ["head", "body", "foot"];

const logs = {
	start: "Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.",
	end: [
		"Результат удара [playerWins]: [playerLose] - труп",
		"[playerLose] погиб от удара бойца [playerWins]",
		"Результат боя: [playerLose] - жертва, [playerWins] - убийца",
	],
	hit: [
		"[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.",
		"[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.",
		"[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.",
		"[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.",
		"[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.",
		"[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.",
		"[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.",
		"[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.",
		"[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.",
		"[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.",
		"[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.",
		"[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.",
		"[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.",
		"[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.",
		"[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.",
		"[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.",
		"[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.",
		"[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.",
	],
	defence: [
		"[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.",
		"[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.",
		"[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.",
		"[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.",
		"[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.",
		"[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.",
		"[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.",
		"[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение."
	],
	draw: "Ничья - это тоже победа!"
};

const player1 = {
	player: 1,
	name: "SCORPION",
	hp: "100",
	img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
	weapon: ["gun", "stone"],
	elHP,
	changeHP,
	renderHP
};

const player2 = {
	player: 2,
	name: "SONYA",
	hp: "100",
	img: "http://reactmarathon-api.herokuapp.com/assets/sonya.gif",
	weapon: ["gun", "stone"],
	elHP,
	changeHP,
	renderHP
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
	const $showResult = createElement("div", "loseTitle");

	if (name) {
		$showResult.innerText = name + " wins";
	} else {
		$showResult.innerText = "draw";
	}

	return $showResult;
};

function getRandom(num) {
	return Math.ceil(Math.random() * num);
};

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

function playerAttack() {
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

function showResult() {
	if (player1.hp === 0 || player2.hp === 0) {
		$fightForm.style.visibility = "hidden";
		createReloadButton();
	}

	if (player1.hp === 0 && player1.hp < player2.hp) {
		$arenas.appendChild(showResultText(player2.name));
		generateLogs("end", player2, player1);
	} else if (player2.hp === 0 && player2.hp < player1.hp) {
		$arenas.appendChild(showResultText(player1.name));
		generateLogs("end", player1, player2);
	} else if (player1.hp === 0 && player2.hp === 0) {
		$arenas.appendChild(showResultText());
		generateLogs("draw");
	}
};

function generateLogs(type, player1, player2, hpDamage, hpValue) {
	const date = new Date();
	const dateFormt = `${date.getHours()}:${date.getMinutes()}`;

	switch (type) {
		case "defence":
		case "hit":
			text = logs[type][getRandom(type.length)].replace("[playerKick]", player1.name).replace("[playerDefence]", player2.name);
			el = `<p>${dateFormt} – ${text} -${hpDamage} [${hpValue}/100]</p>`;
			break;

		case "start":
			text = logs[type].replace("[time]", dateFormt).replace("[player1]", player1.name).replace("[player2]", player2.name);
			el = `<p>${text}</p>`;
			break;

		case "end":
			text = logs[type][getRandom(type.length)].replace("[playerWins]", player1.name).replace("[playerLose]", player2.name);
			el = `<p>${text}</p>`;
			break;

		case "draw":
		default:
			text = logs[type];
			el = `<p>${text}</p>`;
			break;
	}

	$chat.insertAdjacentHTML("afterbegin", el);
};

$fightForm.addEventListener("submit", function(e) {
	e.preventDefault();

	const enemy = enemyAttack();
	const player = playerAttack();

	if (player.defence !== enemy.hit) {
		player1.changeHP(enemy.value);
		player1.renderHP();
		generateLogs("hit", player2, player1, enemy.value, player1.hp);
	}

	if (enemy.defence !== player.hit) {
		player2.changeHP(player.value);
		player2.renderHP();
		generateLogs("defence", player1, player2, player.value, player2.hp);
	}

	showResult();
});

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
generateLogs("start", player1, player2);