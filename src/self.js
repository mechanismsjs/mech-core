function SelfF() {}

function self(self) {
  var f = Object.create(SelfF.prototype);
  f._self = self;
  return f;
}
SelfF.prototype = Object.create(Object.prototype, {
  isMech: {
    get: function() {
      return true;
    }
  },
  self: {
    get: function() {
      return this._self;
    }
  },
  go: {
    get: function() {
      return this._self;
    }
  }
});
m.self = self;
m._.SelfF = SelfF;
