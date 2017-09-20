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
var OJSO = function OJSO() {
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
         * @param {*} parameter
         */
        var traitFunctionPrivate = function traitFunctionPrivate(parameter) {
        };
        /**
         * @param {*} parameter
         */
        _this.traitFunctionPublic = function traitFunctionPublic(parameter) {
        };
    };
    /**
     * @param {string} parameter
     * @constructor
     */
    _this.DummyParent = function DummyParent(parameter) {
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
         * @param {string} parameter
         * @returns {string}
         */
        var privateMethod = function privateMethod(parameter) {
            privateParent += parameter;
            return privateParent;
        };
        /**
         * @param {string} parameter
         * @returns {string}
         */
        _this.publicMethod = function publicMethod(parameter) {
            return privateMethod(parameter);
        };
        /* constructor */
        (function (parameter) {
            _this.publicParent += parameter;
        })(parameter);
    };
    /**
     * singleton
     * @type {Dummy}
     */
    var Dummy;
    /**
     * @param {string} parameter
     * @returns {Dummy}
     * @constructor
     */
    _this.Dummy = function Dummy(parameter) {
        /* singleton */
        if (Dummy instanceof _thisNamespace.Dummy) {
            return Dummy;
        }
        /* keyword this in this class context */
        var _this = this;
        /* extends simple inheritance */
        _thisNamespace.DummyParent.call(_this, parameter);
        /* trait use */
        _thisNamespace.DummyTrait.call(_this);
        /**
         * @type {number}
         */
        var privateProperty = 0;
        /**
         * @type {number}
         */
        _this.publicProperty = 1;
        /**
         * @param {number} parameter
         * @returns {number}
         */
        var privateMethod = function privateMethod(parameter) {
            privateProperty += parameter;
            return privateProperty;
        };
        /**
         * @param {number} parameter
         * @returns {number}
         */
        _this.publicMethod = function publicMethod(parameter) {
            return privateMethod(parameter);
        };
        /* constructor */
        (function (parameter) {
            _this.publicParent += parameter + ' in child';
            /* singleton */
            Dummy = _this;
        })(parameter);
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
            benchmarkCaseHash[id].time = benchmarkCaseHash[id].end - benchmarkCaseHash[id].begin;
            if (_thisNamespace.isUndefined(dump) || dump) {
                _this.dump(id);
            }
        };
        /**
         * @param {string} id
         */
        _this.dump = function dump(id) {
            console.log('benchmark run-time analysis: ' + id + ' = ' + benchmarkCaseHash[id].time + 'ms');
        };
        /** */
        _this.dumpAll = function dumpAll() {
            for (var id in benchmarkCaseHash) {
                _this.dump(id);
            }
        };
        /**
         * @param {number} minRunTime
         */
        _this.dumpAllGreaterThan = function dumpAllGreaterThan(minRunTime) {
            var minRunTimeNumber = _thisNamespace.isUndefined(minRunTime) ? -1 : minRunTime;
            for (var id in benchmarkCaseHash) {
                if (benchmarkCaseHash[id].time > minRunTimeNumber) {
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
     * @param {*} value
     * @returns {boolean}
     */
    _this.isUndefined = function isUndefined(value) {
        return undefined === value;
    };
    /**
     * @param {*} value
     * @returns {boolean}
     */
    _this.isNull = function isNull(value) {
        return null === value;
    };
    /**
     * @param {*} value
     * @returns {boolean}
     */
    _this.isNaN = function isNaN(value) {
        return !_this.isNumber(value);
    };
    /**
     * @param {*} value
     * @returns {boolean}
     */
    _this.isBoolean = function isBoolean(value) {
        return 'boolean' === typeof value;
    };
    /**
     * @param {*} value
     * @returns {boolean}
     */
    _this.isNumeric = function isNumeric(value) {
        return Number(value) == value;
    };
    /**
     * @param {*} value
     * @returns {boolean}
     */
    _this.isNumber = function isNumber(value) {
        return Number(value) === value;
    };
    /**
     * @param {*} value
     * @returns {boolean}
     */
    _this.isInteger = function isInteger(value) {
        return _this.isNumber(value) && 0 === value % 1 && !_this.isNaN(value % 1);
    };
    /**
     * @param {*} value
     * @returns {boolean}
     */
    _this.isFloat = function isFloat(value) {
        return _this.isInteger(value) || (_this.isNumber(value) && 0 !== value % 1 && !_this.isNaN(value % 1));
    };
    /**
     * @param {*} value
     * @returns {boolean}
     */
    _this.isFinite = function isFinite(value) {
        return _this.isNumber(value) && isFinite(value);
    };
    /**
     * @param {*} value
     * @returns {boolean}
     */
    _this.isInfinite = function isInfinite(value) {
        return _this.isNumber(value) && !isFinite(value);
    };
    /**
     * @param {*} value
     * @returns {boolean}
     */
    _this.isString = function isString(value) {
        return 'string' === typeof value;
    };
    /**
     * @param {*} value
     * @returns {boolean}
     */
    _this.isFunction = function isFunction(value) {
        return 'function' === typeof value;
    };
    /**
     * @param {*} value
     * @returns {boolean}
     */
    _this.isArray = function isArray(value) {
        return Array.isArray(value);
    };
    /**
     * @param {*} value
     * @returns {boolean}
     */
    _this.isObject = function isObject(value) {
        return 'object' === typeof value && !_this.isArray(value) && !_this.isNull(value);
    };
    /**
     * @param {*} value
     * @returns {boolean}
     */
    _this.isSet = function isSet(value) {
        var re;
        if (_this.isNull(value) || _this.isUndefined(value)) {
            re = false;
        }
        else if (_this.isBoolean(value) || _this.isNumber(value) || _this.isInfinite(value) || _this.isString(value) || _this.isFunction(value) || _this.isArray(value) || _this.isObject(value)) {
            re = true;
        }
        else if (isNaN(value)) {
            re = false;
        }
        else {
            throw 'unable to solve: isSet(' + value + '); typeof ' + value + ' === unknown';
        }
        return re;
    };
    /**
     * @param {*} value
     * @returns {boolean}
     */
    _this.isEmpty = function isEmpty(value) {
        var re;
        if (_this.isUndefined(value) || _this.isNull(value) || '' === value) {
            re = true;
        }
        else if (_this.isBoolean(value) || _this.isNumber(value) || _this.isInfinite(value) || _this.isString(value) || _this.isFunction(value)) {
            re = false;
        }
        else if (_this.isArray(value) || _this.isObject(value)) {
            re = true;
            for (var name in value) {
                re = false;
                break;
            }
        }
        else if (isNaN(value)) {
            re = true;
        }
        else {
            throw 'unable to solve: isEmpty(' + value + '); typeof ' + value + ' === unknown';
        }
        return re;
    };
    /**
     * @param {*} value
     * @returns {boolean}
     */
    _this.toBoolean = function toBoolean(value) {
        var re;
        if (_this.isBoolean(value)) {
            re = value;
        }
        else if (_this.isNull(value) || _this.isUndefined(value)) {
            re = false;
        }
        else if (_this.isInteger(value)) {
            re = 0 !== value;
        }
        else if (_this.isFloat(value)) {
            re = 0.0 !== value;
        }
        else if (_this.isInfinite(value)) {
            re = -Infinity !== value;
        }
        else if (_this.isString(value)) {
            var str = value.toLowerCase();
            if ('false' === str) {
                re = false;
            }
            else if ('true' === str) {
                re = true;
            }
            else if ('0' === str || '0.0' === str) {
                re = false;
            }
            else {
                re = !!value;
            }
        }
        else if (_this.isFunction(value)) {
            re = true;
        }
        else if (_this.isArray(value) || _this.isObject(value)) {
            re = !_this.isEmpty(value);
        }
        else if (isNaN(value)) {
            re = false;
        }
        else {
            re = !!value;
        }
        return re;
    };
    /**
     * @todo toNumber
     * @todo write test
     *
     * @param {*} value
     * @returns {number}
     */
    _this.toNumber = function toNumber(value) {
        var re = Number(value);
        if (_this.isNumber(re)) {
            return re;
        }
        else if (_this.isNaN(re)) {
            return _this.toNumber(_this.toBoolean(value));
        }
    };
    /**
     * @param {*} value
     * @returns {number}
     */
    _this.toInteger = function toInteger(value) {
        var re;
        if (_this.isInteger(value)) {
            re = value;
        }
        else if (_this.isBoolean(value)) {
            re = value ? 1 : 0;
        }
        else if (_this.isNull(value) || _this.isUndefined(value) || _this.isInfinite(value) || _this.isFunction(value) || _this.isArray(value) || _this.isObject(value)) {
            re = _this.toInteger(_this.toBoolean(value));
        }
        else if (_this.isString(value)) {
            var str = value.toLowerCase();
            re = 'false' === str || 'true' === str ? _this.toInteger(_this.toBoolean(str)) : parseInt(value);
        }
        else {
            re = parseInt(value);
        }
        if (isNaN(re)) {
            re = 0;
        }
        return re;
    };
    /**
     * @param {*} value
     * @returns {number}
     */
    _this.toFloat = function toFloat(value) {
        var re;
        if (_this.isFloat(value)) {
            re = value;
        }
        else if (_this.isBoolean(value)) {
            re = value ? 1.0 : 0.0;
        }
        else if (_this.isNull(value) || _this.isUndefined(value) || _this.isInfinite(value) || _this.isFunction(value) || _this.isArray(value) || _this.isObject(value)) {
            re = _this.toFloat(_this.toBoolean(value));
        }
        else if (_this.isString(value)) {
            var str = value.toLowerCase();
            re = 'false' === str || 'true' === str ? _this.toFloat(_this.toBoolean(str)) : parseFloat(value);
        }
        else {
            re = parseFloat(value);
        }
        if (isNaN(re)) {
            re = 0;
        }
        return re;
    };
    /**
     * @param {*} value
     * @returns {string}
     */
    _this.toString = function toString(value) {
        return _this.isArray(value) || _this.isObject(value) ? JSON.stringify(value) : '' + value;
    };
    /**
     * @todo toFunction
     * @todo validate usefulness
     */
    _this.toFunction = function toFunction(value) {
        return _thisNamespace.isFunction(value) ? value : function () {
            return value;
        };
    };
    /**
     * @todo toArray
     * @todo write test
     */
    _this.toArray = function toArray(value) {
        var re;
        if (_this.isArray(value)) {
            re = value;
        }
        else if (_this.isObject(value)) {
            re = [];
            for (var i in value) {
                re.push(value.i);
            }
        } else {
            re = [value];
        }
        return re;
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
            _this.dblClick = 'dblclick';
            /**
             * The event occurs when the user double-clicks on an element
             *
             * @type {string}
             */
            _this.doubleClick = _this.dblClick;
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
            /**
             * The event occurs when the user right-clicks on an element to open a context menu
             *
             * @type {string}
             */
            _this.rightClick = _this.contextMenu;
        };
        /**
         * singleton
         *
         * work-around for visibility of object-content-value in js-api
         *
         * @type {Mouse}
         */
        _this.Mouse = new Mouse();
        /**
         * @returns {Mouse}
         */
        _this.getMouse = function getMouse() {
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
        /**
         * @returns {Keyboard}
         */
        _this.getKeyboard = function getKeyboard() {
            return Keyboard;
        };
        /**
         * @constructor
         */
        var Frame = function Frame() {
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
             * The event occurs when the user navigates away from a web page
             *
             * @type {string}
             */
            _this.pageHide = 'pagehide';
            /**
             * The event occurs when the user navigates to a web page
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
        /**
         * @returns {Frame}
         */
        _this.getFrame = function getFrame() {
            return Frame;
        };
        /**
         * @constructor
         */
        var Drag = function Drag() {
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
        /**
         * @returns {Drag}
         */
        _this.getDrag = function getDrag() {
            return Drag;
        };
        /**
         * @constructor
         */
        var Clipboard = function Clipboard() {
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
        /**
         * @returns {Clipboard}
         */
        _this.getClipboard = function getClipboard() {
            return Clipboard;
        };
        /**
         * @constructor
         */
        var Print = function Print() {
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
        /**
         * @returns {Print}
         */
        _this.getPrint = function getPrint() {
            return Print;
        };
        /**
         * @constructor
         */
        var Media = function Media() {
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
        /**
         * @returns {Media}
         */
        _this.getMedia = function getMedia() {
            return Media;
        };
        /**
         * @constructor
         */
        var Animation = function Animation() {
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
        /**
         * @returns {Animation}
         */
        _this.getAnimation = function getAnimation() {
            return Animation;
        };
        /**
         * @constructor
         */
        var Transition = function Transition() {
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
        /**
         * @returns {Transition}
         */
        _this.getTransition = function getTransition() {
            return Transition;
        };
        /**
         * @constructor
         */
        var ServerSent = function ServerSent() {
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
        /**
         * @returns {ServerSent}
         */
        _this.getServerSent = function getServerSent() {
            return ServerSent;
        };
        /**
         * @constructor
         */
        var Misc = function Misc() {
            /* keyword this in this class context */
            var _this = this;
            /**
             * The event occurs when a message is received through or from an object (WebSocket, Web Worker, Event Source or a child frame or a parent window)
             *
             * @type {string}
             */
            _this.message = 'message';
            /**
             * Deprecated. Use the on wheel event instead on mouse wheel
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
        /**
         * @returns {Misc}
         */
        _this.getMisc = function getMisc() {
            return Misc;
        };
        /**
         * @constructor
         */
        var Touch = function Touch() {
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
        _this.getTouch = function getTouch() {
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
    _this.getEvent = function getEvent() {
        return Event;
    };
    /**
     * @todo window and document
     * @constructor
     */
    var Css = function Css() {
        /* keyword this in this class context */
        var _this = this;
        /**
         * @constructor
         */
        var Identifier = function Identifier() {
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
        _this.getIdentifier = function getIdentifier() {
            return Identifier;
        };
        /**
         * @param {string} selector
         * @returns {string}
         */
        _this.getClassSelector = function getClassSelector(selector) {
            return _this.getSelector(_this.Identifier.class, selector);
        };
        /**
         * @param {string} selector
         * @returns {string}
         */
        _this.getIdSelector = function getIdSelector(selector) {
            return _this.getSelector(_this.Identifier.id, selector);
        };
        /**
         * @param {string} selector
         * @returns {string}
         */
        _this.getTagSelector = function getTagSelector(selector) {
            return _this.getSelector(_this.Identifier.tag, selector);
        };
        /**
         * @param {string} attributeName
         * @param {string} attributeValue
         * @returns {string}
         */
        _this.getAttributeSelector = function getAttributeSelector(attributeName, attributeValue) {
            return '[' + attributeName + '="' + attributeValue + '"]';
        };
        /**
         * @param {string} identifier
         * @param {string} selector
         * @returns {string}
         */
        _this.getSelector = function getSelector(identifier, selector) {
            return identifier + selector;
        };
        /**
         * @todo all tags
         * @todo html class
         * @constructor
         */
        var Tag = function Tag() {
            /* keyword this in this class context */
            var _this = this;
            /**
             * @type {string}
             */
            _this.a = 'a';
            /**
             * @type {string}
             */
            _this.anchor = _this.a;
            /**
             * @type {string}
             */
            _this.div = 'div';
            /**
             * @type {string}
             */
            _this.division = _this.div;
            /**
             * @type {HTMLDocument}
             */
            _this.document = document;
            /**
             * @type {string}
             */
            _this.p = 'p';
            /**
             * @type {string}
             */
            _this.paragraph = _this.p;
            /**
             * @type {string}
             */
            // _this.row;
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
            _this.cell = _this.td;
            /**
             * @type {string}
             */
            _this.tr = 'tr';
            /**
             * @type {string}
             */
            _this.row = _this.tr;
            /**
             * @type {Window}
             */
            _this.window = window;
        };
        /**
         * singleton
         * @type {Tag}
         */
        _this.Tag = new Tag();
        /**
         * @returns {Tag}
         */
        _this.getTag = function getTag() {
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
    _this.getCss = function getCss() {
        return Css;
    };
    /**
     * @todo attributes
     */
    /**
     * @type {DOMHandler&Css}
     * @constructor
     */
    /**
     *
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
     * @returns {DOMHandler}
     */
    _this.getDOMHandler = function getDOMHandler() {
        return DOMHandler;
    };
    /**
     * @constructor
     */
    var Location = function Location() {
        /* keyword this in this class context */
        var _this = this;
        /**
         * Sets or returns the anchor part (#) of a URL
         *
         * @returns {string}
         */
        _this.getHash = function getHash() {
            return location.hash;
        };
        /**
         * Sets or returns the anchor part (#) of a URL
         *
         * @param {string} hash
         */
        _this.setHash = function setHash(hash) {
            location.hash = hash;
        };
        /**
         * Sets or returns the hostname and port number of a URL
         *
         * @returns {string}
         */
        _this.getHost = function getHost() {
            return location.host;
        };
        /**
         * Sets or returns the hostname and port number of a URL
         *
         * @param {string} host
         */
        _this.setHost = function setHost(host) {
            location.host = host;
        };
        /**
         * Sets or returns the hostname of a URL
         *
         * @returns {string}
         */
        _this.getHostname = function getHostname() {
            return location.hostname;
        };
        /**
         * Sets or returns the hostname of a URL
         *
         * @param {string} hostname
         */
        _this.setHostname = function setHostname(hostname) {
            location.hostname = hostname;
        };
        /**
         * Sets or returns the entire URL
         *
         * @returns {string}
         */
        _this.getHref = function getHref() {
            return location.href;
        };
        /**
         * Sets or returns the entire URL
         *
         * @param {string} href
         */
        _this.setHref = function setHref(href) {
            location.href = href;
        };
        /**
         * Returns the protocol, hostname and port number of a URL
         *
         * @returns {string}
         */
        _this.getOrigin = function getOrigin() {
            return location.origin;
        };
        /**
         * Returns the protocol, hostname and port number of a URL
         *
         * @param {string} origin
         */
        _this.setOrigin = function setOrigin(origin) {
            location.origin = origin;
        };
        /**
         * Sets or returns the path name of a URL
         *
         * @returns {string}
         */
        _this.getPathname = function getPathname() {
            return location.pathname;
        };
        /**
         * Sets or returns the path name of a URL
         *
         * @param {string} pathname
         */
        _this.setPathname = function setPathname(pathname) {
            location.pathname = pathname;
        };
        /**
         * Sets or returns the port number of a URL
         *
         * @returns {string}
         */
        _this.getPort = function getPort() {
            return location.port;
        };
        /**
         * Sets or returns the port number of a URL
         *
         * @param {string} port
         */
        _this.setPort = function setPort(port) {
            location.port = port;
        };
        /**
         * Sets or returns the protocol of a URL
         *
         * @returns {string}
         */
        _this.getProtocol = function getProtocol() {
            return location.protocol;
        };
        /**
         * Sets or returns the protocol of a URL
         *
         * @param {string} protocol
         */
        _this.setProtocol = function setProtocol(protocol) {
            location.protocol = protocol;
        };
        /**
         * Sets or returns the query string part of a URL
         *
         * @returns {string}
         */
        _this.getSearch = function getSearch() {
            return location.search;
        };
        /**
         * Sets or returns the query string part of a URL
         *
         * @param {string} search
         */
        _this.setSearch = function setSearch(search) {
            location.search = search;
        };
        /**
         * Loads a new document
         *
         * @param {string} url
         */
        _this.assign = function assign(url) {
            location.assign(url);
        };
        /**
         * Reloads the current document
         *
         * false - Default. Reloads the current page from the cache.
         * true  - Reloads the current page from the server
         *
         * @param {boolean} forceGet
         */
        _this.reload = function reload(forceGet) {
            location.reload(forceGet);
        };
        /**
         * Replaces the current document with a new one
         *
         * @param {string} url
         */
        _this.replace = function replace(url) {
            location.replace(url);
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
    /**
     * @returns {Location}
     */
    _this.getLocation = function getLocation() {
        return Location;
    };
    /**
     * @todo window
     * @todo navigator
     * @todo screen
     * @todo history
     * @todo console
     * @todo storage
     * @todo cookie
     */
};
OJSO = new OJSO();