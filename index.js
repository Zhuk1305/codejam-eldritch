import difficulties from "./data/difficulties.js";
import ancients from "./data/ancients.js";
import playCardArray from "./data/mythicCards/index.js";

const legendCard = document.querySelector(".legend-card_block");
const levelList = document.querySelector(".level-list");
const mixedBtn = document.querySelector(".mixed-btn");
const readyCard = document.querySelector(".ready-card");
const currentCard = document.querySelector(".current-card");
const trackerFirstStage = document.querySelector(".first-stage");
const trackerSecondStage = document.querySelector(".second-stage");
const trackerThirdStage = document.querySelector(".third-stage");
const suitCard = document.querySelector(".suit-card");

let state = {
  legendCard: {},
  level: {},
  firstStage: {
    green: [],
    brown: [],
    blue: [],
  },
  secondStage: {
    green: [],
    brown: [],
    blue: [],
  },
  thirdStage: {
    green: [],
    brown: [],
    blue: [],
  },
};

function parseLevel(difficulties) {
  for (let i = 0; i < difficulties.length; i++) {
    const li = document.createElement("li");
    li.classList.add("level-list_item");
    li.id = difficulties[i].id;
    li.textContent = difficulties[i].name;
    levelList.appendChild(li);
  }
}
parseLevel(difficulties);

function addActiveClassForList(e) {
  const childrenList = [...e.currentTarget.children];
  childrenList.find((el) => el.id === e.target.id) &&
    deleteActiveClassForList(childrenList);
  e.target.classList.add("active");
}

function deleteActiveClassForList(childrenList) {
  for (let i = 0; i < childrenList.length; i++) {
    childrenList[i].classList.value.includes("active") &&
      childrenList[i].classList.remove("active");
  }
}

function setDisplayNone(el) {
  el.classList.add("none-display");
}
setDisplayNone(levelList);
setDisplayNone(mixedBtn);
setDisplayNone(readyCard);
setDisplayNone(currentCard);

function removeDisplayNone(el) {
  el.classList.remove("none-display");
}

function getLegendCard(e, ancients) {
  const legendCardId = e.target.id;
  return legendCardId
    ? ancients.find((ancient) => ancient.id === legendCardId)
    : state.legendCard;
}

function getLevel(e, difficulties) {
  const currentLevelId = e.target.id;
  return currentLevelId
    ? difficulties.find((diff) => diff.id === currentLevelId)
    : state.level;
}

function setTrackerValue(legendCard) {
  setTrackerStageValue(trackerFirstStage, legendCard.firstStage);
  setTrackerStageValue(trackerSecondStage, legendCard.secondStage);
  setTrackerStageValue(trackerThirdStage, legendCard.thirdStage);
}
function setTrackerStageValue(stage, stageCard) {
  stage.children[0].textContent = stageCard.green;
  stage.children[1].textContent = stageCard.brown;
  stage.children[2].textContent = stageCard.blue;
}

function getPlayCard(legendCard, level, playCardArray) {
  const { firstStage, secondStage, thirdStage } = legendCard;
  const numOfGreenCard =
    firstStage.green + secondStage.green + thirdStage.green;
  const numOfBrownCard =
    firstStage.brown + secondStage.brown + thirdStage.brown;
  const numOfBlueCard = firstStage.blue + secondStage.blue + thirdStage.blue;
  const arrNumOfColor = [numOfGreenCard, numOfBrownCard, numOfBlueCard];
  switch (level) {
    case "very-easy":
      return getPlayCardForVeryEasyLevel(playCardArray, arrNumOfColor);

    case "easy":
      return getPlayCardForEasyLevel(playCardArray, arrNumOfColor);

    case "normal":
      return getPlayCardForNormalLevel(playCardArray, arrNumOfColor);
    case "hard":
      // getPlayCardForLevel(level, playCardArray, arrNumOfColor);
      break;
    case "very-hard":
      // getPlayCardForLevel(level, playCardArray, arrNumOfColor);
      break;
    default:
      return;
  }
}

function getOnlyEasyCard(card) {
  const snowCard = [];
  card.map((item) => item.difficulty === "easy" && snowCard.push(item));
  return snowCard;
}

function getOnlyNormalCard(card) {
  const snowCard = [];
  card.map((item) => item.difficulty === "normal" && snowCard.push(item));
  return snowCard;
}

function getOnlyHardCard(card) {
  const snowCard = [];
  card.map((item) => item.difficulty === "hard" && snowCard.push(item));
  return snowCard;
}

function getPlayCardForVeryEasyLevel(playCardArray, arrNumOfColor) {
  const [numOfGreen, numOfBrown, numOfBlue] = arrNumOfColor;
  const [greenCard, brownCard, blueCard] = playCardArray;
  const onlySnowCardGreen = getOnlyEasyCard(greenCard);
  if (onlySnowCardGreen.length < numOfGreen) {
    const greenNormalCard = getOnlyNormalCard(greenCard);
    const getRandowGreenNormal = getCard(
      greenNormalCard,
      numOfGreen - onlySnowCardGreen.length
    );
    onlySnowCardGreen.splice(0, 0, ...getRandowGreenNormal);
  }

  const onlySnowCardBrown = getOnlyEasyCard(brownCard);
  if (onlySnowCardBrown.length < numOfBrown) {
    const brownNormalCard = getOnlyNormalCard(brownCard);
    const getRandowBrownNormal = getCard(
      brownNormalCard,
      numOfBrown - onlySnowCardBrown.length
    );
    onlySnowCardBrown.splice(0, 0, ...getRandowBrownNormal);
  }

  const onlySnowCardBlue = getOnlyEasyCard(blueCard);
  if (onlySnowCardBlue.length < numOfBlue) {
    const blueNormalCard = getOnlyNormalCard(blueCard);
    const getRandowBlueNormal = getCard(
      blueNormalCard,
      numOfBlue - onlySnowCardBlue.length
    );
    onlySnowCardBlue.splice(0, 0, ...getRandowBlueNormal);
  }

  return [
    getCard(onlySnowCardGreen, numOfGreen),
    getCard(onlySnowCardBrown, numOfBrown),
    getCard(onlySnowCardBlue, numOfBlue),
  ];
}

function getPlayCardForEasyLevel(playCardArray, arrNumOfColor) {
  const [numOfGreen, numOfBrown, numOfBlue] = arrNumOfColor;
  const [greenCard, brownCard, blueCard] = playCardArray;
  const onlySnowCardGreen = getOnlyEasyCard(greenCard);
  const greenNormalCard = getOnlyNormalCard(greenCard);

  const onlySnowCardBrown = getOnlyEasyCard(brownCard);
  const brownNormalCard = getOnlyNormalCard(brownCard);

  const onlySnowCardBlue = getOnlyEasyCard(blueCard);
  const blueNormalCard = getOnlyNormalCard(blueCard);

  return [
    getCard(onlySnowCardGreen.concat(greenNormalCard), numOfGreen),
    getCard(onlySnowCardBrown.concat(brownNormalCard), numOfBrown),
    getCard(onlySnowCardBlue.concat(blueNormalCard), numOfBlue),
  ];
}

function getPlayCardForNormalLevel(playCardArray, arrNumOfColor) {
  const [numOfGreen, numOfBrown, numOfBlue] = arrNumOfColor;
  const [greenCard, brownCard, blueCard] = playCardArray;
  return [
    getCard(greenCard, numOfGreen),
    getCard(brownCard, numOfBrown),
    getCard(blueCard, numOfBlue),
  ];
}

function getCard(card, numOfCard) {
  const playCard = [];

  for (let i = 0; i < numOfCard; i++) {
    const random = getRandom(card.length);
    playCard.push(card[random]);
    card.splice(random, 1);
  }
  card.splice(0, 0, ...playCard);
  return playCard;
}

function getRandom(max) {
  return Math.floor(Math.random() * max);
}

function getStageCardArray(currentPlayCard, legendCardOfStage) {
  const stageArrCard = { green: [], brown: [], blue: [] };
  stageArrCard.green = getCard(currentPlayCard[0], legendCardOfStage.green);
  stageArrCard.brown = getCard(currentPlayCard[1], legendCardOfStage.brown);
  stageArrCard.blue = getCard(currentPlayCard[2], legendCardOfStage.blue);
  return stageArrCard;
}

function showCard(card) {
  const arrCard = [...card.green, ...card.brown, ...card.blue];
  const random = getRandom(arrCard.length);
  currentCard.src = `./assets/MythicCards/${arrCard[random].color}/${arrCard[random].id}.png`;

  card[arrCard[random].color].splice(
    card[arrCard[random].color].findIndex((el) => el.id === arrCard[random].id),
    1
  );
  return card;
}

function resetState(state) {
  return {
    ...state,
    level: {},
    firstStage: {
      green: [],
      brown: [],
      blue: [],
    },
    secondStage: {
      green: [],
      brown: [],
      blue: [],
    },
    thirdStage: {
      green: [],
      brown: [],
      blue: [],
    },
  };
}

legendCard.addEventListener("click", (e) => {
  addActiveClassForList(e);
  state.legendCard = getLegendCard(e, ancients);
  removeDisplayNone(levelList);
  deleteActiveClassForList(levelList.children);
  setDisplayNone(readyCard);
  setDisplayNone(mixedBtn);
  state = resetState(state);
});
levelList.addEventListener("click", (e) => {
  addActiveClassForList(e);
  state.level = getLevel(e, difficulties);
  removeDisplayNone(mixedBtn);
  setDisplayNone(readyCard);
  removeDisplayNone(suitCard);
  setDisplayNone(currentCard);
});
mixedBtn.addEventListener("click", () => {
  setDisplayNone(mixedBtn);
  removeDisplayNone(readyCard);
  setTrackerValue(state.legendCard);
  const currentPlayCard = getPlayCard(
    state.legendCard,
    state.level.id,
    playCardArray
  );

  state.firstStage = getStageCardArray(
    currentPlayCard,
    state.legendCard.firstStage
  );
  state.secondStage = getStageCardArray(
    currentPlayCard,
    state.legendCard.secondStage
  );
  state.thirdStage = getStageCardArray(
    currentPlayCard,
    state.legendCard.thirdStage
  );
});
suitCard.addEventListener("click", () => {
  removeDisplayNone(currentCard);
  if (
    state.firstStage.green.length +
    state.firstStage.brown.length +
    state.firstStage.blue.length
  ) {
    showCard(state.firstStage);
    setTrackerStageValue(trackerFirstStage, {
      green: state.firstStage.green.length,
      brown: state.firstStage.brown.length,
      blue: state.firstStage.blue.length,
    });
  } else if (
    state.secondStage.green.length +
    state.secondStage.brown.length +
    state.secondStage.blue.length
  ) {
    showCard(state.secondStage);
    setTrackerStageValue(trackerSecondStage, {
      green: state.secondStage.green.length,
      brown: state.secondStage.brown.length,
      blue: state.secondStage.blue.length,
    });
  } else if (
    state.thirdStage.green.length +
      state.thirdStage.brown.length +
      state.thirdStage.blue.length >
    1
  ) {
    showCard(state.thirdStage);
    setTrackerStageValue(trackerThirdStage, {
      green: state.thirdStage.green.length,
      brown: state.thirdStage.brown.length,
      blue: state.thirdStage.blue.length,
    });
  } else {
    showCard(state.thirdStage);
    setTrackerStageValue(trackerThirdStage, {
      green: state.thirdStage.green.length,
      brown: state.thirdStage.brown.length,
      blue: state.thirdStage.blue.length,
    });
    setDisplayNone(suitCard);
    return null;
  }
});
