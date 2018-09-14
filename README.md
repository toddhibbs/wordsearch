# wordsearch-generator
=========

Creates a wordsearch puzzle given a grid size and list of words

## Installation

  `npm install --save wordsearch-generator`

## Usage

    const wordsearch = require('wordsearch-generator')

    const words = ['ant', 'monkey', 'cat', 'dog', 'bald eagle']
    let puzzleGrid = wordsearch.createPuzzle(20, 20, 'en', words)
    puzzleGrid = wordsearch.hideWords(puzzleGrid, 'en')

    //print grid to the console
    wordsearch.printGrid(puzzleGrid)

## Tests

  `npm run test`