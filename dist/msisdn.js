(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.msisdn = mod.exports;
    }
})(this, function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.pretty = pretty;
    exports.clean = clean;
    /**
     * Regular expression
     * @typedef {object} RegExp
     */

    /**
     * @constant
     * @default
     * @type {{
     *  validMsisdn: RegExp,
     *  notDigitsNorPlus: RegExp,
     *  cleanMsisdnParts: RegExp
     * }}
     */
    var patterns = {
        validMsisdn: /^7?[69]\d{9}$/,
        notDigitsNorPlus: /[^\d\+]+/g,
        cleanMsisdnParts: /^(?:\+?7|8)?(\d{3})(\d{3})(\d{2})(\d{2})$/
    };

    /**
     * @constant
     * @type {object}
     * @default
     */
    var prettyFormats = {
        cleaner: '$1$2$3$4',
        clean: '7$1$2$3$4',
        short: '$1 $2-$3$4',
        usual: '($1) $2-$3$4',
        full: '+7 ($1) $2-$3$4'
    };

    /**
     * Makes msisdn pretty
     *
     * @param {string} msisdn
     * @param {string} [format=usual]
     * @returns {string}
     */
    function pretty(msisdn) {
        var format = arguments.length <= 1 || arguments[1] === undefined ? 'usual' : arguments[1];

        var cleaned = clean(msisdn);
        if (!cleaned) {
            return msisdn;
        }
        format = format in prettyFormats ? format : 'usual';
        return cleaned.replace(patterns.cleanMsisdnParts, prettyFormats[format]);
    }

    /**
     * Cleans msisdn (cleaner or clean)
     *
     * @param {string} msisdn
     * @param {boolean} [cleaner=false] Remove leading 7
     * @returns {?string}
     */
    function clean(msisdn) {
        var cleaner = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

        if (typeof msisdn !== 'string') {
            return null;
        }
        var cleaned = msisdn.replace(patterns.notDigitsNorPlus, '');
        msisdn = cleaned.replace(patterns.cleanMsisdnParts, cleaner ? prettyFormats.cleaner : prettyFormats.clean);
        return patterns.validMsisdn.test(msisdn) ? msisdn : null;
    }
});