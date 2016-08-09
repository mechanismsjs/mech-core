function MapF() {}

function map(algo, max) {
	var f = Object.create(MapF.prototype);
	f._a = algo;
	if (f._a && f._a.isMech) {
		f._a._parDir = f;
	}
	f._cache = null;
	f._max = ((null === max) || (undefined === max)) ? 1000 : max;
	if (f._max && f._max.isMech) {
		f._max._parDir = f;
	}
	return f;
}
MapF.prototype = Object.create(Object.prototype, {
	isMech: {
		get: function() {
			return true;
		}
	},
	go: {
		get: function() {
			if (null === this._cache) {
				var algo = this._a;
				var isMechanism = algo.isMech;
				var max = this._max.isMech ? this._max.go : this._max;
				this._cache = [];
				var cur = isMechanism ? algo.go : algo;
				var i = 0;
				while ((undefined !== cur) && (i < max)) {
					this._cache[i++] = cur;
					cur = isMechanism ? algo.go : algo;
				}
			}
			return this._cache;
		}
	},
	goNum: {
		get: function() {
			return this.go;
		}
	},
	goArr: {
		get: function() {
			return this.go;
		}
	}
});
m.map = map;
m._.MapF = MapF;
