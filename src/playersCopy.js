/**
 * Importerar modulen "cardDeck"
 */
const cardDeck = require('./cardDeck.js')
/**
 * Skapare en klass "Player"
 */
class Player {
  constructor (name) {
    this._name = name
    this._hand = []
    this._handValue = 0
    this._stopValue = 18
    this._waitingForDealer = false
    this._waitingForPlayer = false
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
  get hand () {
    return this._hand
  }
  set hand (value) {
    this._hand = value
  }
  get waitingForDealer () {
    return this._waitingForDealer
  }
  set waitingForDealer (value) {
    this._waitingForDealer = value
  }
  get waitingForPlayer () {
    return this._waitingForPlayer
  }
  set waitingForPlayer (value) {
    this._waitingForPlayer = value
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
  // metod som stoppar handen
  stopHand () {
    this.waitingForDealer = true
    this._waitingForPlayer = true
  }
  // metod som tar ett kort från modulen "cardDEck.js"
  // och returnerar spelet 21
  takeCard () {
    let reset = false
    let copyHand = this.hand.slice()
    let copyHandValue = this.handValue
    let copyWaitingForDealer = this.waitingForDealer
    let copyWaitingForPlayer = this.waitingForPlayer
    while (reset === false) {
      if (copyHandValue >= this._stopValue) {
        copyWaitingForDealer = true
        copyWaitingForPlayer = true
        reset = true
      } else {
      // Genererar ett nummer "randomNuber"  [0-51] för att symbolera en kortlek
      // Detta nummer kan med hjälp av while-loopen aldrig vara lika med ett tidgare
      // genererat nummer.
        let randomNumber = Math.floor(Math.random() * cardDeck.cards.length)
        while (cardDeck.cardsTaken.includes(cardDeck.cards[randomNumber])) {
          randomNumber = Math.floor(Math.random() * cardDeck.cards.length)
        }
        // Ett kontrollflöde som uppdaterar handens
        // nuvarande värde
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
          } // måste lösa problemet att A måste kunnas ändras om efter ett val
        }
        // returnerar returnerar spelet 21 och blandar om kortleken eftersom
        // endast ett kort finns kvar
        if (cardDeck.cardsTaken.length === 51) {
          cardDeck.cardsTaken = []
          cardDeck.cardsTaken.push(cardDeck.cards[randomNumber])
          copyHand.push(cardDeck.cards[randomNumber])
          if (copyHandValue < 21 && copyHand.length < 5) {
            reset = false
            copyWaitingForDealer = false
            copyWaitingForPlayer = false
          } else if (this.handValue === 21) {
            reset = true
            copyWaitingForDealer = false
            copyWaitingForPlayer = true
          } else if (copyHandValue < 21 && copyHand.length === 5) {
            reset = true
            copyWaitingForDealer = false
            copyWaitingForPlayer = true
          } else {
            reset = true
            copyWaitingForDealer = false
            copyWaitingForPlayer = true
          }
        // returnerar returnerar spelet 21 men blandar inte om
        // kortleken eftersom fler än ett kort finns kvar att ta.
        } else {
          cardDeck.cardsTaken.push(cardDeck.cards[randomNumber])
          copyHand.push(cardDeck.cards[randomNumber])
          if (copyHandValue < 21 && copyHand.length < 5) {
            reset = false
            copyWaitingForDealer = false
            copyWaitingForPlayer = false
          } else if (copyHandValue === 21) {
            reset = true
            copyWaitingForDealer = false
            copyWaitingForPlayer = true
          } else if (copyHandValue < 21 && copyHand.length === 5) {
            reset = true
            copyWaitingForDealer = false
            copyWaitingForPlayer = true
          } else {
            reset = true
            copyWaitingForDealer = false
            copyWaitingForPlayer = true
          }
        }
      }
    }
    return {
      _reset: reset,
      _copyHand: copyHand,
      _copyHandValue: copyHandValue,
      _copyWaitingForDealer: copyWaitingForDealer,
      _copyWaitingForPlayer: copyWaitingForPlayer
    }
  }
}
/*
let testPlayer = new Player('testPlayer')
console.log(testPlayer)
console.log(testPlayer.takeCard()._copyHand)
console.log(testPlayer.takeCard())
console.log(testPlayer.takeCard())
console.log(testPlayer.takeCard())
console.log(testPlayer.takeCard())
console.log(testPlayer.takeCard())
console.log(testPlayer)
*/

/**
 * Exporterra modulen "Player"
 */
module.exports = Player
