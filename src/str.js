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
