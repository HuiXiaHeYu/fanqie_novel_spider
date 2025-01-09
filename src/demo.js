global.localStorage = {
    storage: {},
    getItem(key) {
        return this.storage[key] || null;
    },
    setItem(key, value) {
        this.storage[key] = value.toString();
    },
    removeItem(key) {
        delete this.storage[key];
    },
    clear() {
        this.storage = {};
    }
};

global.window = {}; // 全局的 window 对象
global.location = { href: "http://example.com" }; // 模拟浏览器地址
global.document = {}; // 如果需要操作 DOM，可以进一步扩展

/*!
* @byted/secsdk-strategy v1.0.1
* (c) 2024
*/
!function(t) {
    "function" == typeof define && define.amd ? define(t) : t()
}((function() {
    "use strict";
    var t, e, n;
    !function(t) {
        t.API_LOCALSTORAGE_SET = "API_LOCALSTORAGE_SET",
        t.API_LOCALSTORAGE_GET = "API_LOCALSTORAGE_GET",
        t.API_SESSIONSTORAGE_SET = "API_SESSIONSTORAGE_SET",
        t.API_SESSIONSTORAGE_GET = "API_SESSIONSTORAGE_GET",
        t.GEOLOCATION_CURRENT_POSITION = "GEOLOCATION_CURRENT_POSITION",
        t.GEOLOCATION_WATCH_POSITION = "GEOLOCATION_WATCH_POSITION",
        t.CLIPBOARD_WRITE_TEXT = "CLIPBOARD_WRITE_TEXT",
        t.MEDIADEVICES_GETUSERMEDIA = "MEDIADEVICES_GETUSERMEDIA",
        t.INDEXDB_ADD = "INDEXDB_ADD",
        t.INDEXDB_PUT = "INDEXDB_PUT",
        t.INDEXDB_UPDATE = "INDEXDB_UPDATE",
        t.COOKIE_GET = "COOKIE_GET",
        t.COOKIE_SET = "COOKIE_SET",
        t.CLICK = "CLICK",
        t.COPY = "COPY",
        t.IMG_SRC_SET = "IMG_SRC_SET",
        t.IMG_SRC_GET = "IMG_SRC_GET",
        t.NAVIGATOR_SEND_BEACON = "NAVIGATOR_SEND_BEACON",
        t.REQUEST_FILE_STSTEM = "REQUEST_FILE_STSTEM",
        t.CLIPBOARD_READ_TEXT = "CLIPBOARD_READ_TEXT",
        t.EXCU_COMMAND = "EXCUTE_COMMAND",
        t.XHR_REQUEST_OPEN = "XHR_REQUEST_OPEN",
        t.XHR_REQUEST_SEND = "XHR_REQUEST_SEND",
        t.XHR_REQUEST_SETQEQUESTHEADER = "XHR_REQUEST_SETQEQUESTHEADER",
        t.XHR_RESPONSE_LOADEND = "XHR_RESPONSE_LOADEND",
        t.XHR_RESPONSE_READYSTATECHANGE = "XHR_RESPONSE_READYSTATECHANGE",
        t.FETCH_REQUEST = "FETCH_REQUEST",
        t.FETCH_RESPONSE = "FETCH_RESPONSE",
        t.FETCH_ADDHEADER = "FETCH_ADDHEADER",
        t.DOM_CONTENT_LOADED = "DOM_CONTENT_LOADED",
        t.MUTATION_OBSERVER = "MUTATION_OBSERVER",
        t.PERFORMANCE_OBSERVER = "PERFORMANCE_OBSERVER",
        t.SDK_REPORT_INIT = "SDK_REPORT_INIT",
        t.SDK_INIT = "SDK_INIT"
    }(t || (t = {})),
    function(t) {
        t.LOCALSTORAGE_SET = "localstorage.setItem",
        t.REPORT_CONFIG_SET = "report_config.set"
    }(e || (e = {})),
    function(t) {
        t.PASS = "PASS",
        t.REPORT_ONLY = "REPORT_ONLY",
        t.REWRITE = "REWRITE",
        t.BLOCK = "BLOCK",
        t.ERROR = "ERROR"
    }(n || (n = {}));
    var o = function() {
        function t() {
            this.secEventMap = {},
            this.secEventMap = {}
        }
        return t.prototype.addToEventMap = function(t, e, n) {
            void 0 === n && (n = !1);
            var o = this.secEventMap[t] || [];
            o.push({
                fn: e,
                once: n
            }),
            this.secEventMap[t] = o
        }
        ,
        t.prototype.on = function(t, e, n) {
            var o = this;
            return void 0 === n && (n = !1),
            this.addToEventMap(t, e, n),
            function() {
                o.secEventMap[t] = o.secEventMap[t].filter((function(t) {
                    return e !== t.fn
                }
                ))
            }
        }
        ,
        t.prototype.emit = function(t, e) {
            var n = t.name
              , o = this.secEventMap[n] || [];
            if (o.length) {
                var r = this
                  , i = [];
                o.forEach((function(n) {
                    !n.once && i.push(n),
                    n.fn.call(r, {
                        event: t,
                        action: e
                    })
                }
                )),
                this.secEventMap[n] = i
            }
        }
        ,
        t.prototype.off = function(t, e) {
            if (e) {
                var n = this.secEventMap[t] || [];
                this.secEventMap[t] = n.filter((function(t) {
                    return t.fn !== e
                }
                ))
            } else
                this.secEventMap[t] = []
        }
        ,
        t.prototype.once = function(t, e) {
            this.addToEventMap(t, e, !0)
        }
        ,
        t
    }()
      , r = new o
      , i = ["module", "global", "require"]
      , a = Object.keys(window).filter((function(t) {
        return !i.includes(t)
    }
    ))
      , c = {
        module: {},
        global: {
            ActionType: n,
            EventEmitter: r
        },
        require: function(t) {
            return c.module[t] || c.global[t]
        }
    };
    a.forEach((function(t) {
        Object.defineProperty(c, t, {
            get: function() {
                console.warn("禁止直接访问宿主环境")
            }
        })
    }
    )),
    window.SDKRuntime = c;
    var s = function(t, e) {
        c.global[t] = e
    };
    window.registToGlobal = s;
    window.registToModule = function(t, e) {
        if (c.module[t] = e,
        "strategy" === t) {
            var n = c.require("coreLoader");
            if (!n)
                return;
            n.initReportStrategy()
        }
    }
    ;
    var u = function(t) {
        return c.require(t)
    };
    window.use = u,
    window.useWebSecsdkApi = u;
    var p = function(t) {
        try {
            return new Function("".concat(t, ";"))()
        } catch (t) {}
    }
      , E = function(t, e, n) {
        var o;
        window.SDKNativeWebApi ? window.SDKNativeWebApi[t] = {
            context: e,
            fn: n
        } : window.SDKNativeWebApi = ((o = {})[t] = {
            context: e,
            fn: n
        },
        o)
    }
      , l = function(t) {
        var e;
        if (t)
            return null === (e = window.SDKNativeWebApi) || void 0 === e ? void 0 : e[t]
    }
      , d = function(e) {
        var n = localStorage.getItem.bind(localStorage)
          , o = l(t.API_LOCALSTORAGE_GET);
        return o && (n = o.fn.bind(localStorage)),
        n(e)
    }
      , f = function(e, n) {
        var o = localStorage.setItem.bind(localStorage)
          , r = l(t.API_LOCALSTORAGE_SET);
        r && (o = r.fn.bind(localStorage)),
        o(e, n)
    }
      , S = "web_secsdk_runtime_cache";
    function _() {
        var t = function() {
            for (var t = new Array(16), e = 0, n = 0; n < 16; n++)
                3 & n || (e = 4294967296 * Math.random()),
                t[n] = e >>> ((3 & n) << 3) & 255;
            return t
        }();
        return t[6] = 15 & t[6] | 64,
        t[8] = 63 & t[8] | 128,
        function(t) {
            for (var e = [], n = 0; n < 256; ++n)
                e[n] = (n + 256).toString(16).substr(1);
            var o = 0
              , r = e;
            return [r[t[o++]], r[t[o++]], r[t[o++]], r[t[o++]], "-", r[t[o++]], r[t[o++]], "-", r[t[o++]], r[t[o++]], "-", r[t[o++]], r[t[o++]], "-", r[t[o++]], r[t[o++]], r[t[o++]], r[t[o++]], r[t[o++]], r[t[o++]]].join("")
        }(t)
    }
    var h = localStorage.getItem.bind(localStorage)
      , y = "web_runtime_security_uid"
      , R = l(t.API_LOCALSTORAGE_GET);
    R && (h = R.fn.bind(localStorage));
    var O = h(y);
    if (!O || "undefined" === O) {
        O = _(),
        document.cookie.includes("x-web-secsdk-uid") || (document.cookie = "x-web-secsdk-uid=".concat(O, "; path=/;"));
        var v = localStorage.setItem.bind(localStorage)
          , T = l(t.API_LOCALSTORAGE_SET);
        T && (v = T.fn.bind(localStorage)),
        v(y, O)
    }
    var g, m, A = new (function() {
        function t() {}
        return t.prototype.loadUid = function() {
            this.uid = O
        }
        ,
        t.prototype.setUid = function(t) {
            localStorage.removeItem(y),
            this.uid = t
        }
        ,
        t.prototype.getUid = function() {
            return this.uid
        }
        ,
        t
    }());
    ({})[t.API_LOCALSTORAGE_SET] = ["text"];
    var I = ((g = {})[t.API_LOCALSTORAGE_SET] = "localStorage.setItem",
    g[t.API_LOCALSTORAGE_GET] = "localStorage.getItem",
    g[t.API_SESSIONSTORAGE_SET] = "sessionStorage.setItem",
    g[t.API_SESSIONSTORAGE_GET] = "sessionStorage.getItem",
    g[t.GEOLOCATION_CURRENT_POSITION] = "Geolocation.prototype.getCurrentPosition",
    g[t.GEOLOCATION_WATCH_POSITION] = "Geolocation.prototype.watchPosition",
    g[t.CLIPBOARD_WRITE_TEXT] = "Clipboard.prototype.writeText",
    g[t.MEDIADEVICES_GETUSERMEDIA] = "MediaDevices.prototype.getUserMedia",
    g[t.INDEXDB_ADD] = "IDBObjectStore.prototype.add",
    g[t.INDEXDB_PUT] = "IDBObjectStore.prototype.put",
    g[t.INDEXDB_UPDATE] = "IDBCursor.prototype.update",
    g[t.NAVIGATOR_SEND_BEACON] = "Navigator.prototype.sendBeacon",
    g[t.REQUEST_FILE_STSTEM] = "requestFileSystem",
    g[t.CLIPBOARD_READ_TEXT] = "navigator.clipboard.readText",
    g[t.XHR_REQUEST_OPEN] = "XMLHttpRequest.prototype.open",
    g[t.XHR_REQUEST_SEND] = "XMLHttpRequest.prototype.send",
    g[t.XHR_RESPONSE_LOADEND] = "xhr.onloadend",
    g[t.XHR_RESPONSE_READYSTATECHANGE] = "xhr.onreadystatechange",
    g[t.FETCH_REQUEST] = "window.Request",
    g[t.FETCH_RESPONSE] = "window.Response",
    g[t.COOKIE_GET] = "document.cookie",
    g[t.COOKIE_SET] = "document.cookie",
    g[t.CLICK] = "click event",
    g[t.COPY] = "copy event",
    g[t.IMG_SRC_SET] = "HTMLImageElement.prototype.src",
    g[t.IMG_SRC_GET] = "HTMLImageElement.prototype.src",
    g[t.EXCU_COMMAND] = "document.execCommand",
    g[t.DOM_CONTENT_LOADED] = "DOMContentLoaded",
    g[t.MUTATION_OBSERVER] = "MutationObserver",
    g[t.PERFORMANCE_OBSERVER] = "PerformanceObserver",
    g[t.XHR_REQUEST_SETQEQUESTHEADER] = "XMLHttpRequest.prototype.setRequestHeader",
    g[t.FETCH_ADDHEADER] = "addHeader",
    g);
    (m = {})[t.API_LOCALSTORAGE_SET] = "ApiStorageSet",
    m[t.API_LOCALSTORAGE_GET] = "ApiStorageGet",
    m[t.API_SESSIONSTORAGE_SET] = "ApiStorageSet",
    m[t.API_SESSIONSTORAGE_GET] = "ApiStorageGet",
    m[t.COPY] = "Copy",
    m[t.XHR_REQUEST_OPEN] = "XHRRequestOpen",
    m[t.XHR_REQUEST_SEND] = "XHRRequestSend",
    m[t.FETCH_REQUEST] = "FetchRequest",
    m[t.FETCH_RESPONSE] = "FetchResponse";
    var N = new (function() {
        function t(t, e) {
            this.pid = t,
            this.uid = e,
            this.strategy = {}
        }
        return t.prototype.loadStrategyProps = function(t) {
            var e = window.use("strategy");
            return Object.keys((null == e ? void 0 : e.strategy) || {}).reduce((function(n, o) {
                return n[o] = e.strategy[o][t],
                n
            }
            ), {})
        }
        ,
        t.prototype.loadStrategyExtensionTools = function() {
            return this.loadStrategyProps("extensionTools")
        }
        ,
        t.prototype.loadStrategyConfig = function(t) {
            return this.loadStrategyProps("config")[t]
        }
        ,
        t.prototype.loadStrategyMap = function() {
            return this.loadStrategyProps("body")
        }
        ,
        t.prototype.loadStrategyGroup = function() {
            var t = window.use("strategy");
            return (null == t ? void 0 : t.event) || {}
        }
        ,
        t
    }())("64","1111")
      , b = function() {
        return b = Object.assign || function(t) {
            for (var e, n = 1, o = arguments.length; n < o; n++)
                for (var r in e = arguments[n])
                    Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
            return t
        }
        ,
        b.apply(this, arguments)
    };
    function C(t, e) {
        var n = {};
        for (var o in t)
            Object.prototype.hasOwnProperty.call(t, o) && e.indexOf(o) < 0 && (n[o] = t[o]);
        if (null != t && "function" == typeof Object.getOwnPropertySymbols) {
            var r = 0;
            for (o = Object.getOwnPropertySymbols(t); r < o.length; r++)
                e.indexOf(o[r]) < 0 && Object.prototype.propertyIsEnumerable.call(t, o[r]) && (n[o[r]] = t[o[r]])
        }
        return n
    }
    function D(t, e, n, o) {
        return new (n || (n = Promise))((function(r, i) {
            function a(t) {
                try {
                    s(o.next(t))
                } catch (t) {
                    i(t)
                }
            }
            function c(t) {
                try {
                    s(o.throw(t))
                } catch (t) {
                    i(t)
                }
            }
            function s(t) {
                var e;
                t.done ? r(t.value) : (e = t.value,
                e instanceof n ? e : new n((function(t) {
                    t(e)
                }
                ))).then(a, c)
            }
            s((o = o.apply(t, e || [])).next())
        }
        ))
    }
    function L(t, e) {
        var n, o, r, i, a = {
            label: 0,
            sent: function() {
                if (1 & r[0])
                    throw r[1];
                return r[1]
            },
            trys: [],
            ops: []
        };
        return i = {
            next: c(0),
            throw: c(1),
            return: c(2)
        },
        "function" == typeof Symbol && (i[Symbol.iterator] = function() {
            return this
        }
        ),
        i;
        function c(c) {
            return function(s) {
                return function(c) {
                    if (n)
                        throw new TypeError("Generator is already executing.");
                    for (; i && (i = 0,
                    c[0] && (a = 0)),
                    a; )
                        try {
                            if (n = 1,
                            o && (r = 2 & c[0] ? o.return : c[0] ? o.throw || ((r = o.return) && r.call(o),
                            0) : o.next) && !(r = r.call(o, c[1])).done)
                                return r;
                            switch (o = 0,
                            r && (c = [2 & c[0], r.value]),
                            c[0]) {
                            case 0:
                            case 1:
                                r = c;
                                break;
                            case 4:
                                return a.label++,
                                {
                                    value: c[1],
                                    done: !1
                                };
                            case 5:
                                a.label++,
                                o = c[1],
                                c = [0];
                                continue;
                            case 7:
                                c = a.ops.pop(),
                                a.trys.pop();
                                continue;
                            default:
                                if (!(r = a.trys,
                                (r = r.length > 0 && r[r.length - 1]) || 6 !== c[0] && 2 !== c[0])) {
                                    a = 0;
                                    continue
                                }
                                if (3 === c[0] && (!r || c[1] > r[0] && c[1] < r[3])) {
                                    a.label = c[1];
                                    break
                                }
                                if (6 === c[0] && a.label < r[1]) {
                                    a.label = r[1],
                                    r = c;
                                    break
                                }
                                if (r && a.label < r[2]) {
                                    a.label = r[2],
                                    a.ops.push(c);
                                    break
                                }
                                r[2] && a.ops.pop(),
                                a.trys.pop();
                                continue
                            }
                            c = e.call(t, a)
                        } catch (t) {
                            c = [6, t],
                            o = 0
                        } finally {
                            n = r = 0
                        }
                    if (5 & c[0])
                        throw c[1];
                    return {
                        value: c[0] ? c[1] : void 0,
                        done: !0
                    }
                }([c, s])
            }
        }
    }
    "function" == typeof SuppressedError && SuppressedError;
    var w = window.fetch
      , P = window.navigator
      , G = P.sendBeacon
      , M = G && "function" == typeof G
      , H = 1e4
      , j = {
        bid: "argus3",
        region: "cn",
        timeInterval: 2,
        maxSize: 100,
        sampleRatio: {
            ratio: 100
        }
    };
    function U(t) {
        return "function" == typeof atob ? atob(t) : function(t) {
            for (var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", n = "", o = 0; o < t.length; ) {
                var r = e.indexOf(t.charAt(o++))
                  , i = e.indexOf(t.charAt(o++))
                  , a = e.indexOf(t.charAt(o++))
                  , c = e.indexOf(t.charAt(o++))
                  , s = r << 2 | i >> 4
                  , u = (15 & i) << 4 | a >> 2
                  , p = (3 & a) << 6 | c;
                n += String.fromCharCode(s),
                64 !== a && (n += String.fromCharCode(u)),
                64 !== c && (n += String.fromCharCode(p))
            }
            return n
        }(t)
    }
    var X = function() {
        function t(t) {
            var e = this;
            this.sampleDataQueue = [],
            this.config = j,
            this.isReporting = !1,
            this.configInited = !1,
            this.getSlardarBid = function() {
                return e.config.bid || "argus3"
            }
            ,
            this.getConfigRegion = function() {
                var t = u("coreLoader");
                return t ? t.host.includes("sg") ? "sg" : "cn" : (e.config.region || "cn").toLowerCase()
            }
            ,
            this.gerReportUrl = function() {
                var t = {
                    cn: U("aHR0cHM6Ly9tb24uemlqaWVhcGkuY29tL21vbml0b3JfYnJvd3Nlci9jb2xsZWN0L2JhdGNoL3NlY3VyaXR5Lz9iaWQ9"),
                    boe: U("aHR0cHM6Ly9tb24uemlqaWVhcGkuY29tL21vbml0b3JfYnJvd3Nlci9jb2xsZWN0L2JhdGNoL3NlY3VyaXR5Lz9iaWQ9"),
                    ttp: U("aHR0cHM6Ly9tb24udXMudGlrdG9rdi5jb20vbW9uaXRvcl9icm93c2VyL2NvbGxlY3QvYmF0Y2gvc2VjdXJpdHkvP2JpZD0="),
                    va: U("aHR0cHM6Ly9tb24tdmEuYnl0ZW92ZXJzZWEuY29tL21vbml0b3JfYnJvd3Nlci9jb2xsZWN0L2JhdGNoL3NlY3VyaXR5Lz9iaWQ9"),
                    maliva: U("aHR0cHM6Ly9tb24tdmEuYnl0ZW92ZXJzZWEuY29tL21vbml0b3JfYnJvd3Nlci9jb2xsZWN0L2JhdGNoL3NlY3VyaXR5Lz9iaWQ9"),
                    sg: U("aHR0cHM6Ly9tb24tdmEuYnl0ZW92ZXJzZWEuY29tL21vbml0b3JfYnJvd3Nlci9jb2xsZWN0L2JhdGNoL3NlY3VyaXR5Lz9iaWQ9"),
                    boei18n: U("aHR0cHM6Ly9tb24tdmEuYnl0ZW92ZXJzZWEuY29tL21vbml0b3JfYnJvd3Nlci9jb2xsZWN0L2JhdGNoL3NlY3VyaXR5Lz9iaWQ9")
                }[e.getConfigRegion()];
                if (t)
                    return t + e.getSlardarBid()
            }
            ,
            this.setConfig(t)
        }
        return t.prototype.report = function(t, e) {
            var n;
            void 0 === e && (e = "runtime_strategy"),
            A.loadUid();
            var o = window.use("reportOptions");
            this.configInited || (this.setConfig(o),
            this.configInited = !0);
            var r = t.event
              , i = t.action
              , a = t.fromStage
              , c = this.shouleAddToSampleQueue(t)
              , s = (null == i ? void 0 : i.key) || r.pageUrl || window.location.href
              , u = s + a;
            if (null == i ? void 0 : i.once) {
                var p = function(t) {
                    var e = d(S) || "{}";
                    try {
                        return JSON.parse(e)[t]
                    } catch (t) {
                        return void console.warn("web_secsdk_runtime_cache set json parse error")
                    }
                }(i.strategyKey) || [];
                if (p.includes(u))
                    return;
                c = !0,
                p.push(u),
                function(t, e) {
                    var n = d(S) || "{}";
                    try {
                        var o = JSON.parse(n);
                        o[t] = e,
                        f(S, JSON.stringify(o))
                    } catch (t) {
                        return void console.warn("web_secsdk_runtime_cache get json parse error")
                    }
                }(i.strategyKey, p)
            }
            var E = C(r, [])
              , l = E.payload;
            l.context,
            l.__secReqHeaders;
            var _ = C(l, ["context", "__secReqHeaders"]);
            E.payload = _,
            i.eventOverwrite;
            var h = C(i, ["eventOverwrite"])
              , y = Object.assign(this.constructNewDataWithPrifix(E, "event"), this.constructNewDataWithPrifix(h, "action"), i.eventOverwrite ? this.constructNewDataWithPrifix({
                payload: null == i ? void 0 : i.eventOverwrite
            }, "event") : {}, {
                fromStage: a,
                documentURL: window.location.href,
                uId: A.getUid(),
                sdkVersion: "1.0.1"
            })
              , R = Object.keys(y).reduce((function(t, e, n) {
                return "string" == typeof y[e] && (t[e] = y[e]),
                t
            }
            ), {})
              , O = Object.keys(y).reduce((function(t, e, n) {
                return "number" == typeof y[e] && (t[e] = y[e]),
                t
            }
            ), {})
              , v = {
                age: Math.floor(Date.now()),
                type: e,
                url: s,
                body: {
                    reportString: R,
                    reportInt: O
                },
                "user-agent": (null === (n = window.navigator) || void 0 === n ? void 0 : n.userAgent) || ""
            };
            c && this.pushDataToQueue(v)
        }
        ,
        t.prototype.constructNewDataWithPrifix = function(t, e) {
            return Object.entries(t).reduce((function(t, n) {
                var o = n[0]
                  , r = n[1]
                  , i = Object.prototype.toString.call(r).slice(8, -1);
                if ("Array" === i || "Object" === i || "Arguments" === i)
                    try {
                        r = JSON.stringify(r)
                    } catch (e) {
                        return t
                    }
                else
                    "Function" !== i && "Symbol" !== i || (r = String(r));
                return t["".concat(e, "_").concat(o)] = r,
                t
            }
            ), {})
        }
        ,
        t.prototype.pushDataToQueue = function(t) {
            this.sampleDataQueue.push(t),
            this.upload()
        }
        ,
        t.prototype.upload = function() {
            return D(this, void 0, void 0, (function() {
                var t, e = this;
                return L(this, (function(n) {
                    return t = this.gerReportUrl(),
                    this.isReporting || !t || 0 === this.sampleDataQueue.length || (this.isReporting = !0,
                    setTimeout((function() {
                        return D(e, void 0, void 0, (function() {
                            var e, n;
                            return L(this, (function(o) {
                                switch (o.label) {
                                case 0:
                                    return e = this.config.maxSize,
                                    n = this.sampleDataQueue.slice(0, e),
                                    this.sampleDataQueue = this.sampleDataQueue.slice(e),
                                    M ? G.call(P, t, JSON.stringify(n)) ? [3, 2] : (console.log("「sendBecon」send send log report error"),
                                    [4, this.logReportByFetch(t, n)]) : [3, 3];
                                case 1:
                                    o.sent(),
                                    o.label = 2;
                                case 2:
                                    return [3, 5];
                                case 3:
                                    return [4, this.logReportByFetch(t, n)];
                                case 4:
                                    o.sent(),
                                    o.label = 5;
                                case 5:
                                    return this.isReporting = !1,
                                    this.upload(),
                                    [2]
                                }
                            }
                            ))
                        }
                        ))
                    }
                    ), 1e3 * this.config.timeInterval)),
                    [2]
                }
                ))
            }
            ))
        }
        ,
        t.prototype.logReportByFetch = function(t, e) {
            return D(this, void 0, void 0, (function() {
                var n;
                return L(this, (function(o) {
                    switch (o.label) {
                    case 0:
                        return o.trys.push([0, 2, , 3]),
                        [4, w(t, {
                            method: "post",
                            body: JSON.stringify(e),
                            headers: {
                                "Content-Type": "application/json"
                            }
                        })];
                    case 1:
                        return o.sent(),
                        [3, 3];
                    case 2:
                        return n = o.sent(),
                        console.log("「fetch」send log report error", n),
                        this.sampleDataQueue = e.concat(this.sampleDataQueue),
                        [3, 3];
                    case 3:
                        return [2]
                    }
                }
                ))
            }
            ))
        }
        ,
        t.prototype.shouleAddToSampleQueue = function(t) {
            var e = t.event
              , n = t.action
              , o = this.getMatchedRatio(e, n);
            return o === H || Math.floor(Math.random() * H) <= o
        }
        ,
        t.prototype.setConfig = function(t) {
            t && ("Array" === Object.prototype.toString.call(t.sampleRatio).slice(8, -1) && (t.sampleRatio = this.sortSampleRatio(t.sampleRatio)),
            this.config = b(b({}, this.config), t))
        }
        ,
        t.prototype.sortSampleRatio = function(t) {
            var e = function(t) {
                var e = 0;
                return t.actionType && t.eventType ? e = 2 : (t.actionType || t.eventType) && (e = 1),
                e
            };
            return t.sort((function(t, n) {
                var o = e(t)
                  , r = e(n);
                return o > r ? -1 : o < r ? 1 : 0
            }
            ))
        }
        ,
        t.prototype.getMatchedRatio = function(t, e) {
            var n = H
              , o = this.config.sampleRatio;
            if (!o)
                return n;
            var r = t.name
              , i = e.type
              , a = Object.prototype.toString.call(o).slice(8, -1);
            if ("Object" === a)
                n = l = this.matchRatioRule(r, i, o).ratio;
            else if ("Array" === a)
                for (var c = o, s = 0, u = c.length; s < u; s++) {
                    var p = this.matchRatioRule(r, i, c[s])
                      , E = p.matched
                      , l = p.ratio;
                    if (E) {
                        n = l;
                        break
                    }
                }
            return n
        }
        ,
        t.prototype.matchRatioRule = function(t, e, n) {
            var o = {
                ratio: H,
                matched: !1
            }
              , r = n.ratio
              , i = n.eventType
              , a = n.actionType;
            return (i && a && t === i && e === a || i && t === i || a && e === a || !i && !a) && (o = {
                ratio: r,
                matched: !0
            }),
            o
        }
        ,
        t
    }()
      , x = new X
      , B = function(t, e) {
        void 0 === e && (e = !0);
        var n = t.action
          , o = t.event;
        x.report(t),
        e && r.emit(o, n)
    }
      , Q = function(t) {
        var e = t.eventName
          , o = t.payload
          , r = t.reason
          , i = t.strategyKey
          , a = t.errorStack
          , c = t.fromStage
          , s = {
            name: e,
            source: I[e],
            timestamp: Date.now(),
            pageUrl: location.href,
            payload: o
        }
          , u = {
            type: n.ERROR,
            strategyKey: i,
            reason: r,
            payload: a
        };
        B({
            event: s,
            action: u,
            fromStage: c
        })
    }
      , W = function() {
        function t(t, e) {
            this.eventName = t,
            this.payload = e
        }
        return t.prototype.registEvent = function() {
            return {
                name: this.eventName,
                source: I[this.eventName],
                timestamp: Date.now(),
                log_id: _(),
                pageUrl: location.href,
                payload: this.payload
            }
        }
        ,
        t.prototype.selection = function() {
            var t = N.loadStrategyMap()
              , e = N.loadStrategyGroup() || {};
            return ((null == e ? void 0 : e[this.eventName]) || []).map((function(e) {
                return null == t ? void 0 : t[e]
            }
            )).filter((function(t) {
                return Boolean(t)
            }
            ))
        }
        ,
        t.prototype.compute = function(t, e) {
            var o = t.key
              , r = t.condition
              , i = t.expression
              , a = t.version;
            if (!r || "function" != typeof r || r(e)) {
                var c = N.loadStrategyConfig(o);
                if (i && "function" == typeof i)
                    try {
                        var s = i(e);
                        return s.strategyKey = o,
                        s.strategyVersion = a,
                        s.type !== n.PASS && B({
                            event: e,
                            action: s,
                            fromStage: "compute"
                        }, !1),
                        s
                    } catch (t) {
                        return console.log(t),
                        Q({
                            eventName: this.eventName,
                            strategyKey: o,
                            reason: "策略计算异常",
                            payload: e.payload,
                            errorStack: {
                                config: c,
                                name: t.name,
                                message: t.message,
                                detail: t.detail
                            },
                            fromStage: "compute"
                        }),
                        {
                            type: n.PASS,
                            reason: "".concat(o, "策略执行异常")
                        }
                    }
            }
        }
        ,
        t.prototype.execute = function(t, e) {
            var o, r = [], i = t.filter((function(t) {
                return t.type === n.BLOCK
            }
            )), a = t.filter((function(t) {
                return t.type === n.REWRITE
            }
            )), c = t.filter((function(t) {
                return t.type === n.REPORT_ONLY
            }
            )), s = t.filter((function(t) {
                return t.type === n.PASS
            }
            ));
            r = (r = i.length > 0 ? [i[0]] : a.length > 0 ? a : c.length > 0 ? [c[0]] : [s[0]]).filter((function(t) {
                return t
            }
            ));
            for (var p = !1, E = 0; E < r.length; E++) {
                var l = u("strategy").execution
                  , d = r[E]
                  , f = N.loadStrategyConfig(d.strategyKey);
                try {
                    o = u(l[this.eventName])(e, d, E === r.length - 1),
                    d.type !== n.PASS && B({
                        event: e,
                        action: d,
                        fromStage: "execute"
                    }, !1)
                } catch (t) {
                    p = E === r.length - 1,
                    Q({
                        eventName: this.eventName,
                        strategyKey: d.strategyKey,
                        reason: "策略执行异常",
                        payload: e.payload,
                        errorStack: {
                            config: f,
                            name: t.name,
                            message: t.message,
                            detail: t.detail
                        },
                        fromStage: "execute"
                    })
                }
            }
            var S = e.payload
              , _ = S.originFn
              , h = S.args
              , y = S.context;
            return (0 === r.length || p) && _ ? _.apply(y, h) : o
        }
        ,
        t.prototype.run = function() {
            for (var t = this.registEvent(), e = [], n = 0, o = this.selection(); n < o.length; n++) {
                var r = o[n]
                  , i = this.compute(r, t);
                i && e.push(i)
            }
            return this.execute(e, t)
        }
        ,
        t
    }()
      , k = function(e, n, o) {
        if (!n || n.fn) {
            if (!n) {
                var r = {
                    handle: function() {}
                };
                n = {
                    object: r,
                    fn: r.handle,
                    fnName: "handle"
                }
            }
            var i = n.object
              , a = n.fn
              , c = n.fnName;
            return E(e, i, a),
            c && (i[c] = s),
            s
        }
        function s() {
            var n = this
              , r = [];
            for (var i in arguments)
                r.push(arguments[i]);
            if ((this === sessionStorage && c && (e = "getItem" === c ? t.API_SESSIONSTORAGE_GET : t.API_SESSIONSTORAGE_SET),
            this === localStorage && c && (e = "getItem" === c ? t.API_LOCALSTORAGE_GET : t.API_LOCALSTORAGE_SET),
            e === t.PERFORMANCE_OBSERVER && r[0]) && !r[0].getEntries().filter((function(t) {
                if (t instanceof PerformanceResourceTiming) {
                    var e = t.name;
                    if (!e)
                        return !0;
                    var n = x.gerReportUrl()
                      , o = new URL(e);
                    return !n.startsWith("".concat(o.protocol, "//").concat(o.host).concat(o.pathname))
                }
                return !0
            }
            )).length)
                return;
            var s = o && o.apply(n, r) || {}
              , u = Object.assign({
                context: n,
                args: r,
                originFn: a
            }, s);
            try {
                return new W(e,u).run()
            } catch (t) {
                return Q({
                    eventName: e,
                    payload: u,
                    reason: "策略引擎执行异常",
                    errorStack: t,
                    fromStage: "select"
                }),
                a.apply(n, r)
            }
        }
    }
      , q = function(t, e, n) {
        for (var o = e.split("."), r = 0, i = [window]; r < i.length; r++) {
            for (var a = i[r], c = o[o.length - 1], s = a, u = 0, p = o; u < p.length; u++) {
                if (s = a,
                !(a = a[p[u]]))
                    return
            }
            k(t, {
                object: s,
                fn: a,
                fnName: c
            }, n)
        }
    };
    q(t.API_LOCALSTORAGE_SET, "Storage.prototype.setItem", (function(t, e) {
        return {
            key: t,
            value: e
        }
    }
    )),
    q(t.API_LOCALSTORAGE_GET, "Storage.prototype.getItem", (function(t) {
        return {
            key: t
        }
    }
    ));
    var F = function(t) {
        var e = t.split(".")
          , n = window;
        return e.every((function(t) {
            return n = n[t],
            Boolean(n)
        }
        ))
    };
    F("Clipboard") && (q(t.CLIPBOARD_WRITE_TEXT, "Clipboard.prototype.write", (function() {
        return {}
    }
    )),
    q(t.CLIPBOARD_READ_TEXT, "Clipboard.prototype.read", (function() {
        return {}
    }
    )),
    q(t.CLIPBOARD_WRITE_TEXT, "Clipboard.prototype.writeText", (function() {
        return {}
    }
    )),
    q(t.CLIPBOARD_READ_TEXT, "Clipboard.prototype.readText", (function() {
        return {}
    }
    ))),
    F("document.execCommand") && q(t.EXCU_COMMAND, "document.execCommand", (function() {
        return {}
    }
    )),
    q(t.REQUEST_FILE_STSTEM, "requestFileSystem", (function() {
        return {}
    }
    )),
    q(t.GEOLOCATION_CURRENT_POSITION, "Geolocation.prototype.getCurrentPosition", (function() {
        return {}
    }
    )),
    q(t.GEOLOCATION_WATCH_POSITION, "Geolocation.prototype.watchPosition", (function() {
        return {}
    }
    )),
    q(t.INDEXDB_ADD, "IDBObjectStore.prototype.add", (function() {
        return {}
    }
    )),
    q(t.INDEXDB_PUT, "IDBObjectStore.prototype.put", (function() {
        return {}
    }
    )),
    q(t.INDEXDB_UPDATE, "IDBCursor.prototype.update", (function() {
        return {}
    }
    )),
    q(t.MEDIADEVICES_GETUSERMEDIA, "MediaDevices.prototype.getUserMedia", (function() {
        return {}
    }
    )),
    q(t.NAVIGATOR_SEND_BEACON, "Navigator.prototype.sendBeacon", (function() {
        return {}
    }
    )),
    E(t.FETCH_REQUEST, window, w);
    var Y = "Request"in window
      , K = "Headers"in window;
    window.fetch = function(e, n) {
        var o = {
            onRequest: function(e, n) {
                return w.apply(window, [e, n]).then((function(e) {
                    return 200 === e.status && k(t.FETCH_RESPONSE, {
                        object: o,
                        fn: o.onResponse,
                        fnName: "onResponse"
                    }, (function(t) {
                        return {
                            _headers: function(t) {
                                for (var e, n = t.headers.entries(), o = {}; (e = n.next()) && (e.value && (o[e.value[0]] = e.value[1]),
                                !e.done); )
                                    ;
                                return o
                            }(t),
                            response: t
                        }
                    }
                    )),
                    o.onResponse.apply(window, [e])
                }
                ))
            },
            onResponse: function(t) {
                return t
            }
        };
        return k(t.FETCH_REQUEST, {
            object: o,
            fn: o.onRequest,
            fnName: "onRequest"
        }, (function(e, n) {
            var o, r = "", i = "", a = n && n.body;
            Y && e instanceof Request ? (r = e.url,
            i = e.method,
            o = e.headers.set.bind(e.headers)) : (r = e,
            i = n && n.method ? n.method : "GET",
            (n = n || {}).headers = n.headers || {},
            o = K && n.headers instanceof Headers ? n.headers.set.bind(n.headers) : Array.isArray(n.headers) ? function(t, e) {
                var o = !1;
                (null == n ? void 0 : n.headers).forEach((function(n) {
                    n[0] === t && (n[1] = e,
                    o = !0)
                }
                )),
                o || (null == n ? void 0 : n.headers).push([t, e])
            }
            : function(t, e) {
                var o = (null == n ? void 0 : n.headers)[t];
                (null == n ? void 0 : n.headers)[t] = o ? "".concat(o, ", ").concat(e) : e
            }
            );
            var c = {
                url: r,
                method: i,
                body: a,
                init: n,
                input: e,
                __secReqHeaders: {},
                addHeader: o
            };
            return c.addHeader = k(t.FETCH_ADDHEADER, {
                object: {},
                fn: o,
                fnName: "addHeader"
            }, (function(t, e) {
                return e && t ? (void 0 === c.__secReqHeaders[t] ? c.__secReqHeaders[t] = e : c.__secReqHeaders[t] = "".concat(c.__secReqHeaders[t], ", ").concat(e),
                {}) : {}
            }
            )),
            c
        }
        )),
        o.onRequest(e, n)
    }
    ,
    q(t.XHR_REQUEST_OPEN, "XMLHttpRequest.prototype.open", (function(t, e, n) {
        var o = this;
        o._xhr_open_args || (o._xhr_open_args = {}),
        Object.assign(o._xhr_open_args, {
            method: t,
            url: e,
            isAsync: n
        })
    }
    )),
    q(t.XHR_REQUEST_SETQEQUESTHEADER, "XMLHttpRequest.prototype.setRequestHeader", (function(t, e) {
        if (!e || !t)
            return {};
        var n = this;
        return n._xhr_headers = n.__secReqHeaders = n.__secReqHeaders || {},
        void 0 === n.__secReqHeaders[t] ? n.__secReqHeaders[t] = e : n.__secReqHeaders[t] = "".concat(n.__secReqHeaders[t], ", ").concat(e),
        {}
    }
    )),
    q(t.XHR_REQUEST_SEND, "XMLHttpRequest.prototype.send", (function() {
        var e = this
          , n = function(n) {
            var o = n.toUpperCase()
              , r = "on".concat(n)
              , i = e[r];
            i && (e[r] = function() {
                if (e.readyState === XMLHttpRequest.DONE && 200 === e.status) {
                    var n = k(t["XHR_RESPONSE_".concat(o)], {
                        object: e,
                        fn: i,
                        fnName: null
                    }, (function() {}
                    ));
                    return null == n ? void 0 : n.apply(e, arguments)
                }
                i && i.apply(e, arguments)
            }
            )
        };
        n("readystatechange"),
        n("loadend")
    }
    ));
    var J = k(t.COPY, null, (function() {
        return {
            text: window.getSelection().toString()
        }
    }
    ));
    window.addEventListener("copy", J);
    var V = k(t.CLICK, null, (function() {}
    ));
    window.addEventListener("click", V);
    var Z = k(t.DOM_CONTENT_LOADED, null, (function() {}
    ));
    if (window.addEventListener("DOMContentLoaded", Z),
    F("Object.getOwnPropertyDescriptor") && F("Object.defineProperty")) {
        var z = Object.getOwnPropertyDescriptor(Document.prototype, "cookie") || Object.getOwnPropertyDescriptor(HTMLDocument.prototype, "cookie");
        if (z && z.configurable) {
            k(t.COOKIE_GET, {
                object: z,
                fnName: "get",
                fn: z.get
            }, (function() {}
            )),
            k(t.COOKIE_SET, {
                object: z,
                fnName: "set",
                fn: z.set
            }, (function() {}
            ));
            try {
                Object.defineProperty(document, "cookie", {
                    get: function() {
                        return z.get.call(document)
                    },
                    set: function(t) {
                        return z.set.call(document, t),
                        !0
                    }
                })
            } catch (t) {}
        }
    }
    if (F("Object.getOwnPropertyDescriptor") && F("Object.defineProperty")) {
        var $ = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, "src");
        k(t.IMG_SRC_SET, {
            object: $,
            fnName: "set",
            fn: $.set
        }, (function() {}
        )),
        k(t.IMG_SRC_GET, {
            object: $,
            fnName: "get",
            fn: $.get
        }, (function() {}
        ));
        try {
            Object.defineProperty(HTMLImageElement.prototype, "src", {
                set: function(t) {
                    var e;
                    return null === (e = null == $ ? void 0 : $.set) || void 0 === e ? void 0 : e.call(this, t)
                },
                get: function() {
                    return $.get.call(this)
                }
            })
        } catch (t) {}
    }
    var tt = {
        attributes: !1,
        childList: !0,
        subtree: !0
    }
      , et = k(t.MUTATION_OBSERVER, null, (function() {
        return {}
    }
    ));
    window.addEventListener("DOMContentLoaded", (function() {
        var t = document.body;
        F("MutationObserver") && new MutationObserver(et).observe(t, tt)
    }
    ));
    var nt = k(t.PERFORMANCE_OBSERVER, null, (function() {
        return {}
    }
    ));
    F("PerformanceObserver") && new PerformanceObserver(nt).observe({
        entryTypes: ["element", "event", "navigation", "resource"]
    });
    var ot = function(e, n) {
        var o = l(t.FETCH_REQUEST)
          , r = window.fetch;
        o && (r = o.fn.bind(o.context));
        var i = d("web_security_runtime_cache_".concat(e))
          , a = "".concat(e);
        i ? p(i) : n ? document.writeln('<script nonce="'.concat(n, '" src="').concat(a, '"><\/script>')) : document.writeln('<script src="'.concat(a, '"><\/script>')),
        r(e).then((function(t) {
            return t.text()
        }
        )).then((function(t) {
            f("web_security_runtime_cache_".concat(a), t);
            try {
                p(t)
            } catch (t) {}
        }
        ))
    }
      , rt = function() {
        function o() {
            var t, e;
            this.version = "1.0.1",
            this.host = "lf-security.bytegoofy.com",
            this.isLocal = !1,
            this.isGray = !1;
            var n = null === (t = document.currentScript) || void 0 === t ? void 0 : t.getAttribute("src");
            if (n) {
                this.emitInitReport();
                var o = document.currentScript.getAttribute("project-id")
                  , r = localStorage.getItem("web_runtime_switcher_isgray");
                this.isGray = "true" === r,
                this.nonce = (null === (e = document.currentScript) || void 0 === e ? void 0 : e.nonce) || this.nonce;
                try {
                    var i = new URL(n).host;
                    this.host = i
                } catch (t) {
                    n.includes("./dist") && (this.isLocal = !0),
                    console.warn(t)
                }
                this.projectId = o,
                s("coreLoader", this),
                this.init()
            }
        }
        return o.prototype.init = function() {
            var t = this.isGray ? "-gray" : "";
            this.loadConfigModule(t),
            this.initOriginModule()
        }
        ,
        o.prototype.emitInitReport = function() {
            x.report({
                event: {
                    name: t.SDK_REPORT_INIT,
                    source: e.REPORT_CONFIG_SET,
                    pageUrl: window.location.href,
                    payload: {},
                    timestamp: Date.now()
                },
                action: {
                    type: n.REPORT_ONLY,
                    payload: {}
                }
            })
        }
        ,
        o.prototype.initReportStrategy = function() {
            var e = u("strategy");
            if (e.strategy.report) {
                var n = e.strategy.report;
                x.setConfig(n.config),
                this.emitInitReport();
                try {
                    return new W(t.SDK_INIT,{}).run()
                } catch (e) {
                    Q({
                        eventName: t.SDK_INIT,
                        payload: {},
                        reason: "策略引擎执行异常",
                        errorStack: e,
                        fromStage: "select"
                    })
                }
            }
        }
        ,
        o.prototype.initOriginModule = function() {
            var t, e = u("globalConfig");
            if (!e && !this.isGray)
                return this.loadCommonModule(""),
                void this.loadStrategyModule("");
            var o = !1;
            if (null === (t = null == e ? void 0 : e.strategy) || void 0 === t ? void 0 : t.hitGray) {
                var r = e.strategy.hitGray;
                o = ("string" == typeof r.body.expression ? p(r.body.expression) : r.body.expression()).type === n.REWRITE
            }
            var i = this.isGray || o ? "-gray" : "";
            this.loadCommonModule(i),
            this.loadStrategyModule(i)
        }
        ,
        o.prototype.loadConfigModule = function(t) {
            this.isLocal ? ot("./dist/config_".concat(this.projectId, ".umd.js"), this.nonce) : ot("https://".concat(this.host, "/obj/security-secsdk").concat(t, "/config_").concat(this.projectId, ".js"), this.nonce)
        }
        ,
        o.prototype.loadCommonModule = function(t) {
            this.isLocal ? ot("./dist/project_".concat(this.projectId, ".umd.js"), this.nonce) : ot("https://".concat(this.host, "/obj/security-secsdk").concat(t, "/project_").concat(this.projectId, ".js"), this.nonce)
        }
        ,
        o.prototype.loadStrategyModule = function(t) {
            this.isLocal ? ot("./dist/strategy_".concat(this.projectId, ".umd.js"), this.nonce) : ot("https://".concat(this.host, "/obj/security-secsdk").concat(t, "/strategy_").concat(this.projectId, ".js?v=1"), this.nonce)
        }
        ,
        o
    }();
    new rt
}
));


// // 定义一个事件并运行 W
// const eventName = "testEvent";
// const payload = { originFn: null, args: [], context: null }; // 示例 payload

// const eventProcessor = new (W())(eventName, payload);

// try {
//     const result = eventProcessor.run();
//     console.log("运行结果：", result);
// } catch (error) {
//     console.error("运行错误：", error);
// }
