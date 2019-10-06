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
    // skapar ett objekt ,"valuesCard", som ska returneras i slutet av funktionen
    let valuesCard = {
      _reset: false,
      _copyHand: this.hand.slice(),
      _copyHandValue: this.handValue
    }
    // Skapar en while-loop som kommer iterera tills handen är färdigspelad, "valuesCard._reset === false".
    while (valuesCard._reset === false) {
      if (valuesCard._copyHandValue >= this._stopValue) {
        valuesCard._reset = true
      } else {
      // Genererar ett nummer "randomNuber"  [0-51] för att symbolera en kortlek
      // Detta nummer kan med hjälp av while-loopen aldrig vara lika med ett tidgare
      // genererat nummer.
        let randomNumber = Math.floor(Math.random() * cardDeck.cards.length)
        while (cardDeck.cardsTaken.includes(cardDeck.cards[randomNumber])) {
          randomNumber = Math.floor(Math.random() * cardDeck.cards.length)
        }
        // kontrolfölde som blandar om kortleken om endast ett kort finns kvar, "cardDeck.cardsTaken.length === 51", och
        // sedan pushar arrayen "copyHand" med ett nytt kort
        // om fler kort finns kvar så pushas arrayen "copyHand" med ett nytt kort direkt.
        if (cardDeck.cardsTaken.length === 51) {
          cardDeck.cardsTaken = []
          cardDeck.cardsTaken.push(cardDeck.cards[randomNumber])
          valuesCard._copyHand.push(cardDeck.cards[randomNumber])
        } else {
          cardDeck.cardsTaken.push(cardDeck.cards[randomNumber])
          valuesCard._copyHand.push(cardDeck.cards[randomNumber])
        }
        // Ett kontrollflöde som uppdaterar spelhandens, "valuesCard._handValue",
        // nuvarande värde
        if (cardDeck.cards[randomNumber][0] === '2') {
          valuesCard._copyHandValue += 2
        } else if (cardDeck.cards[randomNumber][0] === '3') {
          valuesCard._copyHandValue += 3
        } else if (cardDeck.cards[randomNumber][0] === '4') {
          valuesCard._copyHandValue += 4
        } else if (cardDeck.cards[randomNumber][0] === '5') {
          valuesCard._copyHandValue += 5
        } else if (cardDeck.cards[randomNumber][0] === '6') {
          valuesCard._copyHandValue += 6
        } else if (cardDeck.cards[randomNumber][0] === '7') {
          valuesCard._copyHandValue += 7
        } else if (cardDeck.cards[randomNumber][0] === '8') {
          valuesCard._copyHandValue += 8
        } else if (cardDeck.cards[randomNumber][0] === '9') {
          valuesCard._copyHandValue += 9
        } else if (cardDeck.cards[randomNumber][0] === '1') {
          valuesCard._copyHandValue += 10
        } else if (cardDeck.cards[randomNumber][0] === 'J') {
          valuesCard._copyHandValue += 11
        } else if (cardDeck.cards[randomNumber][0] === 'Q') {
          valuesCard._copyHandValue += 12
        } else if (cardDeck.cards[randomNumber][0] === 'K') {
          valuesCard._copyHandValue += 13
        } else {
          valuesCard._copyHandValue += 14
          let map = valuesCard._copyHand.map(element => {
            if (element === 'AS') {
              return 'AS(value=14)'
            } else if (element === 'AH') {
              return 'AH(value=14)'
            } else if (element === 'AD') {
              return 'AD(value=14)'
            } else if (element === 'AC') {
              return 'AH(value=14)'
            } else {
              return element
            }
          })
          valuesCard._copyHand = map
        }
        // skapae en serie av kontrollflöden som kan ändra värdena på essen om
        // spelaren är "busted"
        if (valuesCard._copyHandValue > 21 && valuesCard._copyHand.includes('AS(value=14)')) {
          valuesCard._copyHandValue += -13
          let map = valuesCard._copyHand.map(element => {
            if (element === 'AS(value=14)') {
              return 'AS(value=1)'
            } else {
              return element
            }
          })
          valuesCard._copyHand = map
        }
        if (valuesCard._copyHandValue > 21 && valuesCard._copyHand.includes('AH(value=14)')) {
          valuesCard._copyHandValue += -13
          let map = valuesCard._copyHand.map(element => {
            if (element === 'AH(value=14)') {
              return 'AH(value=1)'
            } else {
              return element
            }
          })
          valuesCard._copyHand = map
        }
        if (valuesCard._copyHandValue > 21 && valuesCard._copyHand.includes('AD(value=14)')) {
          valuesCard._copyHandValue += -13
          let map = valuesCard._copyHand.map(element => {
            if (element === 'AD(value=14)') {
              return 'AD(value=1)'
            } else {
              return element
            }
          })
          valuesCard._copyHand = map
        }
        if (valuesCard._copyHandValue > 21 && valuesCard._copyHand.includes('AC(value=14)')) {
          valuesCard._copyHandValue += -13
          let map = valuesCard._copyHand.map(element => {
            if (element === 'AC(value=14)') {
              return 'AC(value=1)'
            } else {
              return element
            }
          })
          valuesCard._copyHand = map
        }
        console.log(valuesCard._copyHand)
        // Kontrollflöde som betämer om vi ska vara kvar i While-loopen "while (reset === false)"
        if (this.handValue === 21) {
          valuesCard._reset = true
        } else if (valuesCard._copyHandValue < 21) {
          valuesCard._reset = false
        } else {
          valuesCard._reset = true
        }
      }
    }
    return valuesCard
  }
}
/*
let testPlayer = new Dealer('testPlayer')
console.log(testPlayer)
console.log(testPlayer.takeCard())
console.log(testPlayer.takeCard())
console.log(testPlayer)
*/
module.exports = Dealer
