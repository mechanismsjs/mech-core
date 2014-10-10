function DivF(){};
function div(left,right) {
   var f = Object.create(DivF.prototype);
   f.l = (arguments.length == 0) ? 0 : left;
   f.r = (arguments.length <= 1) ? 0 : right;
   return f;
};
DivF.prototype = Object.create(DualArgF.prototype, {
   goNum: { get: function() { return this._l.goNum / this._r.goNum; } },
   goStr: { get: function() { return "(" + this._l.goStr + " / " + this._r.goStr + ")"; } }
});
m.div = div;
m.DivF = DivF;