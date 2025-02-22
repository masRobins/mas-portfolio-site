"use strict";
function _classCallCheck(t, o) {
    if (!(t instanceof o))
        throw new TypeError("Cannot call a class as a function")
}
var _createClass = function() {
    function t(t, o) {
        for (var e = 0; e < o.length; e++) {
            var i = o[e];
            i.enumerable = i.enumerable || !1,
            i.configurable = !0,
            "value"in i && (i.writable = !0),
            Object.defineProperty(t, i.key, i)
        }
    }
    return function(o, e, i) {
        return e && t(o.prototype, e),
        i && t(o, i),
        o
    }
}()
  , _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t
}
: function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
}
;
!function(t) {
    "object" == ("undefined" == typeof module ? "undefined" : _typeof(module)) && "object" == _typeof(module.exports) ? module.exports = t(require("jquery")) : t(jQuery)
}(function(t) {
    var o = function(t, o) {
        return t.css({
            "background-position": "center " + -o + "px"
        })
    }
      , e = function(t, o) {
        return t.css({
            "background-position": -o + "px center"
        })
    }
      , i = function(t, o) {
        return t.css({
            "-webkit-transform": "translateY(" + o + "px)",
            "-moz-transform": "translateY(" + o + "px)",
            transform: "translateY(" + o + "px)",
            transition: "transform linear",
            "will-change": "transform"
        })
    }
      , r = function(t, o) {
        return t.css({
            "-webkit-transform": "translateX(" + o + "px)",
            "-moz-transform": "translateX(" + o + "px)",
            transform: "translateX(" + o + "px)",
            transition: "transform linear",
            "will-change": "transform"
        })
    };
    t.fn.paroller = function(n) {
        var s = t(window).height()
          , a = t(document).height();
        n = t.extend({
            factor: 0,
            type: "background",
            direction: "vertical"
        }, n);
        return this.each(function() {
            var l = !1
              , c = t(this)
              , f = c.offset().top
              , u = c.outerHeight()
              , h = c.data("paroller-factor")
              , p = c.data("paroller-type")
              , d = c.data("paroller-direction")
              , m = h || n.factor
              , v = p || n.type
              , g = d || n.direction
              , b = Math.round(f * m)
              , w = Math.round((f - s / 2 + u) * m);
            "background" == v ? "vertical" == g ? o(c, b) : "horizontal" == g && e(c, b) : "foreground" == v && ("vertical" == g ? i(c, w) : "horizontal" == g && r(c, w));
            var y = function() {
                l = !1
            };
            t(window).on("scroll", function() {
                if (!l) {
                    var n = t(this).scrollTop();
                    a = t(document).height(),
                    b = Math.round((f - n) * m),
                    w = Math.round((f - s / 2 + u - n) * m),
                    "background" == v ? "vertical" == g ? o(c, b) : "horizontal" == g && e(c, b) : "foreground" == v && a >= n && ("vertical" == g ? i(c, w) : "horizontal" == g && r(c, w)),
                    window.requestAnimationFrame(y),
                    l = !0
                }
            }).trigger("scroll")
        })
    }
}),
function(t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : "undefined" != typeof module && module.exports ? module.exports = t(require("jquery")) : t(jQuery)
}(function(t) {
    function o(o) {
        return !o.nodeName || -1 !== t.inArray(o.nodeName.toLowerCase(), ["iframe", "#document", "html", "body"])
    }
    function e(o) {
        return t.isFunction(o) || t.isPlainObject(o) ? o : {
            top: o,
            left: o
        }
    }
    var i = t.scrollTo = function(o, e, i) {
        return t(window).scrollTo(o, e, i)
    }
    ;
    return i.defaults = {
        axis: "xy",
        duration: 0,
        limit: !0
    },
    t.fn.scrollTo = function(r, n, s) {
        "object" === (void 0 === n ? "undefined" : _typeof(n)) && (s = n,
        n = 0),
        "function" == typeof s && (s = {
            onAfter: s
        }),
        "max" === r && (r = 9e9),
        s = t.extend({}, i.defaults, s),
        n = n || s.duration;
        var a = s.queue && 1 < s.axis.length;
        return a && (n /= 2),
        s.offset = e(s.offset),
        s.over = e(s.over),
        this.each(function() {
            function l(o) {
                var e = t.extend({}, s, {
                    queue: !0,
                    duration: n,
                    complete: o && function() {
                        o.call(u, p, s)
                    }
                });
                h.animate(d, e)
            }
            if (null !== r) {
                var c, f = o(this), u = f ? this.contentWindow || window : this, h = t(u), p = r, d = {};
                switch (void 0 === p ? "undefined" : _typeof(p)) {
                case "number":
                case "string":
                    if (/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(p)) {
                        p = e(p);
                        break
                    }
                    p = f ? t(p) : t(p, u);
                case "object":
                    if (0 === p.length)
                        return;
                    (p.is || p.style) && (c = (p = t(p)).offset())
                }
                var m = t.isFunction(s.offset) && s.offset(u, p) || s.offset;
                t.each(s.axis.split(""), function(t, o) {
                    var e = "x" === o ? "Left" : "Top"
                      , r = e.toLowerCase()
                      , n = "scroll" + e
                      , v = h[n]()
                      , g = i.max(u, o);
                    c ? (d[n] = c[r] + (f ? 0 : v - h.offset()[r]),
                    s.margin && (d[n] -= parseInt(p.css("margin" + e), 10) || 0,
                    d[n] -= parseInt(p.css("border" + e + "Width"), 10) || 0),
                    d[n] += m[r] || 0,
                    s.over[r] && (d[n] += p["x" === o ? "width" : "height"]() * s.over[r])) : (e = p[r],
                    d[n] = e.slice && "%" === e.slice(-1) ? parseFloat(e) / 100 * g : e),
                    s.limit && /^\d+$/.test(d[n]) && (d[n] = 0 >= d[n] ? 0 : Math.min(d[n], g)),
                    !t && 1 < s.axis.length && (v === d[n] ? d = {} : a && (l(s.onAfterFirst),
                    d = {}))
                }),
                l(s.onAfter)
            }
        })
    }
    ,
    i.max = function(e, i) {
        var r = "scroll" + (n = "x" === i ? "Width" : "Height");
        if (!o(e))
            return e[r] - t(e)[n.toLowerCase()]();
        var n = "client" + n
          , s = (a = e.ownerDocument || e.document).documentElement
          , a = a.body;
        return Math.max(s[r], a[r]) - Math.min(s[n], a[n])
    }
    ,
    t.Tween.propHooks.scrollLeft = t.Tween.propHooks.scrollTop = {
        get: function(o) {
            return t(o.elem)[o.prop]()
        },
        set: function(o) {
            var e = this.get(o);
            if (o.options.interrupt && o._last && o._last !== e)
                return t(o.elem).stop();
            var i = Math.round(o.now);
            e !== i && (t(o.elem)[o.prop](i),
            o._last = this.get(o))
        }
    },
    i
});
var Hero = function t() {
    _classCallCheck(this, t),
    this.bindEvents = function() {}
    ,
    this.hero = $(".hero"),
    this.bindEvents()
}
  , Portfolio = function() {
    function t() {
        var o = this;
        _classCallCheck(this, t),
        this.bindEvents = function() {
            var t = o;
            o.showMore.click(o.showSubContent),
            o.portfolioInfoTrigger.click(o.toggleInfo)
        }
        ,
        this.toggleInfo = function(t) {
            t.preventDefault();
            var o = $(t.currentTarget);
            o.children().toggleClass("portfolio__item-cta__icon--is-open"),
            o.parents(".portfolio__item-preview").toggleClass("portfolio__item-preview--is-open").siblings().slideToggle("fast")
        }
        ,
        this.showSubContent = function() {
            o.portfolioSub.slideToggle(),
            o.isSubVisible ? o.showMore.text("Show more") : o.showMore.text("Show less"),
            o.isSubVisible = !o.isSubVisible
        }
        ,
        this.displayPortfolioItem = function(t) {
            o.iframe.attr("src", t),
            o.sectionMain.addClass("section-main--inactive"),
            o.hero.addClass("hero--inactive"),
            o.sectionPortfolioViewer.addClass("section-portfolio-viewer--active"),
            o.html.addClass("u-overflow-vertical-hidden");
            var e = setTimeout(function() {
                $.scrollTo(0, 500),
                clearTimeout(e)
            }, 500)
        }
        ,
        this.portfolioMain = $(".portfolio__content-main"),
        this.showMore = $(".portfolio__show-more"),
        this.portfolioSub = $(".portfolio__content-sub"),
        this.isSubVisible = !1,
        this.portfolioInfoTrigger = $(".portfolio__item-cta__link--info"),
        this.sectionMain = $(".section-main"),
        this.sectionPortfolioViewer = $(".section-portfolio-viewer"),
        this.hero = $(".hero"),
        this.html = $("html"),
        this.bindEvents()
    }
    return _createClass(t, [{
        key: "getPorfolioItem",
        value: function(t) {
            var o = t.parents(".portfolio__item-preview").attr("data-portfolio");
            return this.baseUrl + o
        }
    }, {
        key: "goBack",
        value: function() {
            this.sectionMain.removeClass("section-main--inactive"),
            this.hero.removeClass("hero--inactive"),
            this.sectionPortfolioViewer.removeClass("section-portfolio-viewer--active"),
            this.html.removeClass("u-overflow-vertical-hidden")
        }
    }]),
    t
}()
  , hero = new Hero
  , portfolio = new Portfolio;
//# sourceMappingURL=app-dist.js.map
