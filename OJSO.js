var jQuery = jQuery;
/**
 * OJSO JavaScript Library v0.2alpha
 *
 * Released under the MIT license
 *
 * Date: 2017.06.26 - 18:50
 *
 * namespace
 *
 * @todo log dump handler
 * @todo merge ojso mit new ojso
 * @todo dump console.x
 * @todo css class id identifier
 * @todo events
 * @todo get every component
 * @todo css identifier getCreate css class
 * @todo location
 * @todo no shortcut vars params methods
 */
var OJSO = function () {
    'use strict';
    /* keyword this in this class context */
    var _this = this;
    /**
     * @type {OJSO}
     * @private
     */
    var _thisNamespace = _this;
    /**
     * @constructor
     */
    _this.DummyTrait = function DummyTrait() {
        /* keyword this in this class context */
        var _this = this;
        /**
         * @param {*} param1
         */
        var traitFunction1 = function traitFunction1(param1) {
        };
        /**
         * @param {*} param1
         */
        _this.traitFunction2 = function traitFunction2(param1) {
        };
    };
    /**
     * @param {*} param1
     * @constructor
     */
    _this.DummyParent = function DummyParent(param1) {
        /* keyword this in this class context */
        var _this = this;
        /**
         * @type {string}
         */
        var privateParent = 'I am private parent';
        /**
         * @type {string}
         */
        _this.publicParent = 'I am public parent';
        /**
         * @param {*} param1
         * @returns {*}
         */
        var privateMethod = function (param1) {
            return param1;
        };
        /**
         * @param {*} param1
         * @returns {*}
         */
        _this.publicMethod = function (param1) {
            return param1;
        };
        /* constructor */
        (function (param1) {
            _this.publicParent += param1;
        })(param1);
    };
    /**
     * singleton
     * @type {Dummy}
     */
    var DummyObj = null;
    /**
     * @param {*} param1
     * @returns {Dummy}
     * @constructor
     */
    _this.Dummy = function Dummy(param1) {
        /* singleton */
        if (DummyObj instanceof _thisNamespace.Dummy) {
            return DummyObj;
        }
        /* keyword this in this class context */
        var _this = this;
        /* extends simple inheritance */
        _thisNamespace.DummyParent.call(_this, param1);
        /* trait use */
        _thisNamespace.DummyTrait.call(_this);
        /**
         * @type {number}
         */
        var privateProperty = 0;
        /**
         * @param {number} param1
         * @returns {*}
         */
        var privateMethod = function privateMethod(param1) {
            return privateProperty += param1;
        };
        /**
         * @type {number}
         */
        _this.publicProperty = 1;
        /**
         * @param {number} param1
         * @returns {*}
         */
        _this.publicMethod = function publicMethod(param1) {
            return _this.publicProperty += param1;
        };
        /* constructor */
        (function (param1) {
            _this.publicParent += param1 + ' in child';
            /* singleton */
            DummyObj = _this;
        })(param1);
    };
    /**
     * @returns {number}
     */
    _this.getMicroTime = function getMicroTime() {
        return (new Date()).getTime();
    };
    /**
     * @param {string} id
     */
    _this.Benchmark = function Benchmark(id) {
        /* keyword this in this class context */
        var _this = this;
        /**
         * be an object for direct access over benchmark id without collecting empty indices [,,2,,4]
         *
         * @type {{0: {begin: number, end: number, time: number}}}
         */
        var benchmarkCaseHash = {
            dummyId: {
                begin: 0,
                end: 0,
                time: 0
            }
        };
        /**
         * @param {string} id
         */
        _this.begin = function begin(id) {
            benchmarkCaseHash[id] = {
                begin: _thisNamespace.getMicroTime()
            };
        };
        /**
         * @param {string} id
         * @param {boolean|undefined} dump
         */
        _this.end = function end(id, dump) {
            benchmarkCaseHash[id].end = _thisNamespace.getMicroTime();
            var dumpBool;
            if (_thisNamespace.isUndefined(dump)) {
                dumpBool = true;
            } else {
                dumpBool = dump;
            }
            benchmarkCaseHash[id].time = benchmarkCaseHash[id].end - benchmarkCaseHash[id].begin;
            if (dumpBool) {
                _this.dump(id);
            }
        };
        /**
         * @param {string} id
         */
        _this.dump = function dump(id) {
            console.log('benchmark run-time analysis: ' + id + ' = ' + benchmarkCaseHash[id].time + 'ms');
        };
        /**
         * @param {number} ifTimeGreaterThan
         */
        _this.dumpAll = function dumpAll(ifTimeGreaterThan) {
            var ifTimeGreaterThanInt = ifTimeGreaterThan;
            var id;
            if (_thisNamespace.isUndefined(ifTimeGreaterThanInt)) {
                ifTimeGreaterThanInt = -1;
            }
            for (id in benchmarkCaseHash) {
                if (benchmarkCaseHash[id].time > ifTimeGreaterThanInt) {
                    _this.dump(id);
                }
            }
        };
        /* constructor */
        (function (id) {
            benchmarkCaseHash = {};
            _this.begin(id);
        })(id);
    };
    /**
     * @param {*} val
     * @returns {boolean}
     */
    _this.isUndefined = function isUndefined(val) {
        return undefined === val;
    };
    /**
     * @param {*} val
     * @returns {boolean}
     */
    _this.isNull = function isNull(val) {
        return null === val;
    };
    /**
     * @param {*} val
     * @returns {boolean}
     */
    _this.isNaN = function isNaN(val) {
        return !_this.isNumber(val);
    };
    /**
     * @param {*} val
     * @returns {boolean}
     */
    _this.isBoolean = function isBoolean(val) {
        return 'boolean' === typeof val;
    };
    /**
     * @param {*} val
     * @returns {boolean}
     */
    _this.isNumeric = function isNumeric(val) {
        return Number(val) == val;
    };
    /**
     * @param {*} val
     * @returns {boolean}
     */
    _this.isNumber = function isNumber(val) {
        return Number(val) === val;
    };
    /**
     * @param {*} val
     * @returns {boolean}
     */
    _this.isInteger = function isInteger(val) {
        return _this.isNumber(val) && 0 === val % 1 && !_this.isNaN(val % 1);
    };
    /**
     * @param {*} val
     * @returns {boolean}
     */
    _this.isFloat = function isFloat(val) {
        var re;
        if (_this.isInteger(val)) {
            re = true;
        } else {
            re = _this.isNumber(val) && 0 !== val % 1 && !_this.isNaN(val % 1);
        }
        return re;
    };
    /**
     * @param {*} val
     * @returns {boolean}
     */
    _this.isFinite = function isFinite(val) {
        return _this.isNumber(val) && isFinite(val);
    };
    /**
     * @param {*} val
     * @returns {boolean}
     */
    _this.isInfinite = function isInfinite(val) {
        return _this.isNumber(val) && !isFinite(val);
    };
    /**
     * @param {*} val
     * @returns {boolean}
     */
    _this.isString = function isString(val) {
        return 'string' === typeof val;
    };
    /**
     * @param {*} val
     * @returns {boolean}
     */
    _this.isFunction = function isFunction(val) {
        return 'function' === typeof val;
    };
    /**
     * @param {*} val
     * @returns {boolean}
     */
    _this.isArray = function isArray(val) {
        return Array.isArray(val);
    };
    /**
     * @param {*} val
     * @returns {boolean}
     */
    _this.isObject = function isObject(val) {
        return 'object' === typeof val && !_this.isArray(val) && !_this.isNull(val);
    };
    /**
     * @param {*} val
     * @returns {boolean}
     */
    _this.isSet = function isSet(val) {
        var re;
        if (_this.isNull(val) || _this.isUndefined(val)) {
            re = false;
        } else if (_this.isBoolean(val) || _this.isNumber(val) || _this.isInfinite(val) || _this.isString(val) || _this.isFunction(val) || _this.isArray(val) || _this.isObject(val)) {
            re = true;
        } else if (isNaN(val)) {
            re = false;
        } else {
            throw 'unable to solve: isSet(' + val + '); typeof ' + val + ' === unknown';
        }
        return re;
    };
    /**
     * @param {*} val
     * @returns {boolean}
     */
    _this.isEmpty = function isEmpty(val) {
        var re;
        var name;
        if (_this.isUndefined(val) || _this.isNull(val) || '' === val) {
            re = true;
        } else if (_this.isBoolean(val) || _this.isNumber(val) || _this.isInfinite(val) || _this.isString(val) || _this.isFunction(val)) {
            re = false;
        } else if (_this.isArray(val) || _this.isObject(val)) {
            re = true;
            for (name in val) {
                re = false;
                break;
            }
        } else if (isNaN(val)) {
            re = true;
        } else {
            throw 'unable to solve: isEmpty(' + val + '); typeof ' + val + ' === unknown';
        }
        return re;
    };
    /**
     * @param {*} val
     * @returns {boolean}
     */
    _this.toBoolean = function toBoolean(val) {
        var re;
        var str;
        if (_this.isBoolean(val)) {
            re = val;
        } else if (_this.isNull(val) || _this.isUndefined(val)) {
            re = false;
        } else if (_this.isInteger(val)) {
            re = 0 !== val;
        } else if (_this.isFloat(val)) {
            re = 0.0 !== val;
        } else if (_this.isInfinite(val)) {
            re = -Infinity !== val;
        } else if (_this.isString(val)) {
            str = val.toLowerCase();
            if ('false' === str) {
                re = false;
            } else if ('true' === str) {
                re = true;
            } else if ('0' === str || '0.0' === str) {
                re = false;
            } else {
                re = !!val;
            }
        } else if (_this.isFunction(val)) {
            re = true;
        } else if (_this.isArray(val) || _this.isObject(val)) {
            re = !_this.isEmpty(val);
        } else if (isNaN(val)) {
            re = false;
        } else {
            re = !!val;
        }
        return re;
    };
    /**
     * @todo toNumber
     * @todo write test
     *
     * @param {*} val
     * @returns {number}
     */
    _this.toNumber = function toNumber(val) {
        var re = Number(val);
        if (_this.isNumber(re)) {
            return re;
        } else if (_this.isNaN(re)) {
            return _this.toNumber(_this.toBoolean(val));
        }
    };
    /**
     * @param {*} val
     * @returns {number}
     */
    _this.toInteger = function toInteger(val) {
        var re;
        var str;
        if (_this.isInteger(val)) {
            re = val;
        } else if (_this.isBoolean(val)) {
            re = val ? 1 : 0;
        } else if (_this.isNull(val) || _this.isUndefined(val) || _this.isInfinite(val) || _this.isFunction(val) || _this.isArray(val) || _this.isObject(val)) {
            re = _this.toInteger(_this.toBoolean(val));
        } else if (_this.isString(val)) {
            str = val.toLowerCase();
            if ('false' === str || 'true' === str) {
                re = _this.toInteger(_this.toBoolean(str));
            } else {
                re = parseInt(val);
            }
        } else {
            re = parseInt(val);
        }
        if (isNaN(re)) {
            re = 0;
        }
        return re;
    };
    /**
     * @param {*} val
     * @returns {number}
     */
    _this.toFloat = function toFloat(val) {
        var re;
        var str;
        if (_this.isFloat(val)) {
            re = val;
        } else if (_this.isBoolean(val)) {
            if (val) {
                re = 1.0;
            } else {
                re = 0.0;
            }
        } else if (_this.isNull(val) || _this.isUndefined(val) || _this.isInfinite(val) || _this.isFunction(val) || _this.isArray(val) || _this.isObject(val)) {
            re = _this.toFloat(_this.toBoolean(val));
        } else if (_this.isString(val)) {
            str = val.toLowerCase();
            if ('false' === str || 'true' === str) {
                re = _this.toFloat(_this.toBoolean(str));
            } else {
                re = parseFloat(val);
            }
        } else {
            re = parseFloat(val);
        }
        if (isNaN(re)) {
            re = 0;
        }
        return re;
    };
    /**
     * @param {*} val
     * @returns {string}
     */
    _this.toString = function toString(val) {
        var re;
        if (_this.isArray(val) || _this.isObject(val)) {
            re = JSON.stringify(val);
        } else {
            re = '' + val;
        }
        return re;
    };
    /**
     * @todo toFunction
     * @todo validate usefulness
     */
    _this.toFunction = function toFunction() {
    };
    /**
     * @todo toArray
     * @todo write test
     */
    _this.toArray = function toArray(val) {
        var re;
        if (_this.isArray(val)) {
            return re;
        } else {
        }
    };
    /**
     * @todo toHash
     */
    _this.toHash = function toHash() {
    };
    /**
     * @todo toObject
     */
    _this.toObject = function toObject() {
    };
    /**
     * @returns {Event}
     * @constructor
     */
    var Event = function Event() {
        /* keyword this in this class context */
        var _this = this;
        /**
         * @type {string}
         */
        _this.on = 'on';
        /**
         * @param {string} event
         * @returns {string}
         */
        _this.onEvent = function onEvent(event) {
            return _this.on + event;
        };
        /**
         * @constructor
         */
        var Mouse = function Mouse() {
            /* keyword this in this class context */
            var _this = this;
            /**
             * The event occurs when the user clicks on an element
             *
             * @type {string}
             */
            _this.click = 'click';
            /**
             * The event occurs when the user right-clicks on an element to open a context menu
             *
             * @type {string}
             */
            _this.contextMenu = 'contextmenu';
            /**
             * The event occurs when the user double-clicks on an element
             *
             * @type {string}
             */
            _this.doubleClick = 'dblclick';
            /**
             * The event occurs when the user presses a mouse button over an element
             *
             * @type {string}
             */
            _this.mouseDown = 'mousedown';
            /**
             * The event occurs when the pointer is moved onto an element
             *
             * @type {string}
             */
            _this.mouseEnter = 'mouseenter';
            /**
             * The event occurs when the pointer is moved out of an element
             *
             * @type {string}
             */
            _this.mouseLeave = 'mouseleave';
            /**
             * The event occurs when the pointer is moving while it is over an element
             *
             * @type {string}
             */
            _this.mouseMove = 'mousemove';
            /**
             * The event occurs when a user moves the mouse pointer out of an element, or out of one of its children
             *
             * @type {string}
             */
            _this.mouseOut = 'mouseout';
            /**
             * The event occurs when the pointer is moved onto an element, or onto one of its children
             *
             * @type {string}
             */
            _this.mouseOver = 'mouseover';
            /**
             * The event occurs when a user releases a mouse button over an element
             *
             * @type {string}
             */
            _this.mouseUp = 'mouseup';
        };
        /**
         * singleton
         *
         * work-around for visibility of object-content-value in js-api
         *
         * @type {Mouse}
         */
        _this.Mouse = new Mouse();
        _this.getMouse = function () {
            return Mouse;
        };
        /**
         * @constructor
         */
        var Keyboard = function Keyboard() {
            /* keyword this in this class context */
            var _this = this;
            /**
             * The event occurs when the user is pressing a key
             *
             * @type {string}
             */
            _this.keyDown = 'keydown';
            /**
             * The event occurs when the user presses a key
             *
             * @type {string}
             */
            _this.keyPress = 'keypress';
            /**
             * The event occurs when the user releases a key
             *
             * @type {string}
             */
            _this.keyUp = 'keyup';
        };
        /**
         * singleton
         *
         * work-around for visibility of object-content-value in js-api
         *
         * @type {Keyboard}
         */
        _this.Keyboard = new Keyboard();
        _this.getKeyboard = function () {
            return Keyboard;
        };
        /**
         * @constructor
         */
        var Frame = function () {
            /* keyword this in this class context */
            var _this = this;
            /**
             * The event occurs when the loading of a resource has been aborted
             *
             * @type {string}
             */
            _this.abord = 'abord';
            /**
             * The event occurs before the document is about to be unloaded
             *
             * @type {string}
             */
            _this.beforeUnload = 'beforeunload';
            /**
             * The event occurs when an error occurs while loading an external file
             *
             * @type {string}
             */
            _this.error = 'error';
            /**
             * The event occurs when there has been changes to the anchor part of a URL
             *
             * @type {string}
             */
            _this.hashChange = 'hashchange';
            /**
             * The event occurs when an object has loaded
             *
             * @type {string}
             */
            _this.load = 'load';
            /**
             * The event occurs when the user navigates away from a webpage
             *
             * @type {string}
             */
            _this.pageHide = 'pagehide';
            /**
             * The event occurs when the user navigates to a webpage
             *
             * @type {string}
             */
            _this.pageShow = 'pageshow';
            /**
             * The event occurs when the document view is resized
             *
             * @type {string}
             */
            _this.resize = 'resize';
            /**
             * The event occurs when an element's scrollbar is being scrolled
             *
             * @type {string}
             */
            _this.scroll = 'scroll';
            /**
             * The event occurs once a page has unloaded (for <body>)
             *
             * @type {string}
             */
            _this.unload = 'unload';
        };
        /**
         * singleton
         *
         * work-around for visibility of object-content-value in js-api
         *
         * @type {Frame}
         */
        _this.Frame = new Frame();
        _this.getFrame = function () {
            return Frame;
        };
        /**
         * @constructor
         */
        var Drag = function () {
            /* keyword this in this class context */
            var _this = this;
            /**
             * The event occurs when an element is being dragged
             *
             * @type {string}
             */
            _this.drag = 'drag';
            /**
             * The event occurs when the user has finished dragging an element
             *
             * @type {string}
             */
            _this.dragEnd = 'dragend';
            /**
             * The event occurs when the dragged element enters the drop target
             *
             * @type {string}
             */
            _this.dragEnter = 'dragenter';
            /**
             * The event occurs when the dragged element leaves the drop target
             *
             * @type {string}
             */
            _this.dragLeave = 'dragleave';
            /**
             * The event occurs when the dragged element is over the drop target
             *
             * @type {string}
             */
            _this.dragOver = 'dragover';
            /**
             * The event occurs when the user starts to drag an element
             *
             * @type {string}
             */
            _this.dragStart = 'dragstart';
            /**
             * The event occurs when the dragged element is dropped on the drop target
             *
             * @type {string}
             */
            _this.drop = 'drop';
        };
        /**
         * singleton
         *
         * work-around for visibility of object-content-value in js-api
         *
         * @type {Drag}
         */
        _this.Drag = new Drag();
        _this.getDrag = function () {
            return Drag;
        };
        /**
         * @constructor
         */
        var Clipboard = function () {
            /* keyword this in this class context */
            var _this = this;
            /**
             * The event occurs when the user copies the content of an element
             *
             * @type {string}
             */
            _this.copy = 'copy';
            /**
             * The event occurs when the user cuts the content of an element
             *
             * @type {string}
             */
            _this.cut = 'cut';
            /**
             *
             The event occurs when the user pastes some content in an element
             *
             * @type {string}
             */
            _this.paste = 'paste';
        };
        /**
         * singleton
         *
         * work-around for visibility of object-content-value in js-api
         *
         * @type {Clipboard}
         */
        _this.Clipboard = new Clipboard();
        _this.getClipboard = function () {
            return Clipboard;
        };
        /**
         * @constructor
         */
        var Print = function () {
            /* keyword this in this class context */
            var _this = this;
            /**
             * The event occurs when a page has started printing, or if the print dialogue box has been closed
             *
             * @type {string}
             */
            _this.afterPrint = 'afterprint';
            /**
             * The event occurs when a page is about to be printed
             *
             * @type {string}
             */
            _this.beforePrint = 'beforeprint';
        };
        /**
         * singleton
         *
         * work-around for visibility of object-content-value in js-api
         *
         * @type {Print}
         */
        _this.Print = new Print();
        _this.getPrint = function () {
            return Print;
        };
        /**
         * @constructor
         */
        var Media = function () {
            /* keyword this in this class context */
            var _this = this;
            /**
             * The event occurs when the loading of a media is aborted
             *
             * @type {string}
             */
            _this.abort = 'abort';
            /**
             * The event occurs when the browser can start playing the media (when it has buffered enough to begin)
             *
             * @type {string}
             */
            _this.canPlay = 'canplay';
            /**
             * The event occurs when the browser can play through the media without stopping for buffering
             *
             * @type {string}
             */
            _this.canPlayThrough = 'canplaythrough';
            /**
             * The event occurs when the duration of the media is changed
             *
             * @type {string}
             */
            _this.durationChange = 'durationchange';
            /**
             * The event occurs when something bad happens and the media file is suddenly unavailable (like unexpectedly disconnects)
             *
             * @type {string}
             */
            _this.emptied = 'emptied';
            /**
             * The event occurs when the media has reach the end (useful for messages like "thanks for listening")
             *
             * @type {string}
             */
            _this.ended = 'ended';
            /**
             * The event occurs when an error occurred during the loading of a media file
             *
             * @type {string}
             */
            _this.error = 'error';
            /**
             * The event occurs when media data is loaded
             *
             * @type {string}
             */
            _this.loadedData = 'loadeddata';
            /**
             * The event occurs when meta data (like dimensions and duration) are loaded
             *
             * @type {string}
             */
            _this.loadedMetaData = 'loadedmetadata';
            /**
             * The event occurs when the browser starts looking for the specified media
             *
             * @type {string}
             */
            _this.loadStart = 'loadstart';
            /**
             * The event occurs when the media is paused either by the user or programmatically
             *
             * @type {string}
             */
            _this.pause = 'pause';
            /**
             * The event occurs when the media has been started or is no longer paused
             *
             * @type {string}
             */
            _this.play = 'play';
            /**
             * The event occurs when the media is playing after having been paused or stopped for buffering
             *
             * @type {string}
             */
            _this.playing = 'playing';
            /**
             * The event occurs when the browser is in the process of getting the media data (downloading the media)
             *
             * @type {string}
             */
            _this.progress = 'progress';
            /**
             * The event occurs when the playing speed of the media is changed
             *
             * @type {string}
             */
            _this.rateChange = 'ratechange';
            /**
             * The event occurs when the user is finished moving/skipping to a new position in the media
             *
             * @type {string}
             */
            _this.seeked = 'seeked';
            /**
             * The event occurs when the user starts moving/skipping to a new position in the media
             *
             * @type {string}
             */
            _this.seeking = 'seeking';
            /**
             * The event occurs when the browser is trying to get media data, but data is not available
             *
             * @type {string}
             */
            _this.stalled = 'stalled';
            /**
             * The event occurs when the browser is intentionally not getting media data
             *
             * @type {string}
             */
            _this.suspend = 'suspend';
            /**
             * The event occurs when the playing position has changed (like when the user fast forwards to a different point in the media)
             *
             * @type {string}
             */
            _this.timeUpdate = 'timeupdate';
            /**
             * The event occurs when the volume of the media has changed (includes setting the volume to "mute")
             *
             * @type {string}
             */
            _this.volumeChange = 'volumechange';
            /**
             * The event occurs when the media has paused but is expected to resume (like when the media pauses to buffer more data)
             *
             * @type {string}
             */
            _this.waiting = 'waiting';
        };
        /**
         * singleton
         *
         * work-around for visibility of object-content-value in js-api
         *
         * @type {Media}
         */
        _this.Media = new Media();
        _this.getMedia = function () {
            return Media;
        };
        /**
         * @constructor
         */
        var Animation = function () {
            /* keyword this in this class context */
            var _this = this;
            /**
             * The event occurs when a CSS animation has completed
             *
             * @type {string}
             */
            _this.animationEnd = 'animationend';
            /**
             * The event occurs when a CSS animation is repeated
             *
             * @type {string}
             */
            _this.animationIteration = 'animationiteration';
            /**
             * The event occurs when a CSS animation has started
             *
             * @type {string}
             */
            _this.animationStart = 'animationstart';
        };
        /**
         * singleton
         *
         * work-around for visibility of object-content-value in js-api
         *
         * @type {Animation}
         */
        _this.Animation = new Animation();
        _this.getAnimation = function () {
            return Animation;
        };
        /**
         * @constructor
         */
        var Transition = function () {
            /* keyword this in this class context */
            var _this = this;
            /**
             * The event occurs when a CSS transition has completed
             *
             * @type {string}
             */
            _this.transitionEnd = 'transitionend';
        };
        /**
         * singleton
         *
         * work-around for visibility of object-content-value in js-api
         *
         * @type {Transition}
         */
        _this.Transition = new Transition();
        _this.getTransition = function () {
            return Transition;
        };
        /**
         * @constructor
         */
        var ServerSent = function () {
            /* keyword this in this class context */
            var _this = this;
            /**
             * The event occurs when an error occurs with the event source
             *
             * @type {string}
             */
            _this.error = 'error';
            /**
             * The event occurs when a message is received through the event source
             *
             * @type {string}
             */
            _this.message = 'message';
            /**
             * The event occurs when a connection with the event source is opened
             *
             * @type {string}
             */
            _this.open = 'open';
        };
        /**
         * singleton
         *
         * work-around for visibility of object-content-value in js-api
         *
         * @type {ServerSent}
         */
        _this.ServerSent = new ServerSent();
        _this.getServerSent = function () {
            return ServerSent;
        };
        /**
         * @constructor
         */
        var Misc = function () {
            /* keyword this in this class context */
            var _this = this;
            /**
             * The event occurs when a message is received through or from an object (WebSocket, Web Worker, Event Source or a child frame or a parent window)
             *
             * @type {string}
             */
            _this.message = 'message';
            /**
             * Deprecated. Use the onwheel event instead onmousewheel
             *
             * @type {string}
             */
            _this.mouseWheel = 'mousewheel';
            /**
             * The event occurs when the browser starts to work offline
             *
             * @type {string}
             */
            _this.offline = 'offline';
            /**
             * The event occurs when the browser starts to work online
             *
             * @type {string}
             */
            _this.online = 'online';
            /**
             * The event occurs when the window's history changes
             *
             * @type {string}
             */
            _this.popState = 'popstate';
            /**
             * The event occurs when a <menu> element is shown as a context menu
             *
             * @type {string}
             */
            _this.show = 'show';
            /**
             * The event occurs when a Web Storage area is updated
             *
             * @type {string}
             */
            _this.storage = 'storage';
            /**
             * The event occurs when the user opens or closes the <details> element
             *
             * @type {string}
             */
            _this.toggle = 'toggle';
            /**
             * The event occurs when the mouse wheel rolls up or down over an element
             *
             * @type {string}
             */
            _this.wheel = 'wheel';
        };
        /**
         * singleton
         * work-around for visibility of object-content-value in js-api
         *
         * @type {Misc}
         */
        _this.Misc = new Misc();
        _this.getMisc = function () {
            return Misc;
        };
        /**
         * @constructor
         */
        var Touch = function () {
            /* keyword this in this class context */
            var _this = this;
            /**
             * The event occurs when the touch is interrupted
             *
             * @type {string}
             */
            _this.touchCancel = 'touchcancel';
            /**
             * The event occurs when a finger is removed from a touch screen
             *
             * @type {string}
             */
            _this.touchEnd = 'touchend';
            /**
             * The event occurs when a finger is dragged across the screen
             *
             * @type {string}
             */
            _this.touchMove = 'touchmove';
            /**
             * The event occurs when a finger is placed on a touch screen
             *
             * @type {string}
             */
            _this.touchStart = 'touchstart';
        };
        /**
         * singleton
         *
         * work-around for visibility of object-content-value in js-api
         *
         * @type {Touch}
         */
        _this.Touch = new Touch();
        /**
         * @returns {Touch}
         */
        _this.getTouch = function () {
            return Touch;
        };
    };
    /**
     * singleton
     * @type {Event}
     */
    _this.Event = new Event();
    /**
     * @returns {Event}
     */
    _this.getEvent = function () {
        return Event;
    };
    /**
     * @todo window and document
     * @constructor
     */
    var Css = function () {
        /* keyword this in this class context */
        var _this = this;
        /**
         * @constructor
         */
        var Identifier = function () {
            /* keyword this in this class context */
            var _this = this;
            /**
             * @type {string}
             */
            _this.class = '.';
            /**
             * @type {string}
             */
            _this.id = '#';
            /**
             * @type {string}
             */
            _this.tag = '';
        };
        /**
         * @type {Identifier}
         */
        _this.Identifier = new Identifier();
        /**
         * @returns {Identifier}
         */
        _this.getIdentifier = function () {
            return Identifier;
        };
        /**
         * @param {string} selector
         * @returns {string}
         */
        _this.getClassSelector = function (selector) {
            return _this.getSelector(_this.Identifier.class, selector);
        };
        /**
         * @param {string} selector
         * @returns {string}
         */
        _this.getIdSelector = function (selector) {
            return _this.getSelector(_this.Identifier.id, selector);
        };
        /**
         * @param {string} selector
         * @returns {string}
         */
        _this.getTagSelector = function (selector) {
            return _this.getSelector(_this.Identifier.tag, selector);
        };
        /**
         * @param {string} attributeName
         * @param {string} attributeValue
         * @returns {string}
         */
        _this.getAttributeSelector = function (attributeName, attributeValue) {
            return '[' + attributeName + '="' + attributeValue + '"]';
        };
        /**
         * @param {string} identifier
         * @param {string} selector
         * @returns {string}
         */
        _this.getSelector = function (identifier, selector) {
            return identifier + selector;
        };
        /**
         * @constructor
         */
        var Tag = function () {
            /* keyword this in this class context */
            var _this = this;
            /**
             * @type {string}
             */
            _this.a = 'a';
            /**
             * @type {string}
             */
            _this.div = 'div';
            /**
             * @type {string}
             */
            _this.p = 'p';
            /**
             * @type {string}
             */
            _this.span = 'span';
            /**
             * @type {string}
             */
            _this.table = 'table';
            /**
             * @type {string}
             */
            _this.td = 'td';
            /**
             * @type {string}
             */
            _this.tr = 'tr';
        };
        /**
         * singleton
         * @type {Tag}
         */
        _this.Tag = new Tag();
        /**
         * @returns {Tag}
         */
        _this.getTag = function () {
            return Tag;
        };
    };
    /**
     * singleton
     * @type {Css}
     */
    _this.Css = new Css();
    /**
     * @returns {Css}
     */
    _this.getCssSelector = function () {
        return Css;
    };
    /**
     * @type {DOMHandler&Css}
     * @constructor
     */
    /**
     * @constructor
     */
    var DOMHandler = function DOMHandler() {
        /* keyword this in this class context */
        var _this = this;
        /* extends simple inheritance */
        // Event.call(_this);
        /* extends simple inheritance */
        // Css.call(_this);
        /**
         * @type {Event}
         */
        _this.Event = _thisNamespace.Event;
        /**
         * @type {Css}
         */
        _this.Css = _thisNamespace.Css;
        /**
         * @param {string} selector
         * @returns {*|jQuery|HTMLElement}
         */
        _this.selectDOMElement = function selectDOMElement(selector) {
            return jQuery(selector);
        };
    };
    /**
     * @type {DOMHandler&Event}
     */
    /**
     * @type {DOMHandler}
     */
    _this.DOMHandler = new DOMHandler();
    /**
     * @todo entire location
     * @constructor
     */
    var Location = function Location() {
        /* keyword this in this class context */
        var _this = this;
        _this.getHash = function () {
            return location.hash;
        };
        _this.setHash = function () {
            return location.hash;
        };
        _this.hash = function (hash) {
            if (_this.isUndefined(hash)) {
                return location.hash;
            }
            location.hash = hash;
        };
        _this.reload = function () {
            location.reload();
        };
    };
    /**
     * singleton
     *
     * work-around for visibility of object-content-value in js-api
     *
     * @type {Location}
     */
    _this.Location = new Location();
};
OJSO = new OJSO();