// Problem som måste lösas
// 1. Ska "ess" ska kunna byta värde från på fler sätt än 14 till 1
// 2. ska jag slå ihop modulerna dealer och player?

/**
 * @author Joel Martelleur
*/

// importerar classen Table samt modulen testFunktioner
const Table = require('./src/Table')
const testFunktioner = require('./src/testFunktioner')

/**
 * @function gameOn
 * @param {string[]} players - an array with names
 * @param {numbers[]} stopValues - an array with numbers between 1-21
 * @param {number} rounds - a number between 1-10
 * @throws {TypeError}
 * @returns {result}
*/
const gameOn = (players = ['Joel', 'Christoffer', 'Anders'], stopValues = [14, 16, 18], rounds = 5) => {
  testFunktioner.testFunction1(stopValues)
  testFunktioner.testFunction2(players)
  testFunktioner.testFunction3(rounds)
  testFunktioner.testFunction4(players, stopValues)

  // skapar ett objekt Table där spelet 21 kan spelas
  const table1 = new Table(players, stopValues)

  // spelar spelet 21
  let result = table1.roundOfPlays(rounds)

  // returnerar resultatet för spelet 21
  return result
}

/**
 * @Statement try..catch
 * @Description Anropar gameOn med en try and catch statement
 * */
try {
  let spelet21 = gameOn(['Joel', 'Erik', 'Sofia'], [12, 15, 19], 3)
  console.log(spelet21)
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
