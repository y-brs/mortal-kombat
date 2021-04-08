const player1 = {
	name: "SCORPION",
	hp: "80",
	img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
	weapon: ['gun', 'stone'],
	attack: function() {
		console.log (player1.name + 'Fight...');
	}
};

const player2 = {
	name: "SONYA",
	hp: "65",
	img: "http://reactmarathon-api.herokuapp.com/assets/sonya.gif",
	weapon: ['gun', 'stone'],
	attack: function() {
		console.log (player2.name + 'Fight...');
	}
};

function createPlayer(player, person) {
	const $player = document.createElement('div');
	$player.classList.add(`${player}`);

	const $progressbar = document.createElement('div');
	$progressbar.classList.add('progressbar');
	$player.appendChild($progressbar);

	const $character = document.createElement('div');
	$character.classList.add('character');
	$player.appendChild($character);

	const $life = document.createElement('div');
	$life.classList.add('life');
	$life.style.width = person.hp + "%";
	$progressbar.appendChild($life);

	const $name = document.createElement('div');
	$name.classList.add('name');
	$name.innerText = person.name;
	$progressbar.appendChild($name);

	const $img = document.createElement('img');
	$img.src = person.img;
	$character.appendChild($img);

	const $arenas = document.querySelector('.arenas');
	$arenas.appendChild($player);
};

createPlayer('player1', player1);
createPlayer('player2', player2);