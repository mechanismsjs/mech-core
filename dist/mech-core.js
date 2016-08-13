// mech-core.js
// version: 0.2.3
// author: Eric Hosick <erichosick@gmail.com> (http://www.erichosick.com/)
// license: MIT
(function() {
"use strict";

var root = this; // window (browser) or exports (server)
var m = root.m || {}; // merge with previous or new module
m._ = m._ || {}; // merge with pervious or new sub-module
m._["version-core"] = '0.2.3'; // version set through gulp build

// export module for node or the browser
if(typeof module !== 'undefined' && module.exports) {
  module.exports = m;
} else {
  root.m = m;
}

function ReduceF() {}

function reduce(algo) {
	var f = Object.create(ReduceF.prototype);
	f._a = algo;
	if (f._a && f._a.isMech) {
		f._a._parDir = f;
	}
	return f;
}
ReduceF.prototype = Object.create(Object.prototype, {
	isMech: {
		get: function() {
			return true;
		}
	},
	go: {
		enumerable: false,
		get: function() {
			if (undefined === this._a || null === this._a) {
				return undefined;
			}
			if (!this._ran) {
				// inject first emitted value into left argument
				this._a._l = undefined === this._a.r || null === this._a.r ? undefined : this._a.r.go; // TODO: add/sub/etc. changes 2nd param to undefined. So, haven't tested null yet
				this._ran = true; //
			}
			var cur = null;
			while (undefined !== cur) {
				cur = this._a.go;
				if (undefined !== cur) {
					this._a._l = cur;
				}
			}
			return this._a._l;
		}
	},
	goNum: {
		enumerable: false,
		get: function() {
			return this.go;
		}
	}
});
m.reduce = reduce;
m._.ReduceF = ReduceF;

// A number primitive that can not contain a primitive
function NumF() {}

function num(d) {
	var f = Object.create(NumF.prototype);
	f.v = (0 === arguments.length) ? 0 : d; // for same behavior as Number() == 0 and Number(undefined) == NaN
	return f;
}
NumF.prototype = Object.create(Object.prototype, {
	isMech: {
		get: function() {
			return true;
		}
	},
	isPrim: {
		get: function() {
			return true;
		}
	},
	v: {
		enumerable: false,
		get: function() {
			return this.goNum;
		},
		set: function(d) {
			if ((null === d) || (undefined === d)) {
				this._v = (undefined === d) ? NaN : 0;
			} else {
				this._v = Number(d);
				if (isNaN(this._v)) {
					if ("NaN" != d.toString()) { // retain original bad value but NOT when NaN
						this._vb = d;
					}
				}
			}
		}
	},
	unit: {
		enumerable: false,
		get: function() {
			return "";
		}
	},
	go: {
		enumerable: false,
		get: function() {
			return this.goNum;
		}
	},
	goNum: {
		enumerable: false,
		get: function() {
			return this._v;
		}
	},
	goStr: {
		enumerable: false,
		get: function() {
			return this._vb ? this._vb.toString() : this._v.toString();
		}
	},
	goArr: {
		enumerable: false,
		get: function() {
			return [this.goNum];
		}
	},
	goBool: {
		enumerable: false,
		get: function() {
			return (this.goNum > 0);
		}
	}
});
m.num = num;
m._.NumF = NumF;

// A number primitive that can contain a primitive.
function NumMF() {}

function numM(d) {
	var f = Object.create(NumMF.prototype);
	f.v = (0 === arguments.length) ? 0 : d;
	if (f._v && f._v.isMech) {
		f._v._parDir = f;
	}
	return f;
}
NumMF.prototype = Object.create(NumF.prototype, {
	v: {
		enumerable: false,
		get: function() {
			return this.goNum;
		},
		set: function(d) {
			if ((null === d) || (undefined === d)) {
				this._v = (undefined === d) ? NaN : 0;
				delete this._vb;
			} else {
				this._v = d.isMech ? d : Number(d);
				if (!this._v.isMech && isNaN(this._v)) {
					if ("NaN" != d.toString()) { // retain original bad value but NOT when NaN
						this._vb = d;
					}
				} else {
					delete this._vb;
				}
			}
		}
	},
	goNum: {
		enumerable: false,
		get: function() {
			return this._v.isMech ? this._v.goNum : this._v;
		}
	},
	goStr: {
		enumerable: false,
		get: function() {
			return this._v.isMech ? this._v.goStr : this._vb ? this._vb.toString() : this._v.toString();
		}
	},
});
m.numM = numM;
m._.NumMF = NumMF;

function StrF() {}

function str(d) {
	var f = Object.create(StrF.prototype);
	f.v = (0 === arguments.length) ? "" : d;
	return f;
}
StrF.prototype = Object.create(Object.prototype, {
	isMech: {
		get: function() {
			return true;
		}
	},
	isPrim: {
		get: function() {
			return true;
		}
	},
	v: {
		enumerable: false,
		get: function() {
			return this.goStr;
		},
		set: function(d) {
			this._v = String(d);
		}
	},
	go: {
		enumerable: false,
		get: function() {
			return this.goStr;
		}
	},
	goNum: {
		enumerable: false,
		get: function() {
			var v = this.goStr;
			switch (v) {
				case "false":
					return 0;
				case "true":
					return 1;
				default:
					return Number(v);
			}
		}
	},
	goStr: {
		enumerable: false,
		get: function() {
			return this._v;
		}
	},
	goArr: {
		enumerable: false,
		get: function() {
			return [this.goStr];
		}
	},
	goBool: {
		enumerable: false,
		get: function() {
			return (this.goNum > 0);
		}
	}
});
m.str = str;
m._.StrF = StrF;

function StrMF() {}

function strM(d) {
	var f = Object.create(StrMF.prototype);
	f.v = (0 === arguments.length) ? "" : d;
	if (f._v && f._v.isMech) {
		f._v._parDir = f;
	}
	return f;
}
StrMF.prototype = Object.create(StrF.prototype, {
	v: {
		enumerable: false,
		get: function() {
			return this.goStr;
		},
		set: function(d) {
			if ((!((null === d) || (undefined === d))) && (d.isMech)) {
				this._v = d;
			} else {
				this._v = String(d);
			}
		}
	},
	goStr: {
		enumerable: false,
		get: function() {
			return this._v.isMech ? this._v.goStr : this._v;
		}
	},
});
m.strM = strM;
m._.StrMF = StrMF;

function PropGetF() {}

function propGet(prop, item, itemGo) {
   var f = Object.create(PropGetF.prototype);
   f.prop = prop;
   if (f._prop && f._prop.isMech) {
      f._prop._parDir = f;
   }
   f.item = item;
   if (f._item && f._item.isMech) {
      f._item._parDir = f;
   }
   f.itemGo = itemGo;
   return f;
}
PropGetF.prototype = Object.create(Object.prototype, {
   isMech: {
      get: function() {
         return true;
      }
   },
   prop: {
      enumerable: false,
      get: function() {
         return this._prop.isMech ? this._prop.goStr : this._prop;
      },
      set: function(d) {
         this._prop = ((null === d) || (undefined === d)) ? "" : d;
      }
   },
   item: {
      enumerable: false,
      get: function() {
         return ((null === this._item) || (undefined === this._item)) ? null : (this._itemGo ? this._item.go : this._item);
      },
      set: function(d) {
         this._item = ((null === d) || (undefined === d)) ? null : d;
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
         var i = this.item;
         return ((null === i) || (undefined === i)) ? null : i[this.prop];
      }
   },
   goNum: {
      enumerable: false,
      get: function() {
         var i = this.go;
         return (null === i) ? NaN : Number(this.go);
      }
   },
   goStr: {
      enumerable: false,
      get: function() {
         var i = this.go;
         return (null === i) | (undefined === i) ? "" : String(this.go);
      }
   },
   goArr: {
      enumerable: false,
      get: function() {
         return [this.go];
      }
   },
   goBool: {
      enumerable: false,
      get: function() {
         return Boolean(this.go);
      }
   }
});
m.propGet = propGet;
m.p$ = propGet;
m._.PropGetF = PropGetF;

function PropSetF() {}

function propSet(prop, dest, src, itemGo) {
	var f = Object.create(PropSetF.prototype);
	f.prop = prop;
	if (f._prop.isMech) {
		f._prop._parDir = f;
	}
	f.dest = dest;
	if (f._dest && f._dest.isMech) {
		f._dest._parDir = f;
	}
	f.src = src;
	if (f._src && f._src.isMech) {
		f._src._parDir = f;
	}
	f.itemGo = itemGo;
	return f;
}
PropSetF.prototype = Object.create(Object.prototype, {
	isMech: {
		get: function() {
			return true;
		}
	},
	prop: {
		enumerable: false,
		get: function() {
			return this._prop.isMech ? this._prop.goStr : this._prop;
		},
		set: function(d) {
			this._prop = ((null === d) || (undefined === d)) ? "" : d;
		}
	},
	src: {
		enumerable: false,
		get: function() {
			return null === this._src ? null : (this._src.isMech ? this._src.go : this._src);
		},
		set: function(d) {
			this._src = ((null === d) || (undefined === d)) ? null : d;
		}
	},
	dest: {
		enumerable: false,
		get: function() {
			return this._itemGo ? (null === this._dest ? null : this._dest.go) : this._dest;
		},
		set: function(d) {
			this._dest = ((null === d) || (undefined === d)) ? null : d;
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
			var s = this.src;
			var d = this.dest;
			if (!((null === d) || (undefined === d))) {
				d[this.prop] = s;
			}
			return s;
		}
	}
});
m.propSet = propSet;
m.p$s = propSet;
m._.PropSetF = PropSetF;

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

function LoopF() {}

function loop(items, max) {
	var f = Object.create(LoopF.prototype);
	f._i = items;
	if (items && items.isMech) {
		f._i._parDir = f;
	}
	f._m = max;
	if (max && max.isMech) {
		f._m._parDir = f;
	}
	return f;
}
LoopF.prototype = Object.create(Object.prototype, {
	isMech: {
		get: function() {
			return true;
		}
	},
	go: {
		enumerable: false,
		get: function() {
			var m = (undefined === this._m) ? undefined : (this._m.isMech ? this._m.go : this._m);

			if ((undefined !== this._i) & (null !== this._i)) {
				if (undefined === m) {
					var last;
					var cur = this._i.go;
					while (undefined !== cur) {
						last = cur;
						cur = this._i.go;
					}
					return last;
				} else {
					var i = 0;
					m = m - 1;
					if (m > 0) {
						while (i < m) {
							this._i.go;
							i++;
						}
						return this._i.go;
					} else {
						return undefined;
					}
				}
			}
		}
	}
});
m.loop = loop;
m._.LoopF = LoopF;

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

function WriteLnF() {}

function writeLn(text) {
	var f = Object.create(WriteLnF.prototype);
	f.text = text;
	if (f._t && f._t.isMech) {
		f._t._parDir = f;
	}
	return f;
}
WriteLnF.prototype = Object.create(Object.prototype, {
	isMech: {
		get: function() {
			return true;
		}
	},
	text: {
		enumerable: false,
		get: function() {
			return this._t.isMech ? this._t.goStr : this._t;
		},
		set: function(d) {
			this._t = ((null === d) || (undefined === d)) ? "" : d;
		}
	},
	go: {
		enumerable: false,
		get: function() {
			return this.goStr;
		}
	},
	goStr: {
		enumerable: false,
		get: function() {
			var i = this._t.isMech ? this._t.goStr : this._t;
			console.log(i);
			return i;
		}
	},
	goNum: {
		enumerable: false,
		get: function() {
			var i = this._t.isMech ? this._t.goNum : this._t;
			i = Number(i);
			console.log(i.toString());
			return i;
		}
	}
});
m.writeLn = writeLn;
m._.WriteLnF = WriteLnF;

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


}.call(this));