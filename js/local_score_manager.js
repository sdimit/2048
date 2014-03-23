window.fakeStorage = {
  _data: {},

  setItem: function (id, val) {
    return this._data[id] = String(val);
  },

  getItem: function (id) {
    return this._data.hasOwnProperty(id) ? this._data[id] : undefined;
  },

  removeItem: function (id) {
    return delete this._data[id];
  },

  clear: function () {
    return this._data = {};
  }
};

function LocalScoreManager() {
  this.bestScoreKey     = "bestScore";
  this.gameStatesKey    = "gameStates";

  var supported = this.localStorageSupported();
  this.storage = supported ? window.localStorage : window.fakeStorage;
}

LocalScoreManager.prototype.localStorageSupported = function () {
  var testKey = "test";
  var storage = window.localStorage;

  try {
    storage.setItem(testKey, "1");
    storage.removeItem(testKey);
    return true;
  } catch (error) {
    return false;
  }
};

LocalScoreManager.prototype.getBestScore = function () {
  return this.storage.getItem(this.bestScoreKey) || 0;
};

LocalScoreManager.prototype.setBestScore = function (score) {
  this.storage.setItem(this.bestScoreKey, score);
};

LocalScoreManager.prototype.getGameStates = function () {
  var gameStates = JSON.parse(this.storage.getItem(this.gameStatesKey));
  if (!gameStates) gameStates = new Array();
  return gameStates;
}

LocalScoreManager.prototype.pushState = function (newState) {
  var gameStates = this.getGameStates();
      gameStates.push(newState);
  this.storage.setItem(this.gameStatesKey, JSON.stringify(gameStates));
};

LocalScoreManager.prototype.popState = function (state) {
  var gameStates = this.getGameStates();
      gameStates.pop();
  this.storage.setItem(this.gameStatesKey, JSON.stringify(gameStates));
};

LocalScoreManager.prototype.curState = function (state) {
  var gameStates = this.getGameStates();
  return gameStates.pop();
};

LocalScoreManager.prototype.numOfStates = function (state) {
  var gameStates = this.getGameStates();
  return gameStates.length;
};

LocalScoreManager.prototype.clearState = function () {
  this.storage.removeItem(this.gameStatesKey);
};
