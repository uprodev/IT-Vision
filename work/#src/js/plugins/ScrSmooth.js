/*!
 * ScrollSmoother 3.12.0
 * https://greensock.com
*/

(function (e) {
        "use strict";

        function _defineProperties(e, t) {
                for (var r = 0; r < t.length; r++) {
                        var n = t[r];
                        n.enumerable = n.enumerable || !1,
                        n.configurable = !0,
                        "value" in n && (n.writable = !0),
                        Object.defineProperty(e, n.key, n)
                }
        }
        function s() {
                return "undefined" != typeof window
        }
        function t() {
                return L || s() && (L = window.gsap) && L.registerPlugin && L
        }
        function w() {
                return String.fromCharCode.apply(null, arguments)
        }
        function C(e) {
                return D.maxScroll(e || N)
        }
        var L, I, N, U, Y, j, $, q, D, V, X, Z, K, G, J, i = "ScrollSmoother",
                r = (ScrollSmoother.register = function register(e) {
                        return I || (L = e || t(), s() && window.document && (N = window, U = document, Y = U.documentElement, j = U.body), L && ($ = L.utils.toArray, q = L.utils.clamp, X = L.parseEase("expo"), G = L.core.context ||
                        function () {}, J = L.delayedCall(.2, function () {
                                return D.isRefreshing || V && V.refresh()
                        }).pause(), D = L.core.globals().ScrollTrigger, L.core.globals("ScrollSmoother", ScrollSmoother), j && D && (Z = D.core._getVelocityProp, K = D.core._inputObserver, ScrollSmoother.refresh = D.refresh, I = 1))),
                        I
                }, function _createClass(e, t, r) {
                        return t && _defineProperties(e.prototype, t),
                        r && _defineProperties(e, r),
                        e
                }(ScrollSmoother, [{
                        key: "progress",
                        get: function get() {
                                return this.scrollTrigger ? this.scrollTrigger.animation._time / 100 : 0
                        }
                }]), ScrollSmoother);

        function ScrollSmoother(t) {
                var o = this;
                I || ScrollSmoother.register(L) || console.warn("Please gsap.registerPlugin(ScrollSmoother)"),
                t = this.vars = t || {},
                V && V.kill(),
                G(V = this);

                function Na() {
                        return O.update(-A)
                }
                function Pa() {
                        return n.style.overflow = "visible"
                }
                function Ra(e) {
                        e.update();
                        var t = e.getTween();
                        t && (t.pause(), t._time = t._dur, t._tTime = t._tDur),
                        h = !1,
                        e.animation.progress(e.progress, !0)
                }
                function Sa(e, t) {
                        (e !== A && !u || t) && (R && (e = Math.round(e)), k && (n.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + e + ", 0, 1)", n._gsap.y = e + "px"), z = e - A, A = e, D.isUpdating || ScrollSmoother.isRefreshing || D.update())
                }
                function Ta(e) {
                        return arguments.length ? (e < 0 && (e = 0), W.y = -e, h = !0, u ? A = -e : Sa(-e), D.isRefreshing ? i.update() : E(e / H), this) : -A
                }
                function Wa(e) {
                        v.scrollTop = 0,
                        e.target.contains && e.target.contains(v) || T && !1 === T(o, e) || (D.isInViewport(e.target) || e.target === g || o.scrollTo(e.target, !1, "center center"), g = e.target)
                }
                function Xa(e, t) {
                        if (e < t.start) return e;
                        var r = t._startClamp && !t.start ? 0 : t._endClamp && t.end === C() ? 1 : .5,
                                n = Math.min(t.start + (t.end - t.start) * t.ratio, e) - t.start;
                        return e + (n - 2 * t.offset * r) / t.ratio - n
                }
                function Ya(e) {
                        var r, n, o, i, a;
                        S.forEach(function (t) {
                                r = t.pins,
                                a = t.markers,
                                e.forEach(function (e) {
                                        t.trigger && e.trigger && t !== e && (e.trigger === t.trigger || e.pinnedContainer === t.trigger || t.trigger.contains(e.trigger)) && (n = Xa(e._startClamp || e.start, t), i = 0, r.forEach(function (e) {
                                                return i -= e.distance / t.ratio - e.distance
                                        }), n += i, o = e.pin && 0 < e.end ? n + (e.end - e.start) : Xa(e._endClamp || e.end, t) + i, e._startClamp && n < 0 && (n = 0), e._endClamp && o > C() && (o = C()), e.setPositions(n, o, !0, n - e.start), e.markerStart && a.push(L.quickSetter([e.markerStart, e.markerEnd], "y", "px")), e.pin && 0 < e.end && (i = e.end - e.start, r.push({
                                                start: e.start,
                                                end: e.end,
                                                distance: i,
                                                trig: e
                                        }), t.setPositions(t.start, t.end + i, !0), t.vars.onRefresh(t)))
                                })
                        })
                }
                function Za() {
                        Pa(),
                        requestAnimationFrame(Pa),
                        S && (S.forEach(function (e) {
                                var t = e.start,
                                        r = e.auto ? Math.min(C(), e.end) : t + (e.end - t) / e.ratio,
                                        n = (r - e.end) / 2;
                                if ((r -= n) < (t -= n)) {
                                        var o = t;
                                        t = r,
                                        r = o
                                }
                                e._startClamp && !e.start ? (n = (r += e.start - t) - e.end, t = 0) : e._endClamp && e.end === C() && (n = ((r = C()) - (t = e.ratio < 0 || 1 < e.ratio ? 0 : r - (r - e.start) / e.ratio)) * e.ratio - (e.end - e.start)),
                                e.offset = n || 1e-4,
                                e.pins.length = 0,
                                e._origStart = e.start,
                                e._origEnd = e.end,
                                e.setPositions(t, r, !0),
                                e.vars.onRefresh(e)
                        }), Ya(D.sort())),
                        O.reset()
                }
                function $a() {
                        return D.addEventListener("refresh", Za)
                }
                function _a() {
                        return S && S.forEach(function (e) {
                                return e.vars.onRefresh(e)
                        })
                }
                function ab() {
                        return S && S.forEach(function (e) {
                                return e.vars.onRefreshInit(e)
                        }),
                        _a
                }
                function bb(r, n, o, i) {
                        return function () {
                                var e = "function" == typeof n ? n(o, i) : n;
                                e || 0 === e || (e = i.getAttribute("data-" + P + r) || ("speed" === r ? 1 : 0)),
                                i.setAttribute("data-" + P + r, e);
                                var t = "clamp(" === (e + "").substr(0, 6);
                                return {
                                        clamp: t,
                                        value: t ? e.substr(6, e.length - 7) : e
                                }
                        }
                }
                function cb(r, e, t, n, o) {
                        function _b() {
                                e = f(),
                                t = parseFloat(d().value),
                                i = parseFloat(e.value) || 1,
                                s = "auto" === e.value,
                                c = s || a && a._startClamp && !a.start ? 0 : a && a._endClamp && a.end === C() ? 1 : .5,
                                l && l.kill(),
                                l = t && L.to(r, {
                                        ease: X,
                                        overwrite: !1,
                                        y: "+=0",
                                        duration: t
                                }),
                                a && (a.ratio = i, a.autoSpeed = s)
                        }
                        function ac() {
                                g.y = h + "px",
                                g.renderTransform(1),
                                _b()
                        }
                        function ec(e) {
                                if (s) {
                                        ac();
                                        var t = function _autoDistance(e, t) {
                                                var r, n, o = e.parentNode || Y,
                                                        i = e.getBoundingClientRect(),
                                                        a = o.getBoundingClientRect(),
                                                        s = a.top - i.top,
                                                        l = a.bottom - i.bottom,
                                                        c = (Math.abs(s) > Math.abs(l) ? s : l) / (1 - t),
                                                        u = -c * t;
                                                return 0 < c && (n = .5 == (r = a.height / (N.innerHeight + a.height)) ? 2 * a.height : 2 * Math.min(a.height, -c * r / (2 * r - 1)) * (t || 1), u += t ? -n * t : -n / 2, c += n),
                                                {
                                                        change: c,
                                                        offset: u
                                                }
                                        }(r, q(0, 1, -e.start / (e.end - e.start)));
                                        w = t.change,
                                        u = t.offset
                                } else w = (e.end - e.start) * (1 - i),
                                u = 0;
                                p.forEach(function (e) {
                                        return w -= e.distance * (1 - i)
                                }),
                                e.vars.onUpdate(e),
                                l && l.progress(1)
                        }
                        o = ("function" == typeof o ? o(n, r) : o) || 0;
                        var i, a, s, l, c, u, f = bb("speed", e, n, r),
                                d = bb("lag", t, n, r),
                                h = L.getProperty(r, "y"),
                                g = r._gsap,
                                p = [],
                                m = [],
                                w = 0;
                        return _b(),
                        (1 !== i || s || l) && (ec(a = D.create({
                                trigger: s ? r.parentNode : r,
                                start: e.clamp ? "clamp(top bottom+=" + o + ")" : "top bottom+=" + o,
                                end: e.value < 0 ? "max" : e.clamp ? "clamp(bottom top-=" + o + ")" : "bottom top-=" + o,
                                scroller: v,
                                scrub: !0,
                                refreshPriority: -999,
                                onRefreshInit: ac,
                                onRefresh: ec,
                                onKill: function onKill(e) {
                                        var t = S.indexOf(e);
                                        0 <= t && S.splice(t, 1),
                                        ac()
                                },
                                onUpdate: function onUpdate(e) {
                                        var t, r, n, o = h + w * (e.progress - c),
                                                i = p.length,
                                                a = 0;
                                        if (e.offset) {
                                                if (i) {
                                                        for (r = -A, n = e.end; i--;) {
                                                                if ((t = p[i]).trig.isActive || r >= t.start && r <= t.end) return void(l && (t.trig.progress += t.trig.direction < 0 ? .001 : -.001, t.trig.update(0, 0, 1), l.resetTo("y", parseFloat(g.y), -z, !0), M && l.progress(1)));
                                                                r > t.end && (a += t.distance),
                                                                n -= t.distance
                                                        }
                                                        o = h + a + w * ((L.utils.clamp(e.start, e.end, r) - e.start - a) / (n - e.start) - c)
                                                }
                                                o = function _round(e) {
                                                        return Math.round(1e5 * e) / 1e5 || 0
                                                }(o + u),
                                                m.length && !s && m.forEach(function (e) {
                                                        return e(o - a)
                                                }),
                                                l ? (l.resetTo("y", o, -z, !0), M && l.progress(1)) : (g.y = o + "px", g.renderTransform(1))
                                        }
                                }
                        })), L.core.getCache(a.trigger).stRevert = ab, a.startY = h, a.pins = p, a.markers = m, a.ratio = i, a.autoSpeed = s, r.style.willChange = "transform"),
                        a
                }
                var n, v, e, i, S, a, s, l, c, u, r, f, d, h, g, p = t.smoothTouch,
                        m = t.onUpdate,
                        w = t.onStop,
                        b = t.smooth,
                        T = t.onFocusIn,
                        _ = t.normalizeScroll,
                        R = t.wholePixels,
                        x = this,
                        P = t.effectsPrefix || "",
                        E = D.getScrollFunc(N),
                        k = 1 === D.isTouch ? !0 === p ? .8 : parseFloat(p) || 0 : 0 === b || !1 === b ? 0 : parseFloat(b) || .8,
                        H = k && +t.speed || 1,
                        A = 0,
                        z = 0,
                        M = 1,
                        O = Z(0),
                        W = {
                                y: 0
                        },
                        B = "undefined" != typeof ResizeObserver && !1 !== t.autoResize && new ResizeObserver(function () {
                                if (!D.isRefreshing) {
                                        var e = C(v) * H;
                                        e < -A && Ta(e),
                                        J.restart(!0)
                                }
                        });

                function refreshHeight() {
                        return e = n.clientHeight,
                        n.style.overflow = "visible",
                        j.style.height = N.innerHeight + (e - N.innerHeight) / H + "px",
                        e - N.innerHeight
                }
                $a(),
                D.addEventListener("killAll", $a),
                L.delayedCall(.5, function () {
                        return M = 0
                }),
                this.scrollTop = Ta,
                this.scrollTo = function (e, t, r) {
                        var n = L.utils.clamp(0, C(), isNaN(e) ? o.offset(e, r) : +e);
                        t ? u ? L.to(o, {
                                duration: k,
                                scrollTop: n,
                                overwrite: "auto",
                                ease: X
                        }) : E(n) : Ta(n)
                },
                this.offset = function (e, t) {
                        var r, n = (e = $(e)[0]).style.cssText,
                                o = D.create({
                                        trigger: e,
                                        start: t || "top top"
                                });
                        return S && Ya([o]),
                        r = o.start / H,
                        o.kill(!1),
                        e.style.cssText = n,
                        L.core.getCache(e).uncache = 1,
                        r
                },
                this.content = function (e) {
                        if (arguments.length) {
                                var t = $(e || "#smooth-content")[0] || console.warn("ScrollSmoother needs a valid content element.") || j.children[0];
                                return t !== n && (c = (n = t).getAttribute("style") || "", B && B.observe(n), L.set(n, {
                                        overflow: "visible",
                                        width: "100%",
                                        boxSizing: "border-box",
                                        y: "+=0"
                                }), k || L.set(n, {
                                        clearProps: "transform"
                                })),
                                this
                        }
                        return n
                },
                this.wrapper = function (e) {
                        return arguments.length ? (v = $(e || "#smooth-wrapper")[0] ||
                        function _wrap(e) {
                                var t = U.querySelector(".ScrollSmoother-wrapper");
                                return t || ((t = U.createElement("div")).classList.add("ScrollSmoother-wrapper"), e.parentNode.insertBefore(t, e), t.appendChild(e)),
                                t
                        }(n), l = v.getAttribute("style") || "", refreshHeight(), L.set(v, k ? {
                                overflow: "hidden",
                                position: "fixed",
                                height: "100%",
                                width: "100%",
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0
                        } : {
                                overflow: "visible",
                                position: "relative",
                                width: "100%",
                                height: "auto",
                                top: "auto",
                                bottom: "auto",
                                left: "auto",
                                right: "auto"
                        }), this) : v
                },
                this.effects = function (e, t) {
                        if (S = S || [], !e) return S.slice(0);
                        (e = $(e)).forEach(function (e) {
                                for (var t = S.length; t--;) S[t].trigger === e && S[t].kill()
                        });
                        t = t || {};
                        var r, n, o = t.speed,
                                i = t.lag,
                                a = t.effectsPadding,
                                s = [];
                        for (r = 0; r < e.length; r++)(n = cb(e[r], o, i, r, a)) && s.push(n);
                        return S.push.apply(S, s),
                        s
                },
                this.sections = function (e, t) {
                        if (a = a || [], !e) return a.slice(0);
                        var r = $(e).map(function (t) {
                                return D.create({
                                        trigger: t,
                                        start: "top 120%",
                                        end: "bottom -20%",
                                        onToggle: function onToggle(e) {
                                                t.style.opacity = e.isActive ? "1" : "0",
                                                t.style.pointerEvents = e.isActive ? "all" : "none"
                                        }
                                })
                        });
                        return t && t.add ? a.push.apply(a, r) : a = r.slice(0),
                        r
                },
                this.content(t.content),
                this.wrapper(t.wrapper),
                this.render = function (e) {
                        return Sa(e || 0 === e ? e : A)
                },
                this.getVelocity = function () {
                        return O.getVelocity(-A)
                },
                D.scrollerProxy(v, {
                        scrollTop: Ta,
                        scrollHeight: function scrollHeight() {
                                return refreshHeight() && j.scrollHeight
                        },
                        fixedMarkers: !1 !== t.fixedMarkers && !! k,
                        content: n,
                        getBoundingClientRect: function getBoundingClientRect() {
                                return {
                                        top: 0,
                                        left: 0,
                                        width: N.innerWidth,
                                        height: N.innerHeight
                                }
                        }
                }),
                D.defaults({
                        scroller: v
                });
                var F = D.getAll().filter(function (e) {
                        return e.scroller === N || e.scroller === v
                });
                F.forEach(function (e) {
                        return e.revert(!0, !0)
                }),
                i = D.create({
                        animation: L.fromTo(W, {
                                y: 0
                        }, {
                                y: function y() {
                                        return -refreshHeight()
                                },
                                immediateRender: !1,
                                ease: "none",
                                data: "ScrollSmoother",
                                duration: 100,
                                onUpdate: function onUpdate() {
                                        if (this._dur) {
                                                var e = h;
                                                e && (Ra(i), W.y = A),
                                                Sa(W.y, e),
                                                Na(),
                                                m && !u && m(x)
                                        }
                                }
                        }),
                        onRefreshInit: function onRefreshInit(e) {
                                if (!ScrollSmoother.isRefreshing) {
                                        if (ScrollSmoother.isRefreshing = !0, S) {
                                                var t = D.getAll().filter(function (e) {
                                                        return !!e.pin
                                                });
                                                S.forEach(function (r) {
                                                        r.vars.pinnedContainer || t.forEach(function (e) {
                                                                if (e.pin.contains(r.trigger)) {
                                                                        var t = r.vars;
                                                                        t.pinnedContainer = e.pin,
                                                                        r.vars = null,
                                                                        r.init(t, r.animation)
                                                                }
                                                        })
                                                })
                                        }
                                        var r = e.getTween();
                                        d = r && r._end > r._dp._time,
                                        f = A,
                                        W.y = 0,
                                        k && (1 === D.isTouch && (v.style.position = "absolute"), v.scrollTop = 0, 1 === D.isTouch && (v.style.position = "fixed"))
                                }
                        },
                        onRefresh: function onRefresh(e) {
                                e.animation.invalidate(),
                                e.setPositions(e.start, refreshHeight() / H),
                                d || Ra(e),
                                W.y = -E() * H,
                                Sa(W.y),
                                M || e.animation.progress(L.utils.clamp(0, 1, f / H / -e.end)),
                                d && (e.progress -= .001, e.update()),
                                ScrollSmoother.isRefreshing = !1
                        },
                        id: "ScrollSmoother",
                        scroller: N,
                        invalidateOnRefresh: !0,
                        start: 0,
                        refreshPriority: -9999,
                        end: function end() {
                                return refreshHeight() / H
                        },
                        onScrubComplete: function onScrubComplete() {
                                O.reset(),
                                w && w(o)
                        },
                        scrub: k || !0
                }),
                this.smooth = function (e) {
                        return arguments.length && (H = (k = e || 0) && +t.speed || 1, i.scrubDuration(e)),
                        i.getTween() ? i.getTween().duration() : 0
                },
                i.getTween() && (i.getTween().vars.ease = t.ease || X),
                this.scrollTrigger = i,
                t.effects && this.effects(!0 === t.effects ? "[data-" + P + "speed], [data-" + P + "lag]" : t.effects, {
                        effectsPadding: t.effectsPadding
                }),
                t.sections && this.sections(!0 === t.sections ? "[data-section]" : t.sections),
                F.forEach(function (e) {
                        e.vars.scroller = v,
                        e.revert(!1, !0),
                        e.init(e.vars, e.animation)
                }),
                this.paused = function (e, t) {
                        return arguments.length ? ( !! u !== e && (e ? (i.getTween() && i.getTween().pause(), E(-A / H), O.reset(), (r = D.normalizeScroll()) && r.disable(), (u = D.observe({
                                preventDefault: !0,
                                type: "wheel,touch,scroll",
                                debounce: !1,
                                allowClicks: !0,
                                onChangeY: function onChangeY() {
                                        return Ta(-A)
                                }
                        })).nested = K(Y, "wheel,touch,scroll", !0, !1 !== t)) : (u.nested.kill(), u.kill(), u = 0, r && r.enable(), i.progress = (-A / H - i.start) / (i.end - i.start), Ra(i))), this) : !! u
                },
                this.kill = this.revert = function () {
                        o.paused(!1),
                        Ra(i),
                        i.kill();
                        for (var e = (S || []).concat(a || []), t = e.length; t--;) e[t].kill();
                        D.scrollerProxy(v),
                        D.removeEventListener("killAll", $a),
                        D.removeEventListener("refresh", Za),
                        v.style.cssText = l,
                        n.style.cssText = c;
                        var r = D.defaults({});
                        r && r.scroller === v && D.defaults({
                                scroller: N
                        }),
                        o.normalizer && D.normalizeScroll(!1),
                        clearInterval(s),
                        V = null,
                        B && B.disconnect(),
                        j.style.removeProperty("height"),
                        N.removeEventListener("focusin", Wa)
                },
                this.refresh = function (e, t) {
                        return i.refresh(e, t)
                },
                _ && (this.normalizer = D.normalizeScroll(!0 === _ ? {
                        debounce: !0,
                        content: !k && n
                } : _)),
                D.config(t),
                "overscrollBehavior" in N.getComputedStyle(j) && L.set([j, Y], {
                        overscrollBehavior: "none"
                }),
                "scrollBehavior" in N.getComputedStyle(j) && L.set([j, Y], {
                        scrollBehavior: "auto"
                }),
                N.addEventListener("focusin", Wa),
                s = setInterval(Na, 250),
                "loading" === U.readyState || requestAnimationFrame(function () {
                        return D.refresh()
                })
        }
        r.version = "3.12.0",
        r.create = function (e) {
                return V && e && V.content() === $(e.content)[0] ? V : new r(e)
        },
        r.get = function () {
                return V
        },
        t() && L.registerPlugin(r),
        e.ScrollSmoother = r,
        e.default = r;
        if (typeof(window) === "undefined" || window !== e) {
                Object.defineProperty(e, "__esModule", {
                        value: !0
                })
        } else {
                delete e.default
        }
})(window);