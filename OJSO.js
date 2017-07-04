/*
 * OJSO JavaScript Library v0.1
 *
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2017.06.26 - 18:50
 */
"use strict";
/* namespace */
// var OJSO = OJSO || new function () {
var OJSO = new function () {
    var _this = this;
    /**
     * @type {OJSO}
     * @private
     */
    var _thisNamespace = _this;
    /**
     * @type {string}
     */
    var benchmarkId = 'OJSOInitialTime';
    /**
     * @type {DummyClass}
     */
    var DummyObj;
    /**
     * @returns {number}
     */
    _this.getMicroTime = function () {
        return (new Date()).getTime();
    };
    /**
     * @param id
     */
    _this.BenchmarkClass = function (id) {
        var _this = this;
        /**
         * @type {{0: {begin: number, end: number, time: number}}}
         */
        var benchmarkCaseHash = {
            0: {
                begin: 0,
                end: 0,
                time: 0
            }
        };
        /**
         * @param id
         */
        _this.begin = function (id) {
            benchmarkCaseHash[id] = {
                begin: _thisNamespace.getMicroTime()
            }
        };
        /**
         * @param id
         * @param dump
         */
        _this.end = function (id, dump) {
            var dumpBool;
            benchmarkCaseHash[id].end = _thisNamespace.getMicroTime();
            dumpBool = dump;
            if (_thisNamespace.isUndefined(dumpBool)) {
                dumpBool = true;
            }
            benchmarkCaseHash[id].time = benchmarkCaseHash[id].end - benchmarkCaseHash[id].begin;
            if (dumpBool) {
                _this.dump(id);
            }
        };
        /**
         * @param id
         */
        _this.dump = function (id) {
            console.log('benchmark run-time analysis: ' + id + ' = ' + benchmarkCaseHash[id].time + 'ms');
        };
        /**
         * @param ifTimeGreaterThan
         */
        _this.dumpAll = function (ifTimeGreaterThan) {
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
    _this.BenchmarkObj = new _this.BenchmarkClass(benchmarkId);
    /**
     * @constructor
     */
    _this.DummyTrait = function () {
        /* keyword this in this class context */
        var _this = this;
        /**
         * @param param1
         */
        _this.traitFunction1 = function (param1) {
            // console.log('trait function 1 = ' + param1);
        };
        /**
         * @param param1
         */
        _this.traitFunction2 = function (param1) {
            // console.log('trait function 2 = ' + param1);
        };
    };
    /**
     * @param param1
     * @constructor
     */
    _this.DummyParentClass = function (param1) {
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
         * @param param1
         * @returns {*}
         */
        _this.publicFunction = function (param1) {
            // console.log(_this.publicParent);
            return param1;
        };
        /* constructor */
        (function (param1) {
            privateParent += param1;
            // console.log(param1 + ' parent');
            // console.log(_this.publicParent);
            // console.log(privateParent);
        })(param1);
    };
    /**
     * singleton
     * @type {DummyClass}
     */
    DummyObj = null;
    /**
     * @param param1
     * @returns {DummyClass}
     * @constructor
     */
    _this.DummyClass = function (param1) {
        /* singleton */
        if (DummyObj instanceof _thisNamespace.DummyClass) {
            // console.log('singleton');
            return DummyObj;
        }
        /* keyword this in this class context */
        var _this = this;
        /* extends simple inheritance */
        _thisNamespace.DummyParentClass.call(_this, param1);
        /* trait use */
        _thisNamespace.DummyTrait.call(_this);
        /**
         * @type {number}
         */
        var privateProperty = 0;
        /**
         * @param param1
         * @returns {*}
         */
        var privateMethod = function (param1) {
            privateProperty += 1;
            return param1;
        };
        /**
         * @type {number}
         */
        _this.publicProperty = 1;
        /**
         * @param param1
         * @returns {*}
         */
        _this.publicMethod = function (param1) {
            // console.log(param1);
            // console.log(privateMethod(param1));
            return param1;
        };
        /* constructor */
        (function (param1) {
            // console.log(param1 + ' child');
            // console.log(privateParent);
            _this.publicParent += param1 + ' in child';
            privateMethod(param1);
            // console.log(_this.publicParent);
            // console.log(privateProperty);
            // console.log(_this.publicProperty);
            DummyObj = _this;
        })(param1);
    };
    /**
     * @param val
     * @returns {boolean}
     */
    _this.isSet = function (val) {
        var re;
        if (_this.isNull(val) || _this.isUndefined(val)) {
            re = false;
        } else if (_this.isBoolean(val) || _this.isNumber(val) || _this.isInfinite(val) || _this.isString(val) || _this.isFunction(val) || _this.isArray(val) || _this.isObject(val)) {
            re = true;
        } else if (isNaN(val)) {
            re = false;
        } else {
            throw 'unable to resolve: isSet(' + val + '); typeof ' + val + ' === unknown'
        }
        return re;
    };
    /**
     * @param val
     * @returns {boolean}
     */
    _this.isEmpty = function (val) {
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
            throw 'unable to resolve: isEmpty(' + val + '); typeof ' + val + ' === unknown'
        }
        return re;
    };
    /**
     * @param val
     * @returns {boolean}
     */
    _this.isNull = function (val) {
        return null === val;
    };
    /**
     * @param val
     * @returns {boolean}
     */
    _this.isUndefined = function (val) {
        return undefined === val;
    };
    /**
     * @param val
     * @returns {boolean}
     */
    _this.isNaN = function (val) {
        return !_this.isNumber(val);
    };
    /**
     * @param val
     * @returns {boolean}
     */
    _this.isBoolean = function (val) {
        return 'boolean' === typeof val;
    };
    /**
     * @param val
     * @returns {boolean}
     */
    _this.isNumber = function (val) {
        return Number(val) === val;
    };
    /**
     * @param val
     * @returns {boolean}
     */
    _this.isNumeric = function (val) {
        return Number(val) == val;
    };
    /**
     * @param val
     * @returns {boolean}
     */
    _this.isInteger = function (val) {
        return _this.isNumber(val) && 0 === val % 1 && !_this.isNaN(val % 1);
    };
    /**
     * @param val
     * @returns {boolean}
     */
    _this.isFloat = function (val) {
        var re;
        if (_this.isInteger(val)) {
            re = true;
        } else {
            re = _this.isNumber(val) && 0 !== val % 1 && !_this.isNaN(val % 1);
        }
        return re;
    };
    /**
     * @param val
     * @returns {boolean}
     */
    _this.isFinite = function (val) {
        return _this.isNumber(val) && isFinite(val);
    };
    /**
     * @param val
     * @returns {boolean}
     */
    _this.isInfinite = function (val) {
        return _this.isNumber(val) && !isFinite(val);
    };
    /**
     * @param val
     * @returns {boolean}
     */
    _this.isString = function (val) {
        return 'string' === typeof val;
    };
    /**
     * @param val
     * @returns {boolean}
     */
    _this.isFunction = function (val) {
        return 'function' === typeof val;
    };
    /**
     * @param val
     * @returns {boolean}
     */
    _this.isArray = function (val) {
        return Array.isArray(val);
    };
    /**
     * @param val
     * @returns {boolean}
     */
    _this.isObject = function (val) {
        return 'object' === typeof val && !_this.isArray(val) && !_this.isNull(val);
    };
    /**
     * @param val
     * @returns {boolean}
     */
    _this.toBoolean = function (val) {
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
     * @param val
     * @returns {number}
     */
    _this.toInteger = function (val) {
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
     * @param val
     * @returns {number}
     */
    _this.toFloat = function (val) {
        var re;
        var str;
        if (_this.isFloat(val)) {
            re = val;
        } else if (_this.isBoolean(val)) {
            re = val ? 1.0 : 0.0;
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
     *
     * @param val
     * @returns {string}
     */
    _this.toString = function (val) {
        var re;
        if (_this.isArray(val) || _this.isObject(val)) {
            re = JSON.stringify(val);
        } else {
            re = '' + val;
        }
        return re;
    };
    // toFunc
    // toArr
    // toObj
    /**
     *
     * @todo new tests
     * @todo micro time benchmark for lib
     * @constructor
     */
    _this.TestClass = function () {
        /**
         * @type {string}
         */
        var separatorStrTest = '#########################';
        var separatorStrCase = '-------------------------';
        /**
         * @todo funciton with body empty
         * @todo funciton with body
         * @todo case -0.1 +0.1
         * @todo -0 and 0 comparison
         * @todo fix in valid testcases
         * @type {{null: null, undefined: undefined, NaN: Number, boolFalse: boolean, boolTrue: boolean, intMinus10: number, intMinus9: number, intMinus1: number, int0: number, int1: number, int9: number, int10: number, intMinus9007199254740992: number, int9007199254740992: number, int999999999999999: number, int9999999999999999: number, int10000000000000000: number, floatMinus12dot234: number, floatMinus1dot2: number, float0dot0: number, float0dot12: number, float1dot2: number, float12dot234: number, floatInaccurate: number, exponentialMinus123e5: number, exponentialMinus123eMinus5: number, exponential123eMinus5: number, exponential123e5: number, binary0b11: number, octal0o17: number, hexadecimal0x1F: number, Finite: number, InfiniteNegative: number, InfinitePositive: Number, strEmpty: string, strfalse: string, strFALSE: string, strtrue: string, strTrue: string, str0: string, str0dot0: string, str1: string, str1dot0: string, str12dot34: string, strAa: string, str1234asdf: string, strasdf1234: string, str1234asdf1234: string, strasdf1234asdf: string, funcAnonymous: funcAnonymous, functestFunction: Window.testFunction2, functestFunctionName: (Window.testFunction2|*), arrEmpty: Array, arr: [number,number], objEmpty: {}, obj: {a: number, b: number}}}
         */
        var testCaseHash = {
            null: null,
            undefined: undefined,
            NaN: NaN,
            boolFalse: false,
            boolTrue: true,
            intMinus10: -10,
            intMinus9: -9,
            intMinus1: -1,
            int0: 0,
            int1: 1,
            int9: 9,
            int10: 10,
            intMinus9007199254740992: -9007199254740992,
            int9007199254740992: 9007199254740992,
            int999999999999999: 999999999999999,
            int9999999999999999: 9999999999999999,
            int10000000000000000: 10000000000000000,
            floatMinus12dot234: -12.234,
            floatMinus1dot2: -1.2,
            float0dot0: 0.0,
            float0dot12: 0.12,
            float1dot2: 1.2,
            float12dot234: 12.234,
            floatInaccurate: 0.2 + 0.1,
            exponentialMinus123e5: -123e5,
            exponentialMinus123eMinus5: -123e-5,
            exponential123eMinus5: 123e-5,
            exponential123e5: 123e5,
            binary0b11: Number('0b11'),
            octal0o17: Number('0o17'),
            hexadecimal0x1F: 0x1F,
            Finite: 1,
            InfiniteNegative: -Infinity,
            InfinitePositive: Infinity,
            strEmpty: '',
            strfalse: 'false',
            strFALSE: 'FALSE',
            strtrue: 'true',
            strTrue: 'True',
            str0: '0',
            str0dot0: '0.0',
            str1: '1',
            str1dot0: '1.0',
            str12dot34: '12.34',
            strAa: 'Aa',
            str1234asdf: '1234asdf',
            strasdf1234: 'asdf1234',
            str1234asdf1234: '1234asdf1234',
            strasdf1234asdf: 'asdf1234asdf',
            funcAnonymous: function () {
            },
            functestFunction: window.testFunction = function testFunction2() {
            },
            functestFunctionName: testFunction,
            arrEmpty: [],
            arr: [1, 2],
            objEmpty: {},
            obj: {a: 1, b: 2}
        };
        /**
         */
        var testHash = {
            isSet: [
                {
                    inputValue: testCaseHash.null,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.undefined,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.NaN,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.boolFalse,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.boolTrue,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.intMinus10,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.intMinus9,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.intMinus1,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.int0,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.int1,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.int9,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.int10,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.intMinus9007199254740992,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.int9007199254740992,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.int999999999999999,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.int9999999999999999,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.int10000000000000000,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.floatMinus12dot234,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.floatMinus1dot2,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.float0dot0,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.float0dot12,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.float1dot2,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.float12dot234,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.floatInaccurate,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.exponentialMinus123e5,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.exponentialMinus123eMinus5,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.exponential123eMinus5,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.exponential123e5,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.binary0b11,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.octal0o17,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.hexadecimal0x1F,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.Finite,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.InfiniteNegative,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.InfinitePositive,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.strEmpty,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.strfalse,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.strFALSE,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.strtrue,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.strTrue,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.str0,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.str0dot0,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.str1,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.str1dot0,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.str12dot34,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.strAa,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.str1234asdf,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.strasdf1234,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.str1234asdf1234,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.strasdf1234asdf,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.funcAnonymous,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.functestFunction,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.functestFunctionName,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.arrEmpty,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.arr,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.objEmpty,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.obj,
                    returnValue: true
                }
            ],
            isEmpty: [
                {
                    inputValue: testCaseHash.null,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.undefined,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.NaN,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.boolFalse,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.boolTrue,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.intMinus10,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.intMinus9,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.intMinus1,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.int0,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.int1,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.int9,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.int10,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.intMinus9007199254740992,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.int9007199254740992,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.int999999999999999,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.int9999999999999999,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.int10000000000000000,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.floatMinus12dot234,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.floatMinus1dot2,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.float0dot0,
                    returnValue: false
                }, {
                    inputValue: testCaseHash.float0dot12,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.float1dot2,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.float12dot234,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.floatInaccurate,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.exponentialMinus123e5,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.exponentialMinus123eMinus5,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.exponential123eMinus5,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.exponential123e5,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.binary0b11,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.octal0o17,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.hexadecimal0x1F,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.Finite,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.InfiniteNegative,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.InfinitePositive,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strEmpty,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.strfalse,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strFALSE,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strtrue,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strTrue,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.str0,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.str0dot0,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.str1,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.str1dot0,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.str12dot34,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strAa,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.str1234asdf,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strasdf1234,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.str1234asdf1234,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strasdf1234asdf,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.funcAnonymous,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.functestFunction,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.functestFunctionName,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.arrEmpty,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.arr,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.objEmpty,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.obj,
                    returnValue: false
                }
            ],
            isNull: [
                {
                    inputValue: testCaseHash.null,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.undefined,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.NaN,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.boolFalse,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.boolTrue,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.intMinus10,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.intMinus9,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.intMinus1,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.int0,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.int1,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.int9,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.int10,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.intMinus9007199254740992,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.int9007199254740992,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.int999999999999999,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.int9999999999999999,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.int10000000000000000,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.floatMinus12dot234,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.floatMinus1dot2,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.float0dot0,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.float0dot12,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.float1dot2,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.float12dot234,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.floatInaccurate,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.exponentialMinus123e5,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.exponentialMinus123eMinus5,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.exponential123eMinus5,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.exponential123e5,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.binary0b11,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.octal0o17,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.hexadecimal0x1F,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.Finite,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.InfiniteNegative,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.InfinitePositive,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strEmpty,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strfalse,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strFALSE,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strtrue,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strTrue,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.str0,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.str0dot0,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.str1,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.str1dot0,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.str12dot34,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strAa,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.str1234asdf,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strasdf1234,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.str1234asdf1234,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strasdf1234asdf,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.funcAnonymous,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.functestFunction,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.functestFunctionName,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.arrEmpty,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.arr,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.objEmpty,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.obj,
                    returnValue: false
                }
            ],
            isUndefined: [
                {
                    inputValue: testCaseHash.null,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.undefined,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.NaN,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.boolFalse,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.boolTrue,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.intMinus10,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.intMinus9,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.intMinus1,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.int0,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.int1,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.int9,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.int10,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.intMinus9007199254740992,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.int9007199254740992,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.int999999999999999,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.int9999999999999999,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.int10000000000000000,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.floatMinus12dot234,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.floatMinus1dot2,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.float0dot0,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.float0dot12,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.float1dot2,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.float12dot234,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.floatInaccurate,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.exponentialMinus123e5,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.exponentialMinus123eMinus5,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.exponential123eMinus5,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.exponential123e5,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.binary0b11,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.octal0o17,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.hexadecimal0x1F,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.Finite,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.InfiniteNegative,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.InfinitePositive,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strEmpty,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strfalse,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strFALSE,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strtrue,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strTrue,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.str0,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.str0dot0,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.str1,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.str1dot0,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.str12dot34,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strAa,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.str1234asdf,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strasdf1234,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.str1234asdf1234,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strasdf1234asdf,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.funcAnonymous,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.functestFunction,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.functestFunctionName,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.arrEmpty,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.arr,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.objEmpty,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.obj,
                    returnValue: false
                }
            ],
            isNaN: [
                {
                    inputValue: testCaseHash.null,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.undefined,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.NaN,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.boolFalse,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.boolTrue,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.intMinus10,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.intMinus9,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.intMinus1,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.int0,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.int1,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.int9,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.int10,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.intMinus9007199254740992,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.int9007199254740992,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.int999999999999999,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.int9999999999999999,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.int10000000000000000,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.floatMinus12dot234,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.floatMinus1dot2,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.float0dot0,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.float0dot12,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.float1dot2,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.float12dot234,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.floatInaccurate,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.exponentialMinus123e5,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.exponentialMinus123eMinus5,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.exponential123eMinus5,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.exponential123e5,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.binary0b11,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.octal0o17,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.hexadecimal0x1F,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.Finite,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.InfiniteNegative,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.InfinitePositive,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strEmpty,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.strfalse,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.strFALSE,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.strtrue,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.strTrue,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.str0,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.str0dot0,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.str1,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.str1dot0,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.str12dot34,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.strAa,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.str1234asdf,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.strasdf1234,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.str1234asdf1234,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.strasdf1234asdf,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.funcAnonymous,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.functestFunction,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.functestFunctionName,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.arrEmpty,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.arr,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.objEmpty,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.obj,
                    returnValue: true
                }
            ],
            isBoolean: [
                {
                    inputValue: testCaseHash.null,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.undefined,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.NaN,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.boolFalse,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.boolTrue,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.intMinus10,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.intMinus9,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.intMinus1,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.int0,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.int1,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.int9,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.int10,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.intMinus9007199254740992,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.int9007199254740992,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.int999999999999999,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.int9999999999999999,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.int10000000000000000,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.floatMinus12dot234,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.floatMinus1dot2,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.float0dot0,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.float0dot12,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.float1dot2,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.float12dot234,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.floatInaccurate,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.exponentialMinus123e5,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.exponentialMinus123eMinus5,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.exponential123eMinus5,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.exponential123e5,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.binary0b11,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.octal0o17,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.hexadecimal0x1F,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.Finite,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.InfiniteNegative,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.InfinitePositive,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strEmpty,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strfalse,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strFALSE,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strtrue,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strTrue,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.str0,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.str0dot0,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.str1,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.str1dot0,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.str12dot34,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strAa,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.str1234asdf,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strasdf1234,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.str1234asdf1234,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strasdf1234asdf,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.funcAnonymous,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.functestFunction,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.functestFunctionName,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.arrEmpty,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.arr,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.objEmpty,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.obj,
                    returnValue: false
                }
            ],
            isNumber: [
                {
                    inputValue: testCaseHash.null,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.undefined,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.NaN,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.boolFalse,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.boolTrue,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.intMinus10,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.intMinus9,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.intMinus1,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.int0,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.int1,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.int9,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.int10,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.intMinus9007199254740992,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.int9007199254740992,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.int999999999999999,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.int9999999999999999,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.int10000000000000000,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.floatMinus12dot234,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.floatMinus1dot2,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.float0dot0,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.float0dot12,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.float1dot2,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.float12dot234,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.floatInaccurate,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.exponentialMinus123e5,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.exponentialMinus123eMinus5,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.exponential123eMinus5,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.exponential123e5,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.binary0b11,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.octal0o17,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.hexadecimal0x1F,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.Finite,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.InfiniteNegative,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.InfinitePositive,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.strEmpty,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strfalse,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strFALSE,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strtrue,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strTrue,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.str0,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.str0dot0,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.str1,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.str1dot0,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.str12dot34,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strAa,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.str1234asdf,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strasdf1234,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.str1234asdf1234,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strasdf1234asdf,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.funcAnonymous,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.functestFunction,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.functestFunctionName,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.arrEmpty,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.arr,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.objEmpty,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.obj,
                    returnValue: false
                }
            ],
            isNumeric: [
                {
                    inputValue: testCaseHash.null,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.undefined,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.NaN,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.boolFalse,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.boolTrue,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.intMinus10,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.intMinus9,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.intMinus1,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.int0,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.int1,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.int9,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.int10,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.intMinus9007199254740992,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.int9007199254740992,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.int999999999999999,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.int9999999999999999,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.int10000000000000000,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.floatMinus12dot234,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.floatMinus1dot2,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.float0dot0,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.float0dot12,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.float1dot2,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.float12dot234,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.floatInaccurate,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.exponentialMinus123e5,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.exponentialMinus123eMinus5,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.exponential123eMinus5,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.exponential123e5,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.binary0b11,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.octal0o17,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.hexadecimal0x1F,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.Finite,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.InfiniteNegative,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.InfinitePositive,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.strEmpty,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.strfalse,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strFALSE,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strtrue,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strTrue,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.str0,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.str0dot0,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.str1,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.str1dot0,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.str12dot34,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.strAa,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.str1234asdf,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strasdf1234,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.str1234asdf1234,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strasdf1234asdf,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.funcAnonymous,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.functestFunction,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.functestFunctionName,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.arrEmpty,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.arr,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.objEmpty,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.obj,
                    returnValue: false
                }
            ],
            isInteger: [
                {
                    inputValue: testCaseHash.null,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.undefined,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.NaN,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.boolFalse,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.boolTrue,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.intMinus10,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.intMinus9,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.intMinus1,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.int0,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.int1,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.int9,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.int10,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.intMinus9007199254740992,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.int9007199254740992,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.int999999999999999,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.int9999999999999999,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.int10000000000000000,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.floatMinus12dot234,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.floatMinus1dot2,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.float0dot0,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.float0dot12,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.float1dot2,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.float12dot234,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.floatInaccurate,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.exponentialMinus123e5,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.exponentialMinus123eMinus5,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.exponential123eMinus5,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.exponential123e5,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.binary0b11,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.octal0o17,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.hexadecimal0x1F,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.Finite,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.InfiniteNegative,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.InfinitePositive,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strEmpty,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strfalse,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strFALSE,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strtrue,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strTrue,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.str0,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.str0dot0,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.str1,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.str1dot0,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.str12dot34,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strAa,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.str1234asdf,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strasdf1234,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.str1234asdf1234,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strasdf1234asdf,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.funcAnonymous,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.functestFunction,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.functestFunctionName,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.arrEmpty,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.arr,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.objEmpty,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.obj,
                    returnValue: false
                }
            ],
            isFloat: [
                {
                    inputValue: testCaseHash.null,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.undefined,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.NaN,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.boolFalse,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.boolTrue,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.intMinus10,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.intMinus9,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.intMinus1,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.int0,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.int1,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.int9,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.int10,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.intMinus9007199254740992,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.int9007199254740992,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.int999999999999999,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.int9999999999999999,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.int10000000000000000,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.floatMinus12dot234,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.floatMinus1dot2,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.float0dot0,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.float0dot12,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.float1dot2,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.float12dot234,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.floatInaccurate,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.exponentialMinus123e5,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.exponentialMinus123eMinus5,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.exponential123eMinus5,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.exponential123e5,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.binary0b11,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.octal0o17,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.hexadecimal0x1F,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.Finite,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.InfiniteNegative,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.InfinitePositive,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strEmpty,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strfalse,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strFALSE,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strtrue,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strTrue,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.str0,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.str0dot0,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.str1,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.str1dot0,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.str12dot34,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strAa,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.str1234asdf,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strasdf1234,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.str1234asdf1234,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strasdf1234asdf,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.funcAnonymous,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.functestFunction,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.functestFunctionName,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.arrEmpty,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.arr,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.objEmpty,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.obj,
                    returnValue: false
                }
            ],
            isFinite: [
                {
                    inputValue: testCaseHash.null,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.undefined,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.NaN,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.boolFalse,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.boolTrue,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.intMinus10,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.intMinus9,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.intMinus1,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.int0,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.int1,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.int9,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.int10,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.intMinus9007199254740992,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.int9007199254740992,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.int999999999999999,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.int9999999999999999,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.int10000000000000000,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.floatMinus12dot234,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.floatMinus1dot2,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.float0dot0,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.float0dot12,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.float1dot2,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.float12dot234,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.floatInaccurate,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.exponentialMinus123e5,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.exponentialMinus123eMinus5,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.exponential123eMinus5,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.exponential123e5,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.binary0b11,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.octal0o17,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.hexadecimal0x1F,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.Finite,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.InfiniteNegative,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.InfinitePositive,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strEmpty,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strfalse,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strFALSE,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strtrue,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strTrue,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.str0,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.str0dot0,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.str1,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.str1dot0,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.str12dot34,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strAa,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.str1234asdf,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strasdf1234,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.str1234asdf1234,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strasdf1234asdf,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.funcAnonymous,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.functestFunction,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.functestFunctionName,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.arrEmpty,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.arr,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.objEmpty,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.obj,
                    returnValue: false
                }
            ],
            isInfinite: [
                {
                    inputValue: testCaseHash.null,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.undefined,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.NaN,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.boolFalse,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.boolTrue,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.intMinus10,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.intMinus9,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.intMinus1,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.int0,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.int1,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.int9,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.int10,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.intMinus9007199254740992,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.int9007199254740992,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.int999999999999999,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.int9999999999999999,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.int10000000000000000,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.floatMinus12dot234,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.floatMinus1dot2,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.float0dot0,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.float0dot12,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.float1dot2,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.float12dot234,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.floatInaccurate,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.exponentialMinus123e5,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.exponentialMinus123eMinus5,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.exponential123eMinus5,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.exponential123e5,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.binary0b11,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.octal0o17,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.hexadecimal0x1F,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.Finite,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.InfiniteNegative,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.InfinitePositive,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.strEmpty,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strfalse,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strFALSE,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strtrue,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strTrue,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.str0,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.str0dot0,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.str1,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.str1dot0,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.str12dot34,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strAa,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.str1234asdf,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strasdf1234,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.str1234asdf1234,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strasdf1234asdf,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.funcAnonymous,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.functestFunction,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.functestFunctionName,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.arrEmpty,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.arr,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.objEmpty,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.obj,
                    returnValue: false
                }
            ],
            isString: [
                {
                    inputValue: testCaseHash.null,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.undefined,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.NaN,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.boolFalse,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.boolTrue,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.intMinus10,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.intMinus9,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.intMinus1,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.int0,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.int1,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.int9,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.int10,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.intMinus9007199254740992,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.int9007199254740992,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.int999999999999999,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.int9999999999999999,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.int10000000000000000,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.floatMinus12dot234,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.floatMinus1dot2,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.float0dot0,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.float0dot12,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.float1dot2,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.float12dot234,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.floatInaccurate,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.exponentialMinus123e5,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.exponentialMinus123eMinus5,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.exponential123eMinus5,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.exponential123e5,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.binary0b11,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.octal0o17,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.hexadecimal0x1F,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.Finite,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.InfiniteNegative,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.InfinitePositive,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strEmpty,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.strfalse,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.strFALSE,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.strtrue,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.strTrue,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.str0,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.str0dot0,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.str1,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.str1dot0,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.str12dot34,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.strAa,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.str1234asdf,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.strasdf1234,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.str1234asdf1234,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.strasdf1234asdf,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.funcAnonymous,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.functestFunction,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.functestFunctionName,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.arrEmpty,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.arr,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.objEmpty,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.obj,
                    returnValue: false
                }
            ],
            isFunction: [
                {
                    inputValue: testCaseHash.null,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.undefined,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.NaN,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.boolFalse,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.boolTrue,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.intMinus10,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.intMinus9,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.intMinus1,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.int0,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.int1,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.int9,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.int10,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.intMinus9007199254740992,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.int9007199254740992,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.int999999999999999,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.int9999999999999999,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.int10000000000000000,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.floatMinus12dot234,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.floatMinus1dot2,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.float0dot0,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.float0dot12,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.float1dot2,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.float12dot234,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.floatInaccurate,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.exponentialMinus123e5,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.exponentialMinus123eMinus5,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.exponential123eMinus5,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.exponential123e5,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.binary0b11,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.octal0o17,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.hexadecimal0x1F,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.Finite,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.InfiniteNegative,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.InfinitePositive,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strEmpty,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strfalse,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strFALSE,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strtrue,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strTrue,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.str0,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.str0dot0,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.str1,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.str1dot0,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.str12dot34,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strAa,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.str1234asdf,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strasdf1234,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.str1234asdf1234,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strasdf1234asdf,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.funcAnonymous,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.functestFunction,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.functestFunctionName,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.arrEmpty,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.arr,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.objEmpty,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.obj,
                    returnValue: false
                }
            ],
            isArray: [
                {
                    inputValue: testCaseHash.null,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.undefined,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.NaN,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.boolFalse,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.boolTrue,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.intMinus10,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.intMinus9,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.intMinus1,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.int0,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.int1,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.int9,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.int10,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.intMinus9007199254740992,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.int9007199254740992,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.int999999999999999,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.int9999999999999999,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.int10000000000000000,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.floatMinus12dot234,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.floatMinus1dot2,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.float0dot0,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.float0dot12,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.float1dot2,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.float12dot234,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.floatInaccurate,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.exponentialMinus123e5,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.exponentialMinus123eMinus5,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.exponential123eMinus5,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.exponential123e5,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.binary0b11,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.octal0o17,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.hexadecimal0x1F,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.Finite,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.InfiniteNegative,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.InfinitePositive,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strEmpty,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strfalse,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strFALSE,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strtrue,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strTrue,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.str0,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.str0dot0,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.str1,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.str1dot0,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.str12dot34,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strAa,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.str1234asdf,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strasdf1234,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.str1234asdf1234,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strasdf1234asdf,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.funcAnonymous,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.functestFunction,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.functestFunctionName,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.arrEmpty,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.arr,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.objEmpty,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.obj,
                    returnValue: false
                }
            ],
            isObject: [
                {
                    inputValue: testCaseHash.null,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.undefined,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.NaN,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.boolFalse,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.boolTrue,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.intMinus10,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.intMinus9,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.intMinus1,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.int0,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.int1,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.int9,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.int10,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.intMinus9007199254740992,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.int9007199254740992,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.int999999999999999,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.int9999999999999999,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.int10000000000000000,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.floatMinus12dot234,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.floatMinus1dot2,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.float0dot0,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.float0dot12,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.float1dot2,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.float12dot234,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.floatInaccurate,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.exponentialMinus123e5,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.exponentialMinus123eMinus5,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.exponential123eMinus5,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.exponential123e5,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.binary0b11,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.octal0o17,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.hexadecimal0x1F,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.Finite,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.InfiniteNegative,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.InfinitePositive,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strEmpty,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strfalse,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strFALSE,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strtrue,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strTrue,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.str0,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.str0dot0,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.str1,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.str1dot0,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.str12dot34,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strAa,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.str1234asdf,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strasdf1234,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.str1234asdf1234,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strasdf1234asdf,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.funcAnonymous,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.functestFunction,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.functestFunctionName,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.arrEmpty,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.arr,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.objEmpty,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.obj,
                    returnValue: true
                }
            ],
            toBoolean: [
                {
                    inputValue: testCaseHash.null,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.undefined,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.NaN,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.boolFalse,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.boolTrue,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.intMinus10,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.intMinus9,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.intMinus1,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.int0,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.int1,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.int9,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.int10,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.intMinus9007199254740992,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.int9007199254740992,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.int999999999999999,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.int9999999999999999,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.int10000000000000000,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.floatMinus12dot234,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.floatMinus1dot2,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.float0dot0,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.float0dot12,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.float1dot2,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.float12dot234,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.floatInaccurate,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.exponentialMinus123e5,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.exponentialMinus123eMinus5,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.exponential123eMinus5,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.exponential123e5,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.binary0b11,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.octal0o17,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.hexadecimal0x1F,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.Finite,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.InfiniteNegative,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.InfinitePositive,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.strEmpty,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strfalse,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strFALSE,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.strtrue,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.strTrue,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.str0,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.str0dot0,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.str1,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.str1dot0,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.str12dot34,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.strAa,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.str1234asdf,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.strasdf1234,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.str1234asdf1234,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.strasdf1234asdf,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.funcAnonymous,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.functestFunction,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.functestFunctionName,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.arrEmpty,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.arr,
                    returnValue: true
                },
                {
                    inputValue: testCaseHash.objEmpty,
                    returnValue: false
                },
                {
                    inputValue: testCaseHash.obj,
                    returnValue: true
                }
            ],
            toInteger: [
                {
                    inputValue: testCaseHash.null,
                    returnValue: 0
                },
                {
                    inputValue: testCaseHash.undefined,
                    returnValue: 0
                },
                {
                    inputValue: testCaseHash.NaN,
                    returnValue: 0
                },
                {
                    inputValue: testCaseHash.boolFalse,
                    returnValue: 0
                },
                {
                    inputValue: testCaseHash.boolTrue,
                    returnValue: 1
                },
                {
                    inputValue: testCaseHash.intMinus10,
                    returnValue: -10
                },
                {
                    inputValue: testCaseHash.intMinus9,
                    returnValue: -9
                },
                {
                    inputValue: testCaseHash.intMinus1,
                    returnValue: -1
                },
                {
                    inputValue: testCaseHash.int0,
                    returnValue: 0
                },
                {
                    inputValue: testCaseHash.int1,
                    returnValue: 1
                },
                {
                    inputValue: testCaseHash.int9,
                    returnValue: 9
                },
                {
                    inputValue: testCaseHash.int10,
                    returnValue: 10
                },
                {
                    inputValue: testCaseHash.intMinus9007199254740992,
                    returnValue: -9007199254740992
                },
                {
                    inputValue: testCaseHash.int9007199254740992,
                    returnValue: 9007199254740992
                },
                {
                    inputValue: testCaseHash.int999999999999999,
                    returnValue: 999999999999999
                },
                {
                    inputValue: testCaseHash.int9999999999999999,
                    returnValue: 9999999999999999
                },
                {
                    inputValue: testCaseHash.int10000000000000000,
                    returnValue: 10000000000000000
                },
                {
                    inputValue: testCaseHash.floatMinus12dot234,
                    returnValue: -12
                },
                {
                    inputValue: testCaseHash.floatMinus1dot2,
                    returnValue: -1
                },
                {
                    inputValue: testCaseHash.float0dot0,
                    returnValue: 0
                },
                {
                    inputValue: testCaseHash.float0dot12,
                    returnValue: 0
                },
                {
                    inputValue: testCaseHash.float1dot2,
                    returnValue: 1
                },
                {
                    inputValue: testCaseHash.float12dot234,
                    returnValue: 12
                },
                {
                    inputValue: testCaseHash.floatInaccurate,
                    returnValue: 0
                },
                {
                    inputValue: testCaseHash.exponentialMinus123e5,
                    returnValue: -12300000
                },
                {
                    inputValue: testCaseHash.exponentialMinus123eMinus5,
                    returnValue: -0
                },
                {
                    inputValue: testCaseHash.exponential123eMinus5,
                    returnValue: 0
                },
                {
                    inputValue: testCaseHash.exponential123e5,
                    returnValue: 12300000
                },
                {
                    inputValue: testCaseHash.binary0b11,
                    returnValue: 3
                },
                {
                    inputValue: testCaseHash.octal0o17,
                    returnValue: 15
                },
                {
                    inputValue: testCaseHash.hexadecimal0x1F,
                    returnValue: 31
                },
                {
                    inputValue: testCaseHash.Finite,
                    returnValue: 1
                },
                {
                    inputValue: testCaseHash.InfiniteNegative,
                    returnValue: 0
                },
                {
                    inputValue: testCaseHash.InfinitePositive,
                    returnValue: 1
                },
                {
                    inputValue: testCaseHash.strEmpty,
                    returnValue: 0
                },
                {
                    inputValue: testCaseHash.strfalse,
                    returnValue: 0
                },
                {
                    inputValue: testCaseHash.strFALSE,
                    returnValue: 0
                },
                {
                    inputValue: testCaseHash.strtrue,
                    returnValue: 1
                },
                {
                    inputValue: testCaseHash.strTrue,
                    returnValue: 1
                },
                {
                    inputValue: testCaseHash.str0,
                    returnValue: 0
                },
                {
                    inputValue: testCaseHash.str0dot0,
                    returnValue: 0
                },
                {
                    inputValue: testCaseHash.str1,
                    returnValue: 1
                },
                {
                    inputValue: testCaseHash.str1dot0,
                    returnValue: 1
                },
                {
                    inputValue: testCaseHash.str12dot34,
                    returnValue: 12
                },
                {
                    inputValue: testCaseHash.strAa,
                    returnValue: 0
                },
                {
                    inputValue: testCaseHash.str1234asdf,
                    returnValue: 1234
                },
                {
                    inputValue: testCaseHash.strasdf1234,
                    returnValue: 0
                },
                {
                    inputValue: testCaseHash.str1234asdf1234,
                    returnValue: 1234
                },
                {
                    inputValue: testCaseHash.strasdf1234asdf,
                    returnValue: 0
                },
                {
                    inputValue: testCaseHash.funcAnonymous,
                    returnValue: 1
                },
                {
                    inputValue: testCaseHash.functestFunction,
                    returnValue: 1
                },
                {
                    inputValue: testCaseHash.functestFunctionName,
                    returnValue: 1
                },
                {
                    inputValue: testCaseHash.arrEmpty,
                    returnValue: 0
                },
                {
                    inputValue: testCaseHash.arr,
                    returnValue: 1
                },
                {
                    inputValue: testCaseHash.objEmpty,
                    returnValue: 0
                },
                {
                    inputValue: testCaseHash.obj,
                    returnValue: 1
                }
            ],
            toFloat: [
                {
                    inputValue: testCaseHash.null,
                    returnValue: 0.0
                },
                {
                    inputValue: testCaseHash.undefined,
                    returnValue: 0.0
                },
                {
                    inputValue: testCaseHash.NaN,
                    returnValue: 0.0
                },
                {
                    inputValue: testCaseHash.boolFalse,
                    returnValue: 0.0
                },
                {
                    inputValue: testCaseHash.boolTrue,
                    returnValue: 1.0
                },
                {
                    inputValue: testCaseHash.intMinus10,
                    returnValue: -10.0
                },
                {
                    inputValue: testCaseHash.intMinus9,
                    returnValue: -9.0
                },
                {
                    inputValue: testCaseHash.intMinus1,
                    returnValue: -1.0
                },
                {
                    inputValue: testCaseHash.int0,
                    returnValue: 0.0
                },
                {
                    inputValue: testCaseHash.int1,
                    returnValue: 1.0
                },
                {
                    inputValue: testCaseHash.int9,
                    returnValue: 9.0
                },
                {
                    inputValue: testCaseHash.int10,
                    returnValue: 10.0
                },
                {
                    inputValue: testCaseHash.intMinus9007199254740992,
                    returnValue: -9007199254740992.0
                },
                {
                    inputValue: testCaseHash.int9007199254740992,
                    returnValue: 9007199254740992.0
                },
                {
                    inputValue: testCaseHash.int999999999999999,
                    returnValue: 999999999999999.0
                },
                {
                    inputValue: testCaseHash.int9999999999999999,
                    returnValue: 9999999999999999.0
                },
                {
                    inputValue: testCaseHash.int10000000000000000,
                    returnValue: 10000000000000000.0
                },
                {
                    inputValue: testCaseHash.floatMinus12dot234,
                    returnValue: -12.234
                },
                {
                    inputValue: testCaseHash.floatMinus1dot2,
                    returnValue: -1.2
                },
                {
                    inputValue: testCaseHash.float0dot0,
                    returnValue: 0.0
                },
                {
                    inputValue: testCaseHash.float0dot12,
                    returnValue: 0.12
                },
                {
                    inputValue: testCaseHash.float1dot2,
                    returnValue: 1.2
                },
                {
                    inputValue: testCaseHash.float12dot234,
                    returnValue: 12.234
                },
                {
                    inputValue: testCaseHash.floatInaccurate,
                    returnValue: 0.30000000000000004
                },
                {
                    inputValue: testCaseHash.exponentialMinus123e5,
                    returnValue: -12300000.0
                },
                {
                    inputValue: testCaseHash.exponentialMinus123eMinus5,
                    returnValue: -0.00123
                },
                {
                    inputValue: testCaseHash.exponential123eMinus5,
                    returnValue: 0.00123
                },
                {
                    inputValue: testCaseHash.exponential123e5,
                    returnValue: 12300000.0
                },
                {
                    inputValue: testCaseHash.binary0b11,
                    returnValue: 3.0
                },
                {
                    inputValue: testCaseHash.octal0o17,
                    returnValue: 15.0
                },
                {
                    inputValue: testCaseHash.hexadecimal0x1F,
                    returnValue: 31.0
                },
                {
                    inputValue: testCaseHash.Finite,
                    returnValue: 1.0
                },
                {
                    inputValue: testCaseHash.InfiniteNegative,
                    returnValue: 0.0
                },
                {
                    inputValue: testCaseHash.InfinitePositive,
                    returnValue: 1.0
                },
                {
                    inputValue: testCaseHash.strEmpty,
                    returnValue: 0.0
                },
                {
                    inputValue: testCaseHash.strfalse,
                    returnValue: 0.0
                },
                {
                    inputValue: testCaseHash.strFALSE,
                    returnValue: 0.0
                },
                {
                    inputValue: testCaseHash.strtrue,
                    returnValue: 1.0
                },
                {
                    inputValue: testCaseHash.strTrue,
                    returnValue: 1.0
                },
                {
                    inputValue: testCaseHash.str0,
                    returnValue: 0.0
                },
                {
                    inputValue: testCaseHash.str0dot0,
                    returnValue: 0.0
                },
                {
                    inputValue: testCaseHash.str1,
                    returnValue: 1.0
                },
                {
                    inputValue: testCaseHash.str1dot0,
                    returnValue: 1.0
                },
                {
                    inputValue: testCaseHash.str12dot34,
                    returnValue: 12.34
                },
                {
                    inputValue: testCaseHash.strAa,
                    returnValue: 0.0
                },
                {
                    inputValue: testCaseHash.str1234asdf,
                    returnValue: 1234.0
                },
                {
                    inputValue: testCaseHash.strasdf1234,
                    returnValue: 0.0
                },
                {
                    inputValue: testCaseHash.str1234asdf1234,
                    returnValue: 1234.0
                },
                {
                    inputValue: testCaseHash.strasdf1234asdf,
                    returnValue: 0.0
                },
                {
                    inputValue: testCaseHash.funcAnonymous,
                    returnValue: 1.0
                },
                {
                    inputValue: testCaseHash.functestFunction,
                    returnValue: 1.0
                },
                {
                    inputValue: testCaseHash.functestFunctionName,
                    returnValue: 1.0
                },
                {
                    inputValue: testCaseHash.arrEmpty,
                    returnValue: 0.0
                },
                {
                    inputValue: testCaseHash.arr,
                    returnValue: 1.0
                },
                {
                    inputValue: testCaseHash.objEmpty,
                    returnValue: 0.0
                },
                {
                    inputValue: testCaseHash.obj,
                    returnValue: 1.0
                }
            ],
            toString: [
                {
                    inputValue: testCaseHash.null,
                    returnValue: 'null'
                },
                {
                    inputValue: testCaseHash.undefined,
                    returnValue: 'undefined'
                },
                {
                    inputValue: testCaseHash.NaN,
                    returnValue: 'NaN'
                },
                {
                    inputValue: testCaseHash.boolFalse,
                    returnValue: 'false'
                },
                {
                    inputValue: testCaseHash.boolTrue,
                    returnValue: 'true'
                },
                {
                    inputValue: testCaseHash.intMinus10,
                    returnValue: '-10'
                },
                {
                    inputValue: testCaseHash.intMinus9,
                    returnValue: '-9'
                },
                {
                    inputValue: testCaseHash.intMinus1,
                    returnValue: '-1'
                },
                {
                    inputValue: testCaseHash.int0,
                    returnValue: '0'
                },
                {
                    inputValue: testCaseHash.int1,
                    returnValue: '1'
                },
                {
                    inputValue: testCaseHash.int9,
                    returnValue: '9'
                },
                {
                    inputValue: testCaseHash.int10,
                    returnValue: '10'
                },
                {
                    inputValue: testCaseHash.intMinus9007199254740992,
                    returnValue: '-9007199254740992'
                },
                {
                    inputValue: testCaseHash.int9007199254740992,
                    returnValue: '9007199254740992'
                },
                {
                    inputValue: testCaseHash.int999999999999999,
                    returnValue: '999999999999999'
                },
                {
                    inputValue: testCaseHash.int9999999999999999,
                    returnValue: '10000000000000000'
                },
                {
                    inputValue: testCaseHash.int10000000000000000,
                    returnValue: '10000000000000000'
                },
                {
                    inputValue: testCaseHash.floatMinus12dot234,
                    returnValue: '-12.234'
                },
                {
                    inputValue: testCaseHash.floatMinus1dot2,
                    returnValue: '-1.2'
                },
                {
                    inputValue: testCaseHash.float0dot0,
                    returnValue: '0'
                },
                {
                    inputValue: testCaseHash.float0dot12,
                    returnValue: '0.12'
                },
                {
                    inputValue: testCaseHash.float1dot2,
                    returnValue: '1.2'
                },
                {
                    inputValue: testCaseHash.float12dot234,
                    returnValue: '12.234'
                },
                {
                    inputValue: testCaseHash.floatInaccurate,
                    returnValue: '0.30000000000000004'
                },
                {
                    inputValue: testCaseHash.exponentialMinus123e5,
                    returnValue: '-12300000'
                },
                {
                    inputValue: testCaseHash.exponentialMinus123eMinus5,
                    returnValue: '-0.00123'
                },
                {
                    inputValue: testCaseHash.exponential123eMinus5,
                    returnValue: '0.00123'
                },
                {
                    inputValue: testCaseHash.exponential123e5,
                    returnValue: '12300000'
                },
                {
                    inputValue: testCaseHash.binary0b11,
                    returnValue: '3'
                },
                {
                    inputValue: testCaseHash.octal0o17,
                    returnValue: '15'
                },
                {
                    inputValue: testCaseHash.hexadecimal0x1F,
                    returnValue: '31'
                },
                {
                    inputValue: testCaseHash.Finite,
                    returnValue: '1'
                },
                {
                    inputValue: testCaseHash.InfiniteNegative,
                    returnValue: '-Infinity'
                },
                {
                    inputValue: testCaseHash.InfinitePositive,
                    returnValue: 'Infinity'
                },
                {
                    inputValue: testCaseHash.strEmpty,
                    returnValue: ''
                },
                {
                    inputValue: testCaseHash.strfalse,
                    returnValue: 'false'
                },
                {
                    inputValue: testCaseHash.strFALSE,
                    returnValue: 'FALSE'
                },
                {
                    inputValue: testCaseHash.strtrue,
                    returnValue: 'true'
                },
                {
                    inputValue: testCaseHash.strTrue,
                    returnValue: 'True'
                },
                {
                    inputValue: testCaseHash.str0,
                    returnValue: '0'
                },
                {
                    inputValue: testCaseHash.str0dot0,
                    returnValue: '0.0'
                },
                {
                    inputValue: testCaseHash.str1,
                    returnValue: '1'
                },
                {
                    inputValue: testCaseHash.str1dot0,
                    returnValue: '1.0'
                },
                {
                    inputValue: testCaseHash.str12dot34,
                    returnValue: '12.34'
                },
                {
                    inputValue: testCaseHash.strAa,
                    returnValue: 'Aa'
                },
                {
                    inputValue: testCaseHash.str1234asdf,
                    returnValue: '1234asdf'
                },
                {
                    inputValue: testCaseHash.strasdf1234,
                    returnValue: 'asdf1234'
                },
                {
                    inputValue: testCaseHash.str1234asdf1234,
                    returnValue: '1234asdf1234'
                },
                {
                    inputValue: testCaseHash.strasdf1234asdf,
                    returnValue: 'asdf1234asdf'
                },
                {
                    inputValue: testCaseHash.funcAnonymous,
                    returnValue: 'function () {\n' +
                    '            }'
                },
                {
                    inputValue: testCaseHash.functestFunction,
                    returnValue: 'function testFunction2() {\n' +
                    '            }'
                },
                {
                    inputValue: testCaseHash.functestFunctionName,
                    returnValue: 'function testFunction2() {\n' +
                    '            }'
                },
                {
                    inputValue: testCaseHash.arrEmpty,
                    returnValue: '[]'
                },
                {
                    inputValue: testCaseHash.arr,
                    returnValue: '[1,2]'
                },
                {
                    inputValue: testCaseHash.objEmpty,
                    returnValue: '{}'
                },
                {
                    inputValue: testCaseHash.obj,
                    returnValue: '{"a":1,"b":2}'
                }
            ],
        };
        /**
         */
        var testSeparator = function () {
            console.log(separatorStrTest + separatorStrTest + separatorStrTest);
        };
        /**
         */
        var caseSeparator = function () {
            console.log(separatorStrCase + separatorStrCase);
        };
        /**
         * @param func
         * @param val
         * @param expected
         * @param i
         */
        var testCase = function (func, val, expected, i) {
            var benchmarkId = func + '(' + val + ')';
            _this.BenchmarkObj.begin(benchmarkId);
            var re = _thisNamespace[func](val);
            _this.BenchmarkObj.end(benchmarkId, false);
            if (expected !== re) {
                caseSeparator();
                console.log('case:');
                console.log(Object.keys(testCaseHash)[i]);
                console.log('input:');
                console.log(val);
                console.log('output:');
                console.log(re);
                console.log('expected:');
                console.log(expected);
                console.log('benchmark:');
                _this.BenchmarkObj.dump(benchmarkId);
            }
        };
        /**
         * @todo console.log swap to log debug function
         * @param test
         */
        var runTest = function (test) {
            var i;
            testSeparator();
            console.log(test + ' testing in progress...');
            for (i in testHash[test]) {
                testCase(test, testHash[test][i].inputValue, testHash[test][i].returnValue, i);
            }
            caseSeparator();
            console.log('...' + test + ' successful finished!');
        };
        /**
         */
        var startTestAll = function () {
            var test;
            for (test in testHash) {
                runTest(test);
            }
            testSeparator();
            _this.BenchmarkObj.dumpAll(0);
        };
        /* constructor */
        (function () {
            startTestAll();
        })();
    };
    // /**
    //  * singleton
    //  *
    //  * @type {_thisNamespace.DOMHandlerClass}
    //  */
    // var DOMHandlerObj;
    // /**
    //  *
    //  * @returns {_thisNamespace.DOMHandlerClass}
    //  * @constructor
    //  */
    // _this.DOMHandlerClass = function () {
    //     /* singleton */
    //     if (DOMHandlerObj instanceof _thisNamespace.DOMHandlerClass) {
    //         return DOMHandlerObj;
    //     }
    //     /* keyword this in this class context */
    //     var _this = this;
    //     _this.document = document;
    //     _this.$doc = {};
    //     _this.CLICK_EVENT = 'click';
    //     // _this.EVENT = new _thisNamespace.EventClass();
    //     // _this.Event = {
    //     //     click: 'click',
    //     //     change: 'change',
    //     //     keyUp: 'keyup'
    //     // };
    //     /**
    //      *
    //      * @param selector
    //      * @returns {*|jQuery|HTMLElement}
    //      */
    //     _this.selectDOMElement = function (selector) {
    //         return jQuery(selector);
    //     };
    //     /**
    //      *
    //      * @param selector
    //      * @returns {*|jQuery|HTMLElement}
    //      */
    //     _this.select = function (selector) {
    //         return _this.selectDOMElement(selector);
    //     };
    //     (function () {
    //         _this.$doc = _this.select(_this.document);
    //         DOMHandlerObj = _this;
    //     })()
    // };
    _this.BenchmarkObj.end(benchmarkId);
};
(new OJSO.TestClass());
// var c = 1000000;
// var benchmarkId = '{}toInt' + c;
// var Benchmark = new OJSO.BenchmarkClass(benchmarkId);
// var Benchmark = OJSO.BenchmarkObj;
// Benchmark.begin(benchmarkId);
// for (var i = 0; i < c; i++) {
//     OJSO.toInteger({});
// if (1) {
// }
// } else {
// }
// Benchmark.end(benchmarkId);
// var benchmarkId = 'truetoInt' + c;
// Benchmark.begin(benchmarkId);
// for (var i = 0; i < c; i++) {
// OJSO.toInteger({});
// switch (1) {
//     case 1:
//         break;
//     default:
//         break;
// }
// }
// Benchmark.end(benchmarkId);
// Benchmark.end(runTestAllId);
// Benchmark.dumpAll(0);
// console.log((new Date()).getTime() - OJSO.startTime);
// console.log(OJSO.isInteger(0));
// console.log(OJSO.isInteger(0.0));
// console.log(OJSO.isInteger(1));
// console.log(OJSO.isInteger(1.2));
// console.log(OJSO.isFloat(0));
// console.log(OJSO.isFloat(0.0));
// console.log(OJSO.isFloat(1));
// console.log(OJSO.isFloat(1.2));
// console.log(OJSO.isInteger(NaN));
// console.log(OJSO.isFloat(NaN));
// console.log(OJSO);
// console.log(new OJSO.DummyClass(1));
// console.log(new OJSO.DummyClass(2));
// console.log(OJSO);
// console.log((new Date()).getTime() - OJSO.startTime);
// try catch final?
// /**
//  *
//  * @returns {OJSO.EventClass}
//  * @constructor
//  */
// OJSO.EventClass = function () {
//     var _this = this;
//     _this.on = 'on';
//     /**
//      *
//      * @param event
//      * @returns {string}
//      */
//     var onEvent = function (event) {
//         return _this.on + event;
//     };
//     _this.click = 'click';
//     _this.change = 'change';
//     _this.keyUp = 'keyup';
//     if (OJSO.EventObj instanceof OJSO.EventClass) {
//         return OJSO.EventObj;
//     }
// };
// OJSO.EventObj = new OJSO.EventClass();
// /**
//  * class SimulationObject handles simulated objects
//  *
//  * @author Mirko Krotzek <mirko.krotzek@googlemail.com>
//  * @package physic engine
//  * @subpackge object
//  * @method pseudo class
//  */
// log = function (value, text, bool) {
//
// //  if (text !== undefined) {
// //     var bool = true;
// //  }
//     if (text === undefined) {
//         text = '';
//     }
//
//     /* get type of value */
//     var type = Object.prototype.toString.call(value);
//     type = type.substring(8, type.length - 1);
//
//     text += type;
//
//     /* get length of value */
//     if (type === 'String') {
//         text += '(' + value.length + ')';
//     }
//     else if (type === 'Object' || type === 'Array') {
//         text += '(' + Object.keys(value).length + ')';
// //     text += ' ' + eval(value);
// //     text += ' ' + val(value);
// //     text += ' ' + eval(JSON.parse(value));
// //     text += ' ' + JSON.parse(value);
//     }
//
//     /* add value */
//     text += ' ' + value;
//
//
// //  if (type === 'Object') {
// //     for (var prop in value) {
// ////          log(value.prop);
// //        text = "\n" + log(value[prop], text, true);
// //     }
// //  }
// //  if (bool) {
// //     return text;
// //  }
// //  var test = eval("(" + value + ");");
// //  console.log(test);
//     console.debug(value);
//     console.debug((value));
//     console.debug(value);
//     console.debug((value));
//
//     console.log(value);
//     console.log((value));
//     console.log(value);
//     console.log((value));
//
//     console.debug(text);
//     console.log(text);
// //  console.debug(text);
// //  console.log('__________________________________________________');
//     return console.log('--------------------------------------------------');
// //  return console.log(typeof value + (typeof value === 'string' ? '(' + value.length + ')' : '') + ' ' + value);
// //     if(typeof value === 'object'){
// //        for(var key in value){
// ////             log(value[key], indention + 4);
// //        }
// //     }
// };
// dump = function () {
//
// };
//
// //console.log("Fruits array");
// //var objectFruits_array = '["pineaple","strawberry","apple","banana"]';
// //var valFruits_array = eval("(" + objectFruits_array + ")");
// //console.debug(valFruits_array);
// //var objectFruits_array = ["pineaple", "strawberry", "apple", "banana"];
// //var objectFruits_array = (objectFruits_array);
// //console.debug(objectFruits_array);
// //exit;
//
// //################################################################################################
//
// log('Test undefined: ');
//
// log();
//
// log(val);
//
// var val;
// log(val);
//
// //################################################################################################
//
// log('Test null: ');
//
// log(null);
//
// val = 1;
// log(val);
//
// val = null;
// log(val);
//
// //################################################################################################
//
// log('Test boolean: ');
//
// log(true);
//
// log(false);
//
// var bool = true;
// log(bool);
//
// bool = false;
// log(bool);
//
// //################################################################################################
//
// log('Test integer: ');
//
// log(12);
//
// var int = 123;
// log(int);
//
// int = NaN;
// log(int);
//
// //################################################################################################
//
// log('Test float: ');
//
// log(12.34);
//
// var float = 123.456;
// log(float);
//
// exit;
// //################################################################################################
//
// log('Test String: ');
//
// log('');
//
// log(' ');
//
// log('asdf');
//
// log('123');
//
// log('asdf123');
//
// log('123asdf');
//
// var str = 'str';
// log(str);
//
// //################################################################################################
//
// log('Test Array: ');
//
// var arr = [];
// log(arr);
//
// arr = [1, '2', [3, '4', [5, '6'], 7], 8, 9, [10, 11], 12, 13];
// log(arr);
//
// arr = new Array();
// log(arr);
//
// arr = new Array(14, '15', [16, '17', new Array(18, '19'), 20], 21, 22, [23, 24], 25, 26);
// log(arr);
//
// //################################################################################################
//
// log('Test Object: ');
//
// var obj = {};
// log(obj);
//
// obj = {
//     a: 1,
//     b: '2',
//     c: function () {
//         return arr[0] + 3;
//     },
//     d: {
//         e: 4,
//         f: 5
//     },
//     g: 6
// };
// log(obj);
//
// obj = new Object();
// log(obj);
//
// obj = new Object(7, '8');
// log(obj);
//
// obj = new Object(
//     h = 9,
//     i = '10',
//     j = function () {
//         return arr[0] + 11;
//     }
// );
// log(obj);
//
// obj = new Object(
//     k = 12,
//     l = '13',
//     m = {
//         n: 14,
//         o: 15
//     },
//     p = function () {
//         return arr[0] + 16;
//     },
//     q = new Object(
//         r = 17,
//         s = '18',
//         t = {
//             u: 19,
//             v: '20',
//             w: function () {
//                 return obj.h + 21;
//             },
//             x: {
//                 y: 22,
//                 z: function () {
//                     return obj[h] + 23;
//                 },
//                 aa: {
//                     ab: 24
//                 },
//             }
//         },
//         new Object(25),
//         {
//             26: 27,
//             28: new Object(29)
//         }
//     )
// );
// log(obj);
//
// //################################################################################################
//
// log('Test new Object: ');
//
// log(new Boolean());
//
// log(new Boolean(true));
//
// log(new Number());
//
// log(new Number(123));
//
// log(new Number(123.456));
//
// //log(new Integer());
// //log(new float());
//
// log(new String());
//
// log(new String('asdf'));
//
// log(new Array());
//
// log(new Array(1, 2, 3));
//
// log([]);
//
// log([1, 2, 3]);
//
// log(new Object());
//
// log(new Object(1, 2, 'b'));
//
// log(new Object(a = 1, b = 2, c = function () {
//     return 4;
// }));
//
// log({});
//
// function test(tex) {
//     return tex + 3;
// }
//
// //test = function(tex) {
// //  return tex + 3;
// //}
// log({
//     a: 1, b: 2, c: test(), d: function () {
//         return 5;
//     }
// });
//
// log({
//     a: 1, b: 2, c: function (tex) {
//         return tex + 3;
//     }, d: function () {
//         return 5;
//     }
// });
//
// //################################################################################################
//
// log('Test XML: ');
//
// var xml = '<?xml version="1.0" encoding="UTF-8"?><mediamarkt><hardware>1</hardware></mediamarkt>';
// xml = (new DOMParser()).parseFromString(xml, "text/xml")
// log(xml);
//
// //################################################################################################
//
// log('Test function: ');
//
// var func = function (test) {
//     return 1;
// };
// log(func);
//
// log(func());
//
// log(func(3));
//
// function foo(test) {
//     return 2;
// }
//
// log(foo);
//
// log(foo());
//
// log(foo(2));