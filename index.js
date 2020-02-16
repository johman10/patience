const {
  RANKS,
  SUITS,
  deepClone,
  openClosed,
  areSequential,
  areDifferentColour,
  amountMoveableCards,
  isKing,
  isAce,
  areSameSuit,
} = require('./helpers');

function generateDeck() {
  return SUITS.flatMap((suit) => RANKS.map((rank) => ({
    suit,
    rank,
  })));
}

function resetWaste(waste) {
  return {
    open: [],
    closed: deepClone(waste.open),
  };
}

function draw(waste, amount = 3) {
  const closed = deepClone(waste.closed);
  const open = deepClone(waste.open);
  const cardsToDeal = closed.splice(0, amount);

  return {
    closed,
    open: [...cardsToDeal, ...open],
  };
}

function shuffle(cards) {
  return cards.sort(() => ((!Math.round(Math.random())) ? -1 : 1));
}

function playFromWasteToTableau(waste, tableau, toIndex) {
  const wasteClone = deepClone(waste);
  const tableauClone = deepClone(tableau);
  const wasteStack = wasteClone.open;
  const wasteCard = wasteStack[0];
  const tableauStack = tableauClone[toIndex].open;
  const tableauCard = tableauStack[0];
  const fitsRank = areSequential(wasteCard, tableauCard);
  const fitsSuit = areDifferentColour(wasteCard, tableauCard);

  const kingRequirement = !tableauStack.length && isKing(wasteCard);
  const nonKingRequirement = fitsRank && fitsSuit;

  if (kingRequirement || nonKingRequirement) {
    const cardToMove = wasteStack.splice(0, 1);
    tableauClone[toIndex].open = [cardToMove[0], ...tableauStack];
  }

  return {
    waste: wasteClone,
    tableau: tableauClone,
  };
}

function playFromWasteToFoundation(waste, foundation, toIndex) {
  const wasteClone = deepClone(waste);
  const foundationClone = deepClone(foundation);
  const wasteStack = wasteClone.open;
  const wasteCard = wasteStack[0];
  const foundationStack = foundationClone[toIndex];
  const foundationCard = foundationStack[0];
  const fitsRank = areSequential(foundationCard, wasteCard);
  const fitsSuit = areSameSuit(wasteCard, foundationCard);

  const aceRequirement = !foundationStack.length && isAce(wasteCard);
  const nonAceRequirement = fitsRank && fitsSuit;

  if (aceRequirement || nonAceRequirement) {
    const cardToMove = wasteStack.splice(0, 1);
    foundationClone[toIndex] = [cardToMove[0], ...foundationStack];
  }

  return {
    waste: wasteClone,
    foundation: foundationClone,
  };
}

function playFromTableauToFoundation(tableau, foundation, fromIndex, toIndex) {
  const tableauClone = deepClone(tableau);
  const foundationClone = deepClone(foundation);
  const tableauCard = tableauClone[fromIndex].open[0];
  const foundationCard = foundationClone[toIndex][0];
  const fitsSuit = areSameSuit(tableauCard, foundationCard);
  const fitsRank = areSequential(foundationCard, tableauCard);

  const aceRequirement = isAce(tableauCard) && !foundationCard;
  const nonAceRequirement = fitsRank && fitsSuit;

  if (aceRequirement || nonAceRequirement) {
    const cardToMove = tableauClone[fromIndex].open.splice(0, 1);
    foundationClone[toIndex] = [cardToMove[0], ...foundationClone[toIndex]];
  }

  tableauClone[fromIndex] = openClosed(tableauClone[fromIndex]);

  return {
    tableau: tableauClone,
    foundation: foundationClone,
  };
}

function playFromTableauToTableau(tableau, fromIndex, toIndex) {
  const tableauClone = deepClone(tableau);
  const fromStack = tableauClone[fromIndex].open;
  const toStack = tableauClone[toIndex].open;
  const toCard = toStack[0];
  let moveableCardCount = amountMoveableCards(fromStack);
  const highestCard = fromStack[moveableCardCount - 1];

  const kingRequirement = !toStack.length && isKing(highestCard);
  if (kingRequirement) {
    const cardsToMove = fromStack.splice(0, moveableCardCount);
    tableauClone[toIndex].open = [...cardsToMove, ...toStack];
    moveableCardCount = 0;
  }

  for (let i = 0; i < moveableCardCount; i += 1) {
    const card = fromStack[i];
    if (areDifferentColour(toCard, card) && areSequential(card, toCard)) {
      const cardsToMove = fromStack.splice(0, i + 1);
      tableauClone[toIndex].open = [...cardsToMove, ...toStack];
      break;
    }
  }

  tableauClone[fromIndex] = openClosed(tableauClone[fromIndex]);

  return {
    tableau: tableauClone,
  };
}
//
// function playFromFoundationToTableau(foundation, tableau, fromIndex, toIndex) {
//
//   return {
//     foundation,
//     tableau,
//   };
// }

module.exports = {
  generateDeck,
  resetWaste,
  draw,
  shuffle,
  playFromWasteToTableau,
  playFromWasteToFoundation,
  // playFromFoundationToTableau,
  playFromTableauToFoundation,
  playFromTableauToTableau,
};
