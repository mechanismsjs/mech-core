function ParPropSetF() {}

function parentPropSet(prop, src, itemGo) {
	var f = Object.create(ParPropSetF.prototype);
	f.prop = prop;
	if (f._prop.isMech) {
		f._prop._parDir = f;
	}
	f.src = src;
	if (f._src && f._src.isMech) {
		f._src._parDir = f;
	}
	f.itemGo = itemGo;
	return f;
}
ParPropSetF.prototype = Object.create(Object.prototype, {
	isMech: {
		get: function() {
			return true;
		}
	},
	parLogGet: {
		enumerable: false,
		get: function() {
			if (undefined === this._parCache) {
				var cur = this._parDir; // TODO: Warning when immediate parDir is empty. Does that matter though?
				var pf = this.prop;
				while (undefined !== cur && (!(pf in cur))) {
					cur = cur._parDir;
				}
				this._parCache = cur;
			}
			return this._parCache;
		}
	},
	prop: {
		enumerable: false,
		get: function() {
			return this._prop.isMech ? this._prop.goStr : this._prop;
		},
		set: function(d) {
			this._prop = null === d || undefined === d ? "" : d;
		}
	},
	src: {
		enumerable: false,
		get: function() {
			return this._src;
		},
		set: function(d) {
			this._src = null === d || undefined === d ? null : d;
		}
	},
	itemGo: {
		enumerable: false,
		get: function() {
			return this._itemGo;
		},
		set: function(d) {
			this._itemGo = ((null === d) || (undefined === d)) ? true : d;
		}
	},
	go: {
		enumerable: false,
		get: function() {
			var cur = this.parLogGet;
			var s = null === this._src ? null : (this._src.isMech && this.itemGo ? this._src.go : this._src);
			if (cur) {
				var pf = this.prop;
				cur[pf] = s;
			}
			return s;
		}
	},
	goNum: {
		enumerable: false,
		get: function() {
			var cur = this.parLogGet;
			var s = null === this._src ? null : (this._src.isMech && this.itemGo ? this._src.goNum : this._src);
			if (cur) {
				var pf = this.prop;
				cur[pf] = s;
			}
			return s;
		}
	},
	goStr: {
		enumerable: false,
		get: function() {
			var cur = this.parLogGet;
			var s = null === this._src ? null : (this._src.isMech && this.itemGo ? this._src.goNum : this._src);
			if (cur) {
				var pf = this.prop;
				cur[pf] = s;
			}
			return s;
		}
	},
	goArr: {
		enumerable: false,
		get: function() {
			var cur = this.parLogGet;
			var s = null === this._src ? null : (this._src.isMech && this.itemGo ? this._src.goNum : this._src); // TODO: Create arrM type and test this including && this.itemGo
			if (cur) {
				var pf = this.prop;
				cur[pf] = s;
			}
			return s;
		}
	},
	goBool: {
		enumerable: false,
		get: function() {
			var cur = this.parLogGet;
			var s = null === this._src ? null : (this._src.isMech && this.itemGo ? this._src.goNum : this._src); // TODO: Create boolM type and test this including && this.itemGo
			if (cur) {
				var pf = this.prop;
				cur[pf] = s;
			}
			return s;
		}
	}

});
m.parentPropSet = parentPropSet;
m._.ParPropSetF = ParPropSetF;
