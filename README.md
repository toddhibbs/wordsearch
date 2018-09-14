# wordsearch-generator
=========

Creates a wordsearch puzzle given a grid size and list of words

## Installation

  `npm install --save wordsearch-generator`

## Usage
```
  const wordsearch = require('wordsearch-generator')

  const words = ['ant', 'monkey', 'cat', 'dog', 'bald eagle']
  let puzzleGrid = wordsearch.createPuzzle(20, 20, 'en', words)
  puzzleGrid = wordsearch.hideWords(puzzleGrid, 'en')
  let lines = wordsearch.printGrid(puzzleGrid)
  for(let i = 0; i < lines.length; i++) {
    console.log(lines[i])
  }
```

## API

* createPuzzle(width, height, languageCode, words)
  - Primary function that generates the puzzle
  - languageCode such as 'en' for english
  - words is an array of strings


* hideWords(grid, languageCode)
  - Returns a new grid where each 0 element is replaced by a random letter in the given language


* printGrid(grid, space)
  - Returns an array of strings. Each string represents a row of the puzzle that is formatted with spaces
  - space is a boolean value that when true turns all 0 elements into additional spaces
  - space option only has an effect if hideWords has not been called
  - useful for printing an answer sheet to the puzzle


## Tests

  `npm run test`