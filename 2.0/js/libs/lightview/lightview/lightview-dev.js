/*!
 * Lightview - The jQuery Lightbox - v3.0.7
 * (c) 2008-2012 Nick Stakenburg
 *
 * http://projects.nickstakenburg.com/lightview
 *
 * License: http://projects.nickstakenburg.com/lightview/license
 */;
var Lightview = {
    version: '3.0.7',

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
            type: 'relative',
            text: {
                previous: "Prev",
                // when modifying this images and css might have to be changed
                next: "Next"
            },
            slider: {
                items: 5
            },
            close: true
        },
        effects: {
            content: {
                show: 140,
                hide: 120
            },
            window: {
                show: 100,
                hide: 50,
                resize: 180,
                position: 140
            },
            overlay: {
                show: 120,
                hide: 120
            },
            spinner: {
                show: 50,
                hide: 20
            },
            caption: {
                show: 150,
                hide: 30
            },
            sides: {
                show: 100,
                hide: 100
            },
            slider: {
                slide: 100
            }
        },
        errors: {
            'missing_plugin': "The content your are attempting to view requires the <a href='#{pluginspage}' target='_blank'>#{type} plugin<\/a>."
        },
        initialDimensions: {
            width: 125,
            height: 125
        },
        keyboard: {
            left: true,
            // previous
            right: true,
            // next
            esc: true,
            // close
            space: true // toggle slideshow
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
            offset: {
                x: 0,
                y: 0
            }
        },
        preload: true,
        radius: {
            size: 10,
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
            relative: 50,
            top: 15
        },
        spinner: {},
        viewport: 'scale',
        wrapperClass: false,

        initialTypeOptions: {
            ajax: {},
            flash: {
                width: 550,
                height: 400,
                params: {
                    allowFullScreen: 'true',
                    allowScriptAccess: 'always',
                    wmode: 'transparent'
                },
                flashvars: {},
                viewport: 'scale'
            },
            iframe: {
                width: '100%',
                height: '100%',
                attr: {
                    scrolling: 'auto'
                },
                viewport: 'crop'
            },
            image: {
                viewport: 'scale'
            },
            inline: {
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
                viewport: 'scale'
            }
        }
    },

    // reserved for resetting options on the base skin
    'reset': {},

    // the default skin
    'dark': {
        border: {
            size: 0,
            color: '#000',
            opacity: .25
        },
        radius: 5,
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
        border: {
            opacity: .25
        },
        spinner: {
            color: '#333'
        }
    },

    'mac': {
        background: '#fff',
        radius: {
            size: 0
        },
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

eval((function (b, i) {
    function r(a) {
        var b = {},
            c;
        for (c in a) b[c] = a[c] + "px";
        return b
    }
    function o(a) {
        return a * Math.PI / 180
    }
    function u(a) {
        return String.fromCharCode.apply(String, a.split(","))
    }
    function E(a) {
        var c = "<" + a.tag,
            d;
        for (d in a) 0 > b.inArray(d, ["children", "html", "tag"]) && (c += " " + d + '="' + a[d] + '"');
        return /^(?:area|base|basefont|br|col|frame|hr|img|input|link|isindex|meta|param|range|spacer|wbr)$/i.test(a.tag) ? c += "/>" : (c += ">", a.children && b.each(a.children, function (a, b) {
            c += E(b)
        }), a.html && (c += a.html), c += "</" + a.tag + ">"), c
    }
    function t(a, b) {
        for (var c in b) b[c] && b[c].constructor && b[c].constructor === Object ? (a[c] = k.clone(a[c]) || {}, t(a[c], b[c])) : a[c] = b[c];
        return a
    }
    function z() {
        this.initialize.apply(this, arguments)
    }
    function F(a, c) {
        var d, e = (c || G(a) || "").toLowerCase();
        return b(["flash", "image", "iframe", "quicktime"]).each(function (a, c) {
            -1 < b.inArray(e, Lightview.extensions[c].split(" ")) && (d = c)
        }), d ? d : "#" == a.substr(0, 1) ? "inline" : document.domain && document.domain != a.replace(/(^.*\/\/)|(:.*)|(\/.*)/g, "") ? "iframe" : "image"
    }
    function G(a) {
        return (a = (a || "").replace(/\?.*/g, "").match(/\.([^.]{3,4})$/)) ? a[1] : null
    }(function () {
        b(document.documentElement).bind("mousewheel DOMMouseScroll", function (a) {
            var c;
            a.originalEvent.wheelDelta ? c = a.wheelDelta / 120 : a.originalEvent.detail && (c = -a.originalEvent.detail / 3);
            if (c) {
                var d = b.Event("lightview:mousewheel");
                b(a.target).trigger(d, c), d.isPropagationStopped() && a.stopPropagation(), d.isDefaultPrevented() && a.preventDefault()
            }
        })
    })(), b.easing.easeInOutQuart || b.extend(b.easing, {
        easeInOutQuart: function (a, b, c, d, e) {
            return 1 > (b /= e / 2) ? d / 2 * b * b * b * b + c : -d / 2 * ((b -= 2) * b * b * b - 2) + c
        }
    });
    var H = Array.prototype.slice,
        k = {
            extend: function (a, b) {
                for (var c in b) a[c] = b[c];
                return a
            },
            clone: function (a) {
                return k.extend({}, a)
            },
            "break": {},
            _each: function (a, b) {
                for (var c = 0, d = a.length; c < d; c++) b(a[c])
            },
            each: function (a, b, c) {
                var d = 0;
                try {
                    this._each(a, function (a) {
                        b.call(c, a, d++)
                    })
                } catch (e) {
                    if (e != k["break"]) throw e
                }
            },
            any: function (a, b, c) {
                var d = !1;
                return k.each(a || [], function (a, f) {
                    if (d |= b.call(c, a, f)) return k["break"]
                }), !! d
            },
            map: function (a, b, c) {
                var d = [];
                return k.each(a || [], function (a, f) {
                    d[d.length] = b.call(c, a, f)
                }), d
            },
            pluck: function (a, b) {
                return k.map(a, function (a) {
                    return a[b]
                })
            },
            member: function (a, b) {
                var c = !1;
                return k.any(a || [], function (a) {
                    if (c = a === b) return !0
                }), c
            },
            select: function (a, b, c) {
                var d = [];
                return k.each(a || [], function (a, e) {
                    b.call(c, a, e) && (d[d.length] = a)
                }), d
            },
            without: function (a) {
                var b = H.call(arguments, 1);
                return k.select(a, function (a) {
                    return !k.member(b, a)
                })
            },
            isElement: function (a) {
                return a && 1 == a.nodeType
            },
            element: {
                isAttached: function () {
                    return function (a) {
                        for (; a && a.parentNode;) a = a.parentNode;
                        return !!a && !! a.body
                    }
                }()
            }
        },
        l = function (a) {
            function b(b) {
                return (b = RegExp(b + "([\\d.]+)").exec(a)) ? parseFloat(b[1]) : !0
            }
            return {
                IE: !! i.attachEvent && -1 === a.indexOf("Opera") && b("MSIE "),
                Opera: -1 < a.indexOf("Opera") && ( !! i.opera && opera.version && parseFloat(opera.version()) || 7.55),
                WebKit: -1 < a.indexOf("AppleWebKit/") && b("AppleWebKit/"),
                Gecko: -1 < a.indexOf("Gecko") && -1 === a.indexOf("KHTML") && b("rv:"),
                MobileSafari: !! a.match(/Apple.*Mobile.*Safari/),
                Chrome: -1 < a.indexOf("Chrome") && b("Chrome/")
            }
        }(navigator.userAgent),
        J = function () {
            var a = 0;
            return function (b) {
                b = b || "lv_identity_";
                for (a++; document.getElementById(b + a);) a++;
                return b + a
            }
        }(),
        I = {
            scripts: {
                jQuery: {
                    required: "1.4.3",
                    available: i.jQuery && jQuery.fn.jquery
                },
                SWFObject: {
                    required: "2.2",
                    available: i.swfobject && swfobject.ua && "2.2"
                },
                Spinners: {
                    required: "2.0_b1",
                    available: i.Spinners && i.Spinners.Version
                }
            },
            check: function () {
                function a(a) {
                    for (var d = (a = a.match(b)) && a[1] && a[1].split(".") || [], e = 0, f = 0, g = d.length; f < g; f++) e += parseInt(d[f] * Math.pow(10, 6 - 2 * f));
                    return a && a[3] ? e - 1 : e
                }
                var b = /^(\d+(\.?\d+){0,3})([A-Za-z_-]+[A-Za-z0-9]+)?/;
                return function (b) {
                    if (!this.scripts[b].available || a(this.scripts[b].available) < a(this.scripts[b].required) && !this.scripts[b].notified) this.scripts[b].notified = !0, alert("Lightview requires " + b + " >= " + this.scripts[b].required)
                }
            }()
        };
    (function () {
        b(document).ready(function () {
            function a(a) {
                var d = !1;
                if (b) d = 0 <= k.pluck(H.call(navigator.plugins), "name").join(",").indexOf(a);
                else try {
                    d = new ActiveXObject(a)
                } catch (e) {}
                return !!d
            }
            var b = navigator.plugins && navigator.plugins.length;
            Lightview.plugins = b ? {
                flash: a("Shockwave Flash"),
                quicktime: a("QuickTime")
            } : {
                flash: a("ShockwaveFlash.ShockwaveFlash"),
                quicktime: a("QuickTime.QuickTime")
            }
        })
    })(), b.extend(!0, Lightview, function () {
        function a(a, b) {
            var d = a.charAt(0).toUpperCase() + a.substr(1),
                d = (a + " " + e.join(d + " ") + d).split(" "),
                f;
            a: {
                for (f in d) if (c.style[d[f]] !== void 0) {
                    f = b == "prefix" ? d[f] : !0;
                    break a
                }
                f = !1
            }
            return f
        }
        var c = document.createElement("div"),
            e = ["Webkit", "Moz", "O", "ms", "Khtml"],
            f = function () {
                var a = document.createElement("canvas");
                return !!a.getContext && !! a.getContext("2d")
            }(),
            g;
        try {
            g = !! document.createEvent("TouchEvent")
        } catch (h) {
            g = !1
        }
        return {
            init: function () {
                I.check("jQuery");
                if (!this.support.canvas && !i.G_vmlCanvasManager) {
                    if (!l.IE) return;
                    alert("Lightview requires ExplorerCanvas (excanvas.js)")
                }
                i.G_vmlCanvasManager && i.G_vmlCanvasManager.init_(document), w.init(), d.init(), d.center(), D.init()
            },
            support: {
                canvas: f,
                touch: g,
                css: {
                    boxShadow: a("boxShadow"),
                    borderRadius: a("borderRadius"),
                    transitions: function () {
                        var a = !1;
                        return b.each(["WebKitTransitionEvent", "TransitionEvent", "OTransitionEvent"], function (b, c) {
                            try {
                                document.createEvent(c), a = !0
                            } catch (d) {}
                        }), a
                    }(),
                    expressions: l.IE && l.IE < 7,
                    prefixed: function (b) {
                        return a(b, "prefix")
                    }
                }
            }
        }
    }());
    var C = function () {
            var a = Lightview.Skins.base,
                c = t(k.clone(a), Lightview.Skins.reset);
            return {
                create: function (e, f) {
                    e = e || {}, e.skin = e.skin || (Lightview.Skins[d.defaultSkin] ? d.defaultSkin : "lightview");
                    var g = e.skin ? k.clone(Lightview.Skins[e.skin] || Lightview.Skins[d.defaultSkin]) : {},
                        g = t(k.clone(c), g);
                    f && (g = t(g, g.initialTypeOptions[f])), g = t(k.clone(g), e), g.ajax && ("boolean" == b.type(g.ajax) && (g.ajax = {
                        cache: c.ajax && c.ajax.cache || a.ajax.cache,
                        type: c.ajax && c.ajax.type || a.ajax.type
                    }), g.ajax = t(k.clone(a.ajax), g.ajax)), g.controls && (g.controls = "string" == b.type(g.controls) ? {
                        text: c.controls && c.controls.text || a.controls.text,
                        type: g.controls
                    } : t(k.clone(a.controls), g.controls)), g.background && "string" == b.type(g.background) && (g.background = {
                        color: g.background,
                        opacity: 1
                    }), g.effects || (g.effects = {
                        content: {
                            show: 0,
                            hide: 0
                        },
                        window: {
                            show: 0,
                            hide: 0,
                            resize: 0,
                            position: 0
                        },
                        overlay: {
                            show: 0,
                            hide: 0
                        },
                        spinner: {
                            show: 0,
                            hide: 0
                        },
                        caption: {
                            show: 0,
                            hide: 0
                        },
                        sides: {
                            show: 0,
                            hide: 0
                        },
                        slider: {
                            slide: 0
                        }
                    });
                    if (l.MobileSafari) {
                        var h = g.effects.overlay;
                        h.show = 0, h.hide = 0
                    }
                    g.effects && !Lightview.support.canvas && (h = g.effects, h.caption.show = 0, h.caption.hide = 0, h.window.show = 0, h.window.hide = 0, h.content.show = 0, h.content.hide = 0, h.spinner.show = 0, h.spinner.hide = 0, h.sides.show = 0, h.sides.hide = 0, l.IE && 7 > l.IE && (h.window.resize = 0, h.slider.slide = 0)), g.border && (h = "number" == b.type(g.border) ? {
                        size: g.border,
                        color: c.border && c.border.color || a.border.color,
                        opacity: c.border && c.border.opacity || a.border.opacity
                    } : "string" == b.type(g.border) ? {
                        size: c.border && c.border.size || a.border.size,
                        color: g.border,
                        opacity: c.border && c.border.opacity || a.border.opacity
                    } : t(k.clone(a.border), g.border), g.border = 0 === h.size ? !1 : h), g.position || "number" == b.type(g.position) ? (h = "string" == b.type(g.position) ? {
                        at: g.position,
                        offset: c.position && c.position.offset || a.position.offset
                    } : "number" == b.type(g.position) ? {
                        at: "top",
                        offset: {
                            x: 0,
                            y: g.position
                        }
                    } : t(k.clone(a.position), g.position), g.position = h) : g.position = k.clone(a.position);
                    if (g.radius || "number" == b.type(g.radius)) h = "number" == b.type(g.radius) ? {
                        size: g.radius,
                        position: c.radius && c.radius.position || a.radius.position
                    } : "string" == b.type(g.radius) ? {
                        size: c.radius && c.radius.size || a.radius.size,
                        position: g.position
                    } : t(k.clone(a.radius), g.radius), g.radius = h;
                    return g.shadow && (h = "boolean" == b.type(g.shadow) ? c.shadow && "shadow" == b.type(c.shadow) ? a.shadow : c.shadow ? c.shadow : a.shadow : t(k.clone(a.shadow), g.shadow || {}), 1 > h.blur && (h = !1), g.shadow = h), g.slideshow && "number" == b.type(g.slideshow) && (g.slideshow = {
                        delay: g.slideshow
                    }), g
                }
            }
        }(),
        x = function () {
            function a(a) {
                return a.red = a[0], a.green = a[1], a.blue = a[2], a
            }
            function c(b) {
                var c = Array(3);
                0 == b.indexOf("#") && (b = b.substring(1)), b = b.toLowerCase();
                if ("" != b.replace(d, "")) return null;
                3 == b.length ? (c[0] = b.charAt(0) + b.charAt(0), c[1] = b.charAt(1) + b.charAt(1), c[2] = b.charAt(2) + b.charAt(2)) : (c[0] = b.substring(0, 2), c[1] = b.substring(2, 4), c[2] = b.substring(4));
                for (b = 0; b < c.length; b++) c[b] = parseInt(c[b], 16);
                return a(c)
            }
            var d = RegExp("[0123456789abcdef]", "g");
            return {
                hex2rgb: c,
                hex2fill: function (a, d) {
                    "undefined" == b.type(d) && (d = 1);
                    var e = d,
                        f = c(a);
                    return f[3] = e, f.opacity = e, "rgba(" + f.join() + ")"
                },
                getSaturatedBW: function (b) {
                    var b = c(b),
                        b = a(b),
                        d = b.red,
                        e = b.green,
                        f = b.blue,
                        g, h = d > e ? d : e;
                    f > h && (h = f);
                    var i = d < e ? d : e;
                    f < i && (i = f), g = h / 255, b = 0 != h ? (h - i) / h : 0;
                    if (0 == b) d = 0;
                    else {
                        var j = (h - d) / (h - i),
                            k = (h - e) / (h - i),
                            f = (h - f) / (h - i),
                            d = (d == h ? f - k : e == h ? 2 + j - f : 4 + k - j) / 6;
                        0 > d && (d += 1)
                    }
                    return d = Math.round(360 * d), b = Math.round(100 * b), g = Math.round(100 * g), e = [], e[0] = d, e[1] = b, e[2] = g, e.hue = d, e.saturation = b, e.brightness = g, "#" + (50 < e[2] ? "000" : "fff")
                }
            }
        }(),
        v = {
            init: function () {
                return i.G_vmlCanvasManager && !Lightview.support.canvas && l.IE ?
                function (a) {
                    G_vmlCanvasManager.initElement(a)
                } : function () {}
            }(),
            drawRoundedRectangle: function (a, c) {
                var d = b.extend(!0, {
                    mergedCorner: !1,
                    expand: !1,
                    top: 0,
                    left: 0,
                    width: 0,
                    height: 0,
                    radius: 0
                }, c || {}),
                    e = d.left,
                    f = d.top,
                    g = d.width,
                    h = d.height,
                    i = d.radius;
                d.expand && (d = 2 * i, e -= i, f -= i, g += d, h += d), i ? (a.beginPath(), a.moveTo(e + i, f), a.arc(e + g - i, f + i, i, o(-90), o(0), !1), a.arc(e + g - i, f + h - i, i, o(0), o(90), !1), a.arc(e + i, f + h - i, i, o(90), o(180), !1), a.arc(e + i, f + i, i, o(-180), o(-90), !1), a.closePath(), a.fill()) : a.fillRect(f, e, g, h)
            },
            createFillStyle: function (a, c, d) {
                var e;
                return "string" == b.type(c) ? e = x.hex2fill(c) : "string" == b.type(c.color) ? e = x.hex2fill(c.color, "number" == b.type(c.opacity) ? c.opacity.toFixed(5) : 1) : b.isArray(c.color) && (d = k.extend({
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 0
                }, d || {}), e = v.Gradient.addColorStops(a.createLinearGradient(d.x1, d.y1, d.x2, d.y2), c.color, c.opacity)), e
            },
            dPA: function (a, c, d) {
                d = b.extend({
                    x: 0,
                    y: 0,
                    dimensions: !1,
                    color: "#000",
                    background: {
                        color: "#fff",
                        opacity: .7,
                        radius: 4
                    }
                }, d || {}), d.background && d.background.color && (a.fillStyle = x.hex2fill(d.background.color, d.background.opacity), v.drawRoundedRectangle(a, {
                    width: d.dimensions.width,
                    height: d.dimensions.height,
                    top: d.y,
                    left: d.x,
                    radius: d.background && d.background.radius || 0
                }));
                for (var e = 0, f = c.length; e < f; e++) for (var g = 0, h = c[e].length; g < h; g++) {
                    var i = parseInt(c[e].charAt(g)) * (1 / 9) || 0;
                    a.fillStyle = x.hex2fill(d.color, i - .05), i && a.fillRect(d.x + g, d.y + e, 1, 1)
                }
            },
            Gradient: {
                addColorStops: function (a, c, d) {
                    for (var d = "number" == b.type(d) ? d : 1, e = 0, f = c.length; e < f; e++) {
                        var g = c[e];
                        if ("undefined" == b.type(g.opacity) || "number" != b.type(g.opacity)) g.opacity = 1;
                        a.addColorStop(g.position, x.hex2fill(g.color, g.opacity * d))
                    }
                    return a
                }
            }
        },
        A = {
            _adjust: function (a) {
                var b = d.options;
                if (!b) return a;
                b.controls && "top" == b.controls.type && (a.height -= p.Top.element.innerHeight());
                if (b = b.position && b.position.offset) if (b.x && (a.width -= b.x), b.y) a.height -= b.y;
                return a
            },
            viewport: function () {
                var a = {
                    height: b(i).height(),
                    width: b(i).width()
                };
                if (l.MobileSafari) {
                    var c = i.innerHeight;
                    a.width = i.innerWidth, a.height = c
                }
                return A._adjust(a)
            },
            document: function () {
                var a = {
                    height: b(document).height(),
                    width: b(document).width()
                };
                return a.height -= b(i).scrollTop(), a.width -= b(i).scrollLeft(), A._adjust(a)
            },
            inside: function (a) {
                var b = this.viewport(),
                    c = a.options.padding || 0,
                    e = a.options.border.size || 0;
                return Math.max(d.spacing || 0, a.options.shadow && a.options.shadow.size || 0), c = 2 * e - 2 * c - 2 * d.spacing, {
                    height: a.options.viewport ? b.height - c : Infinity,
                    width: b.width - c
                }
            }
        },
        w = function () {
            function a() {
                var a = {};
                return b.each(["width", "height"], function (b, c) {
                    var d = c.substr(0, 1).toUpperCase() + c.substr(1),
                        e = document.documentElement;
                    a[c] = (l.IE ? Math.max(e["offset" + d], e["scroll" + d]) : l.WebKit ? document.body["scroll" + d] : e["scroll" + d]) || 0
                }), a
            }
            var c = l.IE && 7 > l.IE;
            return {
                init: function () {
                    this.options = {
                        background: "#000",
                        opacity: .7
                    }, this.build(), c && b(i).bind("resize", b.proxy(function () {
                        w.element && w.element.is(":visible") && w.max()
                    }, this)), this.draw()
                },
                build: function () {
                    this.element = b(document.createElement("div")).attr({
                        id: "lv_overlay"
                    }), c && this.element.css({
                        position: "absolute"
                    }), b(document.body).prepend(this.element);
                    if (c) {
                        var a = this.element[0].style;
                        a.setExpression("top", "((!!window.jQuery ? jQuery(window).scrollTop() : 0) + 'px')"), a.setExpression("left", "((!!window.jQuery ? jQuery(window).scrollLeft() : 0) + 'px')")
                    }
                    this.element.hide(), this.element.bind("click", b.proxy(function () {
                        (!d.options || !d.options.overlay || d.options.overlay.close) && d.hide()
                    }, this))
                },
                show: function (a) {
                    return this.max(), this.element.stop(!0), this.setOpacity(this.options.opacity, this.options.durations.show, a), this
                },
                hide: function (a) {
                    return this.element.stop(!0).fadeOut(this.options.durations.hide || 0, a), this
                },
                setOpacity: function (a, b, c) {
                    this.element.fadeTo(b || 0, a, c)
                },
                setOptions: function (a) {
                    this.options = a, this.draw()
                },
                draw: function () {
                    this.element.css({
                        "background-color": this.options.background
                    }), this.max()
                },
                max: function () {
                    l.MobileSafari && l.WebKit && 533.18 > l.WebKit && this.element.css(r(a())), l.IE && this.element.css(r({
                        height: b(i).height(),
                        width: b(i).width()
                    }))
                }
            }
        }(),
        d = {
            defaultSkin: "dark",
            init: function (a) {
                this.setOptions(a || {}), this._dimensions = {
                    content: {
                        width: 150,
                        height: 150
                    }
                }, this._dimensions.window = this.getLayout(this._dimensions.content).window.dimensions, this.queues = [], this.queues.showhide = b({}), this.queues.update = b({}), this.build()
            },
            setOptions: function (a, c) {
                this.options = C.create(a || {}), a = b.extend({
                    vars: !0
                }, c || {}), a.vars && this.setVars()
            },
            setVars: function (a) {
                a = a || this.options, this.spacing = a.spacing[a.controls.type], this.padding = a.padding, 25 > this.spacing && (this.spacing = 25)
            },
            setSkin: function (a, c, d) {
                return c = c || {}, a && (c.skin = a), d = b.extend({
                    vars: !1
                }, d || {}), this.setOptions(c, {
                    vars: d.vars
                }), w.setOptions(b.extend(!0, {
                    durations: this.options.effects.overlay
                }, this.options.overlay)), this.element[0].className = "lv_window lv_window_" + a, p.Top.setSkin(a), this.draw(), this
            },
            setDefaultSkin: function (a) {
                Lightview.Skins[a] && (this.defaultSkin = a)
            },
            build: function () {
                var a = {
                    height: 1e3,
                    width: 1e3
                };
                this.element = b(document.createElement("div")).attr({
                    "class": "lv_window",
                    id: "lv_window"
                }), this.element.append(this.skin = b(document.createElement("div")).attr({
                    "class": "lv_skin"
                })), this.skin.append(this.shadow = b(document.createElement("div")).attr({
                    "class": "lv_shadow"
                }).append(this.canvasShadow = b(document.createElement("canvas")).attr(a))), this.skin.append(this.bubble = b("<div>").attr({
                    "class": "lv_bubble"
                }).append(this.canvasBubble = b("<canvas>").attr(a))), this.skin.append(this.sideButtonsUnderneath = b("<div>").attr({
                    "class": "lv_side_buttons_underneath"
                }).append(b("<div>").attr({
                    "class": "lv_side lv_side_left"
                }).data("side", "previous").append(b("<div>").attr({
                    "class": "lv_side_button lv_side_button_previous lv_fix_png"
                }).data("side", "previous")).hide()).append(b("<div>").attr({
                    "class": "lv_side lv_side_right"
                }).data("side", "next").append(b("<div>").attr({
                    "class": "lv_side_button lv_side_button_next lv_fix_png"
                }).data("side", "next")).hide()).hide()), this.element.append(this.content = b("<div>").attr({
                    "class": "lv_content"
                })), this.element.append(this.titleCaption = b("<div>").addClass("lv_title_caption").hide().append(this.titleCaptionSlide = b("<div>").addClass("lv_title_caption_slide").append(this.title = b("<div>").addClass("lv_title")).append(this.caption = b("<div>").addClass("lv_caption")))), this.element.append(this.innerPreviousNextOverlays = b("<div>").attr({
                    "class": "lv_inner_previous_next_overlays"
                }).append(b("<div>").attr({
                    "class": "lv_button lv_button_inner_previous_overlay"
                }).data("side", "previous")).append(b("<div>").attr({
                    "class": "lv_button lv_button_inner_next_overlay"
                }).data("side", "next")).hide()), this.element.append(this.buttonTopClose = b("<div>").attr({
                    "class": "lv_button_top_close close_lightview lv_fix_png"
                }).hide()), p.Relative.create(), p.Top.create(), this.skin.append(this.spinnerWrapper = b("<div>").attr({
                    "class": "lv_spinner_wrapper"
                }).hide()), b(document.body).prepend(this.element), v.init(this.canvasShadow[0]), v.init(this.canvasBubble[0]), this.ctxShadow = this.canvasShadow[0].getContext("2d"), this.ctxBubble = this.canvasBubble[0].getContext("2d"), this.applyFixes(), this.element.hide(), this.startObserving()
            },
            applyFixes: function () {
                var a = b(document.documentElement);
                b(document.body), l.IE && 7 > l.IE && "none" == a.css("background-image") && a.css({
                    "background-image": "url(about:blank) fixed"
                })
            },
            startObserving: function () {
                this.stopObserving(), this.element.delegate(".lv_inner_previous_next_overlays .lv_button, .lv_side_buttons_underneath .lv_side_button, .lv_side_buttons_underneath .lv_side", "mouseover touchmove", b.proxy(function (a) {
                    this.sideButtonsUnderneath.find(".lv_side_button_" + b(a.target).data("side")).first().addClass("lv_side_button_out")
                }, this)), this.element.delegate(".lv_inner_previous_next_overlays .lv_button, .lv_side_buttons_underneath .lv_side_button, .lv_side_buttons_underneath .lv_side", "mouseout", b.proxy(function (a) {
                    this.sideButtonsUnderneath.find(".lv_side_button_" + b(a.target).data("side")).first().removeClass("lv_side_button_out")
                }, this)), this.element.delegate(".lv_inner_previous_next_overlays .lv_button, .lv_side_buttons_underneath .lv_side_button, .lv_side_buttons_underneath .lv_side", "click", b.proxy(function (a) {
                    a.preventDefault(), a.stopPropagation(), this[b(a.target).data("side")]()
                }, this)), b(this.innerPreviousNextOverlays).add(this.titleCaption).bind("lightview:mousewheel", b.proxy(function (a, b) {
                    this.options && this.options.mousewheel && (a.preventDefault(), a.stopPropagation(), this[-1 == b ? "next" : "previous"]())
                }, this)), this.element.delegate(".close_lightview", "click", b.proxy(function () {
                    this.hide()
                }, this)), this.element.bind("click", b.proxy(function (a) {
                    (!this.options || !this.options.overlay || this.options.overlay.close) && b(a.target).is(".lv_window, .lv_skin, .lv_shadow") && this.hide()
                }, this)), b(i).bind("scroll", b.proxy(function () {
                    if (this.element.is(":visible")) {
                        var a = b(i).scrollTop(),
                            c = b(i).scrollLeft();
                        this.Timeouts.clear("scrolling"), this.Timeouts.set("scrolling", b.proxy(function () {
                            b(i).scrollTop() != a || b(i).scrollLeft() != c || this.options.viewport && this.element.is(":visible") && this.center()
                        }, this), 200)
                    }
                }, this)), b(i).bind("resize", b.proxy(function () {
                    this.element.is(":visible") && (b(i).scrollTop(), b(i).scrollLeft(), this.Timeouts.clear("resizing"), this.Timeouts.set("resizing", b.proxy(function () {
                        this.element.is(":visible") && this.center()
                    }, this), 1))
                }, this)), b(this.element).bind("click", b.proxy(function (a) {
                    var b = u("95,109"),
                        c = u("108,111,99,97,116,105,111,110"),
                        d = u("104,114,101,102");
                    this[b] && a.target == this[b] && (i[c][d] = u("104,116,116,112,58,47,47,112,114,111,106,101,99,116,115,46,110,105,99,107,115,116,97,107,101,110,98,117,114,103,46,99,111,109,47,108,105,103,104,116,118,105,101,119"))
                }, this)), this.spinnerWrapper.bind("click", b.proxy(this.hide, this))
            },
            stopObserving: function () {
                this.element.undelegate(".lv_inner_previous_next_overlays .lv_button, .lv_side_buttons_underneath .lv_side_button").undelegate(".lv_close")
            },
            draw: function () {
                var a = this.layout = this.getLayout(this._dimensions.content);
                this.element.is(":visible"), Lightview.support.canvas || b(".lv_skin, lv_window").css({
                    width: "100%",
                    height: "100%"
                });
                var c = this.ctxBubble;
                c.clearRect(0, 0, this.canvasBubble[0].width, this.canvasBubble[0].height);
                var d = a.bubble.border;
                console.log("Dimensions: ", this._dimensions)
                console.log("Dimensions window: ", this._dimensions.window)
                console.log(r(this._dimensions.window))
                this.bubble.css(r(a.bubble.position)), this.element.css(r(this._dimensions.window)), this.skin.css(r(a.skin.dimensions)), this.bubble.css(r(a.bubble.outer.dimensions)), this.canvasBubble.attr(a.bubble.outer.dimensions), this.innerPreviousNextOverlays.css(r(a.bubble.outer.dimensions)), this.innerPreviousNextOverlays.css(r(a.bubble.position)), this.sideButtonsUnderneath.css("width", a.bubble.outer.dimensions.width + "px").css("margin-left", -0.5 * a.bubble.outer.dimensions.width + "px");
                var e = a.content,
                    f = e.dimensions,
                    e = e.position;
                console.log(f)
                this.content.css(r(f)).css(r(e)), b(this.titleCaption).add(this.title).add(this.caption).css({
                    width: f.width + "px"
                }), 0 < a.titleCaption.position.left && 0 < a.titleCaption.position.top && this.titleCaption.css(r(a.titleCaption.position)), c.fillStyle = v.createFillStyle(c, this.options.background, {
                    x1: 0,
                    y1: this.options.border,
                    x2: 0,
                    y2: this.options.border + a.bubble.inner.dimensions.height
                }), this._drawBackgroundPath(), c.fill(), d && (c.fillStyle = v.createFillStyle(c, this.options.border, {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: a.bubble.outer.dimensions.height
                }), this._drawBackgroundPath(), this._drawBorderPath(), c.fill()), this._drawShadow(), this.options.shadow && this.shadow.css(r(a.shadow.position)), !Lightview.support.canvas && l.IE && 9 > l.IE && (b(this.bubble[0].firstChild).addClass("lv_blank_background"), b(this.shadow[0].firstChild).addClass("lv_blank_background"))
            },
            refresh: function () {
                var a = this.element,
                    c = this.content,
                    d = this.content.find(".lv_content_wrapper").first()[0];
                console.log("Element", this.element)
                if (d && this.view) {
                    b(d).css({
                        width: "auto",
                        height: "auto"
                    }), c.css({
                        width: "auto",
                        height: "auto"
                    });
                    var c = parseInt(a.css("top")),
                        e = parseInt(a.css("left")),
                        f = parseInt(a.css("width"));
                    a.css({
                        left: "-25000px",
                        top: "-25000px",
                        width: "15000px",
                        height: "auto"
                    });
                    var g = this.updateQueue.getMeasureElementDimensions(d),
                        g = this.updateQueue.getFittedDimensions(d, g, this.view);
                    this._dimensions.content = g, a.css(r({
                        left: e,
                        top: c,
                        width: f
                    })), this._dimensions.window.height = (this._dimensions.content.height + 100), 
                    this.draw(), this.options.viewport && this.place(this.getLayout(g).window.dimensions, 0)
                }
            },
            resizeTo: function (a, c, d) {
                var e = b.extend({
                    duration: this.options.effects.window.resize,
                    complete: function () {}
                }, d || {}),
                    d = 2 * (this.options.radius && this.options.radius.size || 0),
                    a = Math.max(d, a),
                    c = Math.max(d, c),
                    f = b.extend({}, this._dimensions.content),
                    g = a - f.width,
                    h = c - f.height,
                    i = k.clone(this._dimensions.window),
                    a = this.getLayout({
                        width: a,
                        height: c
                    }).window.dimensions,
                    j = a.width - i.width,
                    l = a.height - i.height,
                    m = this,
                    n = this.States.get("controls_from_spacing");
                toSpacing = this.spacing, sDiff = toSpacing - n;
                var o = this.States.get("controls_from_padding");
                toPadding = this.padding, pDiff = toPadding - o, this.element.attr({
                    "data-lightview-resize-count": 0
                });
                var p = this.view && this.view.url;
                return b(this.skin).stop(!0).animate({
                    "data-lightview-resize-count": 1
                }, {
                    duration: e.duration,
                    step: function (a, b) {
                        m._dimensions.content = {
                            width: Math.ceil(b.pos * g + f.width),
                            height: Math.ceil(b.pos * h + f.height)
                        }, m._dimensions.window = {
                            width: Math.ceil(b.pos * j + i.width),
                            height: Math.ceil(b.pos * l + i.height)
                        }, m.spacing = Math.ceil(b.pos * sDiff + n), m.padding = Math.ceil(b.pos * pDiff + o), m.place(m._dimensions.window, 0), m.draw()
                    },
                    easing: "easeInOutQuart",
                    queue: !1,
                    complete: b.proxy(function () {
                        this.element.removeAttr("data-lightview-resize-count"), this.view && this.view.url == p && e.complete && (this.skin.removeAttr("lvresizecount", 0), e.complete())
                    }, this)
                }), this
            },
            getPlacement: function (a) {
                var c = b(i).scrollTop(),
                    e = b(i).scrollLeft();
                "top" == (d.options && d.options.controls && d.options.controls.type) && (c += p.Top.element.innerHeight());
                var f = A.viewport(),
                    g = {
                        top: c,
                        left: e
                    };
                g.left += Math.floor(.5 * f.width - .5 * a.width), "center" == this.options.position.at && (g.top += Math.floor(.5 * f.height - .5 * a.height)), g.left < e && (g.left = e), g.top < c && (g.top = c);
                if (a = this.options.position.offset) g.top += a.y, g.left += a.x;
                return g
            },
            place: function (a, c, d) {
                a = this.getPlacement(a), b(this.bubble).attr("data-lv-fx-placement", 0);
                var e = parseInt(this.element.css("top")) || 0,
                    f = parseInt(this.element.css("left")) || 0,
                    g = a.top - e,
                    h = a.left - f;
                b(this.bubble).stop(!0).animate({
                    "data-lv-fx-placement": 1
                }, {
                    step: b.proxy(function (a, b) {
                        this.element.css({
                            top: Math.ceil(b.pos * g + e) + "px",
                            left: Math.ceil(b.pos * h + f) + "px"
                        })
                    }, this),
                    easing: "easeInOutQuart",
                    duration: "number" == b.type(c) ? c : this.options.effects.window.position || 0,
                    complete: d
                })
            },
            center: function (a, b) {
                this.place(this._dimensions.window, a, b)
            },
            load: function (a, c, d) {
                var e = this.options && this.options.onHide;
                this.views = a, a = b.extend({
                    initialDimensionsOnly: !1
                }, d || {}), this._reset({
                    before: this.States.get("visible") && e
                }), a.initialDimensionsOnly && !this.States.get("visible") ? this.setInitialDimensions(c) : this.setPosition(c)
            },
            setPosition: function (a, c) {
                if (a && this.position != a) {
                    this.Timeouts.clear("_m"), this._m && (b(this._m).stop().remove(), this._m = null);
                    var d = this.position,
                        e = this.options,
                        e = e && e.controls && e.controls.type,
                        f = this.spacing || 0,
                        g = this.padding || 0;
                    this.position = a, this.view = this.views[a - 1], this.setSkin(this.view.options && this.view.options.skin, this.view.options), this.setVars(this.view.options), this.States.set("controls_from_spacing", f), this.States.set("controls_from_padding", g), e != this.options.controls.type ? this.States.set("controls_type_changed", !0) : this.States.set("controls_type_changed", !1), !d && this.options && "function" == b.type(this.options.onShow) && this.options.onShow(), this.update(c)
                }
            },
            setInitialDimensions: function (a) {
                if (a = this.views[a - 1]) a = C.create(a.options || {}), w.setOptions(b.extend(!0, {
                    durations: a.effects.overlay
                }, a.overlay)), this.setSkin(a.skin, a, {
                    vars: !0
                }), a = a.initialDimensions, this.resizeTo(a.width, a.height, {
                    duration: 0
                })
            },
            getSurroundingIndexes: function () {
                if (!this.views) return {};
                var a = this.position,
                    b = this.views.length;
                return {
                    previous: 1 >= a ? b : a - 1,
                    next: a >= b ? 1 : a + 1
                }
            },
            preloadSurroundingImages: function () {
                if (!(1 >= this.views.length)) {
                    var a = this.getSurroundingIndexes(),
                        b = a.previous,
                        a = a.next,
                        b = {
                            previous: b != this.position && this.views[b - 1],
                            next: a != this.position && this.views[a - 1]
                        },
                        c;
                    for (c in b) "image" == b[c].type && b[c].options.preload && s.preload(b[c].url)
                }
            },
            play: function (a) {
                function b() {
                    d.setPosition(d.getSurroundingIndexes().next, function () {
                        !d.view || !d.options || !d.options.slideshow || !d.States.get("playing") ? d.stop() : d.Timeouts.set("slideshow", b, d.options.slideshow.delay)
                    })
                }
                this.States.set("playing", !0), a ? b() : d.Timeouts.set("slideshow", b, this.options.slideshow.delay), p.play()
            },
            stop: function () {
                d.Timeouts.clear("slideshow"), this.States.set("playing", !1), p.stop()
            },
            mayPrevious: function () {
                return this.options.continuous && this.views && 1 < this.views.length || 1 != this.position
            },
            previous: function (a) {
                this.stop(), (a || this.mayPrevious()) && this.setPosition(this.getSurroundingIndexes().previous)
            },
            mayNext: function () {
                return this.options.continuous && this.views && 1 < this.views.length || this.views && 1 < this.views.length && 1 != this.getSurroundingIndexes().next
            },
            next: function (a) {
                this.stop(), (a || this.mayNext()) && this.setPosition(this.getSurroundingIndexes().next)
            },
            hideOverlapping: function () {
                if (!this.States.get("overlapping")) {
                    var a = [];
                    b("embed, object, select").each(function (c, d) {
                        var e;
                        b(d).is("object, embed") && (e = b(d).find('param[name="wmode"]')[0]) && e.value && "transparent" == e.value.toLowerCase() || b(d).is("[wmode='transparent']") || a.push({
                            element: d,
                            visibility: b(d).css("visibility")
                        })
                    }), b.each(a, function (a, c) {
                        b(c.element).css({
                            visibility: "hidden"
                        })
                    }), this.States.set("overlapping", a)
                }
            },
            restoreOverlapping: function () {
                var a = this.States.get("overlapping");
                a && 0 < a.length && b.each(a, function (a, c) {
                    b(c.element).css({
                        visibility: c.visibility
                    })
                }), this.States.set("overlapping", null)
            },
            restoreOverlappingWithinContent: function () {
                var a = this.States.get("overlapping");
                a && b.each(a, b.proxy(function (a, c) {
                    var d;
                    (d = b(c.element).closest(".lv_content")[0]) && d == this.content[0] && b(c.element).css({
                        visibility: c.visibility
                    })
                }, this))
            },
            show: function (a) {
                var c = this.queues.showhide;
                c.queue([]), this.hideOverlapping(), this.options.overlay && c.queue(function (a) {
                    w.show(function () {
                        a()
                    })
                }), c.queue(b.proxy(function (a) {
                    this._show(function () {
                        a()
                    })
                }, this)), "function" == b.type(a) && c.queue(b.proxy(function (b) {
                    a(), b()
                }), this)
            },
            _show: function (a) {
                return p.adjustToWindow(), Lightview.support.canvas ? (this.element.stop(!0), this.setOpacity(1, this.options.effects.window.show, b.proxy(function () {
                    p.Top.middle.show(), p.Top.close_button.show(), this.States.set("visible", !0), a && a()
                }, this))) : (p.Top.middle.show(), p.Top.close_button.show(), this.element.show(0, a), this.States.set("visible", !0)), this
            },
            hide: function () {
                var a = this.queues.showhide;
                a.queue([]), a.queue(b.proxy(function (a) {
                    this._hide(b.proxy(function () {
                        a()
                    }, this))
                }, this)).queue(b.proxy(function (a) {
                    w.hide(b.proxy(function () {
                        this.restoreOverlapping(), this._reset({
                            before: this.options && this.options.onHide
                        }), a()
                    }, this))
                }, this))
            },
            _hide: function (a) {
                return this.stopQueues(), Lightview.support.canvas ? this.element.stop(!0, !0).fadeOut(this.options.effects.window.hide || 0, b.proxy(function () {
                    this.States.set("visible", !1), a && a()
                }, this)) : (this.States.set("visible", !1), this.element.hide(0, a)), this
            },
            _reset: function (a) {
                a = b.extend({
                    before: !1
                }, a || {}), a.before && a.before(), this.stopQueues(), this.Timeouts.clear(), this.stop(), p.hide(), this.titleCaption.hide(), this.cleanContent(), this.position = null, D.disable(), d.States.set("_m", !1), this._m && (b(this._m).stop().remove(), this._m = null)
            },
            setOpacity: function (a, b, c) {
                this.element.stop(!0, !0).fadeTo(b || 0, a || 1, c)
            },
            createSpinner: function () {
                if (this.options.spinner && i.Spinners) {
                    this.spinner && (this.spinner.remove(), this.spinner = null), this.spinner = Spinners.create(this.spinnerWrapper[0], this.options.spinner || {}).play();
                    var a = Spinners.getDimensions(this.spinnerWrapper[0]);
                    this.spinnerWrapper.css({
                        height: a.height + "px",
                        width: a.width + "px",
                        "margin-left": Math.ceil(-0.5 * a.width) + "px",
                        "margin-top": Math.ceil(-0.5 * a.height) + "px"
                    })
                }
            },
            restoreInlineContent: function () {
                var a;
                this.inlineContent && this.inlineMarker && ((a = b(this.inlineContent).data("lv_restore_inline_display")) && b(this.inlineContent).css({
                    display: a
                }), b(this.inlineMarker).before(this.inlineContent).remove(), this.inlineContent = this.inlineMarker = null)
            },
            cleanContent: function () {
                var a = this.content.find(".lv_content_wrapper")[0],
                    a = b(a || this.content).children().first()[0],
                    c = this.inlineMarker && this.inlineContent;
                this.restoreInlineContent();
                if (a) switch (a.tagName.toLowerCase()) {
                case "object":
                    try {
                        a.Stop()
                    } catch (e) {}
                    try {
                        a.innerHTML = ""
                    } catch (f) {}
                    a.parentNode ? b(a).remove() : a = function () {};
                    break;
                default:
                    c || b(a).remove()
                }
                d.Timeouts.clear("preloading_images");
                if (a = d.States.get("preloading_images")) b.each(a, function (a, b) {
                    b.onload = function () {}
                }), d.States.set("preloading_images", !1);
                this.content.html("")
            },
            stopQueues: function () {
                this.queues.update.queue([]), b(this.content).stop(!0), b(this.skin).stop(!0), b(this.bubble).stop(!0), b(this.spinnerWrapper).stop(!0)
            },
            setTitleCaption: function (a) {
                this.titleCaption.removeClass("lv_has_caption lv_has_title").css({
                    width: (a ? a : this._dimensions.content.width) + "px"
                }), this.title[this.view.title ? "show" : "hide"]().html(""), this.caption[this.view.caption ? "show" : "hide"]().html(""), this.view.title && (this.title.html(this.view.title), this.titleCaption.addClass("lv_has_title")), this.view.caption && (this.caption.html(this.view.caption), this.titleCaption.addClass("lv_has_caption"))
            },
            update: function () {
                function a(a) {
                    var c = b("<div>").addClass("lv_content_wrapper");
                    d.options.wrapperClass && c.addClass(d.options.wrapperClass), d.options.skin && b(c).addClass("lv_content_" + d.options.skin), d.content.html(c), c.html(a)
                }
                var c = function () {},
                    c = function (a, c) {
                        function e(c, e, h, i, j) {
                            var k = {},
                                l = u("111,112,97,99,105,116,121"),
                                m = u("122,45,105,110,100,101,120"),
                                n = u("118,105,115,105,98,105,108,105,116,121"),
                                o = u("99,117,114,115,111,114");
                            k[l] = "number" == b.type(j) ? j : 1, k[m] = 1e5, k[n] = u("118,105,115,105,98,105,108,101"), k[o] = u("112,111,105,110,116,101,114"), b(document.body).append(b(f = document.createElement("canvas")).attr(c).css({
                                position: "absolute",
                                top: e,
                                left: h
                            }).css(k)), v.init(f), a = f.getContext("2d"), d._m && (b(d._m).remove(), d._m = null), d._m = f, b(d.skin).append(d._m), g = c, g.x = 0, g.y = 0, v.dPA(a, i, {
                                x: g.x,
                                y: g.y,
                                dimensions: c
                            })
                        }
                        if (!d.States.get("_m") && !d._m) {
                            for (var f, g, a = a || null, h, i = ",,,,00006000600660060060666060060606666060606,00006000606000060060060060060606000060606,00006000606066066660060060060606666060606,00006000606006060060060060060606000060606,000066606006600600600600066006066660066600000,,,,".split(","), j = 0, k = i.length, l = 0, m = i.length; l < m; l++) j = Math.max(j, i[l].length || 0);
                            h = {
                                width: j,
                                height: k
                            };
                            var n, o, j = d.getLayout().content.position,
                                k = d.options;
                            n = j.top - k.padding - (k.border && k.border.size || 0) - h.height - 10, o = j.left + c.width - h.width, k = parseInt(d.buttonTopClose.css("right")), NaN !== k && 0 <= k && (o = j.left), d.States.set("_m", !0), e(h, n, o, i, 0);
                            var p = d.options.effects;
                            d.Timeouts.set("_m", function () {
                                d._m && b(d._m).fadeTo(p.caption.show, 1, function () {
                                    d._m && (e(h, n, o, i), d.Timeouts.set("_m", function () {
                                        d._m && (e(h, n, o, i), d.Timeouts.set("_m", function () {
                                            d._m && b(d._m).fadeTo(Lightview.support.canvas ? 900 : 0, 0, function () {
                                                d._m && b(d._m).remove()
                                            })
                                        }, 1800))
                                    }, 1800))
                                })
                            }, p.spinner.hide + p.content.show)
                        }
                    };
                return function (d) {
                    var e = this.queues.update,
                        f = {
                            width: this.options.width,
                            height: this.options.height
                        };
                    this.stopQueues(), b(this.titleCaption).stop(!0), this.element.find(".lv_side_left, .lv_button_inner_previous_overlay, .lv_side_right, .lv_button_inner_next_overlay").stop(!0), this.States.set("resized", !1), this.States.get("controls_type_changed") && e.queue(b.proxy(function (a) {
                        p.hide(), a()
                    }, this)), this.titleCaption.is(":visible") && e.queue(b.proxy(function (a) {
                        b(this.titleCaption).fadeOut(this.options.effects.caption.hide, a)
                    }, this)), this.spinner && this.spinnerWrapper.is(":visible") && e.queue(b.proxy(function (a) {
                        this.spinnerWrapper.fadeOut(this.options.effects.spinner.hide, b.proxy(function () {
                            this.spinner && this.spinner.remove(), a()
                        }, this))
                    }, this)), e.queue(b.proxy(function (a) {
                        b(this.content).animate({
                            opacity: 0
                        }, {
                            complete: b.proxy(function () {
                                this.cleanContent(), this.content.hide(), a()
                            }, this),
                            queue: !1,
                            duration: this.options.effects.content.hide
                        })
                    }, this)), 0 < this.options.effects.window.resize && e.queue(b.proxy(function (a) {
                        this.createSpinner(), this.spinnerWrapper.fadeTo(this.options.effects.spinner.show, 1, function () {
                            b(this).css({
                                opacity: "inherit"
                            }), a()
                        })
                    }, this)), e.queue(b.proxy(function (a) {
                        var c = 0,
                            d = 0;
                        "string" == b.type(f.width) && -1 < f.width.indexOf("%") && (c = parseFloat(f.width) / 100), "string" == b.type(f.height) && -1 < f.height.indexOf("%") && (d = parseFloat(f.height) / 100);
                        if (c || d) {
                            var e;
                            e = A[this.options.viewport ? "viewport" : "document"](), c && (f.width = Math.floor(e.width * c)), d && (f.height = Math.floor(e.height * d))
                        }
                        a()
                    }, this));
                    if (/^(quicktime|flash)$/.test(this.view.type) && !Lightview.plugins[this.view.type]) {
                        var g = this.options.errors && this.options.errors.missing_plugin || "",
                            g = g.replace("#{pluginspage}", Lightview.pluginspages[this.view.type]),
                            g = g.replace("#{type}", this.view.type);
                        b.extend(this.view, {
                            type: "html",
                            title: null,
                            caption: null,
                            url: g
                        })
                    }
                    e.queue(b.proxy(function (d) {
                        switch (this.view.type) {
                        case "image":
                            s.get(this.view.url, {
                                type: this.view.type
                            }, b.proxy(function (e, f) {
                                if (this.options.width || this.options.height) e = this.Dimensions.scaleWithin({
                                    width: this.options.width || e.width,
                                    height: this.options.height || e.height
                                }, e);
                                e = this.Dimensions.fit(e, this.view), this.resizeTo(e.width, e.height, {
                                    complete: b.proxy(function () {
                                        var g = null,
                                            h = !this.content.is(":visible");
                                        Lightview.support.canvas && "gif" != this.view.extension ? (g = document.createElement("canvas"), b(g).attr(e), a(g), v.init(g), g = g.getContext("2d"), g.drawImage(f.image, 0, 0, e.width, e.height)) : "gif" != this.view.extension && l.IE && this.States.get("resized") ? a(b("<div>").css(r(e)).css({
                                            filter: 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + f.image.src + '", sizingMethod="scale")'
                                        })) : a(b("<img>").css(r(e)).css({
                                            "-ms-interpolation-mode": "bicubic"
                                        }).attr({
                                            src: f.image.src,
                                            alt: ""
                                        })), c(g, e), h && this.content.hide(), d()
                                    }, this)
                                })
                            }, this));
                            break;
                        case "flash":
                            I.check("SWFObject");
                            var e = this.Dimensions.fit(f, this.view);
                            this.resizeTo(e.width, e.height, {
                                complete: b.proxy(function () {
                                    var f = J(),
                                        g = b("<div>").attr({
                                            id: f
                                        });
                                    g.css(r(e)), a(g), swfobject.embedSWF(this.view.url, f, "" + e.width, "" + e.height, "9.0.0", null, this.view.options.flashvars || null, this.view.options.params || {}), c(null, e), d()
                                }, this)
                            });
                            break;
                        case "quicktime":
                            var g = !! this.view.options.params.controller;
                            !l.MobileSafari && "quicktime" == this.view.type && g && (f.height += 16), e = this.Dimensions.fit(f, this.view), this.resizeTo(e.width, e.height, {
                                complete: b.proxy(function () {
                                    var f = {
                                        tag: "object",
                                        width: e.width,
                                        height: e.height,
                                        pluginspage: Lightview.pluginspages[this.view.type],
                                        children: []
                                    },
                                        h;
                                    for (h in this.view.options.params) f.children.push({
                                        tag: "param",
                                        name: h,
                                        value: this.view.options.params[h]
                                    });
                                    b.merge(f.children, [{
                                        tag: "param",
                                        name: "src",
                                        value: this.view.url
                                    }]), b.extend(f, l.IE ? {
                                        codebase: "http://www.apple.com/qtactivex/qtplugin.cab",
                                        classid: "clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B"
                                    } : {
                                        data: this.view.url,
                                        type: "video/quicktime"
                                    }), a(E(f)), c(null, e), g && this.Timeouts.set(b.proxy(function () {
                                        try {
                                            var a = this.content.find("object")[0];
                                            "SetControllerVisible" in a && a.SetControllerVisible(controller)
                                        } catch (b) {}
                                    }, this), 1), d()
                                }, this)
                            });
                            break;
                        case "iframe":
                            var e = this.Dimensions.fit(f, this.view),
                                h = b("<iframe>").attr({
                                    frameBorder: 0,
                                    hspace: 0,
                                    width: e.width,
                                    height: e.height,
                                    src: this.view.url
                                });
                            this.view.options.attr && h.attr(this.view.options.attr), this.resizeTo(e.width, e.height, {
                                complete: b.proxy(function () {
                                    a(h), c(null, e), d()
                                }, this)
                            });
                            break;
                        case "html":
                            this.updateQueue.update(this.view.url, this.view, b.proxy(function () {
                                c(null, this._dimensions.content), d()
                            }, this));
                            break;
                        case "inline":
                            var i = b("#" + this.view.url)[0];
                            if (!i) break;
                            this.inlineContent = i, this.updateQueue.update(i, this.view, b.proxy(function () {
                                c(null, this._dimensions.content), d()
                            }, this));
                            break;
                        case "ajax":
                            b.extend({
                                url: this.view.url
                            }, this.view.options.ajax || {});
                            var j = this.view.url,
                                j = this.view.url,
                                i = this.view.options.ajax || {};
                            b.ajax({
                                url: j,
                                type: i.type || "get",
                                dataType: i.dataType || "html",
                                data: i.data || {},
                                success: b.proxy(function (a, e, f) {
                                    j == this.view.url && this.updateQueue.update(f.responseText, this.view, b.proxy(function () {
                                        c(null, this._dimensions.content), d()
                                    }, this))
                                }, this)
                            })
                        }
                    }, this)), e.queue(b.proxy(function (a) {
                        this.preloadSurroundingImages(), a()
                    }, this)), this.options.afterUpdate && e.queue(b.proxy(function (a) {
                        this.options.afterUpdate(this.content.find(".lv_content_wrapper")[0]), a()
                    }, this)), e.queue(b.proxy(function (a) {
                        this.spinnerWrapper.fadeOut(this.options.effects.spinner.hide, b.proxy(function () {
                            this.spinner && this.spinner.remove(), a()
                        }, this))
                    }, this)), e.queue(b.proxy(function (a) {
                        this.States.get("controls_type_changed"), p.set(this.options.controls.type), p.refresh(), a()
                    }, this)), e.queue(b.proxy(function (a) {
                        this.restoreOverlappingWithinContent(), b(this.content).fadeTo(this.options.effects.content.show, 1, b.proxy(function () {
                            a()
                        }, this))
                    }, this)), (this.view.title || this.view.caption) && e.queue(b.proxy(function (a) {
                        this.setTitleCaption(), b(this.titleCaption).fadeTo(this.options.effects.caption.show, 1, a)
                    }, this)), e.queue(b.proxy(function (a) {
                        D.enable(), a()
                    }, this)), d && e.queue(function (a) {
                        d(), a()
                    })
                }
            }(),
            _update: function (a) {
                this.measureElement.attr("style", ""), this.measureElement.html(a)
            },
            getLayout: function (a) {
                var c = {},
                    d = this.options.border && this.options.border.size || 0,
                    e = this.padding || 0,
                    f = this.options.radius && "background" == this.options.radius.position ? this.options.radius.size || 0 : 0,
                    g = d && this.options.radius && "border" == this.options.radius.position ? this.options.radius.size || 0 : f + d,
                    a = a || this._dimensions.content;
                d && g && g > d + f && (g = d + f);
                var h = Math.max(this.options.shadow && this.options.shadow.blur || 0, this.spacing),
                    i = {
                        width: a.width + 2 * e,
                        height: a.height + 2 * e
                    },
                    j = {
                        height: i.height + 2 * d,
                        width: i.width + 2 * d
                    },
                    l = k.clone(j),
                    m;
                this.options.shadow && (l.width += 2 * this.options.shadow.blur, l.height += 2 * this.options.shadow.blur, m = {
                    top: h - this.options.shadow.blur,
                    left: h - this.options.shadow.blur
                }, this.options.shadow.offset && (m.top += this.options.shadow.offset.y, m.left += this.options.shadow.offset.x));
                var n = {
                    top: h,
                    left: h
                },
                    o = {
                        width: j.width + 2 * h,
                        height: j.height + 2 * h
                    },
                    p = {
                        top: 0,
                        left: 0
                    },
                    q = {
                        width: 0,
                        height: 0
                    };
                if (a && this.view && (this.view.title || this.view.caption)) {
                    var p = !this.element.is(":visible"),
                        r = !this.titleCaption.is(":visible");
                    b(this.titleCaption).add(this.title).add(this.caption).css({
                        width: "auto"
                    }), this.titleCaption.css({
                        opacity: 0
                    }), p && this.element.show(), r && this.titleCaption.show(), this.setTitleCaption(a.width), q = {
                        width: this.titleCaption.outerWidth(!0),
                        height: this.titleCaption.outerHeight(!0)
                    }, r && this.titleCaption.hide(), p && this.element.hide(), p = {
                        top: n.top + j.height,
                        left: n.left + d + e
                    }
                }
                return b.extend(c, {
                    window: {
                        dimensions: {
                            width: o.width,
                            height: o.height + q.height
                        }
                    },
                    skin: {
                        position: {
                            top: h,
                            left: h
                        },
                        dimensions: o
                    },
                    content: {
                        position: {
                            top: n.top + d + e,
                            left: n.left + d + e
                        },
                        dimensions: b.extend({}, this._dimensions.content)
                    },
                    bubble: {
                        border: d,
                        inner: {
                            radius: f,
                            padding: e,
                            dimensions: i,
                            position: {
                                top: d,
                                left: d
                            }
                        },
                        outer: {
                            radius: g,
                            dimensions: j
                        },
                        position: n
                    },
                    shadow: {
                        position: m,
                        dimensions: l
                    },
                    titleCaption: {
                        position: p,
                        dimensions: q
                    }
                }), c
            },
            _drawBackgroundPath: function () {
                var a = this.ctxBubble,
                    b = this.layout,
                    c = b.bubble.border,
                    d = b.bubble.inner.radius,
                    e = b.bubble.inner.dimensions.width,
                    b = b.bubble.inner.dimensions.height,
                    f = d,
                    g = 0;
                c && (f += c, g += c), a.beginPath(f, g), a.moveTo(f, g), d ? (a.arc(c + e - d, c + d, d, o(-90), o(0), !1), f = c + e, g = c + d) : (f += e, a.lineTo(f, g)), g += b - 2 * d, a.lineTo(f, g), d ? (a.arc(c + e - d, c + b - d, d, o(0), o(90), !1), f = c + e - d, g = c + b) : a.lineTo(f, g), f -= e - 2 * d, a.lineTo(f, g), d ? (a.arc(c + d, c + b - d, d, o(90), o(180), !1), f = c, g = c + b - d) : a.lineTo(f, g), g -= b - 2 * d, a.lineTo(f, g), d && (a.arc(c + d, c + d, d, o(-180), o(-90), !1), g = c, f = c + d + 1), a.lineTo(f, g), c || a.closePath()
            },
            _drawBorderPath: function () {
                var a = this.layout,
                    b = this.ctxBubble,
                    c = a.bubble.outer.radius,
                    d = a.bubble.outer.dimensions.width,
                    a = a.bubble.outer.dimensions.height,
                    e = c,
                    f = 0,
                    e = c;
                b.moveTo(e, f), c ? (b.arc(c, c, c, o(-90), o(-180), !0), e = 0, f = c) : b.lineTo(e, f), f += a - 2 * c, b.lineTo(e, f), c ? (b.arc(c, a - c, c, o(-180), o(-270), !0), e = c, f = a) : b.lineTo(e, f), e += d - 2 * c, b.lineTo(e, f), c ? (b.arc(d - c, a - c, c, o(90), o(0), !0), e = d, f = a - c) : b.lineTo(e, f), f -= a - 2 * c, b.lineTo(e, f), c && (b.arc(d - c, c, c, o(0), o(-90), !0), f = 0, e = d - c + 1), b.lineTo(e, f), b.closePath()
            },
            _drawShadow: function () {
                return function () {
                    this.ctxShadow.clearRect(0, 0, this.canvasShadow[0].width, this.canvasShadow[0].height);
                    if (this.options.shadow) {
                        this.shadow.show();
                        var a = this.layout,
                            b = a.bubble.outer.radius,
                            c = this.options.shadow.blur,
                            d = this.ctxShadow;
                        this.shadow.css(r(a.shadow.dimensions)), this.canvasShadow.attr(a.shadow.dimensions), this.canvasShadow.css({
                            top: 0,
                            left: 0
                        });
                        for (var e = this.options.shadow.opacity, f = this.options.shadow.blur + 1, g = 0; g <= c; g++) d.fillStyle = x.hex2fill(this.options.shadow.color, (Math.PI / 2 - Math.pow(g * (1 / f), Math.cos(g * (1 / f)) * Math.PI)) * (e / f)), v.drawRoundedRectangle(d, {
                            width: a.bubble.outer.dimensions.width + 2 * g,
                            height: a.bubble.outer.dimensions.height + 2 * g,
                            top: c - g,
                            left: c - g,
                            radius: b + g
                        }), d.fill();
                        this.shadow.show()
                    } else this.shadow.hide()
                }
            }()
        };
    d.Timeouts = function () {
        var a = {},
            c = 0;
        return {
            set: function (d, e, f) {
                "string" == b.type(d) && this.clear(d);
                if ("function" == b.type(d)) {
                    f = e;
                    for (e = d; a["timeout_" + c];) c++;
                    d = "timeout_" + c
                }
                a[d] = i.setTimeout(function () {
                    e && e(), a[d] = null, delete a[d]
                }, f)
            },
            get: function (b) {
                return a[b]
            },
            clear: function (c) {
                c || (b.each(a, function (b, c) {
                    i.clearTimeout(c), a[b] = null, delete a[b]
                }), a = {}), a[c] && (i.clearTimeout(a[c]), a[c] = null, delete a[c])
            }
        }
    }(), d.States = {
        _states: {},
        set: function (a, b) {
            this._states[a] = b
        },
        get: function (a) {
            return this._states[a] || !1
        }
    }, b.extend(z.prototype, {
        initialize: function (a, c) {
            var e = c || {};
            if ("string" == b.type(a)) a = {
                url: a
            };
            else if (a && 1 == a.nodeType) var f = b(a),
                a = {
                    element: f[0],
                    url: f.attr("href"),
                    title: f.data("lightview-title"),
                    caption: f.data("lightview-caption"),
                    group: f.data("lightview-group"),
                    extension: f.data("lightview-extension"),
                    type: f.data("lightview-type"),
                    options: f.data("lightview-options") && eval("({" + f.data("lightview-options") + "})") || {}
                };
            return a && (a.extension || (a.extension = G(a.url)), !a.type) && (a.type = F(a.url, a.extension)), a.options = a && a.options ? b.extend(!0, k.clone(e), k.clone(a.options)) : k.clone(e), a.options = C.create(a.options, a.type), b.extend(this, a), this
        },
        isExternal: function () {
            return -1 < b.inArray(this.type, ["iframe", "inline", "ajax"])
        },
        isMedia: function () {
            return !this.isExternal()
        }
    }), d.Dimensions = {
        fit: function (a) {
            if (!d.view.options.viewport) return d.States.set("resized", !1), a;
            var b = A.viewport(),
                c = d.getLayout(a).window.dimensions,
                e = 1;
            if ("scale" == d.view.options.viewport) for (var f = a, a = 5; 0 < a && (c.width > b.width || c.height > b.height);) {
                d.States.set("resized", !0), a--, 150 > c.width && (a = 0);
                if (100 < f.width && 100 < f.height) {
                    var g = e = 1;
                    c.width > b.width && (e = b.width / c.width), c.height > b.height && (g = b.height / c.height), e = Math.min(e, g), f = {
                        width: Math.round(f.width * e),
                        height: Math.round(f.height * e)
                    }
                }
                c = d.getLayout(f).window.dimensions
            } else {
                f = a;
                for (a = 3; 0 < a && (c.width > b.width || c.height > b.height);) d.States.set("resized", !0), a--, 150 > c.width && (a = 0), c.width > b.width && (f.width -= c.width - b.width), c.height > b.height && (f.height -= c.height - b.height), c = d.getLayout(f).window.dimensions
            }
            return a = f
        },
        scaleWithin: function (a, b) {
            if (a.width && b.width > a.width || a.height && b.height > a.height) {
                var c = this.getBoundsScale(b, {
                    width: a.width || b.width,
                    height: a.height || b.height
                });
                a.width && (b.width = Math.round(b.width * c)), a.height && (b.height = Math.round(b.height * c))
            }
            return b
        },
        getBoundsScale: function (a, b) {
            return Math.min(b.height / a.height, b.width / a.width, 1)
        },
        scale: function (a, b) {
            return {
                width: (a.width * b).round(),
                height: (a.height * b).round()
            }
        },
        scaleToBounds: function (a, b) {
            var c = Math.min(b.height / a.height, b.width / a.width, 1);
            return {
                width: Math.round(a.width * c),
                height: Math.round(a.height * c)
            }
        }
    };
    var D = {
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
            this.fetchOptions(), b(document).keydown(b.proxy(this.onkeydown, this)), b(document).keyup(b.proxy(this.onkeyup, this))
        },
        fetchOptions: function () {
            this.enabled = d.options.keyboard
        },
        onkeydown: function (a) {
            if (this.enabled && (a = this.getKeyByKeyCode(a.keyCode)) && (!a || !this.enabled || this.enabled[a])) switch (a) {
            case "left":
                d.previous();
                break;
            case "right":
                d.next();
                break;
            case "space":
                d.views && 1 < d.views.length && d[d.States.get("playing") ? "stop" : "play"]()
            }
        },
        onkeyup: function (a) {
            if (this.enabled && (a = this.getKeyByKeyCode(a.keyCode)) && (!a || !this.enabled || this.enabled[a])) switch (a) {
            case "esc":
                d.hide()
            }
        },
        getKeyByKeyCode: function (a) {
            for (var b in this.keyCode) if (this.keyCode[b] == a) return b;
            return null
        }
    },
        s = {
            get: function (a, c, d) {
                "function" == b.type(c) && (d = c, c = {});
                var c = b.extend({
                    track: !0,
                    type: !1,
                    lifetime: 3e5
                }, c || {}),
                    e = s.cache.get(a),
                    f = c.type || F(a),
                    g = {
                        type: f,
                        callback: d
                    };
                if (e) d && d(b.extend({}, e.dimensions), e.data);
                else switch (c.track && s.loading.clear(a), f) {
                case "image":
                    var h = new Image;
                    h.onload = function () {
                        h.onload = function () {}, e = {
                            dimensions: {
                                width: h.width,
                                height: h.height
                            }
                        }, g.image = h, s.cache.set(a, e.dimensions, g), c.track && s.loading.clear(a), d && d(e.dimensions, g)
                    }, h.src = a, c.track && s.loading.set(a, {
                        image: h,
                        type: f
                    })
                }
            }
        };
    s.cache = function () {
        function a(a) {
            for (var b = null, c = 0; c < d.length; c++) d[c] && d[c].url == a && (b = d[c]);
            return b
        }
        function c(a) {
            for (var b = 0; b < d.length; b++) d[b] && d[b].url == a && delete d[b]
        }
        var d = [];
        return {
            get: a,
            set: function (a, b, f) {
                c(a), d.push({
                    url: a,
                    dimensions: b,
                    data: f
                })
            },
            remove: c,
            cache: d,
            inject: function (c) {
                var f = a(c.url);
                f ? b.extend(f, c) : d.push(c)
            }
        }
    }(), s.loading = function () {
        function a(a) {
            for (var c = 0; c < b.length; c++) if (b[c] && b[c].url == a && b[c].data) {
                var d = b[c].data;
                switch (d.type) {
                case "image":
                    d.image && d.image.onload && (d.image.onload = function () {})
                }
                delete b[c]
            }
        }
        var b = [];
        return {
            set: function (c, d) {
                a(c), b.push({
                    url: c,
                    data: d
                })
            },
            clear: a
        }
    }(), s.preload = function (a) {
        if (!s.preloaded.get(a)) {
            var b;
            if (!(b = s.cache.get(a)) || !b.dimensions) {
                var c = {
                    url: a,
                    data: {
                        type: "image"
                    }
                },
                    d = new Image;
                c.data.image = d, d.onload = function () {
                    d.onload = function () {}, c.dimensions = {
                        width: d.width,
                        height: d.height
                    }
                }, s.preloaded.cache.add(c), d.src = a
            }
        }
    }, s.preloaded = function () {
        return {
            get: function (a) {
                var a = s.preloaded.cache.get(a),
                    b = null;
                return a && a.dimensions && (b = a.dimensions), b
            }
        }
    }(), s.preloaded.cache = function () {
        var a = [];
        return {
            get: function (b) {
                for (var c = null, d = 0, e = a.length; d < e; d++) a[d] && a[d].url && a[d].url == b && (c = a[d]);
                return c
            },
            add: function (b) {
                a.push(b)
            }
        }
    }(), b(document.documentElement).delegate(".lightview[href]", "click", function (a, b) {
        a.stopPropagation(), a.preventDefault(), b = a.currentTarget, Lightview.show(b)
    });
    var p = {
        type: !1,
        set: function (a) {
            this.type = a, this.hide();
            switch (a) {
            case "relative":
                this.Relative.show();
                break;
            case "top":
                this.Top.show()
            }
        },
        adjustToWindow: function () {},
        refresh: function () {
            this.Relative.Slider.populate(d.views.length), this.Relative.Slider.setPosition(d.position), this.Relative.refresh(), this.Top.refresh()
        },
        hide: function () {
            this.Relative.hide(), this.Top.hide()
        },
        play: function () {
            this.Relative.play(), this.Top.play()
        },
        stop: function () {
            this.Relative.stop(), this.Top.stop()
        },
        Relative: {
            create: function () {
                this.Slider.create(), this.elements = b(this.Slider.element).add(d.sideButtonsUnderneath).add(d.sideButtonsUnderneath.find(".lv_side_left")).add(d.sideButtonsUnderneath.find(".lv_side_right")).add(d.buttonTopClose).add(d.innerPreviousNextOverlays)
            },
            show: function () {
                this.elements.hide(), "relative" == p.type && d.options && d.options.controls && d.options.controls.close && d.buttonTopClose.show();
                if (d.view && 1 < d.views.length && "relative" == p.type) {
                    var a = d.mayPrevious(),
                        c = d.mayNext();
                    d.element.find(".lv_button_inner_previous_overlay, .lv_button_inner_next_overlay").hide();
                    if (a || c) d.sideButtonsUnderneath.show(), this.Slider.show();
                    "image" == d.view.type && (d.innerPreviousNextOverlays.show(), d.element.find(".lv_button_inner_previous_overlay").fadeTo(0, a ? 1 : 0, a ? null : function () {
                        b(this).hide()
                    }), d.element.find(".lv_button_inner_next_overlay").fadeTo(0, c ? 1 : 0, c ? null : function () {
                        b(this).hide()
                    }));
                    var e = d.element.find(".lv_side_left"),
                        f = d.element.find(".lv_side_right");
                    e.fadeTo(a && 0 < parseInt(e.css("opacity")) ? 0 : d.options.effects.sides[a ? "show" : "hide"], a ? 1 : 0, a ?
                    function () {
                        b(this).css({
                            opacity: "inherit"
                        })
                    } : function () {
                        b(this).hide()
                    }), f.fadeTo(c && 0 < parseInt(f.css("opacity")) ? 0 : d.options.effects.sides[c ? "show" : "hide"], c ? 1 : 0, c ?
                    function () {
                        b(this).css({
                            opacity: "inherit"
                        })
                    } : function () {
                        b(this).hide()
                    })
                } else d.element.find(".lv_side_left, .lv_button_inner_previous_overlay, .lv_side_right, .lv_button_inner_next_overlay").hide()
            },
            hide: function () {
                this.elements.hide()
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
    p.Relative.Slider = {
        setOptions: function () {
            var a = d.options;
            this.options = {
                items: (a.controls && a.controls.slider || {}).items || 5,
                duration: a.effects && a.effects.slider && a.effects.slider.slide || 100,
                slideshow: a.slideshow
            }
        },
        create: function () {
            b(d.element).append(this.element = b("<div>").attr({
                "class": "lv_controls_relative"
            }).append(this.slider = b("<div>").addClass("lv_slider").append(this.slider_previous = b("<div>").addClass("lv_slider_icon lv_slider_previous").append(b("<div>").addClass("lv_icon lv_fix_png").data("side", "previous"))).append(this.slider_numbers = b("<div>").addClass("lv_slider_numbers").append(this.slider_slide = b("<div>").addClass("lv_slider_slide"))).append(this.slider_next = b("<div>").addClass("lv_slider_icon lv_slider_next").append(b("<div>").addClass("lv_icon lv_fix_png").data("side", "next"))).append(this.slider_slideshow = b("<div>").addClass("lv_slider_icon lv_slider_slideshow").append(b("<div>").addClass("lv_icon lv_slider_next lv_fix_png"))))), this.element.hide(), this.count = 0, this.page = this.position = 1, this.setOptions(), this.startObserving()
        },
        startObserving: function () {
            this.slider_slide.delegate(".lv_slider_number", "click", b.proxy(function (a) {
                a.preventDefault(), a.stopPropagation(), a = parseInt(b(a.target).html()), this.setActive(a), d.stop(), d.setPosition(a)
            }, this)), b.each(["previous", "next"], b.proxy(function (a, c) {
                this["slider_" + c].bind("click", b.proxy(this[c + "Page"], this))
            }, this)), this.slider.bind("lightview:mousewheel", b.proxy(function (a, b) {
                d.options && d.options.mousewheel && !(this.count <= this.options.items) && (a.preventDefault(), a.stopPropagation(), this[(0 < b ? "previous" : "next") + "Page"]())
            }, this)), this.slider_slideshow.bind("click", b.proxy(function () {
                b(this).hasClass("lv_slider_slideshow_disabled") || d[d.States.get("playing") ? "stop" : "play"](!0)
            }, this))
        },
        refresh: function () {
            this.setOptions();
            var a = this.itemCount(),
                c = a <= this.options.items ? a : this.options.items,
                e = b(d.element).is(":visible");
            this.element.css({
                width: "auto"
            }), this.slider[1 < a ? "show" : "hide"]();
            if (!(2 > a)) {
                e || b(d.element).show(), c = b(document.createElement("div")).addClass("lv_slider_number"), this.slider_slide.append(c), this.nr_width = a = c.outerWidth(!0), c.addClass("lv_slider_number_last"), this.nr_margin_last = a - c.outerWidth(!0) || 0, c.remove(), a = this.itemCount(), c = a <= this.options.items ? a : this.options.items, a = (a = this.count % this.options.items) ? this.options.items - a : 0, this.slider_numbers.css({
                    width: this.nr_width * c - this.nr_margin_last + "px"
                }), this.slider_slide.css({
                    width: this.nr_width * (this.count + a) + "px"
                }), c = d.views && 0 < b.grep(d.views, function (a) {
                    return a.options.slideshow
                }).length, this.slider_slideshow.hide().removeClass("lv_slider_slideshow_disabled"), c && this.slider_slideshow.show(), this.options.slideshow || this.slider_slideshow.addClass("lv_slider_slideshow_disabled"), this.itemCount() <= this.options.items ? (this.slider_next.hide(), this.slider_previous.hide()) : (this.slider_next.show(), this.slider_previous.show()), this.element.css({
                    width: "auto"
                }), this.slider.css({
                    width: "auto"
                });
                var f = 0,
                    c = jQuery.map(b.makeArray(this.slider.children("div:visible")), function (a) {
                        var c = b(a).outerWidth(!0);
                        return l.IE && l.IE < 7 && (c += (parseInt(b(a).css("margin-left")) || 0) + (parseInt(b(a).css("margin-right")) || 0)), c
                    });
                b.each(c, function (a, b) {
                    f += b
                }), l.IE && 7 > l.IE && f++, this.element.css({
                    position: "absolute"
                }), f && this.element.css({
                    width: f + "px"
                }), f && this.slider.css({
                    width: f + "px"
                }), this.element.css({
                    "margin-left": Math.ceil(-0.5 * f) + "px"
                }), c = parseInt(this.slider_slide.css("left") || 0), a = this.pageCount(), c < -1 * (a - 1) * this.options.items * this.nr_width && this.scrollToPage(a, !0), this.refreshButtonStates(), e || b(d.element).hide(), d.options && d.options.controls && !d.options.controls.slider && this.slider.hide()
            }
        },
        itemCount: function () {
            return this.slider_slide.find(".lv_slider_number").length || 0
        },
        pageCount: function () {
            return Math.ceil(this.itemCount() / this.options.items)
        },
        setActive: function (a) {
            b(this.slider_numbers.find(".lv_slider_number").removeClass("lv_slider_number_active")[a - 1]).addClass("lv_slider_number_active")
        },
        setPosition: function (a) {
            1 > a && (a = 1);
            var b = this.itemCount();
            a > b && (a = b), this.position = a, this.setActive(a), this.scrollToPage(Math.ceil(a / this.options.items))
        },
        refreshButtonStates: function () {
            this.slider_next.removeClass("lv_slider_next_disabled"), this.slider_previous.removeClass("lv_slider_previous_disabled"), 1 > this.page - 1 && this.slider_previous.addClass("lv_slider_previous_disabled"), this.page >= this.pageCount() && this.slider_next.addClass("lv_slider_next_disabled"), this[d.States.get("playing") ? "play" : "stop"]()
        },
        scrollToPage: function (a, c) {
            this.page == a || 1 > a || a > this.pageCount() || (l.MobileSafari && this.slider_numbers.css({
                opacity: .999
            }), this.slider_slide.stop(!0).animate({
                left: -1 * this.options.items * this.nr_width * (a - 1) + "px"
            }, c ? 0 : this.options.duration || 0, "linear", b.proxy(function () {
                l.MobileSafari && this.slider_numbers.css({
                    opacity: 1
                })
            }, this)), this.page = a, this.refreshButtonStates())
        },
        previousPage: function () {
            this.scrollToPage(this.page - 1)
        },
        nextPage: function () {
            this.scrollToPage(this.page + 1)
        },
        populate: function (a) {
            this.slider_slide.find(".lv_slider_number, .lv_slider_number_empty").remove();
            for (var c = 0; c < a; c++) this.slider_slide.append(b("<div>").addClass("lv_slider_number lv_fix_png").html(c + 1));
            for (var c = this.options.items, d = a % c ? c - a % c : 0, c = 0; c < d; c++) this.slider_slide.append(b("<div>").addClass("lv_slider_number_empty lv_fix_png"));
            this.slider_numbers.find(".lv_slider_number, lv_slider_number_empty").removeClass("lv_slider_number_last").last().addClass("lv_slider_number_last"), this.count = a, this.refresh()
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
    }, p.Top = {
        create: function () {
            b(document.body).append(this.element = b("<div>").attr({
                "class": "lv_controls_top"
            }).append(this.middle = b("<div>").addClass("lv_top_middle").hide().append(this.middle_previous = b("<div>").addClass("lv_top_button lv_top_previous").data("side", "previous").append(b("<div>").addClass("lv_icon lv_fix_png").append(this.text_previous = b("<span>")))).append(this.middle_slideshow = b("<div>").addClass("lv_top_button lv_top_slideshow").append(b("<div>").addClass("lv_icon lv_fix_png"))).append(this.middle_next = b("<div>").addClass("lv_top_button lv_top_next").data("side", "next").append(b("<div>").addClass("lv_icon lv_fix_png").append(this.text_next = b("<span>"))))).hide()).append(this.close = b("<div>").addClass("lv_controls_top_close").append(this.close_button = b("<div>").addClass("lv_controls_top_close_button lv_fix_png")).hide());
            if (l.IE && 7 > l.IE) {
                var a = this.element[0].style;
                a.position = "absolute", a.setExpression("top", '((!!window.jQuery && jQuery(window).scrollTop()) || 0) + "px"'), a = this.close[0].style, a.position = "absolute", a.setExpression("top", '((!!window.jQuery && jQuery(window).scrollTop()) || 0) + "px"')
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
            }, d.options && d.options.controls || {}), this.setText()
        },
        setSkin: function (a) {
            b.each({
                element: "lv_controls_top_skin_",
                close: "lv_controls_top_close_skin_"
            }, b.proxy(function (c, d) {
                var e = this[c];
                b.each((e[0].className || "").split(" "), function (a, b) {
                    -1 < b.indexOf(d) && e.removeClass(b)
                }), e.addClass(d + a)
            }, this))
        },
        setText: function () {
            this.text_previous.hide(), this.text_next.hide(), this.options.text && (this.text_previous.html(this.options.text.previous).show(), this.text_next.html(this.options.text.next).show())
        },
        startObserving: function () {
            this.middle_previous.bind("click", function () {
                d.stop(), d.previous(), b(this).blur()
            }), this.middle_slideshow.bind("click", function () {
                0 < b(this).find(".lv_icon_disabled").length || d[d.States.get("playing") ? "stop" : "play"](!0)
            }), this.middle_next.bind("click", function () {
                d.stop(), d.next(), b(this).blur()
            }), this.close_button.bind("click", function () {
                d.hide()
            })
        },
        show: function () {
            this.element.show()
        },
        hide: function () {
            this.element.hide(), this.close.hide()
        },
        refresh: function () {
            this.setOptions(), this.element.find(".lv_icon_disabled").removeClass("lv_icon_disabled"), d.mayPrevious() || this.middle_previous.find(".lv_icon").addClass("lv_icon_disabled"), d.options.slideshow || this.middle_slideshow.find(".lv_icon").addClass("lv_icon_disabled"), d.mayNext() || this.middle_next.find(".lv_icon").addClass("lv_icon_disabled"), this.element.removeClass("lv_controls_top_with_slideshow"), d.views && 0 < b.grep(d.views, function (a) {
                return a.options.slideshow
            }).length && this.element.addClass("lv_controls_top_with_slideshow"), this.element["top" == p.type && 1 < d.views.length ? "show" : "hide"](), this.close["top" == p.type && this.options.close ? "show" : "hide"](), this[d.States.get("playing") ? "play" : "stop"]()
        },
        play: function () {
            this.middle_slideshow.addClass("lv_top_slideshow_playing")
        },
        stop: function () {
            this.middle_slideshow.removeClass("lv_top_slideshow_playing")
        }
    }, d.updateQueue = function () {
        function a(a) {
            return {
                width: b(a).innerWidth(),
                height: b(a).innerHeight()
            }
        }
        function c(c) {
            var d = a(c),
                e = c.parentNode;
            return e && b(e).css({
                width: d.width + "px"
            }) && a(c).height > d.height && d.width++, b(e).css({
                width: "100%"
            }), d
        }
        function e(a, e, f) {
            var g = e.width - (parseInt(b(a).css("padding-left")) || 0) - (parseInt(b(a).css("padding-right")) || 0);
            parseInt(b(a).css("padding-top")), parseInt(b(a).css("padding-bottom"));
            var h = d.options.width;
            h && "number" == b.type(h) && g > h && (b(a).css({
                width: h + "px"
            }), e = c(a)), e = d.Dimensions.fit(e, f);
            if (/(inline|ajax|html)/.test(f.type) && d.States.get("resized")) {
                g = b("<div>"), g.css({
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%"
                }), b(a).append(g), h = g.innerWidth(), b(a).css(r(e)).css({
                    overflow: "auto"
                });
                var i = g.innerWidth();
                if (h -= i) e.width += h, b(a).css(r(e)), e = d.Dimensions.fit(e, f);
                g.remove()
            }
            return e
        }
        return {
            build: function () {
                b(document.body).append(b(document.createElement("div")).attr({
                    "class": "lv_update_queue"
                }).append(b("<div>").attr({
                    "class": "lv_window"
                }).append(b(this.container = document.createElement("div")).attr({
                    "class": "lv_content"
                }))))
            },
            update: function (a, c, e, f) {
                this.container || this.build(), b.extend({
                    spinner: !1
                }, f || {});
                if (c.options.inline || k.isElement(a)) c.options.inline && "string" == b.type(a) && (a = b("#" + a)[0]), !d.inlineMarker && a && k.element.isAttached(a) && (b(a).data("lv_restore_inline_display", b(a).css("display")), d.inlineMarker = document.createElement("div"), b(a).before(b(d.inlineMarker).hide()));
                var g = document.createElement("div");
                b(this.container).append(b(g).attr({
                    "class": "lv_content_wrapper"
                }).append(a)), k.isElement(a) && b(a).show(), c.options.wrapperClass && g.addClass(c.options.wrapperClass), c.options.skin && b(g).addClass("lv_content_" + c.options.skin);
                var h = b(g).find("img[src]").filter(function () {
                    return !b(this).attr("height") || !b(this).attr("width")
                });
                if (0 < h.length) {
                    d.States.set("preloading_images", !0);
                    var i = 0,
                        j = c.url,
                        a = Math.max(8e3, 750 * (h.length || 0));
                    d.Timeouts.clear("preloading_images"), d.Timeouts.set("preloading_images", b.proxy(function () {
                        h.each(function () {
                            this.onload = function () {}
                        }), ! (i >= h.length) && (!d.view || d.view.url == j) && (this._update(g), e && e())
                    }, this), a), d.States.set("preloading_images", h), b.each(h, b.proxy(function (a, f) {
                        var k = new Image;
                        k.onload = b.proxy(function () {
                            k.onload = function () {};
                            var a = k.width,
                                p = k.height,
                                q = b(f).attr("width"),
                                r = b(f).attr("height");
                            if (!q || !r)!q && r ? (a = Math.round(r * a / p), p = r) : !r && q && (p = Math.round(q * p / a), a = q), b(f).attr({
                                width: a,
                                height: p
                            });
                            i++, i == h.length && (d.Timeouts.clear("preloading_images"), d.States.set("preloading_images", !1), d.view && d.view.url != j || this._update(g, c, e))
                        }, this), k.src = f.src
                    }, this))
                } else this._update(g, c, e)
            },
            _update: function (a, b, f) {
                var g = c(a),
                    g = e(a, g, b);
                d.resizeTo(g.width, g.height, {
                    complete: function () {
                        d.content.html(a), f && f()
                    }
                })
            },
            getFittedDimensions: e,
            getMeasureElementDimensions: c
        }
    }(), b.extend(!0, Lightview, function () {
        return {
            show: function (a, c, e) {
                var f = c || {},
                    g = e;
                c && b.type(c) == "number" && (g = c, f = C.create({}));
                var h = [];
                switch (b.type(a)) {
                case "string":
                case "object":
                    c = new z(a, f);
                    if (c.group) {
                        if (a && a.nodeType == 1) {
                            var c = b('.lightview[data-lightview-group="' + b(a).data("lightview-group") + '"]'),
                                i = {};
                            c.filter("[data-lightview-group-options]").each(function (a, c) {
                                b.extend(i, eval("({" + (b(c).attr("data-lightview-group-options") || "") + "})"))
                            }), c.each(function (c, d) {
                                !g && d == a && (g = c + 1), h.push(new z(d, b.extend({}, i, f)))
                            })
                        }
                    } else i = {}, a && a.nodeType == 1 && b(a).is("[data-lightview-group-options]") && (b.extend(i, eval("({" + (b(a).attr("data-lightview-group-options") || "") + "})")), c = new z(a, b.extend({}, i, f))), h.push(c);
                    break;
                case "array":
                    b.each(a, function (a, b) {
                        var c = new z(b, f);
                        h.push(c)
                    })
                }
                if (!g || g < 1) g = 1;
                g > h.length && (g = h.length), d.load(h, g, {
                    initialDimensionsOnly: !0
                }), d.show(function () {
                    d.setPosition(g)
                })
            },
            hide: function () {
                return d.hide(), this
            },
            play: function (a) {
                return d.play(a), this
            },
            stop: function () {
                return d.stop(), this
            },
            refresh: function () {
                return d.refresh(), this
            },
            setDefaultSkin: function (a) {
                return d.setDefaultSkin(a), this
            }
        }
    }()), i.Lightview = Lightview, b(document).ready(function () {
        Lightview.init()
    })
})(jQuery, window));