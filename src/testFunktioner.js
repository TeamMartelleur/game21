/**
 * @author Joel Martelleur
*/

/**
 * @function testFunction1
*/
function testFunction1 (numbers) {
  if (!Array.isArray(numbers)) {
    throw new TypeError('The passed argument for the parameter numbers must be an array.')
  }

  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] < 1 || numbers[i] > 21 || !Number.isInteger(numbers[i])) {
      throw new TypeError('The passed argument for the parameter numbers must be an array with integer element between 1-21.')
    }
  }
}

/**
 * @function testFunction2
*/
function testFunction2 (names) {
  if (!Array.isArray(names)) {
    throw new TypeError('The passed argument for the parameter players must be an array of stingelements.')
  }

  if (!names.every(element => typeof element === 'string')) {
    throw new TypeError('The passed array for the parameter players must only contain elements of type string.')
  }
}

/**
 * @function testFunction3
*/
function testFunction3 (rounds) {
  if (rounds < 1 || rounds > 10 || !Number.isInteger(rounds)) {
    throw new TypeError('The passed argument for the parameter rounds must be an integer between 1-10.')
  }
}

exports.testFunction1 = testFunction1
exports.testFunction2 = testFunction2
exports.testFunction3 = testFunction3
