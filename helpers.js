const RANKS = ['a', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'j', 'q', 'k'];
const SUITS = ['club', 'spade', 'diamond', 'heart'];

function areDifferentColour(card1, card2) {
  if (!card1 || !card2) return false;

  const a = ['club', 'spade'].includes(card1.suit) && ['diamond', 'heart'].includes(card2.suit);
  const b = ['diamond', 'heart'].includes(card1.suit) && ['club', 'spade'].includes(card2.suit);
  return a || b;
}

function rankIndex(card) {
  if (!card) return -1;
  return RANKS.indexOf(card.rank);
}

function areSequential(card1, card2) {
  if (!card1 || !card2) return false;

  const index1 = rankIndex(card1);
  const index2 = rankIndex(card2);
  return index2 - index1 === 1;
}

function amountMoveableCards(stack) {
  let amountOfCards = 0;
  while (amountOfCards < stack.length) {
    amountOfCards += 1;

    const prevCard = stack[amountOfCards - 1];
    const currentCard = stack[amountOfCards];
    if (!areSequential(prevCard, currentCard) || !areDifferentColour(prevCard, currentCard)) {
      break;
    }
  }

  return amountOfCards;
}

function areSameSuit(card1, card2) {
  if (!card1 || !card2) return false;
  return card1.suit === card2.suit;
}

function deepClone(input) {
  if (Array.isArray(input)) {
    return input.map(deepClone);
  }

  if (typeof input === 'object') {
    const output = {};
    Object.keys(input).forEach((inputKey) => {
      output[inputKey] = deepClone(input[inputKey]);
    });
    return output;
  }

  return input;
}

function isAce(card) {
  if (!card) return false;
  return card.rank === 'a';
}

function isKing(card) {
  if (!card) return false;
  return card.rank === 'k';
}

function openClosed(stack) {
  const stackClone = deepClone(stack);
  if (stackClone.open.length) return stack;

  stackClone.open = stackClone.closed.splice(0, 1);
  return stackClone;
}

module.exports = {
  areDifferentColour,
  rankIndex,
  areSequential,
  amountMoveableCards,
  areSameSuit,
  deepClone,
  isAce,
  isKing,
  openClosed,
  RANKS,
  SUITS,
};
