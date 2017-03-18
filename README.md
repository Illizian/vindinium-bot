[![npm version](https://badge.fury.io/js/vindinium-helper.svg)](https://www.npmjs.com/package/vindinium-helper) [![Build Status](https://travis-ci.org/Illizian/vindinium-helper.svg)](https://travis-ci.org/Illizian/vindinium-helper) [![Codacy Badge](https://www.codacy.com/project/badge/f752bef14d5a42cbbb4d96facc37d9da)](https://www.codacy.com/app/alex_6/vindinium-helper)

# Vindinium Helper

[illizian.github.io/vindinium-helper/](https://illizian.github.io/vindinium-helper/)

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
    var intel = new helper.Intel(state.game, state.hero);
    var board = new helper.Board(state.game.board);

    board.printMap();
};
```

## API

Please see ```docs/```