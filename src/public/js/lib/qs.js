!(function (t) {
    'object' == typeof exports && 'undefined' != typeof module ? (module.exports = t()) : 'function' == typeof define && define.amd ? define([], t) : (('undefined' != typeof window ? window : 'undefined' != typeof global ? global : 'undefined' != typeof self ? self : this).Qs = t())
})(function () {
    return (function o(n, i, a) {
        function p(e, t) {
            if (!i[e]) {
                if (!n[e]) {
                    var r = 'function' == typeof require && require
                    if (!t && r) return r(e, !0)
                    if (c) return c(e, !0)
                    throw (((r = new Error("Cannot find module '" + e + "'")).code = 'MODULE_NOT_FOUND'), r)
                }
                ;(r = i[e] = { exports: {} }),
                    n[e][0].call(
                        r.exports,
                        function (t) {
                            return p(n[e][1][t] || t)
                        },
                        r,
                        r.exports,
                        o,
                        n,
                        i,
                        a
                    )
            }
            return i[e].exports
        }
        for (var c = 'function' == typeof require && require, t = 0; t < a.length; t++) p(a[t])
        return p
    })(
        {
            1: [
                function (t, e, r) {
                    'use strict'
                    var o = String.prototype.replace,
                        n = /%20/g,
                        i = 'RFC1738',
                        a = 'RFC3986'
                    e.exports = {
                        default: a,
                        formatters: {
                            RFC1738: function (t) {
                                return o.call(t, n, '+')
                            },
                            RFC3986: function (t) {
                                return String(t)
                            },
                        },
                        RFC1738: i,
                        RFC3986: a,
                    }
                },
                {},
            ],
            2: [
                function (t, e, r) {
                    'use strict'
                    var o = t('./stringify'),
                        n = t('./parse'),
                        t = t('./formats')
                    e.exports = { formats: t, parse: n, stringify: o }
                },
                { './formats': 1, './parse': 3, './stringify': 4 },
            ],
            3: [
                function (t, e, r) {
                    'use strict'
                    function c(t, e) {
                        var r,
                            o,
                            n,
                            i,
                            a = {},
                            p = e.ignoreQueryPrefix ? t.replace(/^\?/, '') : t,
                            t = e.parameterLimit === 1 / 0 ? void 0 : e.parameterLimit,
                            c = p.split(e.delimiter, t),
                            l = -1,
                            f = e.charset
                        if (e.charsetSentinel) for (r = 0; r < c.length; ++r) 0 === c[r].indexOf('utf8=') && ('utf8=%E2%9C%93' === c[r] ? (f = 'utf-8') : 'utf8=%26%2310003%3B' === c[r] && (f = 'iso-8859-1'), (l = r), (r = c.length))
                        for (r = 0; r < c.length; ++r)
                            r !== l &&
                                ((i =
                                    -1 === (i = -1 === (i = (o = c[r]).indexOf(']=')) ? o.indexOf('=') : i + 1)
                                        ? ((n = e.decoder(o, d.decoder, f, 'key')), e.strictNullHandling ? null : '')
                                        : ((n = e.decoder(o.slice(0, i), d.decoder, f, 'key')),
                                          u.maybeMap(b(o.slice(i + 1), e), function (t) {
                                              return e.decoder(t, d.decoder, f, 'value')
                                          }))) &&
                                    e.interpretNumericEntities &&
                                    'iso-8859-1' === f &&
                                    (i = i.replace(/&#(\d+);/g, function (t, e) {
                                        return String.fromCharCode(parseInt(e, 10))
                                    })),
                                -1 < o.indexOf('[]=') && (i = s(i) ? [i] : i),
                                y.call(a, n) ? (a[n] = u.combine(a[n], i)) : (a[n] = i))
                        return a
                    }
                    function l(t, e, r, o) {
                        if (t) {
                            var n = r.allowDots ? t.replace(/\.([^.[]+)/g, '[$1]') : t,
                                i = /(\[[^[\]]*])/g,
                                a = 0 < r.depth && /(\[[^[\]]*])/.exec(n),
                                t = a ? n.slice(0, a.index) : n,
                                p = []
                            if (t) {
                                if (!r.plainObjects && y.call(Object.prototype, t) && !r.allowPrototypes) return
                                p.push(t)
                            }
                            for (var c = 0; 0 < r.depth && null !== (a = i.exec(n)) && c < r.depth; ) {
                                if (((c += 1), !r.plainObjects && y.call(Object.prototype, a[1].slice(1, -1)) && !r.allowPrototypes)) return
                                p.push(a[1])
                            }
                            return (
                                a && p.push('[' + n.slice(a.index) + ']'),
                                (function (t, e, r, o) {
                                    for (var n = o ? e : b(e, r), i = t.length - 1; 0 <= i; --i) {
                                        var a,
                                            p,
                                            c,
                                            l = t[i]
                                        '[]' === l && r.parseArrays ? (a = [].concat(n)) : ((a = r.plainObjects ? Object.create(null) : {}), (p = '[' === l.charAt(0) && ']' === l.charAt(l.length - 1) ? l.slice(1, -1) : l), (c = parseInt(p, 10)), r.parseArrays || '' !== p ? (!isNaN(c) && l !== p && String(c) === p && 0 <= c && r.parseArrays && c <= r.arrayLimit ? ((a = [])[c] = n) : '__proto__' !== p && (a[p] = n)) : (a = { 0: n })), (n = a)
                                    }
                                    return n
                                })(p, e, r, o)
                            )
                        }
                    }
                    var u = t('./utils'),
                        y = Object.prototype.hasOwnProperty,
                        s = Array.isArray,
                        d = { allowDots: !1, allowPrototypes: !1, allowSparse: !1, arrayLimit: 20, charset: 'utf-8', charsetSentinel: !1, comma: !1, decoder: u.decode, delimiter: '&', depth: 5, ignoreQueryPrefix: !1, interpretNumericEntities: !1, parameterLimit: 1e3, parseArrays: !0, plainObjects: !1, strictNullHandling: !1 },
                        b = function (t, e) {
                            return t && 'string' == typeof t && e.comma && -1 < t.indexOf(',') ? t.split(',') : t
                        }
                    e.exports = function (t, e) {
                        var r = (function (t) {
                            if (!t) return d
                            if (null !== t.decoder && void 0 !== t.decoder && 'function' != typeof t.decoder) throw new TypeError('Decoder has to be a function.')
                            if (void 0 !== t.charset && 'utf-8' !== t.charset && 'iso-8859-1' !== t.charset) throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined')
                            var e = (void 0 === t.charset ? d : t).charset
                            return {
                                allowDots: void 0 === t.allowDots ? d.allowDots : !!t.allowDots,
                                allowPrototypes: ('boolean' == typeof t.allowPrototypes ? t : d).allowPrototypes,
                                allowSparse: ('boolean' == typeof t.allowSparse ? t : d).allowSparse,
                                arrayLimit: ('number' == typeof t.arrayLimit ? t : d).arrayLimit,
                                charset: e,
                                charsetSentinel: ('boolean' == typeof t.charsetSentinel ? t : d).charsetSentinel,
                                comma: ('boolean' == typeof t.comma ? t : d).comma,
                                decoder: ('function' == typeof t.decoder ? t : d).decoder,
                                delimiter: ('string' == typeof t.delimiter || u.isRegExp(t.delimiter) ? t : d).delimiter,
                                depth: 'number' == typeof t.depth || !1 === t.depth ? +t.depth : d.depth,
                                ignoreQueryPrefix: !0 === t.ignoreQueryPrefix,
                                interpretNumericEntities: ('boolean' == typeof t.interpretNumericEntities ? t : d).interpretNumericEntities,
                                parameterLimit: ('number' == typeof t.parameterLimit ? t : d).parameterLimit,
                                parseArrays: !1 !== t.parseArrays,
                                plainObjects: ('boolean' == typeof t.plainObjects ? t : d).plainObjects,
                                strictNullHandling: ('boolean' == typeof t.strictNullHandling ? t : d).strictNullHandling,
                            }
                        })(e)
                        if ('' === t || null == t) return r.plainObjects ? Object.create(null) : {}
                        for (var o = 'string' == typeof t ? c(t, r) : t, n = r.plainObjects ? Object.create(null) : {}, i = Object.keys(o), a = 0; a < i.length; ++a) var p = i[a], p = l(p, o[p], r, 'string' == typeof t), n = u.merge(n, p, r)
                        return !0 === r.allowSparse ? n : u.compact(n)
                    }
                },
                { './utils': 5 },
            ],
            4: [
                function (t, e, r) {
                    'use strict'
                    function R(t, e) {
                        o.apply(t, U(e) ? e : [e])
                    }
                    function N(t, e, r, o, n, i, a, p, c, l, f, u, y, s, d) {
                        for (var b, g = t, m = d, h = 0, S = !1; void 0 !== (m = m.get(B)) && !S; ) {
                            var v = m.get(t)
                            if (((h += 1), void 0 !== v)) {
                                if (v === h) throw new RangeError('Cyclic object value')
                                S = !0
                            }
                            void 0 === m.get(B) && (h = 0)
                        }
                        if (
                            ('function' == typeof a
                                ? (g = a(e, g))
                                : g instanceof Date
                                ? (g = l(g))
                                : 'comma' === r &&
                                  U(g) &&
                                  (g = D.maybeMap(g, function (t) {
                                      return t instanceof Date ? l(t) : t
                                  })),
                            null === g)
                        ) {
                            if (o) return i && !y ? i(e, W.encoder, s, 'key', f) : e
                            g = ''
                        }
                        if ('string' == typeof (b = g) || 'number' == typeof b || 'boolean' == typeof b || 'symbol' == typeof b || 'bigint' == typeof b || D.isBuffer(g)) {
                            if (i) {
                                var j = y ? e : i(e, W.encoder, s, 'key', f)
                                if ('comma' === r && y) {
                                    for (var A = _.call(String(g), ','), O = '', w = 0; w < A.length; ++w) O += (0 === w ? '' : ',') + u(i(A[w], W.encoder, s, 'value', f))
                                    return [u(j) + '=' + O]
                                }
                                return [u(j) + '=' + u(i(g, W.encoder, s, 'value', f))]
                            }
                            return [u(e) + '=' + u(String(g))]
                        }
                        var P,
                            x = []
                        if (void 0 === g) return x
                        P = 'comma' === r && U(g) ? [{ value: 0 < g.length ? g.join(',') || null : void 0 }] : U(a) ? a : ((j = Object.keys(g)), p ? j.sort(p) : j)
                        for (var E = 0; E < P.length; ++E) {
                            var F,
                                k = P[E],
                                I = 'object' == typeof k && void 0 !== k.value ? k.value : g[k]
                            ;(n && null === I) || ((F = U(g) ? ('function' == typeof r ? r(e, k) : e) : e + (c ? '.' + k : '[' + k + ']')), d.set(t, h), (k = M()).set(B, d), R(x, N(I, F, r, o, n, i, a, p, c, l, f, u, y, s, k)))
                        }
                        return x
                    }
                    var M = t('side-channel'),
                        D = t('./utils'),
                        f = t('./formats'),
                        u = Object.prototype.hasOwnProperty,
                        y = {
                            brackets: function (t) {
                                return t + '[]'
                            },
                            comma: 'comma',
                            indices: function (t, e) {
                                return t + '[' + e + ']'
                            },
                            repeat: function (t) {
                                return t
                            },
                        },
                        U = Array.isArray,
                        _ = String.prototype.split,
                        o = Array.prototype.push,
                        n = Date.prototype.toISOString,
                        t = f.default,
                        W = {
                            addQueryPrefix: !1,
                            allowDots: !1,
                            charset: 'utf-8',
                            charsetSentinel: !1,
                            delimiter: '&',
                            encode: !0,
                            encoder: D.encode,
                            encodeValuesOnly: !1,
                            format: t,
                            formatter: f.formatters[t],
                            indices: !1,
                            serializeDate: function (t) {
                                return n.call(t)
                            },
                            skipNulls: !1,
                            strictNullHandling: !1,
                        },
                        B = {}
                    e.exports = function (t, e) {
                        var r = t,
                            o = (function (t) {
                                if (!t) return W
                                if (null !== t.encoder && void 0 !== t.encoder && 'function' != typeof t.encoder) throw new TypeError('Encoder has to be a function.')
                                var e = t.charset || W.charset
                                if (void 0 !== t.charset && 'utf-8' !== t.charset && 'iso-8859-1' !== t.charset) throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined')
                                var r = f.default
                                if (void 0 !== t.format) {
                                    if (!u.call(f.formatters, t.format)) throw new TypeError('Unknown format option provided.')
                                    r = t.format
                                }
                                var o = f.formatters[r],
                                    n = W.filter
                                return ('function' != typeof t.filter && !U(t.filter)) || (n = t.filter), { addQueryPrefix: ('boolean' == typeof t.addQueryPrefix ? t : W).addQueryPrefix, allowDots: void 0 === t.allowDots ? W.allowDots : !!t.allowDots, charset: e, charsetSentinel: ('boolean' == typeof t.charsetSentinel ? t : W).charsetSentinel, delimiter: (void 0 === t.delimiter ? W : t).delimiter, encode: ('boolean' == typeof t.encode ? t : W).encode, encoder: ('function' == typeof t.encoder ? t : W).encoder, encodeValuesOnly: ('boolean' == typeof t.encodeValuesOnly ? t : W).encodeValuesOnly, filter: n, format: r, formatter: o, serializeDate: ('function' == typeof t.serializeDate ? t : W).serializeDate, skipNulls: ('boolean' == typeof t.skipNulls ? t : W).skipNulls, sort: 'function' == typeof t.sort ? t.sort : null, strictNullHandling: ('boolean' == typeof t.strictNullHandling ? t : W).strictNullHandling }
                            })(e)
                        'function' == typeof o.filter ? (r = (0, o.filter)('', r)) : U(o.filter) && (a = o.filter)
                        var n = []
                        if ('object' != typeof r || null === r) return ''
                        var t = e && e.arrayFormat in y ? e.arrayFormat : !(e && 'indices' in e) || e.indices ? 'indices' : 'repeat',
                            i = y[t],
                            a = a || Object.keys(r)
                        o.sort && a.sort(o.sort)
                        for (var p = M(), c = 0; c < a.length; ++c) {
                            var l = a[c]
                            ;(o.skipNulls && null === r[l]) || R(n, N(r[l], l, i, o.strictNullHandling, o.skipNulls, o.encode ? o.encoder : null, o.filter, o.sort, o.allowDots, o.serializeDate, o.format, o.formatter, o.encodeValuesOnly, o.charset, p))
                        }
                        ;(e = n.join(o.delimiter)), (t = !0 === o.addQueryPrefix ? '?' : '')
                        return o.charsetSentinel && ('iso-8859-1' === o.charset ? (t += 'utf8=%26%2310003%3B&') : (t += 'utf8=%E2%9C%93&')), 0 < e.length ? t + e : ''
                    }
                },
                { './formats': 1, './utils': 5, 'side-channel': 16 },
            ],
            5: [
                function (t, e, r) {
                    'use strict'
                    function p(t, e) {
                        for (var r = e && e.plainObjects ? Object.create(null) : {}, o = 0; o < t.length; ++o) void 0 !== t[o] && (r[o] = t[o])
                        return r
                    }
                    var l = t('./formats'),
                        c = Object.prototype.hasOwnProperty,
                        f = Array.isArray,
                        u = (function () {
                            for (var t = [], e = 0; e < 256; ++e) t.push('%' + ((e < 16 ? '0' : '') + e.toString(16)).toUpperCase())
                            return t
                        })(),
                        t = function o(n, i, a) {
                            if (!i) return n
                            if ('object' != typeof i) {
                                if (f(n)) n.push(i)
                                else {
                                    if (!n || 'object' != typeof n) return [n, i]
                                    ;((a && (a.plainObjects || a.allowPrototypes)) || !c.call(Object.prototype, i)) && (n[i] = !0)
                                }
                                return n
                            }
                            if (!n || 'object' != typeof n) return [n].concat(i)
                            var t = n
                            return (
                                f(n) && !f(i) && (t = p(n, a)),
                                f(n) && f(i)
                                    ? (i.forEach(function (t, e) {
                                          var r
                                          c.call(n, e) ? ((r = n[e]) && 'object' == typeof r && t && 'object' == typeof t ? (n[e] = o(r, t, a)) : n.push(t)) : (n[e] = t)
                                      }),
                                      n)
                                    : Object.keys(i).reduce(function (t, e) {
                                          var r = i[e]
                                          return c.call(t, e) ? (t[e] = o(t[e], r, a)) : (t[e] = r), t
                                      }, t)
                            )
                        }
                    e.exports = {
                        arrayToObject: p,
                        assign: function (t, r) {
                            return Object.keys(r).reduce(function (t, e) {
                                return (t[e] = r[e]), t
                            }, t)
                        },
                        combine: function (t, e) {
                            return [].concat(t, e)
                        },
                        compact: function (t) {
                            for (var e = [{ obj: { o: t }, prop: 'o' }], r = [], o = 0; o < e.length; ++o)
                                for (var n = e[o], i = n.obj[n.prop], a = Object.keys(i), p = 0; p < a.length; ++p) {
                                    var c = a[p],
                                        l = i[c]
                                    'object' == typeof l && null !== l && -1 === r.indexOf(l) && (e.push({ obj: i, prop: c }), r.push(l))
                                }
                            return (
                                (function (t) {
                                    for (; 1 < t.length; ) {
                                        var e = t.pop(),
                                            r = e.obj[e.prop]
                                        if (f(r)) {
                                            for (var o = [], n = 0; n < r.length; ++n) void 0 !== r[n] && o.push(r[n])
                                            e.obj[e.prop] = o
                                        }
                                    }
                                })(e),
                                t
                            )
                        },
                        decode: function (e, t, r) {
                            e = e.replace(/\+/g, ' ')
                            if ('iso-8859-1' === r) return e.replace(/%[0-9a-f]{2}/gi, unescape)
                            try {
                                return decodeURIComponent(e)
                            } catch (t) {
                                return e
                            }
                        },
                        encode: function (t, e, r, o, n) {
                            if (0 === t.length) return t
                            var i = t
                            if (('symbol' == typeof t ? (i = Symbol.prototype.toString.call(t)) : 'string' != typeof t && (i = String(t)), 'iso-8859-1' === r))
                                return escape(i).replace(/%u[0-9a-f]{4}/gi, function (t) {
                                    return '%26%23' + parseInt(t.slice(2), 16) + '%3B'
                                })
                            for (var a = '', p = 0; p < i.length; ++p) {
                                var c = i.charCodeAt(p)
                                45 === c || 46 === c || 95 === c || 126 === c || (48 <= c && c <= 57) || (65 <= c && c <= 90) || (97 <= c && c <= 122) || (n === l.RFC1738 && (40 === c || 41 === c)) ? (a += i.charAt(p)) : c < 128 ? (a += u[c]) : c < 2048 ? (a += u[192 | (c >> 6)] + u[128 | (63 & c)]) : c < 55296 || 57344 <= c ? (a += u[224 | (c >> 12)] + u[128 | ((c >> 6) & 63)] + u[128 | (63 & c)]) : ((p += 1), (c = 65536 + (((1023 & c) << 10) | (1023 & i.charCodeAt(p)))), (a += u[240 | (c >> 18)] + u[128 | ((c >> 12) & 63)] + u[128 | ((c >> 6) & 63)] + u[128 | (63 & c)]))
                            }
                            return a
                        },
                        isBuffer: function (t) {
                            return !(!t || 'object' != typeof t) && !!(t.constructor && t.constructor.isBuffer && t.constructor.isBuffer(t))
                        },
                        isRegExp: function (t) {
                            return '[object RegExp]' === Object.prototype.toString.call(t)
                        },
                        maybeMap: function (t, e) {
                            if (f(t)) {
                                for (var r = [], o = 0; o < t.length; o += 1) r.push(e(t[o]))
                                return r
                            }
                            return e(t)
                        },
                        merge: t,
                    }
                },
                { './formats': 1 },
            ],
            6: [function (t, e, r) {}, {}],
            7: [
                function (t, e, r) {
                    'use strict'
                    var o = t('get-intrinsic'),
                        n = t('./'),
                        i = n(o('String.prototype.indexOf'))
                    e.exports = function (t, e) {
                        e = o(t, !!e)
                        return 'function' == typeof e && -1 < i(t, '.prototype.') ? n(e) : e
                    }
                },
                { './': 8, 'get-intrinsic': 11 },
            ],
            8: [
                function (t, e, r) {
                    'use strict'
                    var o = t('function-bind'),
                        t = t('get-intrinsic'),
                        n = t('%Function.prototype.apply%'),
                        i = t('%Function.prototype.call%'),
                        a = t('%Reflect.apply%', !0) || o.call(i, n),
                        p = t('%Object.getOwnPropertyDescriptor%', !0),
                        c = t('%Object.defineProperty%', !0),
                        l = t('%Math.max%')
                    if (c)
                        try {
                            c({}, 'a', { value: 1 })
                        } catch (t) {
                            c = null
                        }
                    e.exports = function (t) {
                        var e = a(o, i, arguments)
                        return p && c && p(e, 'length').configurable && c(e, 'length', { value: 1 + l(0, t.length - (arguments.length - 1)) }), e
                    }
                    t = function () {
                        return a(o, n, arguments)
                    }
                    c ? c(e.exports, 'apply', { value: t }) : (e.exports.apply = t)
                },
                { 'function-bind': 10, 'get-intrinsic': 11 },
            ],
            9: [
                function (t, e, r) {
                    'use strict'
                    var c = Array.prototype.slice,
                        l = Object.prototype.toString
                    e.exports = function (e) {
                        var r = this
                        if ('function' != typeof r || '[object Function]' !== l.call(r)) throw new TypeError('Function.prototype.bind called on incompatible ' + r)
                        for (var o, t, n = c.call(arguments, 1), i = Math.max(0, r.length - n.length), a = [], p = 0; p < i; p++) a.push('$' + p)
                        return (
                            (o = Function(
                                'binder',
                                'return function (' + a.join(',') + '){ return binder.apply(this,arguments); }'
                            )(function () {
                                if (this instanceof o) {
                                    var t = r.apply(this, n.concat(c.call(arguments)))
                                    return Object(t) === t ? t : this
                                }
                                return r.apply(e, n.concat(c.call(arguments)))
                            })),
                            r.prototype && (((t = function () {}).prototype = r.prototype), (o.prototype = new t()), (t.prototype = null)),
                            o
                        )
                    }
                },
                {},
            ],
            10: [
                function (t, e, r) {
                    'use strict'
                    t = t('./implementation')
                    e.exports = Function.prototype.bind || t
                },
                { './implementation': 9 },
            ],
            11: [
                function (t, e, r) {
                    'use strict'
                    var s = SyntaxError,
                        o = Function,
                        d = TypeError,
                        n = function (t) {
                            try {
                                return o('"use strict"; return (' + t + ').constructor;')()
                            } catch (t) {}
                        },
                        b = Object.getOwnPropertyDescriptor
                    if (b)
                        try {
                            b({}, '')
                        } catch (t) {
                            b = null
                        }
                    function i() {
                        throw new d()
                    }
                    function g(t) {
                        var e, r
                        return '%AsyncFunction%' === t ? (e = n('async function () {}')) : '%GeneratorFunction%' === t ? (e = n('function* () {}')) : '%AsyncGeneratorFunction%' === t ? (e = n('async function* () {}')) : '%AsyncGenerator%' === t ? (r = g('%AsyncGeneratorFunction%')) && (e = r.prototype) : '%AsyncIteratorPrototype%' !== t || ((r = g('%AsyncGenerator%')) && (e = c(r.prototype))), (h[t] = e)
                    }
                    var a = b
                            ? (function () {
                                  try {
                                      return i
                                  } catch (t) {
                                      try {
                                          return b(arguments, 'callee').get
                                      } catch (t) {
                                          return i
                                      }
                                  }
                              })()
                            : i,
                        p = t('has-symbols')(),
                        c =
                            Object.getPrototypeOf ||
                            function (t) {
                                return t.__proto__
                            },
                        m = {},
                        l = 'undefined' == typeof Uint8Array ? f : c(Uint8Array),
                        h = {
                            '%AggregateError%': 'undefined' == typeof AggregateError ? f : AggregateError,
                            '%Array%': Array,
                            '%ArrayBuffer%': 'undefined' == typeof ArrayBuffer ? f : ArrayBuffer,
                            '%ArrayIteratorPrototype%': p ? c([][Symbol.iterator]()) : f,
                            '%AsyncFromSyncIteratorPrototype%': f,
                            '%AsyncFunction%': m,
                            '%AsyncGenerator%': m,
                            '%AsyncGeneratorFunction%': m,
                            '%AsyncIteratorPrototype%': m,
                            '%Atomics%': 'undefined' == typeof Atomics ? f : Atomics,
                            '%BigInt%': 'undefined' == typeof BigInt ? f : BigInt,
                            '%Boolean%': Boolean,
                            '%DataView%': 'undefined' == typeof DataView ? f : DataView,
                            '%Date%': Date,
                            '%decodeURI%': decodeURI,
                            '%decodeURIComponent%': decodeURIComponent,
                            '%encodeURI%': encodeURI,
                            '%encodeURIComponent%': encodeURIComponent,
                            '%Error%': Error,
                            '%eval%': eval,
                            '%EvalError%': EvalError,
                            '%Float32Array%': 'undefined' == typeof Float32Array ? f : Float32Array,
                            '%Float64Array%': 'undefined' == typeof Float64Array ? f : Float64Array,
                            '%FinalizationRegistry%': 'undefined' == typeof FinalizationRegistry ? f : FinalizationRegistry,
                            '%Function%': o,
                            '%GeneratorFunction%': m,
                            '%Int8Array%': 'undefined' == typeof Int8Array ? f : Int8Array,
                            '%Int16Array%': 'undefined' == typeof Int16Array ? f : Int16Array,
                            '%Int32Array%': 'undefined' == typeof Int32Array ? f : Int32Array,
                            '%isFinite%': isFinite,
                            '%isNaN%': isNaN,
                            '%IteratorPrototype%': p ? c(c([][Symbol.iterator]())) : f,
                            '%JSON%': 'object' == typeof JSON ? JSON : f,
                            '%Map%': 'undefined' == typeof Map ? f : Map,
                            '%MapIteratorPrototype%': 'undefined' != typeof Map && p ? c(new Map()[Symbol.iterator]()) : f,
                            '%Math%': Math,
                            '%Number%': Number,
                            '%Object%': Object,
                            '%parseFloat%': parseFloat,
                            '%parseInt%': parseInt,
                            '%Promise%': 'undefined' == typeof Promise ? f : Promise,
                            '%Proxy%': 'undefined' == typeof Proxy ? f : Proxy,
                            '%RangeError%': RangeError,
                            '%ReferenceError%': ReferenceError,
                            '%Reflect%': 'undefined' == typeof Reflect ? f : Reflect,
                            '%RegExp%': RegExp,
                            '%Set%': 'undefined' == typeof Set ? f : Set,
                            '%SetIteratorPrototype%': 'undefined' != typeof Set && p ? c(new Set()[Symbol.iterator]()) : f,
                            '%SharedArrayBuffer%': 'undefined' == typeof SharedArrayBuffer ? f : SharedArrayBuffer,
                            '%String%': String,
                            '%StringIteratorPrototype%': p ? c(''[Symbol.iterator]()) : f,
                            '%Symbol%': p ? Symbol : f,
                            '%SyntaxError%': s,
                            '%ThrowTypeError%': a,
                            '%TypedArray%': l,
                            '%TypeError%': d,
                            '%Uint8Array%': 'undefined' == typeof Uint8Array ? f : Uint8Array,
                            '%Uint8ClampedArray%': 'undefined' == typeof Uint8ClampedArray ? f : Uint8ClampedArray,
                            '%Uint16Array%': 'undefined' == typeof Uint16Array ? f : Uint16Array,
                            '%Uint32Array%': 'undefined' == typeof Uint32Array ? f : Uint32Array,
                            '%URIError%': URIError,
                            '%WeakMap%': 'undefined' == typeof WeakMap ? f : WeakMap,
                            '%WeakRef%': 'undefined' == typeof WeakRef ? f : WeakRef,
                            '%WeakSet%': 'undefined' == typeof WeakSet ? f : WeakSet,
                        },
                        S = {
                            '%ArrayBufferPrototype%': ['ArrayBuffer', 'prototype'],
                            '%ArrayPrototype%': ['Array', 'prototype'],
                            '%ArrayProto_entries%': ['Array', 'prototype', 'entries'],
                            '%ArrayProto_forEach%': ['Array', 'prototype', 'forEach'],
                            '%ArrayProto_keys%': ['Array', 'prototype', 'keys'],
                            '%ArrayProto_values%': ['Array', 'prototype', 'values'],
                            '%AsyncFunctionPrototype%': ['AsyncFunction', 'prototype'],
                            '%AsyncGenerator%': ['AsyncGeneratorFunction', 'prototype'],
                            '%AsyncGeneratorPrototype%': ['AsyncGeneratorFunction', 'prototype', 'prototype'],
                            '%BooleanPrototype%': ['Boolean', 'prototype'],
                            '%DataViewPrototype%': ['DataView', 'prototype'],
                            '%DatePrototype%': ['Date', 'prototype'],
                            '%ErrorPrototype%': ['Error', 'prototype'],
                            '%EvalErrorPrototype%': ['EvalError', 'prototype'],
                            '%Float32ArrayPrototype%': ['Float32Array', 'prototype'],
                            '%Float64ArrayPrototype%': ['Float64Array', 'prototype'],
                            '%FunctionPrototype%': ['Function', 'prototype'],
                            '%Generator%': ['GeneratorFunction', 'prototype'],
                            '%GeneratorPrototype%': ['GeneratorFunction', 'prototype', 'prototype'],
                            '%Int8ArrayPrototype%': ['Int8Array', 'prototype'],
                            '%Int16ArrayPrototype%': ['Int16Array', 'prototype'],
                            '%Int32ArrayPrototype%': ['Int32Array', 'prototype'],
                            '%JSONParse%': ['JSON', 'parse'],
                            '%JSONStringify%': ['JSON', 'stringify'],
                            '%MapPrototype%': ['Map', 'prototype'],
                            '%NumberPrototype%': ['Number', 'prototype'],
                            '%ObjectPrototype%': ['Object', 'prototype'],
                            '%ObjProto_toString%': ['Object', 'prototype', 'toString'],
                            '%ObjProto_valueOf%': ['Object', 'prototype', 'valueOf'],
                            '%PromisePrototype%': ['Promise', 'prototype'],
                            '%PromiseProto_then%': ['Promise', 'prototype', 'then'],
                            '%Promise_all%': ['Promise', 'all'],
                            '%Promise_reject%': ['Promise', 'reject'],
                            '%Promise_resolve%': ['Promise', 'resolve'],
                            '%RangeErrorPrototype%': ['RangeError', 'prototype'],
                            '%ReferenceErrorPrototype%': ['ReferenceError', 'prototype'],
                            '%RegExpPrototype%': ['RegExp', 'prototype'],
                            '%SetPrototype%': ['Set', 'prototype'],
                            '%SharedArrayBufferPrototype%': ['SharedArrayBuffer', 'prototype'],
                            '%StringPrototype%': ['String', 'prototype'],
                            '%SymbolPrototype%': ['Symbol', 'prototype'],
                            '%SyntaxErrorPrototype%': ['SyntaxError', 'prototype'],
                            '%TypedArrayPrototype%': ['TypedArray', 'prototype'],
                            '%TypeErrorPrototype%': ['TypeError', 'prototype'],
                            '%Uint8ArrayPrototype%': ['Uint8Array', 'prototype'],
                            '%Uint8ClampedArrayPrototype%': ['Uint8ClampedArray', 'prototype'],
                            '%Uint16ArrayPrototype%': ['Uint16Array', 'prototype'],
                            '%Uint32ArrayPrototype%': ['Uint32Array', 'prototype'],
                            '%URIErrorPrototype%': ['URIError', 'prototype'],
                            '%WeakMapPrototype%': ['WeakMap', 'prototype'],
                            '%WeakSetPrototype%': ['WeakSet', 'prototype'],
                        },
                        f = t('function-bind'),
                        v = t('has'),
                        j = f.call(Function.call, Array.prototype.concat),
                        A = f.call(Function.apply, Array.prototype.splice),
                        O = f.call(Function.call, String.prototype.replace),
                        w = f.call(Function.call, String.prototype.slice),
                        P = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g,
                        x = /\\(\\)?/g
                    e.exports = function (t, e) {
                        if ('string' != typeof t || 0 === t.length) throw new d('intrinsic name must be a non-empty string')
                        if (1 < arguments.length && 'boolean' != typeof e) throw new d('"allowMissing" argument must be a boolean')
                        var r,
                            o = (function (t) {
                                var e = w(t, 0, 1),
                                    r = w(t, -1)
                                if ('%' === e && '%' !== r) throw new s('invalid intrinsic syntax, expected closing `%`')
                                if ('%' === r && '%' !== e) throw new s('invalid intrinsic syntax, expected opening `%`')
                                var n = []
                                return (
                                    O(t, P, function (t, e, r, o) {
                                        n[n.length] = r ? O(o, x, '$1') : e || t
                                    }),
                                    n
                                )
                            })(t),
                            n = 0 < o.length ? o[0] : '',
                            i = (function (t, e) {
                                var r,
                                    o = t
                                if ((v(S, o) && (o = '%' + (r = S[o])[0] + '%'), v(h, o))) {
                                    var n = h[o]
                                    if (void 0 === (n = n === m ? g(o) : n) && !e) throw new d('intrinsic ' + t + ' exists, but is not available. Please file an issue!')
                                    return { alias: r, name: o, value: n }
                                }
                                throw new s('intrinsic ' + t + ' does not exist!')
                            })('%' + n + '%', e),
                            a = (i.name, i.value),
                            p = !1,
                            i = i.alias
                        i && ((n = i[0]), A(o, j([0, 1], i)))
                        for (var c = 1, l = !0; c < o.length; c += 1) {
                            var f = o[c],
                                u = w(f, 0, 1),
                                y = w(f, -1)
                            if (('"' === u || "'" === u || '`' === u || '"' === y || "'" === y || '`' === y) && u !== y) throw new s('property names with quotes must have matching quotes')
                            if ((('constructor' !== f && l) || (p = !0), v(h, (r = '%' + (n += '.' + f) + '%')))) a = h[r]
                            else if (null != a) {
                                if (!(f in a)) {
                                    if (!e) throw new d('base intrinsic for ' + t + ' exists, but the property is not available.')
                                    return
                                }
                                ;(a = b && c + 1 >= o.length ? ((l = !!(y = b(a, f))) && 'get' in y && !('originalValue' in y.get) ? y.get : a[f]) : ((l = v(a, f)), a[f])), l && !p && (h[r] = a)
                            }
                        }
                        return a
                    }
                },
                { 'function-bind': 10, has: 14, 'has-symbols': 12 },
            ],
            12: [
                function (t, e, r) {
                    'use strict'
                    var o = 'undefined' != typeof Symbol && Symbol,
                        n = t('./shams')
                    e.exports = function () {
                        return 'function' == typeof o && 'function' == typeof Symbol && 'symbol' == typeof o('foo') && 'symbol' == typeof Symbol('bar') && n()
                    }
                },
                { './shams': 13 },
            ],
            13: [
                function (t, e, r) {
                    'use strict'
                    e.exports = function () {
                        if ('function' != typeof Symbol || 'function' != typeof Object.getOwnPropertySymbols) return !1
                        if ('symbol' == typeof Symbol.iterator) return !0
                        var t = {},
                            e = Symbol('test'),
                            r = Object(e)
                        if ('string' == typeof e) return !1
                        if ('[object Symbol]' !== Object.prototype.toString.call(e)) return !1
                        if ('[object Symbol]' !== Object.prototype.toString.call(r)) return !1
                        for (e in ((t[e] = 42), t)) return !1
                        if ('function' == typeof Object.keys && 0 !== Object.keys(t).length) return !1
                        if ('function' == typeof Object.getOwnPropertyNames && 0 !== Object.getOwnPropertyNames(t).length) return !1
                        r = Object.getOwnPropertySymbols(t)
                        if (1 !== r.length || r[0] !== e) return !1
                        if (!Object.prototype.propertyIsEnumerable.call(t, e)) return !1
                        if ('function' == typeof Object.getOwnPropertyDescriptor) {
                            t = Object.getOwnPropertyDescriptor(t, e)
                            if (42 !== t.value || !0 !== t.enumerable) return !1
                        }
                        return !0
                    }
                },
                {},
            ],
            14: [
                function (t, e, r) {
                    'use strict'
                    t = t('function-bind')
                    e.exports = t.call(Function.call, Object.prototype.hasOwnProperty)
                },
                { 'function-bind': 10 },
            ],
            15: [
                function (t, e, r) {
                    var o = 'function' == typeof Map && Map.prototype,
                        n = Object.getOwnPropertyDescriptor && o ? Object.getOwnPropertyDescriptor(Map.prototype, 'size') : null,
                        v = o && n && 'function' == typeof n.get ? n.get : null,
                        j = o && Map.prototype.forEach,
                        n = 'function' == typeof Set && Set.prototype,
                        o = Object.getOwnPropertyDescriptor && n ? Object.getOwnPropertyDescriptor(Set.prototype, 'size') : null,
                        A = n && o && 'function' == typeof o.get ? o.get : null,
                        O = n && Set.prototype.forEach,
                        w = 'function' == typeof WeakMap && WeakMap.prototype ? WeakMap.prototype.has : null,
                        P = 'function' == typeof WeakSet && WeakSet.prototype ? WeakSet.prototype.has : null,
                        x = 'function' == typeof WeakRef && WeakRef.prototype ? WeakRef.prototype.deref : null,
                        E = Boolean.prototype.valueOf,
                        i = Object.prototype.toString,
                        F = Function.prototype.toString,
                        k = String.prototype.match,
                        I = String.prototype.slice,
                        R = String.prototype.replace,
                        a = String.prototype.toUpperCase,
                        N = String.prototype.toLowerCase,
                        f = RegExp.prototype.test,
                        M = Array.prototype.concat,
                        D = Array.prototype.join,
                        U = Array.prototype.slice,
                        p = Math.floor,
                        _ = 'function' == typeof BigInt ? BigInt.prototype.valueOf : null,
                        u = Object.getOwnPropertySymbols,
                        W = 'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator ? Symbol.prototype.toString : null,
                        B = 'function' == typeof Symbol && 'object' == typeof Symbol.iterator,
                        C = 'function' == typeof Symbol && Symbol.toStringTag && (typeof Symbol.toStringTag === B || 'symbol') ? Symbol.toStringTag : null,
                        T = Object.prototype.propertyIsEnumerable,
                        L =
                            ('function' == typeof Reflect ? Reflect : Object).getPrototypeOf ||
                            ([].__proto__ === Array.prototype
                                ? function (t) {
                                      return t.__proto__
                                  }
                                : null)
                    function G(t, e) {
                        if (t === 1 / 0 || t === -1 / 0 || t != t || (t && -1e3 < t && t < 1e3) || f.call(/e/, e)) return e
                        var r = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g
                        if ('number' == typeof t) {
                            var o = t < 0 ? -p(-t) : p(t)
                            if (o !== t) {
                                ;(t = String(o)), (o = I.call(e, t.length + 1))
                                return R.call(t, r, '$&_') + '.' + R.call(R.call(o, /([0-9]{3})/g, '$&_'), /_$/, '')
                            }
                        }
                        return R.call(e, r, '$&_')
                    }
                    var t = t('./util.inspect').custom,
                        q = t && V(t) ? t : null
                    function $(t, e, r) {
                        e = 'double' === (r.quoteStyle || e) ? '"' : "'"
                        return e + t + e
                    }
                    function H(t) {
                        return !('[object Array]' !== Q(t) || (C && 'object' == typeof t && C in t))
                    }
                    function V(t) {
                        if (B) return t && 'object' == typeof t && t instanceof Symbol
                        if ('symbol' == typeof t) return 1
                        if (t && 'object' == typeof t && W)
                            try {
                                return W.call(t), 1
                            } catch (t) {}
                    }
                    e.exports = function o(r, t, n, i) {
                        var a = t || {}
                        if (z(a, 'quoteStyle') && 'single' !== a.quoteStyle && 'double' !== a.quoteStyle) throw new TypeError('option "quoteStyle" must be "single" or "double"')
                        if (z(a, 'maxStringLength') && ('number' == typeof a.maxStringLength ? a.maxStringLength < 0 && a.maxStringLength !== 1 / 0 : null !== a.maxStringLength)) throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`')
                        var e = !z(a, 'customInspect') || a.customInspect
                        if ('boolean' != typeof e && 'symbol' !== e) throw new TypeError('option "customInspect", if provided, must be `true`, `false`, or `\'symbol\'`')
                        if (z(a, 'indent') && null !== a.indent && '\t' !== a.indent && !(parseInt(a.indent, 10) === a.indent && 0 < a.indent)) throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`')
                        if (z(a, 'numericSeparator') && 'boolean' != typeof a.numericSeparator) throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`')
                        var p = a.numericSeparator
                        if (void 0 === r) return 'undefined'
                        if (null === r) return 'null'
                        if ('boolean' == typeof r) return r ? 'true' : 'false'
                        if ('string' == typeof r)
                            return (function t(e, r) {
                                if (e.length > r.maxStringLength) {
                                    var o = e.length - r.maxStringLength,
                                        o = '... ' + o + ' more character' + (1 < o ? 's' : '')
                                    return t(I.call(e, 0, r.maxStringLength), r) + o
                                }
                                e = R.call(R.call(e, /(['\\])/g, '\\$1'), /[\x00-\x1f]/g, K)
                                return $(e, 'single', r)
                            })(r, a)
                        if ('number' == typeof r) {
                            if (0 === r) return 0 < 1 / 0 / r ? '0' : '-0'
                            t = String(r)
                            return p ? G(r, t) : t
                        }
                        if ('bigint' == typeof r) {
                            var c = String(r) + 'n'
                            return p ? G(r, c) : c
                        }
                        p = void 0 === a.depth ? 5 : a.depth
                        if (p <= (n = void 0 === n ? 0 : n) && 0 < p && 'object' == typeof r) return H(r) ? '[Array]' : '[Object]'
                        var l,
                            c = (function (t, e) {
                                var r
                                if ('\t' === t.indent) r = '\t'
                                else {
                                    if (!('number' == typeof t.indent && 0 < t.indent)) return null
                                    r = D.call(Array(t.indent + 1), ' ')
                                }
                                return { base: r, prev: D.call(Array(e + 1), r) }
                            })(a, n)
                        if (void 0 === i) i = []
                        else if (0 <= J(i, r)) return '[Circular]'
                        function f(t, e, r) {
                            if ((e && (i = U.call(i)).push(e), r)) {
                                r = { depth: a.depth }
                                return z(a, 'quoteStyle') && (r.quoteStyle = a.quoteStyle), o(t, r, n + 1, i)
                            }
                            return o(t, a, n + 1, i)
                        }
                        if ('function' == typeof r) {
                            var p = (function (t) {
                                    if (t.name) return t.name
                                    t = k.call(F.call(t), /^function\s*([\w$]+)/)
                                    if (t) return t[1]
                                    return null
                                })(r),
                                u = et(r, f)
                            return '[Function' + (p ? ': ' + p : ' (anonymous)') + ']' + (0 < u.length ? ' { ' + D.call(u, ', ') + ' }' : '')
                        }
                        if (V(r)) {
                            u = B ? R.call(String(r), /^(Symbol\(.*\))_[^)]*$/, '$1') : W.call(r)
                            return 'object' != typeof r || B ? u : X(u)
                        }
                        if (
                            (function (t) {
                                if (!t || 'object' != typeof t) return !1
                                if ('undefined' != typeof HTMLElement && t instanceof HTMLElement) return !0
                                return 'string' == typeof t.nodeName && 'function' == typeof t.getAttribute
                            })(r)
                        ) {
                            for (var y = '<' + N.call(String(r.nodeName)), s = r.attributes || [], d = 0; d < s.length; d++) y += ' ' + s[d].name + '=' + $(((l = s[d].value), R.call(String(l), /"/g, '&quot;')), 'double', a)
                            return (y += '>'), r.childNodes && r.childNodes.length && (y += '...'), (y += '</' + N.call(String(r.nodeName)) + '>')
                        }
                        if (H(r)) {
                            if (0 === r.length) return '[]'
                            var b = et(r, f)
                            return c &&
                                !(function (t) {
                                    for (var e = 0; e < t.length; e++) if (0 <= J(t[e], '\n')) return !1
                                    return !0
                                })(b)
                                ? '[' + tt(b, c) + ']'
                                : '[ ' + D.call(b, ', ') + ' ]'
                        }
                        if (!('[object Error]' !== Q((b = r)) || (C && 'object' == typeof b && C in b))) {
                            var g = et(r, f)
                            return 'cause' in r && !T.call(r, 'cause') ? '{ [' + String(r) + '] ' + D.call(M.call('[cause]: ' + f(r.cause), g), ', ') + ' }' : 0 === g.length ? '[' + String(r) + ']' : '{ [' + String(r) + '] ' + D.call(g, ', ') + ' }'
                        }
                        if ('object' == typeof r && e) {
                            if (q && 'function' == typeof r[q]) return r[q]()
                            if ('symbol' !== e && 'function' == typeof r.inspect) return r.inspect()
                        }
                        if (
                            (function (t) {
                                if (!v || !t || 'object' != typeof t) return !1
                                try {
                                    v.call(t)
                                    try {
                                        A.call(t)
                                    } catch (t) {
                                        return !0
                                    }
                                    return t instanceof Map
                                } catch (t) {}
                                return !1
                            })(r)
                        ) {
                            var m = []
                            return (
                                j.call(r, function (t, e) {
                                    m.push(f(e, r, !0) + ' => ' + f(t, r))
                                }),
                                Z('Map', v.call(r), m, c)
                            )
                        }
                        if (
                            (function (t) {
                                if (!A || !t || 'object' != typeof t) return !1
                                try {
                                    A.call(t)
                                    try {
                                        v.call(t)
                                    } catch (t) {
                                        return !0
                                    }
                                    return t instanceof Set
                                } catch (t) {}
                                return !1
                            })(r)
                        ) {
                            var h = []
                            return (
                                O.call(r, function (t) {
                                    h.push(f(t, r))
                                }),
                                Z('Set', A.call(r), h, c)
                            )
                        }
                        if (
                            (function (t) {
                                if (!w || !t || 'object' != typeof t) return !1
                                try {
                                    w.call(t, w)
                                    try {
                                        P.call(t, P)
                                    } catch (t) {
                                        return !0
                                    }
                                    return t instanceof WeakMap
                                } catch (t) {}
                                return !1
                            })(r)
                        )
                            return Y('WeakMap')
                        if (
                            (function (t) {
                                if (!P || !t || 'object' != typeof t) return !1
                                try {
                                    P.call(t, P)
                                    try {
                                        w.call(t, w)
                                    } catch (t) {
                                        return !0
                                    }
                                    return t instanceof WeakSet
                                } catch (t) {}
                                return !1
                            })(r)
                        )
                            return Y('WeakSet')
                        if (
                            (function (t) {
                                if (!x || !t || 'object' != typeof t) return !1
                                try {
                                    return x.call(t), !0
                                } catch (t) {}
                                return !1
                            })(r)
                        )
                            return Y('WeakRef')
                        if (!('[object Number]' !== Q((b = r)) || (C && 'object' == typeof b && C in b))) return X(f(Number(r)))
                        if (
                            (function (t) {
                                if (!t || 'object' != typeof t || !_) return !1
                                try {
                                    return _.call(t), !0
                                } catch (t) {}
                                return !1
                            })(r)
                        )
                            return X(f(_.call(r)))
                        if (!('[object Boolean]' !== Q((g = r)) || (C && 'object' == typeof g && C in g))) return X(E.call(r))
                        if (!('[object String]' !== Q((e = r)) || (C && 'object' == typeof e && C in e))) return X(f(String(r)))
                        if (('[object Date]' !== Q((b = r)) || (C && 'object' == typeof b && C in b)) && ('[object RegExp]' !== Q((S = r)) || (C && 'object' == typeof S && C in S))) {
                            var g = et(r, f),
                                e = L ? L(r) === Object.prototype : r instanceof Object || r.constructor === Object,
                                b = r instanceof Object ? '' : 'null prototype',
                                S = !e && C && Object(r) === r && C in r ? I.call(Q(r), 8, -1) : b ? 'Object' : '',
                                b = (!e && 'function' == typeof r.constructor && r.constructor.name ? r.constructor.name + ' ' : '') + (S || b ? '[' + D.call(M.call([], S || [], b || []), ': ') + '] ' : '')
                            return 0 === g.length ? b + '{}' : c ? b + '{' + tt(g, c) + '}' : b + '{ ' + D.call(g, ', ') + ' }'
                        }
                        return String(r)
                    }
                    var c =
                        Object.prototype.hasOwnProperty ||
                        function (t) {
                            return t in this
                        }
                    function z(t, e) {
                        return c.call(t, e)
                    }
                    function Q(t) {
                        return i.call(t)
                    }
                    function J(t, e) {
                        if (t.indexOf) return t.indexOf(e)
                        for (var r = 0, o = t.length; r < o; r++) if (t[r] === e) return r
                        return -1
                    }
                    function K(t) {
                        var e = t.charCodeAt(0),
                            t = { 8: 'b', 9: 't', 10: 'n', 12: 'f', 13: 'r' }[e]
                        return t ? '\\' + t : '\\x' + (e < 16 ? '0' : '') + a.call(e.toString(16))
                    }
                    function X(t) {
                        return 'Object(' + t + ')'
                    }
                    function Y(t) {
                        return t + ' { ? }'
                    }
                    function Z(t, e, r, o) {
                        return t + ' (' + e + ') {' + (o ? tt(r, o) : D.call(r, ', ')) + '}'
                    }
                    function tt(t, e) {
                        if (0 === t.length) return ''
                        var r = '\n' + e.prev + e.base
                        return r + D.call(t, ',' + r) + '\n' + e.prev
                    }
                    function et(t, e) {
                        var r = H(t),
                            o = []
                        if (r) {
                            o.length = t.length
                            for (var n = 0; n < t.length; n++) o[n] = z(t, n) ? e(t[n], t) : ''
                        }
                        var i,
                            a = 'function' == typeof u ? u(t) : []
                        if (B) for (var p = {}, c = 0; c < a.length; c++) p['$' + a[c]] = a[c]
                        for (i in t) z(t, i) && ((r && String(Number(i)) === i && i < t.length) || (B && p['$' + i] instanceof Symbol) || (f.call(/[^\w$]/, i) ? o.push(e(i, t) + ': ' + e(t[i], t)) : o.push(i + ': ' + e(t[i], t))))
                        if ('function' == typeof u) for (var l = 0; l < a.length; l++) T.call(t, a[l]) && o.push('[' + e(a[l]) + ']: ' + e(t[a[l]], t))
                        return o
                    }
                },
                { './util.inspect': 6 },
            ],
            16: [
                function (t, e, r) {
                    'use strict'
                    function p(t, e) {
                        for (var r, o = t; null !== (r = o.next); o = r) if (r.key === e) return (o.next = r.next), (r.next = t.next), (t.next = r)
                    }
                    var o = t('get-intrinsic'),
                        n = t('call-bind/callBound'),
                        c = t('object-inspect'),
                        l = o('%TypeError%'),
                        f = o('%WeakMap%', !0),
                        u = o('%Map%', !0),
                        y = n('WeakMap.prototype.get', !0),
                        s = n('WeakMap.prototype.set', !0),
                        d = n('WeakMap.prototype.has', !0),
                        b = n('Map.prototype.get', !0),
                        g = n('Map.prototype.set', !0),
                        m = n('Map.prototype.has', !0)
                    e.exports = function () {
                        var n,
                            i,
                            a,
                            e = {
                                assert: function (t) {
                                    if (!e.has(t)) throw new l('Side channel does not contain ' + c(t))
                                },
                                get: function (t) {
                                    if (f && t && ('object' == typeof t || 'function' == typeof t)) {
                                        if (n) return y(n, t)
                                    } else if (u) {
                                        if (i) return b(i, t)
                                    } else if (a)
                                        return (function (t, e) {
                                            e = p(t, e)
                                            return e && e.value
                                        })(a, t)
                                },
                                has: function (t) {
                                    if (f && t && ('object' == typeof t || 'function' == typeof t)) {
                                        if (n) return d(n, t)
                                    } else if (u) {
                                        if (i) return m(i, t)
                                    } else if (a) return !!p(a, t)
                                    return !1
                                },
                                set: function (t, e) {
                                    var r, o
                                    f && t && ('object' == typeof t || 'function' == typeof t) ? ((n = n || new f()), s(n, t, e)) : u ? ((i = i || new u()), g(i, t, e)) : ((o = e), (t = p((r = a = a || { key: {}, next: null }), (e = t))) ? (t.value = o) : (r.next = { key: e, next: r.next, value: o }))
                                },
                            }
                        return e
                    }
                },
                { 'call-bind/callBound': 7, 'get-intrinsic': 11, 'object-inspect': 15 },
            ],
        },
        {},
        [2]
    )(2)
})
