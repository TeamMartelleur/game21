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

const Table = require('./src/Table')

/**
 * @function testFunction1
*/
function testFunction1 (numbers) {
  if (!Array.isArray(numbers)) {
    throw new TypeError('The passed argument is not an array.')
  }

  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] < 1 || numbers[i] > 21 || !Number.isInteger(numbers[i])) {
      throw new TypeError('The passed argument must be an array with integer element between 1-21.')
    }
  }
}

/**
 * @function testFunction2
*/
function testFunction2 (names) {
  if (!Array.isArray(names)) {
    throw new TypeError('The passed argument is not an array.')
  }

  if (!names.every(element => typeof element === 'string')) {
    throw new TypeError('The passed array must only contain elements of type string.')
  }
}

/**
 * @function gameOn
*/
const gameOn = (players = ['Joel', 'Christoffer', 'Anders'], stopValues = [14, 16, 18]) => {
  testFunction1(stopValues)
  testFunction2(players)

  const table1 = new Table(players, stopValues)

  console.log(table1)
  console.log(table1.roundOfPlays(5))
  console.log(table1)
}

// Anropar game on med en try catch sats
try {
  // gameOn()
  gameOn(['Joel', 'anita', 'erik'], [19, 3.4, 13])

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
    console.log(`Your answer: ${answer}.`)
    console.log(`Thank you for your valuable feedback!`)
    rl.close()
  })
} catch (e) {
  console.error(e.message)
}
