// Problem som måste lösas
// 1. måste lösa problemet med att ett "ess" ska kunna byta värde från 14 till 1 så att spelaren inte blir "busted"

// const cardDeck = require('./src/cardDeck.js')
const Player = require('./src/players.js')
const Dealer = require('./src/dealer.js')
/**
 * skapar en class "Table" där man kan spela spelet 21
 * med ett bestämt antal spelare
 */
class Table {
  constructor (names) {
    this._players = names
    this._numberOfPlayers = this._players.length
    this._dealer = new Dealer('Devil')
    this._round = 1
  }
  get dealer () {
    return this._dealer
  }
  set dealer (value) {
    this._dealer = value
  }
  get players () {
    return this._players
  }
  set players (value) {
    this._players = value
  }
  get numberOfPlayers () {
    return this._numberOfPlayers
  }
  set numberOfPlayers (value) {
    this._numberOfPlayers = value
  }
  // metod som skapar object "Player"
  activatePlayers () {
    for (let i = 0; i < this.players.length; i++) {
      this.players[i] = new Player(this.players[i])
    }
    return this.players
  }
  // metod som delar ut korten i ett bestämt antal runder
  roundOfPlays (number = 10) {
    let winingHandsPlayer = []
    let losingHandsPlayer = []
    for (let i = 0; i < this.numberOfPlayers; i++) {
      winingHandsPlayer.push(this.players[i].winingHands)
      losingHandsPlayer.push(this.players[i].winingHands)
    }
    let winingHandsDealer = this.dealer.winingHands
    let losingHandsDealer = this.dealer.losingHands
    let currentRound = this._round
    let resultTable = []
    // itererar så länge currentRound är mindre än number + 1
    while (currentRound < (number + 1)) {
      let playersWaitingForDealer = []
      let playersHandvalue = []
      let currentCard = []
      // fyller i arrayen "currentCard" med  KOPIOR av objecten somm returneras av metoden takeCard
      // från modulen "players.js".
      // Detta görs varje gång när while-loopen körs så att spelarna får nya kort
      for (let i = 0; i < this.numberOfPlayers; i++) {
        currentCard.push(Object.create(this.players[i].takeCard()))
      }
      // fyller i arrayen "playersWaitingForDEaler" med värdena från propertyn "_copyWaitingForDealer"
      // av objekten som finns i arrayen "currenCard"
      for (let i = 0; i < this.numberOfPlayers; i++) {
        playersWaitingForDealer.push(currentCard[i]._copyWaitingForDealer)
      }
      // fyller i arrayen "playersWaitingForDEaler" med värdena från propertyn "_copyHand"
      // av objekten som finns i arrayen "currenCard"
      for (let i = 0; i < this.numberOfPlayers; i++) {
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
        for (let i = 0; i < this.numberOfPlayers; i++) {
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
          resultTable.push(`1. Name of player: ${this.players[i].name}. Cards on table: ${currentCard[i]._copyHand}. Value of cards: ${currentCard[i]._copyHandValue}. Wining hands: ${winingHandsPlayer[i]}. Losing hands: ${losingHandsPlayer[i]}`)
        }
        resultTable.push(`1. Name of dealer: ${this.dealer.name}. No cards on table. Wining hands: ${winingHandsDealer}. Losing hands: ${losingHandsDealer}`)
        // Ökar "currentRound" med 1 för att sedan börja om while-loopen.
        currentRound++
      // Om alla elemnt i "playersWaitingForDealer" INTE är === "false"
      // så jämförs dealerns kort med spelarnas kort.
      // resultaten skrivs ut för att sedan starta en ny runda i while-loopen.
      } else {
      // fyller i arrayen "currentCardDealer" med KOPIOR av objectet somm returneras av metoden takeCard
      // från modulen "dealer.js".
      // Detta görs varje gång när while-loopen körs så att dealern får nya kort
        let currentCardDealer = []
        currentCardDealer.push(Object.create(this.dealer.takeCard()))
        resultTable.push('---------------------------------------------------------------------------------------------------------------------------------------------')
        resultTable.push('2.NEW HAND! NEW HAND! NEW HAND! NEW HAND! NEW HAND! NEW HAND! NEW HAND! NEW HAND! NEW HAND! NEW HAND! NEW HAND! NEW HAND! NEW HAND! NEW HAND!')
        resultTable.push('---------------------------------------------------------------------------------------------------------------------------------------------')
        resultTable.push(`2. RESULT ROUND: ${currentRound}--------------------------------------------- RESULT ROUND: ${currentRound}--------------------------------------------- RESULT ROUND: ${currentRound}`)
        for (let i = 0; i < this.numberOfPlayers; i++) {
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
          resultTable.push(`1. Name of player: ${this.players[i].name}. Cards on table: ${currentCard[i]._copyHand}. Value of cards: ${currentCard[i]._copyHandValue}. Wining hands: ${winingHandsPlayer[i]}. Losing hands: ${losingHandsPlayer[i]}`)
        }
        resultTable.push(`2. Name of dealer: ${this.dealer.name}. Cards on table: ${currentCardDealer[0]._copyHand}. Value of cards: ${currentCardDealer[0]._copyHandValue}. Wining hands: ${winingHandsDealer}. Losing hands: ${losingHandsDealer}`)
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
let table1 = new Table(['joel', 'Christoffer', 'anders'])
table1.activatePlayers()
console.log(table1)
console.log(table1.roundOfPlays(5))
console.log(table1)
