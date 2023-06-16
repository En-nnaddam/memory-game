import { faceDownPath } from "./assets.js";
import { createImage } from "./utils/imageUi.js";
import { cards } from "./card.js";

const CARD_FLIP_DURATION = 2000;
const cardTwin = [];

const setCardUiImage = (card, isFaceUp) => {
  const cardElement = document.getElementById(card.id);
  const cardImgElement = cardElement.querySelector("img");

  if (isFaceUp) cardImgElement.src = card.path;
  else cardImgElement.src = faceDownPath;
};

const setCardFaceDown = (card) => {
  card.isFaceUp = false;
  setCardUiImage(card, false);
};

const setCardFaceUp = (card) => {
  card.isFaceUp = true;
  setCardUiImage(card, true);
};

const isGameOver = () => cards.every((card) => card.isFaceUp === true);

const compareCards = (firstCard, secondCard) =>
  firstCard.path === secondCard.path;

const clearCardTimeout = (card) => clearTimeout(card.timeout);

const removeCardClick = (card) => {
  const cardElement = document.getElementById(card.id);
  cardElement.removeEventListener("click", card.handleClick);

  delete card.handleClick
};

// const addCardClick = (card) => {
//   const cardElement = document.getElementById(card.id);

//   card.handleClick = () => handleCardClick(card);
//   cardElement.addEventListener("click", card.handleClick);
// };

const autoFaceDown = (card) => {
  setCardFaceDown(card);

  cardTwin.length = 0;
};

const handleCardClick = (card) => {
  if (cardTwin.length >= 2) return;

  setCardFaceUp(card);

  const timeout = setTimeout(() => autoFaceDown(card), CARD_FLIP_DURATION);

  if (cardTwin.length === 0) {
    cardTwin.push({
      ...card,
      timeout,
    });
  } else {
    if(cardTwin[0].id === card.id) return;

    cardTwin.push({
      ...card,
      timeout,
    });

    const isEqual = compareCards(cardTwin[0], cardTwin[1]);

    if (isEqual) {
      cardTwin.forEach((card) => {
        clearCardTimeout(card)
        removeCardClick(card)
      });
      cardTwin.length = 0;

      if (isGameOver()) console.log("Game Over!");
    }
  }
};

export const createCardElement = (card) => {
  const cardElement = document.createElement("div");
  const path = card.isFaceUp ? card.path : faceDownPath;
  const img = createImage("fruit", path);

  card.handleClick = () => handleCardClick(card);

  cardElement.addEventListener("click", card.handleClick);
  cardElement.appendChild(img);
  cardElement.id = card.id;
  cardElement.className = "card";

  return cardElement;
};
