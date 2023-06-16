import { createCardElement } from "./cardUi.js";
import { cards } from "./card.js";

const root = document.getElementById("root");

const cardsElements = cards.map(createCardElement);

cardsElements.map((cardElement) => root.appendChild(cardElement));