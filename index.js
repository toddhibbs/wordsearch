/*
*   File:       index.js
*   Project:    word search generator
*   Date:       September 2018
*
*   Author:      Todd Hibbs
*
*   Description: Generates a word search puzzle given a grid size and a list of words
*                The words can appear forward or backward in either a horizontal, vertical, or diagonal
*                direction.
*/

import _ from 'lodash'
const LANGUAGES = {
  'en': 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter => letter.toUpperCase()),
  'es': 'abcdefghijklmnñopqrstuvwxyz'.split('').map(letter => letter.toUpperCase())
}

const printGrid = (grid, space) => {
  let lines = []
  _.each(grid, row => {
    let r = row.join(' ')
    if (space) {
      r = r.replace(/0/gi, ' ')
    }
    //console.log(r)
    lines.push(r)
  })
  return lines
}
const initializeGrid = (width, height) => {
  let grid = []
  for(let i = 0; i < height; i++) {
    grid.push(_.fill(Array(width), 0))
  }
  return grid
}
const cloneGrid = (grid) => {
  let _grid = []
  grid.forEach(row => _grid.push(row.slice(0)))
  return _grid
}
const hideWords = (grid, languageCode) => {
  let alphabet = LANGUAGES[languageCode]
  let _grid = cloneGrid(grid)
  for(let i = 0; i < _grid.length; i++) {
    for (let j = 0; j < _grid[i].length; j++) {
      if (_grid[i][j] == 0) {
        let alphabetIndex = getRandomIntInclusive(0, alphabet.length - 1)
        let letter = alphabet[alphabetIndex]
        // console.log('alphabetIndex', alphabetIndex, 'letter', letter)
        _grid[i][j] = letter
      }
    }
  }
  return _grid
}
const reverseWord = (word) => _.reverse(word.split('')).join('')
const cleanWord = (word) => word.split(' ').join('')
const cleanWordsList = (words) => words.map(cleanWord).map(w => w.toUpperCase())
const sortWordsByLength = (words) => {
  let _words = words
  return _words.sort((w1, w2) => w2.length - w1.length )
}
const minColumnIndex = () => 0
const maxColumnIndex = (grid, word) => {
  // maximum starting column index
  const wordLength = word.length
  const gridWidth = grid[0].length
  if (wordLength > gridWidth) {
    throw "Grid Width is too narrow for the given word: " + word
  }
  return gridWidth - wordLength 
}
const minRowIndex = () => 0
const maxRowIndex = (grid, word) => {
  // maximum starting row index
  const wordLength = word.length
  const gridHeight = grid.length
  if (wordLength > gridHeight) {
    throw "Grid Height is too short for the given word: " + word
  }
  return gridHeight - wordLength
}
const minimumGridSize = (wordList) => cleanWordsList(wordList).map(w => w.length).reduce((a, c) => Math.max(a, c))
const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max))
const getRandomIntInclusive = (min, max) => {
  const _min = Math.ceil(min)
  const _max = Math.floor(max)
  return Math.floor(Math.random() * (_max - _min + 1)) + _min
}
const getRandomBool = () => !!getRandomInt(2)
const getRandomDirection = () => {
  const directions = [
    'horizontal',
    'vertical',
    'diagonal'
  ]
  return directions[getRandomIntInclusive(0, 2)]
}

const canPlaceWord = (grid, word, row, column, direction) => {
  let _grid = cloneGrid(grid)

  for (let i = 0; i < word.length; i++) {
    let r = row
    let c = column
    if (direction == 'vertical' || direction == 'diagonal') {
      r += i
    }
    if (direction == 'horizontal' || direction == 'diagonal') {
      c += i
    }

    let cell = _grid[r][c]
    if (cell != 0 && word[i] != cell) {
      //collision detected
      return false
    }
    // _grid[r][c] = word[i]
  }
  //made it to the end with no collisions
  return true
}
const placeWord = (grid, word, row, column, direction) => {
  //returns a new grid with the word placed in the specified location
  let _grid = grid

  for (let i = 0; i < word.length; i++) {
    let r = row
    let c = column
    if (direction == 'vertical' || direction == 'diagonal') {
      r += i
    }
    if (direction == 'horizontal' || direction == 'diagonal') {
      c += i
    }
    _grid[r][c] = word[i]
  }
  return _grid
}

/* This function is potentially called recursively until a valid location for the word 
*  within the grid is located. To prevent stack overflow situations, arbitrary limites are set
*  on the number of times it can be called
*/

const placeWordRandom = (grid, word, counter) => {
  // console.log('placeWordRandom', 'word', word, 'counter', counter)
  if (counter > 1000) {
    throw 'Unable to find any location for this word. Try increasing grid size'
  }
  const isBackward = getRandomBool()
  const rowIndex = getRandomIntInclusive(minRowIndex(), maxRowIndex(grid, word))
  const columnIndex = getRandomIntInclusive(minColumnIndex(), maxColumnIndex(grid, word))
  const direction = getRandomDirection()

  let _grid = cloneGrid(grid)
  let _word = isBackward ? reverseWord(word) : word

  // NOTE: it might be smarter to try to find overlaps. this implementation simply brute forces a place
  // to put the word by checking many possible locations. The smaller the grid, the more difficult this is

  let wordPlaced = false
  let tryCount = 0
  while (!wordPlaced && tryCount < 1000) {
    if (canPlaceWord(_grid, _word, rowIndex, columnIndex, direction)) {
      _grid = placeWord(_grid, _word, rowIndex, columnIndex, direction)
      wordPlaced = true
    }
    tryCount++
  }
  if (!wordPlaced) {
    // console.log('trying in different random position:', word)
    _grid = placeWordRandom(_grid, word, ++counter)
  }

  return _grid
}

const createPuzzle = (width, height, languageCode, words) => {
  let _wordList = sortWordsByLength(cleanWordsList(words))
  let minimumGrid = minimumGridSize(_wordList)
  
  //expand grid if needed
  // let gridWidth = minimumGrid > gridWidth ? minimumGrid * 2 : gridWidth
  // let gridHeight = minimumGrid > gridHeight ? minimumGrid * 2 : gridHeight
  
  let grid = initializeGrid(width, height)
  
  _wordList.forEach(w => {
    grid = placeWordRandom(grid, w, 0)
  })
  return grid
}

module.exports = {
  createPuzzle, 
  printGrid, 
  initializeGrid, 
  cloneGrid, 
  hideWords, 
  reverseWord,
  cleanWord,
  cleanWordsList,
  sortWordsByLength,
  minColumnIndex,
  maxColumnIndex,
  minRowIndex,
  maxRowIndex,
  minimumGridSize,
  getRandomInt,
  getRandomIntInclusive,
  getRandomBool,
  getRandomDirection,
  canPlaceWord,
  placeWord,
  placeWordRandom,
  LANGUAGES
}
