import { createCardElement, initializeCards } from "./card.js"

const root = document.getElementById('root')

const cards = initializeCards()

const cardsElements = cards.map(createCardElement)

cardsElements.map(cardElement => root.appendChild(cardElement))