/**
 * Importerar modulen "cardDeck"
 */
const cardDeck = require('./cardDeck.js')
/**
 * Skapare en klass "Dealer"
 */
class Dealer {
  constructor (name) {
    this._name = name
    this._hand = []
    this._handValue = 0
    this._stopValue = 15
    this._winingHands = 0
    this._losingHands = 0
  }
  get name () {
    return this._name
  }
  set name (playerName) {
    if (typeof playerName !== 'string') {
      return 'Name must be typeof string'
    } else {
      return playerName
    }
  }
  get handValue () {
    return this._handValue
  }
  set handValue (value) {
    this._handValue = value
  }
  get stopValue () {
    return this._stopValue
  }
  set stopValue (value) {
    this._stopValue = value
  }
  get hand () {
    return this._hand
  }
  set hand (value) {
    this._hand = value
  }
  get winingHands () {
    return this._winingHands
  }
  set winingHands (value) {
    this._winingHands = value
  }
  get losingHands () {
    return this._losingHands
  }
  set losingHands (value) {
    this._losingHands = value
  }
  takeCard () {
    let reset = false
    let copyHand = this.hand.slice()
    let copyHandValue = this.handValue
    while (reset === false) {
      let randomNumber = Math.floor(Math.random() * cardDeck.cards.length)
      while (cardDeck.cardsTaken.includes(cardDeck.cards[randomNumber])) {
        randomNumber = Math.floor(Math.random() * cardDeck.cards.length)
      }
      if (cardDeck.cards[randomNumber][0] === '2') {
        copyHandValue += 2
      } else if (cardDeck.cards[randomNumber][0] === '3') {
        copyHandValue += 3
      } else if (cardDeck.cards[randomNumber][0] === '4') {
        copyHandValue += 4
      } else if (cardDeck.cards[randomNumber][0] === '5') {
        copyHandValue += 5
      } else if (cardDeck.cards[randomNumber][0] === '6') {
        copyHandValue += 6
      } else if (cardDeck.cards[randomNumber][0] === '7') {
        copyHandValue += 7
      } else if (cardDeck.cards[randomNumber][0] === '8') {
        copyHandValue += 8
      } else if (cardDeck.cards[randomNumber][0] === '9') {
        copyHandValue += 9
      } else if (cardDeck.cards[randomNumber][0] === '1') {
        copyHandValue += 10
      } else if (cardDeck.cards[randomNumber][0] === 'J') {
        copyHandValue += 11
      } else if (cardDeck.cards[randomNumber][0] === 'Q') {
        copyHandValue += 12
      } else if (cardDeck.cards[randomNumber][0] === 'K') {
        copyHandValue += 13
      // Om kortet är ett A så höjs hanvärdet med 1 om handvärtet är 8 eller högre.
      // om handvärte är lägre än 8 så höjs handvärdet med 14.
      } else {
        if (copyHandValue >= 8) {
          copyHandValue += 1
        } else {
          copyHandValue += 14
        }
      }
      // returnerar returnerar spelet 21 och blandar om kortleken efterom
      // endast ett kort finns kvar
      if (copyHandValue < this.stopValue) {
        reset = false
        copyHand.push(cardDeck.cards[randomNumber])
      } else {
        if (cardDeck.cardsTaken.length === 51) {
          cardDeck.cardsTaken = []
          cardDeck.cardsTaken.push(cardDeck.cards[randomNumber])
          copyHand.push(cardDeck.cards[randomNumber])
          if (copyHandValue === 21) {
            reset = true
          } else if (this.handValue < 21) {
            reset = true
          } else {
            reset = true
          }
        // returnerar returnerar spelet 21 men blandar inte om
        // kortleken eftersom fler än ett kort finns kvar att ta.
        } else {
          cardDeck.cardsTaken.push(cardDeck.cards[randomNumber])
          copyHand.push(cardDeck.cards[randomNumber])
          if (copyHandValue === 21) {
            reset = true
          } else if (this.handValue < 21) {
            reset = true
          } else {
            reset = true
          }
        }
      }
    }
    return {
      _reset: reset,
      _copyHand: copyHand,
      _copyHandValue: copyHandValue
    }
  }
}

/*
let testPlayer = new Dealer('testPlayer')
console.log(testPlayer)
console.log(testPlayer.takeCard())
console.log(testPlayer.takeCard())
console.log(testPlayer.takeCard())
console.log(testPlayer.takeCard())
console.log(testPlayer.takeCard())
console.log(testPlayer.takeCard())
console.log(testPlayer)
*/
module.exports = Dealer
