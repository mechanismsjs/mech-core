function ReduceF(){};
function reduce(algo,max) {
   var f = Object.create(ReduceF.prototype);
   f._a = algo;
   f._cache = null;
   f._max = ((null == max) || (undefined == max)) ? 1000 : max;
   return f;
};
ReduceF.prototype = Object.create(Object.prototype, {
   isMech: { get: function() { return true; }},
   // go: { get: function() {
   //    if ( null === this._cache) {
   //       var algo = this._a;
   //       var isMechanism = algo.isMech;
   //       var max = this._max.isMech ? this._max.go : this._max;
   //       this._cache = [];
   //       var cur = isMechanism ? algo.go : algo;
   //       var i = 0;
   //       while ((undefined !== cur) && ( i < max)) {
   //          this._cache[i++] = cur;
   //          cur = isMechanism ? algo.go : algo;
   //       }
   //    }
   //    return this._cache;
   // }},
   // goNum: { get: function() { return this.go; }},
   // goArr: { get: function() { return this.go; }}
});
m.reduce = reduce;
m._.ReduceF = ReduceF;