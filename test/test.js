'use strict';

const expect = require('chai').expect;
const wordsearch = require('../bin/index.js');

const words = [
  'fish',
  'dog',
  'cat',
  'hippopotomus',
  'lion',
  'tiger',
  'alligator',
  'crocodile',
  'monkey',
  'giraffe',
  'gazelle',
  'orangutan',
  'lemur',
  'shark',
  'whale',
  'shrimp',
  'seal',
  'sea lion',
  'bear',
  'salmon',
  'crab',
  'lizard',
  'spider'
]

describe('wordsearch generator helpers', function() {

  it('should correctly initialize a grid', function() {
    const result = wordsearch.initializeGrid(20, 20)
    expect(result).with.lengthOf(20)
    expect (result[0]).with.lengthOf(20)
  })

  it('should correctly clone a grid', function() {
    let initial = wordsearch.initializeGrid(20, 20)
    let result = wordsearch.cloneGrid(initial)
    expect(result).with.lengthOf(20)
    expect(result[0]).with.lengthOf(20)
    result[0][0] = 'X'
    expect(result[0][0]).to.equal('X')
    expect(initial[0][0]).to.equal(0)
  })

  it('should correctly reverse a word', function() {
    const initial = 'monkey'
    const result = wordsearch.reverseWord(initial)
    expect(result).to.equal('yeknom')
  })

  it('should correctly clean a word of whitespace', function() {
    const initial = 'spider monkey'
    const result = wordsearch.cleanWord(initial)
    expect(result).to.equal('spidermonkey')
  })

  it('should clean and capitalize an array of words', function() {
    const initial = ['ant', 'monkey', 'spider monkey', 'bald eagle']
    const result = wordsearch.cleanWordsList(initial)
    expect(result.length).to.equal(4)
    expect(result[0]).to.equal('ANT')
    expect(result[1]).to.equal('MONKEY')
    expect(result[2]).to.equal('SPIDERMONKEY')
    expect(result[3]).to.equal('BALDEAGLE')
  })

  it('should sort an array of words by length. longest first', function() {
    const initial = ['ant', 'monkey', 'spider monkey', 'bald eagle']
    const result = wordsearch.sortWordsByLength(initial)
    expect(result[0]).to.equal('spider monkey')
    expect(result[1]).to.equal('bald eagle')
    expect(result[2]).to.equal('monkey')
    expect(result[3]).to.equal('ant')
  })

  it('should correctly calculate maximum starting column for a word', function() {
    const WIDTH = 20
    const HEIGHT = 20
    const grid = wordsearch.initializeGrid(WIDTH, HEIGHT)
    const initial = 'monkey'
    const result = wordsearch.maxColumnIndex(grid, initial)
    expect(result).to.equal(WIDTH - initial.length)
  })

  it('should correctly calculate maximum starting row for a word', function() {
    const WIDTH = 20
    const HEIGHT = 20
    const grid = wordsearch.initializeGrid(WIDTH, HEIGHT)
    const initial = 'monkey'
    const result = wordsearch.maxRowIndex(grid, initial)
    expect(result).to.equal(HEIGHT - initial.length)
  })

  it('should correctly calculate the minimum theoretical grid size to hold a given word', function() {
    const initial = ['ant', 'monkey', 'spider monkey', 'bald eagle']
    const result = wordsearch.minimumGridSize(initial)
    expect(result).to.equal(12, 'SPIDERMONKEY needs at least a grid size of 12')
  })

  it ('should correctly create random integer up to a max value', function() {
    for(let i = 0; i < 1000; i++) {
      //through 1,000 iterations, ensure we never end up with anything above our max or below zero
      let result = wordsearch.getRandomInt(10)
      expect(result).to.be.above(-1).and.to.be.below(10)
    }
  })

  it ('should correctly create random integer within an inclusive range', function() {
    for(let i = 0; i < 1000; i++) {
      //through 1,000 iterations, ensure we never end up with anything above our max or below zero
      let result = wordsearch.getRandomIntInclusive(3, 9)
      expect(result).to.be.above(2).and.to.be.below(10)
    }
  })

  it ('should create random boolean values', function() {
    let hasTrue = false
    let hasFalse = false

    let counter = 0
    while((!hasTrue || !hasFalse) && counter < 1000) {
      //through up to 1,000 iterations, ensure we get both true and false values
      let result = wordsearch.getRandomBool()
      if (result) { 
        hasTrue = true 
      }
      else {
        hasFalse = true
      }
      counter++
    }
    expect(hasTrue).to.equal(true)
    expect(hasFalse).to.equal(true)
  })

  it ('should select all possible directions given enough random chances', function() {
    let hasHorizontal = false
    let hasVertical = false
    let hasDiagonal = false

    let counter = 0
    while ((!hasHorizontal || !hasVertical || !hasDiagonal) && counter < 1000) {
      let result = wordsearch.getRandomDirection()
      switch(result) {
        case 'horizontal':
          hasHorizontal = true
          break
        case 'vertical':
          hasVertical = true
          break
        case 'diagonal':
          hasDiagonal = true
          break
      }
      counter++
    }
    expect(hasHorizontal).to.equal(true)
    expect(hasVertical).to.equal(true)
    expect(hasDiagonal).to.equal(true)
  })

  it('should correctly detect that a word can be placed horizontally in the grid', function() {
    const grid = wordsearch.initializeGrid(20, 20)
    const result = wordsearch.canPlaceWord(grid, 'monkey', 0, 0, 'horizontal')
    expect(result).to.equal(true)
  })

  it('should correctly detect that a word can be placed vertically in the grid', function() {
    const grid = wordsearch.initializeGrid(20, 20)
    const result = wordsearch.canPlaceWord(grid, 'monkey', 0, 0, 'vertical')
    expect(result).to.equal(true)
  })

  it('should correctly detect that a word can be placed diagonally in the grid', function() {
    const grid = wordsearch.initializeGrid(20, 20)
    const result = wordsearch.canPlaceWord(grid, 'monkey', 0, 0, 'diagonal')
    expect(result).to.equal(true)
  })

  it('should correctly detect that a word can NOT be placed horizontally in the grid', function() {
    let grid = wordsearch.initializeGrid(20, 20)
    grid[0][0] = 'X'
    const result = wordsearch.canPlaceWord(grid, 'monkey', 0, 0, 'horizontal')
    expect(result).to.equal(false)
  })

  it('should correctly detect that a word can NOT be placed vertically in the grid', function() {
    let grid = wordsearch.initializeGrid(20, 20)
    grid[0][0] = 'X'
    const result = wordsearch.canPlaceWord(grid, 'monkey', 0, 0, 'vertical')
    expect(result).to.equal(false)
  })

  it('should correctly detect that a word can NOT be placed diagonally in the grid', function() {
    let grid = wordsearch.initializeGrid(20, 20)
    grid[0][0] = 'X'
    const result = wordsearch.canPlaceWord(grid, 'monkey', 0, 0, 'diagonal')
    expect(result).to.equal(false)
  })

  it('should correctly place a word in the grid horizontally', function() {
    let grid = wordsearch.initializeGrid(20, 20)
    grid = wordsearch.placeWord(grid, 'MONKEY', 0, 0, 'horizontal')
    expect(grid[0][0]).to.equal('M')
    expect(grid[0][1]).to.equal('O')
    expect(grid[0][2]).to.equal('N')
    expect(grid[0][3]).to.equal('K')
    expect(grid[0][4]).to.equal('E')
    expect(grid[0][5]).to.equal('Y')
  })

  it('should correctly place a word in the grid vertically', function() {
    let grid = wordsearch.initializeGrid(20, 20)
    grid = wordsearch.placeWord(grid, 'MONKEY', 0, 0, 'vertical')
    expect(grid[0][0]).to.equal('M')
    expect(grid[1][0]).to.equal('O')
    expect(grid[2][0]).to.equal('N')
    expect(grid[3][0]).to.equal('K')
    expect(grid[4][0]).to.equal('E')
    expect(grid[5][0]).to.equal('Y')
  })

  it('should correctly place a word in the grid diagonally', function() {
    let grid = wordsearch.initializeGrid(20, 20)
    grid = wordsearch.placeWord(grid, 'MONKEY', 0, 0, 'diagonal')
    expect(grid[0][0]).to.equal('M')
    expect(grid[1][1]).to.equal('O')
    expect(grid[2][2]).to.equal('N')
    expect(grid[3][3]).to.equal('K')
    expect(grid[4][4]).to.equal('E')
    expect(grid[5][5]).to.equal('Y')
  })

  it('should randomly place a word in the grid', function() {
    let grid = wordsearch.initializeGrid(20, 20)
    grid = wordsearch.placeWordRandom(grid, 'KITTEN', 0)

    //make sure we have all of the required letters in the grid somewhere
    let letterCounts = {'K': 0, 'I': 0, 'T': 0, 'E': 0, 'N': 0}
    grid.forEach(row => row.forEach(column => letterCounts[column]++))
    expect(letterCounts.K).to.equal(1)
    expect(letterCounts.I).to.equal(1)
    expect(letterCounts.T).to.equal(2)
    expect(letterCounts.E).to.equal(1)
    expect(letterCounts.N).to.equal(1)
  })

  it('should generate a complete puzzle', function() {
    let grid = wordsearch.createPuzzle(20, 20, 'en', words)
    let wordString = wordsearch.cleanWordsList(words).join('').concat(' ').concat(0)
    // wordsearch.printGrid(grid, false)
    grid.forEach(row => 
      row.forEach(column => {
        expect(wordString.indexOf(column)).to.be.greaterThan(-1, column)
      })
    )
  })

  it('should be able to obfuscate the puzzle with random letters', function() {
    let grid = wordsearch.createPuzzle(20, 20, 'en', words)
    grid = wordsearch.hideWords(grid, 'en')
    //count how many parts of the grid still have 0. There should not be any.
    let zeroCount = 0
    grid.forEach(row => row.forEach(column => {
      if (column == 0) {
        zeroCount += 1
      }
    }))
    expect(zeroCount).to.equal(0)
  })

  it('should return an array of strings ready for printing', function() {
    let grid = wordsearch.createPuzzle(20, 20, 'en', words)
    let rows = wordsearch.printGrid(grid, true)
    rows.forEach(function(r) {
      console.log(r)
    })
  })

});
