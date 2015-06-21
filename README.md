[![npm version](https://badge.fury.io/js/vindinium-helper.svg)](https://www.npmjs.com/package/vindinium-helper) [![Build Status](https://travis-ci.org/Illizian/vindinium-helper.svg)](https://travis-ci.org/Illizian/vindinium-helper)

# Vindinium Helper

A javascript helper library for building Vindinium bots

## Installation

```
$ npm install vindinium-helper --save
```

## Usage

Load the library
```javascript
var helper = require('vindinium-helper');
```

Then pass the game state objects to the provided Classes. E.g. when using [stephank/vindinium-client](https://github.com/stephank/vindinium-client)

```javascript
function bot(state, callback) {
    var intel = new helper.Intel(state);
    var board = new helper.Board(state.game.board);

    board.printMap();
};
```

## API

Please see ```docs/```