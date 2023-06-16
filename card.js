import assets from "./assets.js";
import shuffle from "./utils/shuffle.js"

export const initializeCards = () => {
  let cards = assets.concat(assets);

   cards = cards.map((path, index) => ({
    id: `card-${index}`,
    path,
    isFaceUp: false
  }));

  return shuffle(cards);
};

const cards = initializeCards()

export {cards}