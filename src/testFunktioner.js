/**
 * @author Joel Martelleur
*/

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

exports.testFunction1 = testFunction1
exports.testFunction2 = testFunction2
