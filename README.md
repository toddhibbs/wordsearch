# wordsearch-generator
=========

Creates a wordsearch puzzle given a grid size and list of words

## Installation

  `npm install --save wordsearch-generator`

## Usage

    const wordsearch = require('wordsearch-generator')

    const words = ['ant', 'monkey', 'cat', 'dog', 'bald eagle']
    let puzzleGrid = wordsearch.createPuzzle(20, 20, 'en', words)

    // The puzzle has been generated but all of the array values without a letter are still set to 0
    // The hideWords function will fill in the rest of the puzzle with random letters from the given 
    // language. English is currently the only supported language

    puzzleGrid = wordsearch.hideWords(puzzleGrid, 'en')

    // Print grid to the console. This formats each row with spaces between each letter
    let lines = wordsearch.printGrid(puzzleGrid)
    lines.forEach(function(line) {
      console.log(line)
    })

    // Note: you can print an answer sheet for the puzzle by skipping the call to hideWords and calling
    // printGrid with an optional true parameter to print spaces rather than the default 0 value
    // let lines = wordsearch.printGrid(puzzleGrid, true)

## Tests

  `npm run test`