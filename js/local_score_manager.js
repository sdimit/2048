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
  this.scoreKey         = "score";
  this.tilesKey         = "tiles";
  this.undoStateKey     = "undoState";

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

LocalScoreManager.prototype.getScore = function () {
  return parseInt(this.storage.getItem(this.scoreKey)) || 0;
};

LocalScoreManager.prototype.setScore = function (score) {
  this.storage.setItem(this.scoreKey, score);
};

LocalScoreManager.prototype.getTiles = function () {
  return JSON.parse(this.storage.getItem(this.tilesKey)) || null;
};

LocalScoreManager.prototype.setTiles = function (tiles) {
  this.storage.setItem(this.tilesKey, JSON.stringify(tiles));
};

LocalScoreManager.prototype.clearState = function () {
  this.storage.removeItem(this.undoStateKey);
  this.storage.removeItem(this.tilesKey);
  this.storage.removeItem(this.scoreKey);

};
