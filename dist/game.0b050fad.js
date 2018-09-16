// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"parts\\lowerarm.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Lowerarm = function (_Phaser$GameObjects$C) {
	_inherits(Lowerarm, _Phaser$GameObjects$C);

	function Lowerarm(scene, config, type) {
		_classCallCheck(this, Lowerarm);

		var _this = _possibleConstructorReturn(this, (Lowerarm.__proto__ || Object.getPrototypeOf(Lowerarm)).call(this, scene, config[type + "_LOWERARM"].x, config[type + "_LOWERARM"].y));

		var right_forearm = scene.add.image(config[type + "_FOREARM"].x, config[type + "_FOREARM"].y, config.KEY, config[type + "_FOREARM"].sprite);
		right_forearm.setOrigin(0.5, 0);

		var right_hand = scene.add.image(config[type + "_HAND"].x, config[type + "_HAND"].y, config.KEY, config[type + "_HAND"].sprite);
		right_hand.setOrigin(0.5, 0);

		var right_weapon = scene.add.image(config[type + "_WEAPON"].x, config[type + "_WEAPON"].y, config.KEY, config[type + "_WEAPON"].sprite);
		right_weapon.setAngle(config[type + "_WEAPON"].angle);

		_this.add([right_weapon, right_hand, right_forearm]);

		/*Needed to bring the shield to the top*/
		if (config[type + "_WEAPON"].bringToTop) {
			_this.bringToTop(right_weapon);
		}
		return _this;
	}

	return Lowerarm;
}(Phaser.GameObjects.Container);

exports.default = Lowerarm;
},{}],"parts\\upperarm.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lowerarm = require("./lowerarm.js");

var _lowerarm2 = _interopRequireDefault(_lowerarm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Upperarm = function (_Phaser$GameObjects$C) {
	_inherits(Upperarm, _Phaser$GameObjects$C);

	function Upperarm(scene, config, type) {
		_classCallCheck(this, Upperarm);

		var _this = _possibleConstructorReturn(this, (Upperarm.__proto__ || Object.getPrototypeOf(Upperarm)).call(this, scene, config[type + "_ARM"].x, config[type + "_ARM"].y));

		var right_shoulder = scene.add.image(config[type + "_SHOULDER"].x, config[type + "_SHOULDER"].y, config.KEY, config[type + "_SHOULDER"].sprite);
		right_shoulder.setOrigin(0.5, 0.5);

		var right_upperarm = scene.add.image(config[type + "_BISCEP"].x, config[type + "_BISCEP"].y, config.KEY, config[type + "_BISCEP"].sprite);
		right_upperarm.setOrigin(1, 0).setAngle(config[type + "_BISCEP"].angle);

		var arm = new _lowerarm2.default(scene, config, type);

		_this.add([arm, right_upperarm, right_shoulder]);
		return _this;
	}

	return Upperarm;
}(Phaser.GameObjects.Container);

exports.default = Upperarm;
},{"./lowerarm.js":"parts\\lowerarm.js"}],"parts\\upperbody.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
		value: true
});

var _upperarm = require('./upperarm.js');

var _upperarm2 = _interopRequireDefault(_upperarm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Upperbody = function (_Phaser$GameObjects$C) {
		_inherits(Upperbody, _Phaser$GameObjects$C);

		function Upperbody(scene, config) {
				_classCallCheck(this, Upperbody);

				var _this = _possibleConstructorReturn(this, (Upperbody.__proto__ || Object.getPrototypeOf(Upperbody)).call(this, scene, config.UPPER_BODY.x, config.UPPER_BODY.y));

				var torso = scene.add.image(config.TORSO.x, config.TORSO.y, config.KEY, config.TORSO.sprite);

				var rightarm = new _upperarm2.default(scene, config, 'RIGHT');

				var leftarm = new _upperarm2.default(scene, config, 'LEFT');

				_this.add([torso, rightarm, leftarm]);
				return _this;
		}

		return Upperbody;
}(Phaser.GameObjects.Container);

exports.default = Upperbody;
},{"./upperarm.js":"parts\\upperarm.js"}],"parts\\leg.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Leg = function (_Phaser$GameObjects$C) {
	_inherits(Leg, _Phaser$GameObjects$C);

	function Leg(scene, config, type) {
		_classCallCheck(this, Leg);

		var _this = _possibleConstructorReturn(this, (Leg.__proto__ || Object.getPrototypeOf(Leg)).call(this, scene, config[type + "_LEG"].x, config[type + "_LEG"].y));

		var right_thigh = scene.add.image(config[type + "_THIGH"].x, config[type + "_THIGH"].y, config.KEY, config[type + "_THIGH"].sprite);

		var right_shin = scene.add.image(config[type + "_SHIN"].x, config[type + "_SHIN"].y, config.KEY, config[type + "_SHIN"].sprite);

		var right_foot = scene.add.image(config[type + "_FOOT"].x, config[type + "_FOOT"].y, config.KEY, config[type + "_FOOT"].sprite);

		_this.add([right_foot, right_shin, right_thigh]).setAngle(config[type + "_LEG"].angle);
		return _this;
	}

	return Leg;
}(Phaser.GameObjects.Container);

exports.default = Leg;
},{}],"parts\\lowerbody.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _leg = require('./leg.js');

var _leg2 = _interopRequireDefault(_leg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Lowerbody = function (_Phaser$GameObjects$C) {
	_inherits(Lowerbody, _Phaser$GameObjects$C);

	function Lowerbody(scene, config) {
		_classCallCheck(this, Lowerbody);

		var _this = _possibleConstructorReturn(this, (Lowerbody.__proto__ || Object.getPrototypeOf(Lowerbody)).call(this, scene, config.LOWER_BODY.x, config.LOWER_BODY.y));

		var leftleg = new _leg2.default(scene, config, 'LEFT');
		var rightleg = new _leg2.default(scene, config, 'RIGHT');

		_this.add([rightleg, leftleg]);
		return _this;
	}

	return Lowerbody;
}(Phaser.GameObjects.Container);

exports.default = Lowerbody;
},{"./leg.js":"parts\\leg.js"}],"parts\\fullbody.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _upperbody = require('./upperbody.js');

var _upperbody2 = _interopRequireDefault(_upperbody);

var _lowerbody = require('./lowerbody.js');

var _lowerbody2 = _interopRequireDefault(_lowerbody);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Fullbody = function (_Phaser$GameObjects$C) {
	_inherits(Fullbody, _Phaser$GameObjects$C);

	function Fullbody(scene, x, y) {
		_classCallCheck(this, Fullbody);

		var _this = _possibleConstructorReturn(this, (Fullbody.__proto__ || Object.getPrototypeOf(Fullbody)).call(this, scene, x, y));

		var config = scene.cache.json.get('partsConfig');

		var head = scene.add.image(config.HEAD.x, config.HEAD.y, config.KEY, config.HEAD.sprite);

		var upper = new _upperbody2.default(scene, config);

		var lower = new _lowerbody2.default(scene, config);

		_this.add([lower, upper, head]);
		return _this;
	}

	return Fullbody;
}(Phaser.GameObjects.Container);

exports.default = Fullbody;

/***
	let head = scene.add.image(config.Fullbody.head.x,
		config.Fullbody.head.y,'key','parts_head.png');

	let upper = new upperbody(scene,config.Fullbody.upper.x,
		config.Fullbody.upper.y);

	let lower = new lowerbody(scene,config.Fullbody.lower.x,
		config.Fullbody.lower.y);
***/
},{"./upperbody.js":"parts\\upperbody.js","./lowerbody.js":"parts\\lowerbody.js"}],"game.js":[function(require,module,exports) {
'use strict';

var _fullbody = require('./parts/fullbody.js');

var _fullbody2 = _interopRequireDefault(_fullbody);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var gameScene = new Phaser.Scene('game');

var config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	physics: {
		default: 'matter',
		matter: {
			debug: true,
			setBounds: {
				width: 800,
				height: 600
			},
			gravity: {
				y: 0
			}
		}
	},
	scene: gameScene
};

var game = new Phaser.Game(config);

gameScene.preload = function () {
	this.load.atlas('key', './spritesheet.png', './spritesheet.json');
	this.load.json('partsConfig', './config.json');
};

gameScene.create = function () {
	var x = this.add.container(100, 100);
	x.add([new _fullbody2.default(this, 0, 0)]);
	//  console.log(scene.cache.json.get('partsConfig'));

	// let newChar = new fullbody(this,0,0);
};
},{"./parts/fullbody.js":"parts\\fullbody.js"}],"node_modules\\parcel-bundler\\src\\builtins\\hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '53949' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();

      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["node_modules\\parcel-bundler\\src\\builtins\\hmr-runtime.js","game.js"], null)
//# sourceMappingURL=/game.0b050fad.map