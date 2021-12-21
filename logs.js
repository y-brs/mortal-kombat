import { player1, player2, $arenas, $chat, $fightForm } from "./gameClass.js";
import { getRandom, createElement, getTime } from "./utils.js";

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
      text = `${getTime()} ${text} –${valueAttack} [${hp}/100]`;
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

export const LOGS = {
  start: "Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.",
  end: [
    "Результат удара [playerWins]: [playerLose] — труп.",
    "[playerLose] погиб от удара бойца [playerWins].",
    "Результат боя: [playerLose] — жертва, [playerWins] — убийца.",
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
  draw: "Ничья — это тоже победа!"
};