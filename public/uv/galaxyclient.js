"use strict";
(() => {
  var Qe = Object.create;
  var K = Object.defineProperty;
  var ze = Object.getOwnPropertyDescriptor;
  var Je = Object.getOwnPropertyNames;
  var Ye = Object.getPrototypeOf,
    Ze = Object.prototype.hasOwnProperty;
  var et = (s, t) => () => (
    t || s((t = { exports: {} }).exports, t), t.exports
  );
  var tt = (s, t, r, e) => {
    if ((t && typeof t == "object") || typeof t == "function")
      for (let n of Je(t))
        !Ze.call(s, n) &&
          n !== r &&
          K(s, n, {
            get: () => t[n],
            enumerable: !(e = ze(t, n)) || e.enumerable,
          });
    return s;
  };
  var m = (s, t, r) => (
    (r = s != null ? Qe(Ye(s)) : {}),
    tt(
      t || !s || !s.__esModule
        ? K(r, "default", { value: s, enumerable: !0 })
        : r,
      s
    )
  );
  var f = et((ut, k) => {
    "use strict";
    var y = typeof Reflect == "object" ? Reflect : null,
      X =
        y && typeof y.apply == "function"
          ? y.apply
          : function (t, r, e) {
              return Function.prototype.apply.call(t, r, e);
            },
      g;
    y && typeof y.ownKeys == "function"
      ? (g = y.ownKeys)
      : Object.getOwnPropertySymbols
      ? (g = function (t) {
          return Object.getOwnPropertyNames(t).concat(
            Object.getOwnPropertySymbols(t)
          );
        })
      : (g = function (t) {
          return Object.getOwnPropertyNames(t);
        });
    function rt(s) {
      console && console.warn && console.warn(s);
    }
    var z =
      Number.isNaN ||
      function (t) {
        return t !== t;
      };
    function d() {
      d.init.call(this);
    }
    k.exports = d;
    k.exports.once = st;
    d.EventEmitter = d;
    d.prototype._events = void 0;
    d.prototype._eventsCount = 0;
    d.prototype._maxListeners = void 0;
    var Q = 10;
    function P(s) {
      if (typeof s != "function")
        throw new TypeError(
          'The "listener" argument must be of type Function. Received type ' +
            typeof s
        );
    }
    Object.defineProperty(d, "defaultMaxListeners", {
      enumerable: !0,
      get: function () {
        return Q;
      },
      set: function (s) {
        if (typeof s != "number" || s < 0 || z(s))
          throw new RangeError(
            'The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' +
              s +
              "."
          );
        Q = s;
      },
    });
    d.init = function () {
      (this._events === void 0 ||
        this._events === Object.getPrototypeOf(this)._events) &&
        ((this._events = Object.create(null)), (this._eventsCount = 0)),
        (this._maxListeners = this._maxListeners || void 0);
    };
    d.prototype.setMaxListeners = function (t) {
      if (typeof t != "number" || t < 0 || z(t))
        throw new RangeError(
          'The value of "n" is out of range. It must be a non-negative number. Received ' +
            t +
            "."
        );
      return (this._maxListeners = t), this;
    };
    function J(s) {
      return s._maxListeners === void 0
        ? d.defaultMaxListeners
        : s._maxListeners;
    }
    d.prototype.getMaxListeners = function () {
      return J(this);
    };
    d.prototype.emit = function (t) {
      for (var r = [], e = 1; e < arguments.length; e++) r.push(arguments[e]);
      var n = t === "error",
        o = this._events;
      if (o !== void 0) n = n && o.error === void 0;
      else if (!n) return !1;
      if (n) {
        var i;
        if ((r.length > 0 && (i = r[0]), i instanceof Error)) throw i;
        var c = new Error(
          "Unhandled error." + (i ? " (" + i.message + ")" : "")
        );
        throw ((c.context = i), c);
      }
      var l = o[t];
      if (l === void 0) return !1;
      if (typeof l == "function") X(l, this, r);
      else
        for (var u = l.length, h = re(l, u), e = 0; e < u; ++e)
          X(h[e], this, r);
      return !0;
    };
    function Y(s, t, r, e) {
      var n, o, i;
      if (
        (P(r),
        (o = s._events),
        o === void 0
          ? ((o = s._events = Object.create(null)), (s._eventsCount = 0))
          : (o.newListener !== void 0 &&
              (s.emit("newListener", t, r.listener ? r.listener : r),
              (o = s._events)),
            (i = o[t])),
        i === void 0)
      )
        (i = o[t] = r), ++s._eventsCount;
      else if (
        (typeof i == "function"
          ? (i = o[t] = e ? [r, i] : [i, r])
          : e
          ? i.unshift(r)
          : i.push(r),
        (n = J(s)),
        n > 0 && i.length > n && !i.warned)
      ) {
        i.warned = !0;
        var c = new Error(
          "Possible EventEmitter memory leak detected. " +
            i.length +
            " " +
            String(t) +
            " listeners added. Use emitter.setMaxListeners() to increase limit"
        );
        (c.name = "MaxListenersExceededWarning"),
          (c.emitter = s),
          (c.type = t),
          (c.count = i.length),
          rt(c);
      }
      return s;
    }
    d.prototype.addListener = function (t, r) {
      return Y(this, t, r, !1);
    };
    d.prototype.on = d.prototype.addListener;
    d.prototype.prependListener = function (t, r) {
      return Y(this, t, r, !0);
    };
    function ot() {
      if (!this.fired)
        return (
          this.target.removeListener(this.type, this.wrapFn),
          (this.fired = !0),
          arguments.length === 0
            ? this.listener.call(this.target)
            : this.listener.apply(this.target, arguments)
        );
    }
    function Z(s, t, r) {
      var e = { fired: !1, wrapFn: void 0, target: s, type: t, listener: r },
        n = ot.bind(e);
      return (n.listener = r), (e.wrapFn = n), n;
    }
    d.prototype.once = function (t, r) {
      return P(r), this.on(t, Z(this, t, r)), this;
    };
    d.prototype.prependOnceListener = function (t, r) {
      return P(r), this.prependListener(t, Z(this, t, r)), this;
    };
    d.prototype.removeListener = function (t, r) {
      var e, n, o, i, c;
      if ((P(r), (n = this._events), n === void 0)) return this;
      if (((e = n[t]), e === void 0)) return this;
      if (e === r || e.listener === r)
        --this._eventsCount === 0
          ? (this._events = Object.create(null))
          : (delete n[t],
            n.removeListener &&
              this.emit("removeListener", t, e.listener || r));
      else if (typeof e != "function") {
        for (o = -1, i = e.length - 1; i >= 0; i--)
          if (e[i] === r || e[i].listener === r) {
            (c = e[i].listener), (o = i);
            break;
          }
        if (o < 0) return this;
        o === 0 ? e.shift() : nt(e, o),
          e.length === 1 && (n[t] = e[0]),
          n.removeListener !== void 0 && this.emit("removeListener", t, c || r);
      }
      return this;
    };
    d.prototype.off = d.prototype.removeListener;
    d.prototype.removeAllListeners = function (t) {
      var r, e, n;
      if (((e = this._events), e === void 0)) return this;
      if (e.removeListener === void 0)
        return (
          arguments.length === 0
            ? ((this._events = Object.create(null)), (this._eventsCount = 0))
            : e[t] !== void 0 &&
              (--this._eventsCount === 0
                ? (this._events = Object.create(null))
                : delete e[t]),
          this
        );
      if (arguments.length === 0) {
        var o = Object.keys(e),
          i;
        for (n = 0; n < o.length; ++n)
          (i = o[n]), i !== "removeListener" && this.removeAllListeners(i);
        return (
          this.removeAllListeners("removeListener"),
          (this._events = Object.create(null)),
          (this._eventsCount = 0),
          this
        );
      }
      if (((r = e[t]), typeof r == "function")) this.removeListener(t, r);
      else if (r !== void 0)
        for (n = r.length - 1; n >= 0; n--) this.removeListener(t, r[n]);
      return this;
    };
    function ee(s, t, r) {
      var e = s._events;
      if (e === void 0) return [];
      var n = e[t];
      return n === void 0
        ? []
        : typeof n == "function"
        ? r
          ? [n.listener || n]
          : [n]
        : r
        ? it(n)
        : re(n, n.length);
    }
    d.prototype.listeners = function (t) {
      return ee(this, t, !0);
    };
    d.prototype.rawListeners = function (t) {
      return ee(this, t, !1);
    };
    d.listenerCount = function (s, t) {
      return typeof s.listenerCount == "function"
        ? s.listenerCount(t)
        : te.call(s, t);
    };
    d.prototype.listenerCount = te;
    function te(s) {
      var t = this._events;
      if (t !== void 0) {
        var r = t[s];
        if (typeof r == "function") return 1;
        if (r !== void 0) return r.length;
      }
      return 0;
    }
    d.prototype.eventNames = function () {
      return this._eventsCount > 0 ? g(this._events) : [];
    };
    function re(s, t) {
      for (var r = new Array(t), e = 0; e < t; ++e) r[e] = s[e];
      return r;
    }
    function nt(s, t) {
      for (; t + 1 < s.length; t++) s[t] = s[t + 1];
      s.pop();
    }
    function it(s) {
      for (var t = new Array(s.length), r = 0; r < t.length; ++r)
        t[r] = s[r].listener || s[r];
      return t;
    }
    function st(s, t) {
      return new Promise(function (r, e) {
        function n(i) {
          s.removeListener(t, o), e(i);
        }
        function o() {
          typeof s.removeListener == "function" && s.removeListener("error", n),
            r([].slice.call(arguments));
        }
        oe(s, t, o, { once: !0 }), t !== "error" && at(s, n, { once: !0 });
      });
    }
    function at(s, t, r) {
      typeof s.on == "function" && oe(s, "error", t, r);
    }
    function oe(s, t, r, e) {
      if (typeof s.on == "function") e.once ? s.once(t, r) : s.on(t, r);
      else if (typeof s.addEventListener == "function")
        s.addEventListener(t, function n(o) {
          e.once && s.removeEventListener(t, n), r(o);
        });
      else
        throw new TypeError(
          'The "emitter" argument must be of type EventEmitter. Received type ' +
            typeof s
        );
    }
  });
  var ne = m(f(), 1);
  var S = class {
      #e;
      #t;
      constructor(t = {}, r = null, e = null) {
        (this.#e = !1),
          (this.#t = null),
          (this.data = t),
          (this.target = r),
          (this.that = e);
      }
      get intercepted() {
        return this.#e;
      }
      get returnValue() {
        return this.#t;
      }
      respondWith(t) {
        (this.#t = t), (this.#e = !0);
      }
    },
    a = S;
  var E = class extends ne.default {
      constructor(t) {
        super(),
          (this.ctx = t),
          (this.window = t.window),
          (this.document = this.window.document),
          (this.Document = this.window.Document || {}),
          (this.DOMParser = this.window.DOMParser || {}),
          (this.docProto = this.Document.prototype || {}),
          (this.domProto = this.DOMParser.prototype || {}),
          (this.title = t.nativeMethods.getOwnPropertyDescriptor(
            this.docProto,
            "title"
          )),
          (this.cookie = t.nativeMethods.getOwnPropertyDescriptor(
            this.docProto,
            "cookie"
          )),
          (this.referrer = t.nativeMethods.getOwnPropertyDescriptor(
            this.docProto,
            "referrer"
          )),
          (this.domain = t.nativeMethods.getOwnPropertyDescriptor(
            this.docProto,
            "domain"
          )),
          (this.documentURI = t.nativeMethods.getOwnPropertyDescriptor(
            this.docProto,
            "documentURI"
          )),
          (this.write = this.docProto.write),
          (this.writeln = this.docProto.writeln),
          (this.querySelector = this.docProto.querySelector),
          (this.querySelectorAll = this.docProto.querySelectorAll),
          (this.parseFromString = this.domProto.parseFromString),
          (this.URL = t.nativeMethods.getOwnPropertyDescriptor(
            this.docProto,
            "URL"
          ));
      }
      overrideParseFromString() {
        this.ctx.override(this.domProto, "parseFromString", (t, r, e) => {
          if (2 > e.length) return t.apply(r, e);
          let [n, o] = e,
            i = new a({ string: n, type: o }, t, r);
          return (
            this.emit("parseFromString", i),
            i.intercepted
              ? i.returnValue
              : i.target.call(i.that, i.data.string, i.data.type)
          );
        });
      }
      overrideQuerySelector() {
        this.ctx.override(this.docProto, "querySelector", (t, r, e) => {
          if (!e.length) return t.apply(r, e);
          let [n] = e,
            o = new a({ selectors: n }, t, r);
          return (
            this.emit("querySelector", o),
            o.intercepted
              ? o.returnValue
              : o.target.call(o.that, o.data.selectors)
          );
        });
      }
      overrideDomain() {
        this.ctx.overrideDescriptor(this.docProto, "domain", {
          get: (t, r) => {
            let e = new a({ value: t.call(r) }, t, r);
            return (
              this.emit("getDomain", e),
              e.intercepted ? e.returnValue : e.data.value
            );
          },
          set: (t, r, [e]) => {
            let n = new a({ value: e }, t, r);
            return (
              this.emit("setDomain", n),
              n.intercepted
                ? n.returnValue
                : n.target.call(n.that, n.data.value)
            );
          },
        });
      }
      overrideReferrer() {
        this.ctx.overrideDescriptor(this.docProto, "referrer", {
          get: (t, r) => {
            let e = new a({ value: t.call(r) }, t, r);
            return (
              this.emit("referrer", e),
              e.intercepted ? e.returnValue : e.data.value
            );
          },
        });
      }
      overrideCreateTreeWalker() {
        this.ctx.override(this.docProto, "createTreeWalker", (t, r, e) => {
          if (!e.length) return t.apply(r, e);
          let [n, o = 4294967295, i, c] = e,
            l = new a(
              { root: n, show: o, filter: i, expandEntityReferences: c },
              t,
              r
            );
          return (
            this.emit("createTreeWalker", l),
            l.intercepted
              ? l.returnValue
              : l.target.call(
                  l.that,
                  l.data.root,
                  l.data.show,
                  l.data.filter,
                  l.data.expandEntityReferences
                )
          );
        });
      }
      overrideWrite() {
        this.ctx.override(this.docProto, "write", (t, r, e) => {
          if (!e.length) return t.apply(r, e);
          let [...n] = e,
            o = new a({ html: n }, t, r);
          return (
            this.emit("write", o),
            o.intercepted ? o.returnValue : o.target.apply(o.that, o.data.html)
          );
        }),
          this.ctx.override(this.docProto, "writeln", (t, r, e) => {
            if (!e.length) return t.apply(r, e);
            let [...n] = e,
              o = new a({ html: n }, t, r);
            return (
              this.emit("writeln", o),
              o.intercepted
                ? o.returnValue
                : o.target.apply(o.that, o.data.html)
            );
          });
      }
      overrideDocumentURI() {
        this.ctx.overrideDescriptor(this.docProto, "documentURI", {
          get: (t, r) => {
            let e = new a({ value: t.call(r) }, t, r);
            return (
              this.emit("documentURI", e),
              e.intercepted ? e.returnValue : e.data.value
            );
          },
        });
      }
      overrideURL() {
        this.ctx.overrideDescriptor(this.docProto, "URL", {
          get: (t, r) => {
            let e = new a({ value: t.call(r) }, t, r);
            return (
              this.emit("url", e), e.intercepted ? e.returnValue : e.data.value
            );
          },
        });
      }
      overrideCookie() {
        this.ctx.overrideDescriptor(this.docProto, "cookie", {
          get: (t, r) => {
            let e = new a({ value: t.call(r) }, t, r);
            return (
              this.emit("getCookie", e),
              e.intercepted ? e.returnValue : e.data.value
            );
          },
          set: (t, r, [e]) => {
            let n = new a({ value: e }, t, r);
            return (
              this.emit("setCookie", n),
              n.intercepted
                ? n.returnValue
                : n.target.call(n.that, n.data.value)
            );
          },
        });
      }
      overrideTitle() {
        this.ctx.overrideDescriptor(this.docProto, "title", {
          get: (t, r) => {
            let e = new a({ value: t.call(r) }, t, r);
            return (
              this.emit("getTitle", e),
              e.intercepted ? e.returnValue : e.data.value
            );
          },
          set: (t, r, [e]) => {
            let n = new a({ value: e }, t, r);
            return (
              this.emit("setTitle", n),
              n.intercepted
                ? n.returnValue
                : n.target.call(n.that, n.data.value)
            );
          },
        });
      }
    },
    ie = E;
  var se = m(f(), 1);
  var O = class extends se.default {
      constructor(t) {
        super(),
          (this.ctx = t),
          (this.window = t.window),
          (this.Audio = this.window.Audio),
          (this.Element = this.window.Element),
          (this.elemProto = this.Element ? this.Element.prototype : {}),
          (this.innerHTML = t.nativeMethods.getOwnPropertyDescriptor(
            this.elemProto,
            "innerHTML"
          )),
          (this.outerHTML = t.nativeMethods.getOwnPropertyDescriptor(
            this.elemProto,
            "outerHTML"
          )),
          (this.setAttribute = this.elemProto.setAttribute),
          (this.getAttribute = this.elemProto.getAttribute),
          (this.removeAttribute = this.elemProto.removeAttribute),
          (this.hasAttribute = this.elemProto.hasAttribute),
          (this.querySelector = this.elemProto.querySelector),
          (this.querySelectorAll = this.elemProto.querySelectorAll),
          (this.insertAdjacentHTML = this.elemProto.insertAdjacentHTML),
          (this.insertAdjacentText = this.elemProto.insertAdjacentText);
      }
      overrideQuerySelector() {
        this.ctx.override(this.elemProto, "querySelector", (t, r, e) => {
          if (!e.length) return t.apply(r, e);
          let [n] = e,
            o = new a({ selectors: n }, t, r);
          return (
            this.emit("querySelector", o),
            o.intercepted
              ? o.returnValue
              : o.target.call(o.that, o.data.selectors)
          );
        });
      }
      overrideAttribute() {
        this.ctx.override(this.elemProto, "getAttribute", (t, r, e) => {
          if (!e.length) return t.apply(r, e);
          let [n] = e,
            o = new a({ name: n }, t, r);
          return (
            this.emit("getAttribute", o),
            o.intercepted ? o.returnValue : o.target.call(o.that, o.data.name)
          );
        }),
          this.ctx.override(this.elemProto, "setAttribute", (t, r, e) => {
            if (2 > e.length) return t.apply(r, e);
            let [n, o] = e,
              i = new a({ name: n, value: o }, t, r);
            return (
              this.emit("setAttribute", i),
              i.intercepted
                ? i.returnValue
                : i.target.call(i.that, i.data.name, i.data.value)
            );
          }),
          this.ctx.override(this.elemProto, "hasAttribute", (t, r, e) => {
            if (!e.length) return t.apply(r, e);
            let [n] = e,
              o = new a({ name: n }, t, r);
            return (
              this.emit("hasAttribute", o),
              o.intercepted ? o.returnValue : o.target.call(o.that, o.data.name)
            );
          }),
          this.ctx.override(this.elemProto, "removeAttribute", (t, r, e) => {
            if (!e.length) return t.apply(r, e);
            let [n] = e,
              o = new a({ name: n }, t, r);
            return (
              this.emit("removeAttribute", o),
              o.intercepted ? o.returnValue : o.target.call(o.that, o.data.name)
            );
          });
      }
      overrideAudio() {
        this.ctx.override(
          this.window,
          "Audio",
          (t, r, e) => {
            if (!e.length) return new t(...e);
            let [n] = e,
              o = new a({ url: n }, t, r);
            return (
              this.emit("audio", o),
              o.intercepted ? o.returnValue : new o.target(o.data.url)
            );
          },
          !0
        );
      }
      overrideHtml() {
        this.hookProperty(this.Element, "innerHTML", {
          get: (t, r) => {
            let e = new a({ value: t.call(r) }, t, r);
            return (
              this.emit("getInnerHTML", e),
              e.intercepted ? e.returnValue : e.data.value
            );
          },
          set: (t, r, [e]) => {
            let n = new a({ value: e }, t, r);
            if ((this.emit("setInnerHTML", n), n.intercepted))
              return n.returnValue;
            t.call(r, n.data.value);
          },
        }),
          this.hookProperty(this.Element, "outerHTML", {
            get: (t, r) => {
              let e = new a({ value: t.call(r) }, t, r);
              return (
                this.emit("getOuterHTML", e),
                e.intercepted ? e.returnValue : e.data.value
              );
            },
            set: (t, r, [e]) => {
              let n = new a({ value: e }, t, r);
              if ((this.emit("setOuterHTML", n), n.intercepted))
                return n.returnValue;
              t.call(r, n.data.value);
            },
          });
      }
      overrideInsertAdjacentHTML() {
        this.ctx.override(this.elemProto, "insertAdjacentHTML", (t, r, e) => {
          if (2 > e.length) return t.apply(r, e);
          let [n, o] = e,
            i = new a({ position: n, html: o }, t, r);
          return (
            this.emit("insertAdjacentHTML", i),
            i.intercepted
              ? i.returnValue
              : i.target.call(i.that, i.data.position, i.data.html)
          );
        });
      }
      overrideInsertAdjacentText() {
        this.ctx.override(this.elemProto, "insertAdjacentText", (t, r, e) => {
          if (2 > e.length) return t.apply(r, e);
          let [n, o] = e,
            i = new a({ position: n, text: o }, t, r);
          return (
            this.emit("insertAdjacentText", i),
            i.intercepted
              ? i.returnValue
              : i.target.call(i.that, i.data.position, i.data.text)
          );
        });
      }
      hookProperty(t, r, e) {
        if (!t) return !1;
        if (this.ctx.nativeMethods.isArray(t)) {
          for (let o of t) this.hookProperty(o, r, e);
          return !0;
        }
        let n = t.prototype;
        return this.ctx.overrideDescriptor(n, r, e), !0;
      }
    },
    ae = O;
  var ce = m(f(), 1);
  var M = class extends ce.default {
      constructor(t) {
        super(),
          (this.ctx = t),
          (this.window = t.window),
          (this.Node = t.window.Node || {}),
          (this.nodeProto = this.Node.prototype || {}),
          (this.compareDocumentPosition =
            this.nodeProto.compareDocumentPosition),
          (this.contains = this.nodeProto.contains),
          (this.insertBefore = this.nodeProto.insertBefore),
          (this.replaceChild = this.nodeProto.replaceChild),
          (this.append = this.nodeProto.append),
          (this.appendChild = this.nodeProto.appendChild),
          (this.removeChild = this.nodeProto.removeChild),
          (this.textContent = t.nativeMethods.getOwnPropertyDescriptor(
            this.nodeProto,
            "textContent"
          )),
          (this.parentNode = t.nativeMethods.getOwnPropertyDescriptor(
            this.nodeProto,
            "parentNode"
          )),
          (this.parentElement = t.nativeMethods.getOwnPropertyDescriptor(
            this.nodeProto,
            "parentElement"
          )),
          (this.childNodes = t.nativeMethods.getOwnPropertyDescriptor(
            this.nodeProto,
            "childNodes"
          )),
          (this.baseURI = t.nativeMethods.getOwnPropertyDescriptor(
            this.nodeProto,
            "baseURI"
          )),
          (this.previousSibling = t.nativeMethods.getOwnPropertyDescriptor(
            this.nodeProto,
            "previousSibling"
          )),
          (this.ownerDocument = t.nativeMethods.getOwnPropertyDescriptor(
            this.nodeProto,
            "ownerDocument"
          ));
      }
      overrideTextContent() {
        this.ctx.overrideDescriptor(this.nodeProto, "textContent", {
          get: (t, r) => {
            let e = new a({ value: t.call(r) }, t, r);
            return (
              this.emit("getTextContent", e),
              e.intercepted ? e.returnValue : e.data.value
            );
          },
          set: (t, r, [e]) => {
            let n = new a({ value: e }, t, r);
            if ((this.emit("setTextContent", n), n.intercepted))
              return n.returnValue;
            t.call(r, n.data.value);
          },
        });
      }
      overrideAppend() {
        this.ctx.override(this.nodeProto, "append", (t, r, [...e]) => {
          let n = new a({ nodes: e }, t, r);
          return (
            this.emit("append", n),
            n.intercepted ? n.returnValue : n.target.call(n.that, n.data.nodes)
          );
        }),
          this.ctx.override(this.nodeProto, "appendChild", (t, r, e) => {
            if (!e.length) return t.apply(r, e);
            let [n] = e,
              o = new a({ node: n }, t, r);
            return (
              this.emit("appendChild", o),
              o.intercepted ? o.returnValue : o.target.call(o.that, o.data.node)
            );
          });
      }
      overrideBaseURI() {
        this.ctx.overrideDescriptor(this.nodeProto, "baseURI", {
          get: (t, r) => {
            let e = new a({ value: t.call(r) }, t, r);
            return (
              this.emit("baseURI", e),
              e.intercepted ? e.returnValue : e.data.value
            );
          },
        });
      }
      overrideParent() {
        this.ctx.overrideDescriptor(this.nodeProto, "parentNode", {
          get: (t, r) => {
            let e = new a({ node: t.call(r) }, t, r);
            return (
              this.emit("parentNode", e),
              e.intercepted ? e.returnValue : e.data.node
            );
          },
        }),
          this.ctx.overrideDescriptor(this.nodeProto, "parentElement", {
            get: (t, r) => {
              let e = new a({ element: t.call(r) }, t, r);
              return (
                this.emit("parentElement", e),
                e.intercepted ? e.returnValue : e.data.node
              );
            },
          });
      }
      overrideOwnerDocument() {
        this.ctx.overrideDescriptor(this.nodeProto, "ownerDocument", {
          get: (t, r) => {
            let e = new a({ document: t.call(r) }, t, r);
            return (
              this.emit("ownerDocument", e),
              e.intercepted ? e.returnValue : e.data.document
            );
          },
        });
      }
      overrideCompareDocumentPosit1ion() {
        this.ctx.override(
          this.nodeProto,
          "compareDocumentPosition",
          (t, r, e) => {
            if (!e.length) return t.apply(r, e);
            let [n] = e,
              o = new a({ node: n }, t, r);
            return o.intercepted
              ? o.returnValue
              : o.target.call(o.that, o.data.node);
          }
        );
      }
      overrideChildMethods() {
        this.ctx.override(this.nodeProto, "removeChild");
      }
    },
    le = M;
  var he = m(f(), 1);
  var L = class extends he.default {
      constructor(t) {
        super(),
          (this.ctx = t),
          (this.window = t.window),
          (this.Attr = this.window.Attr || {}),
          (this.attrProto = this.Attr.prototype || {}),
          (this.value = t.nativeMethods.getOwnPropertyDescriptor(
            this.attrProto,
            "value"
          )),
          (this.name = t.nativeMethods.getOwnPropertyDescriptor(
            this.attrProto,
            "name"
          )),
          (this.getNamedItem = this.attrProto.getNamedItem || null),
          (this.setNamedItem = this.attrProto.setNamedItem || null),
          (this.removeNamedItem = this.attrProto.removeNamedItem || null),
          (this.getNamedItemNS = this.attrProto.getNamedItemNS || null),
          (this.setNamedItemNS = this.attrProto.setNamedItemNS || null),
          (this.removeNamedItemNS = this.attrProto.removeNamedItemNS || null),
          (this.item = this.attrProto.item || null);
      }
      overrideNameValue() {
        this.ctx.overrideDescriptor(this.attrProto, "name", {
          get: (t, r) => {
            let e = new a({ value: t.call(r) }, t, r);
            return (
              this.emit("name", e), e.intercepted ? e.returnValue : e.data.value
            );
          },
        }),
          this.ctx.overrideDescriptor(this.attrProto, "value", {
            get: (t, r) => {
              let e = new a(
                { name: this.name.get.call(r), value: t.call(r) },
                t,
                r
              );
              return (
                this.emit("getValue", e),
                e.intercepted ? e.returnValue : e.data.value
              );
            },
            set: (t, r, [e]) => {
              let n = new a({ name: this.name.get.call(r), value: e }, t, r);
              if ((this.emit("setValue", n), n.intercepted))
                return n.returnValue;
              n.target.call(n.that, n.data.value);
            },
          });
      }
      overrideItemMethods() {
        this.ctx.override(this.attrProto, "getNamedItem", (t, r, e) => {
          if (!e.length) return t.apply(r, e);
          let [n] = e,
            o = new a({ name: n }, t, r);
          return (
            this.emit("getNamedItem", o),
            o.intercepted ? o.returnValue : o.target.call(o.that, o.data.name)
          );
        }),
          this.ctx.override(this.attrProto, "setNamedItem", (t, r, e) => {
            if (2 > e.length) return t.apply(r, e);
            let [n, o] = e,
              i = new a({ name: n, value: o }, t, r);
            return (
              this.emit("setNamedItem", i),
              i.intercepted
                ? i.returnValue
                : i.target.call(i.that, i.data.name, i.data.value)
            );
          }),
          this.ctx.override(this.attrProto, "removeNamedItem", (t, r, e) => {
            if (!e.length) return t.apply(r, e);
            let [n] = e,
              o = new a({ name: n }, t, r);
            return (
              this.emit("removeNamedItem", o),
              o.intercepted ? o.returnValue : o.target.call(o.that, o.data.name)
            );
          }),
          this.ctx.override(this.attrProto, "item", (t, r, e) => {
            if (!e.length) return t.apply(r, e);
            let [n] = e,
              o = new a({ index: n }, t, r);
            return (
              this.emit("item", o),
              o.intercepted ? o.returnValue : o.target.call(o.that, o.data.name)
            );
          }),
          this.ctx.override(this.attrProto, "getNamedItemNS", (t, r, e) => {
            if (2 > e.length) return t.apply(r, e);
            let [n, o] = e,
              i = new a({ namespace: n, localName: o }, t, r);
            return (
              this.emit("getNamedItemNS", i),
              i.intercepted
                ? i.returnValue
                : i.target.call(i.that, i.data.namespace, i.data.localName)
            );
          }),
          this.ctx.override(this.attrProto, "setNamedItemNS", (t, r, e) => {
            if (!e.length) return t.apply(r, e);
            let [n] = e,
              o = new a({ attr: n }, t, r);
            return (
              this.emit("setNamedItemNS", o),
              o.intercepted ? o.returnValue : o.target.call(o.that, o.data.name)
            );
          }),
          this.ctx.override(this.attrProto, "removeNamedItemNS", (t, r, e) => {
            if (2 > e.length) return t.apply(r, e);
            let [n, o] = e,
              i = new a({ namespace: n, localName: o }, t, r);
            return (
              this.emit("removeNamedItemNS", i),
              i.intercepted
                ? i.returnValue
                : i.target.call(i.that, i.data.namespace, i.data.localName)
            );
          });
      }
    },
    ue = L;
  var de = m(f(), 1);
  var D = class extends de.default {
      constructor(t) {
        super(),
          (this.ctx = t),
          (this.window = t.window),
          (this.Function = this.window.Function),
          (this.fnProto = this.Function.prototype),
          (this.toString = this.fnProto.toString),
          (this.fnStrings = t.fnStrings),
          (this.call = this.fnProto.call),
          (this.apply = this.fnProto.apply),
          (this.bind = this.fnProto.bind);
      }
      overrideFunction() {
        this.ctx.override(
          this.window,
          "Function",
          (t, r, e) => {
            if (!e.length) return t.apply(r, e);
            let n = e[e.length - 1],
              o = [];
            for (let c = 0; c < e.length - 1; c++) o.push(e[c]);
            let i = new a({ script: n, args: o }, t, r);
            return (
              this.emit("function", i),
              i.intercepted
                ? i.returnValue
                : i.target.call(i.that, ...i.data.args, i.data.script)
            );
          },
          !0
        );
      }
      overrideToString() {
        this.ctx.override(this.fnProto, "toString", (t, r) => {
          let e = new a({ fn: r }, t, r);
          return (
            this.emit("toString", e),
            e.intercepted ? e.returnValue : e.target.call(e.data.fn)
          );
        });
      }
    },
    pe = D;
  var fe = m(f(), 1);
  var N = class extends fe.default {
      constructor(t) {
        super(),
          (this.ctx = t),
          (this.window = t.window),
          (this.Object = this.window.Object),
          (this.getOwnPropertyDescriptors =
            this.Object.getOwnPropertyDescriptors),
          (this.getOwnPropertyDescriptor =
            this.Object.getOwnPropertyDescriptor),
          (this.getOwnPropertyNames = this.Object.getOwnPropertyNames);
      }
      overrideGetPropertyNames() {
        this.ctx.override(this.Object, "getOwnPropertyNames", (t, r, e) => {
          if (!e.length) return t.apply(r, e);
          let [n] = e,
            o = new a({ names: t.call(r, n) }, t, r);
          return (
            this.emit("getOwnPropertyNames", o),
            o.intercepted ? o.returnValue : o.data.names
          );
        });
      }
      overrideGetOwnPropertyDescriptors() {
        this.ctx.override(
          this.Object,
          "getOwnPropertyDescriptors",
          (t, r, e) => {
            if (!e.length) return t.apply(r, e);
            let [n] = e,
              o = new a({ descriptors: t.call(r, n) }, t, r);
            return (
              this.emit("getOwnPropertyDescriptors", o),
              o.intercepted ? o.returnValue : o.data.descriptors
            );
          }
        );
      }
    },
    me = N;
  var we = m(f(), 1);
  var R = class extends we.default {
      constructor(t) {
        super(),
          (this.ctx = t),
          (this.window = t.window),
          (this.fetch = this.window.fetch),
          (this.Request = this.window.Request),
          (this.Response = this.window.Response),
          (this.Headers = this.window.Headers),
          (this.reqProto = this.Request ? this.Request.prototype : {}),
          (this.resProto = this.Response ? this.Response.prototype : {}),
          (this.headersProto = this.Headers ? this.Headers.prototype : {}),
          (this.reqUrl = t.nativeMethods.getOwnPropertyDescriptor(
            this.reqProto,
            "url"
          )),
          (this.resUrl = t.nativeMethods.getOwnPropertyDescriptor(
            this.resProto,
            "url"
          )),
          (this.reqHeaders = t.nativeMethods.getOwnPropertyDescriptor(
            this.reqProto,
            "headers"
          )),
          (this.resHeaders = t.nativeMethods.getOwnPropertyDescriptor(
            this.resProto,
            "headers"
          ));
      }
      override() {
        return (
          this.overrideRequest(), this.overrideUrl(), this.overrideHeaders(), !0
        );
      }
      overrideRequest() {
        return this.fetch
          ? (this.ctx.override(this.window, "fetch", (t, r, e) => {
              if (!e.length || e[0] instanceof this.Request)
                return t.apply(r, e);
              let [n, o = {}] = e,
                i = new a({ input: n, options: o }, t, r);
              return (
                this.emit("request", i),
                i.intercepted
                  ? i.returnValue
                  : i.target.call(i.that, i.data.input, i.data.options)
              );
            }),
            this.ctx.override(
              this.window,
              "Request",
              (t, r, e) => {
                if (!e.length) return new t(...e);
                let [n, o = {}] = e,
                  i = new a({ input: n, options: o }, t);
                return (
                  this.emit("request", i),
                  i.intercepted
                    ? i.returnValue
                    : new i.target(i.data.input, i.data.options)
                );
              },
              !0
            ),
            !0)
          : !1;
      }
      overrideUrl() {
        return (
          this.ctx.overrideDescriptor(this.reqProto, "url", {
            get: (t, r) => {
              let e = new a({ value: t.call(r) }, t, r);
              return (
                this.emit("requestUrl", e),
                e.intercepted ? e.returnValue : e.data.value
              );
            },
          }),
          this.ctx.overrideDescriptor(this.resProto, "url", {
            get: (t, r) => {
              let e = new a({ value: t.call(r) }, t, r);
              return (
                this.emit("responseUrl", e),
                e.intercepted ? e.returnValue : e.data.value
              );
            },
          }),
          !0
        );
      }
      overrideHeaders() {
        return this.Headers
          ? (this.ctx.overrideDescriptor(this.reqProto, "headers", {
              get: (t, r) => {
                let e = new a({ value: t.call(r) }, t, r);
                return (
                  this.emit("requestHeaders", e),
                  e.intercepted ? e.returnValue : e.data.value
                );
              },
            }),
            this.ctx.overrideDescriptor(this.resProto, "headers", {
              get: (t, r) => {
                let e = new a({ value: t.call(r) }, t, r);
                return (
                  this.emit("responseHeaders", e),
                  e.intercepted ? e.returnValue : e.data.value
                );
              },
            }),
            this.ctx.override(this.headersProto, "get", (t, r, [e]) => {
              if (!e) return t.call(r);
              let n = new a({ name: e, value: t.call(r, e) }, t, r);
              return (
                this.emit("getHeader", n),
                n.intercepted ? n.returnValue : n.data.value
              );
            }),
            this.ctx.override(this.headersProto, "set", (t, r, e) => {
              if (2 > e.length) return t.apply(r, e);
              let [n, o] = e,
                i = new a({ name: n, value: o }, t, r);
              return (
                this.emit("setHeader", i),
                i.intercepted
                  ? i.returnValue
                  : i.target.call(i.that, i.data.name, i.data.value)
              );
            }),
            this.ctx.override(this.headersProto, "has", (t, r, e) => {
              if (!e.length) return t.call(r);
              let [n] = e,
                o = new a({ name: n, value: t.call(r, n) }, t, r);
              return (
                this.emit("hasHeader", o),
                o.intercepted ? o.returnValue : o.data
              );
            }),
            this.ctx.override(this.headersProto, "append", (t, r, e) => {
              if (2 > e.length) return t.apply(r, e);
              let [n, o] = e,
                i = new a({ name: n, value: o }, t, r);
              return (
                this.emit("appendHeader", i),
                i.intercepted
                  ? i.returnValue
                  : i.target.call(i.that, i.data.name, i.data.value)
              );
            }),
            this.ctx.override(this.headersProto, "delete", (t, r, e) => {
              if (!e.length) return t.apply(r, e);
              let [n] = e,
                o = new a({ name: n }, t, r);
              return (
                this.emit("deleteHeader", o),
                o.intercepted
                  ? o.returnValue
                  : o.target.call(o.that, o.data.name)
              );
            }),
            !0)
          : !1;
      }
    },
    ve = R;
  var ye = m(f(), 1);
  var V = class extends ye.default {
      constructor(t) {
        super(),
          (this.ctx = t),
          (this.window = t.window),
          (this.XMLHttpRequest = this.window.XMLHttpRequest),
          (this.xhrProto = this.window.XMLHttpRequest
            ? this.window.XMLHttpRequest.prototype
            : {}),
          (this.open = this.xhrProto.open),
          (this.abort = this.xhrProto.abort),
          (this.send = this.xhrProto.send),
          (this.overrideMimeType = this.xhrProto.overrideMimeType),
          (this.getAllResponseHeaders = this.xhrProto.getAllResponseHeaders),
          (this.getResponseHeader = this.xhrProto.getResponseHeader),
          (this.setRequestHeader = this.xhrProto.setRequestHeader),
          (this.responseURL = t.nativeMethods.getOwnPropertyDescriptor(
            this.xhrProto,
            "responseURL"
          )),
          (this.responseText = t.nativeMethods.getOwnPropertyDescriptor(
            this.xhrProto,
            "responseText"
          ));
      }
      override() {
        this.overrideOpen(),
          this.overrideSend(),
          this.overrideMimeType(),
          this.overrideGetResHeader(),
          this.overrideGetResHeaders(),
          this.overrideSetReqHeader();
      }
      overrideOpen() {
        this.ctx.override(this.xhrProto, "open", (t, r, e) => {
          if (2 > e.length) return t.apply(r, e);
          let [n, o, i = !0, c = null, l = null] = e,
            u = new a(
              { method: n, input: o, async: i, user: c, password: l },
              t,
              r
            );
          return (
            this.emit("open", u),
            u.intercepted
              ? u.returnValue
              : u.target.call(
                  u.that,
                  u.data.method,
                  u.data.input,
                  u.data.async,
                  u.data.user,
                  u.data.password
                )
          );
        });
      }
      overrideResponseUrl() {
        this.ctx.overrideDescriptor(this.xhrProto, "responseURL", {
          get: (t, r) => {
            let e = new a({ value: t.call(r) }, t, r);
            return (
              this.emit("responseUrl", e),
              e.intercepted ? e.returnValue : e.data.value
            );
          },
        });
      }
      overrideSend() {
        this.ctx.override(this.xhrProto, "send", (t, r, [e = null]) => {
          let n = new a({ body: e }, t, r);
          return (
            this.emit("send", n),
            n.intercepted ? n.returnValue : n.target.call(n.that, n.data.body)
          );
        });
      }
      overrideSetReqHeader() {
        this.ctx.override(this.xhrProto, "setRequestHeader", (t, r, e) => {
          if (2 > e.length) return t.apply(r, e);
          let [n, o] = e,
            i = new a({ name: n, value: o }, t, r);
          return (
            this.emit("setReqHeader", i),
            i.intercepted
              ? i.returnValue
              : i.target.call(i.that, i.data.name, i.data.value)
          );
        });
      }
      overrideGetResHeaders() {
        this.ctx.override(this.xhrProto, "getAllResponseHeaders", (t, r) => {
          let e = new a({ value: t.call(r) }, t, r);
          return (
            this.emit("getAllResponseHeaders", e),
            e.intercepted ? e.returnValue : e.data.value
          );
        });
      }
      overrideGetResHeader() {
        this.ctx.override(this.xhrProto, "getResponseHeader", (t, r, e) => {
          if (!e.length) return t.apply(r, e);
          let [n] = e,
            o = new a({ name: n, value: t.call(r, n) }, t, r);
          return o.intercepted ? o.returnValue : o.data.value;
        });
      }
    },
    ge = V;
  var Pe = m(f(), 1);
  var C = class extends Pe.default {
      constructor(t) {
        super(),
          (this.ctx = t),
          (this.window = t.window),
          (this.EventSource = this.window.EventSource || {}),
          (this.esProto = this.EventSource.prototype || {}),
          (this.url = t.nativeMethods.getOwnPropertyDescriptor(
            this.esProto,
            "url"
          )),
          (this.CONNECTING = 0),
          (this.OPEN = 1),
          (this.CLOSED = 2);
      }
      overrideConstruct() {
        this.ctx.override(
          this.window,
          "EventSource",
          (t, r, e) => {
            if (!e.length) return new t(...e);
            let [n, o = {}] = e,
              i = new a({ url: n, config: o }, t, r);
            return (
              this.emit("construct", i),
              i.intercepted
                ? i.returnValue
                : new i.target(i.data.url, i.data.config)
            );
          },
          !0
        ),
          "EventSource" in this.window &&
            ((this.window.EventSource.CONNECTING = this.CONNECTING),
            (this.window.EventSource.OPEN = this.OPEN),
            (this.window.EventSource.CLOSED = this.CLOSED));
      }
      overrideUrl() {
        this.ctx.overrideDescriptor(this.esProto, "url", {
          get: (t, r) => {
            let e = new a({ value: t.call(r) }, t, r);
            return this.emit("url", e), e.data.value;
          },
        });
      }
    },
    be = C;
  var xe = m(f(), 1);
  var I = class extends xe.default {
      constructor(t) {
        super(),
          (this.ctx = t),
          (this.window = this.ctx.window),
          (this.History = this.window.History),
          (this.history = this.window.history),
          (this.historyProto = this.History ? this.History.prototype : {}),
          (this.pushState = this.historyProto.pushState),
          (this.replaceState = this.historyProto.replaceState),
          (this.go = this.historyProto.go),
          (this.back = this.historyProto.back),
          (this.forward = this.historyProto.forward);
      }
      override() {
        this.overridePushState(),
          this.overrideReplaceState(),
          this.overrideGo(),
          this.overrideForward(),
          this.overrideBack();
      }
      overridePushState() {
        this.ctx.override(this.historyProto, "pushState", (t, r, e) => {
          if (2 > e.length) return t.apply(r, e);
          let [n, o, i = ""] = e,
            c = new a({ state: n, title: o, url: i }, t, r);
          return (
            this.emit("pushState", c),
            c.intercepted
              ? c.returnValue
              : c.target.call(c.that, c.data.state, c.data.title, c.data.url)
          );
        });
      }
      overrideReplaceState() {
        this.ctx.override(this.historyProto, "replaceState", (t, r, e) => {
          if (2 > e.length) return t.apply(r, e);
          let [n, o, i = ""] = e,
            c = new a({ state: n, title: o, url: i }, t, r);
          return (
            this.emit("replaceState", c),
            c.intercepted
              ? c.returnValue
              : c.target.call(c.that, c.data.state, c.data.title, c.data.url)
          );
        });
      }
      overrideGo() {
        this.ctx.override(this.historyProto, "go", (t, r, [e]) => {
          let n = new a({ delta: e }, t, r);
          return (
            this.emit("go", n),
            n.intercepted ? n.returnValue : n.target.call(n.that, n.data.delta)
          );
        });
      }
      overrideForward() {
        this.ctx.override(this.historyProto, "forward", (t, r) => {
          let e = new a(null, t, r);
          return (
            this.emit("forward", e),
            e.intercepted ? e.returnValue : e.target.call(e.that)
          );
        });
      }
      overrideBack() {
        this.ctx.override(this.historyProto, "back", (t, r) => {
          let e = new a(null, t, r);
          return (
            this.emit("back", e),
            e.intercepted ? e.returnValue : e.target.call(e.that)
          );
        });
      }
    },
    ke = I;
  var Se = m(f(), 1),
    T = class extends Se.default {
      constructor(t) {
        super(),
          (this.ctx = t),
          (this.window = t.window),
          (this.location = this.window.location),
          (this.WorkerLocation = this.ctx.worker
            ? this.window.WorkerLocation
            : null),
          (this.workerLocProto = this.WorkerLocation
            ? this.WorkerLocation.prototype
            : {}),
          (this.keys = [
            "href",
            "protocol",
            "host",
            "hostname",
            "port",
            "pathname",
            "search",
            "hash",
            "origin",
          ]),
          (this.HashChangeEvent = this.window.HashChangeEvent || null),
          (this.href = this.WorkerLocation
            ? t.nativeMethods.getOwnPropertyDescriptor(
                this.workerLocProto,
                "href"
              )
            : t.nativeMethods.getOwnPropertyDescriptor(this.location, "href"));
      }
      overrideWorkerLocation(t) {
        if (!this.WorkerLocation) return !1;
        let r = this;
        for (let e of this.keys)
          this.ctx.overrideDescriptor(this.workerLocProto, e, {
            get: () => t(r.href.get.call(this.location))[e],
          });
        return !0;
      }
      emulate(t, r) {
        let e = {},
          n = this;
        for (let o of n.keys)
          this.ctx.nativeMethods.defineProperty(e, o, {
            get() {
              return t(n.href.get.call(n.location))[o];
            },
            set:
              o !== "origin"
                ? function (i) {
                    switch (o) {
                      case "href":
                        n.location.href = r(i);
                        break;
                      case "hash":
                        n.emit(
                          "hashchange",
                          e.href,
                          i.trim().startsWith("#")
                            ? new URL(i.trim(), e.href).href
                            : new URL("#" + i.trim(), e.href).href,
                          n
                        );
                        break;
                      default:
                        {
                          let c = new URL(e.href);
                          (c[o] = i), (n.location.href = r(c.href));
                        }
                        break;
                    }
                  }
                : void 0,
            configurable: !1,
            enumerable: !0,
          });
        return (
          "reload" in this.location &&
            this.ctx.nativeMethods.defineProperty(e, "reload", {
              value: this.ctx.wrap(this.location, "reload", (o, i) =>
                o.call(i === e ? this.location : i)
              ),
              writable: !1,
              enumerable: !0,
            }),
          "replace" in this.location &&
            this.ctx.nativeMethods.defineProperty(e, "replace", {
              value: this.ctx.wrap(this.location, "assign", (o, i, c) => {
                (!c.length || i !== e) && o.call(i), (i = this.location);
                let [l] = c,
                  u = new URL(l, e.href);
                return o.call(i === e ? this.location : i, r(u.href));
              }),
              writable: !1,
              enumerable: !0,
            }),
          "assign" in this.location &&
            this.ctx.nativeMethods.defineProperty(e, "assign", {
              value: this.ctx.wrap(this.location, "assign", (o, i, c) => {
                (!c.length || i !== e) && o.call(i), (i = this.location);
                let [l] = c,
                  u = new URL(l, e.href);
                return o.call(i === e ? this.location : i, r(u.href));
              }),
              writable: !1,
              enumerable: !0,
            }),
          "ancestorOrigins" in this.location &&
            this.ctx.nativeMethods.defineProperty(e, "ancestorOrigins", {
              get() {
                let o = [];
                return (
                  n.window.DOMStringList &&
                    n.ctx.nativeMethods.setPrototypeOf(
                      o,
                      n.window.DOMStringList.prototype
                    ),
                  o
                );
              },
              set: void 0,
              enumerable: !0,
            }),
          this.ctx.nativeMethods.defineProperty(e, "toString", {
            value: this.ctx.wrap(this.location, "toString", () => e.href),
            enumerable: !0,
            writable: !1,
          }),
          this.ctx.nativeMethods.defineProperty(e, Symbol.toPrimitive, {
            value: () => e.href,
            writable: !1,
            enumerable: !1,
          }),
          this.ctx.window.Location &&
            this.ctx.nativeMethods.setPrototypeOf(
              e,
              this.ctx.window.Location.prototype
            ),
          e
        );
      }
    },
    Ee = T;
  var Oe = m(f(), 1);
  var H = class extends Oe.default {
      constructor(t) {
        super(),
          (this.ctx = t),
          (this.window = this.ctx.window),
          (this.postMessage = this.window.postMessage),
          (this.MessageEvent = this.window.MessageEvent || {}),
          (this.MessagePort = this.window.MessagePort || {}),
          (this.mpProto = this.MessagePort.prototype || {}),
          (this.mpPostMessage = this.mpProto.postMessage),
          (this.messageProto = this.MessageEvent.prototype || {}),
          (this.messageData = t.nativeMethods.getOwnPropertyDescriptor(
            this.messageProto,
            "data"
          )),
          (this.messageOrigin = t.nativeMethods.getOwnPropertyDescriptor(
            this.messageProto,
            "origin"
          ));
      }
      overridePostMessage() {
        this.ctx.override(this.window, "postMessage", (t, r, e) => {
          if (!e.length) return t.apply(r, e);
          let n, o, i;
          this.ctx.worker ? ([n, i = []] = e) : ([n, o, i = []] = e);
          let c = new a(
            { message: n, origin: o, transfer: i, worker: this.ctx.worker },
            t,
            r
          );
          return (
            this.emit("postMessage", c),
            c.intercepted
              ? c.returnValue
              : this.ctx.worker
              ? c.target.call(c.that, c.data.message, c.data.transfer)
              : c.target.call(
                  c.that,
                  c.data.message,
                  c.data.origin,
                  c.data.transfer
                )
          );
        });
      }
      wrapPostMessage(t, r, e = !1) {
        return this.ctx.wrap(t, r, (n, o, i) => {
          if (this.ctx.worker ? !i.length : 2 > i) return n.apply(o, i);
          let c, l, u;
          e ? (([c, u = []] = i), (l = null)) : ([c, l, u = []] = i);
          let h = new a(
            { message: c, origin: l, transfer: u, worker: this.ctx.worker },
            n,
            t
          );
          return (
            this.emit("postMessage", h),
            h.intercepted
              ? h.returnValue
              : e
              ? h.target.call(h.that, h.data.message, h.data.transfer)
              : h.target.call(
                  h.that,
                  h.data.message,
                  h.data.origin,
                  h.data.transfer
                )
          );
        });
      }
      overrideMessageOrigin() {
        this.ctx.overrideDescriptor(this.messageProto, "origin", {
          get: (t, r) => {
            let e = new a({ value: t.call(r) }, t, r);
            return (
              this.emit("origin", e),
              e.intercepted ? e.returnValue : e.data.value
            );
          },
        });
      }
      overrideMessageData() {
        this.ctx.overrideDescriptor(this.messageProto, "data", {
          get: (t, r) => {
            let e = new a({ value: t.call(r) }, t, r);
            return (
              this.emit("data", e), e.intercepted ? e.returnValue : e.data.value
            );
          },
        });
      }
    },
    Me = H;
  var Le = m(f(), 1);
  var A = class extends Le.default {
      constructor(t) {
        super(),
          (this.ctx = t),
          (this.window = t.window),
          (this.navigator = this.window.navigator),
          (this.Navigator = this.window.Navigator || {}),
          (this.navProto = this.Navigator.prototype || {}),
          (this.sendBeacon = this.navProto.sendBeacon);
      }
      overrideSendBeacon() {
        this.ctx.override(this.navProto, "sendBeacon", (t, r, e) => {
          if (!e.length) return t.apply(r, e);
          let [n, o = ""] = e,
            i = new a({ url: n, data: o }, t, r);
          return (
            this.emit("sendBeacon", i),
            i.intercepted
              ? i.returnValue
              : i.target.call(i.that, i.data.url, i.data.data)
          );
        });
      }
    },
    De = A;
  var Te = m(f(), 1);
  var Ut = globalThis.fetch,
    Ne = globalThis.SharedWorker,
    Re = globalThis.localStorage,
    ct = globalThis.navigator.serviceWorker,
    v = MessagePort.prototype.postMessage,
    Wt = {
      prototype: { send: WebSocket.prototype.send },
      CLOSED: WebSocket.CLOSED,
      CLOSING: WebSocket.CLOSING,
      CONNECTING: WebSocket.CONNECTING,
      OPEN: WebSocket.OPEN,
    };
  async function W() {
    let s = (
        await self.clients.matchAll({ type: "window", includeUncontrolled: !0 })
      ).map(async (r) => {
        let e = await (function (n) {
          let o = new MessageChannel();
          return new Promise((i) => {
            n.postMessage({ type: "getPort", port: o.port2 }, [o.port2]),
              (o.port1.onmessage = (c) => {
                i(c.data);
              });
          });
        })(r);
        return await Ie(e), e;
      }),
      t = Promise.race([
        Promise.any(s),
        new Promise((r, e) => setTimeout(e, 1e3, new TypeError("timeout"))),
      ]);
    try {
      return await t;
    } catch (r) {
      if (r instanceof AggregateError)
        throw (
          (console.error(
            "bare-mux: failed to get a bare-mux SharedWorker MessagePort as all clients returned an invalid MessagePort."
          ),
          new Error("All clients returned an invalid MessagePort."))
        );
      return (
        console.warn(
          "bare-mux: failed to get a bare-mux SharedWorker MessagePort within 1s, retrying"
        ),
        await W()
      );
    }
  }
  function Ie(s) {
    let t = new MessageChannel(),
      r = new Promise((e, n) => {
        (t.port1.onmessage = (o) => {
          o.data.type === "pong" && e();
        }),
          setTimeout(n, 1500);
      });
    return (
      v.call(s, { message: { type: "ping" }, port: t.port2 }, [t.port2]), r
    );
  }
  function Ve(s, t) {
    let r = new Ne(s, "bare-mux-worker");
    return (
      t &&
        ct.addEventListener("message", (e) => {
          if (e.data.type === "getPort" && e.data.port) {
            console.debug("bare-mux: recieved request for port from sw");
            let n = new Ne(s, "bare-mux-worker");
            v.call(e.data.port, n.port, [n.port]);
          }
        }),
      r.port
    );
  }
  var U = null;
  function lt() {
    if (U === null) {
      let s = new MessageChannel(),
        t = new ReadableStream(),
        r;
      try {
        v.call(s.port1, t, [t]), (r = !0);
      } catch {
        r = !1;
      }
      return (U = r), r;
    }
    return U;
  }
  var j = class {
    constructor(t) {
      (this.channel = new BroadcastChannel("bare-mux")),
        t instanceof MessagePort || t instanceof Promise
          ? (this.port = t)
          : this.createChannel(t, !0);
    }
    createChannel(t, r) {
      if (self.clients)
        (this.port = W()),
          (this.channel.onmessage = (e) => {
            e.data.type === "refreshPort" && (this.port = W());
          });
      else if (t && SharedWorker) {
        if (!t.startsWith("/") && !t.includes("://"))
          throw new Error(
            "Invalid URL. Must be absolute or start at the root."
          );
        (this.port = Ve(t, r)),
          console.debug("bare-mux: setting localStorage bare-mux-path to", t),
          (Re["bare-mux-path"] = t);
      } else {
        if (!SharedWorker)
          throw new Error("Unable to get a channel to the SharedWorker.");
        {
          let e = Re["bare-mux-path"];
          if (
            (console.debug("bare-mux: got localStorage bare-mux-path:", e), !e)
          )
            throw new Error(
              "Unable to get bare-mux workerPath from localStorage."
            );
          this.port = Ve(e, r);
        }
      }
    }
    async sendMessage(t, r) {
      this.port instanceof Promise && (this.port = await this.port);
      try {
        await Ie(this.port);
      } catch {
        return (
          console.warn(
            "bare-mux: Failed to get a ping response from the worker within 1.5s. Assuming port is dead."
          ),
          this.createChannel(),
          await this.sendMessage(t, r)
        );
      }
      let e = new MessageChannel(),
        n = [e.port2, ...(r || [])],
        o = new Promise((i, c) => {
          e.port1.onmessage = (l) => {
            let u = l.data;
            u.type === "error" ? c(u.error) : i(u);
          };
        });
      return v.call(this.port, { message: t, port: e.port2 }, n), await o;
    }
  };
  function Ce(s, t, r) {
    console.error(`error while processing '${r}': `, t),
      s.postMessage({ type: "error", error: t });
  }
  var b = class {
    constructor(t) {
      this.worker = new j(t);
    }
    async getTransport() {
      return (await this.worker.sendMessage({ type: "get" })).name;
    }
    async setTransport(t, r, e) {
      await this.setManualTransport(
        `
			const { default: BareTransport } = await import("${t}");
			return [BareTransport, "${t}"];
		`,
        r,
        e
      );
    }
    async setManualTransport(t, r, e) {
      if (t === "bare-mux-remote") throw new Error("Use setRemoteTransport.");
      await this.worker.sendMessage(
        { type: "set", client: { function: t, args: r } },
        e
      );
    }
    async setRemoteTransport(t, r) {
      let e = new MessageChannel();
      (e.port1.onmessage = async (n) => {
        let o = n.data.port,
          i = n.data.message;
        if (i.type === "fetch")
          try {
            t.ready || (await t.init()),
              await (async function (c, l, u) {
                let h = await u.request(
                  new URL(c.fetch.remote),
                  c.fetch.method,
                  c.fetch.body,
                  c.fetch.headers,
                  null
                );
                if (!lt() && h.body instanceof ReadableStream) {
                  let w = new Response(h.body);
                  h.body = await w.arrayBuffer();
                }
                h.body instanceof ReadableStream ||
                h.body instanceof ArrayBuffer
                  ? v.call(l, { type: "fetch", fetch: h }, [h.body])
                  : v.call(l, { type: "fetch", fetch: h });
              })(i, o, t);
          } catch (c) {
            Ce(o, c, "fetch");
          }
        else if (i.type === "websocket")
          try {
            t.ready || (await t.init()),
              await (async function (c, l, u) {
                let [h, w] = u.connect(
                  new URL(c.websocket.url),
                  c.websocket.protocols,
                  c.websocket.requestHeaders,
                  (p) => {
                    v.call(c.websocket.channel, { type: "open", args: [p] });
                  },
                  (p) => {
                    p instanceof ArrayBuffer
                      ? v.call(
                          c.websocket.channel,
                          { type: "message", args: [p] },
                          [p]
                        )
                      : v.call(c.websocket.channel, {
                          type: "message",
                          args: [p],
                        });
                  },
                  (p, Xe) => {
                    v.call(c.websocket.channel, {
                      type: "close",
                      args: [p, Xe],
                    });
                  },
                  (p) => {
                    v.call(c.websocket.channel, { type: "error", args: [p] });
                  }
                );
                (c.websocket.channel.onmessage = (p) => {
                  p.data.type === "data"
                    ? h(p.data.data)
                    : p.data.type === "close" &&
                      w(p.data.closeCode, p.data.closeReason);
                }),
                  v.call(l, { type: "websocket" });
              })(i, o, t);
          } catch (c) {
            Ce(o, c, "websocket");
          }
      }),
        await this.worker.sendMessage(
          {
            type: "set",
            client: { function: "bare-mux-remote", args: [e.port2, r] },
          },
          [e.port2]
        );
    }
    getInnerPort() {
      return this.worker.port;
    }
  };
  console.debug("bare-mux: running v2.1.6 (build 4b7607b)");
  var q = class extends Te.default {
      constructor(t) {
        super(),
          (this.ctx = t),
          (this.window = t.window),
          (this.Worker = this.window.Worker || {}),
          (this.Worklet = this.window.Worklet || {}),
          (this.workletProto = this.Worklet.prototype || {}),
          (this.workerProto = this.Worker.prototype || {}),
          (this.postMessage = this.workerProto.postMessage),
          (this.terminate = this.workerProto.terminate),
          (this.addModule = this.workletProto.addModule);
      }
      overrideWorker() {
        this.ctx.override(
          this.window,
          "Worker",
          (t, r, e) => {
            if (!e.length) return new t(...e);
            let [n, o = {}] = e,
              i = new a({ url: n, options: o }, t, r);
            if ((this.emit("worker", i), i.intercepted)) return i.returnValue;
            let c = new i.target(i.data.url, i.data.options),
              l = new b();
            return (
              (async () => {
                let u = await l.getInnerPort();
                c.postMessage({ __uv$type: "baremuxinit", port: u }, [u]);
              })(),
              c
            );
          },
          !0
        );
      }
      overrideAddModule() {
        this.ctx.override(this.workletProto, "addModule", (t, r, e) => {
          if (!e.length) return t.apply(r, e);
          let [n, o = {}] = e,
            i = new a({ url: n, options: o }, t, r);
          return (
            this.emit("addModule", i),
            i.intercepted
              ? i.returnValue
              : i.target.call(i.that, i.data.url, i.data.options)
          );
        });
      }
      overridePostMessage() {
        this.ctx.override(this.workerProto, "postMessage", (t, r, e) => {
          if (!e.length) return t.apply(r, e);
          let [n, o = []] = e,
            i = new a({ message: n, transfer: o }, t, r);
          return (
            this.emit("postMessage", i),
            i.intercepted
              ? i.returnValue
              : i.target.call(i.that, i.data.message, i.data.transfer)
          );
        });
      }
      overrideImportScripts() {
        this.ctx.override(this.window, "importScripts", (t, r, e) => {
          if (!e.length) return t.apply(r, e);
          let n = new a({ scripts: e }, t, r);
          return (
            this.emit("importScripts", n),
            n.intercepted
              ? n.returnValue
              : n.target.apply(n.that, n.data.scripts)
          );
        });
      }
    },
    He = q;
  var Ae = m(f(), 1);
  var _ = class extends Ae.default {
      constructor(t) {
        super(),
          (this.ctx = t),
          (this.window = this.ctx.window),
          (this.URL = this.window.URL || {}),
          (this.createObjectURL = this.URL.createObjectURL),
          (this.revokeObjectURL = this.URL.revokeObjectURL);
      }
      overrideObjectURL() {
        this.ctx.override(this.URL, "createObjectURL", (t, r, e) => {
          if (!e.length) return t.apply(r, e);
          let [n] = e,
            o = new a({ object: n }, t, r);
          return (
            this.emit("createObjectURL", o),
            o.intercepted ? o.returnValue : o.target.call(o.that, o.data.object)
          );
        }),
          this.ctx.override(this.URL, "revokeObjectURL", (t, r, e) => {
            if (!e.length) return t.apply(r, e);
            let [n] = e,
              o = new a({ url: n }, t, r);
            return (
              this.emit("revokeObjectURL", o),
              o.intercepted ? o.returnValue : o.target.call(o.that, o.data.url)
            );
          });
      }
    },
    Ue = _;
  var Ke = m(f(), 1);
  var We = m(f(), 1);
  var F = class extends We.default {
      constructor(t) {
        super(),
          (this.ctx = t),
          (this.window = t.window),
          (this.localStorage = this.window.localStorage || null),
          (this.sessionStorage = this.window.sessionStorage || null),
          (this.Storage = this.window.Storage || {}),
          (this.storeProto = this.Storage.prototype || {}),
          (this.getItem = this.storeProto.getItem || null),
          (this.setItem = this.storeProto.setItem || null),
          (this.removeItem = this.storeProto.removeItem || null),
          (this.clear = this.storeProto.clear || null),
          (this.key = this.storeProto.key || null),
          (this.methods = ["key", "getItem", "setItem", "removeItem", "clear"]),
          (this.wrappers = new t.nativeMethods.Map());
      }
      overrideMethods() {
        this.ctx.override(this.storeProto, "getItem", (t, r, e) => {
          if (!e.length) return t.apply(this.wrappers.get(r) || r, e);
          let [n] = e,
            o = new a({ name: n }, t, this.wrappers.get(r) || r);
          return (
            this.emit("getItem", o),
            o.intercepted ? o.returnValue : o.target.call(o.that, o.data.name)
          );
        }),
          this.ctx.override(this.storeProto, "setItem", (t, r, e) => {
            if (2 > e.length) return t.apply(this.wrappers.get(r) || r, e);
            let [n, o] = e,
              i = new a({ name: n, value: o }, t, this.wrappers.get(r) || r);
            return (
              this.emit("setItem", i),
              i.intercepted
                ? i.returnValue
                : i.target.call(i.that, i.data.name, i.data.value)
            );
          }),
          this.ctx.override(this.storeProto, "removeItem", (t, r, e) => {
            if (!e.length) return t.apply(this.wrappers.get(r) || r, e);
            let [n] = e,
              o = new a({ name: n }, t, this.wrappers.get(r) || r);
            return (
              this.emit("removeItem", o),
              o.intercepted ? o.returnValue : o.target.call(o.that, o.data.name)
            );
          }),
          this.ctx.override(this.storeProto, "clear", (t, r) => {
            let e = new a(null, t, this.wrappers.get(r) || r);
            return (
              this.emit("clear", e),
              e.intercepted ? e.returnValue : e.target.call(e.that)
            );
          }),
          this.ctx.override(this.storeProto, "key", (t, r, e) => {
            if (!e.length) return t.apply(this.wrappers.get(r) || r, e);
            let [n] = e,
              o = new a({ index: n }, t, this.wrappers.get(r) || r);
            return (
              this.emit("key", o),
              o.intercepted
                ? o.returnValue
                : o.target.call(o.that, o.data.index)
            );
          });
      }
      overrideLength() {
        this.ctx.overrideDescriptor(this.storeProto, "length", {
          get: (t, r) => {
            let e = new a(
              { length: t.call(this.wrappers.get(r) || r) },
              t,
              this.wrappers.get(r) || r
            );
            return (
              this.emit("length", e),
              e.intercepted ? e.returnValue : e.data.length
            );
          },
        });
      }
      emulate(t, r = {}) {
        this.ctx.nativeMethods.setPrototypeOf(r, this.storeProto);
        let e = new this.ctx.window.Proxy(r, {
          get: (n, o) => {
            if (o in this.storeProto || typeof o == "symbol") return t[o];
            let i = new a({ name: o }, null, t);
            return (
              this.emit("get", i),
              i.intercepted ? i.returnValue : t[i.data.name]
            );
          },
          set: (n, o, i) => {
            if (o in this.storeProto || typeof o == "symbol") return (t[o] = i);
            let c = new a({ name: o, value: i }, null, t);
            return (
              this.emit("set", c),
              c.intercepted ? c.returnValue : (t[c.data.name] = c.data.value)
            );
          },
          deleteProperty: (n, o) => {
            if (typeof o == "symbol") return delete t[o];
            let i = new a({ name: o }, null, t);
            return (
              this.emit("delete", i),
              i.intercepted ? i.returnValue : delete t[i.data.name]
            );
          },
        });
        return (
          this.wrappers.set(e, t),
          this.ctx.nativeMethods.setPrototypeOf(e, this.storeProto),
          e
        );
      }
    },
    je = F;
  var qe = m(f(), 1);
  var B = class extends qe.default {
      constructor(t) {
        super(),
          (this.ctx = t),
          (this.window = t.window),
          (this.CSSStyleDeclaration = this.window.CSSStyleDeclaration || {}),
          (this.cssStyleProto = this.CSSStyleDeclaration.prototype || {}),
          (this.getPropertyValue = this.cssStyleProto.getPropertyValue || null),
          (this.setProperty = this.cssStyleProto.setProperty || null),
          this.cssText -
            t.nativeMethods.getOwnPropertyDescriptors(
              this.cssStyleProto,
              "cssText"
            ),
          (this.urlProps = [
            "background",
            "backgroundImage",
            "borderImage",
            "borderImageSource",
            "listStyle",
            "listStyleImage",
            "cursor",
          ]),
          (this.dashedUrlProps = [
            "background",
            "background-image",
            "border-image",
            "border-image-source",
            "list-style",
            "list-style-image",
            "cursor",
          ]),
          (this.propToDashed = {
            background: "background",
            backgroundImage: "background-image",
            borderImage: "border-image",
            borderImageSource: "border-image-source",
            listStyle: "list-style",
            listStyleImage: "list-style-image",
            cursor: "cursor",
          });
      }
      overrideSetGetProperty() {
        this.ctx.override(this.cssStyleProto, "getPropertyValue", (t, r, e) => {
          if (!e.length) return t.apply(r, e);
          let [n] = e,
            o = new a({ property: n }, t, r);
          return (
            this.emit("getPropertyValue", o),
            o.intercepted
              ? o.returnValue
              : o.target.call(o.that, o.data.property)
          );
        }),
          this.ctx.override(this.cssStyleProto, "setProperty", (t, r, e) => {
            if (2 > e.length) return t.apply(r, e);
            let [n, o] = e,
              i = new a({ property: n, value: o }, t, r);
            return (
              this.emit("setProperty", i),
              i.intercepted
                ? i.returnValue
                : i.target.call(i.that, i.data.property, i.data.value)
            );
          });
      }
      overrideCssText() {
        this.ctx.overrideDescriptor(this.cssStyleProto, "cssText", {
          get: (t, r) => {
            let e = new a({ value: t.call(r) }, t, r);
            return (
              this.emit("getCssText", e),
              e.intercepted ? e.returnValue : e.data.value
            );
          },
          set: (t, r, [e]) => {
            let n = new a({ value: e }, t, r);
            return (
              this.emit("setCssText", n),
              n.intercepted
                ? n.returnValue
                : n.target.call(n.that, n.data.value)
            );
          },
        });
      }
    },
    _e = B;
  var Fe = m(f(), 1);
  var G = class extends Fe.default {
      constructor(t) {
        super(),
          (this.ctx = t),
          (this.window = this.ctx.window),
          (this.IDBDatabase = this.window.IDBDatabase || {}),
          (this.idbDatabaseProto = this.IDBDatabase.prototype || {}),
          (this.IDBFactory = this.window.IDBFactory || {}),
          (this.idbFactoryProto = this.IDBFactory.prototype || {}),
          (this.open = this.idbFactoryProto.open);
      }
      overrideOpen() {
        this.ctx.override(this.IDBFactory.prototype, "open", (t, r, e) => {
          if (!e.length || !e.length) return t.apply(r, e);
          let [n, o] = e,
            i = new a({ name: n, version: o }, t, r);
          return (
            this.emit("idbFactoryOpen", i),
            i.intercepted
              ? i.returnValue
              : i.target.call(i.that, i.data.name, i.data.version)
          );
        });
      }
      overrideName() {
        this.ctx.overrideDescriptor(this.idbDatabaseProto, "name", {
          get: (t, r) => {
            let e = new a({ value: t.call(r) }, t, r);
            return (
              this.emit("idbFactoryName", e),
              e.intercepted ? e.returnValue : e.data.value
            );
          },
        });
      }
    },
    Be = G;
  var Ge = m(f(), 1);
  var $ = class extends Ge.default {
      constructor(t) {
        super(),
          (this.ctx = t),
          (this.window = t.window),
          (this.WebSocket = this.window.WebSocket || {}),
          (this.wsProto = this.WebSocket.prototype),
          (this.CONNECTING = WebSocket.CONNECTING),
          (this.OPEN = WebSocket.OPEN),
          (this.CLOSING = WebSocket.CLOSING),
          (this.CLOSED = WebSocket.CLOSED),
          (this.socketmap = new WeakMap());
      }
      overrideWebSocket(t) {
        this.ctx.override(
          this.window,
          "WebSocket",
          (r, e, n) => {
            let o = new EventTarget();
            Object.setPrototypeOf(o, this.WebSocket.prototype),
              (o.constructor = this.WebSocket);
            let i = (h) =>
                new Proxy(h, {
                  get(w, p) {
                    return p === "isTrusted" ? !0 : Reflect.get(w, p);
                  },
                }),
              c = t.createWebSocket(n[0], n[1], null, {
                "User-Agent": navigator.userAgent,
                Origin: __uv.meta.url.origin,
              }),
              l = {
                extensions: "",
                protocol: "",
                url: n[0],
                binaryType: "blob",
                barews: c,
              };
            function u(h) {
              l["on" + h.type]?.(i(h)), o.dispatchEvent(h);
            }
            return (
              c.addEventListener("open", () => {
                u(new Event("open"));
              }),
              c.addEventListener("close", (h) => {
                u(new CloseEvent("close", h));
              }),
              c.addEventListener("message", async (h) => {
                let w = h.data;
                typeof w == "string" ||
                  ("byteLength" in w
                    ? l.binaryType === "blob"
                      ? (w = new Blob([w]))
                      : Object.setPrototypeOf(w, ArrayBuffer.prototype)
                    : "arrayBuffer" in w &&
                      l.binaryType === "arraybuffer" &&
                      ((w = await w.arrayBuffer()),
                      Object.setPrototypeOf(w, ArrayBuffer.prototype)));
                let p = new MessageEvent("message", {
                  data: w,
                  origin: h.origin,
                  lastEventId: h.lastEventId,
                  source: h.source,
                  ports: h.ports,
                });
                u(p);
              }),
              c.addEventListener("error", () => {
                u(new Event("error"));
              }),
              this.socketmap.set(o, l),
              o
            );
          },
          !0
        ),
          this.ctx.overrideDescriptor(this.wsProto, "binaryType", {
            get: (r, e) => this.socketmap.get(e).binaryType,
            set: (r, e, n) => {
              let o = this.socketmap.get(e);
              (n[0] === "blob" || n[0] === "arraybuffer") &&
                (o.binaryType = n[0]);
            },
          }),
          this.ctx.overrideDescriptor(this.wsProto, "bufferedAmount", {
            get: (r, e) => 0,
          }),
          this.ctx.overrideDescriptor(this.wsProto, "extensions", {
            get: (r, e) => this.socketmap.get(e).extensions,
          }),
          this.ctx.overrideDescriptor(this.wsProto, "onclose", {
            get: (r, e) => this.socketmap.get(e).onclose,
            set: (r, e, n) => {
              let o = this.socketmap.get(e);
              o.onclose = n[0];
            },
          }),
          this.ctx.overrideDescriptor(this.wsProto, "onerror", {
            get: (r, e) => this.socketmap.get(e).onerror,
            set: (r, e, n) => {
              let o = this.socketmap.get(e);
              o.onerror = n[0];
            },
          }),
          this.ctx.overrideDescriptor(this.wsProto, "onmessage", {
            get: (r, e) => this.socketmap.get(e).onmessage,
            set: (r, e, n) => {
              let o = this.socketmap.get(e);
              o.onmessage = n[0];
            },
          }),
          this.ctx.overrideDescriptor(this.wsProto, "onopen", {
            get: (r, e) => this.socketmap.get(e).onopen,
            set: (r, e, n) => {
              let o = this.socketmap.get(e);
              o.onopen = n[0];
            },
          }),
          this.ctx.overrideDescriptor(this.wsProto, "url", {
            get: (r, e) => this.socketmap.get(e).url,
          }),
          this.ctx.overrideDescriptor(this.wsProto, "protocol", {
            get: (r, e) => this.socketmap.get(e).protocol,
          }),
          this.ctx.overrideDescriptor(this.wsProto, "readyState", {
            get: (r, e) => this.socketmap.get(e).barews.readyState,
          }),
          this.ctx.override(
            this.wsProto,
            "send",
            (r, e, n) => this.socketmap.get(e).barews.send(n[0]),
            !1
          ),
          this.ctx.override(
            this.wsProto,
            "close",
            (r, e, n) => {
              let o = this.socketmap.get(e);
              return (
                n[0] === void 0 && (n[0] = 1e3),
                n[1] === void 0 && (n[1] = ""),
                o.barews.close(n[0], n[1])
              );
            },
            !1
          );
      }
    },
    $e = $;
  var x = class extends Ke.default {
      constructor(t = self, r, e = !t.window) {
        super(),
          (this.window = t),
          (this.nativeMethods = {
            fnToString: this.window.Function.prototype.toString,
            defineProperty: this.window.Object.defineProperty,
            getOwnPropertyDescriptor:
              this.window.Object.getOwnPropertyDescriptor,
            getOwnPropertyDescriptors:
              this.window.Object.getOwnPropertyDescriptors,
            getOwnPropertyNames: this.window.Object.getOwnPropertyNames,
            keys: this.window.Object.keys,
            getOwnPropertySymbols: this.window.Object.getOwnPropertySymbols,
            isArray: this.window.Array.isArray,
            setPrototypeOf: this.window.Object.setPrototypeOf,
            isExtensible: this.window.Object.isExtensible,
            Map: this.window.Map,
            Proxy: this.window.Proxy,
          }),
          (this.worker = e),
          (this.bareClient = r),
          (this.fetch = new ve(this)),
          (this.xhr = new ge(this)),
          (this.idb = new Be(this)),
          (this.history = new ke(this)),
          (this.element = new ae(this)),
          (this.node = new le(this)),
          (this.document = new ie(this)),
          (this.function = new pe(this)),
          (this.object = new me(this)),
          (this.websocket = new $e(this)),
          (this.message = new Me(this)),
          (this.navigator = new De(this)),
          (this.eventSource = new be(this)),
          (this.attribute = new ue(this)),
          (this.url = new Ue(this)),
          (this.workers = new He(this)),
          (this.location = new Ee(this)),
          (this.storage = new je(this)),
          (this.style = new _e(this));
      }
      override(t, r, e, n) {
        let o = this.wrap(t, r, e, n);
        return (t[r] = o), o;
      }
      overrideDescriptor(t, r, e = {}) {
        let n = this.wrapDescriptor(t, r, e);
        return n ? (this.nativeMethods.defineProperty(t, r, n), n) : {};
      }
      wrap(t, r, e, n = !1) {
        let o = t[r];
        if (!o) return o;
        let i =
          "prototype" in o
            ? function () {
                return e(o, this, [...arguments]);
              }
            : {
                attach() {
                  return e(o, this, [...arguments]);
                },
              }.attach;
        return (
          n && ((i.prototype = o.prototype), (i.prototype.constructor = i)),
          this.emit("wrap", o, i, n),
          i
        );
      }
      wrapDescriptor(t, r, e = {}) {
        let n = this.nativeMethods.getOwnPropertyDescriptor(t, r);
        if (!n) return !1;
        for (let o in e)
          o in n &&
            (o === "get" || o === "set"
              ? (n[o] = this.wrap(n, o, e[o]))
              : (n[o] = typeof e[o] == "function" ? e[o](n[o]) : e[o]));
        return n;
      }
    },
    Pr = x;
  typeof self == "object" && (self.UVClient = x);
})();
//# sourceMappingURL=galaxyclient.js.map
