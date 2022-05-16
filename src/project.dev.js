window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  Animation: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "81ea2wkz7RMbZ3YjrDhbAHD", "Animation");
    "use strict";
    var Emitter = require("mEmitter");
    cc.Class({
      extends: cc.Component,
      properties: {
        Skeleton: sp.Skeleton,
        Bullet: cc.Prefab,
        _jump: null,
        _slide: null,
        _moveLeft: null,
        _moveRight: null,
        _shoot: null,
        _flag: false
      },
      onCollisionEnter: function onCollisionEnter(other, self) {
        cc.log(self);
        cc.log(other);
        this.Skeleton.setAnimation(0, "death", false);
        this.node.stopActionByTag(0);
      },
      onLoad: function onLoad() {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = true;
        manager.enabledDrawBoundingBox = true;
        this._jump = this.jump.bind(this);
        this._slide = this.slide.bind(this);
        this._moveRight = this.moveRight.bind(this);
        this._moveLeft = this.moveLeft.bind(this);
        this._shoot = this.shoot.bind(this);
        Emitter.instance = new Emitter();
        Emitter.instance.registerEvent("keyup_down", this._jump);
        Emitter.instance.registerEvent("keydown_up", this._slide);
        Emitter.instance.registerEvent("keyright_down", this._moveRight);
        Emitter.instance.registerEvent("keyright_up", this._moveRight);
        Emitter.instance.registerEvent("keyleft_down", this._moveLeft);
        Emitter.instance.registerEvent("keyleft_up", this._moveLeft);
        Emitter.instance.registerEvent("keyspace_down", this._shoot);
      },
      shoot: function shoot(value) {
        cc.log(value);
        var bullet = cc.instantiate(this.Bullet);
        if (!this._flag) {
          bullet.parent = this.node;
          bullet.runAction(cc.sequence(cc.moveBy(.1, 5e3, 0), cc.callFunc(this.removeBullet, this)));
          this.Skeleton.setAnimation(0, "idle-shoot", false);
          this.Skeleton.addAnimation(0, "idle", true);
        }
      },
      removeBullet: function removeBullet() {
        for (var i = 0; i < this.node._children.length; i++) this.node._children[i].destroy();
      },
      jump: function jump(value) {
        var _this = this;
        cc.log(value);
        if (!this._flag) {
          var jumpUp = cc.moveBy(.4, cc.v2(0, 200));
          var jumpDown = cc.moveBy(.4, cc.v2(0, -200));
          var jump = cc.sequence(jumpUp, cc.delayTime(.1), jumpDown);
          this.node.getComponent(cc.BoxCollider).node.runAction(jump);
          this._flag = true;
          this.Skeleton.setAnimation(0, "jump", false);
          this.Skeleton.addAnimation(0, "idle-turn", false);
          this.Skeleton.addAnimation(0, "idle", true);
          this.Skeleton.setEventListener(function(entry, event) {
            0 != entry.animationEnd && (_this._flag = false);
          });
        }
      },
      slide: function slide(value) {
        var _this2 = this;
        cc.log(value);
        if (!this._flag) {
          this._flag = true;
          this.Skeleton.setAnimation(0, "hoverboard", true);
          this.Skeleton.setEventListener(function(entry, event) {
            0 != entry.animationEnd && (_this2._flag = false);
          });
        }
      },
      moveLeft: function moveLeft(value) {
        cc.log(value);
        var move = cc.sequence(cc.moveBy(5, -1e3, 0), cc.moveBy(5, -3e3, 0));
        if (!this._flag && value) {
          this._flag = true;
          this.node.runAction(cc.flipX(true));
          this.node.runAction(move);
          move.setTag(0);
          this.Skeleton.setAnimation(0, "walk", false);
          this.Skeleton.addAnimation(0, "run", true);
        } else if (!this._flag || !value) {
          this._flag = false;
          this.node.stopActionByTag(0);
          this.Skeleton.setAnimation(0, "run-to-idle", false);
          this.Skeleton.addAnimation(0, "idle", true);
        }
      },
      moveRight: function moveRight(value) {
        cc.log(value);
        var move = cc.sequence(cc.moveBy(5, 1e3, 0), cc.moveBy(5, 3e3, 0));
        if (!this._flag && value) {
          this._flag = true;
          this.node.runAction(cc.flipX(false));
          this.node.runAction(move);
          move.setTag(0);
          this.Skeleton.setAnimation(0, "walk", false);
          this.Skeleton.addAnimation(0, "run", true);
        } else if (!this._flag || !value) {
          this._flag = false;
          this.node.stopActionByTag(0);
          this.Skeleton.setAnimation(0, "run-to-idle", false);
          this.Skeleton.addAnimation(0, "idle", true);
        }
      },
      start: function start() {
        this.Skeleton.addAnimation(0, "portal", false);
        this.Skeleton.addAnimation(0, "idle", true);
      }
    });
    cc._RF.pop();
  }, {
    mEmitter: "mEmitter"
  } ],
  Bullet: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3ff44HSKh9FBawFFOeMwUKk", "Bullet");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      onCollisionEnter: function onCollisionEnter(other, self) {
        cc.log(self);
        cc.log(other);
      },
      onLoad: function onLoad() {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = true;
        manager.enabledDrawBoundingBox = true;
      },
      start: function start() {}
    });
    cc._RF.pop();
  }, {} ],
  1: [ function(require, module, exports) {
    function EventEmitter() {
      this._events = this._events || {};
      this._maxListeners = this._maxListeners || void 0;
    }
    module.exports = EventEmitter;
    EventEmitter.EventEmitter = EventEmitter;
    EventEmitter.prototype._events = void 0;
    EventEmitter.prototype._maxListeners = void 0;
    EventEmitter.defaultMaxListeners = 10;
    EventEmitter.prototype.setMaxListeners = function(n) {
      if (!isNumber(n) || n < 0 || isNaN(n)) throw TypeError("n must be a positive number");
      this._maxListeners = n;
      return this;
    };
    EventEmitter.prototype.emit = function(type) {
      var er, handler, len, args, i, listeners;
      this._events || (this._events = {});
      if ("error" === type && (!this._events.error || isObject(this._events.error) && !this._events.error.length)) {
        er = arguments[1];
        if (er instanceof Error) throw er;
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ")");
        err.context = er;
        throw err;
      }
      handler = this._events[type];
      if (isUndefined(handler)) return false;
      if (isFunction(handler)) switch (arguments.length) {
       case 1:
        handler.call(this);
        break;

       case 2:
        handler.call(this, arguments[1]);
        break;

       case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;

       default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
      } else if (isObject(handler)) {
        args = Array.prototype.slice.call(arguments, 1);
        listeners = handler.slice();
        len = listeners.length;
        for (i = 0; i < len; i++) listeners[i].apply(this, args);
      }
      return true;
    };
    EventEmitter.prototype.addListener = function(type, listener) {
      var m;
      if (!isFunction(listener)) throw TypeError("listener must be a function");
      this._events || (this._events = {});
      this._events.newListener && this.emit("newListener", type, isFunction(listener.listener) ? listener.listener : listener);
      this._events[type] ? isObject(this._events[type]) ? this._events[type].push(listener) : this._events[type] = [ this._events[type], listener ] : this._events[type] = listener;
      if (isObject(this._events[type]) && !this._events[type].warned) {
        m = isUndefined(this._maxListeners) ? EventEmitter.defaultMaxListeners : this._maxListeners;
        if (m && m > 0 && this._events[type].length > m) {
          this._events[type].warned = true;
          console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[type].length);
          "function" === typeof console.trace && console.trace();
        }
      }
      return this;
    };
    EventEmitter.prototype.on = EventEmitter.prototype.addListener;
    EventEmitter.prototype.once = function(type, listener) {
      if (!isFunction(listener)) throw TypeError("listener must be a function");
      var fired = false;
      function g() {
        this.removeListener(type, g);
        if (!fired) {
          fired = true;
          listener.apply(this, arguments);
        }
      }
      g.listener = listener;
      this.on(type, g);
      return this;
    };
    EventEmitter.prototype.removeListener = function(type, listener) {
      var list, position, length, i;
      if (!isFunction(listener)) throw TypeError("listener must be a function");
      if (!this._events || !this._events[type]) return this;
      list = this._events[type];
      length = list.length;
      position = -1;
      if (list === listener || isFunction(list.listener) && list.listener === listener) {
        delete this._events[type];
        this._events.removeListener && this.emit("removeListener", type, listener);
      } else if (isObject(list)) {
        for (i = length; i-- > 0; ) if (list[i] === listener || list[i].listener && list[i].listener === listener) {
          position = i;
          break;
        }
        if (position < 0) return this;
        if (1 === list.length) {
          list.length = 0;
          delete this._events[type];
        } else list.splice(position, 1);
        this._events.removeListener && this.emit("removeListener", type, listener);
      }
      return this;
    };
    EventEmitter.prototype.removeAllListeners = function(type) {
      var key, listeners;
      if (!this._events) return this;
      if (!this._events.removeListener) {
        0 === arguments.length ? this._events = {} : this._events[type] && delete this._events[type];
        return this;
      }
      if (0 === arguments.length) {
        for (key in this._events) {
          if ("removeListener" === key) continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners("removeListener");
        this._events = {};
        return this;
      }
      listeners = this._events[type];
      if (isFunction(listeners)) this.removeListener(type, listeners); else if (listeners) while (listeners.length) this.removeListener(type, listeners[listeners.length - 1]);
      delete this._events[type];
      return this;
    };
    EventEmitter.prototype.listeners = function(type) {
      var ret;
      ret = this._events && this._events[type] ? isFunction(this._events[type]) ? [ this._events[type] ] : this._events[type].slice() : [];
      return ret;
    };
    EventEmitter.prototype.listenerCount = function(type) {
      if (this._events) {
        var evlistener = this._events[type];
        if (isFunction(evlistener)) return 1;
        if (evlistener) return evlistener.length;
      }
      return 0;
    };
    EventEmitter.listenerCount = function(emitter, type) {
      return emitter.listenerCount(type);
    };
    function isFunction(arg) {
      return "function" === typeof arg;
    }
    function isNumber(arg) {
      return "number" === typeof arg;
    }
    function isObject(arg) {
      return "object" === typeof arg && null !== arg;
    }
    function isUndefined(arg) {
      return void 0 === arg;
    }
  }, {} ],
  2: [ function(require, module, exports) {
    var indexOf = [].indexOf;
    module.exports = function(arr, obj) {
      if (indexOf) return arr.indexOf(obj);
      for (var i = 0; i < arr.length; ++i) if (arr[i] === obj) return i;
      return -1;
    };
  }, {} ],
  3: [ function(require, module, exports) {
    var indexOf = require("indexof");
    var Object_keys = function(obj) {
      if (Object.keys) return Object.keys(obj);
      var res = [];
      for (var key in obj) res.push(key);
      return res;
    };
    var forEach = function(xs, fn) {
      if (xs.forEach) return xs.forEach(fn);
      for (var i = 0; i < xs.length; i++) fn(xs[i], i, xs);
    };
    var defineProp = function() {
      try {
        Object.defineProperty({}, "_", {});
        return function(obj, name, value) {
          Object.defineProperty(obj, name, {
            writable: true,
            enumerable: false,
            configurable: true,
            value: value
          });
        };
      } catch (e) {
        return function(obj, name, value) {
          obj[name] = value;
        };
      }
    }();
    var globals = [ "Array", "Boolean", "Date", "Error", "EvalError", "Function", "Infinity", "JSON", "Math", "NaN", "Number", "Object", "RangeError", "ReferenceError", "RegExp", "String", "SyntaxError", "TypeError", "URIError", "decodeURI", "decodeURIComponent", "encodeURI", "encodeURIComponent", "escape", "eval", "isFinite", "isNaN", "parseFloat", "parseInt", "undefined", "unescape" ];
    function Context() {}
    Context.prototype = {};
    var Script = exports.Script = function NodeScript(code) {
      if (!(this instanceof Script)) return new Script(code);
      this.code = code;
    };
    Script.prototype.runInContext = function(context) {
      if (!(context instanceof Context)) throw new TypeError("needs a 'context' argument.");
      var iframe = document.createElement("iframe");
      iframe.style || (iframe.style = {});
      iframe.style.display = "none";
      document.body.appendChild(iframe);
      var win = iframe.contentWindow;
      var wEval = win.eval, wExecScript = win.execScript;
      if (!wEval && wExecScript) {
        wExecScript.call(win, "null");
        wEval = win.eval;
      }
      forEach(Object_keys(context), function(key) {
        win[key] = context[key];
      });
      forEach(globals, function(key) {
        context[key] && (win[key] = context[key]);
      });
      var winKeys = Object_keys(win);
      var res = wEval.call(win, this.code);
      forEach(Object_keys(win), function(key) {
        (key in context || -1 === indexOf(winKeys, key)) && (context[key] = win[key]);
      });
      forEach(globals, function(key) {
        key in context || defineProp(context, key, win[key]);
      });
      document.body.removeChild(iframe);
      return res;
    };
    Script.prototype.runInThisContext = function() {
      return eval(this.code);
    };
    Script.prototype.runInNewContext = function(context) {
      var ctx = Script.createContext(context);
      var res = this.runInContext(ctx);
      forEach(Object_keys(ctx), function(key) {
        context[key] = ctx[key];
      });
      return res;
    };
    forEach(Object_keys(Script.prototype), function(name) {
      exports[name] = Script[name] = function(code) {
        var s = Script(code);
        return s[name].apply(s, [].slice.call(arguments, 1));
      };
    });
    exports.createScript = function(code) {
      return exports.Script(code);
    };
    exports.createContext = Script.createContext = function(context) {
      var copy = new Context();
      "object" === typeof context && forEach(Object_keys(context), function(key) {
        copy[key] = context[key];
      });
      return copy;
    };
  }, {
    indexof: 2
  } ],
  KeyController: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f494a6Vg09CsoRNcWbb6pfC", "KeyController");
    "use strict";
    var Emitter = require("mEmitter");
    cc.Class({
      extends: cc.Component,
      properties: {
        _flag: false
      },
      onLoad: function onLoad() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
      },
      onKeyDown: function onKeyDown(event) {
        switch (event.keyCode) {
         case cc.macro.KEY.up:
          if (!this._flag) {
            this._flag = true;
            console.log("Press Up");
            Emitter.instance.emit("keyup_down", true);
          }
          break;

         case cc.macro.KEY.down:
          console.log("Press Down");
          break;

         case cc.macro.KEY.left:
          if (!this._flag) {
            this._flag = true;
            console.log("Press Left");
            Emitter.instance.emit("keyleft_down", true);
          }
          break;

         case cc.macro.KEY.right:
          if (!this._flag) {
            this._flag = true;
            console.log("Press Right");
            Emitter.instance.emit("keyright_down", true);
          }
          break;

         case cc.macro.KEY.space:
          if (!this._flag) {
            this._flag = true;
            console.log("Press Space");
            Emitter.instance.emit("keyspace_down", true);
          }
        }
      },
      onKeyUp: function onKeyUp(event) {
        switch (event.keyCode) {
         case cc.macro.KEY.up:
          this._flag = false;
          console.log("Release Up");
          Emitter.instance.emit("keyup_up", false);
          break;

         case cc.macro.KEY.down:
          console.log("Release Down");
          Emitter.instance.emit("keydown_up", true);
          break;

         case cc.macro.KEY.left:
          this._flag = false;
          console.log("Release Left");
          Emitter.instance.emit("keyleft_up", false);
          break;

         case cc.macro.KEY.right:
          this._flag = false;
          console.log("Release Right");
          Emitter.instance.emit("keyright_up", false);
          break;

         case cc.macro.KEY.space:
          this._flag = false;
          console.log("Release Space");
          Emitter.instance.emit("keyspace_up", false);
        }
      },
      start: function start() {}
    });
    cc._RF.pop();
  }, {
    mEmitter: "mEmitter"
  } ],
  ScaleY: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "781cdTHnuhB7oLm8TPc7S6f", "ScaleY");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      start: function start() {
        this.node.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(.5, .4, .35), cc.scaleTo(.5, .4, .4))));
      }
    });
    cc._RF.pop();
  }, {} ],
  bullet: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f6df99uXAdIb6wzCfufDCrd", "bullet");
    "use strict";
    var Emitter = require("mEmitter");
    var eventCode = require("eventCode");
    cc.Class({
      extends: cc.Component,
      properties: {},
      onCollisionEnter: function onCollisionEnter(otherCollider, seftCollider) {
        cc.log(otherCollider, seftCollider);
        if ("PurpleMonster" == otherCollider.node.name) {
          this.node.destroy();
          cc.log(otherCollider.node);
          otherCollider.node.runAction(cc.blink(2, 100));
          setTimeout(function() {
            otherCollider.node.active = false;
          }, 2e3);
        }
      },
      onLoad: function onLoad() {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        cc.log(this.node);
      },
      start: function start() {}
    });
    cc._RF.pop();
  }, {
    eventCode: "eventCode",
    mEmitter: "mEmitter"
  } ],
  eventCode: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9d8b0udFkpESYQST79BZ4K2", "eventCode");
    "use strict";
    var eventCode = {
      JUMP: "JUMP",
      DONTJUMP: "DONTJUMP",
      JUMPBACK: "JUMPBACK",
      WALKLEFT: "WALKLEFT",
      WALKRIGHT: "WALKRIGHT",
      RUNLEFT: "RUNLEFT",
      RUNRIGHTDOWN: "RUNRIGHTDOWN",
      RUNRIGHTUP: "RUNRIGHTUP",
      SHOOT: "SHOOT",
      AIM: "AIM",
      HOVERBOARD: "HOVERBOARD",
      PLAY: "PLAY",
      RESET: "RESET",
      DEATH: "DEATH",
      GAMEOVER: "GAMEOVER",
      WIN: "WIN",
      DELETE: "DELETE",
      BULLET: "BULLET",
      KEYRIGHTUP: "KEYRIGHTUP",
      KEYRIGHTDOWN: "KEYRIGHTDOWN",
      KEYLEFTUP: "KEYLEFTUP",
      KEYLEFTDOWN: "KEYLEFTDOWN",
      KEYUPUP: "KEYUPUP",
      KEYUPDOWN: "KEYUPDOWN",
      KEYSPACEUP: "KEYSPACEUP",
      KEYSPACEDOWN: "KEYSPACEDOWN",
      KEYDOWNUP: "KEYDOWNUP",
      KEYDOWNDOWN: "KEYDOWNDOWN",
      MOVE: "MOVE",
      DONTMOVE: "DONTMOVE"
    };
    module.exports = eventCode;
    cc._RF.pop();
  }, {} ],
  fence: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b6722Q0dqRAP5eUcKWXhCiH", "fence");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      onCollisionEnter: function onCollisionEnter(otherCollider, seftCollider) {
        cc.log(otherCollider, seftCollider);
      },
      onLoad: function onLoad() {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
      },
      start: function start() {}
    });
    cc._RF.pop();
  }, {} ],
  mEmitter: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "23f53WHiAlPUKUaEpn+EYmN", "mEmitter");
    "use strict";
    var _createClass = function() {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          "value" in descriptor && (descriptor.writable = true);
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function(Constructor, protoProps, staticProps) {
        protoProps && defineProperties(Constructor.prototype, protoProps);
        staticProps && defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
    }
    var EventEmitter = require("events");
    var mEmitter = function() {
      function mEmitter() {
        _classCallCheck(this, mEmitter);
        this._emiter = new EventEmitter();
        this._emiter.setMaxListeners(100);
      }
      _createClass(mEmitter, [ {
        key: "emit",
        value: function emit() {
          var _emiter;
          (_emiter = this._emiter).emit.apply(_emiter, arguments);
        }
      }, {
        key: "registerEvent",
        value: function registerEvent(event, listener) {
          this._emiter.on(event, listener);
        }
      }, {
        key: "registerOnce",
        value: function registerOnce(event, listener) {
          this._emiter.once(event, listener);
        }
      }, {
        key: "removeEvent",
        value: function removeEvent(event, listener) {
          this._emiter.removeListener(event, listener);
        }
      }, {
        key: "destroy",
        value: function destroy() {
          this._emiter.removeAllListeners();
          this._emiter = null;
          mEmitter.instance = null;
        }
      } ]);
      return mEmitter;
    }();
    mEmitter.instance = null;
    module.exports = mEmitter;
    cc._RF.pop();
  }, {
    events: 1
  } ],
  mainController: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "280c3rsZJJKnZ9RqbALVwtK", "mainController");
    "use strict";
    var Emitter = require("mEmitter");
    var eventCode = require("eventCode");
    cc.Class({
      extends: cc.Component,
      properties: {
        spineBoy: sp.Skeleton,
        ground: cc.Node,
        fence: cc.Node,
        gate: cc.Node,
        monster: cc.Node,
        _isRight: false,
        _isLeft: true,
        _isJump: true,
        __flag: false
      },
      onLoad: function onLoad() {
        Emitter.instance = new Emitter();
        this.playGame();
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
      },
      playGame: function playGame() {
        this.spineBoy.node.active = true;
        this.fence.active = true;
        this.monster.active = true;
        this.gate.active = true;
      },
      onKeyUp: function onKeyUp(event) {
        switch (event.keyCode) {
         case cc.macro.KEY.space:
          Emitter.instance.emit("shoot", this._flag);
          break;

         case cc.macro.KEY.left:
          Emitter.instance.emit("dontMove", "left");
          break;

         case cc.macro.KEY.up:
          Emitter.instance.emit("dontJump", this._flag);
          break;

         case cc.macro.KEY.right:
          Emitter.instance.emit("dontMove", "right");
        }
      },
      onKeyDown: function onKeyDown(event) {
        switch (event.keyCode) {
         case cc.macro.KEY.left:
          if (this.spineBoy.node.x <= -818.802) break;
          this._flag = false;
          Emitter.instance.emit("move", "left");
          cc.log(event.keyCode);
          break;

         case cc.macro.KEY.up:
          this._flag = false;
          Emitter.instance.emit("jump", this._flag);
          break;

         case cc.macro.KEY.right:
          if (this.spineBoy.node.x >= 936.73) break;
          this._flag = false;
          Emitter.instance.emit("move", "right");
          break;

         case cc.macro.KEY.space:
          Emitter.instance.emit("shoot", this._flag);
        }
      },
      update: function update(dt) {},
      onDestroy: function onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
      }
    });
    cc._RF.pop();
  }, {
    eventCode: "eventCode",
    mEmitter: "mEmitter"
  } ],
  monster: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1ff1fQgmPBBLZi4DwPOI2Qs", "monster");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        _accMonster: ""
      },
      onCollisionEnter: function onCollisionEnter(otherCollider, seftCollider) {
        0 == otherCollider.tag && this.node.stopAction(this._accMonster);
      },
      onLoad: function onLoad() {
        this.moveMonster();
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
      },
      moveMonster: function moveMonster() {
        var moveTo = cc.moveBy(.8, cc.v2(50, 0));
        var moveBack = cc.moveBy(.8, cc.v2(-50, 0));
        this._accMonster = cc.repeatForever(cc.sequence(moveTo, moveBack));
        this.node.runAction(this._accMonster);
      },
      start: function start() {}
    });
    cc._RF.pop();
  }, {} ],
  playAgain: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7cd737UOUtP2aHA7HqX5tVM", "playAgain");
    "use strict";
    var Emitter = require("mEmitter");
    cc.Class({
      extends: cc.Component,
      properties: {},
      onLoad: function onLoad() {
        this._playAgain = this.playAgain.bind(this);
        Emitter.instance.registerEvent("play-game", this._playAgain);
      },
      playAgain: function playAgain() {
        cc.game.restart();
      },
      start: function start() {}
    });
    cc._RF.pop();
  }, {
    mEmitter: "mEmitter"
  } ],
  playGame: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f18e28VEYND+oQnLfDp7KaX", "playGame");
    "use strict";
    var Emitter = require("mEmitter");
    cc.Class({
      extends: cc.Component,
      properties: {},
      onLoad: function onLoad() {},
      onPlay: function onPlay() {
        Emitter.instance.emit("play-game", true);
      },
      start: function start() {}
    });
    cc._RF.pop();
  }, {
    mEmitter: "mEmitter"
  } ],
  resetGame: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b9ba4MPtlJPn4I+dd37BZhW", "resetGame");
    "use strict";
    var Emitter = require("mEmitter");
    cc.Class({
      extends: cc.Component,
      properties: {},
      onLoad: function onLoad() {
        this._resetGame = this.resetGame.bind(this);
        Emitter.instance.registerEvent("reset-game", this._resetGame);
      },
      resetGame: function resetGame() {
        cc.game.restart();
      },
      start: function start() {}
    });
    cc._RF.pop();
  }, {
    mEmitter: "mEmitter"
  } ],
  spinboy: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "25377Jgtg9FM7pIo/wjO15o", "spinboy");
    "use strict";
    var Emitter = require("mEmitter");
    cc.Class({
      extends: cc.Component,
      properties: {
        _action: null,
        _handleMove: null,
        _handleDontMove: null,
        _handleJump: null,
        _handleDontJump: null,
        _handleShoot: null,
        spinboy: sp.Skeleton,
        _isMove: false,
        _isJump: false,
        _scaleX: 0
      },
      onLoad: function onLoad() {
        this._scaleX = this.node.scaleX;
        this.registerEmitter();
        this.spinboy.setAnimation(0, "portal", false);
        this.spinboy.setMix("run", "idle", .3);
        this.spinboy.setMix("portal", "run", .3);
        this.spinboy.setMix("run", "jump", .1);
        this.spinboy.setMix("jump", "idle", .1);
        this.spinboy.setMix("idle", "jump", .1);
        this.spinboy.setMix("jump", "run", .1);
        this.spinboy.setMix("jump", "shoot", .1);
      },
      registerEmitter: function registerEmitter() {
        this._handleMove = this.handleMove.bind(this);
        Emitter.instance.registerEvent("move", this._handleMove);
        this._handleDontMove = this.handleDontMove.bind(this);
        Emitter.instance.registerEvent("dontMove", this._handleDontMove);
        this._handleJump = this.handleJump.bind(this);
        Emitter.instance.registerEvent("jump", this._handleJump);
        this._handleDontJump = this.handleDontJump.bind(this);
        Emitter.instance.registerEvent("dontJump", this._handleDontJump);
        this._handleShoot = this.handleShoot.bind(this);
        Emitter.instance.registerEvent("shoot", this._handleShoot);
      },
      handleShoot: function handleShoot() {
        this.spinboy.setAnimation(0, "shoot", false);
      },
      handleDontJump: function handleDontJump() {
        var _this = this;
        this.spinboy.setEventListener(function(vl1) {
          if (vl1.animationEnd >= 1.3) {
            _this._isJump = false;
            if (true == _this._isMove) _this.spinboy.setAnimation(0, "run", true); else {
              _this.spinboy.setToSetupPose();
              _this.spinboy.setAnimation(0, "idle", false);
              _this.node.stopAllActions();
            }
          }
        });
      },
      handleJump: function handleJump() {
        if (true == this._isJump) return;
        this._isJump = true;
        this.spinboy.setAnimation(0, "jump", true);
      },
      handleDontMove: function handleDontMove() {
        var _this2 = this;
        if (true == this._isJump) {
          this._isMove = false;
          this.spinboy.setEventListener(function(vl1) {
            cc.log(vl1);
            if (vl1.animationEnd >= 1.3) {
              _this2.spinboy.setToSetupPose();
              _this2.spinboy.setAnimation(0, "idle", false);
              _this2._isJump = false;
              _this2.node.stopAllActions();
            }
          });
        } else {
          this.spinboy.setToSetupPose();
          this.spinboy.setAnimation(0, "idle", false);
          this._isMove = false;
          this._isJump = false;
          this.node.stopAllActions();
        }
      },
      spinBoyTurn: function spinBoyTurn(act) {
        cc.log(act);
        var direction = 1;
        if ("right" == act) this.node.scaleX = this._scaleX; else {
          this.node.scaleX = -this._scaleX;
          direction = -1;
        }
        return direction;
      },
      handleMove: function handleMove(act) {
        cc.log(act);
        if (this._isJump) return;
        if (true == this._isMove) return;
        this._isMove = true;
        this.spinboy.setAnimation(0, "run", true);
        var turn = this.spinBoyTurn(act);
        this._action = cc.moveBy(.8, cc.v2(100 * turn, 0)).repeatForever();
        this.node.runAction(this._action);
      },
      start: function start() {},
      update: function update(dt) {
        cc.log(this._isJump, this._isMove);
      }
    });
    cc._RF.pop();
  }, {
    mEmitter: "mEmitter"
  } ],
  spineBoy: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f6db2OFTU1BDID2bwuOtbtd", "spineBoy");
    "use strict";
    var Emitter = require("mEmitter");
    var eventCode = require("eventCode");
    var _require = require("vm"), runInThisContext = _require.runInThisContext;
    cc.Class({
      extends: cc.Component,
      properties: {
        spineBoy: sp.Skeleton,
        bullet: cc.Prefab,
        gameOVer: cc.Node,
        resetGame: cc.Node,
        coin: cc.Node,
        score: cc.RichText,
        lblGameOver: cc.RichText,
        lblWin: cc.RichText,
        _flag: false,
        _isMove: false,
        _isJump: false,
        _checkDeath: false,
        _checkWin: false,
        _handleMove: null,
        _handleDontMove: null,
        _handleJump: null,
        _handleDontJump: null,
        _handleShoot: null,
        _action: "",
        _changeScore: 100,
        jumpAudio: {
          default: null,
          type: cc.AudioClip
        },
        shootAudio: {
          default: null,
          type: cc.AudioClip
        },
        _scaleX: 0,
        _currentX: null,
        _currentY: null
      },
      onCollisionEnter: function onCollisionEnter(otherCollider, seftCollider) {
        var _this = this;
        if (1 == otherCollider.tag) cc.log("cham dat"); else if (2 == otherCollider.tag) {
          cc.log(" fence killed character");
          this._checkDeath = true;
          this._isMove = true;
          this._isJump = true;
          this.spineBoy.setAnimation(0, "death", false);
          this.node.stopAllActions();
          Emitter.instance.emit("play-game", true);
          setTimeout(function() {
            _this.gameOVer.active = true;
            _this.LoseScore(_this._changeScore);
            _this._changeScore = 100;
          }, 3e3);
        } else if (3 == otherCollider.tag) {
          cc.log(" monster killed character");
          this._checkDeath = true;
          this._isMove = true;
          this._isJump = true;
          this.spineBoy.setAnimation(0, "death", false);
          this.node.stopAllActions();
          Emitter.instance.emit("play-game", true);
          setTimeout(function() {
            _this.gameOVer.active = true;
            _this.LoseScore(_this._changeScore);
            _this._changeScore = 100;
          }, 3e3);
        } else if (4 == otherCollider.tag) {
          cc.log("win");
          this._checkWin = true;
          this._isMove = true;
          this._isJump = true;
          this.spineBoy.setAnimation(0, "hoverboard", true);
          this.node.stopAllActions();
          Emitter.instance.emit("reset-game", true);
          this.coin.active = true;
          setTimeout(function() {
            _this.resetGame.active = true;
            _this.WinScore(_this._changeScore);
            _this._changeScore = 100;
          }, 3e3);
        }
      },
      onLoad: function onLoad() {
        this._scaleX = this.node.scaleX;
        this.init();
        this._handleMove = this.handleMove.bind(this);
        this._handleShoot = this.handleShoot.bind(this);
        this._handleDontJump = this.handleDontJump.bind(this);
        this._handleJump = this.handleJump.bind(this);
        this._handleDontMove = this.handleDontMove.bind(this);
        this._shoot = this.shoot.bind(this);
        Emitter.instance.registerEvent("move", this._handleMove);
        Emitter.instance.registerEvent("dontMove", this._handleDontMove);
        Emitter.instance.registerEvent("jump", this._handleJump);
        Emitter.instance.registerEvent("dontJump", this._handleDontJump);
        Emitter.instance.registerEvent("shoot", this._shoot);
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
      },
      init: function init() {
        var _this2 = this;
        this.spineBoy.setAnimation(0, "portal", false);
        this.spineBoy.setCompleteListener(function(entry) {
          if (entry.animationEnd >= 3.59) {
            _this2._isJump = false;
            _this2._isMove = false;
            _this2.updateScore();
          }
        });
        this.spineBoy.setMix("run", "idle", .3);
        this.spineBoy.setMix("portal", "run", .3);
        this.spineBoy.setMix("run", "jump", .1);
        this.spineBoy.setMix("jump", "idle", .1);
        this.spineBoy.setMix("idle", "jump", .1);
        this.spineBoy.setMix("jump", "run", .1);
        this.spineBoy.setMix("jump", "shoot", .1);
      },
      updateScore: function updateScore() {
        var _this3 = this;
        var action = [ cc.callFunc(function() {
          if (_this3._checkDeath) return;
          if (_this3._checkWin) return;
          _this3._changeScore -= 1;
        }), cc.delayTime(1), cc.callFunc(function() {
          _this3.score.string = "<color=#00ff00>Score:" + _this3._changeScore + "</c>";
        }) ];
        this.score.node.runAction(cc.repeat(cc.sequence(action), 99));
      },
      LoseScore: function LoseScore(score) {
        var _this4 = this;
        var countScore = 0;
        var actions = [ cc.callFunc(function() {
          countScore += 1;
        }), cc.delayTime(.01), cc.callFunc(function() {
          _this4.lblGameOver.string = "<color=#00ff00>YOU </c><color=#0fffff>LOSE</color>\n<color=#CD5555>SCORE:</c> <color=#FFCC33>" + countScore + "</color>";
        }) ];
        this.lblGameOver.node.runAction(cc.repeat(cc.sequence(actions), score));
      },
      WinScore: function WinScore(score) {
        var _this5 = this;
        var countScore = 0;
        var actions = [ cc.callFunc(function() {
          countScore += 1;
        }), cc.delayTime(.01), cc.callFunc(function() {
          _this5.lblWin.string = "<color=#00ff00>YOU </c><color=#0fffff>WIN</color>\n<color=#CD5555>SCORE:</c> <color=#FFCC33>" + countScore + "</color>";
        }) ];
        this.lblWin.node.runAction(cc.repeat(cc.sequence(actions), score));
      },
      playJumpSound: function playJumpSound() {
        cc.audioEngine.playEffect(this.jumpAudio, false);
      },
      playShootSound: function playShootSound() {
        cc.audioEngine.playEffect(this.shootAudio, false);
      },
      handleShoot: function handleShoot() {
        this.spineBoy.setAnimation(0, "shoot", false);
      },
      shoot: function shoot(data) {
        this.spineBoy.setAnimation(1, "shoot", false);
        var action = cc.callFunc(this.playShootSound, this);
        this.spineBoy.node.runAction(action);
        this.createBullet();
      },
      resetPose: function resetPose() {
        var _this6 = this;
        this.spineBoy.setCompleteListener(function() {
          _this6.spineBoy.clearTracks();
          _this6.spineBoy.setToSetupPose();
          _this6.spineBoy.setAnimation(0, "idle", true);
        });
      },
      createBullet: function createBullet() {
        var newBullet = cc.instantiate(this.bullet);
        if (this.spineBoy.node.scaleX > 0) {
          newBullet.parent = this.node.parent;
          newBullet.x = this.spineBoy.node.x + 80;
          newBullet.y = this.spineBoy.node.y + 60;
          var action = cc.moveBy(5, cc.v2(2e3, 0));
          var destruction = cc.callFunc(function() {}, this);
          var sequence = cc.sequence(action, destruction);
          newBullet.runAction(sequence);
        } else {
          newBullet.parent = this.node.parent;
          newBullet.x = this.spineBoy.node.x - 100;
          newBullet.y = this.spineBoy.node.y + 60;
          var _action = cc.spawn(cc.flipX(), cc.moveBy(5, cc.v2(-2e3, 0)));
          var _destruction = cc.callFunc(function() {}, this);
          var _sequence = cc.sequence(_action, _destruction);
          newBullet.runAction(_sequence);
        }
      },
      handleDontJump: function handleDontJump() {
        var _this7 = this;
        this.spineBoy.setEventListener(function(vl1) {
          if (vl1.animationEnd >= 1.3) {
            _this7._isJump = false;
            if (true == _this7._isMove) _this7.spineBoy.setAnimation(0, "run", true); else {
              _this7.spineBoy.setToSetupPose();
              _this7.spineBoy.setAnimation(0, "idle", false);
              _this7.node.stopAllActions();
            }
          }
        });
      },
      handleJump: function handleJump() {
        if (true == this._isJump) return;
        this._isJump = true;
        this.spineBoy.setAnimation(0, "jump", true);
        var action = cc.callFunc(this.playJumpSound, this);
        this.spineBoy.node.runAction(action);
      },
      handleDontMove: function handleDontMove() {
        var _this8 = this;
        if (true == this._isJump) {
          this._isMove = false;
          this.spineBoy.setEventListener(function(entry) {
            if (entry.animationEnd >= 1.3) {
              _this8.spineBoy.setToSetupPose();
              _this8.spineBoy.setAnimation(0, "idle", false);
              _this8._isJump = false;
              _this8.node.stopAllActions();
            }
          });
        } else {
          this.spineBoy.setToSetupPose();
          this.spineBoy.setAnimation(0, "idle", false);
          this._isMove = false;
          this._isJump = false;
          this.node.stopAllActions();
        }
      },
      spineBoyTurn: function spineBoyTurn(data) {
        cc.log(data);
        var direction = 1;
        if ("right" == data) this.node.scaleX = this._scaleX; else {
          this.node.scaleX = -this._scaleX;
          direction = -1;
        }
        return direction;
      },
      handleMove: function handleMove(data) {
        cc.log(this.spineBoy.node.scaleX);
        if (this._isJump) return;
        if (true == this._isMove) return;
        this._isMove = true;
        this.spineBoy.setAnimation(0, "run", true);
        var turn = this.spineBoyTurn(data);
        this._action = cc.moveBy(.8, cc.v2(300 * turn, 0)).repeatForever();
        this.node.runAction(this._action);
      },
      update: function update(dt) {
        this.node.getComponent(cc.BoxCollider).offset = cc.v2(this.spineBoy.findBone("torso3").worldX, this.spineBoy.findBone("torso3").worldY);
        this._currentX = this.spineBoy.findBone("torso3").worldX;
        this._currentY = this.spineBoy.findBone("torso3").worldY;
      }
    });
    cc._RF.pop();
  }, {
    eventCode: "eventCode",
    mEmitter: "mEmitter",
    vm: 3
  } ]
}, {}, [ "bullet", "eventCode", "fence", "mEmitter", "mainController", "monster", "playAgain", "playGame", "resetGame", "spineBoy", "Animation", "Bullet", "KeyController", "ScaleY", "spinboy" ]);