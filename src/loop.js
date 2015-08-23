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

			if (undefined != this._i) {
				if (undefined === m) {
					var last = undefined;
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