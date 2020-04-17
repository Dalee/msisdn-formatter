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
const patterns = {
    validMsisdn: /^7?[69]\d{9}$/,
    notDigitsNorPlus: /[^\d\+]+/g,
    cleanMsisdnParts: /^(?:\+?7|8)?(\d{3})(\d{3})(\d{2})(\d{2})$/
};

/**
 * @constant
 * @type {object}
 * @default
 */
export const PrettyFormats = {
    CLEANER: 'cleaner',
    CLEAN: 'clean',
    SHORT: 'short',
    USUAL: 'usual',
    FULL: 'full'
};

/**
 * @constant
 * @type {object}
 * @default
 */
const prettyFormatsRegExp = {
    [PrettyFormats.CLEANER]: '$1$2$3$4',
    [PrettyFormats.CLEAN]: '7$1$2$3$4',
    [PrettyFormats.SHORT]: '$1 $2-$3$4',
    [PrettyFormats.USUAL]: '($1) $2-$3$4',
    [PrettyFormats.FULL]: '+7 ($1) $2-$3$4'
};

/**
 * Makes msisdn pretty
 *
 * @param {number|string} msisdn
 * @param {string} [format=usual]
 * @returns {string}
 */
export function pretty(msisdn, format = 'usual') {
    let msisdnStr = msisdn;
    if (typeof msisdnStr === 'number') {
        msisdnStr = String(msisdn);
    }

    const cleaned = clean(msisdnStr);
    if (!cleaned) {
        return msisdnStr;
    }
    format = (format in prettyFormatsRegExp) ? format : 'usual';
    return cleaned.replace(patterns.cleanMsisdnParts, prettyFormatsRegExp[format]);
}

/**
 * Cleans msisdn (cleaner or clean)
 *
 * @param {string} msisdn
 * @param {boolean} [cleaner=false] Remove leading 7
 * @returns {?string}
 */
export function clean(msisdn, cleaner = false) {
    if (typeof msisdn !== 'string') {
        return null;
    }
    const cleaned = msisdn.replace(patterns.notDigitsNorPlus, '');
    msisdn = cleaned.replace(patterns.cleanMsisdnParts, cleaner ? prettyFormatsRegExp.cleaner : prettyFormatsRegExp.clean);
    return patterns.validMsisdn.test(msisdn) ? msisdn : null;
}
