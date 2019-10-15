// Problem som måste lösas
// 1. Ska "ess" ska kunna byta värde från på fler sätt än 14 till 1
// 2. ska jag slå ihop modulerna dealer och player?
// 3. kan jag få spelet att returner för varje kort?
// 4. Tydligare resultat
// const cardDeck = require('./src/cardDeck.js')
// ska felmeddelanden skrivas in om argumenten inte är av enarray string typ
/**
 * @author Joel Martelleur
 * /

/**
 * Importerar modulerna Player och Dealer
 * @module Player beskriver en spelare i spelet 21
 */
const Player = require('./src/players.js')

/**
 * Importerar modulerna Player och Dealer
 * @module Dealer beskriver en dealer i spelet 21
 */
const Dealer = require('./src/dealer.js')

/**
 * skapar en class "Table" där man kan spela spelet 21
 * @classdesc beskriver ett bord där man spelar spelet 21
 */
class Table {
  constructor (names = ['Joel', 'Christoffer', 'Anders'], stopValues = [14, 16, 18]) {
    this._players = names
    this._stopValues = stopValues
    this._numberOfPlayers = this._players.length
    this._dealer = new Dealer('Devil')
    this._round = 1
  }

  /** Metod som skapar object av typen Player
   * @method activatePlayers()
   * @returns {thisplayers} array med element av typen Player
   * */
  activatePlayers () {
    for (let i = 0; i < this._players.length; i++) {
      this._players[i] = new Player(this._players[i], this._stopValues[i])
    }
    return this._players
  }

  /** Metod som delar ut korten i ett bestämt antal runder
   * @method roundOfPlays(number=10)
   * @param number en integer som bestämer hur många rundor som spelas
   * @returns {resultTable[]} som beskriver resultatet av spelet
   * */
  roundOfPlays (number = 10) {
    this.activatePlayers()
    let winingHandsPlayer = []
    let losingHandsPlayer = []
    for (let i = 0; i < this._numberOfPlayers; i++) {
      winingHandsPlayer.push(this._players[i]._winingHands)
      losingHandsPlayer.push(this._players[i]._winingHands)
    }
    let winingHandsDealer = this._dealer._winingHands
    let losingHandsDealer = this._dealer._losingHands
    let currentRound = this._round
    let resultTable = []
    // itererar så länge currentRound är mindre än number + 1
    while (currentRound < (number + 1)) {
      let playersWaitingForDealer = []
      let playersHandvalue = []
      let currentCard = []
      // fyller i arrayen "currentCard" med  KOPIOR av objecten somm returneras av metoden takeCards
      // från modulen "players.js".
      // Detta görs varje gång när while-loopen körs så att spelarna får nya kort
      for (let i = 0; i < this._numberOfPlayers; i++) {
        currentCard.push(Object.create(this._players[i].takeCards()))
      }
      // fyller i arrayen "playersWaitingForDEaler" med värdena från propertyn "_copyWaitingForDealer"
      // av objekten som finns i arrayen "currenCard"
      for (let i = 0; i < this._numberOfPlayers; i++) {
        playersWaitingForDealer.push(currentCard[i]._copyWaitingForDealer)
      }
      // fyller i arrayen "playersWaitingForDEaler" med värdena från propertyn "_copyHand"
      // av objekten som finns i arrayen "currentCard"
      for (let i = 0; i < this._numberOfPlayers; i++) {
        playersHandvalue.push(currentCard[i]._copyHandValue)
      }
      // Om alla element i "playersWaitingForDealer" är === "false"
      // så skrivs resultatet ut föra att sedan starta en ny runda i while-loopen
      if (playersWaitingForDealer.every(element => element === false)) {
        // Skriver ut resultatet för handen
        resultTable.push('---------------------------------------------------------------------------------------------------------------------------------------------')
        resultTable.push('1.NEW HAND! NEW HAND! NEW HAND! NEW HAND! NEW HAND! NEW HAND! NEW HAND! NEW HAND! NEW HAND! NEW HAND! NEW HAND! NEW HAND! NEW HAND! NEW HAND!')
        resultTable.push('---------------------------------------------------------------------------------------------------------------------------------------------')
        resultTable.push(`1. RESULT ROUND: ${currentRound}--------------------------------------------- RESULT ROUND: ${currentRound}--------------------------------------------- RESULT ROUND: ${currentRound}`)
        // sakpar ett object som jag sedan fyller i med reultat från spelare och dalern från
        // den specifika rundan.
        for (let i = 0; i < this._numberOfPlayers; i++) {
          if (currentCard[i]._copyHandValue <= 21) {
            winingHandsPlayer[i]++
            losingHandsDealer++
          } else {
            losingHandsPlayer[i]++
            winingHandsDealer++
          }
          // return {
          //   player1: `1. Name of player: ${this.players[i].name}. Cards on table: ${currentCard[i]._copyHand}. Value of cards: ${currentCard[i]._copyHandValue}. Wining hands: ${winingHandsPlayer[i]}. Losing hands: ${losingHandsPlayer[i]}`,
          //   dealer1: `1. Name of dealer: ${this.dealer.name}. No cards on table. Wining hands: ${winingHandsDealer}. Losing hands: ${losingHandsDealer}`
          // }
          resultTable.push(`1. Name of player: ${this._players[i]._name}. Cards on table: ${currentCard[i]._copyHand}. Value of cards: ${currentCard[i]._copyHandValue}. Wining hands: ${winingHandsPlayer[i]}. Losing hands: ${losingHandsPlayer[i]}`)
        }
        resultTable.push(`1. Name of dealer: ${this._dealer._name}. No cards on table. Wining hands: ${winingHandsDealer}. Losing hands: ${losingHandsDealer}`)
        // Ökar "currentRound" med 1 för att sedan börja om while-loopen.
        currentRound++
      // Om alla elemnt i "playersWaitingForDealer" INTE är === "false"
      // så jämförs dealerns kort med spelarnas kort.
      // resultaten skrivs ut för att sedan starta en ny runda i while-loopen.
      } else {
      // fyller i arrayen "currentCardDealer" med KOPIOR av objectet somm returneras av metoden takeCards
      // från modulen "dealer.js".
      // Detta görs varje gång när while-loopen körs så att dealern får nya kort
        let currentCardDealer = []
        currentCardDealer.push(Object.create(this._dealer.takeCards()))
        resultTable.push('---------------------------------------------------------------------------------------------------------------------------------------------')
        resultTable.push('2.NEW HAND! NEW HAND! NEW HAND! NEW HAND! NEW HAND! NEW HAND! NEW HAND! NEW HAND! NEW HAND! NEW HAND! NEW HAND! NEW HAND! NEW HAND! NEW HAND!')
        resultTable.push('---------------------------------------------------------------------------------------------------------------------------------------------')
        resultTable.push(`2. RESULT ROUND: ${currentRound}--------------------------------------------- RESULT ROUND: ${currentRound}--------------------------------------------- RESULT ROUND: ${currentRound}`)
        for (let i = 0; i < this._numberOfPlayers; i++) {
          if (currentCard[i]._copyWaitingForDealer === true) {
            if (currentCardDealer[0]._copyHandValue > 21) {
              winingHandsPlayer[i]++
              losingHandsDealer++
            } else if (currentCardDealer[0]._copyHandValue <= 21 && currentCardDealer[0]._copyHandValue >= currentCard[i]._copyHandValue) {
              winingHandsDealer++
              losingHandsPlayer[i]++
            } else {
              losingHandsDealer++
              winingHandsPlayer[i]++
            }
          } else {
            if (currentCard[i]._copyHandValue <= 21) {
              winingHandsPlayer[i]++
              losingHandsDealer++
            } else {
              losingHandsPlayer[i]++
              winingHandsDealer++
            }
          }
          resultTable.push(`2. Name of player: ${this._players[i]._name}. Cards on table: ${currentCard[i]._copyHand}. Value of cards: ${currentCard[i]._copyHandValue}. Wining hands: ${winingHandsPlayer[i]}. Losing hands: ${losingHandsPlayer[i]}`)
        }
        resultTable.push(`2. Name of dealer: ${this._dealer._name}. Cards on table: ${currentCardDealer[0]._copyHand}. Value of cards: ${currentCardDealer[0]._copyHandValue}. Wining hands: ${winingHandsDealer}. Losing hands: ${losingHandsDealer}`)
        currentRound++
      }
    }
    return resultTable
  }
}

/**
 * Skapar ett nytt object "Table" med namn "table1"
 * och skapar objects "Player" med metoden "playerOnTable"
 */
let table1 = new Table()
// table1.activatePlayers()
console.log(table1)
console.log(table1.roundOfPlays(5))
console.log(table1)

/**
 * Laddar ner modulen readline för att fråga spelaren om vad den tyckte om  spelet
 * Sedan avslutas det
 * */
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.question('What do you think about the game? ', (answer) => {
  // TODO: Log the answer in a database
  console.log(`Your answer: ${answer}.`)
  console.log(`Thank you for your valuable feedback!`)
  rl.close()
})
