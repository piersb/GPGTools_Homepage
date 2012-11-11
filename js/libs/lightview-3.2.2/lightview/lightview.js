/*!
 * Lightview - The jQuery Lightbox - v3.2.2
 * (c) 2008-2012 Nick Stakenburg
 *
 * http://projects.nickstakenburg.com/lightview
 *
 * License: http://projects.nickstakenburg.com/lightview/license
 */
;var Lightview = {
  version: '3.2.2',

  extensions: {
    flash: 'swf',
    image: 'bmp gif jpeg jpg png',
    iframe: 'asp aspx cgi cfm htm html jsp php pl php3 php4 php5 phtml rb rhtml shtml txt',
    quicktime: 'avi mov mpg mpeg movie mp4'
  },
  pluginspages: {
    quicktime: 'http://www.apple.com/quicktime/download',
    flash: 'http://www.adobe.com/go/getflashplayer'
  }
};

Lightview.Skins = {
  // every possible property is defined on the base skin 
  // all other skins inherit from this skin
  'base': {
    ajax: {
      type: 'get'
    },
    background: {
      color: '#fff',
      opacity: 1
    },
    border: {
      size: 0,
      color: '#ccc',
      opacity: 1
    },
    continuous: false,
    controls: {
      close: 'relative',
      slider: {
        items: 5
      },
      text: {
        previous: "Prev", // when modifying this on skins images/css might have to be changed
        next:     "Next"
      },
      thumbnails: {
        spinner: { color: '#777' },
        mousewheel: true
      },
      type: 'relative'
    },
    effects: {
      caption: { show: 180, hide: 180 },
      content: { show: 280, hide: 280 },
      overlay: { show: 240, hide: 280 },
      sides:   { show: 150, hide: 180 },
      spinner: { show: 50,  hide: 100 },
      slider:  { slide: 180 },
      thumbnails: { show: 120, hide: 0, slide: 180, load: 340 },
      window:  { show: 120, hide: 50, resize: 200, position: 180 }
    },
    errors: {
      'missing_plugin': "The content your are attempting to view requires the <a href='#{pluginspage}' target='_blank'>#{type} plugin<\/a>."
    },
    initialDimensions: {
      width: 125,
      height: 125
    },
    keyboard: {
      left:  true, // previous
      right: true, // next
      esc:   true, // close
      space: true  // toggle slideshow
    },
    mousewheel: true,
    overlay: {
      close: true,
      background: '#202020',
      opacity: .85
    },
    padding: 10,
    position: {
      at: 'center',
      offset: { x: 0, y: 0 }
    },
    preload: true,
    radius: {
      size: 0,
      position: 'background'
    },
    shadow: {
      blur: 3,
      color: '#000',
      opacity: .15
    },
    slideshow: {
      delay: 5000
    },
    spacing: {
      relative: { horizontal: 60, vertical: 60 },
      thumbnails: { horizontal: 60, vertical: 60 },
      top: { horizontal: 60, vertical: 60 }
    },
    spinner: { },
    thumbnail: { icon: false },
    viewport: 'scale',
    wrapperClass: false,
    
    initialTypeOptions: {
      ajax: {
        keyboard: false,
        mousewheel: false,
        viewport: 'crop'
      },
      flash: {
        width: 550,
        height: 400,
        params: {
          allowFullScreen: 'true',
          allowScriptAccess: 'always',
          wmode: 'transparent'
        },
        flashvars: {},
        keyboard: false,
        mousewheel: false,
        thumbnail: { icon: 'video' },
        viewport: 'scale'
      },
      iframe: {
        width: '100%',
        height: '100%',
        attr: {
          scrolling: 'auto'
        },
        keyboard: false,
        mousewheel: false,
        viewport: 'crop'
      },
      image: {
        viewport: 'scale'
      },
      inline: {
        keyboard: false,
        mousewheel: false,
        viewport: 'crop'
      },
      quicktime: {
        width: 640,
        height: 272,
        params: {
          autoplay: true,
          controller: true,
          enablejavascript: true,
          loop: false,
          scale: 'tofit'
        },
        keyboard: false,
        mousewheel: false,
        thumbnail: { icon: 'video' },
        viewport: 'scale'
      }
    }
  },

  // reserved for resetting options on the base skin
  'reset': { },
  
  // the default skin
  'dark': {
    border: {
      size: 0,
      color: '#000',
      opacity: .25
    },
    radius: { size: 5 },
    background: '#141414',
    shadow: {
      blur: 5,
      opacity: .08
    },
    overlay: {
      background: '#2b2b2b',
      opacity: .85
    },
    spinner: {
      color: '#777'
    }
  },

  'light': {
    border: { opacity: .25 },
    radius: { size: 5 },
    spinner: {
      color: '#333'
    }
  },
  
  'mac': {
    background: '#fff',
    border: {
      size: 0,
      color: '#dfdfdf',
      opacity: .3
    },
    shadow: {
      blur: 3,
      opacity: .08
    },
    overlay: {
      background: '#2b2b2b',
      opacity: .85
    }
  }
};

(function (b, j) {
    function o(e) {
        var t = {}, n;
        for (n in e) t[n] = e[n] + "px";
        return t
    }
    function n(e) {
        return e * Math.PI / 180
    }
    function K(e) {
        return String.fromCharCode.apply(String, e.split(","))
    }
    function V(e) {
        var t = "<" + e.tag,
            n;
        for (n in e) 0 > b.inArray(n, ["children", "html", "tag"]) && (t += " " + n + '="' + e[n] + '"');
        return /^(?:area|base|basefont|br|col|frame|hr|img|input|link|isindex|meta|param|range|spacer|wbr)$/i.test(e.tag) ? t += "/>" : (t += ">", e.children && b.each(e.children, function (e, n) {
            t += V(n)
        }), e.html && (t += e.html), t += "</" + e.tag + ">"), t
    }
    function P(e, t) {
        for (var n in t) t[n] && t[n].constructor && t[n].constructor === Object ? (e[n] = s.clone(e[n]) || {}, P(e[n], t[n])) : e[n] = t[n];
        return e
    }
    function t(e, t) {
        return P(s.clone(e), t)
    }
    function F() {
        this.initialize.apply(this, arguments)
    }
    function W(e, t) {
        var n, r = (t || X(e) || "").toLowerCase();
        return b(["flash", "image", "iframe", "quicktime"]).each(function (e, t) {
            -1 < b.inArray(r, Lightview.extensions[t].split(" ")) && (n = t)
        }), n ? n : "#" == e.substr(0, 1) ? "inline" : document.domain && document.domain != e.replace(/(^.*\/\/)|(:.*)|(\/.*)/g, "") ? "iframe" : "image"
    }
    function X(e) {
        return (e = (e || "").replace(/\?.*/g, "").match(/\.([^.]{3,4})$/)) ? e[1] : null
    }
    var m, J, w, O;
    b(document.documentElement).bind("mousewheel DOMMouseScroll", function (e) {
        var t;
        e.originalEvent.wheelDelta ? t = e.originalEvent.wheelDelta / 120 : e.originalEvent.detail && (t = -e.originalEvent.detail / 3);
        if (t) {
            var n = b.Event("lightview:mousewheel");
            b(e.target).trigger(n, t), n.isPropagationStopped() && e.stopPropagation(), n.isDefaultPrevented() && e.preventDefault()
        }
    });
    var L = {}, x = {};
    b.extend(x, {
        Quart: function (e) {
            return Math.pow(e, 4)
        }
    }), b.each(x, function (e, t) {
        L["easeIn" + e] = t, L["easeOut" + e] = function (e) {
            return 1 - t(1 - e)
        }, L["easeInOut" + e] = function (e) {
            return .5 > e ? t(2 * e) / 2 : 1 - t(-2 * e + 2) / 2
        }
    }), b.each(L, function (e, t) {
        b.easing[e] || (b.easing[e] = t)
    });
    var Q = Array.prototype.slice,
        s = {
            clone: function (e) {
                return b.extend({}, e)
            },
            isElement: function (e) {
                return e && 1 == e.nodeType
            },
            element: {
                isAttached: function (e) {
                    for (; e && e.parentNode;) e = e.parentNode;
                    return !!e && !! e.body
                }
            }
        }, y = navigator.userAgent,
        x = function (e) {
            return (e = RegExp(e + "([\\d.]+)").exec(y)) ? parseFloat(e[1]) : !0
        };
    m = !! j.attachEvent && -1 === y.indexOf("Opera") && x("MSIE "), - 1 < y.indexOf("Opera") && j.opera && opera.version && parseFloat(opera.version()), J = -1 < y.indexOf("AppleWebKit/") && x("AppleWebKit/"), - 1 < y.indexOf("Gecko") && -1 === y.indexOf("KHTML") && x("rv:"), w = !! y.match(/Apple.*Mobile.*Safari/), O = -1 < y.indexOf("Chrome") && x("Chrome/");
    var Y, M = 0;
    Y = function (e) {
        e = e || "lv_identity_";
        for (M++; document.getElementById(e + M);) M++;
        return e + M
    };
    var Z = function (e) {
        for (var t = (e = e.match(da)) && e[1] && e[1].split(".") || [], n = 0, r = 0, i = t.length; r < i; r++) n += parseInt(t[r] * Math.pow(10, 6 - 2 * r));
        return e && e[3] ? n - 1 : n
    }, da = /^(\d+(\.?\d+){0,3})([A-Za-z_-]+[A-Za-z0-9]+)?/,
        $ = {
            scripts: {
                jQuery: {
                    required: "1.4.4",
                    available: j.jQuery && jQuery.fn.jquery
                },
                SWFObject: {
                    required: "2.2",
                    available: j.swfobject && swfobject.ua && "2.2"
                },
                Spinners: {
                    required: "3.0.0",
                    available: j.Spinners && (Spinners.version || Spinners.Version)
                }
            },
            check: function (e) {
                (!this.scripts[e].available || Z(this.scripts[e].available) < Z(this.scripts[e].required) && !this.scripts[e].notified) && (this.scripts[e].notified = !0, j.console) && console[console.warn ? "warn" : "log"]("Lightview requires " + e + " >= " + this.scripts[e].required)
            }
        };
    b(document).ready(function () {
        function e(e) {
            var n = !1;
            if (t) n = 0 <= b.map(Q.call(navigator.plugins), function (e) {
                return e.name
            }).join(",").indexOf(e);
            else try {
                n = new ActiveXObject(e)
            } catch (r) {}
            return !!n
        }
        var t = navigator.plugins && navigator.plugins.length;
        Lightview.plugins = t ? {
            flash: e("Shockwave Flash"),
            quicktime: e("QuickTime")
        } : {
            flash: e("ShockwaveFlash.ShockwaveFlash"),
            quicktime: e("QuickTime.QuickTime")
        }
    }), b.extend(!0, Lightview, function () {
        function t(e, t) {
            var i = e.charAt(0).toUpperCase() + e.substr(1),
                i = (e + " " + r.join(i + " ") + i).split(" "),
                s;
            e: {
                for (s in i) if (n.style[i[s]] !== void 0) {
                    s = t == "prefix" ? i[s] : !0;
                    break e
                }
                s = !1
            }
            return s
        }
        var n = document.createElement("div"),
            r = ["Webkit", "Moz", "O", "ms", "Khtml"],
            i = document.createElement("canvas"),
            i = !! i.getContext && !! i.getContext("2d"),
            s;
        try {
            s = !! document.createEvent("TouchEvent")
        } catch (o) {
            s = !1
        }
        var a = t("boxShadow"),
            f = t("borderRadius"),
            l = !1;
        return b.each(["WebKitTransitionEvent", "TransitionEvent", "OTransitionEvent"], function (e, t) {
            try {
                document.createEvent(t), l = !0
            } catch (n) {}
        }), {
            init: function () {
                $.check("jQuery");
                if (this.support.canvas || m) j.G_vmlCanvasManager && j.G_vmlCanvasManager.init_(document), u.init(), e.init(), e.center(), N.init()
            },
            support: {
                canvas: i,
                touch: s,
                css: {
                    boxShadow: a,
                    borderRadius: f,
                    transitions: l,
                    expressions: m && m < 7,
                    prefixed: function (e) {
                        return t(e, "prefix")
                    }
                }
            }
        }
    }());
    var G, v = Lightview.Skins.base,
        z = t(v, Lightview.Skins.reset);
    G = {
        create: function (n, r) {
            n = n || {}, n.skin = n.skin || (Lightview.Skins[e.defaultSkin] ? e.defaultSkin : "lightview");
            var i = n.skin ? s.clone(Lightview.Skins[n.skin] || Lightview.Skins[e.defaultSkin]) : {}, i = t(z, i);
            r && (i = P(i, i.initialTypeOptions[r]));
            var o = t(i, n);
            if (o.ajax) {
                if ("boolean" == b.type(o.ajax)) {
                    var u = z.ajax || {}, a = v.ajax;
                    o.ajax = {
                        cache: u.cache || a.cache,
                        type: u.type || a.type
                    }
                }
                o.ajax = t(a, o.ajax)
            }
            o.controls && (o.controls = "string" == b.type(o.controls) ? t(i.controls || z.controls || v.controls, {
                type: o.controls
            }) : t(v.controls, o.controls)), "string" == b.type(o.background) && (o.background = {
                color: o.background,
                opacity: 1
            }), o.effects || (o.effects = {}, b.each(v.effects, function (e, t) {
                b.each(o.effects[e] = b.extend({}, t), function (t) {
                    o.effects[e][t] = 0
                })
            })), w && (a = o.effects.overlay, a.show = 0, a.hide = 0), o.effects && !Lightview.support.canvas && m && 9 > m && (a = o.effects, 7 > m && b.extend(!0, a, {
                caption: {
                    show: 0,
                    hide: 0
                },
                window: {
                    show: 0,
                    hide: 0,
                    resize: 0
                },
                content: {
                    show: 0,
                    hide: 0
                },
                spinner: {
                    show: 0,
                    hide: 0
                },
                slider: {
                    slide: 0
                }
            }), b.extend(!0, a, {
                sides: {
                    show: 0,
                    hide: 0
                }
            })), o.border && (a = z.border || {}, u = v.border, a = "number" == b.type(o.border) ? {
                size: o.border,
                color: a.color || u.color,
                opacity: a.opacity || u.opacity
            } : "string" == b.type(o.border) ? {
                size: a.size || u.size,
                color: o.border,
                opacity: a.opacity || u.opacity
            } : t(u, o.border), o.border = 0 === a.size ? !1 : a), a = v.position, o.position || "number" == b.type(o.position) ? (u = z.position || {}, a = "string" == b.type(o.position) ? {
                at: o.position,
                offset: u.offset || a.offset
            } : "number" == b.type(o.position) ? {
                at: "top",
                offset: {
                    x: 0,
                    y: o.position
                }
            } : t(a, o.position), o.position = a) : o.position = s.clone(a);
            if (o.radius || "number" == b.type(o.radius)) a = z.radius || {}, u = v.radius, a = "number" == b.type(o.radius) ? {
                size: o.radius,
                position: a.position || u.position
            } : "string" == b.type(o.radius) ? {
                size: a.size || u.size,
                position: o.position
            } : t(u, o.radius), o.radius = a;
            return o.shadow && (a = z.shadow, u = v.shadow, a = "boolean" == b.type(o.shadow) ? a && "shadow" == b.type(a) ? u : a ? a : u : t(u, o.shadow || {}), 1 > a.blur && (a = !1), o.shadow = a), o.thumbnail && (a = z.thumbnail || {}, u = v.thumbnail, i = "string" == b.type(o.thumbnail) ? {
                image: o.thumbnail,
                icon: i.thumbnail && i.thumbnail.icon || a.icon || u.icon
            } : t(u, o.thumbnail), o.thumbnail = i), o.slideshow && "number" == b.type(o.slideshow) && (o.slideshow = {
                delay: o.slideshow
            }), o
        }
    };
    var C, aa = function (e) {
        return e.red = e[0], e.green = e[1], e.blue = e[2], e
    }, R = function (e) {
        var t = Array(3);
        0 == e.indexOf("#") && (e = e.substring(1)), e = e.toLowerCase();
        if ("" != e.replace(ea, "")) return null;
        3 == e.length ? (t[0] = e.charAt(0) + e.charAt(0), t[1] = e.charAt(1) + e.charAt(1), t[2] = e.charAt(2) + e.charAt(2)) : (t[0] = e.substring(0, 2), t[1] = e.substring(2, 4), t[2] = e.substring(4));
        for (e = 0; e < t.length; e++) t[e] = parseInt(t[e], 16);
        return aa(t)
    }, ea = RegExp("[0123456789abcdef]", "g");
    C = {
        hex2rgb: R,
        hex2fill: function (e, t) {
            "undefined" == b.type(t) && (t = 1);
            var n = t,
                r = R(e);
            return r[3] = n, r.opacity = n, "rgba(" + r.join() + ")"
        },
        getSaturatedBW: function (e) {
            var e = R(e),
                e = aa(e),
                t = e.red,
                n = e.green,
                r = e.blue,
                i, s = t > n ? t : n;
            r > s && (s = r);
            var o = t < n ? t : n;
            r < o && (o = r), i = s / 255, e = 0 != s ? (s - o) / s : 0;
            if (0 == e) t = 0;
            else {
                var u = (s - t) / (s - o),
                    a = (s - n) / (s - o),
                    r = (s - r) / (s - o),
                    t = (t == s ? r - a : n == s ? 2 + u - r : 4 + a - u) / 6;
                0 > t && (t += 1)
            }
            return t = Math.round(360 * t), e = Math.round(100 * e), i = Math.round(100 * i), n = [], n[0] = t, n[1] = e, n[2] = i, n.hue = t, n.saturation = e, n.brightness = i, "#" + (50 < n[2] ? "000" : "fff")
        }
    }, x = j.G_vmlCanvasManager && !Lightview.support.canvas && m ? function (e) {
        G_vmlCanvasManager.initElement(e)
    } : function () {};
    var D = {
        init: x,
        drawRoundedRectangle: function (e, t) {
            var r = b.extend(!0, {
                mergedCorner: !1,
                expand: !1,
                top: 0,
                left: 0,
                width: 0,
                height: 0,
                radius: 0
            }, t || {}),
                i = r.left,
                s = r.top,
                o = r.width,
                u = r.height,
                a = r.radius;
            r.expand && (r = 2 * a, i -= a, s -= a, o += r, u += r), a ? (e.beginPath(), e.moveTo(i + a, s), e.arc(i + o - a, s + a, a, n(-90), n(0), !1), e.arc(i + o - a, s + u - a, a, n(0), n(90), !1), e.arc(i + a, s + u - a, a, n(90), n(180), !1), e.arc(i + a, s + a, a, n(-180), n(-90), !1), e.closePath(), e.fill()) : e.fillRect(s, i, o, u)
        },
        createFillStyle: function (e, t, n) {
            var r;
            return "string" == b.type(t) ? r = C.hex2fill(t) : "string" == b.type(t.color) ? r = C.hex2fill(t.color, "number" == b.type(t.opacity) ? t.opacity.toFixed(5) : 1) : b.isArray(t.color) && (n = b.extend({
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 0
            }, n || {}), r = D.Gradient.addColorStops(e.createLinearGradient(n.x1, n.y1, n.x2, n.y2), t.color, t.opacity)), r
        },
        dPA: function (e, t, n) {
            var n = b.extend({
                x: 0,
                y: 0,
                dimensions: !1,
                color: "#000",
                background: {
                    color: "#fff",
                    opacity: .7,
                    radius: 4
                }
            }, n || {}),
                r = n.background;
            if (r && r.color) {
                var i = n.dimensions;
                e.fillStyle = C.hex2fill(r.color, r.opacity), D.drawRoundedRectangle(e, {
                    width: i.width,
                    height: i.height,
                    top: n.y,
                    left: n.x,
                    radius: r.radius || 0
                })
            }
            r = 0;
            for (i = t.length; r < i; r++) for (var s = 0, o = t[r].length; s < o; s++) {
                var u = parseInt(t[r].charAt(s)) * (1 / 9) || 0;
                e.fillStyle = C.hex2fill(n.color, u - .05), u && e.fillRect(n.x + s, n.y + r, 1, 1)
            }
        },
        Gradient: {
            addColorStops: function (e, t, n) {
                for (var n = "number" == b.type(n) ? n : 1, r = 0, i = t.length; r < i; r++) {
                    var s = t[r];
                    if ("undefined" == b.type(s.opacity) || "number" != b.type(s.opacity)) s.opacity = 1;
                    e.addColorStop(s.position, C.hex2fill(s.color, s.opacity * n))
                }
                return e
            }
        }
    }, A = {
        _adjust: function (t) {
            var n = e.options;
            if (!n) return t;
            if (n.controls) switch (n.controls.type) {
                case "top":
                    t.height -= i.Top.element.innerHeight();
                    break;
                case "thumbnails":
                    e.views && 1 >= e.views.length || (t.height -= i.Thumbnails.element.innerHeight())
            }
            if (n = n.position && n.position.offset) if (n.x && (t.width -= n.x), n.y) t.height -= n.y;
            return t
        },
        viewport: function () {
            var e = {
                height: b(j).height(),
                width: b(j).width()
            };
            if (w) {
                var t = j.innerHeight;
                e.width = j.innerWidth, e.height = t
            }
            return A._adjust(e)
        },
        document: function () {
            var e = {
                height: b(document).height(),
                width: b(document).width()
            };
            return e.height -= b(j).scrollTop(), e.width -= b(j).scrollLeft(), A._adjust(e)
        },
        inside: function (t) {
            var n = this.viewport(),
                r = e.spacing,
                i = r.vertical,
                s = t.options,
                o = s.padding || 0,
                u = s.border.size || 0;
            return Math.max(r.horizontal || 0, s.shadow && s.shadow.size || 0), Math.max(i || 0, s.shadow && s.shadow.size || 0), r = 2 * u - 2 * o, {
                height: t.options.viewport ? n.height - r.y : Infinity,
                width: n.width - r.x
            }
        }
    }, u, fa = function () {
        var e = {};
        return b.each(["width", "height"], function (t, n) {
            var r = n.substr(0, 1).toUpperCase() + n.substr(1),
                i = document.documentElement;
            e[n] = (m ? Math.max(i["offset" + r], i["scroll" + r]) : J ? document.body["scroll" + r] : i["scroll" + r]) || 0
        }), e
    }, S = m && 7 > m;
    u = {
        init: function () {
            this.options = {
                background: "#000",
                opacity: .7
            }, this.build(), S && b(j).bind("resize", b.proxy(function () {
                u.element && u.element.is(":visible") && u.max()
            }, this)), this.draw()
        },
        build: function () {
            this.element = b(document.createElement("div")).addClass("lv_overlay"), S && this.element.css({
                position: "absolute"
            }), b(document.body).prepend(this.element);
            if (S) {
                var t = this.element[0].style;
                t.setExpression("top", "((!!window.jQuery ? jQuery(window).scrollTop() : 0) + 'px')"), t.setExpression("left", "((!!window.jQuery ? jQuery(window).scrollLeft() : 0) + 'px')")
            }
            this.element.hide().bind("click", b.proxy(function () {
                (!e.options || !e.options.overlay || e.options.overlay.close) && e.hide()
            }, this)).bind("lightview:mousewheel", b.proxy(function (t) {
                if (!e.options || e.options.mousewheel || "thumbnails" == i.type && e.options && e.options.controls && e.options.controls.thumbnails && e.options.controls.thumbnails.mousewheel || e.options && e.options.viewport) t.preventDefault(), t.stopPropagation()
            }, this))
        },
        show: function (e) {
            return this.max(), this.element.stop(!0), this.setOpacity(this.options.opacity, this.options.durations.show, e), this
        },
        hide: function (e) {
            return this.element.stop(!0).fadeOut(this.options.durations.hide || 0, e), this
        },
        setOpacity: function (e, t, n) {
            this.element.fadeTo(t || 0, e, n)
        },
        setOptions: function (e) {
            this.options = e, this.draw()
        },
        draw: function () {
            this.element.css({
                "background-color": this.options.background
            }), this.max()
        },
        max: function () {
            w && J && 533.18 > J && this.element.css(o(fa())), m && this.element.css(o({
                height: b(j).height(),
                width: b(j).width()
            }))
        }
    };
    var H = function (t) {
        var n = b("<div>").addClass("lv_content_wrapper");
        e.options.wrapperClass && n.addClass(e.options.wrapperClass), e.options.skin && b(n).addClass("lv_content_" + e.options.skin), e.content.prepend(n), n.html(t)
    }, e = {
        defaultSkin: "dark",
        init: function (e) {
            this.setOptions(e || {}), this._dimensions = {
                content: {
                    width: 150,
                    height: 150
                }
            }, this._dimensions.window = this.getLayout(this._dimensions.content).window.dimensions, e = this.queues = [], e.showhide = b({}), e.update = b({}), this.build()
        },
        setOptions: function (e, t) {
            this.options = G.create(e || {}), e = b.extend({
                vars: !0
            }, t || {}), e.vars && this.setVars()
        },
        setVars: function (e) {
            e = e || this.options, this.spacing = e.spacing[e.controls.type], this.padding = e.padding
        },
        setSkin: function (e, t, n) {
            return t = t || {}, e && (t.skin = e), n = b.extend({
                vars: !1
            }, n || {}), this.setOptions(t, {
                vars: n.vars
            }), u.setOptions(b.extend(!0, {
                durations: this.options.effects.overlay
            }, this.options.overlay)), this.element[0].className = "lv_window lv_window_" + e, i.Top.setSkin(e), i.Thumbnails.setSkin(e), this.draw(), this
        },
        setDefaultSkin: function (e) {
            Lightview.Skins[e] && (this.defaultSkin = e)
        },
        build: function () {
            var e = {
                height: 1e3,
                width: 1e3
            };
            this.element = b(document.createElement("div")).addClass("lv_window"), 
            this.element.append(this.skin = b("<div>").addClass("lv_skin")), 
            this.skin.append(
            	this.shadow = b("<div>").addClass("lv_shadow").append(
            		this.canvasShadow = b("<canvas>").attr(e)
            	)
            ), 
            this.skin.append(
            	this.bubble = b("<div>").addClass("lv_bubble").append(
            		this.canvasBubble = b("<canvas>").attr(e)
            	)
            ), 
            this.skin.append(
            	this.sideButtonsUnderneath = b("<div>").addClass("lv_side_buttons_underneath").append(
            		b("<div>").addClass("lv_side lv_side_left").data("side", "previous").append(
            			b("<div>").addClass("lv_side_button lv_side_button_previous").data("side", "previous")
            		).hide()
            	).append(
            		b("<div>").addClass("lv_side lv_side_right").data("side", "next").append(
            			b("<div>").addClass("lv_side_button lv_side_button_next").data("side", "next")
            		).hide()
            	).hide()
            ), 
            this.element.append(
            	this.content = b("<div>").addClass("lv_content").append(
            		this.titleCaption = b("<div>").addClass("lv_title_caption").hide().append(
            			this.titleCaptionSlide = b("<div>").addClass("lv_title_caption_slide").append(
            				this.title = b("<div>").addClass("lv_title")
            			).append(
            				this.caption = b("<div>").addClass("lv_caption")
            			)
            		)
            	)
            ),
            this.element.append(
            	this.innerPreviousNextOverlays = b("<div>").addClass("lv_inner_previous_next_overlays").append(
            		b("<div>").addClass("lv_button lv_button_inner_previous_overlay").data("side", "previous")
            	).append(
            		b("<div>").addClass("lv_button lv_button_inner_next_overlay").data("side", "next").hide()
            	)
            ), 
            this.element.append(
            	this.buttonTopClose = b("<div>").addClass("lv_button_top_close close_lightview").hide()
            ), 
            i.Relative.create(), 
            i.Top.create(), 
            i.Thumbnails.create(), 
            this.skin.append(
            	this.spinnerWrapper = b("<div>").addClass("lv_spinner_wrapper").hide()
            ), 
            b(document.body).prepend(this.element), 
            D.init(this.canvasShadow[0]), 
            D.init(this.canvasBubble[0]), 
            this.ctxShadow = this.canvasShadow[0].getContext("2d"), 
            this.ctxBubble = this.canvasBubble[0].getContext("2d"), 
            this.applyFixes(), 
            this.element.hide(), 
            this.startObserving()
        },
        applyFixes: function () {
            var e = b(document.documentElement);
            b(document.body), m && 7 > m && "none" == e.css("background-image") && e.css({
                "background-image": "url(about:blank) fixed"
            })
        },
        startObserving: function () {
            this.stopObserving(), this.element.delegate(".lv_inner_previous_next_overlays .lv_button, .lv_side_buttons_underneath .lv_side_button, .lv_side_buttons_underneath .lv_side", "mouseover touchmove", b.proxy(function (e) {
                e = b(e.target).data("side"), this.sideButtonsUnderneath.find(".lv_side_button_" + e).first().addClass("lv_side_button_out")
            }, this)).delegate(".lv_inner_previous_next_overlays .lv_button, .lv_side_buttons_underneath .lv_side_button, .lv_side_buttons_underneath .lv_side", "mouseout", b.proxy(function (e) {
                e = b(e.target).data("side"), this.sideButtonsUnderneath.find(".lv_side_button_" + e).first().removeClass("lv_side_button_out")
            }, this)).delegate(".lv_inner_previous_next_overlays .lv_button, .lv_side_buttons_underneath .lv_side_button, .lv_side_buttons_underneath .lv_side", "click", b.proxy(function (e) {
                e.preventDefault(), e.stopPropagation(), this[b(e.target).data("side")]()
            }, this)).bind("lightview:mousewheel", b.proxy(function (e) {
                b(e.target).closest(".lv_content")[0] || this.options && !this.options.viewport || (e.preventDefault(), e.stopPropagation())
            }, this)).delegate(".close_lightview", "click", b.proxy(function () {
                this.hide()
            }, this)).bind("click", b.proxy(function (e) {
                (!this.options || !this.options.overlay || this.options.overlay.close) && b(e.target).is(".lv_window, .lv_skin, .lv_shadow") && this.hide()
            }, this)).bind("click", b.proxy(function (e) {
                var t = K("95,109"),
                    n = K("108,111,99,97,116,105,111,110"),
                    r = K("104,114,101,102");
                this[t] && e.target == this[t] && (j[n][r] = K("104,116,116,112,58,47,47,112,114,111,106,101,99,116,115,46,110,105,99,107,115,116,97,107,101,110,98,117,114,103,46,99,111,109,47,108,105,103,104,116,118,105,101,119"))
            }, this)), this.innerPreviousNextOverlays./* add(this.titleCaption). */bind("lightview:mousewheel", b.proxy(function (e, t) {
                this.options && this.options.mousewheel && (e.preventDefault(), e.stopPropagation(), this[-1 == t ? "next" : "previous"]())
            }, this)), w && document.documentElement.addEventListener("gesturechange", b.proxy(function (e) {
                this._pinchZoomed = 1 < e.scale
            }, this)), b(j).bind("scroll", b.proxy(function () {
                if (this.element.is(":visible") && !this._pinchZoomed) {
                    var e = b(j).scrollTop(),
                        t = b(j).scrollLeft();
                    this.Timeouts.clear("scrolling"), this.Timeouts.set("scrolling", b.proxy(function () {
                        b(j).scrollTop() != e || b(j).scrollLeft() != t || this.options.viewport && this.element.is(":visible") && this.center()
                    }, this), 200)
                }
            }, this)).bind(w ? "orientationchange" : "resize", b.proxy(function () {
                this.element.is(":visible") && (b(j).scrollTop(), b(j).scrollLeft(), this.Timeouts.clear("resizing"), this.Timeouts.set("resizing", b.proxy(function () {
                    this.element.is(":visible") && (this.center(), "thumbnails" == i.type && i.Thumbnails.refresh(), u.element.is(":visible") && u.max())
                }, this), 1))
            }, this)), this.spinnerWrapper.bind("click", b.proxy(this.hide, this))
        },
        stopObserving: function () {
            this.element.undelegate(".lv_inner_previous_next_overlays .lv_button, .lv_side_buttons_underneath .lv_side_button").undelegate(".lv_close")
        },
        draw: function () {
            var e = this.layout = this.getLayout(this._dimensions.content),
                t = e.bubble,
                n = t.outer,
                r = t.inner,
                i = t.border;
            this.element.is(":visible"), Lightview.support.canvas || this.skin.css({
                width: "100%",
                height: "100%"
            });
            var s = this.ctxBubble;
            s.clearRect(0, 0, this.canvasBubble[0].width, this.canvasBubble[0].height), this.bubble.css(o(t.position)), this.element.css(o(this._dimensions.window)), this.skin.css(o(e.skin.dimensions)), this.bubble.css(o(n.dimensions)), this.canvasBubble.attr(n.dimensions), this.innerPreviousNextOverlays.css(o(n.dimensions)), this.innerPreviousNextOverlays.css(o(t.position)), this.sideButtonsUnderneath.css("width", n.dimensions.width + "px").css("margin-left", - 0.5 * n.dimensions.width + "px");
            var u = e.content,
                t = u.dimensions,
                u = u.position;
            this.content.css(o(t)).css(o(u)), this.titleCaption.add(this.title).add(this.caption).css({
                width: t.width + "px"
            }), t = e.titleCaption.position, 0 < t.left && 0 < t.top && this.titleCaption.css(o(t)), s.fillStyle = D.createFillStyle(s, this.options.background, {
                x1: 0,
                y1: this.options.border,
                x2: 0,
                y2: this.options.border + r.dimensions.height
            }), this._drawBackgroundPath(), (this.options.fixNonDiscreteGPUCanvasBug && this.options.fixNonDiscreteGPUCanvasBug(this.content)) || s.fill(), i && (s.fillStyle = D.createFillStyle(s, this.options.border, {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: n.dimensions.height
            }), this._drawBackgroundPath(), this._drawBorderPath(), s.fill()), this._drawShadow(), this.options.shadow && this.shadow.css(o(e.shadow.position)), !Lightview.support.canvas && m && 9 > m && (b(this.bubble[0].firstChild).addClass("lv_blank_background"), b(this.shadow[0].firstChild).addClass("lv_blank_background"))
        },
        refresh: function () {
            var t = this.element,
                n = this.content,
                r = this.content.find(".lv_content_wrapper").first()[0];
            if (r && this.view) {
                b(r).css({
                    width: "auto",
                    height: "auto"
                }), n.css({
                    width: "auto",
                    height: "auto"
                });
                var n = parseInt(t.css("top")),
                    i = parseInt(t.css("left")),
                    s = parseInt(t.css("width"));
                t.css({
                    left: "-25000px",
                    top: "-25000px",
                    width: "15000px",
                    height: "auto"
                });
                var u = this.updateQueue.getMeasureElementDimensions(r);
                e.States.get("resized") || (u = this.updateQueue.getFittedDimensions(r, u, this.view)), this._dimensions.content = u, this._dimensions.window = this.getLayout(u).window.dimensions, t.css(o({
                    left: i,
                    top: n,
                    width: s
                })), this.draw(), this.options.viewport && this.place(this.getLayout(u).window.dimensions, 0)
            }
        },
        resizeTo: function (e, t, n) {
            var r = b.extend({
                duration: this.options.effects.window.resize,
                complete: function () {}
            }, n || {}),
                n = 2 * (this.options.radius && this.options.radius.size || 0),
                e = Math.max(n, e),
                t = Math.max(n, t),
                i = s.clone(this._dimensions.content),
                o = e - i.width,
                u = t - i.height,
                a = s.clone(this._dimensions.window),
                e = this.getLayout({
                    width: e,
                    height: t
                }).window.dimensions,
                f = e.width - a.width,
                l = e.height - a.height,
                c = this;
            fromSpacingX = this.States.get("controls_from_spacing_x"), toSpacingX = this.spacing.horizontal, sxDiff = toSpacingX - fromSpacingX, fromSpacingY = this.States.get("controls_from_spacing_y"), toSpacingY = this.spacing.vertical, syDiff = toSpacingY - fromSpacingY, fromPadding = this.States.get("controls_from_padding"), toPadding = this.padding, pDiff = toPadding - fromPadding, this.element.attr({
                "data-lightview-resize-count": 0
            });
            var h = this.view && this.view.url;
            return this.skin.stop(!0).animate({
                "data-lightview-resize-count": 1
            }, {
                duration: r.duration,
                step: function (e, t) {
                    c._dimensions.content = {
                        width: Math.ceil(t.pos * o + i.width),
                        height: Math.ceil(t.pos * u + i.height)
                    }, c._dimensions.window = {
                        width: Math.ceil(t.pos * f + a.width),
                        height: Math.ceil(t.pos * l + a.height)
                    }, c.spacing.horizontal = Math.ceil(t.pos * sxDiff + fromSpacingX), c.spacing.vertical = Math.ceil(t.pos * syDiff + fromSpacingY), c.padding = Math.ceil(t.pos * pDiff + fromPadding), c.place(c._dimensions.window, 0), c.draw()
                },
                easing: "easeInOutQuart",
                queue: !1,
                complete: b.proxy(function () {
                    this.element.removeAttr("data-lightview-resize-count"), this.view && this.view.url == h && r.complete && (this.skin.removeAttr("lvresizecount", 0), r.complete())
                }, this)
            }), this
        },
        getPlacement: function (t) {
            var n = b(j).scrollTop(),
                r = b(j).scrollLeft();
            switch (e.options && e.options.controls && e.options.controls.type) {
                case "top":
                    n += i.Top.element.innerHeight()
            }
            var s = A.viewport(),
                o = {
                    top: n,
                    left: r
                };
            o.left += Math.floor(.5 * s.width - .5 * t.width), "center" == this.options.position.at && (o.top += Math.floor(.5 * s.height - .5 * t.height)), o.left < r && (o.left = r), o.top < n && (o.top = n);
            if (t = this.options.position.offset) o.top += t.y, o.left += t.x;
            return o
        },
        place: function (e, t, n) {
            e = this.getPlacement(e), this.bubble.attr("data-lv-fx-placement", 0);
            var r = parseInt(this.element.css("top")) || 0,
                i = parseInt(this.element.css("left")) || 0,
                s = e.top - r,
                o = e.left - i;
            this.bubble.stop(!0).animate({
                "data-lv-fx-placement": 1
            }, {
                step: b.proxy(function (e, t) {
                    this.element.css({
                        top: Math.ceil(t.pos * s + r) + "px",
                        left: Math.ceil(t.pos * o + i) + "px"
                    })
                }, this),
                easing: "easeInOutQuart",
                duration: "number" == b.type(t) ? t : this.options.effects.window.position || 0,
                complete: n
            })
        },
        center: function (e, t) {
            this.place(this._dimensions.window, e, t)
        },
        load: function (e, t, n) {
            var r = this.options && this.options.onHide;
            this.views = e, e = b.extend({
                initialDimensionsOnly: !1
            }, n || {}), this._reset({
                before: this.States.get("visible") && r
            }), e.initialDimensionsOnly && !this.States.get("visible") ? this.setInitialDimensions(t) : this.setPosition(t)
        },
        setPosition: function (e, t) {
            if (e && this.position != e) {
                this.Timeouts.clear("_m"), this._m && (b(this._m).stop().remove(), this._m = null);
                var n = this.position,
                    r = this.options,
                    r = r && r.controls && r.controls.type,
                    i = this.spacing && this.spacing.horizontal || 0,
                    s = this.spacing && this.spacing.vertical || 0,
                    o = this.padding || 0;
                this.position = e, this.view = this.views[e - 1], this.setSkin(this.view.options && this.view.options.skin, this.view.options), this.setVars(this.view.options), this.States.set("controls_from_spacing_x", i), this.States.set("controls_from_spacing_y", s), this.States.set("controls_from_padding", o), r != this.options.controls.type ? this.States.set("controls_type_changed", !0) : this.States.set("controls_type_changed", !1), n || this.options && "function" == b.type(this.options.onShow) && this.queues.showhide.queue(b.proxy(function (e) {
                    this.options.onShow.call(Lightview), e()
                }, this)), this.update(t)
            }
        },
        setInitialDimensions: function (e) {
            if (e = this.views[e - 1]) e = G.create(e.options || {}), u.setOptions(b.extend(!0, {
                durations: e.effects.overlay
            }, e.overlay)), this.setSkin(e.skin, e, {
                vars: !0
            }), e = e.initialDimensions, this.resizeTo(e.width, e.height, {
                duration: 0
            })
        },
        getSurroundingIndexes: function () {
            if (!this.views) return {};
            var e = this.position,
                t = this.views.length;
            return {
                previous: 1 >= e ? t : e - 1,
                next: e >= t ? 1 : e + 1
            }
        },
        preloadSurroundingImages: function () {
            if (!(1 >= this.views.length)) {
                var e = this.getSurroundingIndexes(),
                    t = e.previous,
                    e = e.next,
                    n = {
                        previous: t != this.position && this.views[t - 1],
                        next: e != this.position && this.views[e - 1]
                    };
                1 == this.position && (n.previous = null), this.position == this.views.length && (n.next = null), b.each(n, function (e, t) {
                    t && t.type == "image" && t.options.preload && q.preload(n[e].url, {
                        once: !0
                    })
                })
            }
        },
        play: function (t) {
            function n() {
                e.setPosition(e.getSurroundingIndexes().next, function () {
                    !e.view || !e.options || !e.options.slideshow || !e.States.get("playing") ? e.stop() : e.Timeouts.set("slideshow", n, e.options.slideshow.delay)
                })
            }
            this.States.set("playing", !0), t ? n() : e.Timeouts.set("slideshow", n, this.options.slideshow.delay), i.play()
        },
        stop: function () {
            e.Timeouts.clear("slideshow"), this.States.set("playing", !1), i.stop()
        },
        mayPrevious: function () {
            return this.options.continuous && this.views && 1 < this.views.length || 1 != this.position
        },
        previous: function (e) {
            this.stop(), (e || this.mayPrevious()) && this.setPosition(this.getSurroundingIndexes().previous)
        },
        mayNext: function () {
            return this.options.continuous && this.views && 1 < this.views.length || this.views && 1 < this.views.length && 1 != this.getSurroundingIndexes().next
        },
        next: function (e) {
            this.stop(), (e || this.mayNext()) && this.setPosition(this.getSurroundingIndexes().next)
        },
        refreshPreviousNext: function () {
            this.innerPreviousNextOverlays.hide().find(".lv_button").hide();
            if (this.view && 1 < this.views.length && "top" != i.type) {
                var e = this.mayPrevious(),
                    t = this.mayNext();
                (e || t) && this.sideButtonsUnderneath.show(), "image" == this.view.type && (this.innerPreviousNextOverlays.show(), this.element.find(".lv_button_inner_previous_overlay").fadeTo(0, e ? 1 : 0, e ? null : function () {
                    b(this).hide()
                }), this.element.find(".lv_button_inner_next_overlay").fadeTo(0, t ? 1 : 0, t ? null : function () {
                    b(this).hide()
                }));
                var n = this.element.find(".lv_side_left"),
                    r = this.element.find(".lv_side_right");
                n.stop(0, 1).fadeTo(e && 0 < parseInt(n.css("opacity")) ? 0 : this.options.effects.sides[e ? "show" : "hide"], e ? 1 : 0, e ? function () {
                    b(this).css({
                        opacity: "inherit"
                    })
                } : function () {
                    b(this).hide()
                }), r.stop(0, 1).fadeTo(t && 0 < parseInt(r.css("opacity")) ? 0 : this.options.effects.sides[t ? "show" : "hide"], t ? 1 : 0, t ? function () {
                    b(this).css({
                        opacity: "inherit"
                    })
                } : function () {
                    b(this).hide()
                })
            } else this.element.find(".lv_side_left, .lv_button_inner_previous_overlay, .lv_side_right, .lv_button_inner_next_overlay").hide()
        },
        hideOverlapping: function () {
            if (!this.States.get("overlapping")) {
                var e = [];
                b("embed, object, select").each(function (t, n) {
                    var r;
                    b(n).is("object, embed") && (r = b(n).find('param[name="wmode"]')[0]) && r.value && "transparent" == r.value.toLowerCase() || b(n).is("[wmode='transparent']") || e.push({
                        element: n,
                        visibility: b(n).css("visibility")
                    })
                }), b.each(e, function (e, t) {
                    b(t.element).css({
                        visibility: "hidden"
                    })
                }), this.States.set("overlapping", e)
            }
        },
        restoreOverlapping: function () {
            var e = this.States.get("overlapping");
            e && 0 < e.length && b.each(e, function (e, t) {
                b(t.element).css({
                    visibility: t.visibility
                })
            }), this.States.set("overlapping", null)
        },
        restoreOverlappingWithinContent: function () {
            var e = this.States.get("overlapping");
            e && b.each(e, b.proxy(function (e, t) {
                var n;
                (n = b(t.element).closest(".lv_content")[0]) && n == this.content[0] && b(t.element).css({
                    visibility: t.visibility
                })
            }, this))
        },
        show: function (e) {
            var t = this.queues.showhide;
            t.queue([]), this.hideOverlapping(), this.options.overlay && t.queue(function (e) {
                u.show(function () {
                    e()
                })
            }), t.queue(b.proxy(function (e) {
                this._show(function () {
                    e()
                })
            }, this)), "function" == b.type(e) && t.queue(b.proxy(function (t) {
                e(), t()
            }), this)
        },
        _show: function (t) {
            return Lightview.support.canvas ? (this.element.stop(!0), this.setOpacity(1, this.options.effects.window.show, b.proxy(function () {
                i.Top.middle.show(), "top" == i.type && e.options.controls && "top" == e.options.controls.close && i.Top.close_button.show(), this.States.set("visible", !0), t && t()
            }, this))) : (i.Top.middle.show(), "top" == i.type && e.options.controls && "top" == e.options.controls.close && i.Top.close_button.show(), this.element.show(0, t), this.States.set("visible", !0)), this
        },
        hide: function () {
            var e = this.queues.showhide;
            e.queue([]), e.queue(b.proxy(function (e) {
                this._hide(b.proxy(function () {
                    e()
                }, this))
            }, this)).queue(b.proxy(function (e) {
                this._reset({
                    before: this.options && this.options.onHide,
                    after: b.proxy(function () {
                        u.hide(b.proxy(function () {
                            this.restoreOverlapping(), e()
                        }, this))
                    }, this)
                })
            }, this))
        },
        _hide: function (e) {
            return this.stopQueues(), Lightview.support.canvas ? this.element.stop(!0, !0).fadeOut(this.options.effects.window.hide || 0, b.proxy(function () {
                this.States.set("visible", !1), e && e()
            }, this)) : (this.States.set("visible", !1), this.element.hide(0, e)), this
        },
        _reset: function (t) {
            t = b.extend({
                after: !1,
                before: !1
            }, t || {}), "function" == b.type(t.before) && t.before.call(Lightview), this.stopQueues(), this.Timeouts.clear(), this.stop(), i.hide(), i._reset(), this.titleCaption.hide(), this.innerPreviousNextOverlays.hide().find(".lv_button").hide(), this.cleanContent(), this.position = null, i.Thumbnails.position = -1, N.disable(), this._pinchZoomed = !1, e.States.set("_m", !1), this._m && (b(this._m).stop().remove(), this._m = null), "function" == b.type(t.after) && t.after.call(Lightview)
        },
        setOpacity: function (e, t, n) {
            this.element.stop(!0, !0).fadeTo(t || 0, e || 1, n)
        },
        createSpinner: function () {
            if (this.options.spinner && j.Spinners) {
                this.spinner && (this.spinner.remove(), this.spinner = null), this.spinner = Spinners.create(this.spinnerWrapper[0], this.options.spinner || {}).play();
                var e = Spinners.getDimensions(this.spinnerWrapper[0]);
                this.spinnerWrapper.css({
                    height: e.height + "px",
                    width: e.width + "px",
                    "margin-left": Math.ceil(-0.5 * e.width) + "px",
                    "margin-top": Math.ceil(-0.5 * e.height) + "px"
                })
            }
        },
        restoreInlineContent: function () {
            var e;
            this.inlineContent && this.inlineMarker && ((e = b(this.inlineContent).data("lv_restore_inline_display")) && b(this.inlineContent).css({
                display: e
            }), b(this.inlineMarker).before(this.inlineContent).remove(), this.inlineContent = this.inlineMarker = null)
        },
        cleanContent: function () {
            var t = this.content.find(".lv_content_wrapper")[0],
                t = b(t || this.content).children().first()[0],
                n = this.inlineMarker && this.inlineContent;
            this.restoreInlineContent();
            if (t) switch (t.tagName.toLowerCase()) {
                case "object":
                    try {
                        t.Stop()
                    } catch (r) {}
                    try {
                        t.innerHTML = ""
                    } catch (i) {}
                    t.parentNode ? b(t).remove() : t = function () {};
                    break;
                default:
                    n || b(t).remove()
            }
            e.Timeouts.clear("preloading_images");
            if (t = e.States.get("preloading_images")) b.each(t, function (e, t) {
                t.onload = function () {}
            }), e.States.set("preloading_images", !1);
            this.content.html("")
            this.content.append(this.titleCaption)
        },
        stopQueues: function () {
            this.queues.update.queue([]), this.content.stop(!0), this.skin.stop(!0), this.bubble.stop(!0), this.spinnerWrapper.stop(!0)
        },
        setTitleCaption: function (e) {
            this.titleCaption.removeClass("lv_has_caption lv_has_title").css({
                width: (e ? e : this._dimensions.content.width) + "px"
            }), this.title[this.view.title ? "show" : "hide"]().html(""), this.caption[this.view.caption ? "show" : "hide"]().html(""), this.view.title && (this.title.html(this.view.title), this.titleCaption.addClass("lv_has_title")), this.view.caption && (this.caption.html(this.view.caption), this.titleCaption.addClass("lv_has_caption"))
        },
        update: function (e) {
            var t = this.queues.update,
                n = {
                    width: this.options.width,
                    height: this.options.height
                };
            this.stopQueues(), this.titleCaption.stop(!0), this.element.find(".lv_side_left, .lv_button_inner_previous_overlay, .lv_side_right, .lv_button_inner_next_overlay").stop(!0), this.States.set("resized", !1), this.States.get("controls_type_changed") && t.queue(b.proxy(function (e) {
                i.hide(), e()
            }, this)), this.titleCaption.is(":visible") && t.queue(b.proxy(function (e) {
                this.titleCaption.fadeOut(this.options.effects.caption.hide, e)
            }, this)), this.spinner && this.spinnerWrapper.is(":visible") && t.queue(b.proxy(function (e) {
                this.spinnerWrapper.fadeOut(this.options.effects.spinner.hide, b.proxy(function () {
                    this.spinner && this.spinner.remove(), e()
                }, this))
            }, this)), t.queue(b.proxy(function (e) {
                this.content.animate({
                    opacity: 0
                }, {
                    complete: b.proxy(function () {
                        this.cleanContent(), this.content.hide(), e()
                    }, this),
                    queue: !1,
                    duration: this.options.effects.content.hide
                })
            }, this)), 0 < this.options.effects.window.resize && t.queue(b.proxy(function (e) {
                this.createSpinner(), this.spinnerWrapper.fadeTo(this.options.effects.spinner.show, 1, function () {
                    b(this).css({
                        opacity: "inherit"
                    }), e()
                })
            }, this)), t.queue(b.proxy(function (e) {
                var t = 0,
                    r = 0;
                "string" == b.type(n.width) && -1 < n.width.indexOf("%") && (t = parseFloat(n.width) / 100), "string" == b.type(n.height) && -1 < n.height.indexOf("%") && (r = parseFloat(n.height) / 100);
                if (t || r) {
                    var i;
                    i = A[this.options.viewport ? "viewport" : "document"](), t && (n.width = Math.floor(i.width * t)), r && (n.height = Math.floor(i.height * r))
                }
                e()
            }, this));
            if (/^(quicktime|flash)$/.test(this.view.type) && !Lightview.plugins[this.view.type]) {
                var r = this.options.errors && this.options.errors.missing_plugin || "",
                    r = r.replace("#{pluginspage}", Lightview.pluginspages[this.view.type]),
                    r = r.replace("#{type}", this.view.type);
                b.extend(this.view, {
                    type: "html",
                    title: null,
                    caption: null,
                    url: r
                })
            }
            t.queue(b.proxy(function (e) {
                switch (this.view.type) {
                    case "image":
                        q.get(this.view.url, {
                            type: this.view.type
                        }, b.proxy(function (t, n) {
                        	if (this.options.width || this.options.height) t = this.Dimensions.scaleWithin({
                                width: this.options.width || t.width,
                                height: this.options.height || t.height
                            }, t);
                            
                            // Get the fitted width to know how much height the text will require.
                            t = this.Dimensions.fit(t, this.view)
                            this.titleCaption.css("position", "static").css("top", "").css("left", "")
                            this.setTitleCaption(t.width), this.titleCaption.show()
                            this.title.css("width", t.width)
                            this.caption.css("width", t.width)
                            this.titleCaptionSlide.css("width", t.with)
                            
                            this.content.show()
                            var captionHeight = this.titleCaptionSlide.outerHeight(true)
                            
                            var object = this
                            // Now calculate the dimension again, but extracting the caption height
                            // from the viewspace so it always fits.
                            t = this.Dimensions.fit(t, this.view, captionHeight), 
                            
                            this.resizeTo(t.width, t.height + captionHeight, {
                                complete: b.proxy(function () {
                                    var r = !this.content.is(":visible");
                                    "gif" != this.view.extension && m && this.States.get("resized") ? H(b("<div>").css(o(t)).addClass("lv_content_image").css({
                                        filter: 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + n.image.src + '", sizingMethod="scale")'
                                    })) : H(b("<img>").css(o(t)).css({
                                        "-ms-interpolation-mode": "bicubic"
                                    }).addClass("lv_content_image").attr({
                                        src: n.image.src,
                                        alt: ""
                                    })), r && this.content.hide(), e()
                                }, this)
                            })
                            
                        }, this));
                        break;
                    case "flash":
                        $.check("SWFObject");
                        var t = this.Dimensions.fit(n, this.view);
                        this.resizeTo(t.width, t.height, {
                            complete: b.proxy(function () {
                                var n = Y(),
                                    r = b("<div>").attr({
                                        id: n
                                    });
                                r.css(o(t)), H(r), swfobject.embedSWF(this.view.url, n, "" + t.width, "" + t.height, "9.0.0", null, this.view.options.flashvars || null, this.view.options.params || {}), b("#" + n).addClass("lv_content_flash"), e()
                            }, this)
                        });
                        break;
                    case "quicktime":
                        var r = !! this.view.options.params.controller;
                        !w && "quicktime" == this.view.type && r && (n.height += 16), t = this.Dimensions.fit(n, this.view), this.resizeTo(t.width, t.height, {
                            complete: b.proxy(function () {
                                var n = {
                                    tag: "object",
                                    "class": "lv_content_object",
                                    width: t.width,
                                    height: t.height,
                                    pluginspage: Lightview.pluginspages[this.view.type],
                                    children: []
                                }, i;
                                for (i in this.view.options.params) n.children.push({
                                    tag: "param",
                                    name: i,
                                    value: this.view.options.params[i]
                                });
                                b.merge(n.children, [{
                                    tag: "param",
                                    name: "src",
                                    value: this.view.url
                                }]), b.extend(n, m ? {
                                    codebase: "http://www.apple.com/qtactivex/qtplugin.cab",
                                    classid: "clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B"
                                } : {
                                    data: this.view.url,
                                    type: "video/quicktime"
                                }), H(V(n)), r && this.Timeouts.set(b.proxy(function () {
                                    try {
                                        var e = this.content.find("object")[0];
                                        "SetControllerVisible" in e && e.SetControllerVisible(controller)
                                    } catch (t) {}
                                }, this), 1), e()
                            }, this)
                        });
                        break;
                    case "iframe":
                    case "iframe_movie":
                        var t = this.Dimensions.fit(n, this.view),
                            i = b("<iframe>").attr({
                                frameBorder: 0,
                                hspace: 0,
                                width: t.width,
                                height: t.height,
                                src: this.view.url
                            }).addClass("lv_content_iframe");
                        this.view.options.attr && i.attr(this.view.options.attr), this.resizeTo(t.width, t.height, {
                            complete: b.proxy(function () {
                                H(i), e()
                            }, this)
                        });
                        break;
                    case "html":
                        var s = b("<div>").append(this.view.url).addClass("lv_content_html");
                        this.updateQueue.update(s, this.view, b.proxy(function () {
                            e()
                        }, this));
                        break;
                    case "inline":
                        s = b("#" + this.view.url)[0];
                        if (!s) break;
                        this.inlineContent = s, this.updateQueue.update(s, this.view, b.proxy(function () {
                            e()
                        }, this));
                        break;
                    case "ajax":
                        b.extend({
                            url: this.view.url
                        }, this.view.options.ajax || {});
                        var u = this.view.url,
                            u = this.view.url,
                            s = this.view.options.ajax || {};
                        b.ajax({
                            url: u,
                            type: s.type || "get",
                            dataType: s.dataType || "html",
                            data: s.data || {},
                            success: b.proxy(function (t, n, r) {
                                u == this.view.url && this.updateQueue.update(r.responseText, this.view, b.proxy(function () {
                                    e()
                                }, this))
                            }, this)
                        })
                }
            }, this)), t.queue(b.proxy(function (e) {
                this.preloadSurroundingImages(), e()
            }, this)), "function" == b.type(this.options.afterUpdate) && t.queue(b.proxy(function (e) {
                this.content.is(":visible") || this.content.show().css({
                    opacity: 0
                });
                var t = this.content.find(".lv_content_wrapper")[0];
                this.options.afterUpdate.call(Lightview, t, this.position), e()
            }, this)), t.queue(b.proxy(function (e) {
                this.spinnerWrapper.fadeOut(this.options.effects.spinner.hide, b.proxy(function () {
                    this.spinner && this.spinner.remove(), e()
                }, this))
            }, this)), t.queue(b.proxy(function (e) {
                i.set(this.options.controls.type), "thumbnails" == i.type && -1 == i.Thumbnails.position && i.Thumbnails.moveTo(this.position, !0), i.refresh(), e()
            }, this)), t.queue(b.proxy(function (e) {
                this.refreshPreviousNext(), e()
            }, this)), t.queue(b.proxy(function (e) {
                this.restoreOverlappingWithinContent(), this.content.fadeTo(this.options.effects.content.show, O && 18 <= O ? .9999999 : 1, b.proxy(function () {
                    e()
                }, this))
            }, this)), (this.view.title || this.view.caption) && t.queue(b.proxy(function (e) {
                e()
            }, this)), t.queue(b.proxy(function (e) {
                N.enable(), e()
            }, this)), e && t.queue(function (t) {
                e(), t()
            })
        },
        _update: function (e) {
            this.measureElement.attr("style", ""), this.measureElement.html(e)
        },
        getLayout: function (e) {
            var t = {}, n = this.options.border && this.options.border.size || 0,
                r = this.padding || 0,
                i = this.options.radius && "background" == this.options.radius.position ? this.options.radius.size || 0 : 0,
                o = n && this.options.radius && "border" == this.options.radius.position ? this.options.radius.size || 0 : i + n,
                e = e || this._dimensions.content;
            n && o && o > n + i && (o = n + i);
            var u = this.options.shadow && this.options.shadow.blur || 0,
                a = Math.max(u, this.spacing.horizontal),
                u = Math.max(u, this.spacing.vertical),
                f = {
                    width: e.width + 2 * r,
                    height: e.height + 2 * r
                }, l = {
                    height: f.height + 2 * n,
                    width: f.width + 2 * n
                }, c = s.clone(l),
                h;
            this.options.shadow && (c.width += 2 * this.options.shadow.blur, c.height += 2 * this.options.shadow.blur, h = {
                top: u - this.options.shadow.blur,
                left: a - this.options.shadow.blur
            }, this.options.shadow.offset && (h.top += this.options.shadow.offset.y, h.left += this.options.shadow.offset.x));
            var p = {
                top: u,
                left: a
            }, d = {
                width: l.width + 2 * a,
                height: l.height + 2 * u
            }, v = {
                top: 0,
                left: 0
            }, m = {
                width: 0,
                height: 0
            };
            if (e && this.view && (this.view.title || this.view.caption)) {
                var v = !this.element.is(":visible"),
                    g = !this.titleCaption.is(":visible");
                this.titleCaption.add(this.title).add(this.caption).css({
                    width: "auto"
                }), v && this.element.show(), g && this.titleCaption.show();
                var y = this.title.html(),
                    w = this.caption.html();
                this.setTitleCaption(e.width), m = {
                    width: this.titleCaption.outerWidth(!0),
                    height: this.titleCaption.outerHeight(!0)
                }, this.title.html(y), this.caption.html(w), g && this.titleCaption.hide(), v && this.element.hide(), v = {
                    top: p.top + l.height,
                    left: p.left + n + r
                }
            }
            return b.extend(t, {
                window: {
                    dimensions: {
                        width: d.width,
                        height: d.height + m.height
                    }
                },
                skin: {
                    position: {
                        top: u,
                        left: a
                    },
                    dimensions: d
                },
                content: {
                    position: {
                        top: p.top + n + r,
                        left: p.left + n + r
                    },
                    dimensions: b.extend({}, this._dimensions.content)
                },
                bubble: {
                    border: n,
                    inner: {
                        radius: i,
                        padding: r,
                        dimensions: f,
                        position: {
                            top: n,
                            left: n
                        }
                    },
                    outer: {
                        radius: o,
                        dimensions: l
                    },
                    position: p
                },
                shadow: {
                    position: h,
                    dimensions: c
                },
                titleCaption: {
                    position: v,
                    dimensions: m
                }
            }), t
        },
        _drawBackgroundPath: function () {
            var e = this.ctxBubble,
                t = this.layout,
                r = t.bubble,
                i = r.border,
                r = r.inner.radius,
                s = t.bubble.inner.dimensions,
                t = s.width,
                s = s.height,
                o = r,
                u = 0;
            i && (o += i, u += i), e.beginPath(o, u), e.moveTo(o, u), r ? (e.arc(i + t - r, i + r, r, n(-90), n(0), !1), o = i + t, u = i + r) : (o += t, e.lineTo(o, u)), u += s - 2 * r, e.lineTo(o, u), r ? (e.arc(i + t - r, i + s - r, r, n(0), n(90), !1), o = i + t - r, u = i + s) : e.lineTo(o, u), o -= t - 2 * r, e.lineTo(o, u), r ? (e.arc(i + r, i + s - r, r, n(90), n(180), !1), o = i, u = i + s - r) : e.lineTo(o, u), u -= s - 2 * r, e.lineTo(o, u), r && (e.arc(i + r, i + r, r, n(-180), n(-90), !1), u = i, o = i + r + 1), e.lineTo(o, u), i || e.closePath()
        },
        _drawBorderPath: function () {
            var e = this.layout,
                t = this.ctxBubble,
                r = e.bubble.outer.radius,
                i = e.bubble.outer.dimensions,
                e = i.width,
                i = i.height,
                s = r,
                o = 0,
                s = r;
            t.moveTo(s, o), r ? (t.arc(r, r, r, n(-90), n(-180), !0), s = 0, o = r) : t.lineTo(s, o), o += i - 2 * r, t.lineTo(s, o), r ? (t.arc(r, i - r, r, n(-180), n(-270), !0), s = r, o = i) : t.lineTo(s, o), s += e - 2 * r, t.lineTo(s, o), r ? (t.arc(e - r, i - r, r, n(90), n(0), !0), s = e, o = i - r) : t.lineTo(s, o), o -= i - 2 * r, t.lineTo(s, o), r && (t.arc(e - r, r, r, n(0), n(-90), !0), o = 0, s = e - r + 1), t.lineTo(s, o), t.closePath()
        },
        _drawShadow: function () {
            this.ctxShadow.clearRect(0, 0, this.canvasShadow[0].width, this.canvasShadow[0].height);
            if (this.options.shadow) {
                this.shadow.show();
                var e = this.layout,
                    t = e.bubble.outer.radius,
                    n = e.bubble.outer.dimensions,
                    r = this.options.shadow,
                    i = this.options.shadow.blur,
                    s = this.ctxShadow;
                this.shadow.css(o(e.shadow.dimensions)), this.canvasShadow.attr(e.shadow.dimensions), this.canvasShadow.css({
                    top: 0,
                    left: 0
                });
                for (var e = r.opacity, u = r.blur + 1, a = 0; a <= i; a++) s.fillStyle = C.hex2fill(r.color, (Math.PI / 2 - Math.pow(a * (1 / u), Math.cos(a * (1 / u)) * Math.PI)) * (e / u)), D.drawRoundedRectangle(s, {
                    width: n.width + 2 * a,
                    height: n.height + 2 * a,
                    top: i - a,
                    left: i - a,
                    radius: t + a
                }), s.fill();
                this.shadow.show()
            } else this.shadow.hide()
        }
    }, r = {}, T = 0;
    e.Timeouts = {
        set: function (e, t, n) {
            "string" == b.type(e) && this.clear(e);
            if ("function" == b.type(e)) {
                n = t;
                for (t = e; r["timeout_" + T];) T++;
                e = "timeout_" + T
            }
            r[e] = j.setTimeout(function () {
                t && t(), r[e] = null, delete r[e]
            }, n)
        },
        get: function (e) {
            return r[e]
        },
        clear: function (e) {
            e || (b.each(r, function (e, t) {
                j.clearTimeout(t), r[e] = null, delete r[e]
            }), r = {}), r[e] && (j.clearTimeout(r[e]), r[e] = null, delete r[e])
        }
    }, e.States = {
        _states: {},
        set: function (e, t) {
            this._states[e] = t
        },
        get: function (e) {
            return this._states[e] || !1
        }
    }, b.extend(F.prototype, {
        initialize: function (a, c) {
            var f = c || {};
            if ("string" == b.type(a)) a = {
                url: a
            };
            else if (a && 1 == a.nodeType) var d = b(a),
                a = {
                    element: d[0],
                    url: d.attr("href"),
                    title: d.data("lightview-title"),
                    caption: d.data("lightview-caption"),
                    group: d.data("lightview-group"),
                    extension: d.data("lightview-extension"),
                    type: d.data("lightview-type"),
                    options: d.data("lightview-options") && eval("({" + d.data("lightview-options") + "})") || {}
                };
            return a && (a.extension || (a.extension = X(a.url)), !a.type) && (a.type = W(a.url, a.extension)), a.options = a && a.options ? b.extend(!0, s.clone(f), s.clone(a.options)) : s.clone(f), a.options = G.create(a.options, a.type), b.extend(this, a), this
        },
        isExternal: function () {
            return -1 < b.inArray(this.type, ["iframe", "inline", "ajax"])
        },
        isMedia: function () {
            return !this.isExternal()
        }
    }), e.Dimensions = {
        fit: function (t, f, subtractFromViewport) {
        	if (!e.view.options.viewport) return e.States.set("resized", !1), t;
            var n = A.viewport(),
                r = e.getLayout(t).window.dimensions,
                i = 1;
            n.height -= subtractFromViewport || 0
            if ("scale" == e.view.options.viewport) for (var s = t, t = 5; 0 < t && (r.width > n.width || r.height > n.height);) {
                e.States.set("resized", !0), t--, 150 > r.width && (t = 0);
                if (100 < s.width && 100 < s.height) {
                    var o = i = 1;
                    r.width > n.width && (i = n.width / r.width), r.height > n.height && (o = n.height / r.height), i = Math.min(i, o), s = {
                        width: Math.round(s.width * i),
                        height: Math.round(s.height * i)
                    }
                }
                r = e.getLayout(s).window.dimensions
            } else {
                s = t;
                for (t = 3; 0 < t && (r.width > n.width || r.height > n.height);) e.States.set("resized", !0), t--, 150 > r.width && (t = 0), r.width > n.width && (s.width -= r.width - n.width), r.height > n.height && (s.height -= r.height - n.height), r = e.getLayout(s).window.dimensions
            }
            return t = s
        },
        scaleWithin: function (e, t) {
            if (e.width && t.width > e.width || e.height && t.height > e.height) {
                var n = this.getBoundsScale(t, {
                    width: e.width || t.width,
                    height: e.height || t.height
                });
                e.width && (t.width = Math.round(t.width * n)), e.height && (t.height = Math.round(t.height * n))
            }
            return t
        },
        getBoundsScale: function (e, t) {
            return Math.min(t.height / e.height, t.width / e.width, 1)
        },
        scale: function (e, t) {
            return {
                width: (e.width * t).round(),
                height: (e.height * t).round()
            }
        },
        scaleToBounds: function (e, t) {
            var n = Math.min(t.height / e.height, t.width / e.width, 1);
            return {
                width: Math.round(e.width * n),
                height: Math.round(e.height * n)
            }
        }
    };
    var N = {
        enabled: !1,
        keyCode: {
            left: 37,
            right: 39,
            space: 32,
            esc: 27
        },
        enable: function () {
            this.fetchOptions()
        },
        disable: function () {
            this.enabled = !1
        },
        init: function () {
            this.fetchOptions(), b(document).keydown(b.proxy(this.onkeydown, this)), b(document).keyup(b.proxy(this.onkeyup, this)), N.disable()
        },
        fetchOptions: function () {
            this.enabled = e.options.keyboard
        },
        onkeydown: function (t) {
            if (this.enabled && e.element.is(":visible")) {
                var n = this.getKeyByKeyCode(t.keyCode);
                if (n && (!n || !this.enabled || this.enabled[n])) switch (t.preventDefault(), t.stopPropagation(), n) {
                    case "left":
                        e.previous();
                        break;
                    case "right":
                        e.next();
                        break;
                    case "space":
                        e.views && 1 < e.views.length && e[e.States.get("playing") ? "stop" : "play"]()
                }
            }
        },
        onkeyup: function (t) {
            if (this.enabled && e.element.is(":visible") && (t = this.getKeyByKeyCode(t.keyCode)) && (!t || !this.enabled || this.enabled[t])) switch (t) {
                case "esc":
                    e.hide()
            }
        },
        getKeyByKeyCode: function (e) {
            for (var t in this.keyCode) if (this.keyCode[t] == e) return t;
            return null
        }
    }, q = {
        get: function (e, t, n) {
            "function" == b.type(t) && (n = t, t = {});
            var t = b.extend({
                track: !0,
                type: !1,
                lifetime: 3e5
            }, t || {}),
                r = q.cache.get(e),
                i = t.type || W(e),
                s = {
                    type: i,
                    callback: n
                };
            if (r) n && n(b.extend({}, r.dimensions), r.data);
            else switch (t.track && q.loading.clear(e), i) {
                case "image":
                    var o = new Image;
                    o.onload = function () {
                        o.onload = function () {}, r = {
                            dimensions: {
                                width: o.width,
                                height: o.height
                            }
                        }, s.image = o, q.cache.set(e, r.dimensions, s), t.track && q.loading.clear(e), n && n(r.dimensions, s)
                    }, o.src = e, t.track && q.loading.set(e, {
                        image: o,
                        type: i
                    })
            }
        },
        Cache: function () {
            return this.initialize.apply(this, Q.call(arguments))
        }
    };
    b.extend(q.Cache.prototype, {
        initialize: function () {
            this.cache = []
        },
        get: function (e) {
            for (var t = null, n = 0; n < this.cache.length; n++) this.cache[n] && this.cache[n].url == e && (t = this.cache[n]);
            return t
        },
        set: function (e, t, n) {
            this.remove(e), this.cache.push({
                url: e,
                dimensions: t,
                data: n
            })
        },
        remove: function (e) {
            for (var t = 0; t < this.cache.length; t++) this.cache[t] && this.cache[t].url == e && delete this.cache[t]
        },
        inject: function (e) {
            var t = get(e.url);
            t ? b.extend(t, e) : this.cache.push(e)
        }
    }), q.cache = new q.Cache, q.Loading = function () {
        return this.initialize.apply(this, Q.call(arguments))
    }, b.extend(q.Loading.prototype, {
        initialize: function () {
            this.cache = []
        },
        set: function (e, t) {
            this.clear(e), this.cache.push({
                url: e,
                data: t
            })
        },
        get: function (e) {
            for (var t = null, n = 0; n < this.cache.length; n++) this.cache[n] && this.cache[n].url == e && (t = this.cache[n]);
            return t
        },
        clear: function (e) {
            for (var t = this.cache, n = 0; n < t.length; n++) if (t[n] && t[n].url == e && t[n].data) {
                var r = t[n].data;
                switch (r.type) {
                    case "image":
                        r.image && r.image.onload && (r.image.onload = function () {})
                }
                delete t[n]
            }
        }
    }), q.loading = new q.Loading, q.preload = function (e, t, n) {
        "function" == b.type(t) && (n = t, t = {}), t = b.extend({
            once: !1
        }, t || {});
        if (!t.once || !q.preloaded.get(e)) {
            var r;
            if ((r = q.preloaded.get(e)) && r.dimensions) "function" == b.type(n) && n(b.extend({}, r.dimensions), r.data);
            else {
                var i = {
                    url: e,
                    data: {
                        type: "image"
                    }
                }, s = new Image;
                i.data.image = s, s.onload = function () {
                    s.onload = function () {}, i.dimensions = {
                        width: s.width,
                        height: s.height
                    }, b.type(n) == "function" && n(i.dimensions, i.data)
                }, q.preloaded.cache.add(i), s.src = e
            }
        }
    }, q.preloaded = {
        get: function (e) {
            return q.preloaded.cache.get(e)
        },
        getDimensions: function (e) {
            return (e = this.get(e)) && e.dimensions
        }
    };
    var E = [];
    q.preloaded.cache = {
        get: function (e) {
            for (var t = null, n = 0, r = E.length; n < r; n++) E[n] && E[n].url && E[n].url == e && (t = E[n]);
            return t
        },
        add: function (e) {
            E.push(e)
        }
    }, b(document.documentElement).delegate(".lightview[href]", "click", function (e, t) {
        e.stopPropagation(), e.preventDefault(), t = e.currentTarget, Lightview.show(t)
    });
    var i = {
        type: !1,
        set: function (t) {
            this.type = t, e.States.get("controls_type_changed") && this.hide(), b(["relative", "top", "thumbnails"]).each(function (t, n) {
                e.buttonTopClose.removeClass("lv_button_top_close_controls_type_" + n)
            }), e.buttonTopClose.addClass("lv_button_top_close_controls_type_" + t);
            switch (this.type) {
                case "relative":
                    this.Relative.show();
                    break;
                case "top":
                    this.Top.show();
                    break;
                case "thumbnails":
                    this.Thumbnails.show()
            }
        },
        refresh: function () {
            this.Relative.Slider.populate(e.views.length), this.Relative.Slider.setPosition(e.position), this.Relative.refresh(), this.Thumbnails.position = e.position, this.Thumbnails.refresh(), this.Top.refresh()
        },
        hide: function () {
            this.Relative.hide(), this.Top.hide(), this.Thumbnails.hide()
        },
        play: function () {
            this.Relative.play(), this.Top.play()
        },
        stop: function () {
            this.Relative.stop(), this.Top.stop()
        },
        _reset: function () {
            this.Thumbnails._reset()
        },
        Thumbnails: {
            create: function () {
                this.position = -1, this._skin = this._urls = null, this._loading_images = [], b(document.body).append(this.element = b("<div>").addClass("lv_thumbnails").append(this.slider = b("<div>").addClass("lv_thumbnails_slider").append(this.slide = b("<div>").addClass("lv_thumbnails_slide"))).hide()).append(this.close = b("<div>").addClass("lv_controls_top_close").append(this.close_button = b("<div>").addClass("lv_controls_top_close_button")).hide()), this.elements = e.sideButtonsUnderneath.add(e.sideButtonsUnderneath.find(".lv_side_left")).add(e.sideButtonsUnderneath.find(".lv_side_right")).add(e.innerPreviousNextOverlays), m && 7 > m && (this.element.css({
                    position: "absolute",
                    top: "auto"
                }), this.element[0].style.setExpression("top", "((-1 * this.offsetHeight + (window.jQuery ? jQuery(window).height() + jQuery(window).scrollTop() : 0)) + 'px')")), this.startObserving()
            },
            startObserving: function () {
                this.close_button.bind("click", function () {
                    e.hide()
                }), this.element.bind("click", b.proxy(function (t) {
                    (!this.options || !this.options.overlay || this.options.overlay.close) && b(t.target).is(".lv_thumbnails, .lv_thumbnails_slider") && e.hide()
                }, this)).delegate(".lv_thumbnail_image", "click", b.proxy(function (t) {
                    var n = b(t.target).closest(".lv_thumbnail")[0];
                    this.slide.find(".lv_thumbnail").each(b.proxy(function (t, r) {
                        var i = t + 1;
                        r == n && (this.setActive(i), this.setPosition(i), e.setPosition(i))
                    }, this))
                }, this)).bind("lightview:mousewheel", b.proxy(function (t, n) {
                    "thumbnails" == i.type && (!e.options || !e.options.controls || !e.options.controls.thumbnails || !e.options.controls.thumbnails.mousewheel) || (t.preventDefault(), t.stopPropagation(), this["_" + (-1 == n ? "next" : "previous")]())
                }, this)), this.close.bind("lightview:mousewheel", b.proxy(function (t) {
                    if (!e.options || e.options.mousewheel || "thumbnails" == i.type && e.options && e.options.controls && e.options.controls.thumbnails && e.options.controls.thumbnails.mousewheel || e.options && e.options.viewport) t.preventDefault(), t.stopPropagation()
                }, this))
            },
            setSkin: function (t) {
                b.each({
                    element: "lv_thumbnails_skin_",
                    close: "lv_controls_top_close_skin_"
                }, b.proxy(function (e, n) {
                    var r = this[e];
                    b.each((r[0].className || "").split(" "), function (e, t) {
                        -1 < t.indexOf(n) && r.removeClass(t)
                    }), r.addClass(n + t)
                }, this));
                var n = "";
                b.each(e.views, function (e, t) {
                    n += t.url
                }), (this._urls != n || this._skin != t) && this.load(e.views), this._urls = n, this._skin = t
            },
            stopLoadingImages: function () {
                b(this._loading_images).each(function (e, t) {
                    t.onload = function () {}
                }), this._loading_images = []
            },
            clear: function () {
                j.Spinners && Spinners.remove(".lv_thumbnail_image .lv_spinner_wrapper"), this.slide.html("")
            },
            _reset: function () {
                this.position = -1, this._urls = null
            },
            load: function (e, t) {
                this.position = -1, this.stopLoadingImages(), this.clear(), b.each(e, b.proxy(function (t, n) {
                    var r, i;
                    this.slide.append(r = b("<div>").addClass("lv_thumbnail").append(i = b("<div>").addClass("lv_thumbnail_image"))), this.slide.css({
                        width: r.outerWidth() * e.length + "px"
                    });
                    if ("image" == n.type || n.options.thumbnail && n.options.thumbnail.image) r.addClass("lv_load_thumbnail"), r.data("thumbnail", {
                        view: n,
                        src: n.options.thumbnail && n.options.thumbnail.image || n.url
                    });
                    n.options.thumbnail && n.options.thumbnail.icon && i.append(b("<div>").addClass("lv_thumbnail_icon lv_thumbnail_icon_" + n.options.thumbnail.icon))
                }, this)), t && this.moveTo(t, !0)
            },
            _getThumbnailsWithinViewport: function () {
                var t = this.position,
                    n = [],
                    r = this.slide.find(".lv_thumbnail:first").outerWidth();
                if (!t || !r) return n;
                var i = A.viewport().width,
                    r = Math.ceil(i / r),
                    s = Math.floor(Math.max(t - .5 * r, 0)),
                    o = Math.ceil(Math.min(t + .5 * r));
                return e.views && e.views.length < o && (o = e.views.length), this.slider.find(".lv_thumbnail").each(function (e, t) {
                    e + 1 >= s && e + 1 <= o && n.push(t)
                }), n
            },
            loadThumbnailsWithinViewport: function () {
                var t = this._getThumbnailsWithinViewport();
                b(t).filter(".lv_load_thumbnail").each(b.proxy(function (t, n) {
                    var r = b(n).find(".lv_thumbnail_image"),
                        i = b(n).data("thumbnail"),
                        s = i.view;
                    b(n).removeClass("lv_load_thumbnail");
                    var u, a, f, l;
                    f = s.options.controls, j.Spinners && (l = f && f.thumbnails && f.thumbnails.spinner) && (r.append(a = b("<div>").addClass("lv_thumbnail_image_spinner_overlay").append(f = b("<div>").addClass("lv_spinner_wrapper"))), u = Spinners.create(f[0], l || {}).play(), l = Spinners.getDimensions(f[0]), f.css(o({
                        height: l.height,
                        width: l.width,
                        "margin-left": Math.ceil(-0.5 * l.width),
                        "margin-top": Math.ceil(-0.5 * l.height)
                    })));
                    var c = {
                        width: r.innerWidth(),
                        height: r.innerHeight()
                    }, h = Math.max(c.width, c.height);
                    q.preload(i.src, {
                        type: s.type
                    }, b.proxy(function (t, n) {
                        var i = n.image,
                            f;
                        if (i.width > c.width && i.height > c.height) {
                            f = e.Dimensions.scaleWithin({
                                width: h,
                                height: h
                            }, t);
                            var l = i = 1;
                            f.width < c.width && (i = c.width / f.width), f.height < c.height && (l = c.height / f.height), i = Math.max(i, l), 1 < i && (f.width *= i, f.height *= i), b.each(["width", "height"], function (e, t) {
                                f[t] = Math.round(f[t])
                            })
                        } else f = e.Dimensions.scaleWithin(i.width < c.width || i.height < c.height ? {
                            width: h,
                            height: h
                        } : c, t);
                        i = Math.round(.5 * c.width - .5 * f.width), l = Math.round(.5 * c.height - .5 * f.height), i = b("<img>").attr({
                            src: n.image.src
                        }).css(o(f)).css(o({
                            top: l,
                            left: i
                        })), r.prepend(i), a ? a.fadeOut(s.options.effects.thumbnails.load, function () {
                            u && (u.remove(), u = null, a.remove())
                        }) : i.css({
                            opacity: 0
                        }).fadeTo(s.options.effects.thumbnails.load, 1)
                    }, this))
                }, this))
            },
            show: function () {
                this.elements.add(e.buttonTopClose).add(this.close).hide();
                var t = this.elements,
                    n = e.options.controls;
                switch (n && n.close) {
                    case "top":
                        t = t.add(this.close);
                        break;
                    case "relative":
                        t = t.add(e.buttonTopClose)
                }
                e.refreshPreviousNext(), t.show(), e.views && 1 >= e.views.length || this.element.stop(1, 0).fadeTo(e.options.effects.thumbnails.show, 1)
            },
            hide: function () {
                this.elements.add(e.buttonTopClose).add(this.close).hide(), this.element.stop(1, 0).fadeOut(e.options.effects.thumbnails.hide)
            },
            _previous: function () {
                if (!(1 > this.position)) {
                    var t = this.position - 1;
                    this.setActive(t), this.setPosition(t), e.setPosition(t)
                }
            },
            _next: function () {
                if (!(this.position + 1 > e.views.length)) {
                    var t = this.position + 1;
                    this.setActive(t), this.setPosition(t), e.setPosition(t)
                }
            },
            adjustToViewport: function () {
                var e = A.viewport();
                this.slider.css({
                    width: e.width + "px"
                })
            },
            setPosition: function (t) {
                var n = 0 > this.position;
                1 > t && (t = 1);
                var r = this.itemCount();
                t > r && (t = r), this.position = t, this.setActive(t), e.refreshPreviousNext(), this.moveTo(t, n)
            },
            moveTo: function (t, n) {
                this.adjustToViewport();
                var r = A.viewport().width,
                    i = this.slide.find(".lv_thumbnail").outerWidth(),
                    r = .5 * r + -1 * (i * (t - 1) + .5 * i);
                this.slide.stop(1, 0).animate({
                    left: r + "px"
                }, n ? 0 : e.options.effects.thumbnails.slide, b.proxy(function () {
                    this.loadThumbnailsWithinViewport()
                }, this))
            },
            setActive: function (e) {
                var t = this.slide.find(".lv_thumbnail").removeClass("lv_thumbnail_active");
                e && b(t[e - 1]).addClass("lv_thumbnail_active")
            },
            refresh: function () {
                this.position && this.setPosition(this.position)
            },
            itemCount: function () {
                return this.slide.find(".lv_thumbnail").length || 0
            }
        },
        Relative: {
            create: function () {
                this.Slider.create(), this.elements = b(this.Slider.element).add(e.sideButtonsUnderneath).add(e.sideButtonsUnderneath.find(".lv_side_left")).add(e.sideButtonsUnderneath.find(".lv_side_right")).add(e.innerPreviousNextOverlays).add(e.innerPreviousNextOverlays.find(".lv_button"))
            },
            show: function () {
                this.hide();
                var t = this.elements,
                    n = e.options.controls;
                switch (n && n.close) {
                    case "top":
                        t = t.add(i.Top.close);
                        break;
                    case "relative":
                        t = t.add(e.buttonTopClose)
                }
                t.show(), e.refreshPreviousNext(), (e.view && 1 < e.views.length && e.mayPrevious() || e.mayNext()) && this.Slider.show()
            },
            hide: function () {
                this.elements.add(i.Top.close).add(e.buttonTopClose).hide()
            },
            refresh: function () {
                this.Slider.refresh()
            },
            play: function () {
                this.Slider.play()
            },
            stop: function () {
                this.Slider.stop()
            }
        }
    };
    i.Relative.Slider = {
        setOptions: function () {
            var t = e.options;
            this.options = {
                items: (t.controls && t.controls.slider || {}).items || 5,
                duration: t.effects && t.effects.slider && t.effects.slider.slide || 100,
                slideshow: t.slideshow
            }
        },
        create: function () {
            b(e.element).append(this.element = b("<div>").addClass("lv_controls_relative").append(this.slider = b("<div>").addClass("lv_slider").append(this.slider_previous = b("<div>").addClass("lv_slider_icon lv_slider_previous").append(b("<div>").addClass("lv_icon").data("side", "previous"))).append(this.slider_numbers = b("<div>").addClass("lv_slider_numbers").append(this.slider_slide = b("<div>").addClass("lv_slider_slide"))).append(this.slider_next = b("<div>").addClass("lv_slider_icon lv_slider_next").append(b("<div>").addClass("lv_icon").data("side", "next"))).append(this.slider_slideshow = b("<div>").addClass("lv_slider_icon lv_slider_slideshow").append(b("<div>").addClass("lv_icon lv_slider_next"))))), this.element.hide(), this.count = 0, this.page = this.position = 1, this.setOptions(), this.startObserving()
        },
        startObserving: function () {
            this.slider_slide.delegate(".lv_slider_number", "click", b.proxy(function (t) {
                t.preventDefault(), t.stopPropagation(), t = parseInt(b(t.target).html()), this.setActive(t), e.stop(), e.setPosition(t)
            }, this)), b.each(["previous", "next"], b.proxy(function (e, t) {
                this["slider_" + t].bind("click", b.proxy(this[t + "Page"], this))
            }, this)), this.slider.bind("lightview:mousewheel", b.proxy(function (t, n) {
                e.options && e.options.mousewheel && !(this.count <= this.options.items) && (t.preventDefault(), t.stopPropagation(), this[(0 < n ? "previous" : "next") + "Page"]())
            }, this)), this.slider_slideshow.bind("click", b.proxy(function () {
                b(this).hasClass("lv_slider_slideshow_disabled") || e[e.States.get("playing") ? "stop" : "play"](!0)
            }, this))
        },
        refresh: function () {
            this.setOptions();
            var t = this.itemCount(),
                n = t <= this.options.items ? t : this.options.items,
                r = b(e.element).is(":visible");
            this.element.css({
                width: "auto"
            }), this.slider[1 < t ? "show" : "hide"]();
            if (!(2 > t)) {
                r || b(e.element).show(), n = b(document.createElement("div")).addClass("lv_slider_number"), this.slider_slide.append(n), this.nr_width = t = n.outerWidth(!0), n.addClass("lv_slider_number_last"), this.nr_margin_last = t - n.outerWidth(!0) || 0, n.remove(), t = this.itemCount(), n = t <= this.options.items ? t : this.options.items, t = (t = this.count % this.options.items) ? this.options.items - t : 0, this.slider_numbers.css({
                    width: this.nr_width * n - this.nr_margin_last + "px"
                }), this.slider_slide.css({
                    width: this.nr_width * (this.count + t) + "px"
                }), n = e.views && 0 < b.grep(e.views, function (e) {
                    return e.options.slideshow
                }).length, this.slider_slideshow.hide().removeClass("lv_slider_slideshow_disabled"), n && this.slider_slideshow.show(), this.options.slideshow || this.slider_slideshow.addClass("lv_slider_slideshow_disabled"), this.itemCount() <= this.options.items ? (this.slider_next.hide(), this.slider_previous.hide()) : (this.slider_next.show(), this.slider_previous.show()), this.element.css({
                    width: "auto"
                }), this.slider.css({
                    width: "auto"
                });
                var i = 0,
                    n = jQuery.map(b.makeArray(this.slider.children("div:visible")), function (e) {
                        var t = b(e).outerWidth(!0);
                        return m && m < 7 && (t += (parseInt(b(e).css("margin-left")) || 0) + (parseInt(b(e).css("margin-right")) || 0)), t
                    });
                b.each(n, function (e, t) {
                    i += t
                }), m && 7 > m && i++, this.element.css({
                    position: "absolute"
                }), i && this.element.css({
                    width: i + "px"
                }), i && this.slider.css({
                    width: i + "px"
                }), this.element.css({
                    "margin-left": Math.ceil(-0.5 * i) + "px"
                }), n = parseInt(this.slider_slide.css("left") || 0), t = this.pageCount(), n < -1 * (t - 1) * this.options.items * this.nr_width && this.scrollToPage(t, !0), this.refreshButtonStates(), r || b(e.element).hide(), e.options && e.options.controls && !e.options.controls.slider && this.slider.hide()
            }
        },
        itemCount: function () {
            return this.slider_slide.find(".lv_slider_number").length || 0
        },
        pageCount: function () {
            return Math.ceil(this.itemCount() / this.options.items)
        },
        setActive: function (e) {
            b(this.slider_numbers.find(".lv_slider_number").removeClass("lv_slider_number_active")[e - 1]).addClass("lv_slider_number_active")
        },
        setPosition: function (e) {
            1 > e && (e = 1);
            var t = this.itemCount();
            e > t && (e = t), this.position = e, this.setActive(e), this.scrollToPage(Math.ceil(e / this.options.items))
        },
        refreshButtonStates: function () {
            this.slider_next.removeClass("lv_slider_next_disabled"), this.slider_previous.removeClass("lv_slider_previous_disabled"), 1 > this.page - 1 && this.slider_previous.addClass("lv_slider_previous_disabled"), this.page >= this.pageCount() && this.slider_next.addClass("lv_slider_next_disabled"), this[e.States.get("playing") ? "play" : "stop"]()
        },
        scrollToPage: function (e, t) {
            this.page == e || 1 > e || e > this.pageCount() || (w && this.slider_numbers.css({
                opacity: .999
            }), this.slider_slide.stop(!0).animate({
                left: -1 * this.options.items * this.nr_width * (e - 1) + "px"
            }, t ? 0 : this.options.duration || 0, "linear", b.proxy(function () {
                w && this.slider_numbers.css({
                    opacity: 1
                })
            }, this)), this.page = e, this.refreshButtonStates())
        },
        previousPage: function () {
            this.scrollToPage(this.page - 1)
        },
        nextPage: function () {
            this.scrollToPage(this.page + 1)
        },
        populate: function (e) {
            this.slider_slide.find(".lv_slider_number, .lv_slider_number_empty").remove();
            for (var t = 0; t < e; t++) this.slider_slide.append(b("<div>").addClass("lv_slider_number").html(t + 1));
            for (var t = this.options.items, n = e % t ? t - e % t : 0, t = 0; t < n; t++) this.slider_slide.append(b("<div>").addClass("lv_slider_number_empty"));
            this.slider_numbers.find(".lv_slider_number, lv_slider_number_empty").removeClass("lv_slider_number_last").last().addClass("lv_slider_number_last"), this.count = e, this.refresh()
        },
        show: function () {
            this.element.show()
        },
        hide: function () {
            this.element.hide()
        },
        play: function () {
            this.slider_slideshow.addClass("lv_slider_slideshow_playing")
        },
        stop: function () {
            this.slider_slideshow.removeClass("lv_slider_slideshow_playing")
        }
    }, i.Top = {
        create: function () {
            b(document.body).append(this.element = b("<div>").addClass("lv_controls_top").append(this.middle = b("<div>").addClass("lv_top_middle").hide().append(this.middle_previous = b("<div>").addClass("lv_top_button lv_top_previous").data("side", "previous").append(b("<div>").addClass("lv_icon").append(this.text_previous = b("<span>")))).append(this.middle_slideshow = b("<div>").addClass("lv_top_button lv_top_slideshow").append(b("<div>").addClass("lv_icon"))).append(this.middle_next = b("<div>").addClass("lv_top_button lv_top_next").data("side", "next").append(b("<div>").addClass("lv_icon").append(this.text_next = b("<span>"))))).hide()).append(this.close = b("<div>").addClass("lv_controls_top_close").append(this.close_button = b("<div>").addClass("lv_controls_top_close_button")).hide());
            if (m && 7 > m) {
                var e = this.element[0].style;
                e.position = "absolute", e.setExpression("top", '((!!window.jQuery && jQuery(window).scrollTop()) || 0) + "px"'), e = this.close[0].style, e.position = "absolute", e.setExpression("top", '((!!window.jQuery && jQuery(window).scrollTop()) || 0) + "px"')
            }
            this.setOptions(), this.startObserving()
        },
        setOptions: function () {
            this.options = b.extend({
                slideshow: !0,
                text: {
                    previous: "Prev",
                    next: "Next"
                },
                close: !0
            }, e.options && e.options.controls || {}), this.setText()
        },
        setSkin: function (e) {
            b.each({
                element: "lv_controls_top_skin_",
                close: "lv_controls_top_close_skin_"
            }, b.proxy(function (t, n) {
                var r = this[t];
                b.each((r[0].className || "").split(" "), function (e, t) {
                    -1 < t.indexOf(n) && r.removeClass(t)
                }), r.addClass(n + e)
            }, this))
        },
        setText: function () {
            this.text_previous.hide(), this.text_next.hide(), this.options.text && (this.text_previous.html(this.options.text.previous).show(), this.text_next.html(this.options.text.next).show())
        },
        startObserving: function () {
            this.middle_previous.bind("click", function () {
                e.stop(), e.previous(), b(this).blur()
            }), this.middle_slideshow.bind("click", function () {
                0 < b(this).find(".lv_icon_disabled").length || e[e.States.get("playing") ? "stop" : "play"](!0)
            }), this.middle_next.bind("click", function () {
                e.stop(), e.next(), b(this).blur()
            }), this.close_button.bind("click", function () {
                e.hide()
            }), this.element.add(this.close).bind("lightview:mousewheel", b.proxy(function (t) {
                if (!e.options || !e.options.mousewheel || e.options && e.options.viewport) t.preventDefault(), t.stopPropagation()
            }, this))
        },
        show: function () {
            var t = this.element,
                n = e.options.controls;
            switch (n && n.close) {
                case "top":
                    t = t.add(this.close);
                    break;
                case "relative":
                    t = t.add(e.buttonTopClose)
            }
            t.show()
        },
        hide: function () {
            this.element.hide(), this.close.hide()
        },
        refresh: function () {
            this.setOptions(), this.element.find(".lv_icon_disabled").removeClass("lv_icon_disabled"), e.mayPrevious() || this.middle_previous.find(".lv_icon").addClass("lv_icon_disabled"), e.options.slideshow || this.middle_slideshow.find(".lv_icon").addClass("lv_icon_disabled"), e.mayNext() || this.middle_next.find(".lv_icon").addClass("lv_icon_disabled"), this.element.removeClass("lv_controls_top_with_slideshow"), e.views && 0 < b.grep(e.views, function (e) {
                return e.options.slideshow
            }).length && this.element.addClass("lv_controls_top_with_slideshow"), this.element["top" == i.type && 1 < e.views.length ? "show" : "hide"](), this[e.States.get("playing") ? "play" : "stop"]()
        },
        play: function () {
            this.middle_slideshow.addClass("lv_top_slideshow_playing")
        },
        stop: function () {
            this.middle_slideshow.removeClass("lv_top_slideshow_playing")
        }
    };
    var k = function (e) {
        return {
            width: b(e).innerWidth(),
            height: b(e).innerHeight()
        }
    }, U = function (e) {
        var t = k(e),
            n = e.parentNode;
        return n && b(n).css({
            width: t.width + "px"
        }) && k(e).height > t.height && t.width++, b(n).css({
            width: "100%"
        }), t
    }, ca = function (t, n, r) {
        var i = n.width - (parseInt(b(t).css("padding-left")) || 0) - (parseInt(b(t).css("padding-right")) || 0);
        parseInt(b(t).css("padding-top")), parseInt(b(t).css("padding-bottom"));
        var s = e.options.width;
        s && "number" == b.type(s) && i > s && (b(t).css({
            width: s + "px"
        }), n = U(t)), n = e.Dimensions.fit(n, r);
        if (/(inline|ajax|html)/.test(r.type) && e.States.get("resized")) {
            i = b("<div>"), i.css({
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%"
            }), b(t).append(i), s = i.innerWidth(), b(t).css(o(n)).css({
                overflow: "auto"
            });
            var u = i.innerWidth();
            if (s -= u) n.width += s, b(t).css(o(n)), n = e.Dimensions.fit(n, r);
            i.remove()
        }
        return n
    };
    e.updateQueue = {
        build: function () {
            b(document.body).append(b(document.createElement("div")).addClass("lv_update_queue").append(b("<div>").addClass("lv_window").append(this.container = b("<div>").addClass("lv_content"))))
        },
        update: function (t, n, r, i) {
            this.container || this.build(), b.extend({
                spinner: !1
            }, i || {});
            if (n.options.inline || s.isElement(t)) n.options.inline && "string" == b.type(t) && (t = b("#" + t)[0]), !e.inlineMarker && t && s.element.isAttached(t) && (b(t).data("lv_restore_inline_display", b(t).css("display")), e.inlineMarker = document.createElement("div"), b(t).before(b(e.inlineMarker).hide()));
            var o = document.createElement("div");
            this.container.append(b(o).addClass("lv_content_wrapper").append(t)), s.isElement(t) && b(t).show(), n.options.wrapperClass && o.addClass(n.options.wrapperClass), n.options.skin && b(o).addClass("lv_content_" + n.options.skin);
            var u = b(o).find("img[src]").filter(function () {
                return !b(this).attr("height") || !b(this).attr("width")
            });
            if (0 < u.length) {
                e.States.set("preloading_images", !0);
                var a = 0,
                    f = n.url,
                    t = Math.max(8e3, 750 * (u.length || 0));
                e.Timeouts.clear("preloading_images"), e.Timeouts.set("preloading_images", b.proxy(function () {
                    u.each(function () {
                        this.onload = function () {}
                    }), a >= u.length || e.view && e.view.url != f || this._update(o, n, r)
                }, this), t), e.States.set("preloading_images", u), b.each(u, b.proxy(function (t, i) {
                    var s = new Image;
                    s.onload = b.proxy(function () {
                        s.onload = function () {};
                        var t = s.width,
                            l = s.height,
                            p = b(i).attr("width"),
                            v = b(i).attr("height");
                        if (!p || !v)!p && v ? (t = Math.round(v * t / l), l = v) : !v && p && (l = Math.round(p * l / t), t = p), b(i).attr({
                            width: t,
                            height: l
                        });
                        a++, a == u.length && (e.Timeouts.clear("preloading_images"), e.States.set("preloading_images", !1), e.view && e.view.url != f || this._update(o, n, r))
                    }, this), s.src = i.src
                }, this))
            } else this._update(o, n, r)
        },
        _update: function (t, n, r) {
            var i = U(t),
                i = ca(t, i, n);
            e.resizeTo(i.width, i.height, {
                complete: function () {
                    e.content.html(t), r && r()
                }
            })
        },
        getFittedDimensions: ca,
        getMeasureElementDimensions: U
    }, b.extend(!0, Lightview, function () {
        return {
            show: function (a, c, f) {
                var d = c || {}, h = f;
                c && b.type(c) == "number" && (h = c, d = G.create({}));
                var g = [];
                switch (b.type(a)) {
                    case "string":
                    case "object":
                        c = new F(a, d);
                        if (c.group) {
                            if (a && a.nodeType == 1) {
                                var c = b('.lightview[data-lightview-group="' + b(a).data("lightview-group") + '"]'),
                                    i = {};
                                c.filter("[data-lightview-group-options]").each(function (a, c) {
                                    b.extend(i, eval("({" + (b(c).attr("data-lightview-group-options") || "") + "})"))
                                }), c.each(function (e, t) {
                                    !h && t == a && (h = e + 1), g.push(new F(t, b.extend({}, i, d)))
                                })
                            }
                        } else i = {}, a && a.nodeType == 1 && b(a).is("[data-lightview-group-options]") && (b.extend(i, eval("({" + (b(a).attr("data-lightview-group-options") || "") + "})")), c = new F(a, b.extend({}, i, d))), g.push(c);
                        break;
                    case "array":
                        b.each(a, function (e, t) {
                            var n = new F(t, d);
                            g.push(n)
                        })
                }
                if (!h || h < 1) h = 1;
                h > g.length && (h = g.length), e.load(g, h, {
                    initialDimensionsOnly: !0
                }), e.show(function () {
                    e.setPosition(h)
                })
            },
            hide: function () {
                return e.hide(), this
            },
            play: function (t) {
                return e.play(t), this
            },
            stop: function () {
                return e.stop(), this
            },
            refresh: function () {
                return e.refresh(), this
            },
            setDefaultSkin: function (t) {
                return e.setDefaultSkin(t), this
            }
        }
    }()), j.Lightview = Lightview, b(document).ready(function () {
        Lightview.init()
    })
})(jQuery, window)