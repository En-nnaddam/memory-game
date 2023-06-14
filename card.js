import assets, { faceDownPath } from "./assets.js";
import shuffle from "./utils/shuffle.js"

const createImage = (alt, src) => {
  const img = document.createElement("img");
  img.alt = alt;
  img.src = src;

  return img;
};

const flipCard = (card) => {
  card.isFaceUp = !card.isFaceUp
  const cardElement = document.getElementById(card.id)
  const cardImgElement = cardElement.querySelector('img')

  cardImgElement.src = card.path
}

const handleCardClick = (card) => {
  flipCard(card)
}

export const createCardElement = (card) => {
  const cardElement = document.createElement("div");
  const path = card.isFaceUp ?  card.path : faceDownPath
  const img = createImage("fruit", path)

  cardElement.addEventListener("click", () => handleCardClick(card))
  cardElement.appendChild(img);
  cardElement.id = card.id
  cardElement.className = "card";

  return cardElement;
};

export const initializeCards = () => {
  let cards = assets.concat(assets);

   cards = cards.map((path, index) => ({
    id: `card-${index}`,
    path,
    isFaceUp: false
  }));

  return shuffle(cards);
};
