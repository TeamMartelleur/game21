// Problem som måste lösas
// 1. Ska "ess" ska kunna byta värde från på fler sätt än 14 till 1
// 2. ska jag slå ihop modulerna dealer och player?
// 3. kan jag få spelet att returner för varje kort?
// 4. Tydligare resultat
// const cardDeck = require('./src/cardDeck.js')
// ska felmeddelanden skrivas in om argumenten inte är av enarray string typ

/**
 * @author Joel Martelleur
*/

// importerar classen Table samt modulen testFunktioner
const Table = require('./src/Table')
const testFunktioner = require('./src/testFunktioner')

/**
 * @function gameOn
*/
const gameOn = (players = ['Joel', 'Christoffer', 'Anders'], stopValues = [14, 16, 18], rounds = 5) => {
  testFunktioner.testFunction1(stopValues)
  testFunktioner.testFunction2(players)
  testFunktioner.testFunction3(rounds)

  // skapar ett objekt Table där spelet 21 kan spelas
  const table1 = new Table(players, stopValues)

  // skriver ut resultatet för spelet 21
  console.log(table1.roundOfPlays(rounds))
}

// Anropar game on med en try and catch sats
try {
  gameOn(['Joel', 'anita', 'erik'], [19, 15, 13], 10)

  // Laddar ner modulen readline för att fråga spelaren om vad den tyckte om  spelet
  const readline = require('readline')

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  rl.question('What do you think about the game? ', (answer) => {
    console.log(`Your answer: ${answer}.`)
    console.log(`Thank you for your valuable feedback!`)
    rl.close()
  })
} catch (e) {
  console.error(e.message)
}
