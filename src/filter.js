function FilterF() {}

function filter(algo) {
	var f = Object.create(FilterF.prototype);
	f._a = algo;
	if (f._a && f._a.isMech) {
		f._a._parDir = f;
	}
	return f;
}
FilterF.prototype = Object.create(Object.prototype, {
	isMech: {
		get: function() {
			return true;
		}
	},
	fv: {
		get: function() {
			return this._fv;
		},
		set: function(d) {
			this._fv = d;
		}
	},
	go: {
		get: function() {
			if (undefined === this._a || null === this._a) {
				return this._a;
			}
			var r = this._a.goBool;
			while (!r) {
				r = this._a.goBool;
			}
			return this._fv; // _fv could be emitter or _fv set by behavior ran when this._a.goBool is invoked
		}
	},
	goNum: {
		get: function() {
			return this.go;
		}
	},
	goStr: {
		get: function() {
			var r = this.go;
			return undefined === r || null === r ? r : r.toString();
		}
	},
	goArr: {
		get: function() {
			return [this.go]; // TODO: Check if go has already returned an array.
		}
	},
	goBool: {
		get: function() {
			return 0 < this.go; // TODO: Check other possible results (like string "true" and "false")
		}
	}
});
m.filter = filter;
m._.FilterF = FilterF;
