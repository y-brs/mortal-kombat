import { player1, player2 } from "./players.js";
import { getRandom, createElement, getTime } from "./utils.js";
import { LOGS } from "./constants.js";

const $arenas = document.querySelector(".arenas");
const $chat = document.querySelector(".chat");
const $fightForm = document.querySelector(".control");

export const showResultText = (name) => {
	const $showResult = createElement("div", "loseTitle");

	if (name) {
		$showResult.innerText = name + " wins";
	} else {
		$showResult.innerText = "draw";
	}

	return $showResult;
};

export const showResult = () => {
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

export const getTextLog = (type, playerName1, playerName2) => {
	switch (type) {
		case "start":
			return LOGS[type]
				.replace("[player1]", playerName1)
				.replace("[player2]", playerName2)
				.replace("[time]", getTime());
			break;

		case "hit":
			return LOGS[type][getRandom(LOGS[type].length - 1) - 1]
				.replace("[playerKick]", playerName1)
				.replace("[playerDefence]", playerName2);
			break;

		case "defence":
			return LOGS[type][getRandom(LOGS[type].length - 1) - 1]
				.replace("[playerKick]", playerName1)
				.replace("[playerDefence]", playerName2);
			break;

		case "end":
			return LOGS[type][getRandom(LOGS[type].length - 1) - 1]
				.replace("[playerWins]", playerName1)
				.replace("[playerLose]", playerName2);
			break;

		case "draw":
			return LOGS[type];
			break;
	}
};

export const generateLogs = (type, {name} = {}, {name: playerName2, hp} = {}, valueAttack) => {
	let text = getTextLog(type, name, playerName2);

	switch (type) {
		case "hit":
			text = `${getTime()} ${text} -${valueAttack} [${hp}/100]`;
			break;

		case "defence":
		case "end":
		case "draw":
			text = `${getTime()} ${text}`;
			break;
	};

	const el = `<p>${text}</p>`;
	$chat.insertAdjacentHTML("afterbegin", el);
};

export const createReloadButton = () => {
	const $reloadButtonDiv = createElement("div", "reloadWrap");
	const $reloadButton = createElement("button", "button");
	$reloadButton.innerText = "reload";

	$reloadButton.addEventListener("click", function() {
		window.location.reload();
	});

	$reloadButtonDiv.appendChild($reloadButton);
	$arenas.appendChild($reloadButtonDiv);
};